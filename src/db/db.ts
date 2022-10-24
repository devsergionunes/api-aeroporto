import "dotenv/config";
import { readFile } from "fs/promises";
import { resolve } from "path";
import { Pool, PoolClient, QueryResult, QueryResultRow } from "pg";

// sudo docker run -p 5432:5432 -e POSTGRES_PASSWORD=1234 postgres

export interface IPoolClient extends Omit<PoolClient, "query"> {
	query: (queryText:string, params?: any[], callback?: (err: Error, result: QueryResult<QueryResultRow>) => void) => Promise<QueryResult<any>>;
}

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    password:  process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT),
    max: 50, // Numero maximo e pool de conexoes
    ssl: false,
    Promise,
    idleTimeoutMillis: 30000, // tempo maximo de espera para liberar a conexao
    min: 1, // Numero minimo de conexoes
    keepAlive : true, // mantem a conexao aberta
});

const getClient = async () =>{
  const client: IPoolClient = await pool.connect();
  const query = client.query as any;

  const release = client.release;
  let lastQuery : string;
  const timeout = setTimeout(() => {
    console.error("Um cliente foi fechado automaticamente porque ele estava sendo usado mais de 1 minuto.");
    console.error(`Ultima query executada: ${lastQuery}`);
  }, 50000);

  client.query = (queryText:string, params?: any[], callback?: (err: Error, result: QueryResult<QueryResultRow>) => void): Promise<QueryResult<any>> => {
    lastQuery = queryText;
    return query.apply(client, [queryText, params, callback]);
  };
  client.release = () => {
    clearTimeout(timeout);
    client.query = query;
    client.release = release;
    return release.apply(client);
  };
  return client;
};

const InitScriptsDB = async () => {
	const client = await getClient();
	try {
		client.query("BEGIN");
		const { rows: isScripts } = (await client.query("SELECT table_name FROM information_schema.tables WHERE table_name = 'voo'"));
		if (isScripts.length) return;

		const file = await readFile(resolve(process.cwd(), "scripts/scripts-ddl.sql"), { encoding: "utf-8" });
		const SQLArray = file.split(";");

		for await (const sql of SQLArray) {
			await client.query(sql, []);
		}
		client.query("COMMIT");
	} catch (err) {
		client.query("ROLLBACK");
	} finally {
		client.release();
	}
};

export { getClient , InitScriptsDB };
