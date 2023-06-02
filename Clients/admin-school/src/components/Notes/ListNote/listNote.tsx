import { GridColDef, GridRow } from "@material-ui/data-grid";
import AddIcon from "@material-ui/icons/Add";
import PictureAsPdfIcon from "@material-ui/icons/PictureAsPdf";
import { FooterIcon } from "../../../common/interface";
import EditFooter from "../../../common/EditFooter";
import { inject, observer } from "mobx-react";
import { FC, useEffect, useLayoutEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import photo from "../../../Assets/images/person.png";
import ListComponent from "../../../common/List";
import { usersRoles } from "../../../common/utils/data";
import Button from "@material-ui/core/Button";
import exportPDFStore from "../../../store/ExportPDFStore";
import rootStore from '../../../store/AppStore';
import config from "../../../config/index";
import { toJS } from "mobx";
import { NoteStoreInterface } from "../../../store/NoteStore";
import { ProfessorStoreInterface } from "../../../store/ProfessorStore";
import { AbstractEmptyInterface } from "../../../types";
import useStyles from "./style";


interface ListNoteProps extends AbstractEmptyInterface {
  noteStore: NoteStoreInterface;

}

const ListNote: FC<AbstractEmptyInterface> = (props: any) => {

  const { noteStore } = props as ListNoteProps;

  const classes = useStyles();
  const history = useHistory();
  const [screenSize, setScreenSize] = useState(1024);
  const [isArchive, setIsArchive] = useState(false);



  useLayoutEffect(() => {
    setScreenSize(window.innerWidth - 75);
    window.addEventListener("resize", () =>
      setScreenSize(window.innerWidth - 75)
    );
    return () =>
      window.removeEventListener("resize", () =>
        setScreenSize(window.innerWidth - 75)
      );
  }, []);

  const columns: GridColDef[] = [


    {
      field: "lastName",
      headerName: "Prénom de l'enseignant",
      width: Math.floor(screenSize / 7),
      headerClassName: classes.tableHeader,
      valueFormatter: (params) => params.row?.stud?.lastName,
    },
    {
      field: "class",
      headerName: "Nom de la classe",
      width: Math.floor(screenSize / 7),
      headerClassName: classes.tableHeader,
      valueFormatter: (params) => params.row?.stud?.class,

    },
    {
      field: "matriculNumber",
      headerName: "Numéro matricule",
      width: Math.floor(screenSize / 7),
      headerClassName: classes.tableHeader,
      valueFormatter: (params) => params.row?.stud?.matriculNumber,
    },

    {
      field: "total1erTrim",
      headerName: "Totale Note  1er_trim",
      width: Math.floor(screenSize / 8),
      headerClassName: classes.tableHeader,
      valueFormatter: (params) => params.row.total1erTrim,
    },
    {
      field: "generalMoyen1erTrim",
      headerName: "Moyenne génerale 1er_trim",
      width: Math.floor(screenSize / 7),
      headerClassName: classes.tableHeader,
      valueFormatter: (params) => params.row.generalMoyen1erTrim,
    },
    {
      field: "total2erTrim",
      headerName: "Totale Note  2e_trim",
      width: Math.floor(screenSize / 8),
      headerClassName: classes.tableHeader,
      // valueFormatter: (params) => params.row?.prof?.matiere,
    },
    {
      field: "generalMoyen2eTrim",
      headerName: "Moyenne génerale 2e_trim",
      width: Math.floor(screenSize / 7),
      headerClassName: classes.tableHeader,
    },
    {
      field: "total3eTrim",
      headerName: "Totale Note  3e_trim",
      width: Math.floor(screenSize / 8),
      headerClassName: classes.tableHeader,
      // valueFormatter: (params) => params.row?.prof?.matiere,
    },


    {
      field: "generalMoyen3eTrim",
      headerName: "Moyenne génerale 3e_trim",
      width: Math.floor(screenSize / 7),
      headerClassName: classes.tableHeader,
    },
  ];

  useEffect(() => {
    noteStore.getAllNotes();

  }, [noteStore]);

  const listNotes = toJS(noteStore.allNote);


  const searchFilter = (searchField: any) => {
    if (searchField !== "") {
      
      for (let i = 0; i < listNotes.length; i++) {
        if (searchField === listNotes[i].stud?.lastName
          || searchField === listNotes[i].stud?.class
          || listNotes[i].stud?.matriculNumber) {
          noteStore.getFilteredNote({ filter: searchField });
        }
      }

    } else {
      noteStore.getAllNotes();
    }


  };


  const createNew = () => {
    noteStore.setSelectedNote(null);
    noteStore.allNote = [];
    history.push("/note/new-note");
  };


  const onRowSelected = (dataSelected: any) => {

    noteStore.setSelectedNote(dataSelected);
    noteStore.allNote = [];
    history.push("/note/new-note");
  };

  const currentPaths = [
    { label: "Dashboard", path: "/" },
    // { label: "Classes", path: "/class/list" },
    { label: "Liste des Notes", path: "/note/list" },
  ];

  const handleDownload = () => {
    // if (isArchive === false) {
    //   rootStore.updateSnackBar(true, 'Vous devez saisir le nom de classe');
    // } else {
    //   const listFilters = toJS(noteStore.allNote);
    //   exportPDFStore.exportPdfEmploiDuTemps(listFilters);
    // }


  }
  // const footerIcons: FooterIcon[] = [

  //   {
  //     id: 0,
  //     ItemIcon: PictureAsPdfIcon,
  //     onClick: handleDownload,
  //     title: "Exporter en PDF l'emploi du temps",
  //   },


  // ];

  return (
    <div>
      <ListComponent
        columns={columns}
        rows={listNotes}
        paths={currentPaths}
        clickSearchData={searchFilter}
        loading={noteStore.isLoading}
        onRowClick={onRowSelected}
        createNewData={createNew}
        // FilerComponent={UserFilter}
        withCreate={true}

      />
      {/* <EditFooter icons={footerIcons} /> */}
    </div>

  );
};

export default inject("noteStore")(observer(ListNote));
