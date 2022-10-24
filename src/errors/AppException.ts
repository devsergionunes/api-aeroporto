import { Exception } from "./Exception";

export class AppException extends Exception {
	public readonly message: string;

	public readonly statusCode: number;

	constructor(message: string, statusCode = 400) {
		super(message, statusCode);
		this.message = message;
		this.statusCode = statusCode;
	}
}
