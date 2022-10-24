/* eslint-disable no-unused-vars */
import { Request, Response, NextFunction } from "express";

import Joi from "joi";
import { messages } from "joi-translation-pt-br";
import { JoiConstraints } from "../../constants/JoiConstraints";
import { ValidatorException } from "../../errors/ValidatorException";

export class FlightsRequestValidator {
	public static registerAirplane(req: Request, res: Response, next: NextFunction) {
		const schema = Joi.object({
			nome: JoiConstraints.STRING_PARAMETERS,
			modelo: JoiConstraints.STRING_PARAMETERS
		});

		const options = {
			allowUnknown: true,
			stripUnknown: true,
			abortEarly: false,
			messages
		};

		const { error, value } = schema.validate(req.body, options);

		if(error) throw new ValidatorException("Parâmetros Inválidos", error.details);

		req.body = value;
		next();
	}

	public static registerSeats(req: Request, res: Response, next: NextFunction) {
		const schema = Joi.object({
			idAviao: JoiConstraints.NUMBER_PARAMETERS,
			assento: JoiConstraints.STRING_PARAMETERS
		});

		const options = {
			allowUnknown: true,
			stripUnknown: true,
			abortEarly: false,
			messages
		};

		const { error, value } = schema.validate(req.body, options);

		if(error) throw new ValidatorException("Parâmetros Inválidos", error.details);

		req.body = value;
		next();
	}

	public static registerFlight(req: Request, res: Response, next: NextFunction) {
		const schema = Joi.object({
			idAviao: JoiConstraints.NUMBER_PARAMETERS,
			origem: JoiConstraints.STRING_PARAMETERS,
			destino: JoiConstraints.STRING_PARAMETERS,
			data: JoiConstraints.STRING_PARAMETERS,
			hora: JoiConstraints.STRING_PARAMETERS,
		});

		const options = {
			allowUnknown: true,
			stripUnknown: true,
			abortEarly: false,
			messages
		};

		const { error, value } = schema.validate(req.body, options);

		if(error) throw new ValidatorException("Parâmetros Inválidos", error.details);

		req.body = value;
		next();
	}
}
