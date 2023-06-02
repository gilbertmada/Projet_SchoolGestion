import {
    Grid,
    IconButton,
    InputAdornment,
    Paper,
    TextField,
} from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
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
import ErrorSnackbar from "../../../common/ErrorSnackbar";
import { NoteStoreInterface } from "../../../store/NoteStore";
import { UserStoreInterface } from "../../../store/UserStore";
import { ProfessorStoreInterface } from "../../../store/ProfessorStore";
import { AbstractEmptyInterface } from "../../../types";
import SearchStudentModal from "../../../common/SearchModal/ModalStudent/SearchStudentModal";
import { validationData } from "../CreateNoteLogic";
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
    professorStore: ProfessorStoreInterface;
    userStore: UserStoreInterface
    validationErrorNoteJ: noteJValidationError
    validationErrorNoteCompo: noteCompoValidationError
}
const CreateNote: FC<AbstractEmptyInterface> = (props: any) => {
    const { noteStore, validationErrorNoteJ, validationErrorNoteCompo } = props as CreateNoteProps;

    const classes = useStyles();
    const history = useHistory();
    const HideBtn = noteStore.isFromBooking ? "block" : "none"
    const disableIt = !!noteStore.note?.stud;
    const [noteJournalier, setNoteJournalier] = useState<any | number>({});
    const [noteComposition, setNoteComposition] = useState<any | number>({});
    const [stud, setStud] = useState<any>({});

    const [note, setNote] = useState<any>({});
    const [enabled, setItEnabled] = useState(disableIt);
    const [isStorage, setIsStorage] = useState(false);
    const [saveErrors, setSaveErrors] = useState<string[]>([]);
    const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);
    const [isDay, setIsDay] = useState(false);
    const [isSelect, setIsSelect] = useState(false);
    const [isSchool, setIsSchool] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [pathRedirect, setPathRedirect] = useState("");
    const [errorNote, setErrorNote] = useState("");
    const [modalStateStudent, setModalStudent] = useState(false);

    useEffect(() => {
        noteStore.getAllNotes();
    }, [noteStore]);


    console.log("allNote........", toJS(noteStore));

    useEffect(() => {
        if (noteStore.selectedNote) {
            setNoteJournalier(noteStore.selectedNote.noteJournalier);
            setNoteComposition(noteStore.selectedNote.noteComposition);
            setStud(noteStore.selectedNote.stud);
        }

    }, [noteStore.selectedNote]);

    console.log("selectedNote....", noteStore.selectedNote);

    const toggleStudent = () => {
        setModalStudent(!modalStateStudent);
        noteStore.setIsFromBooking(false);
    };

    const ChangeIt = () => {
        setItEnabled(!enabled)
    }
    const handleChangeJournalier = (e: any) => {
        const { name, value } = e.target;
        setNoteJournalier({ ...noteJournalier, [name]: value });
        setNote({ ...note, noteJournalier });
        noteStore.setNoteJournalier({ ...noteJournalier, [name]: value });
        noteStore.setNote({ ...note, noteJournalier });


    };

    const handleChangeComposition = (e: any) => {
        const { name, value } = e.target;
        setNoteComposition({ ...noteComposition, [name]: value });
        setNote({ ...note, noteComposition })
        noteStore.setNoteComposition({ ...noteComposition, [name]: value });
        noteStore.setNote({ ...note, noteComposition });


    };


    const handleChangeStudent = (e: any) => {
        const { name, value } = e.target;
        setStud({ ...stud, [name]: value });
        setNote({ ...note, stud })
        noteStore.setNote({ ...stud, [name]: value });
    };

    const handleUpdateStudent = (dataStud: any) => {
        setStud({ ...stud, ...dataStud });
        setNote({ ...note, stud: dataStud });
        noteStore.setStud({ ...stud, ...dataStud });
        noteStore.setNote({ ...note, stud: dataStud });


    };


    const PaperComponentAutoComplete: FC = ({ children }) => {
        return <Paper style={{ background: "white" }}>{children}</Paper>;
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


    const deleteClasse = () => {

        if (toJS(noteStore.selectedNote)) {
            props.noteStore
                .deleteTotalNote(toJS(noteStore.selectedNote))
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
        const arrayNoteMath: any = [];
        const arrayNotePc: any = [];
        const arrayNoteAng: any = [];
        const arrayNoteMal: any = [];
        const arrayNoteFr: any = [];
        const arrayNotePhilo: any = [];
        const arrayNoteHistoGeo: any = [];
        const arrayNoteEps: any = [];

        const listNoteDef: any = [];

        const arrayDeNoteJ: any | number[] = [
            { valueNote: noteJournalier?.note_Maths },
            { valueNote: noteJournalier?.note_Pc },
            { valueNote: noteJournalier?.note_Ang },
            { valueNote: noteJournalier?.note_Mal },
            { valueNote: noteJournalier?.note_Fr },
            { valueNote: noteJournalier?.note_Philo },
            { valueNote: noteJournalier?.note_HistoGeo },
            { valueNote: noteJournalier?.note_SVT },
            { valueNote: noteJournalier?.note_Eps },
        ]

        const arrayDeCoefJ: any | number[] = [
            { valueCoef: noteJournalier?.coef_Maths },
            { valueCoef: noteJournalier?.coef_Pc },
            { valueCoef: noteJournalier?.coef_Ang },
            { valueCoef: noteJournalier?.coef_Mal },
            { valueCoef: noteJournalier?.coef_Fr },
            { valueCoef: noteJournalier?.coef_Philo },
            { valueCoef: noteJournalier?.coef_HistoGeo },
            { valueCoef: noteJournalier?.coef_SVT },
            { valueCoef: noteJournalier?.coef_Eps },
        ]


        const arrayDeNoteCompo: any | number[] = [
            { valueNote: noteComposition?.note_Maths },
            { valueNote: noteComposition?.note_Pc },
            { valueNote: noteComposition?.note_Ang },
            { valueNote: noteComposition?.note_Mal },
            { valueNote: noteComposition?.note_Fr },
            { valueNote: noteComposition?.note_Philo },
            { valueNote: noteComposition?.note_HistoGeo },
            { valueNote: noteComposition?.note_SVT },
            { valueNote: noteComposition?.note_Eps },
        ]

        const arrayDeCoefCompo: any | number[] = [
            { valueCoef: noteComposition?.coef_Maths },
            { valueCoef: noteComposition?.coef_Pc },
            { valueCoef: noteComposition?.coef_Ang },
            { valueCoef: noteComposition?.coef_Mal },
            { valueCoef: noteComposition?.coef_Fr },
            { valueCoef: noteComposition?.coef_Philo },
            { valueCoef: noteComposition?.coef_HistoGeo },
            { valueCoef: noteComposition?.coef_SVT },
            { valueCoef: noteComposition?.coef_Eps },
        ]

        const arrayNoteJ = [{ ...note.noteJournalier }];
        const arrayNoteCompo = [{ ...note.noteComposition }];



        const listNoteJ = () => {
            const listNote = [];
            for (let i = 0; i < arrayDeNoteJ.length; i++) {
                if (arrayDeNoteJ[i].valueNote !== undefined) {
                    listNote.push(arrayDeNoteJ[i].valueNote)
                }
            }
            return listNote;
        };

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


            listNoteDef.push(MathNote);
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

            listNoteDef.push(PcNote);
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

            listNoteDef.push(AngNote);
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

            listNoteDef.push(MalNote);
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

            listNoteDef.push(FrNote);
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

            listNoteDef.push(PhiloNote);
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

            listNoteDef.push(HistoGeoNote);
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

            listNoteDef.push(SVTNote);
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

            listNoteDef.push(EpsNote);
            return EpsNote;
        };

        // const listNoteCompo = () => {
        //     const listNote = [];
        //     for (let i = 0; i < arrayDeNoteCompo.length; i++) {
        //         if (arrayDeNoteCompo[i].valueNote !== undefined) {
        //             listNote.push(arrayDeNoteCompo[i].valueNote)
        //         }
        //     }
        //     return listNote;
        // };

        const listCoef = () => {
            const list = [];
            for (let i = 0; i < arrayDeCoefJ.length; i++) {
                if (arrayDeCoefJ[i].valueCoef !== undefined) {
                    list.push(arrayDeCoefJ[i].valueCoef)
                }
            }
            return list;
        };

        // const totalNote1erTrim: number = listNoteDef.length > 0 ? listNoteDef
        // .map((item: any) => parseInt(item, 10))
        // .reduce((a: any, b: any) => a + b) : 0;

        // const getTotalNoteJ: number = listNoteJ().length > 0 ? listNoteJ()
        //     .map((item: any) => parseInt(item, 10))
        //     .reduce((a: any, b: any) => a + b) : 0;



        // const getTotalNoteCompo: number = listNoteCompo().length > 0 ? listNoteCompo()
        //     .map((item: any) => parseInt(item, 10))
        //     .reduce((a: any, b: any) => a + b) : 0;


        // const getTotalCoefCompo: number = arrayDeCoefCompo.length > 0 ? arrayDeCoefCompo
        //     .map((item: any) => parseInt(item?.valueCoef, 10))
        //     .reduce((a: any, b: any) => a + b) : 0;

        // const sumNote: number = +getTotalNoteJ + +getTotalNoteCompo;

        // const totalNote1erTrim = () => {

        //     let totalNote = 0;
        //     if (getTotalNoteJ !== 0) {
        //         totalNote = getTotalNoteJ;
        //     }
        //     if (getTotalNoteCompo !== 0) {
        //         totalNote = getTotalNoteCompo;
        //     }
        //     if (getTotalNoteCompo !== 0 && getTotalNoteJ !== 0) {
        //         totalNote = sumNote;
        //     }

        //     return totalNote;

        // };


    
        const getTotalCoefJ: number = listCoef().length > 0 ? listCoef()
            .map((item: any) => parseInt(item, 10))
            .reduce((a: any, b: any) => a + b) : 0;

        const totalNote1erTrim = () => {
            let somme = 0;
            for (let i = 0; i < listNoteDef.length; i++) {
                somme += listNoteDef[i];

            }
            return somme;
        };
        // console.log("NoteMath....", NoteMath());
        // console.log("NotePc....", NotePc());
        // console.log("NoteAng....", NoteAng());
        // console.log("NoteMal....", NoteMal());
        // console.log("NoteFr....", NoteFr());
        // console.log("NotePhilo....", NotePhilo());
        // console.log("NoteHistoGeo...", NoteHistoGeo());
        // console.log("NoteSVT....", NoteSVT());
        // console.log("NoteEps....", NoteEps());
        // console.log("noteJournalier....", noteJournalier);
        // console.log("noteComposition....", noteComposition);
        // console.log("listNoteDef....", listNoteDef);
        // console.log("getTotalCoefJ....", +getTotalCoefJ);
        // console.log("totalNote1erTrim....", +totalNote1erTrim());

        const generalMoyen1erTrim = +totalNote1erTrim() / +getTotalCoefJ;
        const newNote = {
            stud:{...stud},
            noteJournalier:{...noteJournalier},
            noteComposition:{...noteComposition},
            totalCoefJ0: +getTotalCoefJ,
            total1erTrim: +totalNote1erTrim(),
            generalMoyen1erTrim: +generalMoyen1erTrim.toFixed(2),


        }
        const errors = validationData(newNote);

        setSaveErrors(errors);

        if (errors.length) {
            setOpenErrorSnackbar(true);
            return;
        }
        console.log("toJS(noteStore.selectedNote)...", toJS(noteStore.selectedNote));

        if (!toJS(noteStore.selectedNote)) {


            props.noteStore.createNotes(newNote).then((addClasse: any) => {
                if (addClasse) {
                    history.push("/note/list");
                }
            })
        } else {
            props.noteStore.updateNote(newNote).then((editClasse: any) => {
                console.log("newNote..", newNote);
                if (editClasse) {
                    history.push("/note/list");
                    // classeStore.getAllClass();
                }

            });
        }

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
    ];

    return (
        <div>
            <div>
                <ConfirmModal
                    isOpen={openModal}
                    handleCloseConfirmModal={handleCloseConfirmModal}
                    path={pathRedirect}
                />
                <SearchStudentModal
                    handleClose={toggleStudent}
                    openModal={modalStateStudent}
                    setEleve={handleUpdateStudent}
                />
                <DeleteTotalModal
                    isOpen={openDeleteModal}
                    handleCloseDeleteModal={handleCloseDeleteModal}
                    deleteData={deleteClasse}
                />
            </div>
            <form onSubmit={onSubmit}>
                <Grid container={true} direction="row" spacing={1} >
                    <Grid item={true} sm={12} xs={12}>
                        <div className={classes.title}>ELEVE  <EditIcon onClick={ChangeIt} className={classes.iconStyle} style={{ display: HideBtn }} /></div>
                        <div className={classes.item}>
                            <Grid container={true} direction="row" spacing={1}>
                                <Grid item={true} sm={4} xs={12}>
                                    <TextField
                                        label="Choix d'élève"
                                        name="number"
                                        required={true}
                                        value={
                                            stud.matriculNumber || ""
                                        }
                                        disabled={true}
                                        InputProps={{
                                            endAdornment: !noteStore.isFromBooking ? (
                                                <SearchOutlined onClick={toggleStudent} />
                                            ) : (
                                                ""
                                            ),
                                            classes: {
                                                input: classes.resizeTextField,
                                            },
                                        }}
                                    />
                                </Grid>
                                <Grid item={true} sm={4} xs={12}>
                                    <TextField
                                        label="Prénom"
                                        name="lastName"
                                        disabled={true}
                                        required={true}
                                        onChange={handleChangeStudent}
                                        value={stud.lastName || ""}
                                        InputProps={{
                                            classes: {
                                                input: classes.resizeTextField,
                                            },
                                        }}
                                    />
                                </Grid>
                                <Grid item={true} sm={4} xs={12}>
                                    <TextField
                                        label="Nom"
                                        name="firstName"
                                        disabled={true}
                                        required={true}
                                        onChange={handleChangeStudent}
                                        value={stud.firstName || ""}
                                        InputProps={{
                                            classes: {
                                                input: classes.resizeTextField,
                                            },
                                        }}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container={true} direction="row" spacing={1}>
                                <Grid item={true} sm={4} xs={12}>
                                    <TextField
                                        label="Ecole"
                                        name="schoolName"
                                        disabled={true}
                                        required={true}
                                        onChange={handleChangeStudent}
                                        value={stud.schoolName || ""}
                                        InputProps={{
                                            classes: {
                                                input: classes.resizeTextField,
                                            },
                                        }}
                                    />
                                </Grid>
                                <Grid item={true} sm={4} xs={12}>
                                    <TextField
                                        label="Nom de classe"
                                        name="class"
                                        disabled={true}
                                        required={true}
                                        onChange={handleChangeStudent}
                                        value={stud.class || ""}
                                        InputProps={{
                                            classes: {
                                                input: classes.resizeTextField,
                                            },
                                        }}
                                    />
                                </Grid>
                            </Grid>
                        </div>
                    </Grid>
                    <Grid item={true} md={6} xs={12}>
                        <div className={classes.title}>NOTE JOURNALIERE 1er TRIM </div>
                        <div className={classes.itemNote}>
                            <Grid container={true} direction="row" spacing={1} >
                                <Grid item={true} sm={3} xs={12}>
                                    <TextField
                                        label="Note Maths"
                                        name="note_Maths"
                                        onChange={handleChangeJournalier}
                                        value={noteJournalier?.note_Maths || 0}

                                    />
                                </Grid>
                                <Grid item={true} sm={3} xs={12}>
                                    <TextField
                                        label="Coéf Maths"
                                        required={true}
                                        name="coef_Maths"
                                        onChange={handleChangeJournalier}
                                        value={noteJournalier.coef_Maths || 0}

                                    />
                                </Grid>
                                <Grid item={true} sm={3} xs={12}>
                                    <TextField
                                        label="Note PC"
                                        name="note_Pc"
                                        onChange={handleChangeJournalier}
                                        value={noteJournalier.note_Pc || 0}

                                    />
                                </Grid>
                                <Grid item={true} sm={3} xs={12}>
                                    <TextField
                                        label="Coéf PC"
                                        required={true}
                                        name="coef_Pc"
                                        onChange={handleChangeJournalier}
                                        value={noteJournalier.coef_Pc || 0}

                                    />
                                </Grid>
                            </Grid>


                            <Grid container={true} direction="row" spacing={1} >
                                <Grid item={true} sm={3} xs={12}>
                                    <TextField
                                        label="Note Anglais"
                                        name="note_Ang"
                                        onChange={handleChangeJournalier}
                                        value={noteJournalier.note_Ang || 0}

                                    />
                                </Grid>
                                <Grid item={true} sm={3} xs={12}>
                                    <TextField
                                        label="Coéf Anglais"
                                        required={true}
                                        name="coef_Ang"
                                        onChange={handleChangeJournalier}
                                        value={noteJournalier.coef_Ang || 0}

                                    />
                                </Grid>
                                <Grid item={true} sm={3} xs={12}>
                                    <TextField
                                        label="Note Malagasy"
                                        name="note_Mal"
                                        onChange={handleChangeJournalier}
                                        value={noteJournalier.note_Mal || 0}

                                    />
                                </Grid>
                                <Grid item={true} sm={3} xs={12}>
                                    <TextField
                                        label="Coéf Malagasy"
                                        required={true}
                                        name="coef_Mal"
                                        onChange={handleChangeJournalier}
                                        value={noteJournalier.coef_Mal || 0}

                                    />
                                </Grid>
                            </Grid>

                            <Grid container={true} direction="row" spacing={1} >
                                <Grid item={true} sm={3} xs={12}>
                                    <TextField
                                        label="Note Français"
                                        name="note_Fr"
                                        onChange={handleChangeJournalier}
                                        value={noteJournalier.note_Fr || 0}

                                    />
                                </Grid>
                                <Grid item={true} sm={3} xs={12}>
                                    <TextField
                                        label="Coéf Français"
                                        required={true}
                                        name="coef_Fr"
                                        onChange={handleChangeJournalier}
                                        value={noteJournalier.coef_Fr || 0}

                                    />
                                </Grid>
                                <Grid item={true} sm={3} xs={12}>
                                    <TextField
                                        label="Note Philo"
                                        name="note_Philo"
                                        onChange={handleChangeJournalier}
                                        value={noteJournalier.note_Philo || 0}

                                    />
                                </Grid>
                                <Grid item={true} sm={3} xs={12}>
                                    <TextField
                                        label="Coéf Philo"
                                        required={true}
                                        name="coef_Philo"
                                        onChange={handleChangeJournalier}
                                        value={noteJournalier.coef_Philo || 0}

                                    />
                                </Grid>
                            </Grid>


                            <Grid container={true} direction="row" spacing={1} >
                                <Grid item={true} sm={3} xs={12}>
                                    <TextField
                                        label="Note Histo-Géo"
                                        name="note_HistoGeo"
                                        onChange={handleChangeJournalier}
                                        value={noteJournalier.note_HistoGeo || 0}

                                    />
                                </Grid>
                                <Grid item={true} sm={3} xs={12}>
                                    <TextField
                                        label="Coéf Histo-Géo"
                                        required={true}
                                        name="coef_HistoGeo"
                                        onChange={handleChangeJournalier}
                                        value={noteJournalier.coef_HistoGeo || 0}

                                    />
                                </Grid>
                                <Grid item={true} sm={3} xs={12}>
                                    <TextField
                                        label="Note SVT"
                                        name="note_SVT"
                                        onChange={handleChangeJournalier}
                                        value={noteJournalier.note_SVT || 0}

                                    />
                                </Grid>
                                <Grid item={true} sm={3} xs={12}>
                                    <TextField
                                        label="Coéf SVT"
                                        required={true}
                                        name="coef_SVT"
                                        onChange={handleChangeJournalier}
                                        value={noteJournalier.coef_SVT || 0}

                                    />
                                </Grid>
                                <Grid item={true} sm={3} xs={12}>
                                    <TextField
                                        label="Note EPS"
                                        name="note_Eps"
                                        onChange={handleChangeJournalier}
                                        value={noteJournalier.note_Eps || 0}

                                    />
                                </Grid>
                                <Grid item={true} sm={3} xs={12}>
                                    <TextField
                                        label="Coéf EPS"
                                        required={true}
                                        name="coef_Eps"
                                        onChange={handleChangeJournalier}
                                        value={noteJournalier.coef_Eps || 0}

                                    />
                                </Grid>

                            </Grid>
                        </div>
                    </Grid>

                    <Grid item={true} md={6} xs={12}>
                        <div className={classes.title}>NOTE DE COMPOSITION  1er TRIM </div>
                        <div className={classes.itemNote}>
                            <Grid container={true} direction="row" spacing={1} >
                                <Grid item={true} sm={3} xs={12}>
                                    <TextField
                                        label="Note Maths"
                                        name="note_Maths"
                                        onChange={handleChangeComposition}
                                        value={noteComposition.note_Maths || 0}

                                    />
                                </Grid>
                                <Grid item={true} sm={3} xs={12}>
                                    <TextField
                                        label="Coéf Maths"
                                        required={true}
                                        name="coef_Maths"
                                        onChange={handleChangeComposition}
                                        value={noteComposition.coef_Maths || 0}

                                    />
                                </Grid>
                                <Grid item={true} sm={3} xs={12}>
                                    <TextField
                                        label="Note PC"
                                        name="note_Pc"
                                        onChange={handleChangeComposition}
                                        value={noteComposition.note_Pc || 0}

                                    />
                                </Grid>
                                <Grid item={true} sm={3} xs={12}>
                                    <TextField
                                        label="Coéf PC"
                                        required={true}
                                        name="coef_Pc"
                                        onChange={handleChangeComposition}
                                        value={noteComposition.coef_Pc || 0}

                                    />
                                </Grid>
                            </Grid>


                            <Grid container={true} direction="row" spacing={1} >
                                <Grid item={true} sm={3} xs={12}>
                                    <TextField
                                        label="Note Anglais"
                                        name="note_Ang"
                                        onChange={handleChangeComposition}
                                        value={noteComposition.note_Ang || 0}

                                    />
                                </Grid>
                                <Grid item={true} sm={3} xs={12}>
                                    <TextField
                                        label="Coéf Anglais"
                                        required={true}
                                        name="coef_Ang"
                                        onChange={handleChangeComposition}
                                        value={noteComposition.coef_Ang || 0}

                                    />
                                </Grid>
                                <Grid item={true} sm={3} xs={12}>
                                    <TextField
                                        label="Note Malagasy"
                                        name="note_Mal"
                                        onChange={handleChangeComposition}
                                        value={noteComposition.note_Mal || 0}

                                    />
                                </Grid>
                                <Grid item={true} sm={3} xs={12}>
                                    <TextField
                                        label="Coéf Malagasy"
                                        required={true}
                                        name="coef_Mal"
                                        onChange={handleChangeComposition}
                                        value={noteComposition.coef_Mal || 0}

                                    />
                                </Grid>
                            </Grid>

                            <Grid container={true} direction="row" spacing={1} >
                                <Grid item={true} sm={3} xs={12}>
                                    <TextField
                                        label="Note Français"
                                        name="note_Fr"
                                        onChange={handleChangeComposition}
                                        value={noteComposition.note_Fr || 0}

                                    />
                                </Grid>
                                <Grid item={true} sm={3} xs={12}>
                                    <TextField
                                        label="Coéf Français"
                                        required={true}
                                        name="coef_Fr"
                                        onChange={handleChangeComposition}
                                        value={noteComposition.coef_Fr || 0}

                                    />
                                </Grid>
                                <Grid item={true} sm={3} xs={12}>
                                    <TextField
                                        label="Note Philo"
                                        name="note_Philo"
                                        onChange={handleChangeComposition}
                                        value={noteComposition.note_Philo || 0}

                                    />
                                </Grid>
                                <Grid item={true} sm={3} xs={12}>
                                    <TextField
                                        label="Coéf Philo"
                                        required={true}
                                        name="coef_Philo"
                                        onChange={handleChangeComposition}
                                        value={noteComposition.coef_Philo || 0}

                                    />
                                </Grid>
                            </Grid>


                            <Grid container={true} direction="row" spacing={1} >
                                <Grid item={true} sm={3} xs={12}>
                                    <TextField
                                        label="Note Histo-Géo"
                                        name="note_HistoGeo"
                                        onChange={handleChangeComposition}
                                        value={noteComposition.note_HistoGeo || 0}

                                    />
                                </Grid>
                                <Grid item={true} sm={3} xs={12}>
                                    <TextField
                                        label="Coéf Histo-Géo"
                                        required={true}
                                        name="coef_HistoGeo"
                                        onChange={handleChangeComposition}
                                        value={noteComposition.coef_HistoGeo || 0}

                                    />
                                </Grid>
                                <Grid item={true} sm={3} xs={12}>
                                    <TextField
                                        label="Note SVT"
                                        name="note_SVT"
                                        onChange={handleChangeComposition}
                                        value={noteComposition.note_SVT || 0}

                                    />
                                </Grid>
                                <Grid item={true} sm={3} xs={12}>
                                    <TextField
                                        label="Coéf SVT"
                                        required={true}
                                        name="coef_SVT"
                                        onChange={handleChangeComposition}
                                        value={noteComposition.coef_SVT || 0}

                                    />
                                </Grid>
                                <Grid item={true} sm={3} xs={12}>
                                    <TextField
                                        label="Note EPS"
                                        name="note_Eps"
                                        onChange={handleChangeComposition}
                                        value={noteComposition.note_Eps || 0}

                                    />
                                </Grid>
                                <Grid item={true} sm={3} xs={12}>
                                    <TextField
                                        label="Coéf EPS"
                                        required={true}
                                        name="coef_Eps"
                                        onChange={handleChangeComposition}
                                        value={noteComposition.coef_Eps || 0}

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
export default inject("noteStore", "userStore")(observer(CreateNote))