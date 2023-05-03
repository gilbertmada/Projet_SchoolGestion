import moment from "moment";
import { toJS } from "mobx";
import { StudentStoreInterface } from "../../store/StudentStore";

export const validationData = (store: StudentStoreInterface): string[] => {
  const errors: string[] = [];

  const listStudents = toJS(store.allStudent);

  const classNames = listStudents.filter((item: any) => item?.class === store.Student?.class)

  const schoolName = listStudents.filter((item: any) => item?.schoolName !== store.Student?.schoolName)

  const role_H = classNames.filter((item: any) => item?.role === "LEAD_H");
  const role_F = classNames.filter((item: any) => item?.role === "LEAD_F");


  if (schoolName.length !== 0) {
    errors.push("Nom d'ecole que vous avez saisi est incorrect");
  }

  if (role_H.length >1 && role_H[0].role === store.Student?.role) {
    errors.push("Délégué de classe garçon  a déjà existé");
  }

  if (role_F.length > 1 && role_F[0].role === store.Student?.role) {
    errors.push("Déléguée de classe fille a déjà existé");
  }


  return errors;
};
