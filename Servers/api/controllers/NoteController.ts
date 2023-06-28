import { Request, Response } from "express";
import { INotes, Notes } from "~~/entity/Notes";
import { getUserIdFromToken } from "../utils/user";
import { IStudent, Student } from "~~/entity/Student";
import { log } from "console";

export default class noteController {
  static createNotes = async (req: Request, res: Response) => {
    console.log("note.....", req.body);

    const token = <string>res.getHeader("token");
    const note: INotes | any = req.body;
    // const student: IStudent | any = await Student.findById({ _id: note.stud._id });
    //     const noteJ={
    // note_Maths:note.noteJournalier.note_Maths,
    // coef_Maths:note.noteJournalier.coef_Maths,
    // note_Pc:note.noteJournalier.note_Pc,
    // coef_Pc:note.noteJournalier.coef_Pc,
    // note_Ang:note.noteJournalier.note_Ang,
    // coef_Ang:note.noteJournalier.coef_Ang,
    // note_Fr:note.noteJournalier.note_Fr,
    // coef_Fr:note.noteJournalier.coef_Fr,
    // note_Mal:note.noteJournalier.note_Mal,
    // coef_Mal:note.noteJournalier.coef_Mal,
    // note_HistoGeo:note.noteJournalier.note_HistoGeo,
    // coef_HistoGeo:note.noteJournalier.coef_HistoGeo,
    // note_Philo:note.noteJournalier.note_Philo,
    // coef_Philo:note.noteJournalier.coef_Philo,
    // note_Eps:note.noteJournalier.note_Eps,
    // coef_Eps:note.noteJournalier.coef_Eps,

    //     }
    // const noteCompo = {
    //   note_Maths: note.noteComposition.note_Maths,
    //   coef_Maths: note.noteComposition.coef_Maths,
    //   note_Pc: note.noteComposition.note_Pc,
    //   coef_Pc: note.noteComposition.coef_Pc,
    //   note_Ang: note.noteComposition.note_Ang,
    //   coef_Ang: note.noteComposition.coef_Ang,
    //   note_Fr: note.noteComposition.note_Fr,
    //   coef_Fr: note.noteComposition.coef_Fr,
    //   note_Mal: note.noteComposition.note_Mal,
    //   coef_Mal: note.noteComposition.coef_Mal,
    //   note_HistoGeo: note.noteComposition.note_HistoGeo,
    //   coef_HistoGeo: note.noteComposition.coef_HistoGeo,
    //   note_Philo: note.noteComposition.note_Philo,
    //   coef_Philo: note.noteComposition.coef_Philo,
    //   note_SVT: note.noteComposition.note_SVT,
    //   coef_SVT: note.noteComposition.coef_SVT,
    //   note_Eps: note.noteComposition.note_Eps,
    //   coef_Eps: note.noteComposition.coef_Eps,

    // }
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
    console.log("body...", note);
    const token = <string>res.getHeader("token");

    try {

      note.updatedBy = getUserIdFromToken(token);
      note.updatedAt = new Date();

      const resp = await Notes.updateOne({ _id: note._id },
        {
          ...note,
        }
      );
      console.log("resp...", resp);
      res.status(200).send(resp);
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