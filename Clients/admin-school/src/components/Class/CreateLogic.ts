import moment from "moment";
import { toJS } from "mobx";
import { ClasseStoreInterface } from "../../store/ClasseStore";

export const validationData = (store: ClasseStoreInterface): string[] => {
  const errors: string[] = [];

  const listClass = toJS(store.allClass);

  const classNames = listClass.filter((item: any) => item?.className === store.classe?.className);

  
  const nomHorrorDay = classNames.filter((item: any) => item?.day === store.classe?.day && item?.horror === store.classe?.horror);


  if ( classNames[0].schoolName !== store.classe?.schoolName) {
    errors.push("Nom d'ecole que vous avez saisi est incorrect");
  }

  if (nomHorrorDay.length === 1 && nomHorrorDay[0].day === store.classe?.day) {
    errors.push("Heure et jour ont déjà utilisé");
  }


  return errors;
};
