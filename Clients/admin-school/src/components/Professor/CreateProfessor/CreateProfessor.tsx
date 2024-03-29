import {
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/DeleteOutline";
import ListIcon from "@material-ui/icons/ListAlt";
import SaveListIcon from "@material-ui/icons/Save";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { inject, observer } from "mobx-react";
import { FC, useEffect, useState } from "react";
import AvatarUploader from "react-avatar-uploader";
import { useHistory } from "react-router-dom";
import photo from "../../../Assets/images/professor.jpg";
import BodyTitle from "../../../common/BodyTitle";
import EditFooter from "../../../common/EditFooter";
import FormSelect from "../../../common/FormSelect/FormSelect";
import HeaderPath from "../../../common/HeaderPath";
import ErrorSnackbar from "../../../common/ErrorSnackbar";
import { FooterIcon } from "../../../common/interface";
import { ConfirmModal, ConfirmQuitModal, DeleteTotalModal } from "../../../common/Modal";
import { profRoles } from "../../../common/utils/data";
import config from "../../../config/index";
import { ProfessorStoreInterface } from "../../../store/ProfessorStore";
import { ClasseStoreInterface } from "../../../store/ClasseStore";
import { UserStoreInterface } from "../../../store/UserStore";
import { AbstractEmptyInterface } from "../../../types";
import { validationData } from "../CreateLogic";
import { toJS } from "mobx";
import rootStore from '../../../store/AppStore';
import useStyles from "./style";


interface CreateProfProps extends AbstractEmptyInterface {
  professorStore: ProfessorStoreInterface;
  userStore: UserStoreInterface
  classeStore: ClasseStoreInterface
}

const nameImage = "image";

const CreateProfessor: FC<AbstractEmptyInterface> = (props: any) => {

  const { professorStore, userStore,classeStore } = props as CreateProfProps;

  const classes = useStyles();
  const history = useHistory();
  const [isStorage, setIsStorage] = useState(false);
  const [professor, setProfessor] = useState<any>({});
  const [role, setRole] = useState<any>({});
  const [openModal, setOpenModal] = useState(false);
  const [openQuitModal, setOpenQuitModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [saveErrors, setSaveErrors] = useState<string[]>([]);
  const [showPassword, setShowPassword] = useState(false);
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);
  const [isAssigned, setIsAssigned] = useState(false);
  const [pathRedirect, setPathRedirect] = useState("");



  useEffect(() => {

    if (professorStore.selectedProfessor) {
      setIsStorage(true);
      setRole(getRole(professorStore.selectedProfessor.role));
      setProfessor(professorStore.selectedProfessor);
    } else {
      setIsStorage(false);
    }
  }, [professorStore.selectedProfessor]);



  useEffect(() => {
    classeStore.getAllClass();

  }, [classeStore]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setProfessor({ ...professor, [name]: value });
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleChangeRole = (newValue: any) => {
    const { code, label } = newValue;
    const data = code as string;
    const nom = label as string;

    setRole(newValue);
    setProfessor({ ...professor, role: data, nomRole: nom });

  };


const listClasse=toJS(classeStore.allClass);

  const onSubmit = (e: any) => {
    e.preventDefault();
    const newProfessor={...professor,schoolName:userStore.user?.schoolName}

    if (!professorStore.selectedProfessor) {

      props.professorStore.createProfessor(newProfessor).then((addProf: any) => {
        if (addProf) {
          history.push("/professor/list");
          professorStore.getAllProfessor();
        }
      });

    } else {
      props.professorStore.updateProfessor(newProfessor).then((editProf: any) => {

        if (editProf?.status === 200 && professorStore.filters?.currentlyWorking === true) {

          history.push("/professor/list");
          professorStore.getAllProfessor();
        }

      });
    }
  };



  const handleOpenConfirmModal = (path: string) => (e: any) => {
    e.preventDefault();

    setPathRedirect(path);


    if (!isStorage) {
      setOpenQuitModal(true);
    } else {
      setOpenModal(true)
    }


    // setOpenModal(true);
  };

  const handleCloseErrors = () => setOpenErrorSnackbar(!openErrorSnackbar);

  const handleCloseConfirmModal = () => {
    setOpenModal(false);
  };

  const handleCloseConfirmQuitModal = () => {
    setOpenQuitModal(false);
  };

  const handleOpenDeleteModal = () => {

    setOpenDeleteModal(true);
  };


  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };


  const deleteProfessor = () => {

    const errors = validationData(listClasse, professorStore.selectedProfessor);

    setSaveErrors(errors);

    if (errors.length) {
      setOpenErrorSnackbar(true);
      setOpenDeleteModal(false);
      return;
    }
 
      props.professorStore
        .deleteProfessor(professorStore.selectedProfessor)
        .then((editProf: any) => {
          if (editProf.status === 200) {
            setOpenDeleteModal(false);
            history.push("/professor/list");
          }
        });
   
  };

  const handleAddNew = () => {
    history.push("/professor/new-user");
  };

  const footerIcons: FooterIcon[] = [
    {
      id: 0,
      ItemIcon: SaveListIcon,
      label: "Ajouter",
      type: "submit",
      title: professorStore.selectedProfessor ? "Sauvegarder" : "Créer",
    },
    {
      id: 1,
      ItemIcon: ListIcon,
      label: "Liste",
      onClick: handleOpenConfirmModal("/professor/list"),
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


  const getRole = (code: string) => {
    return profRoles.find((item: any) => item?.code === code);
  };

  const getPHotoProfilePath = (error: any, response: any) => {
    setProfessor({ ...professor, photo: response.data.path.replace("fichier", "/uploadFile/file") });
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
          isOpen={openDeleteModal}
          handleCloseDeleteModal={handleCloseDeleteModal}
          deleteData={deleteProfessor}
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
            label: "Liste des Enseignants",
            path: "/professor/list",
            clickHandler: handleOpenConfirmModal,
          },
          {
            label: `${!isStorage ? "Création Enseignant" : "Fiche Enseignant"
              }`,
            path: "/professor/new-professor",
          },
        ]}
      />

      <form onSubmit={onSubmit}>
        <div className={classes.content}>
          <BodyTitle title="Enseignant" />
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
                      `${config.servers.apiUrl}${professor.photo?.replace(
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
                  <Grid item={true} xs={12} md={4}>
                    <Autocomplete
                      options={profRoles}
                      getOptionLabel={getOptionLabel}
                      value={role}
                      PaperComponent={PaperComponentAutoComplete}
                      onChange={onChangeAutoComplete}
                      renderInput={renderInputAutoComplete}
                    />
                  </Grid>
                  <Grid container={true} spacing={2}>
                    <Grid item={true} md={4}>
                      <TextField
                        label="Nom"
                        required={true}
                        name="lastName"
                        fullWidth={true}
                        value={professor.lastName || ""}
                        onChange={handleChange}
                      />
                    </Grid>

                    <Grid item={true} xs={12} md={4}>
                      <TextField
                        label="Prénom"
                        required={true}
                        name="firstName"
                        fullWidth={true}
                        value={professor.firstName || ""}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item={true} xs={12} md={4}>
                      <TextField
                        label="Ecole"
                        required={true}
                        disabled={true}
                        name="schoolName"
                        fullWidth={true}
                        value={userStore.user?.schoolName ||  professor.schoolName ||  ""}
                        onChange={handleChange}
                      />
                    </Grid>
                  </Grid>

                  <Grid container={true} spacing={2}>
                    <Grid item={true} xs={12} md={4}>
                      <TextField
                        label="IM"
                        required={true}
                        name="IM"
                        fullWidth={true}
                        value={professor.IM || ""}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item={true} xs={12} md={4}>
                      <TextField
                        label="Matière"
                        required={true}
                        name="matiere"
                        fullWidth={true}
                        value={professor.matiere || ""}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item={true} xs={12} md={4}>
                      <TextField
                        label="E-mail"
                        name="email"
                        value={professor.email || ""}
                        required={true}
                        type="email"
                        fullWidth={true}
                        onChange={handleChange}
                      />
                    </Grid>
                  </Grid>

                </Grid>
              </Grid>
            </div>
          </div>
        </div>
        <EditFooter icons={footerIcons} />
        <ErrorSnackbar
          open={openErrorSnackbar}
          handleClose={handleCloseErrors}
          errors={saveErrors}
          defaultTitle="Vérifiez le formulaire"
        />
      </form>
    </div>
  );
};

export default inject("professorStore", "userStore","classeStore")(observer(CreateProfessor));
