import { Router } from "express";
import auth from "./auth";
import user from "./user";
import school from "./school";
import classes from "./classes";
import professor from "./professor";
import student from "./student";
import uploadFile from "./uploadFile";
import exportToPdf from "./exportToPdf";
import countDefault from "./countDefault";
import note from "./note";
import test from "./test";



const routes = Router();

routes.use("/school", school);
routes.use("/auth", auth);
routes.use("/count", countDefault);
routes.use("/user", user);
routes.use("/classes", classes);
routes.use("/professor", professor);
routes.use("/student", student);
routes.use("/uploadFile", uploadFile);
routes.use("/exportToPdf", exportToPdf);
routes.use("/note", note);
routes.use("/test", test);

export default routes;