import { Request, Response } from "express";
import { getClient } from "../../db/db";
import { AppException } from "../../errors/AppException";
import { FlightRepository } from "../../repositories/FlightRepository";
import { PassagerRepository } from "../../repositories/PassengerRepository";
import { SeatsRepository } from "../../repositories/SeatsRepository";

export class PostCheckIn {
	public static async execute(req: Request, res: Response){
		const dbConn = await getClient();
		try {
			const { idAssento, nomePassageiro, indBagagem, classe } = req.body;
			const { idVoo } = req.params;
			const flightRepository = new FlightRepository(dbConn);
			const passagerRepository = new PassagerRepository(dbConn);
			const seatsRepository = new SeatsRepository(dbConn);

			const { rows: flight } = await flightRepository.getFlightById(idVoo);
			if (!flight.length) throw new AppException("Voo não encontrado!", 404);

			const { rows: seats } = await seatsRepository.isContaisSeatsToFlight(flight[0].id_voo, idAssento);
			if (!seats.length) throw new AppException("Assento não encontrado!", 404);

			const { rows: isContainsPassagerToSeats } = await passagerRepository.isContainsPassenger(idVoo, idAssento);
			if (isContainsPassagerToSeats.length) throw new AppException("Assento já foi ocupado!");

			await passagerRepository.InsertPassager({ id_voo: idVoo, id_assento: idAssento, nome: nomePassageiro, ind_bagagem: indBagagem, classe });

			return res.status(200).json({ message: "Check-in realizado com sucesso!" });
		} catch(error: any) {
			const errorMessage = error instanceof AppException ? error.message : "Erro ao realizar check-in!";
			return res.status(400).json({ message: errorMessage });
		} finally {
			dbConn.release();
		}
	}
}
