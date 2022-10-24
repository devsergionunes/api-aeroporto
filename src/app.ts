import "dotenv/config";
import express from "express";
import cors from "cors";
import "express-async-errors";
import { routes } from "./routes";
import { AppExceptionHandler } from "./middleware/AppException";
import { InitScriptsDB } from "./db/db";

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(AppExceptionHandler.handle);
InitScriptsDB();

export { app };
