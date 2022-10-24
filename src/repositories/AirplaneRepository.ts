import { IPoolClient } from "../db/db";

export interface IAirplaneRepository {
  id_aviao?: number,
  nome_aviao: string,
  modelo:string,
}

export class AirplaneRepository {

	public readonly connectionDB: IPoolClient;

	constructor(connectionDB: IPoolClient) {
		this.connectionDB = connectionDB;
	}

  public async getAirplaneById(id: string) {
    const result = await this.connectionDB.query("SELECT * FROM AVIAO WHERE ID_AVIAO = $1", [id]);
    return result;
  }

	public async getAirplaneAll() {
    const result = await this.connectionDB.query("SELECT * FROM AVIAO ORDER BY ID_AVIAO LIMIT 50;", []);
    return result;
  }

	public async InsertAirplane(airplane: IAirplaneRepository) {
		const result = await this.connectionDB.query(`
		INSERT INTO
			AVIAO (NOME_AVIAO, MODELO, ID_AVIAO)
		VALUES
			($1, $2, (nextval('SEQ_AVIAO')))
		`, [airplane.nome_aviao, airplane.modelo]);
		return result;
	}
}
