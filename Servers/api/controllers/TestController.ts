import { Request, Response } from "express";
import { Test } from "../entity/Test";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import config from "config";
import { ITest } from "../entity/Test";
// import { getUserIdFromToken } from "../utils/user";

export default class TestController {

  static test = async (req: Request, res: Response) => {
    const token = <string>res.getHeader("token");

    const newUser = new Test({
      lastName: req.body?.lastName,
      firstName: req.body?.firstName,
    });
    try {
      const user = await newUser.save();
      res.send(user);
    } catch (err) {
      console.log(err)
      res.status(500).send("Failed to save user");
    }


  };


  static listAll = async (req: Request, res: Response) => {
    const users = await Test.find({ deleted: false});

    const returnedUsers = [];

    for (let i = 0; i < users.length; i++) {
      returnedUsers.push(users[i].transform());
    }

    return res.status(200).send(returnedUsers);
  };


  
  

 
}
