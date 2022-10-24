/* eslint-disable no-unused-vars */
import { Request, Response, NextFunction } from "express";
import { Exception } from "../errors/Exception";

export class AppExceptionHandler {
	public static handle (error: Error, _req: Request, res: Response, _next: NextFunction) {
		if(error instanceof Exception) {
			return res.status(error.statusCode).json({
				message: error.message,
				statusCode: error.statusCode,
				errors: error.errors
			});
		}

		console.log(error);
		return res.status(500).json({
			message: "A sistema está apresentando uma instabilidade momentânea. Tente novamente!",
		});
	}
}
