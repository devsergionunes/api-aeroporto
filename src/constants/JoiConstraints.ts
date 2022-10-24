import Joi from "joi";
import { customMessagesJoiException } from "./JoiMessages";

export class JoiConstraints {
	public static NUMBER_PARAMETERS = Joi
		.number()
		.required()
		.messages(customMessagesJoiException);

	public static STRING_PARAMETERS = Joi
		.string()
		.required()
		.messages(customMessagesJoiException);

	public static BOOLEAN_PARAMETERS = Joi
		.boolean()
		.required()
		.messages(customMessagesJoiException);

	public static CLASSE = Joi
		.number()
		.min(1)
		.max(1)
		.required()
		.valid(1,2,3)
		.label("Classe do Voo")
		.messages(customMessagesJoiException);
}
