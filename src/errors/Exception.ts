export abstract class Exception extends Error {
	public readonly message: string;

	public readonly statusCode: number;

	public readonly errors?: Array<Object>;

	constructor(message: string, statusCode: number) {
		super(message);
		this.message = message;
		this.statusCode = statusCode;

		Error.captureStackTrace(this);
	}
}
