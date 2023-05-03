import { Router } from "express";
import SchoolController from "../controllers/SchoolController";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";
import { admins, allUsers } from "../utils";

const router = Router();

//Get all users
router.get("/get"  , [checkJwt, checkRole(admins)]  , SchoolController.listAll);



//Create a new user
// router.post("/", [checkJwt, checkRole(admins)], UserController.newUser);
router.post("/",[checkJwt, checkRole(admins)],SchoolController.newSchool);


//Edit one user
router.patch(
  // "/:id([0-9a-f]+)",
  "/edit",
  [checkJwt, checkRole(admins)],
  SchoolController.editSchool
);


//Delete one user
router.patch(
  "/deleteTotal",
  [checkJwt, checkRole(admins)],
  SchoolController.deleteTotalSchool
);

// Get filtered User
router.post(
  "/filter",
  [checkJwt, checkRole(admins)],
  SchoolController.getFilteredSchool
);


//Edit one user
router.post(
  "/urlPlus",
  [checkJwt, checkRole(allUsers)],
  SchoolController.updateUrl
);
export default router;
