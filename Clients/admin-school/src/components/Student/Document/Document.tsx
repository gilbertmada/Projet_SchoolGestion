import {
    Grid,
    TextField,
    Paper,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/DeleteOutline";
import ListIcon from "@material-ui/icons/ListAlt";
import SaveListIcon from "@material-ui/icons/Save";
import FastForwardIcon from "@material-ui/icons/FastForward";
import { inject, observer } from "mobx-react";
import { FC, useEffect, useState } from "react";
import AvatarUploader from "react-avatar-uploader";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useHistory } from "react-router-dom";
import PictureAsPdfIcon from "@material-ui/icons/PictureAsPdf";
import photo from "../../../Assets/images/etudiant.jpeg";
import BodyTitle from "../../../common/BodyTitle";
import EditFooter from "../../../common/EditFooter";
import HeaderPath from "../../../common/HeaderPath";
import ErrorSnackbar from "../../../common/ErrorSnackbar";
import { FooterIcon } from "../../../common/interface";
import { ConfirmModal, ConfirmQuitModal, DeleteTotalModal } from "../../../common/Modal";
import config from "../../../config/index";
import { StudentStoreInterface } from "../../../store/StudentStore";
import { AbstractEmptyInterface } from "../../../types";
import useStyles from "./style";
import FormUpload from '../../../common/UploadFileOtherDocument/FormUpload';
import UploadFileDocument from "../../../common/UploadFileOtherDocument";
import { UserStoreInterface } from "../../../store/UserStore";
import History from "../History";
import { IStudent } from "../../../common/interface/StudentInterface"
import { toJS } from "mobx";


interface CreateDocProps extends AbstractEmptyInterface {
    studentStore: StudentStoreInterface;
    userStore: UserStoreInterface;
}

const CreateDocument: FC<CreateDocProps> = (props: any) => {

    const { studentStore, userStore } = props as CreateDocProps;

    const classes = useStyles();
    const history = useHistory();
    const [document, setDocument] = useState<any>({});
    const [openModal, setOpenModal] = useState(false);
    const [isRole, setIsRole] = useState<any>({});
    const [student, setStudent] = useState<any>({});
    const [isStorage, setIsStorage] = useState(false);
    const [openQuitModal, setOpenQuitModal] = useState(false);
    const [pathRedirect, setPathRedirect] = useState("");
    const [openTotalDeleteModal, setOpenTotalDeleteModal] = useState(false);

    useEffect(() => {
        studentStore.getAllStudent();

    }, [studentStore]);

    useEffect(() => {

        if (studentStore.selectedStudent?.role === "LEAD_H" || studentStore.selectedStudent?.role === "LEAD_F") {
            setIsRole(true);
        } else {
            setIsRole(false);
        }
    }, [studentStore.selectedStudent]);

    const editEleve = toJS(studentStore.Student);
    const setDocumentUpload = (e: any, key: string) => {
        if (key === "deleted") {
            setDocument({ ...e });
        } else {
            setDocument({
                ...document,
                [key]: { ...e },
            });
            studentStore.setStudent({
                ...student,
                ...studentStore.selectedStudent,
                ...document,
                [key]: { ...e },
            });

        }


    };



    const handleOpenDeleteTotalModal = () => {

        setOpenTotalDeleteModal(true);
    };

    const handleCloseDeleteTotalModal = () => {
        setOpenTotalDeleteModal(false);
    };
    const handleOpenConfirmModal = (path: string) => (e: any) => {
        e.preventDefault();

        setPathRedirect(path);

        if (!isRole) {
            setOpenQuitModal(true);
        } else {
            setOpenModal(true)
        }
        // setOpenModal(true);
    };

    const handleCloseConfirmModal = () => {
        setOpenModal(false);
    };

    const handleCloseConfirmQuitModal = () => {
        setOpenQuitModal(false);
    };
    const sendMail = (e: any) => {
        e.preventDefault();
        
        if (isRole === true) {
            studentStore.sendMail(editEleve);
        }

    };
    
    const onSubmit = (e: any) => {
        e.preventDefault();

        if (isRole === true) {

            props.studentStore.updateStudent(editEleve).then((addUser: any) => {
                if (addUser) {
                    history.push("/student/document");

                }
            });
            console.log("userStore.user.....", toJS(userStore.user));
            console.log("editEleve.....", editEleve);
            console.log("document.....", document);
     
            studentStore.AddNewHistoryDocument(userStore.user, editEleve, document.Document);

        }


    };

    const footerIcons: FooterIcon[] = [
        {
            id: 0,
            ItemIcon: SaveListIcon,
            label: "Ajouter",
            type: "submit",
            onClick: onSubmit,
            title: "Sauvegarder  ",
        },
        {
            id: 1,
            ItemIcon: FastForwardIcon,
            onClick: sendMail,
            title: "Envoyer par émail",
        },
        // {
        //   id: 2,
        //   ItemIcon: DeleteIcon,
        //   label: "Supprimer",
        //   onClick: handleOpenDeleteModal,
        //   title: "Supprimer"
        // },
    ]

    return (
        <div className={classes.root}>
            <div>
                <ConfirmModal
                    isOpen={openModal}
                    handleCloseConfirmModal={handleCloseConfirmModal}
                    path={pathRedirect}
                />
                <ConfirmQuitModal
                    isOpen={openQuitModal}
                    handleCloseConfirmQuitModal={handleCloseConfirmQuitModal}
                    path={pathRedirect}
                />
                {/* 
                <DeleteTotalModal
                    isOpen={openTotalDeleteModal}
                    handleCloseDeleteModal={handleCloseDeleteTotalModal}
                    deleteData={deleteTotalUser}
                /> */}


                <HeaderPath
                    paths={[
                        {
                            label: "Listes des Elèves",
                            path: "/student/list",
                            clickHandler: handleOpenConfirmModal,
                        },
                        {
                            label: "Elève",
                            path: "/student/new-student",
                            clickHandler: handleOpenConfirmModal,
                        },

                    ]}
                />

            </div>
            <form onSubmit={onSubmit}>
                <div className={classes.content}>
                    <BodyTitle title="Documents" />
                    <div className={classes.fields}>
                        <Grid container={true} spacing={1}>
                            <Grid item={true} md={12} xs={12}>
                                <UploadFileDocument
                                    category="elève"
                                    setData={setDocumentUpload}
                                    document={document}
                                />
                                <Grid item={true} md={12} xs={12}>
                                    <History />
                                </Grid>
                            </Grid>
                        </Grid>
                    </div>
                </div>
                <EditFooter icons={footerIcons} />
            </form>
        </div>



    )

}
export default inject("studentStore", "userStore")(observer(CreateDocument));