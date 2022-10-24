import { Request, Response } from "express";
import { getClient } from "../../db/db";
import { AppException } from "../../errors/AppException";
import { AirplaneRepository } from "../../repositories/AirplaneRepository";
import { FlightRepository } from "../../repositories/FlightRepository";

export class PostFlight {
	public static async execute(req: Request, res: Response){
		const dbConn = await getClient();
		try {
			const { idAviao, origem, destino, data, hora } = req.body;
			const airplaneRepository = new AirplaneRepository(dbConn);
			const flightRepository = new FlightRepository(dbConn);

			const dateFlight = new Date(data);
			const hourFlight = new Date(`2022-01-01 ${hora}`);

			if (!dateFlight.getTime() || !hourFlight.getTime()) throw new AppException("Data e hora invalida!");
			if (dateFlight.getTime() < new Date().getTime()) throw new AppException("Data do voo não pode ser menor que a data atual!");

			const { rows: airplane } = await airplaneRepository.getAirplaneById(idAviao);
			if (!airplane.length) throw new AppException("Avião não encontrado!", 404);

			const { rows: isContains } = await flightRepository.isContaisFlight(idAviao, data, hora);
			if (isContains.length) throw new AppException("Já existe um voo cadastrado nesta hora e data para este avião!");

			await flightRepository.InsertFlight({ id_aviao: idAviao, origem, destino, data_voo: data, hora_voo: hora });

			return res.status(200).json({ message: "Voo cadastrado com sucesso!" });
		} catch(error: any) {
			const errorMessage = error instanceof AppException ? error.message : "Erro ao cadastrar voo!";
			return res.status(400).json({ message: errorMessage });
		} finally {
			dbConn.release();
		}
	}
}
