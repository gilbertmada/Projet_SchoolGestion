import { Router } from "express";
import SchoolController from "../controllers/SchoolController";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";
import { superAdmins } from "../utils";

const router = Router();

//Get all users
router.get("/get"  , [checkJwt, checkRole(superAdmins)]  , SchoolController.listAll);



//Create a new user
// router.post("/", [checkJwt, checkRole(admins)], UserController.newUser);
router.post("/",[checkJwt, checkRole(superAdmins)],SchoolController.newSchool);


//Edit one user
router.patch(
  // "/:id([0-9a-f]+)",
  "/edit",
  [checkJwt, checkRole(superAdmins)],
  SchoolController.editSchool
);


//Delete one user
router.patch(
  "/deleteTotal",
  [checkJwt, checkRole(superAdmins)],
  SchoolController.deleteTotalSchool
);

// Get filtered User
router.post(
  "/filter",
  [checkJwt, checkRole(superAdmins)],
  SchoolController.getFilteredSchool
);


//Edit one user
router.post(
  "/urlPlus",
  [checkJwt, checkRole(superAdmins)],
  SchoolController.updateUrl
);
export default router;
