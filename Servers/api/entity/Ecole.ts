import mongoose, { Schema, Document } from "mongoose";


export interface ISchool extends Document {
    schoolName: string;
    user: any;
    identifiant:any;
    isArchive: boolean;
    updatedBy: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    transform: any;
    urlPlus?: string;
}

// Create Schema
const SchoolSchema: Schema = new Schema({

    schoolName: {
        type: String,
        required: false,
    },
    user: {
      
        type: mongoose.Schema.Types.Mixed,
        required: false,
        
    },
    identifiant: {
        type: Date,
        default: Date.now,
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
SchoolSchema.method("transform", function () {
    const obj:any = this.toObject();

    //Rename fields
    obj.id = obj._id;
    // delete obj._id;

    return obj;
});

export const School = mongoose.model<ISchool>("School", SchoolSchema);
