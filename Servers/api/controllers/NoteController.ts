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
    const student: IStudent | any = await Student.findById({ _id: note.stud._id });
    //     const noteJ={
    // note_Maths:note.noteJ.note_Maths,
    // coef_Maths:note.noteJ.coef_Maths,
    // note_Pc:note.noteJ.note_Pc,
    // coef_Pc:note.noteJ.coef_Pc,
    // note_Ang:note.noteJ.note_Ang,
    // coef_Ang:note.noteJ.coef_Ang,
    // note_Fr:note.noteJ.note_Fr,
    // coef_Fr:note.noteJ.coef_Fr,
    // note_Mal:note.noteJ.note_Mal,
    // coef_Mal:note.noteJ.coef_Mal,
    // note_HistoGeo:note.noteJ.note_HistoGeo,
    // coef_HistoGeo:note.noteJ.coef_HistoGeo,
    // note_Philo:note.noteJ.note_Philo,
    // coef_Philo:note.noteJ.coef_Philo,
    // note_Eps:note.noteJ.note_Eps,
    // coef_Eps:note.noteJ.coef_Eps,

    //     }
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
    const { _id, ...info } = req.body;


    const token = <string>res.getHeader("token");

    try {


      const student: IStudent | any = await Student.findById({ _id: info.stud._id });
      if (!student) {
        res.status(403).send({
          status: 'ERROR',
          code: 'USER_NOT_FOUND',
          message: "Unable to find class to update"
        });
        return;
      }
      console.log("info...", info);

      const noteJ = {
        note_Maths: info.noteJournalier.note_Maths,
        coef_Maths: info.noteJournalier.coef_Maths,
        note_Pc: info.noteJournalier.note_Pc,
        coef_Pc: info.noteJournalier.coef_Pc,
        note_Ang: info.noteJournalier.note_Ang,
        coef_Ang: info.noteJournalier.coef_Ang,
        note_Fr: info.noteJournalier.note_Fr,
        coef_Fr: info.noteJournalier.coef_Fr,
        note_Mal: info.noteJournalier.note_Mal,
        coef_Mal: info.noteJournalier.coef_Mal,
        note_HistoGeo: info.noteJournalier.note_HistoGeo,
        coef_HistoGeo: info.noteJournalier.coef_HistoGeo,
        note_Philo: info.noteJournalier.note_Philo,
        coef_Philo: info.noteJournalier.coef_Philo,
        note_SVT: info.noteJournalier.note_SVT,
        coef_SVT: info.noteJournalier.coef_SVT,
        note_Eps: info.noteJournalier.note_Eps,
        coef_Eps: info.noteJournalier.coef_Eps,

      }

      const noteCompo = {
        note_Maths: info.noteComposition.note_Maths,
        coef_Maths: info.noteComposition.coef_Maths,
        note_Pc: info.noteComposition.note_Pc,
        coef_Pc: info.noteComposition.coef_Pc,
        note_Ang: info.noteComposition.note_Ang,
        coef_Ang: info.noteComposition.coef_Ang,
        note_Fr: info.noteComposition.note_Fr,
        coef_Fr: info.noteComposition.coef_Fr,
        note_Mal: info.noteComposition.note_Mal,
        coef_Mal: info.noteComposition.coef_Mal,
        note_HistoGeo: info.noteComposition.note_HistoGeo,
        coef_HistoGeo: info.noteComposition.coef_HistoGeo,
        note_Philo: info.noteComposition.note_Philo,
        coef_Philo: info.noteComposition.coef_Philo,
        note_SVT: info.noteComposition.note_SVT,
        coef_SVT: info.noteComposition.coef_SVT,
        note_Eps: info.noteComposition.note_Eps,
        coef_Eps: info.noteComposition.coef_Eps,

      }
      const updatedInfo: any = {
        stud: student,
        noteJourlier: noteJ,
        noteComposition: noteCompo,
        createdBy: getUserIdFromToken(token),
        deleted: false,
      };

      const resp = await Notes.updateOne({ _id: req.body.id }, updatedInfo);
      console.log("updatedInfo...", updatedInfo);
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