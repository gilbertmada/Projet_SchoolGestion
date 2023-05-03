import { Request, Response, NextFunction } from "express";
import { IUser, User } from "../entity/User";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import config from "config";
import { ISchool, School } from "../entity/Ecole";
import { getUserIdFromToken } from "../utils/user";

export default class SchoolController {


  static newSchool = async (req: Request, res: Response, next: NextFunction) => {
    const token = <string>res.getHeader("token");
    const school: ISchool | any = req.body;
    const user: IUser | any = await User.findById({ _id: school.user._id });


    console.log("createCreate....", req.body);
    const newSchool = new School({
      schoolName: school.schoolName,
      user: user,    
      createdBy: getUserIdFromToken(token),
      deleted: false,
    });


    try {
      console.log("saveClasse....", newSchool);
      const saveClasse = await newSchool.save();

      res.send(saveClasse);
    } catch (error) {
      res.status(500).send("Failed to save Classe");
    }

  };



  static listAll = async (req: Request, res: Response) => {
    const schools = await School.find({ deleted: false, isArchive: false });

    const returnedUsers = [];

    for (let i = 0; i < schools.length; i++) {
      returnedUsers.push(schools[i].transform());
    }

    return res.status(200).send(returnedUsers);
  };


  static deleteTotalSchool = async (req: Request, res: Response) => {
    const token = <string>res.getHeader("token");
    const userId = getUserIdFromToken(token);

    if (!userId) {
      return res.status(500).send("Unable to delete user");
    }
    try {
      const isTest = false;
      const user = await School.deleteOne(
        {
          _id: req.body.id,
        },
      );



      return res.status(200).send("User deleted successfully");
    } catch (err) {
      res.status(500).send("Unable to delete user");
    }
  };

  static getFilteredSchool = async (req: Request, res: Response) => {

    const { filter } = req.body;
    try {
      const school: ISchool[] | [] = await School.find({
        $and: [
          {
            $or: [
              { schoolName: { $regex: filter.filter, $options: "i" } },
              // { lastName: { $regex: filter.filter, $options: "i" } },
              // { email: { $regex: filter.filter, $options: "i" } },
              // { username: { $regex: filter.filter, $options: "i" } },
              // { role: { $regex: filter.filter, $options: "i" } },
            ],
          },
          { deleted: false, isArchive: false },
        ],
      }).select("-password");


      const returnedUsers = [];

      for (let i = 0; i < school.length; i++) {
        returnedUsers.push(school[i].transform());
      }

      return res.status(200).send(returnedUsers);
    } catch (err) {
      return res.send([]);
    }
  };



  static editSchool = async (req: Request, res: Response) => {

    const { _id, ...info } = req.body;

    console.log("info...", req.body);

    const token = <string>res.getHeader("token");

    try {


      const user: IUser | any = await User.findOne({ _id: info.user._id });
      if (!user) {
        res.status(403).send({
          status: 'ERROR',
          code: 'USER_NOT_FOUND',
          message: "Unable to find class to update"
        });
        return;
      }
      const updatedInfo: any = {
        schoolName: info.schoolName,
        user: user,
        createdBy: getUserIdFromToken(token),
        deleted: false,
      };

      const resp = await School.updateOne({ _id: req.body._id }, updatedInfo);

      res.status(200).send(resp);
    } catch (err) {
      res.status(500).send({
        status: 'ERROR',
        code: 'INTERNAL_SERVER_ERROR',
        message: "Unable to update user"
      });
    }
  };

  static updateUrl = async (req: Request, res: Response) => {

    const token = <string>res.getHeader("token");
    const userId = getUserIdFromToken(token);

    const random: any = `${Math.random()}`;
    const words = random.split(".");
    const urlPlus = words[1]


    // if (!userId) {
    //   return res.status(500).send("Unable to delete user");
    // }


    try {
      const user = await User.updateOne(
        {
          _id: req.body.id,
        },
        {
          $set: { urlPlus: req.body.urlplus },
        }
      );

      return res.status(200).send({
        status: "urlPlus success",
        urlplus: urlPlus
      });
    } catch (err) {
      res.status(500).send("Unable to give urlPlus");
    }
  };

}
