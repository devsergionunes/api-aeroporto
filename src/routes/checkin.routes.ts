import { Router } from "express";
import { CheckinRequestValidator } from "../middleware/validators/CheckinValidator";
import { GetFlight } from "../services/Check-in/GetCheckins";
import { PostCheckIn } from "../services/Check-in/PostCheckIn";

const CheckIn = Router({ mergeParams: true });

CheckIn.get("/:idVoo/:idPassageiro?", GetFlight.execute);
CheckIn.post("/:idVoo", CheckinRequestValidator.register, PostCheckIn.execute);

export { CheckIn };

