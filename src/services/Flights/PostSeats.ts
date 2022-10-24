import { Request, Response } from "express";
import { getClient } from "../../db/db";
import { AppException } from "../../errors/AppException";
import { AirplaneRepository } from "../../repositories/AirplaneRepository";
import { SeatsRepository } from "../../repositories/SeatsRepository";

export class PostSeats {
	public static async execute(req: Request, res: Response){
		const dbConn = await getClient();
		try {
			const { idAviao, assento } = req.body;
			const airplaneRepository = new AirplaneRepository(dbConn);
			const seatsRepository = new SeatsRepository(dbConn);

			const { rows: airplane } = await airplaneRepository.getAirplaneById(idAviao);
			if (!airplane.length) throw new AppException("Avião não encontrado!", 404);

			const { rows: isContains } = await seatsRepository.isContaisSeats(idAviao, assento);
			if (isContains.length) throw new AppException("Assento já cadastrado para este avião para este avião!");

			await seatsRepository.InsertSeats({ id_aviao: idAviao, assento });

			return res.status(200).json({ message: "Assento cadastrado com sucesso!" });
		} catch(error: any) {
			const errorMessage = error instanceof AppException ? error.message : "Erro ao cadastrar assento!";
			return res.status(400).json({ message: errorMessage });
		} finally {
			dbConn.release();
		}
	}
}
