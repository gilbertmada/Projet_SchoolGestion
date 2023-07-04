import mongoose, { Schema, Document } from "mongoose";
import { IStudent } from "./Student";


export interface INotes extends Document {

    stud: IStudent;
    noteJournalier: INoteJournalier;
    noteComposition: INoteComposition;
    noteJournalier2e: INoteJournalier;
    noteComposition2e: INoteComposition;
    noteJournalier3e: INoteJournalier;
    noteComposition3e: INoteComposition;
    arrayListNoteDef: Array<any>;
    arrayListNoteDef2e: Array<any>;
    total1erTrim:any;
    total2eTrim:any;
    total3eTrim:any;
    totalTrim:any;
    totalCoefJ0:any;
    totalJour1:any;
    totalJour2:any;
    totalComposition0:any
    totalComposition1:any
    totalComposition2:any
    generalMoyen1erTrim: any;
    generalMoyen2eTrim: any;
    generalMoyen3eTrim: any;
    generalMoyenTrim: any;
    deleted: boolean;
    isArchive: boolean;
    updatedBy: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    transform: any;
    urlPlus?: string;
}



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

// Create Schema noteJ
const NoteJSchema: Schema = new Schema({

    note_Maths: {
        type: Number,
        required: false,
    },
    coef_Maths: {
        type: Number,
        required: false,
    },
    note_Pc: {
        type: Number,
        required: false,
    },
    coef_Pc: {
        type: Number,
        required: false,
    },
    note_Ang: {
        type: Number,
        required: false,
    },
    coef_Ang: {
        type: Number,
        required: false,
    },
    note_Fr: {
        type: Number,
        required: false,
    },
    coef_Fr: {
        type: Number,
        required: false,
    },
    note_Mal: {
        type: Number,
        required: false,
    },
    coef_Mal: {
        type: Number,
        required: false,
    },
    note_HistoGeo: {
        type: Number,
        required: false,
    },
    coef_HistoGeo: {
        type: Number,
        required: false,
    },
    note_Philo: {
        type: Number,
        required: false,
    },
    coef_Philo: {
        type: Number,
        required: false,
    },
    note_SVT: {
        type: Number,
        required: false,
    },
    coef_SVT: {
        type: Number,
        required: false,
    },
    note_Eps: {
        type: Number,
        required: false,
    },
    coef_Eps: {
        type: Number,
        required: false,
    },
}) as any;

// Create Schema noteCompo
const NoteCompoSchema: Schema = new Schema({

    note_Maths: {
        type: Number,
        required: false,
    },
    coef_Maths: {
        type: Number,
        required: false,
    },
    note_Pc: {
        type: Number,
        required: false,
    },
    coef_Pc: {
        type: Number,
        required: false,
    },
    note_Ang: {
        type: Number,
        required: false,
    },
    coef_Ang: {
        type: Number,
        required: false,
    },
    note_Fr: {
        type: Number,
        required: false,
    },
    coef_Fr: {
        type: Number,
        required: false,
    },
    note_Mal: {
        type: Number,
        required: false,
    },
    coef_Mal: {
        type: Number,
        required: false,
    },
    note_HistoGeo: {
        type: Number,
        required: false,
    },
    coef_HistoGeo: {
        type: Number,
        required: false,
    },
    note_Philo: {
        type: Number,
        required: false,
    },
    coef_Philo: {
        type: Number,
        required: false,
    },
    note_SVT: {
        type: Number,
        required: false,
    },
    coef_SVT: {
        type: Number,
        required: false,
    },
    note_Eps: {
        type: Number,
        required: false,
    },
    coef_Eps: {
        type: Number,
        required: false,
    },
}) as any;

// Create Schema
const NoteSchema: Schema = new Schema({

    stud: {
        type: mongoose.Schema.Types.Mixed,
        required: false,
    },
    noteJournalier: NoteJSchema,
    noteComposition: NoteCompoSchema,
    noteJournalier2e: NoteJSchema,
    noteComposition2e: NoteCompoSchema,
    noteJournalier3e: NoteJSchema,
    noteComposition3e: NoteCompoSchema,
    arrayListNoteDef: {
        type: Array,
        required: false
     },
     arrayListNoteDef2e: {
        type: Array,
        required: false
     },
    total1erTrim: {
        type: Number,
        required: false,
    },
    total2eTrim: {
        type: Number,
        required: false,
    },
    total3eTrim: {
        type: Number,
        required: false,
    },
    totalTrim: {
        type: Number,
        required: false,
    },
    generalMoyen1erTrim: {
        type: Number,
        required: false,
    },
    generalMoyen2eTrim: {
        type: Number,
        required: false,
    },
    generalMoyen3eTrim: {
        type: Number,
        required: false,
    },
    generalMoyenTrim: {
        type: Number,
        required: false,
    },
    totalCoefJ0: {
        type: Number,
        required: false,
    },
    deleted: {
        type: Boolean,
        default: false,
    },
    isArchive: {
        type: Boolean,
        default: false,
    },
    deletedBy: {
        type: mongoose.Schema.Types.ObjectId,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
    },
    deletedAt: {
        type: Date,
    },
    urlPlus: {
        type: String,
        required: false,
    },
});
NoteSchema.method("transform", function () {
    const obj: any = this.toObject();

    //Rename fields
    obj.id = obj._id;
    delete obj._id;

    return obj;
});

export const Notes = mongoose.model<INotes>("Notes", NoteSchema);
