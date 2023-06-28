import {
    Grid,
    IconButton,
    InputAdornment,
    Paper,
    TextField,
} from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/DeleteOutline";
import ListIcon from "@material-ui/icons/ListAlt";
import { SearchOutlined } from "@material-ui/icons";
import SaveListIcon from "@material-ui/icons/Save";
import { inject, observer } from "mobx-react";
import { FC, useEffect, useState } from "react";
import EditFooter from "../../../common/EditFooter";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useHistory } from "react-router-dom";
import { FooterIcon } from "../../../common/interface";
import { ConfirmModal, DeleteTotalModal } from "../../../common/Modal";
import HeaderPath from "../../../common/HeaderPath";
import ErrorSnackbar from "../../../common/ErrorSnackbar";
import { NoteStoreInterface } from "../../../store/NoteStore";
import { UserStoreInterface } from "../../../store/UserStore";
import { AbstractEmptyInterface } from "../../../types";
import { INoteJournalier, INoteComposition } from '../../../common/interface/notenterface';
import { validationData } from "../CreateNoteLogic2e";
import { defaultNoteJournalier, defaultNoteComposition } from './defaultData';
import { toJS } from "mobx";
import rootStore from '../../../store/AppStore';
import useStyles from "./style";
import { isFunction } from "lodash";

export interface noteJValidationError {
    note_Maths: any;
    note_Pc: any;
    note_Fr: any;
    note_Ang: any;
    note_HistoGeo: any;
    note_Philo: any;
    note_Mal: any;
    note_Eps: any;
}

export interface noteCompoValidationError {
    note_Maths?: any;
    note_Pc?: string;
    note_Fr?: string;
    note_Ang?: string;
    note_HistoGeo?: string;
    note_Philo?: string;
    note_Mal?: string;
    note_Eps?: string;
}

interface CreateNoteProps extends AbstractEmptyInterface {
    noteStore: NoteStoreInterface;
    userStore: UserStoreInterface
    // validationErrorNoteJ: noteJValidationError
    // validationErrorNoteCompo: noteCompoValidationError
}
const CreateSecondNote: FC<AbstractEmptyInterface> = (props: any) => {
    const { noteStore } = props as CreateNoteProps;

    const classes = useStyles();
    const history = useHistory();
    const HideBtn = noteStore.isFromBooking ? "block" : "none"
    const disableIt = !!noteStore.note?.stud;
    const [noteJournalier2e, setNoteJournalier2e] = useState<any>({});
    const [noteComposition2e, setNoteComposition2e] = useState<any>({});
    const [stud, setStud] = useState<any>({});

    const [note, setNote] = useState<any>({});
    const [enabled, setItEnabled] = useState(disableIt);
    const [isStorage, setIsStorage] = useState(false);
    const [saveErrors, setSaveErrors] = useState<string[]>([]);
    const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);
    const [isDay, setIsDay] = useState(false);
    const [isSelect, setIsSelect] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [pathRedirect, setPathRedirect] = useState("");
    const [errorNote, setErrorNote] = useState("");
    const [modalStateStudent, setModalStudent] = useState(false);

    useEffect(() => {
        noteStore.getAllNotes();
    }, [noteStore]);


    console.log("allNote1........", toJS(noteStore));

    useEffect(() => {
        if (noteStore.selectedNote?.stud !== undefined) {
            noteStore.setNoteJournalier(noteStore.selectedNote.noteJournalier);
            noteStore.setNoteComposition(noteStore.selectedNote.noteComposition);
            noteStore.setStud(noteStore.selectedNote.stud);
        }

    }, [noteStore]);
    useEffect(() => {
        if (noteStore.selectedNote?.stud !== undefined) {
            setNoteJournalier2e(noteStore.selectedNote.noteJournalier2e);
            setNoteComposition2e(noteStore.selectedNote.noteComposition2e);

        }

    }, [noteStore.selectedNote]);
    console.log("selectedNote.1...", noteStore.selectedNote);

    const toggleStudent = () => {
        setModalStudent(!modalStateStudent);
        noteStore.setIsFromBooking(false);
    };

    const handleChangeJournalier = (e: any) => {
        const { name, value } = e.target;
        setNoteJournalier2e({ ...noteJournalier2e, [name]: value });
        setNote({ ...note, noteJournalier2e });
        noteStore.setNoteJournalier2e({
            ...noteJournalier2e,
            [name]: value,

        });
        noteStore.setNote({ ...note, noteJournalier2e });
    };

    const handleChangeComposition = (e: any) => {
        const { name, value } = e.target;
        setNoteComposition2e({ ...noteComposition2e, [name]: value });
        setNote({ ...note, noteComposition2e })
        noteStore.setNoteComposition2e({
            ...noteComposition2e,
            [name]: value,

        });
        noteStore.setNote({ ...note, noteComposition2e });


    };




    const handleCloseErrors = () => setOpenErrorSnackbar(!openErrorSnackbar);

    const handleCloseConfirmModal = () => {
        setOpenModal(false);
    };

    const handleOpenConfirmModal = (path: string) => (e: any) => {
        e.preventDefault();

        setPathRedirect(path);

        // if (!isStorage) {
        //   setOpenQuitModal(true);
        // } else {
        //   setOpenModal(true)
        // }

        setOpenModal(true);

    }

    const handleOpenDeleteModal = () => {

        setOpenDeleteModal(true);
    };


    const handleCloseDeleteModal = () => {
        setOpenDeleteModal(false);
    };
    const numberNaNJTrue: any = [];
    const numberNaNCompoTrue: any = [];
    const numberNaNCoefJTrue: any = [];
    const numberNaNCoefCompoTrue: any = [];
    let generalMoyen2eTrim: any = 0;
    const listNoteDef: any = [];

    const arrayDeNoteJ: any[] = [
        { valueNote: noteJournalier2e?.note_Maths },
        { valueNote: noteJournalier2e?.note_Pc },
        { valueNote: noteJournalier2e?.note_Ang },
        { valueNote: noteJournalier2e?.note_Mal },
        { valueNote: noteJournalier2e?.note_Fr },
        { valueNote: noteJournalier2e?.note_Philo },
        { valueNote: noteJournalier2e?.note_HistoGeo },
        { valueNote: noteJournalier2e?.note_SVT },
        { valueNote: noteJournalier2e?.note_Eps },
    ]

    const arrayDeCoefJ: any[] = [
        { valueCoef: noteJournalier2e?.coef_Maths },
        { valueCoef: noteJournalier2e?.coef_Pc },
        { valueCoef: noteJournalier2e?.coef_Ang },
        { valueCoef: noteJournalier2e?.coef_Mal },
        { valueCoef: noteJournalier2e?.coef_Fr },
        { valueCoef: noteJournalier2e?.coef_Philo },
        { valueCoef: noteJournalier2e?.coef_HistoGeo },
        { valueCoef: noteJournalier2e?.coef_SVT },
        { valueCoef: noteJournalier2e?.coef_Eps },
    ]


    const arrayDeNoteCompo: any[] = [
        { valueNote: noteComposition2e?.note_Maths },
        { valueNote: noteComposition2e?.note_Pc },
        { valueNote: noteComposition2e?.note_Ang },
        { valueNote: noteComposition2e?.note_Mal },
        { valueNote: noteComposition2e?.note_Fr },
        { valueNote: noteComposition2e?.note_Philo },
        { valueNote: noteComposition2e?.note_HistoGeo },
        { valueNote: noteComposition2e?.note_SVT },
        { valueNote: noteComposition2e?.note_Eps },
    ]

    const arrayDeCoefCompo: any[] = [
        { valueCoef: noteComposition2e?.coef_Maths },
        { valueCoef: noteComposition2e?.coef_Pc },
        { valueCoef: noteComposition2e?.coef_Ang },
        { valueCoef: noteComposition2e?.coef_Mal },
        { valueCoef: noteComposition2e?.coef_Fr },
        { valueCoef: noteComposition2e?.coef_Philo },
        { valueCoef: noteComposition2e?.coef_HistoGeo },
        { valueCoef: noteComposition2e?.coef_SVT },
        { valueCoef: noteComposition2e?.coef_Eps },
    ]

    const NoteMath = () => {

        let MathNote = 0;

        if (arrayDeNoteJ[0].valueNote) {
            MathNote = (+arrayDeNoteJ[0].valueNote) * (+arrayDeCoefJ[0].valueCoef);
        }

        if (arrayDeNoteCompo[0].valueNote) {
            MathNote = (+arrayDeNoteCompo[0].valueNote) * (+arrayDeCoefCompo[0].valueCoef);
        }

        if (arrayDeNoteJ[0].valueNote && arrayDeNoteCompo[0].valueNote) {
            MathNote = ((+arrayDeNoteJ[0].valueNote + +arrayDeNoteCompo[0].valueNote) / 2) * (+arrayDeCoefJ[0].valueCoef);
        }


        // listNoteDef.push(MathNote);
        return MathNote;
    };


    const NotePc = () => {

        let PcNote = 0;
        if (arrayDeNoteJ[1].valueNote) {
            PcNote = (+arrayDeNoteJ[1].valueNote) * (+arrayDeCoefJ[1].valueCoef);
        }

        if (arrayDeNoteCompo[1].valueNote) {
            PcNote = (+arrayDeNoteCompo[1].valueNote) * (+arrayDeCoefCompo[1].valueCoef);
        }

        if (arrayDeNoteJ[1].valueNote && arrayDeNoteCompo[1].valueNote) {
            PcNote = ((+arrayDeNoteJ[1].valueNote + +arrayDeNoteCompo[1].valueNote) / 2) * (+arrayDeCoefJ[1].valueCoef);
        }

        // listNoteDef.push(PcNote);
        return PcNote;
    };

    const NoteAng = () => {

        let AngNote = 0;
        if (arrayDeNoteJ[2].valueNote) {
            AngNote = (+arrayDeNoteJ[2].valueNote) * (+arrayDeCoefJ[2].valueCoef);
        }

        if (arrayDeNoteCompo[2].valueNote) {
            AngNote = (+arrayDeNoteCompo[2].valueNote) * (+arrayDeCoefCompo[2].valueCoef);
        }

        if (arrayDeNoteJ[2].valueNote && arrayDeNoteCompo[2].valueNote) {
            AngNote = ((+arrayDeNoteJ[2].valueNote + +arrayDeNoteCompo[2].valueNote) / 2) * (+arrayDeCoefJ[2].valueCoef);
        }

        // listNoteDef.push(AngNote);
        return AngNote;
    };

    const NoteMal = () => {

        let MalNote = 0;
        if (arrayDeNoteJ[3].valueNote) {
            MalNote = (+arrayDeNoteJ[3].valueNote) * (+arrayDeCoefJ[3].valueCoef);
        }

        if (arrayDeNoteCompo[3].valueNote) {
            MalNote = (+arrayDeNoteCompo[3].valueNote) * (+arrayDeCoefCompo[3].valueCoef);
        }

        if (arrayDeNoteJ[3].valueNote && arrayDeNoteCompo[3].valueNote) {
            MalNote = ((+arrayDeNoteJ[3].valueNote + +arrayDeNoteCompo[3].valueNote) / 2) * (+arrayDeCoefJ[3].valueCoef);
        }

        // listNoteDef.push(MalNote);
        return MalNote;
    };

    const NoteFr = () => {

        let FrNote = 0;
        if (arrayDeNoteJ[4].valueNote) {
            FrNote = (+arrayDeNoteJ[4].valueNote) * (+arrayDeCoefJ[4].valueCoef);
        }

        if (arrayDeNoteCompo[4].valueNote) {
            FrNote = (+arrayDeNoteCompo[4].valueNote) * (+arrayDeCoefCompo[4].valueCoef);
        }

        if (arrayDeNoteJ[4].valueNote && arrayDeNoteCompo[4].valueNote) {
            FrNote = ((+arrayDeNoteJ[4].valueNote + +arrayDeNoteCompo[4].valueNote) / 2) * (+arrayDeCoefJ[4].valueCoef);
        }

        // listNoteDef.push(FrNote);
        return FrNote;
    };

    const NotePhilo = () => {

        let PhiloNote = 0;
        if (arrayDeNoteJ[5].valueNote) {
            PhiloNote = (+arrayDeNoteJ[5].valueNote) * (+arrayDeCoefJ[5].valueCoef);
        }

        if (arrayDeNoteCompo[5].valueNote) {
            PhiloNote = (+arrayDeNoteCompo[5].valueNote) * (+arrayDeCoefCompo[5].valueCoef);
        }

        if (arrayDeNoteJ[5].valueNote && arrayDeNoteCompo[5].valueNote) {
            PhiloNote = ((+arrayDeNoteJ[5].valueNote + +arrayDeNoteCompo[5].valueNote) / 2) * (+arrayDeCoefJ[5].valueCoef);
        }

        // listNoteDef.push(PhiloNote);
        return PhiloNote;
    };

    const NoteHistoGeo = () => {

        let HistoGeoNote = 0;
        if (arrayDeNoteJ[6].valueNote) {
            HistoGeoNote = (+arrayDeNoteJ[6].valueNote) * (+arrayDeCoefJ[6].valueCoef);
        }

        if (arrayDeNoteCompo[6].valueNote) {
            HistoGeoNote = (+arrayDeNoteCompo[6].valueNote) * (+arrayDeCoefCompo[6].valueCoef);
        }

        if (arrayDeNoteJ[6].valueNote && arrayDeNoteCompo[6].valueNote) {
            HistoGeoNote = ((+arrayDeNoteJ[6].valueNote + +arrayDeNoteCompo[6].valueNote) / 2) * (+arrayDeCoefJ[6].valueCoef);
        }

        // listNoteDef.push(HistoGeoNote);
        return HistoGeoNote;
    };

    const NoteSVT = () => {

        let SVTNote = 0;
        if (arrayDeNoteJ[7].valueNote) {
            SVTNote = (+arrayDeNoteJ[7].valueNote) * (+arrayDeCoefJ[7].valueCoef);
        }

        if (arrayDeNoteCompo[7].valueNote) {
            SVTNote = (+arrayDeNoteCompo[7].valueNote) * (+arrayDeCoefCompo[7].valueCoef);
        }

        if (arrayDeNoteJ[7].valueNote && arrayDeNoteCompo[7].valueNote) {
            SVTNote = ((+arrayDeNoteJ[7].valueNote + +arrayDeNoteCompo[7].valueNote) / 2) * (+arrayDeCoefJ[7].valueCoef);
        }

        // listNoteDef.push(SVTNote);
        return SVTNote;
    };

    const NoteEps = () => {

        let EpsNote = 0;
        if (arrayDeNoteJ[8].valueNote) {
            EpsNote = (+arrayDeNoteJ[8].valueNote) * (+arrayDeCoefJ[8].valueCoef);
        }

        if (arrayDeNoteCompo[8].valueNote) {
            EpsNote = (+arrayDeNoteCompo[8].valueNote) * (+arrayDeCoefCompo[8].valueCoef);
        }

        if (arrayDeNoteJ[8].valueNote && arrayDeNoteCompo[8].valueNote) {
            EpsNote = ((+arrayDeNoteJ[8].valueNote + +arrayDeNoteCompo[8].valueNote) / 2) * (+arrayDeCoefJ[8].valueCoef);
        }

        // listNoteDef.push(EpsNote);
        return EpsNote;
    };

    listNoteDef.push(NoteMath());
    listNoteDef.push(NotePc());
    listNoteDef.push(NoteAng());
    listNoteDef.push(NoteMal());
    listNoteDef.push(NoteFr());
    listNoteDef.push(NotePhilo());
    listNoteDef.push(NoteHistoGeo());
    listNoteDef.push(NoteSVT());
    listNoteDef.push(NoteEps());


    const listCoefJ = () => {
        const list = [];
        for (let i = 0; i < arrayDeCoefJ.length; i++) {
            if (arrayDeCoefJ[i].valueCoef !== undefined) {
                list.push(arrayDeCoefJ[i].valueCoef)
            }
        }
        return list;
    };

    const listCoefCompo = () => {
        const list = [];
        for (let i = 0; i < arrayDeCoefCompo.length; i++) {
            if (arrayDeCoefCompo[i].valueCoef !== undefined) {
                list.push(arrayDeCoefCompo[i].valueCoef)
            }
        }
        return list;
    };

    const getTotalCoefJ: number = listCoefJ().length > 0 ? listCoefJ()
        .map((item: any) => parseInt(item, 10))
        .reduce((a: any, b: any) => a + b) : 0;

    const getTotalCoefCompo: number = listCoefCompo().length > 0 ? listCoefCompo()
        .map((item: any) => parseInt(item, 10))
        .reduce((a: any, b: any) => a + b) : 0;
    console.log("listNoteDef....", listNoteDef);
    const totalNote2eTrim = () => {
        let somme = 0;
        for (let i = 0; i < listNoteDef.length; i++) {
            somme += listNoteDef[i];

        }
        return somme;
    };

    for (let i = 0; i < arrayDeNoteJ.length; i++) {

        if (arrayDeNoteJ[i]?.valueNote === 0
            || arrayDeNoteJ[i]?.valueNote === null
            || Number.isNaN(arrayDeNoteJ[i]?.valueNote) === true
            || arrayDeNoteJ[i]?.valueNote === '') {
            numberNaNJTrue.push(i);
        }


    }

    for (let j = 0; j < arrayDeNoteCompo.length; j++) {
        if (arrayDeNoteCompo[j]?.valueNote === 0
            || arrayDeNoteCompo[j]?.valueNote === null
            || Number.isNaN(arrayDeNoteCompo[j]?.valueNote) === true
            || arrayDeNoteCompo[j]?.valueNote === '') {
            numberNaNCompoTrue.push(j);

        }

    }

    for (let k = 0; k < arrayDeCoefJ.length; k++) {

        if (arrayDeCoefJ[k].valueCoef === 0
            || arrayDeCoefJ[k].valueCoef === null
            || Number.isNaN(arrayDeCoefJ[k].valueCoef) === true
            || arrayDeCoefJ[k].valueCoef === '') {
            numberNaNCoefJTrue.push(k);

        }

    }

    for (let l = 0; l < arrayDeCoefCompo.length; l++) {
        if (arrayDeCoefCompo[l].valueCoef === 0
            || arrayDeCoefCompo[l].valueCoef === null
            || Number.isNaN(arrayDeCoefCompo[l].valueCoef) === true
            || arrayDeCoefCompo[l].valueCoef === '') {
            numberNaNCoefCompoTrue.push(l);

        }

    }
    console.log("numberNaNCoefCompoTrue....", numberNaNCoefCompoTrue);
    if (numberNaNJTrue.length === 9) {
        generalMoyen2eTrim = +totalNote2eTrim() / +getTotalCoefCompo;
        console.log("totalNote1erTrim.tss J...", +totalNote2eTrim());
    }
    if (numberNaNCompoTrue.length === 9) {
        generalMoyen2eTrim = +totalNote2eTrim() / +getTotalCoefJ;
        console.log("totalNote1erTrim...tssCompo.", +totalNote2eTrim());
    }
    if (numberNaNJTrue.length !== 9 && numberNaNCompoTrue.length !== 9) {
        generalMoyen2eTrim = +totalNote2eTrim() / +getTotalCoefJ;
        console.log("totalNote1erTrim....", +totalNote2eTrim());
    }

    //  generalMoyen1erTrim = (+totalNote1erTrim() / +getTotalCoefJ);
    const newNote: any = {
        _id: noteStore.selectedNote?.stud._id,
        stud: { ...noteStore.selectedNote?.stud },
        noteJournalier: { ...noteStore.selectedNote?.noteJournalier },
        noteComposition: { ...noteStore.selectedNote?.noteComposition },
        noteJournalier2e: { ...noteJournalier2e },
        noteComposition2e: { ...noteComposition2e },
        totalCoefJ0: +getTotalCoefJ,
        total2eTrim: +totalNote2eTrim().toFixed(2),
        generalMoyen2eTrim: +generalMoyen2eTrim.toFixed(2),


    }

    const handleAddNew = () => {
        // location.reload();
        history.push("/note/third-note");
    };
    const deleteClasse = () => {

        if (noteStore.selectedNote?.noteJournalier2e) {
            props.noteStore
                .deleteTotalNote(toJS(noteStore.selectedNote?.noteJournalier2e))
                .then((editClasse: any) => {
                    if (editClasse.status === 200) {
                        setOpenDeleteModal(false);
                        history.push("/note/list");
                    }
                });
        } else {
            setOpenDeleteModal(false);
        }
    };

    const onSubmit = (e: any) => {
        e.preventDefault();


        console.log("arrayDeNoteJ....", arrayDeNoteJ);
        console.log("listCoefJ....", listCoefJ());
        console.log("listNoteDef....", listNoteDef);
        console.log("arrayDeCoefJ....", arrayDeCoefJ);
        console.log("arrayDeCoefCompo....", arrayDeCoefCompo);
        console.log("getTotalCoefJ....", +getTotalCoefJ);
        console.log("NoteEps....", NoteEps());
        console.log("newNote", newNote);
        
        const errors = validationData(numberNaNJTrue, numberNaNCompoTrue, numberNaNCoefJTrue, numberNaNCoefCompoTrue);

        setSaveErrors(errors);

        if (errors.length) {
            setOpenErrorSnackbar(true);
            return;
        }

        // if (!toJS(noteStore.selectedNote?.noteJournalier2e)) {


        //     props.noteStore.createNotes(newNote).then((addClasse: any) => {
        //         if (addClasse) {
        //             history.push("/note/list");
        //         }
        //     })
        // } else {
        props.noteStore.updateNote(newNote).then((editClasse: any) => {

            if (editClasse) {
                history.push("/note/list");
                // classeStore.getAllClass();
            }

        });
        // }

    }


    const footerIcons: FooterIcon[] = [
        {
            id: 0,
            ItemIcon: SaveListIcon,
            label: "Ajouter",
            type: "submit",
            onClick: onSubmit,
            title: "Sauvegarder",
        },
        {
            id: 1,
            ItemIcon: ListIcon,
            label: "Liste",
            onClick: handleOpenConfirmModal("/note/list"),
            title: "Liste",
        },
        {
            id: 2,
            ItemIcon: DeleteIcon,
            label: "Supprimer",
            onClick: handleOpenDeleteModal,
            title: "Supprimer"
        },
        {
            id: 3,
            ItemIcon: AddIcon,
            title: "3em_Trim",
            onClick: handleAddNew,
            // title: `${studentStore.selectedStudent?.schoolName.includes("Privé") ? "Ecolage" : "Frais divers"
            //   }`,
        },
    ];

    return (
        <div>
            <div>
                <ConfirmModal
                    isOpen={openModal}
                    handleCloseConfirmModal={handleCloseConfirmModal}
                    path={pathRedirect}
                />
                {/* <SearchStudentModal
                    handleClose={toggleStudent}
                    openModal={modalStateStudent}
                    setEleve={handleUpdateStudent}
                /> */}
                <DeleteTotalModal
                    isOpen={openDeleteModal}
                    handleCloseDeleteModal={handleCloseDeleteModal}
                    deleteData={deleteClasse}
                />
                <HeaderPath
                    paths={[
                        { label: "Dashboard", path: "/" },
                        { label: "Liste des Notes", path: "/note/list" },
                        { label: "Creation des notes 1er Trimestre", path: "/note/new-note" },
                        { label: "Creation des notes 2eme Trimestre", path: "/note/second-note" },
                    ]}
                />
            </div>
            <form onSubmit={onSubmit}>
                <Grid container={true} direction="row" spacing={1} >

                    <Grid item={true} md={6} xs={12}>
                        <div className={classes.title}>NOTE JOURNALIERE 2eme TRIM </div>
                        <div className={classes.itemNote}>
                            <Grid container={true} direction="row" spacing={1} >
                                <Grid item={true} sm={3} xs={12}>
                                    <TextField
                                        label="Note Maths"
                                        name="note_Maths"
                                        onChange={handleChangeJournalier}
                                        value={noteJournalier2e?.note_Maths || 0}

                                    />
                                </Grid>
                                <Grid item={true} sm={3} xs={12}>
                                    <TextField
                                        label="Coéf Maths"
                                        required={true}
                                        name="coef_Maths"
                                        onChange={handleChangeJournalier}
                                        value={noteJournalier2e?.coef_Maths || 0}

                                    />
                                </Grid>
                                <Grid item={true} sm={3} xs={12}>
                                    <TextField
                                        label="Note PC"
                                        name="note_Pc"
                                        onChange={handleChangeJournalier}
                                        value={noteJournalier2e?.note_Pc || 0}

                                    />
                                </Grid>
                                <Grid item={true} sm={3} xs={12}>
                                    <TextField
                                        label="Coéf PC"
                                        required={true}
                                        name="coef_Pc"
                                        onChange={handleChangeJournalier}
                                        value={noteJournalier2e?.coef_Pc || 0}

                                    />
                                </Grid>
                            </Grid>


                            <Grid container={true} direction="row" spacing={1} >
                                <Grid item={true} sm={3} xs={12}>
                                    <TextField
                                        label="Note Anglais"
                                        name="note_Ang"
                                        onChange={handleChangeJournalier}
                                        value={noteJournalier2e?.note_Ang || 0}

                                    />
                                </Grid>
                                <Grid item={true} sm={3} xs={12}>
                                    <TextField
                                        label="Coéf Anglais"
                                        required={true}
                                        name="coef_Ang"
                                        onChange={handleChangeJournalier}
                                        value={noteJournalier2e?.coef_Ang || 0}

                                    />
                                </Grid>
                                <Grid item={true} sm={3} xs={12}>
                                    <TextField
                                        label="Note Malagasy"
                                        name="note_Mal"
                                        onChange={handleChangeJournalier}
                                        value={noteJournalier2e?.note_Mal || 0}

                                    />
                                </Grid>
                                <Grid item={true} sm={3} xs={12}>
                                    <TextField
                                        label="Coéf Malagasy"
                                        required={true}
                                        name="coef_Mal"
                                        onChange={handleChangeJournalier}
                                        value={noteJournalier2e?.coef_Mal || 0}

                                    />
                                </Grid>
                            </Grid>

                            <Grid container={true} direction="row" spacing={1} >
                                <Grid item={true} sm={3} xs={12}>
                                    <TextField
                                        label="Note Français"
                                        name="note_Fr"
                                        onChange={handleChangeJournalier}
                                        value={noteJournalier2e?.note_Fr || 0}

                                    />
                                </Grid>
                                <Grid item={true} sm={3} xs={12}>
                                    <TextField
                                        label="Coéf Français"
                                        required={true}
                                        name="coef_Fr"
                                        onChange={handleChangeJournalier}
                                        value={noteJournalier2e?.coef_Fr || 0}

                                    />
                                </Grid>
                                <Grid item={true} sm={3} xs={12}>
                                    <TextField
                                        label="Note Philo"
                                        name="note_Philo"
                                        onChange={handleChangeJournalier}
                                        value={noteJournalier2e?.note_Philo || 0}

                                    />
                                </Grid>
                                <Grid item={true} sm={3} xs={12}>
                                    <TextField
                                        label="Coéf Philo"
                                        required={true}
                                        name="coef_Philo"
                                        onChange={handleChangeJournalier}
                                        value={noteJournalier2e?.coef_Philo || 0}

                                    />
                                </Grid>
                            </Grid>


                            <Grid container={true} direction="row" spacing={1} >
                                <Grid item={true} sm={3} xs={12}>
                                    <TextField
                                        label="Note Histo-Géo"
                                        name="note_HistoGeo"
                                        onChange={handleChangeJournalier}
                                        value={noteJournalier2e?.note_HistoGeo || 0}

                                    />
                                </Grid>
                                <Grid item={true} sm={3} xs={12}>
                                    <TextField
                                        label="Coéf Histo-Géo"
                                        required={true}
                                        name="coef_HistoGeo"
                                        onChange={handleChangeJournalier}
                                        value={noteJournalier2e?.coef_HistoGeo || 0}

                                    />
                                </Grid>
                                <Grid item={true} sm={3} xs={12}>
                                    <TextField
                                        label="Note SVT"
                                        name="note_SVT"
                                        onChange={handleChangeJournalier}
                                        value={noteJournalier2e?.note_SVT || 0}

                                    />
                                </Grid>
                                <Grid item={true} sm={3} xs={12}>
                                    <TextField
                                        label="Coéf SVT"
                                        required={true}
                                        name="coef_SVT"
                                        onChange={handleChangeJournalier}
                                        value={noteJournalier2e?.coef_SVT || 0}

                                    />
                                </Grid>
                                <Grid item={true} sm={3} xs={12}>
                                    <TextField
                                        label="Note EPS"
                                        name="note_Eps"
                                        onChange={handleChangeJournalier}
                                        value={noteJournalier2e?.note_Eps || 0}

                                    />
                                </Grid>
                                <Grid item={true} sm={3} xs={12}>
                                    <TextField
                                        label="Coéf EPS"
                                        required={true}
                                        name="coef_Eps"
                                        onChange={handleChangeJournalier}
                                        value={noteJournalier2e?.coef_Eps || 0}

                                    />
                                </Grid>

                            </Grid>
                        </div>
                    </Grid>

                    <Grid item={true} md={6} xs={12}>
                        <div className={classes.title}>NOTE DE COMPOSITION  2eme  TRIM </div>
                        <div className={classes.itemNote}>
                            <Grid container={true} direction="row" spacing={1} >
                                <Grid item={true} sm={3} xs={12}>
                                    <TextField
                                        label="Note Maths"
                                        name="note_Maths"
                                        onChange={handleChangeComposition}
                                        value={noteComposition2e?.note_Maths || 0}

                                    />
                                </Grid>
                                <Grid item={true} sm={3} xs={12}>
                                    <TextField
                                        label="Coéf Maths"
                                        required={true}
                                        name="coef_Maths"
                                        onChange={handleChangeComposition}
                                        value={noteComposition2e?.coef_Maths || 0}

                                    />
                                </Grid>
                                <Grid item={true} sm={3} xs={12}>
                                    <TextField
                                        label="Note PC"
                                        name="note_Pc"
                                        onChange={handleChangeComposition}
                                        value={noteComposition2e?.note_Pc || 0}

                                    />
                                </Grid>
                                <Grid item={true} sm={3} xs={12}>
                                    <TextField
                                        label="Coéf PC"
                                        required={true}
                                        name="coef_Pc"
                                        onChange={handleChangeComposition}
                                        value={noteComposition2e?.coef_Pc || 0}

                                    />
                                </Grid>
                            </Grid>


                            <Grid container={true} direction="row" spacing={1} >
                                <Grid item={true} sm={3} xs={12}>
                                    <TextField
                                        label="Note Anglais"
                                        name="note_Ang"
                                        onChange={handleChangeComposition}
                                        value={noteComposition2e?.note_Ang || 0}

                                    />
                                </Grid>
                                <Grid item={true} sm={3} xs={12}>
                                    <TextField
                                        label="Coéf Anglais"
                                        required={true}
                                        name="coef_Ang"
                                        onChange={handleChangeComposition}
                                        value={noteComposition2e?.coef_Ang || 0}

                                    />
                                </Grid>
                                <Grid item={true} sm={3} xs={12}>
                                    <TextField
                                        label="Note Malagasy"
                                        name="note_Mal"
                                        onChange={handleChangeComposition}
                                        value={noteComposition2e?.note_Mal || 0}

                                    />
                                </Grid>
                                <Grid item={true} sm={3} xs={12}>
                                    <TextField
                                        label="Coéf Malagasy"
                                        required={true}
                                        name="coef_Mal"
                                        onChange={handleChangeComposition}
                                        value={noteComposition2e?.coef_Mal || 0}

                                    />
                                </Grid>
                            </Grid>

                            <Grid container={true} direction="row" spacing={1} >
                                <Grid item={true} sm={3} xs={12}>
                                    <TextField
                                        label="Note Français"
                                        name="note_Fr"
                                        onChange={handleChangeComposition}
                                        value={noteComposition2e?.note_Fr || 0}

                                    />
                                </Grid>
                                <Grid item={true} sm={3} xs={12}>
                                    <TextField
                                        label="Coéf Français"
                                        required={true}
                                        name="coef_Fr"
                                        onChange={handleChangeComposition}
                                        value={noteComposition2e?.coef_Fr || 0}

                                    />
                                </Grid>
                                <Grid item={true} sm={3} xs={12}>
                                    <TextField
                                        label="Note Philo"
                                        name="note_Philo"
                                        onChange={handleChangeComposition}
                                        value={noteComposition2e?.note_Philo || 0}

                                    />
                                </Grid>
                                <Grid item={true} sm={3} xs={12}>
                                    <TextField
                                        label="Coéf Philo"
                                        required={true}
                                        name="coef_Philo"
                                        onChange={handleChangeComposition}
                                        value={noteComposition2e?.coef_Philo || 0}

                                    />
                                </Grid>
                            </Grid>


                            <Grid container={true} direction="row" spacing={1} >
                                <Grid item={true} sm={3} xs={12}>
                                    <TextField
                                        label="Note Histo-Géo"
                                        name="note_HistoGeo"
                                        onChange={handleChangeComposition}
                                        value={noteComposition2e?.note_HistoGeo || 0}

                                    />
                                </Grid>
                                <Grid item={true} sm={3} xs={12}>
                                    <TextField
                                        label="Coéf Histo-Géo"
                                        required={true}
                                        name="coef_HistoGeo"
                                        onChange={handleChangeComposition}
                                        value={noteComposition2e?.coef_HistoGeo || 0}

                                    />
                                </Grid>
                                <Grid item={true} sm={3} xs={12}>
                                    <TextField
                                        label="Note SVT"
                                        name="note_SVT"
                                        onChange={handleChangeComposition}
                                        value={noteComposition2e?.note_SVT || 0}

                                    />
                                </Grid>
                                <Grid item={true} sm={3} xs={12}>
                                    <TextField
                                        label="Coéf SVT"
                                        required={true}
                                        name="coef_SVT"
                                        onChange={handleChangeComposition}
                                        value={noteComposition2e?.coef_SVT || 0}

                                    />
                                </Grid>
                                <Grid item={true} sm={3} xs={12}>
                                    <TextField
                                        label="Note EPS"
                                        name="note_Eps"
                                        onChange={handleChangeComposition}
                                        value={noteComposition2e?.note_Eps || 0}

                                    />
                                </Grid>
                                <Grid item={true} sm={3} xs={12}>
                                    <TextField
                                        label="Coéf EPS"
                                        required={true}
                                        name="coef_Eps"
                                        onChange={handleChangeComposition}
                                        value={noteComposition2e?.coef_Eps || 0}

                                    />
                                </Grid>
                            </Grid>
                        </div>
                    </Grid>

                </Grid>


                <EditFooter icons={footerIcons} />
                <ErrorSnackbar
                    open={openErrorSnackbar}
                    handleClose={handleCloseErrors}
                    errors={saveErrors}
                    defaultTitle="Vérifiez le formulaire"
                />
            </form>

        </div >
    );
}
export default inject("noteStore", "userStore")(observer(CreateSecondNote))