import mongoose, { Schema, Document } from "mongoose";
import { IStudent } from "./Student";


export interface IHistoryDocument extends Document {
    student: IStudent;
    historyStudentDocument:any[],
    deleted: boolean;
    transform: any;

}

// Create Schema
const HistoryDocumentSchema: Schema = new Schema({

    student: {
        type: mongoose.Schema.Types.Mixed,
        required: false,
    },
  
    historyStudentDocument: {
        type: String,
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
});

HistoryDocumentSchema.method("transform", function () {
    const obj:any = this.toObject();

    //Rename fields
    obj.id = obj._id;
    delete obj._id;

    return obj;
});

export const HistoryDocument = mongoose.model<IHistoryDocument>("History", HistoryDocumentSchema);
