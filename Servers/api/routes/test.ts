import { Router } from "express";
import TestController from "../controllers/TestController";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";
import { admins, allUsers } from "../utils";

const router = Router();

//Get all users
router.get("/", TestController.listAll);



//Create a new user

router.post("/",TestController.test);



export default router;
