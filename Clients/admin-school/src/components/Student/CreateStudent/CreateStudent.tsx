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
import { UserStoreInterface } from "../../../store/UserStore";
import { NoteStoreInterface } from "../../../store/NoteStore";
import { AbstractEmptyInterface } from "../../../types";
import exportPDFStore from "../../../store/ExportPDFStore";
import { toJS } from "mobx";
import rootStore from '../../../store/AppStore';
import useStyles from "./style";
import { validationData } from "../CreateLogic";
import { validationDataStudent } from "../CreateLogicStudent";
import MailIcon from "@material-ui/icons/Mail";
import { etudiantRoles } from "../../../common/utils/data";

interface CreateStudentProps extends AbstractEmptyInterface {
  studentStore: StudentStoreInterface;
  userStore: UserStoreInterface
  noteStore: NoteStoreInterface
}

const nameImage = "image";
const CreateStudent: FC<CreateStudentProps> = (props: any) => {

  const { studentStore, userStore, noteStore } = props as CreateStudentProps;
  const classes = useStyles();
  const history = useHistory();
  const [isStorage, setIsStorage] = useState(false);
  const [isRole, setIsRole] = useState(false);
  const [student, setStudent] = useState<any>({});
  const [saveErrors, setSaveErrors] = useState<string[]>([]);
  const [saveErrorsStudent, setSaveErrorsStudent] = useState<string[]>([]);
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [role, setRole] = useState<any>({});
  const [openQuitModal, setOpenQuitModal] = useState(false);
  const [openTotalDeleteModal, setOpenTotalDeleteModal] = useState(false);
  const [pathRedirect, setPathRedirect] = useState("");

  useEffect(() => {

    if (studentStore.selectedStudent) {
      setIsStorage(true);
      setRole(getRole(studentStore.selectedStudent.role));
      setStudent(studentStore.selectedStudent);
    } else {
      setIsStorage(false);

    }

  }, [studentStore.selectedStudent]);

  useEffect(() => {

    if (studentStore.selectedStudent?.role === "LEAD_H" || studentStore.selectedStudent?.role === "LEAD_F") {
      setIsRole(true);
    } else {
      setIsRole(false);
    }
  }, [studentStore.selectedStudent]);


  useEffect(() => {
    studentStore.getAllStudent();

  }, [studentStore]);

  useEffect(() => {
    noteStore.getAllNotes();

  }, [noteStore]);

  useEffect(() => {
    if (studentStore.selectedStudent) {
      studentStore.getListEcolage();
      studentStore.getListFraisDivers();
    }

  }, [studentStore]);



  const handleOpenConfirmModal = (path: string) => (e: any) => {
    e.preventDefault();

    setPathRedirect(path);

    if (!isStorage) {
      setOpenQuitModal(true);
    } else {
      setOpenModal(true)
    }

    // setOpenModal(true);

  }
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setStudent({ ...student, [name]: value });
    studentStore.setStudent({ ...student, [name]: value });
  };

  const handleChangeRole = (newValue: any) => {
    const { code, label } = newValue;
    const data = code as string;
    const nom = label as string;
    if (data === "LEAD_H" || data === "LEAD_F") {
      setIsRole(true);
    } else {
      setIsRole(false);
    }
    setRole(newValue);
    setStudent({ ...student, role: data, nomRole: nom });
    studentStore.setStudent({ ...student, role: data, nomRole: nom });
  };

  const getRole = (code: string) => {
    return etudiantRoles.find((item: any) => item?.code === code);
  };

  const getPHotoProfilePath = (error: any, response: any) => {
    setStudent({ ...student, photo: response.data.path.replace("fichier", "/uploadFile/file") });
    studentStore.setStudent({ ...student, photo: response.data.path.replace("fichier", "/uploadFile/file") });
  };

  const handleCloseConfirmModal = () => {
    setOpenModal(false);
  };

  const handleCloseConfirmQuitModal = () => {
    setOpenQuitModal(false);
  };

  const handleOpenDeleteTotalModal = () => {

    setOpenTotalDeleteModal(true);
  };

  const handleCloseErrors = () => setOpenErrorSnackbar(!openErrorSnackbar);

  const handleCloseDeleteTotalModal = () => {
    setOpenTotalDeleteModal(false);
  };

  const handleAddNew = () => {
    // location.reload();
    history.push("/student/ecolage");
  };

  const handleAddDoc = () => {
    // location.reload();
    history.push("/student/document");
  };
  const getOptionLabel = (option: any) => option?.label;

  const onChangeAutoComplete = (e: any, newValue: string) => {
    handleChangeRole(newValue);

  };

  const renderInputAutoComplete = (params: any) => {
    return <TextField {...params} name="code" label="Rôle" required={true} />;
  };

  const PaperComponentAutoComplete: FC = ({ children }) => {
    return <Paper style={{ background: "white" }}>{children}</Paper>;
  };


  const onSubmit = (e: any) => {
    e.preventDefault();
    const newStudent = { ...student, schoolName: userStore.user?.schoolName }
    const errors = validationData(studentStore, newStudent);

    setSaveErrors(errors);

    if (errors.length) {
      setOpenErrorSnackbar(true);
      return;
    }


    if (!studentStore.selectedStudent) {

      props.studentStore.createStudent(newStudent).then((addUser: any) => {
        if (addUser) {
          history.push("/student/list");
          studentStore.getAllStudent();
        }
      });
    }
    else {
      props.studentStore.updateStudent(newStudent).then((editStudent: any) => {

        if (editStudent?.status === 200) {

          history.push("/student/list");
          studentStore.getAllStudent();
        }

      });
    }

  };


  const handleDownload = () => {

    const selectStudent = studentStore.selectedStudent;
    if (!studentStore.selectedStudent) {
      exportPDFStore.exportToPdfRecuDroit(student);
    } else {
      exportPDFStore.exportToPdfRecuDroit(selectStudent);
    }

  }

  const listEcolages = toJS(studentStore.ecolagePrive);
  const listNotes = toJS(noteStore.allNote);
  const listFrais = toJS(studentStore.droit);
  const selectListEcolage: any = [];
  const selectListFrais: any = [];

  for (let i = 0; i < listEcolages.length; i++) {
    if (listEcolages[i].student === studentStore.selectedStudent?.lastName && listEcolages[i].matriculNumber === studentStore.selectedStudent?.matriculNumber) {
      selectListEcolage.push(listEcolages[i]);

    }
  }

  for (let i = 0; i < listFrais.length; i++) {
    if (listFrais[i].student === studentStore.selectedStudent?.lastName && listFrais[i].matriculNumber === studentStore.selectedStudent?.matriculNumber) {
      selectListFrais.push(listFrais[i])
    }
  }



  const deleteTotalUser = () => {

    const dataStudent: any = {
      listNotes,
      selectListEcolage,
      selectListFrais,

    }
    const errors = validationDataStudent(dataStudent, studentStore.selectedStudent);

    setSaveErrors(errors);

    if (errors.length) {
      setOpenErrorSnackbar(true);
      setOpenTotalDeleteModal(false);
      return;
    }


    props.studentStore
      .deleteTotalStudent(studentStore.selectedStudent)
      .then((editUser: any) => {
        if (editUser?.status === 200) {
          setOpenTotalDeleteModal(false);
          history.push("/student/list");
        }
      });


  }

  const footerIcons: FooterIcon[] = [
    {
      id: 0,
      ItemIcon: SaveListIcon,
      label: "Ajouter",
      type: "submit",
      title: "Sauvegarder",
    },
    {
      id: 1,
      ItemIcon: ListIcon,
      label: "Liste",
      onClick: handleOpenConfirmModal("/student/list"),
      title: "Liste",
    },
    {
      id: 2,
      ItemIcon: DeleteIcon,
      label: "Supprimer",
      onClick: handleOpenDeleteTotalModal,
      title: "Supprimer"
    },
    {
      id: 4,
      ItemIcon: AddIcon,
      label: "Nouveau",
      onClick: handleAddNew,
      title: `${studentStore.selectedStudent?.schoolName.includes("Privé") ? "Ecolage" : "Frais divers"
        }`,
    },
    {
      id: 5,
      ItemIcon: PictureAsPdfIcon,
      onClick: handleDownload,
      title: "Exporter en PDF",
    },


  ];

  const footerIconsDelegue: FooterIcon[] = [
    {
      id: 0,
      ItemIcon: SaveListIcon,
      label: "Ajouter",
      type: "submit",
      title: "Sauvegarder",
    },
    {
      id: 1,
      ItemIcon: ListIcon,
      label: "Liste",
      onClick: handleOpenConfirmModal("/student/list"),
      title: "Liste",
    },
    {
      id: 2,
      ItemIcon: DeleteIcon,
      label: "Supprimer",
      onClick: handleOpenDeleteTotalModal,
      title: "Supprimer"
    },
    {
      id: 4,
      ItemIcon: AddIcon,
      label: "Nouveau",
      onClick: handleAddNew,
      title: `${studentStore.selectedStudent?.schoolName.includes("Privé") ? "Ecolage" : "Frais divers"
        }`,
    },
    {
      id: 5,
      ItemIcon: PictureAsPdfIcon,
      onClick: handleDownload,
      title: "Exporter en PDF",
    },

    {
      id: 6,
      ItemIcon: MailIcon,
      label: "Ajouts Documents",
      onClick: handleAddDoc,
      title: "Ajouts Documents",

    },


  ];

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

        <DeleteTotalModal
          isOpen={openTotalDeleteModal}
          handleCloseDeleteModal={handleCloseDeleteTotalModal}
          deleteData={deleteTotalUser}
        />
      </div>

      <HeaderPath
        paths={[
          {
            label: "Dashboard",
            path: "/",
            clickHandler: handleOpenConfirmModal,
          },
          {
            label: "Liste des élèves",
            path: "/student/list",
            clickHandler: handleOpenConfirmModal,
          },
          {
            label: `${!isStorage ? "Création élève" : "Fiche élève"
              }`,
            path: "/student/new-student",
          },
        ]}
      />

      <form onSubmit={onSubmit}>

        <div className={classes.content}>
          <BodyTitle title="Elève" />
          <div className={classes.fields}>
            <div className={classes.firstSection}>
              <Grid container={true}>
                <Grid
                  item={true}
                  xs={12}
                  md={4}
                  spacing={5}
                  className={classes.AvatarUploadStyle}
                >
                  <AvatarUploader
                    defaultImg={
                      `${config.servers.apiUrl}${student.photo?.replace(
                        "/uploadFile",
                        "uploadFile"
                      )}` ||
                      photo ||
                      " "
                    }
                    size={200}
                    name="file"
                    uploadURL={`${config.servers.apiUrl}uploadFile/upload/profiles`}
                    onFinished={getPHotoProfilePath}
                    fileType={nameImage}
                  />
                </Grid>

                <Grid
                  container={true}
                  direction="row"
                  spacing={2}
                  xs={12}
                  md={8}
                >
                  <Grid item={true} md={6}>
                    <TextField
                      label="Ecole"
                      required={true}
                      disabled={true}
                      name="schoolName"
                      fullWidth={true}
                      value={userStore.user?.schoolName || student.schoolName || ""}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item={true} xs={12} md={6}>
                    <Autocomplete
                      options={etudiantRoles}
                      getOptionLabel={getOptionLabel}
                      value={role}
                      PaperComponent={PaperComponentAutoComplete}
                      onChange={onChangeAutoComplete}
                      renderInput={renderInputAutoComplete}
                    />
                  </Grid>

                  <Grid item={true} md={6}>
                    <TextField
                      label="Nom"
                      required={true}
                      name="firstName"
                      fullWidth={true}
                      value={student.firstName || ""}
                      onChange={handleChange}
                    />
                  </Grid>

                  <Grid item={true} xs={12} md={6}>
                    <TextField
                      label="Prénom"
                      name="lastName"
                      fullWidth={true}
                      value={student.lastName || ""}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item={true} xs={12} md={4} >
                    <TextField
                      label="Numéro matricule"
                      name="matriculNumber"
                      value={student.matriculNumber || ""}
                      required={true}
                      fullWidth={true}
                      onChange={handleChange}
                    />
                  </Grid>

                  <Grid item={true} xs={12} md={4}>
                    <TextField
                      label="Niveau"
                      name="height"
                      value={student.height || ""}
                      required={true}
                      fullWidth={true}
                      onChange={handleChange}
                    />
                  </Grid>
                  {isRole ?
                    (<Grid item={true} xs={12} md={4}>
                      <TextField
                        label="Email"
                        name="email"
                        value={student.email || ""}
                        required={true}
                        fullWidth={true}
                        onChange={handleChange}
                      />
                    </Grid>) : ""}

                  <Grid item={true} xs={12} md={4}>
                    <TextField
                      label="Nom de classe"
                      required={true}
                      name="class"
                      fullWidth={true}
                      value={student.class || ""}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item={true} xs={12} md={4}>
                    <TextField
                      label="Adresse"
                      required={true}
                      name="address"
                      fullWidth={true}
                      value={student.address || ""}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item={true} xs={12} md={4}>
                    <TextField
                      label="Droit d'inscription"
                      required={true}
                      // disabled={true}
                      name="inscriptionDroit"
                      fullWidth={true}
                      value={student?.inscriptionDroit || ""}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item={true} xs={12} md={4}>
                    <TextField
                      label="Année Scolaire"
                      required={true}
                      // disabled={true}
                      name="scolarYear"
                      fullWidth={true}
                      value={student?.scolarYear || ""}
                      onChange={handleChange}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </div>
          </div>
        </div>
        <EditFooter icons={isRole ? footerIconsDelegue : footerIcons} />
        <ErrorSnackbar
          open={openErrorSnackbar}
          handleClose={handleCloseErrors}
          errors={saveErrors}
          defaultTitle="Vérifiez le formulaire"
        />
      </form>
    </div>
  );
}
export default inject("studentStore", "userStore", "noteStore")(observer(CreateStudent));

