export interface IProfessor {
    _id?: string;
    lastName: string;
    firstName: string;
    schoolName:string;
    email: string;
    role: string;
    nomRole:string;
    password: string;
    IM: string;
    matiere: string;
    deleted: boolean;
    date: Date;
    photo: string;
    urlPlus?: string;
    isArchive: boolean;
  }
  