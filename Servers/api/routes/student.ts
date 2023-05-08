import { Router } from "express";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";
import { admins, allUsers } from "../utils";
import studentControleur from "../controllers/StudentController";

const router = Router();
// get list
router.get("/", [checkJwt, checkRole(allUsers)], studentControleur.getListStudent);

//Create new Student
router.post("/", [checkJwt, checkRole(allUsers)], studentControleur.createStudent);


// router.get("/get", studentControleur.getData);

// router.post("/save", studentControleur.save);

router.patch("/edit", [checkJwt, checkRole(allUsers)], studentControleur.updateStudent);

//delete student in Front
// router.patch("/delete",[checkJwt, checkRole(allUsers)], studentControleur.deleteStudent);

//delete student in Front and back
router.patch("/deleteTotal", [checkJwt, checkRole(allUsers)], studentControleur.deleteTotalStudent);

//delete ecolage in Front and back
router.patch("/deleteTotalEcolage", [checkJwt, checkRole(allUsers)], studentControleur.deleteTotalEcolage);


//delete fraisDivers in Front and back
router.patch("/deleteTotalFraisDivers", [checkJwt, checkRole(allUsers)], studentControleur.deleteTotalFraisDivers);

// Get filtered student
router.post("/filter", [checkJwt, checkRole(allUsers)], studentControleur.getFilteredStudent);

//Create Ecolage Prive
router.post("/ecolage", [checkJwt, checkRole(allUsers)], studentControleur.createEcolagePrive);

//Create Frais Divers
router.post("/fraisDivers", [checkJwt, checkRole(allUsers)], studentControleur.createFraisDivers);
//sendMail
router.post("/sendMail", [checkJwt, checkRole(allUsers)], studentControleur.sendMail);
//AddNewhistoryDocument
router.patch("/historyDocument", [checkJwt, checkRole(allUsers)], studentControleur.AddNewHistoryDocument);

// //AddNewHistoryEcolagePrive
// router.post("/historyEcolagePrive", [checkJwt, checkRole(allUsers)], studentControleur.AddNewHistoryEcolagePrive);

// //AddNewHistoryFraisDivers
// router.post("/historyFraisDivers", [checkJwt, checkRole(allUsers)], studentControleur.AddNewHistoryFraisDivers);

// //AddNewHistoryDroit
// router.post("/historyDroit", [checkJwt, checkRole(allUsers)], studentControleur.AddNewHistoryDroit);

//getHistoryDocument
router.get("/historyDocument", [checkJwt, checkRole(allUsers)], studentControleur.getHistoryDocument);

// //getHistoryEcolagePrive
// router.get("/historyEcolagePrive", [checkJwt, checkRole(allUsers)], studentControleur.getHistoryEcolagePrive);

// //getHistoryFraisDivers
// router.get("/historyFraisDivers", [checkJwt, checkRole(allUsers)], studentControleur.getHistoryFraisDivers);

// //getHistoryDroit
// router.get("/historyDroit", [checkJwt, checkRole(allUsers)], studentControleur.getHistoryDroit);
// Get list ecolage
router.get("/getEcolage", [checkJwt, checkRole(allUsers)], studentControleur.getListEcolage);
//Get list Frais Divers
router.get("/getFraisDivers", [checkJwt, checkRole(allUsers)], studentControleur.getListFraisDivers);

export default router;
