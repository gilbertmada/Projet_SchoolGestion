import axios from 'axios';
import { action, makeObservable, observable, runInAction } from 'mobx';
import config from '../config';
import { parseError } from '../services/utils';
import { ISchool } from '../common/interface/schoolInterface';
import { IUser } from '../common/interface/userInterface';
import rootStore from './AppStore';

export interface SchoolStoreInterface {
    isLoading: boolean;
    allSchool: ISchool[];
    isFromBooking: boolean;
    ecole: ISchool  | null ;
    dataSchool:any;
    setDataSchool: (data: any) => void;
    setIsFromBooking: (val: boolean) => void;
    setEcole: (cla: ISchool | null) => void;
    setUser: (user: IUser | null) => void;
    getAllSchool: () => Promise<any>;
    createSchool: (data: ISchool) => void;
    updateSchool: (data: ISchool) => void;
    deleteTotalSchool: (data: ISchool) => void;
    getFilteredSchool: (filter: Record<string, unknown>) => Promise<any>;
    selectedSchool: ISchool | null;
    setSelectedSchool: (data: ISchool | null) => void;
}

class Schools implements SchoolStoreInterface {

    @observable isLoading = false;

    @observable ecole: ISchool | null = null;

    @observable user: IUser | null = null;

    @observable dataSchool: any  = "";

    @observable isFromBooking = false;

    @observable allSchool: ISchool[] = [];


    @observable selectedSchool: ISchool | null = null;

    @action setSelectedSchool = (school: ISchool | null) => {
        this.selectedSchool = school;
        console.log("setSelectedSchool......",this.selectedSchool);
    };


    @action setDataSchool = (data: any ) => {
        this.dataSchool = data;
    };

    @action setEcole = (data: ISchool | null) => {
        this.ecole = data;
    };


    @action setUser = (data: IUser | null) => {
        this.user = data;
    };

    @action setIsFromBooking = (val: boolean) => {
        this.isFromBooking = val;
    };

    constructor() {
        makeObservable(this)
    }

    @action createSchool = async (data: ISchool) => {
        try {


            const add = await axios.post(`${config.servers.apiUrl}school`, data);

            rootStore.succesSnackBar(true, 'school ajouter avec succès');
            return add;

        } catch (err: any) {
            if (err.message.includes('code 400')) {
                rootStore.updateSnackBar(true, 'Le type ');
                return;
            }

            rootStore.updateSnackBar(true, "Une erreur s'est produite. Veuillez réessayer plus tard!");
        }

    };


    @action getFilteredSchool = async (filter: Record<string, unknown>) => {
        try {
            this.isLoading = true;
            const schoolFilter = await axios.post(`${config.servers.apiUrl}school/filter`,
                {
                    filter,

                }
            );


            runInAction(() => {
                this.allSchool = schoolFilter.data;
                this.isLoading = false;
            });

            return schoolFilter.data;
        } catch (error) {
            parseError(
                error,
                "Une erreur s'est produite lors de la requête de vos infos. Veuillez réessayer"
            );
        } finally {
            this.isLoading = false;
        }
    };


  @action updateSchool = async (schoolUpdate: any) => {
    try {
        console.log("schoolUpdate...",schoolUpdate);
      const classe = await axios.patch(`${config.servers.apiUrl}school/edit`, schoolUpdate);
     
        rootStore.updateSnackBar(true, 'Modifié', 'success');
        console.log("schoolUpdate.upda...",classe);
      return classe;
    } catch (err) {
      parseError(err, {
        404: "Le classe demandé est introuvable",
        403: 'Vous ne pouvez pas effectuer cette opération ou le mot de passe entré est incorrect',
      });
    }
  };

    @action getAllSchool = async () => {
        this.isLoading = true;
        try {
            const classes = await axios.get(`${config.servers.apiUrl}school/get`);
            this.allSchool = classes.data;
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

    @action deleteTotalSchool = async (schoolDelete: ISchool) => {
        try {
            console.log("schoolDelete.del...",schoolDelete);
            const delSchool = await axios.patch(`${config.servers.apiUrl}school/deleteTotal`, schoolDelete);
            console.log("delSchool.del...",delSchool);
            rootStore.updateSnackBar(true, 'Supprimé', 'success');
            return delSchool;
        } catch (err) {
            parseError(err, {
                404: "La classe demandée est introuvable",
            });
        }
    };
}
export default new Schools();