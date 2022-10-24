import { IPoolClient } from "../db/db";

export interface IFlightRepository {
	id_voo?: number,
  id_aviao?: string,
  origem: string,
  destino?:string,
  data_voo?: string,
  hora_voo?: string,
}

export class FlightRepository {

	public readonly connectionDB: IPoolClient;

	constructor(connectionDB: IPoolClient) {
		this.connectionDB = connectionDB;
	}

  public async getFlightById(id_voo: string) {
    const result = await this.connectionDB.query("SELECT * FROM VOO WHERE ID_VOO = $1", [id_voo]);
    return result;
  }

	public async getFlightAll() {
    const result = await this.connectionDB.query("SELECT * FROM VOO ORDER BY ID_VOO LIMIT 50", []);
    return result;
  }

	public async isContaisFlight(idAviao: string, data_voo: string, hora_voo: string) {
		const result = await this.connectionDB.query("SELECT * FROM VOO WHERE ID_AVIAO = $1 AND DATA_VOO = $2 AND HORA_VOO = $3", [idAviao, data_voo, hora_voo]);
		return result;
	}

	public async InsertFlight(flight: IFlightRepository) {
		const result = await this.connectionDB.query(`
		INSERT INTO
			VOO (ID_AVIAO, ORIGEM, DESTINO, DATA_VOO, HORA_VOO, ID_VOO)
		VALUES
			($1, $2, $3, $4, $5, (nextval('SEQ_VOO')))
		`, [flight.id_aviao, flight.origem, flight.destino, flight.data_voo, flight.hora_voo]);
		return result;
	}
}
