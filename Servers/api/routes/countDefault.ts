import { Router } from "express";
import CountDefaultController from "../controllers/DefaultController";


const router = Router();

router.get("/", CountDefaultController.getAllCount);

export default router;