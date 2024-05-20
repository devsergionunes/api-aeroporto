import "dotenv/config";
import express from "express";
import cors from "cors";
import "express-async-errors";
import SwaggerUI from "swagger-ui-express";
import swaggerDocument from "./swagger.json";
import { routes } from "./routes";
import { AppExceptionHandler } from "./middleware/AppException";
// import { InitScriptsDB } from "./db/db";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api-docs", SwaggerUI.serve, SwaggerUI.setup(swaggerDocument));
app.use(routes);
app.use(AppExceptionHandler.handle);
// InitScriptsDB();

export { app };
