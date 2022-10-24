/* eslint-disable no-restricted-globals */
import { Request, Response } from "express";
import { getClient } from "../../db/db";
import { AppException } from "../../errors/AppException";
import { FlightRepository } from "../../repositories/FlightRepository";
import { SeatsRepository } from "../../repositories/SeatsRepository";

export class GetFlight {
	public static async execute(req: Request, res: Response){
		const dbConn = await getClient();
		try {
			const flightRepository = new FlightRepository(dbConn);
			const seatsRepository = new SeatsRepository(dbConn);
			const { id } = req.params;

			const { rows: flight } = isNaN(Number(id)) ? await flightRepository.getFlightAll() : await flightRepository.getFlightById(id);
			if (!flight.length) throw new AppException("Voo não encontrado!", 404);

			for await (const item of flight) {
				const { rows: seats } = await seatsRepository.getSeatsByIdAirplane(item.id_aviao, item.id_voo);
				item.assentos = seats.map(seat => ({ ...seat, disponivel: !seat.nome_passageiro }));
			}

			return res.status(200).json(flight);
		} catch(error: any) {
			const errorMessage = error instanceof AppException ? error.message : "Erro ao busca voo!";
			return res.status(400).json({ message: errorMessage });
		} finally {
			dbConn.release();
		}
	}
}
