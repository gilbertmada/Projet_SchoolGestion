import moment from "moment";
import { toJS } from "mobx";
import { StudentStoreInterface } from "../../store/StudentStore";

export const validationData = (store: any, NoteJ: any, NoteCompo: any, CoefJ: any, CoefCompo: any) => {
  const errors: string[] = [];


  if (!store.stud?.matriculNumber) {
    errors.push("L'information d'élève est vide");
  }

  if (NoteJ.length < 9 && CoefJ.length > 0) {
 
    errors.push("Les coefficients des notes journalières sont obligatoires");

  }

  if (NoteCompo.length < 9 && CoefCompo.length > 0) {

    errors.push("Les coefficients des notes de compositions sont obligatoires");

  }


  return errors;
};
