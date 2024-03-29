export interface IStudent {
  idStudent: string;
  schoolName: string;
  lastName: string;
  firstName: string;
  scolarYear: string;
  role: string;
  nomRole: string;
  email: string;
  height: string;
  matriculNumber: string;
  documents: any;
  historyStudent: any[];
  historyStudentEcolage:any[];
  historyStudentFrais:any[];
  historyStudentDroit:any[];
  inscriptionDroit: string;
  class: string;
  address: string;
  deleted: boolean;
  date: Date;
  photo: string;
  urlPlus?: string;
  isPrive: boolean;
}


export interface IFraisDivers {
  id: number;
  student: string;
  matriculNumber: string;
  frais: string;
  datePayDivers: Date | string;
  isFrais: boolean;
}

export interface IEcolagePrive {
  id: number;
  student: any;
  matriculNumber: string;
  ecolage: string;
  datePayEcolage: Date | string;
  ecolageMonth: string;
  isEcolage: boolean;
}
