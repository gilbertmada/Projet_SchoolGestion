import axios from 'axios';
import { action, makeObservable, observable, runInAction } from 'mobx';
import config from '../config';
import rootStore from './AppStore';
import { parseError } from '../services/utils';
import { IEcolagePrive, IFraisDivers, IStudent } from '../common/interface/StudentInterface';
// import AppStore from './AppStore';



export interface StudentStoreInterface {
    allStudent: IStudent[];
    isCreate: boolean;
    isCreateDoc: boolean;
    isLoading: boolean;
    isJ6true: boolean;
    isMessage: boolean;
    isNewMessage: boolean;
    newMessag: string;
    setIsMessage: (data: boolean) => void;
    setNewMessg: (data: any) => void;
    setopenDialogDoc: (data: boolean) => void;
    setisJ6true: (data: boolean) => void;
    setBoolDoc: (data: boolean) => void;
    Student: IStudent | null;
    droit: IFraisDivers[];
    ecolagePrive: IEcolagePrive[];
    sumEcolagePrive: any;
    sumFraisDivers: any;
    setDroit: (data: IFraisDivers) => void;
    setEcolagePrive: (data: IEcolagePrive) => void;
    setSumEcolagePrive: (data: number) => void;
    setSumFraisDivers: (data: number) => void;
    setIsCreate: (data: boolean) => void;
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
    boutonLoad: (data: any) => Promise<any>;
    urlDocument: any[] | [];
    document: any;
    setDefaultDocument: () => void;
    setDocument: (e: any, key: string) => void;

}


class StudentStore implements StudentStoreInterface {

    @observable Student: IStudent | null = null;

    @observable selectedStudent: IStudent | null = null;

    @observable document: any = {};

    @observable isCreateDoc = false;

    @observable isJ6true = false;

    @observable isMessage = false;

    @observable newMessag = "";

    @observable isNewMessage = false;

    @observable allStudent: IStudent[] = [];

    @observable droit: IFraisDivers[] = [];

    @observable urlDocument: any[] = [];

    @observable ecolagePrive: IEcolagePrive[] = [];

    @observable isLoading = false;

    @observable openDialogDoc = false;

    @observable isCreate = false;

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

    @action setisJ6true = (data: boolean) => {
        this.isJ6true = data;
    }

    @action setIsMessage = (data: boolean) => {
        this.isMessage = data;
    }

    @action setNewMessg = (data: any) => {
        this.newMessag = {...data};
    }

    @action setBoolDoc = (data: boolean) => {
        this.isCreateDoc = data;
    }

    @action setDefaultDocument = () => {
        this.document = {};
    }

    @action setDocument = (data: any, key: string) => {

        if (key === "deleted") {
            this.document = { ...data };
        } else {

            this.document = {
                ...this.document,
                [key]: { ...data },

            };

            if (key !== "message") {

                const urlDocument: any[] = [...this.urlDocument]

                urlDocument.push(data.path);

                this.urlDocument = urlDocument;

                // this.setConditionAtStart(urlDocument);


            }


        }

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

    @action setopenDialogDoc = (bool: boolean) => {
        this.openDialogDoc = bool;
    };

    @action boutonLoad = async (data: any) => {

        this.isLoading = true;

        try {

            const dataSendToBack = data.numberContrat;

            const result = await axios.post(
                `${config.servers.apiUrl}student/load/`, { dataSendToBack }
            );

            const dataSend = result.data[0]

            if (dataSend.length !== 0) {
                // this.setComment("");

                // this.setContrat(result.data[0]);

                return rootStore.succesSnackBar(true, "Page mis à jour !");
            }

            return rootStore.updateSnackBar(true, "Il n'y a pas encore de EDL !");

        } catch (err) {
            parseError(err, {
                401: "Vous n'êtes pas autorisé à voir ce contenu",
                400: "Veuillez remplir correctement les champs",
                500: "Il n'y a pas encore de EDL !",
            });
        } finally {
            this.isLoading = false;
        }
    };

    @action setIsCreate = (data: boolean) => {
        this.isCreate = data;
        if (data) {
            this.Student = null;
            this.droit = [];
            this.ecolagePrive = [];

        }
    };

    @action setDroit = (d: IFraisDivers) => {
        this.droit = [...this.droit, d];

    };

    @action setEcolagePrive = (ecolage: IEcolagePrive) => {
        this.ecolagePrive = [...this.ecolagePrive, ecolage];

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

    @action saveMessage = async (newEdl: any, saveEdl: any, isdefault: any, signature: any, contrat: any) => {

        try {

            const result = await axios.post(`${config.servers.apiUrl}contrat/saveMessage`, { newEdl, saveEdl, isdefault, signature, contrat });

            this.boutonLoad(result.data.contrats)

            rootStore.succesSnackBar(true, "Message enregistré avec succès");

        } catch (error: any) {
            rootStore.updateSnackBar(true, "Une erreur s'est produit, veuillez réessayer ultérieurement");
        }
    };


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