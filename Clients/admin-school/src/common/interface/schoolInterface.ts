import { IUser } from './userInterface';
export interface ISchool {
    _id: string;
    schoolName: string;
    identifiant: Date;
    user: IUser;
    deleted: boolean;
    updatedBy: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    urlPlus?: string;
}
