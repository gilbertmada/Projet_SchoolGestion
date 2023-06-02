import { Router } from "express";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";
import { admins, allUsers } from "../utils";
import noteController from "../controllers/NoteController";

const router = Router();

//Create new classe
router.post("/", [checkJwt, checkRole(allUsers)], noteController.createNotes);
// get list
router.get("/get", noteController.listNotes);

//Delete one classe
router.patch(
    "/deleteTotal",
    [checkJwt, checkRole(admins)],
    noteController.deleteTotalNote
  );
//  Get filtered classe
router.post(
  "/filter",
  [checkJwt, checkRole(allUsers)],
  noteController.getFilteredNote
);
router.patch(
  "/edit",
  [checkJwt, checkRole(allUsers)],
  noteController.editNote
);
export default router;
