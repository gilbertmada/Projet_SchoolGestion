import mongoose, { Schema, Document } from "mongoose";

export interface IStudent extends Document {
    schoolName: string;
    firstName: string;
    lastName: string;
    height: string;
    scolarYear: string;
    matriculNumber: string;
    role: string;
    document:IDocument;
    nomRole: string;
    email: string;
    class: string;
    address: string;
    inscriptionDroit?: string;
    deleted: boolean;
    isPrive: boolean;
    photo: string;
    historyDocument:any[];
    historyStudent:HistoryInfo[];
    historyStudentEcolage: HistoryInfo[];
    historyStudentFrais: HistoryInfo[];
    historyStudentDroit: HistoryInfo[];
    createdBy: string;
    updatedBy: string;
    deletedBy: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    transform: any;
    urlPlus?: string;
}

export  interface HistoryInfo {
    text: string;
    date: Date;
  
  }
export interface IDocument extends Document {
    label:string;
    date:Date;
    path:string;
    filename:string
}

const HistoryInfoSchema: Schema = new Schema({
    text: {
        type: String,
        required: false,
    },
    date: {
        type: Date,
        required: false,
    },

})as any;
const DocumentSchema: Schema = new Schema({
    label: {
        type: String,
        required: false,
    },
    date: {
        type: Date,
        required: false,
    },
    path: {
        type: String,
        required: false,
    },
    filename: {
        type: String,
        required: false,
    },
}) as any;

//Create Schema
const StudentSchema: Schema = new Schema({
    schoolName: {
        type: String,
        required: false,
    },
    firstName: {
        type: String,
        required: false,
    },
    lastName: {
        type: String,
        required: false,
    },
    scolarYear: {
        type: String,
        required: false,
    },
    historyDocument: {
        type: String,
     
    },
    historyStudent: [HistoryInfoSchema],
    historyStudentEcolage: [HistoryInfoSchema],
    historyStudentFrais: [HistoryInfoSchema],
    historyStudentDroit: [HistoryInfoSchema],
    document: [DocumentSchema],
    height: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: false,
    },
    role: {
        type: String,
        required: false,
        default: "LEAD_H ",
    },
    nomRole: {
        type: String,
        required: false,
    },
    matriculNumber: {
        type: String,
        required: false,
    },
    class: {
        type: String,
        required: false,
    },
    inscriptionDroit: {
        type: String,
        // required: true,
    },
    photo: {
        type: String,
        required: false,
    },
    deleted: {
        type: Boolean,
        required: false,
    },
    isPrive: {
        type: Boolean,
        required: false,
    },

    address: {
        type: String,
        required: false,
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        required: false,
    },
    updatedBy: {
        type: mongoose.Types.ObjectId,
    },
    deletedBy: {
        type: mongoose.Types.ObjectId,
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
    }
});

StudentSchema.method("transform", function () {
    const obj:any = this.toObject();
    obj.id = obj._id;
    // delete obj._id;

    return obj;
});

export const Student = mongoose.model<IStudent>("Student", StudentSchema);
