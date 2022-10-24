import { Router } from "express";
import { FlightsRequestValidator } from "../middleware/validators/FlightsValidator";
import { GetAirplane } from "../services/Flights/GetAirplane";
import { GetFlight } from "../services/Flights/GetFlight";
import { PostAirplane } from "../services/Flights/PostAirplane";
import { PostFlight } from "../services/Flights/PostFlight";
import { PostSeats } from "../services/Flights/PostSeats";

const Flights = Router({ mergeParams: true });

Flights.get("/flight/:id?", GetFlight.execute);
Flights.post("/flight", FlightsRequestValidator.registerFlight, PostFlight.execute);

Flights.get("/airplane/:id?", GetAirplane.execute);
Flights.post("/airplane", FlightsRequestValidator.registerAirplane, PostAirplane.execute);

Flights.post("/seats", FlightsRequestValidator.registerSeats, PostSeats.execute);

export { Flights };

