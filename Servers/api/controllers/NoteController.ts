import { Request, Response } from "express";
import { INotes, Notes } from "~~/entity/Notes";
import { getUserIdFromToken } from "../utils/user";
import { IStudent, Student } from "~~/entity/Student";
import { log } from "console";

export default class noteController {
  static createNotes = async (req: Request, res: Response) => {


    const token = <string>res.getHeader("token");
    const note: INotes | any = req.body;
    console.log("note...", note);
    const newNote = new Notes({
      ...note,
      createdBy: getUserIdFromToken(token),
      deleted: false,
    });


    try {

      const saveNote = await newNote.save();

      res.send(saveNote);
    } catch (error) {
      res.status(500).send("Failed to save Classe");
    }
  };

  static editNote = async (req: Request, res: Response) => {

    const note = req.body;
    console.log("note.edit..", note);
    const token = <string>res.getHeader("token");

    try {

      const newNote = await Promise.all([
        Student.updateOne({ _id: note.stud.idStudent }, { ...note.stud }),
        Notes.updateOne({ idNote: note.idNote },
          {
            ...note
          })
      ])

      console.log("resp..", newNote);
      res.status(200).send(newNote);
    } catch (err) {
      res.status(500).send({
        status: 'ERROR',
        code: 'INTERNAL_SERVER_ERROR',
        message: "Unable to update user"
      });
    }
  };


  static listNotes = async (req: Request, res: Response) => {
    const notes = await Notes.find({ deleted: false });

    const returnedClasses = [];

    for (let i = 0; i < notes.length; i++) {
      returnedClasses.push(notes[i].transform());
    }

    return res.status(200).send(returnedClasses);
  };

  static getFilteredNote = async (req: Request, res: Response) => {

    const { filter } = req.body;
    try {
      const noteFilter: INotes[] | [] = await Notes.find({
        $and: [
          {
            $or: [
              { "stud.lastName": { $regex: filter.filter, $options: "i" } },
              { "stud.class": { $regex: filter.filter, $options: "i" } },
              { "stud.matriculNumber": { $regex: filter.filter, $options: "i" } },
            ],
          },
        ],
      });

      const returnedClasses = [];

      for (let i = 0; i < noteFilter.length; i++) {
        returnedClasses.push(noteFilter[i].transform());
      }

      return res.status(200).send(returnedClasses);
    } catch (err) {
      return res.send([]);
    }
  };

  static deleteTotalNote = async (req: Request, res: Response) => {

    const token = <string>res.getHeader("token");
    const noteId = getUserIdFromToken(token);

    if (!noteId) {
      return res.status(500).send("Unable to delete classe");
    }
    try {
      await Notes.deleteOne(
        {
          _id: req.body.id,
        },
      );

      return res.status(200).send("Classe deleted successfully");
    } catch (err) {
      res.status(500).send("Unable to delete classe");
    }

  }
}