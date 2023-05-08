import axios from 'axios';
import { action, makeObservable, observable, runInAction, toJS } from 'mobx';
import config from '../config';
import rootStore from './AppStore';
import { parseError } from '../services/utils';
import moment from "moment";
import { IEcolagePrive, IFraisDivers, IStudent } from '../common/interface/StudentInterface';
import { IUser } from '../common/interface/userInterface';
import getTime from 'date-fns/getTime';


interface IHistoryDetails {
    text: string;
    date: Date;
}

// interface IHistory {
//     document: IHistoryDetails;
//     ecolagePrive: IHistoryDetails;
//     fraisDivers: IHistoryDetails;
//     droit: IHistoryDetails,

// }
const defaultHistory = {
    text: "",
    date: new Date(),

}

export interface StudentStoreInterface {


    allStudent: IStudent[];
    isLoading: boolean;
    isMessage: boolean;
    isNewMessage: boolean;
    newMessag: string;
    setIsMessage: (data: boolean) => void;
    setNewMessg: (data: any) => void;
    setopenDialogDoc: (data: boolean) => void;
    Student: IStudent | null;
    droit: IFraisDivers[];
    ecolagePrive: IEcolagePrive[];
    sumEcolagePrive: any;
    sumFraisDivers: any;
    listHistoryDocument: [IHistoryDetails];
    listHistoryEcolagePrive: [IHistoryDetails];
    listHistoryFraisDivers: [IHistoryDetails];
    listHistoryDroit: [IHistoryDetails];
    loadingListHistoryDocument: boolean;
    loadingListHistoryEcolagePrive: boolean;
    loadingListHistoryFraisDivers: boolean;
    loadingListHistoryDroit: boolean;
    // setListHistoryDocument: (data: any[]) => void;
    // setListHistoryEcolagePrive: (data: any[]) => void;
    // setListHistoryFraisDivers: (data: any[]) => void;
    // setListHistoryDroit: (data: any[]) => void;
    sendMail: (data: any) => void;
    setDroit: (data: IFraisDivers) => void;
    AddNewHistoryDocument: (user: any, docName: any, student: IStudent) => void;
    // AddNewHistoryEcolagePrive: (user: any, docName: any, student: IStudent) => void;
    // AddNewHistoryFraisDivers: (user: any, docName: any, student: IStudent) => void;
    // AddNewHistoryDroit: (user: any, docName: any, student: IStudent) => void;
    getListHistoryDocument: () => void;
    // getListHistoryEcolagePrive:() => void;
    // getListHistoryFraisDivers:() => void;
    // getListHistoryDroit:() => void;
    setEcolagePrive: (data: IEcolagePrive) => void;
    setSumEcolagePrive: (data: number) => void;
    setSumFraisDivers: (data: number) => void;
    setStudent: (student: IStudent | null) => void;
    getAllStudent: () => Promise<any>;
    getListFraisDivers: () => Promise<any>;
    getListEcolage: () => Promise<any>;
    getFilteredStudent: (filter: Record<string, unknown>) => Promise<any>;
    createEcolagePrive: (data: any) => void;
    createFraisDivers: (data: any) => void;
    updateFilters: (name: "currentlyWorking", status: boolean) => void;
    filters: { currentlyWorking: boolean };
    createStudent: (data: IStudent) => void;
    updateStudent: (data: IStudent) => void;
    resetStudent: () => void;
    deleteTotalStudent: (data: IStudent) => void;
    deleteTotalEcolage: (data: IEcolagePrive) => void;
    deleteTotalFraisDivers: (data: IFraisDivers) => void;
    selectedStudent: IStudent | null;
    setSelectedStudent: (data: IStudent | null) => void;
    // AddNewHistoryStudent: (data: IStudent | null) => void;
    urlDocument: any[] | [];
    document: any;
    setDocument: (e: any, key: string) => void;

}


class StudentStore implements StudentStoreInterface {

    @observable Student: IStudent | null = null;

    @observable selectedStudent: IStudent | null = null;

    @observable document: any = {};

    @observable isMessage = false;

    @observable loadingListHistoryDocument = false;

    @observable loadingListHistoryEcolagePrive = false;

    @observable loadingListHistoryFraisDivers = false;

    @observable loadingListHistoryDroit = false;

    @observable newMessag = "";

    @observable isNewMessage = false;

    @observable allStudent: IStudent[] = [];

    @observable droit: IFraisDivers[] = [];

    @observable urlDocument: any[] = [];


    @observable ecolagePrive: IEcolagePrive[] = [];

    @observable isLoading = false;

    @observable openDialogDoc = false;

    @observable listHistoryDocument: [IHistoryDetails] = [defaultHistory];

    @observable listHistoryEcolagePrive: [IHistoryDetails] = [defaultHistory];

    @observable listHistoryFraisDivers: [IHistoryDetails] = [defaultHistory];

    @observable listHistoryDroit: [IHistoryDetails] = [defaultHistory];

    @observable sumEcolagePrive = 0;

    @observable sumFraisDivers = 0;

    @action resetStudent = () => {
        this.filters = {
            // immo: false,
            available: true,
            currentlyWorking: true,
            isBlocked: false,
        };
    }

    @action setIsMessage = (data: boolean) => {
        this.isMessage = data;
    }

    @action setNewMessg = (data: any) => {
        this.newMessag = { ...data };
    }

    @action setDocument = (data: any) => {

        this.document = data;
    };

    @observable filters = {
        // immo: false,
        available: true,
        currentlyWorking: true,
        isBlocked: false,
    };

    constructor() {
        makeObservable(this);
    }

    @action setSelectedStudent = (student: IStudent | null) => {
        this.selectedStudent = student;
    };

    @action setStudent = (s: IStudent | null) => {
        this.Student = s;
    };

    // @action setListHistoryDocument = (doc:any []) => {
    //     this.listHistoryDocument.push({doc});
    // };

    @action setopenDialogDoc = (bool: boolean) => {
        this.openDialogDoc = bool;
    };

    @action setDroit = (d: IFraisDivers) => {
        // if (!this.selectedStudent?.schoolName.includes("Privé")) {
        //     this.Student?.isFrais === true;
            this.droit = [...this.droit, d];
        // }

    };

    @action setEcolagePrive = (ecolage: IEcolagePrive) => {
        // if (this.selectedStudent?.schoolName.includes("Privé")) {
        //     this.Student?.isPrive === true;
            this.ecolagePrive = [...this.ecolagePrive, ecolage];
        // }

    };

    @action setSumEcolagePrive = (data: number) => {
        this.sumEcolagePrive = data;
    };

    @action setSumFraisDivers = (data: number) => {
        this.sumFraisDivers = data;
    };

    @action updateFilters = (name: "currentlyWorking", status: boolean) => {

        if (status === true) {
            this.filters = { ...this.filters, [name]: status };
            this.getFilteredStudent({ filter: "" });

        }

    };

    @action AddNewHistoryDocument = async (user: any, student: IStudent, docName: any) => {
        try {

            const add = await axios.patch(`${config.servers.apiUrl}student/historyDocument`,
                {
                    user,
                    student,
                    docName
                });

            console.log("add....", add);

            rootStore.updateSnackBar(true, 'Modifié', 'success');

            return add;

        } catch (err: any) {
            if (err.message.includes('code 400')) {
                rootStore.updateSnackBar(true, 'Le type ');
                return;
            }

            rootStore.updateSnackBar(true, "Une erreur s'est produite. Veuillez réessayer plus tard!");
        }

    }

    // @action AddNewHistoryDocument = async (user: any, student: IStudent, docName: any) => {
    //     this.loadingListHistoryDocument = true;
    //     if (student.class) {
    //         if ((student.role === "LEAD_H" || student.role === "LEAD_F")) {

    //             this.listHistoryDocument?.push({
    //                 text: `- <b>${user.lastName}</b> a envoyé de document <b>${docName.label}</b> à <b>${student.lastName}</b>,
    //               <b>${student.nomRole}</b>  <b>${student.class}</b> le <b>${moment().format("DD/MM/YYYY")}</b>.`,
    //                 date:  new Date(),
    //             })

    //         }
    //     }
    //     this.loadingListHistoryDocument = false;
    // }

    @action getAllStudent = async () => {
        this.isLoading = true;
        try {
            const students = await axios.get(`${config.servers.apiUrl}student/`);

            this.allStudent = students.data;
            this.isLoading = false;
        } catch (error) {

            parseError(
                error,
                "Une erreur s'est produite lors de la requête de vos infos. Veuillez réessayer"
            );
            this.isLoading = false;
        } finally {
            this.isLoading = false;
        }
    };


    @action getListHistoryDocument = async () => {
        this.loadingListHistoryDocument = true;
        try {
            const documentList = await axios.get(`${config.servers.apiUrl}student/historyDocument`);
            console.log("documentList....", documentList);

            // this.listHistoryDocument.document = students.data;
            this.loadingListHistoryDocument = false;
        } catch (error) {

            parseError(
                error,
                "Une erreur s'est produite lors de la requête de vos infos. Veuillez réessayer"
            );
            this.loadingListHistoryDocument = false;
        } finally {
            this.loadingListHistoryDocument = false;
        }
    };

    @action getListEcolage = async () => {
        this.isLoading = true;
        try {
            const ecolages = await axios.get(`${config.servers.apiUrl}student/getEcolage`);
            this.ecolagePrive = ecolages.data;
            this.isLoading = false;
        } catch (error) {

            parseError(
                error,
                "Une erreur s'est produite lors de la requête de vos infos. Veuillez réessayer"
            );
            this.isLoading = false;
        } finally {
            this.isLoading = false;
        }
    };

    @action getListFraisDivers = async () => {
        this.isLoading = true;
        try {
            const frais = await axios.get(`${config.servers.apiUrl}student/getFraisDivers`);
            this.droit = frais.data;
            this.isLoading = false;
        } catch (error) {

            parseError(
                error,
                "Une erreur s'est produite lors de la requête de vos infos. Veuillez réessayer"
            );
            this.isLoading = false;
        } finally {
            this.isLoading = false;
        }
    };

    @action createStudent = async (data: IStudent) => {

        try {

            const add = await axios.post(`${config.servers.apiUrl}student`, data);

            if (add.data.matriculNumber === 'MatriculNumber already exists') {
                rootStore.updateSnackBar(true, 'Numéro matricule existe déjà');

            } else {
                rootStore.succesSnackBar(true, 'Elève ajouter avec succès');

            }
            return add;

        } catch (err: any) {
            if (err.message.includes('code 400')) {
                rootStore.updateSnackBar(true, 'Le type ');
                return;
            }

            rootStore.updateSnackBar(true, "Une erreur s'est produite. Veuillez réessayer plus tard!");
        }
    };

    @action sendMail = async (data: any) => {
        this.isLoading = true;
        try {

            const add = await axios.post(`${config.servers.apiUrl}student/sendMail`, data);

            if (!add.data.Document.label) {
                rootStore.updateSnackBar(true, 'Pas de nom de document');

            } else {
                rootStore.succesSnackBar(true, 'Mail envoyé avec succès');

            }
            this.isLoading = false;
            return add;

        } catch (err: any) {
            if (err.message.includes('code 400')) {
                rootStore.updateSnackBar(true, 'Le type ');
                return;
            }

            rootStore.updateSnackBar(true, "Une erreur s'est produite. Veuillez réessayer plus tard!");
        }
    };

    @action createEcolagePrive = async (data: any) => {
        try {

            const addEcolage = await axios.post(`${config.servers.apiUrl}student/ecolage`,
                data
            );


            if (addEcolage.data.student === 'lastName incorrect') {
                rootStore.updateSnackBar(true, 'Prénom incorrect !');

            } else {
                rootStore.succesSnackBar(true, 'Ecolage ajouter avec succès');

            }
            return addEcolage;

        } catch (err: any) {
            if (err.message.includes('code 400')) {
                rootStore.updateSnackBar(true, 'Le type ');
                return;
            }

            rootStore.updateSnackBar(true, "Une erreur s'est produite. Veuillez réessayer plus tard!");
        }
    };

    @action createFraisDivers = async (data: any) => {
        try {

            const addFraisDivers = await axios.post(`${config.servers.apiUrl}student/fraisDivers`, data);

            if (addFraisDivers.data.student === 'lastName incorrect') {
                rootStore.updateSnackBar(true, 'Prénom incorrect !');

            } else {
                rootStore.succesSnackBar(true, 'Frais Divers ajouter avec succès');

            }
            return addFraisDivers;

        } catch (err: any) {
            if (err.message.includes('code 400')) {
                rootStore.updateSnackBar(true, 'Le type ');
                return;
            }

            rootStore.updateSnackBar(true, "Une erreur s'est produite. Veuillez réessayer plus tard!");
        }
    };

    @action updateStudent = async (studentUpdate: IStudent) => {
        try {
            const student = await axios.patch(`${config.servers.apiUrl}student/edit`, studentUpdate);

            rootStore.updateSnackBar(true, 'Modifié', 'success');

            //   if (this.user?._id === userUpdate._id) {
            //     this.getUserInfo();
            //   }


            return student;
        } catch (err) {
            parseError(err, {
                404: "L'élève demandé est introuvable",
                403: 'Vous ne pouvez pas effectuer cette opération ou le mot de passe entré est incorrect',
            });
        }
    };

    @action getFilteredStudent = async (filter: Record<string, unknown>) => {

        try {
            this.isLoading = true;
            const students = await axios.post(`${config.servers.apiUrl}student/filter`,
                {
                    filter,

                }
            );

            runInAction(() => {
                this.allStudent = students.data;
                this.isLoading = false;
            });
            // this.allUsers = users.data;
            // this.isLoading = false;

            return students.data;
        } catch (error) {
            parseError(
                error,
                "Une erreur s'est produite lors de la requête de vos infos. Veuillez réessayer"
            );
        } finally {
            this.isLoading = false;
        }
    };



    @action deleteTotalStudent = async (studentDelete: IStudent) => {
        try {

            const student = await axios.patch(`${config.servers.apiUrl}student/deleteTotal`, studentDelete);

            rootStore.updateSnackBar(true, 'Supprimé', 'success');
            return student;
        } catch (err) {
            parseError(err, {
                404: "L'utilisateur demandé est introuvable",
                403: 'Vous ne pouvez pas effectuer cette opération ou le mot de passe entré est incorrect',
            });
        }
    };


    @action deleteTotalEcolage = async (ecolageDelete: IEcolagePrive) => {
        try {

            const ecolage = await axios.patch(`${config.servers.apiUrl}student/deleteTotalEcolage`, ecolageDelete);

            rootStore.updateSnackBar(true, 'Supprimé', 'success');
            return ecolage;
        } catch (err) {
            parseError(err, {
                404: "L'utilisateur demandé est introuvable",
                403: 'Vous ne pouvez pas effectuer cette opération ou le mot de passe entré est incorrect',
            });
        }
    };

    @action deleteTotalFraisDivers = async (fraisDiversDelete: IFraisDivers) => {
        try {

            const fraisDivers = await axios.patch(`${config.servers.apiUrl}student/deleteTotalFraisDivers`, fraisDiversDelete);

            rootStore.updateSnackBar(true, 'Supprimé', 'success');
            return fraisDivers;
        } catch (err) {
            parseError(err, {
                404: "L'utilisateur demandé est introuvable",
                403: 'Vous ne pouvez pas effectuer cette opération ou le mot de passe entré est incorrect',
            });
        }
    };


}
export default new StudentStore();