import moment from "moment";
import { toJS } from "mobx";
import { StudentStoreInterface } from "../../store/StudentStore";

export const validationData = (store: any): string[] => {
  const errors: string[] = [];

  // const listStudents = toJS(store.allStudent);

  // const classNames = listStudents.filter((item: any) => item?.class === student.class)



  // const role_H = classNames.filter((item: any) => item?.role === "LEAD_H");
  // const role_F = classNames.filter((item: any) => item?.role === "LEAD_F");

  console.log("store//", store);


  if (!store.stud?.matriculNumber) {
    errors.push("L'information d'élève est vide");
  }


  if (store.noteJounalier?.coef_Maths === ""
    || store.noteJounalier?.coef_Pc === ""
    || store.noteJounalier?.coef_Ang === ""
    || store.noteJounalier?.coef_Fr === ""
    || store.noteJounalier?.coef_Mal === ""
    || store.noteJounalier?.coef_Philo === ""
    || store.noteJounalier?.coef_HistoGeo === ""
    || store.noteJounalier?.coef_SVT === ""
    || store.noteJounalier?.coef_Eps === ""
  ) {
    errors.push("Les coefficients des notes journalières sont obligatoires");
  }


  if (store.noteComposition?.coef_Maths !== undefined
    || store.noteComposition?.coef_Pc !== undefined
    || store.noteComposition?.coef_Ang !== undefined
    || store.noteComposition?.coef_Fr !== undefined
    || store.noteComposition?.coef_Mal !== undefined
    || store.noteComposition?.coef_Philo !== undefined
    || store.noteComposition?.coef_HistoGeo !== undefined
    || store.noteComposition?.coef_SVT !== undefined
    || store.noteComposition?.coef_Eps !== undefined
  ) {
    errors.push("Les coefficients des notes de compositions sont obligatoires");

  }


  return errors;
};
