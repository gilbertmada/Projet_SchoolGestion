import { IStudent } from "./StudentInterface";


export interface INoteJournalier {

    note_Maths: any;
    coef_Maths: any;
    note_Pc: any;
    coef_Pc: any,
    note_Ang: any,
    coef_Ang: any;
    note_Mal: any;
    coef_Mal: any;
    note_Fr: any;
    coef_Fr: any;
    note_Philo: any;
    coef_Philo: any;
    note_HistoGeo: any;
    coef_HistoGeo: any;
    note_SVT: any;
    coef_SVT: any;
    note_Eps: any;
    coef_Eps: any;

}

export interface INoteComposition {

    note_Maths: any;
    coef_Maths: any;
    note_Pc: any;
    coef_Pc: any,
    note_Ang: any,
    coef_Ang: any;
    note_Mal: any;
    coef_Mal: any;
    note_Fr: any;
    coef_Fr: any;
    note_Philo: any;
    coef_Philo: any;
    note_HistoGeo: any;
    coef_HistoGeo: any;
    note_SVT: any;
    coef_SVT: any;
    note_Eps: any;
    coef_Eps: any;

}

export interface INotes {
    _id: string;
    noteJournalier:INoteJournalier;
    noteComposition:INoteComposition;
    noteJournalier2e:INoteJournalier;
    noteComposition2e:INoteComposition;
    noteJournalier3e:INoteJournalier;
    noteComposition3e:INoteComposition;
    arrayListNoteDef:any[];
    arrayListNoteDef2e:any[];
    stud: IStudent;
    total1erTrim:any;
    total2eTrim:any;
    total3eTrim:any;
    totalTrim:any;
    totalCoefJ0:any;
    totalCoefCompo0:any;
    totalJ1:any;
    totalJ2:any;
    totalCompo0:any;
    totalCompo1:any;
    totalCompo2:any;
    generalMoyen1erTrim:any;
    generalMoyen2eTrim:any;
    generalMoyen3eTrim:any;
    generalMoyenTrim: any;
    deleted: boolean;
    updatedBy: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    urlPlus?: string;
}