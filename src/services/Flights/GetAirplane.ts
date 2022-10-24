import { Request, Response } from "express";
import { getClient } from "../../db/db";
import { AirplaneRepository } from "../../repositories/AirplaneRepository";

export class GetAirplane {
	public static async execute(req: Request, res: Response){
		const dbConn = await getClient();
		try {
			const airplaneRepository = new AirplaneRepository(dbConn);
			const { id } = req.params;

			const { rows: airplane } = id ? await airplaneRepository.getAirplaneById(id) : await airplaneRepository.getAirplaneAll();

			return res.status(200).json(airplane);
		} finally {
			dbConn.release();
		}
	}
}
