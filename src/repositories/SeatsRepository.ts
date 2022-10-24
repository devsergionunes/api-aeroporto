import { IPoolClient } from "../db/db";

export interface ISeatsRepository {
  id_assento?: number,
  id_aviao: string,
  assento:string,
}

export class SeatsRepository {

	public readonly connectionDB: IPoolClient;

	constructor(connectionDB: IPoolClient) {
		this.connectionDB = connectionDB;
	}

  public async isContaisSeats(idAviao: string, assento: string) {
    const result = await this.connectionDB.query("SELECT * FROM ASSENTOS WHERE ID_AVIAO = $1 AND ASENTO = $2", [idAviao, assento]);
    return result;
  }

	public async isContaisSeatsToFlight(idVoo: string, idAssento: string) {
    const result = await this.connectionDB.query(`
			SELECT
				A.ID_ASSENTO,
				A.ASENTO,
				V.id_voo
			FROM
				ASSENTOS A
				INNER JOIN VOO V ON V.id_voo = $1
			WHERE
				A.id_assento = $2
		`, [idVoo, idAssento]);
    return result;
  }


	public async getSeatsByIdAirplane(idAviao: string, idVoo:string) {
		const result = await this.connectionDB.query(`
			SELECT
				A.ID_ASSENTO,
				A.ASENTO,
				P.nome AS nome_passageiro
			FROM
				ASSENTOS A
				LEFT JOIN PASSAGEIRO P ON P.id_voo = $1
				AND P.id_assento = A.id_assento
			WHERE
				A.ID_AVIAO = $2;
		`, [idVoo, idAviao]);
		return result;
	}

	public async InsertSeats(seats: ISeatsRepository) {
		const result = await this.connectionDB.query(`
		INSERT INTO
			ASSENTOS (ID_AVIAO, ASENTO, ID_ASSENTO)
		VALUES
			($1, $2, (nextval('SEQ_ASSENTOS')))
		`, [seats.id_aviao, seats.assento]);
		return result;
	}
}
