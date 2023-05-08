import mongoose, { Schema, Document } from "mongoose";
import { IProfessor, Professor } from "./Professor";
import { IStudent } from "./Student";
import { IEcolagePrive } from "./Student/ecolagePrive";
import { IFraisDivers } from "./Student/fraisDivers";


export interface IHistory extends Document {
    student: IStudent;
    ecolagePrive: IEcolagePrive;
    fraisDivers: IFraisDivers;
    historyStudent:any[],
    historyStudentDocument:any[],
    // prof: IProfessor;
    deleted: boolean;
    transform: any;

}

// Create Schema
const HistorySchema: Schema = new Schema({

    student: {
        type: mongoose.Schema.Types.Mixed,
        required: false,
    },
    ecolagePrive: {
        type: mongoose.Schema.Types.Mixed,
        required: false,
    },
    fraisDivers: {
        type: mongoose.Schema.Types.Mixed,
        required: false,
    },
    historyStudent: {
        type: String,
        required: false,
    },

    historyStudentDocument: {
        type: String,
        required: false,
    },

    deleted: {
        type: Boolean,
        default: false,
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
HistorySchema.method("transform", function () {
    const obj:any = this.toObject();

    //Rename fields
    obj.id = obj._id;
    delete obj._id;

    return obj;
});

export const History = mongoose.model<IHistory>("History", HistorySchema);
