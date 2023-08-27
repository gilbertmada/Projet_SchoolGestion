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
import { ImportantDevices, SearchOutlined } from "@material-ui/icons";
import SaveListIcon from "@material-ui/icons/Save";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { inject, observer } from "mobx-react";
import { FC, useEffect, useState } from "react";
import AvatarUploader from "react-avatar-uploader";
import { useHistory } from "react-router-dom";
import photo from "../../../Assets/images/person.png";
import BodyTitle from "../../../common/BodyTitle";
import EditFooter from "../../../common/EditFooter";
import FormSelect from "../../../common/FormSelect/FormSelect";
import HeaderPath from "../../../common/HeaderPath";
import { FooterIcon } from "../../../common/interface";
import { ConfirmModal, ConfirmQuitModal, DeleteTotalModal } from "../../../common/Modal";
import { usersRoles } from "../../../common/utils/data";
import config from "../../../config/index";
import { SchoolStoreInterface } from "../../../store/SchoolStore";
import { AbstractEmptyInterface } from "../../../types";
import EditIcon from '@material-ui/icons/Edit';
import { toJS } from "mobx";
import SearchSchoolModal from "../../../common/SearchModal/ModalUser/SearchUserModal ";
import rootStore from '../../../store/AppStore';
import useStyles from "./style";

interface CreateSchoolProps extends AbstractEmptyInterface {
  schoolStore: SchoolStoreInterface;

}


const CreateSchool: FC<AbstractEmptyInterface> = (props: any) => {

  const { schoolStore } = props as CreateSchoolProps;

  const HideBtn = schoolStore.isFromBooking ? "block" : "none";
  const disableIt = !!schoolStore.ecole?.user;
  const classes = useStyles();
  const history = useHistory();
  const [isStorage, setIsStorage] = useState(false);
  const [ecole, setEcole] = useState<any>({});
  const [dataSchool, setDataSchool] = useState<any>({});
  const [user, setUser] = useState<any>({});
  const [openModal, setOpenModal] = useState(false);
  const [openQuitModal, setOpenQuitModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [isErrorText, setIsErrorText] = useState(false);
  const [enabled, setItEnabled] = useState(disableIt);
  const [pathRedirect, setPathRedirect] = useState("");
  const [modalStateSchool, setModalSchool] = useState(false);



  useEffect(() => {

    if (schoolStore.selectedSchool) {
      setIsStorage(true);
    } else {
      setIsStorage(false);
    }
  }, [schoolStore.selectedSchool]);


  useEffect(() => {
    schoolStore.getAllSchool();
  }, [schoolStore]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setDataSchool({ ...dataSchool, [name]: value });
    setEcole({ ...ecole, [name]: value });

  };

  const handleChangeSchool = (e: any) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    setEcole({ ...ecole, user });
    schoolStore.setUser({ ...user, [name]: value });

  };

  const toggleSchool = () => {
    setModalSchool(!modalStateSchool);
    schoolStore.setIsFromBooking(false);
  };

  const ChangeIt = () => {
    setItEnabled(!enabled)
  }

  const handleUpdateSchool = (dataUser: any) => {
    setUser({ ...user, ...dataUser });
    setEcole({ ...ecole, user: dataUser });

    schoolStore.setUser({ ...user, ...dataUser });
    schoolStore.setEcole({ ...ecole, user: dataUser });



  };


  const onSubmit = (e: any) => {
    e.preventDefault();

    if (!toJS(schoolStore.selectedSchool)) {

      props.schoolStore.createSchool(ecole).then((addUser: any) => {
        if (addUser) {
          history.push("/school/list");
          schoolStore.getAllSchool();
        }
      });
    } else {
      props.schoolStore.updateSchool(ecole).then((editSchool: any) => {
        if (editSchool) {
          history.push("/school/list");
          schoolStore.getAllSchool();
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


  const deleteTotalSchool = () => {

    if (schoolStore.selectedSchool) {
      props.schoolStore
        .deleteTotalSchool(schoolStore.selectedSchool)
        .then((editSchool: any) => {
          if (editSchool.status === 200) {
            setOpenDeleteModal(false);
            history.push("/school/list");
          }
        });
    } else {
      setOpenDeleteModal(false);
    }
  };

  const handleAddNew = () => {
    history.push("/school/new-school");
  };

  const footerIcons: FooterIcon[] = [
    {
      id: 0,
      ItemIcon: SaveListIcon,
      label: "Ajouter",
      type: "submit",
      title: schoolStore.selectedSchool ? "Sauvegarder  " : "Créer",
    },
    {
      id: 1,
      ItemIcon: ListIcon,
      label: "Liste",
      onClick: handleOpenConfirmModal("/school/list"),
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
        <SearchSchoolModal
          handleClose={toggleSchool}
          openModal={modalStateSchool}
          setSchool={handleUpdateSchool}
        />
        <DeleteTotalModal
          isOpen={openDeleteModal}
          handleCloseDeleteModal={handleCloseDeleteModal}
          deleteData={deleteTotalSchool}
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
            label: "Ecole",
            path: "/school/list",
            clickHandler: handleOpenConfirmModal,
          },
          {
            label: `${!isStorage ? "Création Ecole" : "Fiche Ecole"
              }`,
            path: "/school/new-school",
          },
        ]}
      />


      <form onSubmit={onSubmit}>
        {/* <div className={classes.itemClass}>
          <Grid item={true} md={4}>
            <TextField
              label="Nom d'ecole"
              required={true}
              name="schoolName"
              fullWidth={true}
              value={ecole?.schoolName || ""}
              onChange={handleChange}

            />
          </Grid>
        </div> */}

        <Grid item={true} sm={12} xs={12}>
          <div className={classes.title}>UTILISATEUR </div>
          <div className={classes.item}>
            <Grid container={true} direction="row" spacing={1}>
              <Grid item={true} sm={4} xs={12}>
                <TextField
                  label="Choix d'utilisateur"
                  name="username"
                  required={true}
                  value={
                    schoolStore.user?.username || ""
                  }
                  disabled={true}
                  InputProps={{
                    endAdornment: !schoolStore.isFromBooking ? (
                      <SearchOutlined onClick={toggleSchool} />
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
                  onChange={handleChangeSchool}
                  value={schoolStore.user?.lastName ||""}
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
                  onChange={handleChangeSchool}
                  value={schoolStore.user?.firstName || ""}
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
                  label="Nom d'ecole"
                  name="schoolName"
                  disabled={true}
                  required={true}
                  onChange={handleChangeSchool}
                  value={schoolStore.user?.schoolName || ""}
                  InputProps={{
                    classes: {
                      input: classes.resizeTextField,
                    },
                  }}
                />
              </Grid>
              <Grid item={true} sm={4} xs={12}>
                <TextField
                  label="E-mail"
                  name="email"
                  disabled={true}
                  required={true}
                  onChange={handleChangeSchool}
                  value={schoolStore.user?.email || ""}
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

        <EditFooter icons={footerIcons} />
      </form >
    </div >

  );
};

export default inject("schoolStore")(observer(CreateSchool));
