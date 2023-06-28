import { Router } from "express";
import ExportPDfStudentController from "../controllers/ExportPdfStudentController";

const router = Router();

router.post("/list", ExportPDfStudentController.exportPdfList);
router.post("/recuDroit", ExportPDfStudentController.exportPdfRecuDroit);
router.post("/recuEcolage", ExportPDfStudentController.exportPdfRecuEcolage);
router.post("/recuFraisDivers", ExportPDfStudentController.exportPdfRecuFraisDivers);
router.post("/emploiDuTemps", ExportPDfStudentController.exportPdfEmploiDuTemps);
router.post("/bulletin1erTrim", ExportPDfStudentController.exportToPdfBulletin1erTrim);
// router.post("/bulletin2eTrim", ExportPDfStudentController.exportToPdfBulletin2eTrim);
// router.post("/bulletin3eTrim", ExportPDfStudentController.exportToPdfBulletin3eTrim);


export default router;
