import { Request, Response } from "express";
import { User } from "../entity/User";
import { Student } from "../entity/Student";
import { Professor } from "../entity/Professor";
import { Classe } from "../entity/Classes";
import { School } from "../entity/Ecole";
import { Notes } from "~~/entity/Notes";

export default class DefaultController {


    static getAllCount = async (req: Request, res: Response) => {
        
   const school=await School.find({ delete: false, });
        try {

            const studentNumber = await Student.find({ delete: false }).countDocuments();
            const usersNumber = await User.find({ delete: false }).countDocuments();
            const professorNumber = await Professor.find({ delete: false }).countDocuments();
            const classNumber = await Classe.find({ delete: false }).countDocuments();
            const schoolNumber = await School.find({ delete: false }).countDocuments();
            const noteNumber = await Notes.find({ delete: false }).countDocuments();

            res.send({ studentNumber, usersNumber, professorNumber, classNumber,schoolNumber,noteNumber });
        } catch (error) {
            res.status(500).send('Error counting datas');
        }

    }
}