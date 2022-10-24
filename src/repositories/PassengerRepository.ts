import { IPoolClient } from "../db/db";

export interface IPassagerRepository {
  id_passageiro?: number,
  id_voo: string,
  id_assento:string,
  nome:string,
  ind_bagagem:string,
  classe:string,
}

export class PassagerRepository {

	public readonly connectionDB: IPoolClient;

	constructor(connectionDB: IPoolClient) {
		this.connectionDB = connectionDB;
	}

  public async getPassagerById(id_passageiro: string) {
    const result = await this.connectionDB.query("SELECT * FROM PASSAGEIRO WHERE ID_PASSAGEIRO = $1", [id_passageiro]);
		return result;
  }

	public async getPassagerByIdVoo(id_voo: string) {
    const result = await this.connectionDB.query("SELECT * FROM PASSAGEIRO WHERE ID_VOO = $1", [id_voo]);
		return result;
  }

	public async isContainsPassenger(idVoo: string, idAssento: string) {
		const result = await this.connectionDB.query(`
			SELECT
				ID_PASSAGEIRO
			FROM
				PASSAGEIRO
			WHERE
				ID_VOO = $1
			AND
				ID_ASSENTO = $2
		`, [idVoo, idAssento]);
		return result;
	}

	public async InsertPassager(passager: IPassagerRepository) {
		const result = await this.connectionDB.query(`
		INSERT INTO
			PASSAGEIRO (ID_VOO, ID_ASSENTO, NOME, IND_BAGAGEM, CLASSE, ID_PASSAGEIRO)
		VALUES
			($1, $2, $3, $4, $5, (nextval('SEQ_PASSAGEIRO')))
		`, [passager.id_voo, passager.id_assento, passager.nome, passager.ind_bagagem, passager.classe]);
		return result;
	}
}
