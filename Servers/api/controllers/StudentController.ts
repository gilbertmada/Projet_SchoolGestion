import { Request, Response } from "express";
import { async } from "rxjs";
import { Student, IStudent, HistoryInfo } from "../entity/Student";
import { EcolagePrive } from "../entity/Student/ecolagePrive";
import { FraisDivers } from "../entity/Student/fraisDivers";
import cron from "node-cron";
import nodemailer from "nodemailer";
import config from "config";
import JSPDF from "jspdf";
import fs from "fs";
import * as bcrypt from "bcryptjs";
import { getUserIdFromToken } from "../utils/user";
import moment from "moment";



interface IConstructor {
  data: HistoryInfo[];
}

export default class studentControleur {

  static data: HistoryInfo[] = [];

  public constructor(param: IConstructor) {
    studentControleur.data = param.data;
  }

  //new student
  static createStudent = async (req: Request, res: Response) => {
 
    console.log("newData....", req.body);

    const token = <string>res.getHeader("token");
    const eleve = Student.findOne({
      $and: [{ matriculNumber: req.body.matriculNumber }, { class: req.body.class }],
    }).then(async (student: any) => {
      if (student) {
        return res.status(200).json({
          matriculNumber: student.matriculNumber === req.body.matriculNumber && student.class === req.body.class ? "MatriculNumber already exists" : "",
        });
      } else {
        const newData = {
          schoolName: req.body.schoolName,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          class: req.body.class,
          height: req.body.height,
          matriculNumber: req.body.matriculNumber,
          address: req.body.address,
          role: req.body.role,
          nomRole: req.body.nomRole,
          photo: req.body.photo,
          inscriptionDroit: req.body.inscriptionDroit,
          historyStudentDroit: req.body.historyStudentDroit,
          isPrive:req.body.isPrive
        }


        const newStudent = new Student({
          ...newData,
          createdBy: getUserIdFromToken(token),
          deleted: false,
        });

        console.log("newStudent....", newStudent);
        try {

          const student = await newStudent.save();
          console.log("student....", student);
          res.status(200).send(student);

        } catch (err) {
          res.status(500).send("Failed to save student");
        }
      }
    });
  };

  static createEcolagePrive = async (req: Request, res: Response) => {

    const ecolage = req.body;

    const newEcolage = new EcolagePrive({
      student: ecolage.student,
      matriculNumber: ecolage.matriculNumber,
      ecolage: ecolage.ecolage,
      datePayEcolage: moment(ecolage.datePayEcolage).format("DD/MM/YYYY"),
      ecolageMonth: ecolage.ecolageMonth,
      isEcolage: true,
    });
    try {
      const ecolagePrive = await newEcolage.save();
      res.send(ecolagePrive);
    } catch (error) {
      res.status(500).send("Failed to save Ecolage prive");
    }

  };

  static createFraisDivers = async (req: Request, res: Response) => {

    const fraisDivers = req.body;

    const newFrais = new FraisDivers({
      student: fraisDivers.student,
      matriculNumber: fraisDivers.matriculNumber,
      frais: fraisDivers.frais,
      datePayDivers: moment(fraisDivers.datePayDivers).format("DD/MM/YYYY"),
      isFrais: true,
    });
    try {
      const frais = await newFrais.save();

      res.send(frais);
    } catch (error) {
      res.status(500).send("Failed to save Frais Divers");
    }
  };

  static AddNewHistoryDocument = async (req: Request, res: Response) => {

    let listHistoryDocument: HistoryInfo[] = [];
    const { user, student, docName } = req.body;


    const eleve = await Student.findOne({ _id: student._id });

    if (!eleve) {
      res.status(404).send({
        status: 'ERROR',
        code: 'STUDENT_NOT_FOUND',
        message: "Unable to find student to update"
      });
      return;
    }

    try {

      if (student.class) {
        if ((student.role === "LEAD_H" || student.role === "LEAD_F")) {
          eleve?.historyStudent.push({
            text: `- <b>${user.lastName}</b> a envoyé de document <b>${docName.label}</b> à <b>${student.lastName}</b>,
              <b>${student.nomRole}</b>  <b>${student.class}</b> le <b>${moment().format("DD/MM/YYYY")}</b>.`,
            date: new Date()
          })

        }
      }
      listHistoryDocument = eleve?.historyStudent
        .slice()
        .sort((a: HistoryInfo, b: HistoryInfo) => {
          const date1 = a.date;
          const date2 = b.date;

          return new Date(date2).getTime() - new Date(date1).getTime();
        });


      const resp = await Student.updateOne({ _id: eleve._id },
        {
          $set: {
            historyStudent: listHistoryDocument,
          }
        }
      );
      console.log("resp....", resp);
      res.status(200).send(resp);
    } catch (err) {
      res.status(500).send({
        status: 'ERROR',
        code: 'INTERNAL_SERVER_ERROR',
        message: "Unable to update user"
      });
    }

  };


  static updateStudent = async (req: Request, res: Response) => {

    const { _id, ...info } = req.body;

    const token = <string>res.getHeader("token");
    if (req.body.matriculNumber !== info.matriculNumber) {
      res.status(400).send({
        status: 'ERROR',
        code: 'MATRICULE_ERROR',
        message: "You should add a matricule exact"
      });
      return;
    }

    try {
      const student = await Student.findOne({ _id });
      if (!student) {
        res.status(404).send({
          status: 'ERROR',
          code: 'STUDENT_NOT_FOUND',
          message: "Unable to find student to update"
        });
        return;
      }

      const updatedInfo: any = {
        schoolName: info.schoolName,
        lastName: info.lastName,
        firstName: info.firstName,
        document: info.Document,
        photo: info.photo,
        class: info.class,
        height: info.height,
        role: info.role,
        email: info.email,
        nomRole: info.nomRole,
        address: info.address,
        inscriptionDroit: info.inscriptionDroit,
        updatedBy: getUserIdFromToken(token),
        updatedAt: Date.now(),
      };

      // res.status(200).send(student);


      const resp = await Student.updateOne({ _id: req.body._id },
        updatedInfo,

      );

      res.status(200).send(resp);
    } catch (err) {
      res.status(500).send({
        status: 'ERROR',
        code: 'INTERNAL_SERVER_ERROR',
        message: "Unable to update user"
      });
    }
  };


  static getListStudent = async (req: Request, res: Response) => {

    try {
      const students = await Student.find({ deleted: false });

      let returnedUsers = [];

      for (let i = 0; i < students.length; i++) {
        returnedUsers.push(students[i].transform());
      }

      return res.status(200).send(returnedUsers);

    } catch (err) {
      res.status(500).send("Unable to update student");
    }
  }


  static getListEcolage = async (req: Request, res: Response) => {

    try {
      const ecolages = await EcolagePrive.find();

      let returnedEcolages = [];

      for (let i = 0; i < ecolages.length; i++) {
        returnedEcolages.push(ecolages[i].transform());
      }

      return res.status(200).send(returnedEcolages);

    } catch (err) {
      res.status(500).send("Unable to update Ecolage");
    }
  }

  static getListFraisDivers = async (req: Request, res: Response) => {

    try {
      const fraisDivers = await FraisDivers.find();

      let returnedFrais = [];

      for (let i = 0; i < fraisDivers.length; i++) {
        returnedFrais.push(fraisDivers[i].transform());
      }

      return res.status(200).send(returnedFrais);

    } catch (err) {
      res.status(500).send("Unable to update Frais");
    }
  }

  static AddNewHistoryStudentEcolage = async (req: Request, res: Response) => {

    let listHistoryEcolage: HistoryInfo[] | undefined = [];
    const { data, student } = req.body;


    const eleve = await Student.findOne({ _id: student._id });

    if (!eleve) {
      res.status(404).send({
        status: 'ERROR',
        code: 'STUDENT_NOT_FOUND',
        message: "Unable to find student to update"
      });
      return;
    }

    try {

      if (eleve.class) {

        eleve?.historyStudentEcolage.push({
          text: `- <b>${data.student}</b>, classe de <b>${student.class}</b>, de numéro de matricule  <b>${data.matriculNumber}</b> a payé d'ecolage mois de <b>${data.ecolageMonth}</b>
             de somme <b>${data.ecolage} Ar</b> le <b>${moment(data.datePayEcolage).format("DD/MM/YYYY")}</b>.`,
          date: new Date()
        })

      }
      listHistoryEcolage = eleve?.historyStudentEcolage
        .slice()
        .sort((a: HistoryInfo, b: HistoryInfo) => {
          const date1 = a.date;
          const date2 = b.date;

          return new Date(date2).getTime() - new Date(date1).getTime();
        });

      const resp = await Student.updateOne({ _id: eleve?._id },
        {
          $set: {
            historyStudentEcolage: listHistoryEcolage,
          }
        }
      );

      res.status(200).send(resp);
    } catch (err) {
      res.status(500).send({
        status: 'ERROR',
        code: 'INTERNAL_SERVER_ERROR',
        message: "Unable to update user"
      });
    }
  }

  static AddNewHistoryStudentFrais = async (req: Request, res: Response) => {

    let listHistoryFrais: HistoryInfo[] | undefined = [];
    const { data, student } = req.body;



    const eleve = await Student.findOne({ _id: student._id });

    if (!eleve) {
      res.status(404).send({
        status: 'ERROR',
        code: 'STUDENT_NOT_FOUND',
        message: "Unable to find student to update"
      });
      return;
    }

    try {

      if (eleve.class) {

        eleve?.historyStudentFrais.push({
          text: `- <b>${data.student}</b>, classe de <b>${student.class}</b>, de numéro de matricule  <b>${data.matriculNumber}</b> a payé de frais divers de somme <b>${data.frais} Ar</b> le <b>${moment(data.datePayDivers).format("DD/MM/YYYY")}</b>.`,
          date: new Date()
        })

      }
      listHistoryFrais = eleve?.historyStudentFrais
        .slice()
        .sort((a: HistoryInfo, b: HistoryInfo) => {
          const date1 = a.date;
          const date2 = b.date;

          return new Date(date2).getTime() - new Date(date1).getTime();
        });

      const resp = await Student.updateOne({ _id: eleve?._id },
        {
          $set: {
            historyStudentFrais: listHistoryFrais,
          }
        }
      );

      res.status(200).send(resp);
    } catch (err) {
      res.status(500).send({
        status: 'ERROR',
        code: 'INTERNAL_SERVER_ERROR',
        message: "Unable to update user"
      });
    }
  }

  static AddNewHistoryStudentDroit = async (req: Request, res: Response) => {

    let listHistoryDroit: HistoryInfo[] | undefined = [];
    const { student } = req.body;

    console.log("data......", req.body);


    const eleve = await Student.findOne({ _id: student._id });
    console.log("eleve....", eleve);
    if (!eleve) {
      res.status(404).send({
        status: 'ERROR',
        code: 'STUDENT_NOT_FOUND',
        message: "Unable to find student to update"
      });
      return;
    }

    try {

      // if (eleve.class) {

      //   eleve?.historyStudentDroit.push({
      //       text: `- <b>${data.student}</b>, classe de <b>${student.class}</b>, de numéro de matricule  <b>${data.matriculNumber}</b> a payé de frais divers de somme <b>${data.frais} Ar</b> le <b>${ moment(data.datePayDivers).format("DD/MM/YYYY") }</b>.`,
      //       date: new Date()
      //     })

      //   }
      // listHistoryFrais = eleve?.historyStudentFrais
      //   .slice()
      //   .sort((a: HistoryInfo, b: HistoryInfo) => {
      //     const date1 = a.date;
      //     const date2 = b.date;

      //     return new Date(date2).getTime() - new Date(date1).getTime();
      //   });


      // const resp = await Student.updateOne({ _id: eleve?._id },
      //   {
      //     $set: {
      //       historyStudentDroit: listHistoryDroit,
      //     }
      //   }
      // );
      // console.log("resp....", resp);
      // res.status(200).send(resp);
    } catch (err) {
      res.status(500).send({
        status: 'ERROR',
        code: 'INTERNAL_SERVER_ERROR',
        message: "Unable to update user"
      });
    }
  }
  static getFilteredStudent = async (req: Request, res: Response) => {

    const { filter } = req.body;
    try {
      const student: IStudent[] | [] = await Student
        .find({
          $and: [
            {
              $or: [
                { firstName: { $regex: filter.filter, $options: "i" } },
                { lastName: { $regex: filter.filter, $options: "i" } },
                { height: { $regex: filter.filter, $options: "i" } },
                { class: { $regex: filter.filter, $options: "i" } },
                { matriculNumber: { $regex: filter.filter, $options: "i" } },
              ],
            },
            // { deleted: false, isArchive: false },
          ],
        });

      let returnedUsers = [];

      for (let i = 0; i < student.length; i++) {
        returnedUsers.push(student[i].transform());
      }

      return res.status(200).send(returnedUsers);
    } catch (err) {
      return res.send([]);
    }
  };

  static deleteTotalStudent = async (req: Request, res: Response) => {

    const token = <string>res.getHeader("token");
    const studentId = getUserIdFromToken(token);

    if (!studentId) {
      return res.status(500).send("Unable to delete student");
    }
    try {
      await Student.deleteOne(
        {
          _id: req.body.id,
        },
      );

      return res.status(200).send("Student deleted successfully");
    } catch (err) {
      res.status(500).send("Unable to delete student");
    }

  }

  static deleteTotalEcolage = async (req: Request, res: Response) => {

    const token = <string>res.getHeader("token");
    const studentId = getUserIdFromToken(token);

    if (!studentId) {
      return res.status(500).send("Unable to delete student");
    }
    try {

      await EcolagePrive.deleteOne(
        {
          _id: req.body.id,
        },
      );


      return res.status(200).send("Student deleted successfully");
    } catch (err) {
      res.status(500).send("Unable to delete student");
    }

  }

  static deleteTotalFraisDivers = async (req: Request, res: Response) => {

    const token = <string>res.getHeader("token");
    const studentId = getUserIdFromToken(token);

    if (!studentId) {
      return res.status(500).send("Unable to delete student");
    }
    try {
      const deleteFra = await FraisDivers.deleteOne(
        {
          _id: req.body.id,
        },
      );

      return res.status(200).send("Student deleted successfully");
    } catch (err) {
      res.status(500).send("Unable to delete student");
    }

  }

  static sendMail = async (req: Request, res: Response) => {

    const data = req.body;
    console.log("data.....", data);

    if (!data.Document.label) {
      return res.status(400).send({
        status: "ERROR",
        code: "NO_SIGNATURE",
        message: `Signature is mandatory`,
      });
    }


    //DOCUMENT begin
    const path = "./fichier/Document/";

    if (!fs.existsSync(path)) {
      fs.mkdirSync(path, { recursive: true });
    }



    //DOCUMENT end

    try {



      let filename;

      if (data.Document.label) {
        filename = `Document-${data.Document.label}`;
      }


      const pathPdf = `${path}${filename}`;

      //SEND EMAIL

      // const logoUrl = `${config.get("logoUrl")}`;

      const mailerConfig: {
        host: string;
        email: string;
        password: string;
        port: number;
      } = config.get("mailer");

      const transporter = nodemailer.createTransport({
        port: mailerConfig.port,
        host: mailerConfig.host,
        auth: {
          user: mailerConfig.email, // generated ethereal user
          pass: mailerConfig.password, // generated ethereal password
        },
      });



      const mailOptions = {
        from: mailerConfig.email,
        to: data?.email,
        subject: `Bienvenue chez School Gestion ! Quelques documents sur la gestion de votre enseignement`,

        attachments: [
          {
            filename: filename,
            path: pathPdf,
            contentType: "application/pdf",
          },

        ],
      };

      transporter.sendMail(mailOptions, function (error: any, info: any) {
        if (error) {
          console.log(error);
        }
      });



      return res.status(200).send({
        status: "SUCCESS",
        message: "file successfully downloaded",
        path: pathPdf,
        filename: filename,
      });
    } catch (error) {
      console.log("errr", error)
      return res.status(500).send({
        status: "ERROR",
        code: "SERVER_ERROR",
        message: `Failed to save signatures, ${error}`,
      });
    }
  };



}