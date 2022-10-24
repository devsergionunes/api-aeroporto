/* eslint-disable class-methods-use-this */

import { ValidationErrorItem } from "joi";
import { Exception } from "./Exception";

export class ValidatorException extends Exception {
	public readonly message: string;

	public readonly statusCode: number;

	public errors: Array<Object>;

	constructor(message: string, errors: Array<ValidationErrorItem>, statusCode = 400) {
		super(message, statusCode);
		this.message = message;
		this.statusCode = statusCode;
		this.errors = this.serializeErrors(errors);
	}

	private serializeErrors(errors: Array<ValidationErrorItem>): Array<Object> {
		return errors.map(error => ({ property: error.context?.key, error: error.message }));
	}
}
