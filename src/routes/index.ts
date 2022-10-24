import { Router } from "express";
import { CheckIn } from "./checkin.routes";
import { Flights } from "./flights.routes";

const routes = Router({ mergeParams: true });

routes.use("/api/check-in/", CheckIn);
routes.use("/api/flights/", Flights);

export { routes };
