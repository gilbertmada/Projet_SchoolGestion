import axios from 'axios';
import { action, makeObservable, observable, runInAction } from 'mobx';
import config from '../config';
import { parseError } from '../services/utils';
import { IClasse } from '../common/interface/classeInterface/classeInterface';
import { INotes } from '../common/interface/notenterface';
import rootStore from './AppStore';
import { IStudent } from '../common/interface/StudentInterface';

export interface NoteStoreInterface {
    isLoading: boolean;
    allNote: INotes[];
    stud: IStudent | null;
    noteJounalier: any;
    totalJour0: any;
    total1erTrim: any;
    totalJour1: any;
    totalJour2: any;
    totalComposition0: any
    totalComposition1: any
    totalComposition2: any
    noteComposition: any;
    generalMoyen0: any;
    generalMoyen1: any;
    generalMoyen2: any;
    note: INotes | null;
    totalNote: any;
    isFromBooking: boolean;
    setIsFromBooking: (val: boolean) => void;
    setStud: (data: any) => void;
    setNote: (data: any) => void;
    setNoteJournalier: (note: any) => void;
    setNoteComposition: (note: any) => void;
    getAllNotes: () => Promise<any>;
    createNotes: (data: INotes) => void;
    updateNote: (data: INotes) => void;
    deleteTotalNote: (data: INotes) => void;
    getFilteredNote: (filter: Record<string, unknown>) => Promise<any>;
    selectedNote: INotes | null;
    setSelectedNote: (data: INotes | null) => void;
}

class Notes implements NoteStoreInterface {

    @observable isLoading = false;

    @observable note: INotes | null = null;

    @observable stud: IStudent | null = null;

    @observable isFromBooking = false;

    @observable allNote: INotes[] = [];

    @observable noteJounalier: any = {};

    @observable noteComposition: any = {};

    @observable total1erTrim: any = 0;

    @observable generalMoyen0: any = "0";

    @observable generalMoyen1: any = "0";

    @observable generalMoyen2: any = "0";

    @observable totalJour0: any = 0;

    @observable totalJour1: any = 0;

    @observable totalJour2: any = 0;

    @observable totalNote: any = "0";

    @observable totalComposition0: any = 0;

    @observable totalComposition1: any = 0;

    @observable totalComposition2: any = 0;


    @observable selectedNote: INotes | null = null;

    @action setSelectedNote = (note: INotes | null) => {
        this.selectedNote = note;
    };

    // @observable day: any[] = [];

    @observable horror: any[] = [];

    @action setNote = (data: INotes | null) => {
        this.note = data;
    };


    @action setNoteJournalier = (data: any) => {
        this.noteJounalier = data;
    };


    @action setNoteComposition = (data: any) => {
        this.noteComposition = data;
    };

    // @action setHorror = (data: any[]) => {
    //     this.horror = data;
    // };

    @action setStud = (data: IStudent | null) => {
        this.stud = data;
    };

    @action setIsFromBooking = (val: boolean) => {
        this.isFromBooking = val;
    };

    constructor() {
        makeObservable(this)
    }

    @action createNotes = async (data: INotes) => {


        try {
            console.log("data...", data);


            this.total1erTrim = data.total1erTrim;


            const add = await axios.post(`${config.servers.apiUrl}note`, data);

            rootStore.succesSnackBar(true, 'Classe ajouter avec succès');
            return add;

        } catch (err: any) {
            if (err.message.includes('code 400')) {
                rootStore.updateSnackBar(true, 'Le type ');
                return;
            }

            rootStore.updateSnackBar(true, "Une erreur s'est produite. Veuillez réessayer plus tard!");
        }

    };


    @action getFilteredNote = async (filter: Record<string, unknown>) => {
        try {
            this.isLoading = true;
            const noteFilter = await axios.post(`${config.servers.apiUrl}note/filter`,
                {
                    filter,

                }
            );


            runInAction(() => {
                this.allNote = noteFilter.data;
                this.isLoading = false;
            });

            return noteFilter.data;
        } catch (error) {
            parseError(
                error,
                "Une erreur s'est produite lors de la requête de vos infos. Veuillez réessayer"
            );
        } finally {
            this.isLoading = false;
        }
    };


    @action updateNote = async (noteUpdate: INotes) => {
        try {
            console.log("noteUpdate....", noteUpdate);

            const note = await axios.patch(`${config.servers.apiUrl}note/edit`, noteUpdate);

            rootStore.updateSnackBar(true, 'Modifié', 'success');

            return note;
        } catch (err) {
            parseError(err, {
                404: "Le note demandé est introuvable",
                403: 'Vous ne pouvez pas effectuer cette opération ou le mot de passe entré est incorrect',
            });
        }
    };

    @action getAllNotes = async () => {
        this.isLoading = true;
        try {
            const notes = await axios.get(`${config.servers.apiUrl}note/get`);
            this.allNote = notes.data;
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

    @action deleteTotalNote = async (noteDelete: INotes) => {
        try {

            const delNote = await axios.patch(`${config.servers.apiUrl}note/deleteTotal`, noteDelete);

            rootStore.updateSnackBar(true, 'Supprimé', 'success');
            return delNote;
        } catch (err) {
            parseError(err, {
                404: "La classe demandée est introuvable",
            });
        }
    };
}
export default new Notes();