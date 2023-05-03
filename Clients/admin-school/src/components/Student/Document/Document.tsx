import {
    Grid,
    TextField,
    Paper,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/DeleteOutline";
import ListIcon from "@material-ui/icons/ListAlt";
import SaveListIcon from "@material-ui/icons/Save";
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
import UploadFileDocument from "../../../common/UploadFileOtherDocument";
import { IStudent } from "../../../common/interface/StudentInterface"


interface CreateDocProps extends AbstractEmptyInterface{
    studentStore: StudentStoreInterface;
    edit: IStudent;
}

const CreateDocument: FC<CreateDocProps > = (props: any) => {

    const { studentStore, edit } = props as CreateDocProps;

    const classes = useStyles();
    const history = useHistory();
    const [document, setDocument] = useState<any>({});
    const [openModal, setOpenModal] = useState(false);
    const [isSchool, setIsSchool] = useState(false);
    const [role, setRole] = useState<any>({});
    const [isStorage, setIsStorage] = useState(false);
    const [openQuitModal, setOpenQuitModal] = useState(false);
    const [openTotalDeleteModal, setOpenTotalDeleteModal] = useState(false);

    const setDocumentUpload = (e: any, key: string) => {
        if (key === "deleted") {
            setDocument({ ...e });
        } else {
            setDocument({
                ...document,
                [key]: { ...e },
            });
        }
    };
    const handleOpenConfirmModal = (path: string) => (e: any) => {
        e.preventDefault();

        // setPathRedirect(path);

        if (!isStorage) {
            setOpenQuitModal(true);
        } else {
            setOpenModal(true)
        }

        // setOpenModal(true);

    }


    const handleOpenDeleteTotalModal = () => {

        setOpenTotalDeleteModal(true);
    };

    const handleCloseDeleteTotalModal = () => {
        setOpenTotalDeleteModal(false);
    };

    const onSubmit = (e: any) => {
        e.preventDefault();
        // const errors = validationData(studentStore);

        // setSaveErrors(errors);

        // if (errors.length) {
        //   setOpenErrorSnackbar(true);
        //   return;
        // }



        // if (!studentStore.selectedStudent) {

        //   props.studentStore.createStudent(student).then((addUser: any) => {
        //     if (addUser) {
        //       history.push("/student/list");
        //       studentStore.getAllStudent();
        //     }
        //   });
        // }
        // else {
        //   props.studentStore.updateStudent(student).then((editStudent: any) => {

        //     if (editStudent?.status === 200) {

        //       history.push("/student/list");
        //       studentStore.getAllStudent();
        //     }

        //   });
        // }

    };

    return (
        <div className={classes.root}>
            <div>
                {/* <ConfirmModal
                    isOpen={openModal}
                    handleCloseConfirmModal={handleCloseConfirmModal}
                    path={pathRedirect}
                />
                <ConfirmQuitModal
                    isOpen={openQuitModal}
                    handleCloseConfirmQuitModal={handleCloseConfirmQuitModal}
                    path={pathRedirect}
                /> */}
                {/* 
                <DeleteTotalModal
                    isOpen={openTotalDeleteModal}
                    handleCloseDeleteModal={handleCloseDeleteTotalModal}
                    deleteData={deleteTotalUser}
                /> */}



                {/* <UploadFileDocument
                    category="elève"
                    setData={setDocumentUpload}
                    document={document}
                /> */}
            </div>
            <form onSubmit={onSubmit}>
                <div className={classes.content}>
                    <BodyTitle title="Documents" />
                    <div className={classes.fields}>
                        <div className={classes.firstSection}>
                            <UploadFileDocument
                                category="elève"
                                setData={setDocumentUpload}
                                document={document}
                            />
                        </div>
                    </div>
                </div>
                {/* <EditFooter icons={footerIcons} /> */}
            </form>
        </div>



    )

}
export default inject("studentStore")(observer(CreateDocument));