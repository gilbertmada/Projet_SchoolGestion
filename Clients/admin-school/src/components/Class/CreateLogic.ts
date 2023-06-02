import moment from "moment";
import { toJS } from "mobx";
import { ClasseStoreInterface } from "../../store/ClasseStore";

export const validationData = (store: ClasseStoreInterface, student: any): string[] => {
  const errors: string[] = [];

  const listClass = toJS(store.allClass);

  const classNames = listClass.filter((item: any) => item?.className === student.className);

  const nomHorrorDay = classNames.filter((item: any) => item?.day === student.day && item?.horror === student.horror);


  // if ( classNames[0].schoolName !== store.classe?.schoolName) {
  //   errors.push("Nom d'ecole que vous avez saisi est incorrect");
  // }

  if (nomHorrorDay.length === 1 && nomHorrorDay[0].day === student.day) {
    errors.push("Heure et jour ont déjà utilisé");
  }


  return errors;
};
