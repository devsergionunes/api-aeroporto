/* eslint-disable no-unused-vars */

declare namespace NodeJS {
	export interface ProcessEnv {

		//	Ambiente
		ENVIRONMENT: "development" | "production";

		//	Parâmetros Gerais do sistema
		URL_API_BASE: string;
		API_PORT: number;

		//	Database
		DB_USER: string;
		DB_PASSWORD: string;
		DB_HOST: string;
		DB_PORT: number;
	}
}
