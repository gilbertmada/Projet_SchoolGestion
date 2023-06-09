import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  firstName: string;
  schoolName: string;
  lastName: string;
  email: string;
  username: string;
  role: string;
  nomRole:string;
  deleted: boolean; 
  isArchive: boolean;
  password: string;
  photo: string;
  createdBy: string;
  updatedBy: string;
  deletedBy: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  transform: any;
  categorie: string;
  urlPlus?: string;
}

// Create Schema
const UserSchema: Schema = new Schema({
  lastName: {
    type: String,
    required: false,
  },
  schoolName: {
    type: String,
    required: false,
},
  firstName: {
    type: String,
    required: false,
  },
  role: {
    type: String,
    required: false,
    default: "ADMIN",
  },
  nomRole: {
    type: String,
    required: false,
  },
  username: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: false,
  },
  photo: {
    type: String,
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
  categorie: {
    type: String,
    required: false,
  },
  urlPlus: {
    type: String,
    required: false,
  },
});

UserSchema.method("transform", function () {
  const obj:any = this.toObject();

  //Rename fields
  obj.id = obj._id;
  // delete obj._id;

  return obj;
});

export const User = mongoose.model<IUser>("User", UserSchema);
