/* eslint-disable no-restricted-globals */
import { Request, Response } from "express";
import { getClient } from "../../db/db";
import { AppException } from "../../errors/AppException";
import { FlightRepository } from "../../repositories/FlightRepository";
import { PassagerRepository } from "../../repositories/PassengerRepository";

export class GetFlight {
	public static async execute(req: Request, res: Response){
		const dbConn = await getClient();
		try {
			const { idVoo, idPassageiro } = req.params;
			const passagerRepository = new PassagerRepository(dbConn);
			const flightRepository = new FlightRepository(dbConn);

			const { rows: flight } = await flightRepository.getFlightById(idVoo);
			if (!flight.length) throw new AppException("Voo não encontrado!", 404);

			const { rows: passagers } = isNaN(Number(idPassageiro)) ? await passagerRepository.getPassagerByIdVoo(idVoo) : await passagerRepository.getPassagerById(idPassageiro);

			return res.status(200).json(passagers);
		} catch(error: any) {
			const errorMessage = error instanceof AppException ? error.message : "Erro ao busca passageiro!";
			return res.status(400).json({ message: errorMessage });
		} finally {
			dbConn.release();
		}
	}
}
