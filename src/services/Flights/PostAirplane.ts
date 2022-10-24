import { Request, Response } from "express";
import { getClient } from "../../db/db";
import { AirplaneRepository } from "../../repositories/AirplaneRepository";

export class PostAirplane {
	public static async execute(req: Request, res: Response){
		const dbConn = await getClient();
		try {
			const { modelo, nome } = req.body;
			const airplaneRepository = new AirplaneRepository(dbConn);

			await airplaneRepository.InsertAirplane({modelo, nome_aviao: nome});

			return res.status(200).json({ message: "Avião cadastrado com sucesso!" });
		} finally {
			dbConn.release();
		}
	}
}
