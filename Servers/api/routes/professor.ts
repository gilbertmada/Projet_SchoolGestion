import { Router } from "express";
import ProfessorController from "../controllers/ProfessorController";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";
import { admins, allUsers } from "../utils";

const router = Router();

//Get all users
router.get("/"  , [checkJwt, checkRole(allUsers)]  , ProfessorController.listProfessor);


//Create a new user
router.post("/",[checkJwt, checkRole(allUsers)],ProfessorController.newProfessor);


//Edit one user
router.patch(
  // "/:id([0-9a-f]+)",
  "/edit",
  [checkJwt, checkRole(allUsers)],
  ProfessorController.editProfessor
);

//Delete one user
router.patch(
  "/delete",
  [checkJwt, checkRole(admins)],
  ProfessorController.deleteProfessor
);

//Delete one user
router.patch(
  "/archive",
  [checkJwt, checkRole(allUsers)],
  ProfessorController.archive
);


//  Get filtered User
router.post(
  "/filter",
  [checkJwt, checkRole(allUsers)],
  ProfessorController.getFilteredProfessor
);



//Edit one user
router.post(
  "/urlPlus",
  [checkJwt, checkRole(allUsers)],
  ProfessorController.updateUrl
);
export default router;
