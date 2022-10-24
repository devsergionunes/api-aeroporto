/* eslint-disable no-unused-vars */
import { Request, Response, NextFunction } from "express";

import Joi from "joi";
import { messages } from "joi-translation-pt-br";
import { JoiConstraints } from "../../constants/JoiConstraints";
import { ValidatorException } from "../../errors/ValidatorException";

export class CheckinRequestValidator {
	public static register(req: Request, res: Response, next: NextFunction) {
		const schema = Joi.object({
			idAssento: JoiConstraints.NUMBER_PARAMETERS,
			nomePassageiro: JoiConstraints.STRING_PARAMETERS,
			indBagagem: JoiConstraints.BOOLEAN_PARAMETERS,
			classe: JoiConstraints.CLASSE,
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
