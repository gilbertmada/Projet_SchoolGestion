import { Router } from "express";
import CountDefaultController from "../controllers/DefaultController";
import { admins, allUsers } from "../utils";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";

const router = Router();

router.get("/",[checkJwt, checkRole(admins)], CountDefaultController.getAllCount);

export default router;