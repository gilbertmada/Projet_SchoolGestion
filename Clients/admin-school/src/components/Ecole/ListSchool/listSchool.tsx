import { GridColDef } from "@material-ui/data-grid";
import { inject, observer } from "mobx-react";
import { FC, useEffect, useLayoutEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import photo from "../../../Assets/images/person.png";
import ListComponent from "../../../common/List";
import { usersRoles } from "../../../common/utils/data";
import config from "../../../config/index";
import { SchoolStoreInterface } from "../../../store/SchoolStore";
import { AbstractEmptyInterface } from "../../../types";
import useStyles from "./style";
import { toJS } from "mobx";

interface ListSchoolProps extends AbstractEmptyInterface {
  schoolStore: SchoolStoreInterface;
}

const ListSchool: FC<AbstractEmptyInterface> = (props: any) => {
  const classes = useStyles();
  const history = useHistory();
  const [screenSize, setScreenSize] = useState(1024);

  const { schoolStore } = props as ListSchoolProps;

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
      field: "schoolName",
      headerName: "Ecole",
      width: Math.floor(screenSize / 6),
      headerClassName: classes.tableHeader,
      valueFormatter: (params) => params.row?.user?.schoolName,
    },
    {
      field: "firstName",
      headerName: "Nom",
      width: Math.floor(screenSize / 6),
      headerClassName: classes.tableHeader,
      valueFormatter: (params) => params.row?.user?.firstName,
    },
    {
      field: "lastName",
      headerName: "Prénom",
      width: Math.floor(screenSize / 6),
      headerClassName: classes.tableHeader,
      valueFormatter: (params) => params.row?.user?.lastName,
    },
    {
      field: "username",
      headerName: "Nom d'utilisateur",
      width: Math.floor(screenSize / 6),
      headerClassName: classes.tableHeader,
      valueFormatter: (params) => params.row?.user?.username,
    },
    {
      field: "email",
      headerName: "E-mail",
      width: Math.floor(screenSize / 5),
      headerClassName: classes.tableHeader,
      valueFormatter: (params) => params.row?.user?.email,
    },
    {
      field: "role",
      headerName: "Rôle",
      width: Math.floor(screenSize / 6),
      headerClassName: classes.tableHeader,
      valueFormatter: (params) => params.row?.user?.nomRole,
        
        
    },
  ];
 
   
  useEffect(() => {
   
    schoolStore.getAllSchool();
   
  }, [schoolStore]);

  const searchFilter = (searchField: any) => {
    if (searchField !== "" ) {
      schoolStore.getFilteredSchool({ filter: searchField });
      
    }
    else {
      schoolStore.getAllSchool();
    }
  };
  console.log("schoolStore....", toJS(schoolStore.allSchool));
  const createNew = () => {
    schoolStore.setSelectedSchool(null);
    schoolStore.allSchool = [];
    history.push("/school/new-school");
  };

  const onRowSelected = (dataSelected: any) => {
    console.log("dataSelected....", dataSelected);
    
    schoolStore.setSelectedSchool(dataSelected);
    schoolStore.allSchool = [];
    history.push("/school/new-school");
  };

  const currentPaths = [
    { label: "Dashboard", path: "/" },
    // { label: "Ecole", path: "/school/list" },
    { label: "Liste des ecoles", path: "/school/list" },
  ];


  return (
    <ListComponent
      columns={columns}
      rows={schoolStore.allSchool}
      paths={currentPaths}
      clickSearchData={searchFilter}
      loading={schoolStore.isLoading}
      onRowClick={onRowSelected}
      createNewData={createNew}
    //   FilerComponent={UserFilter}
      withCreate={true}

    />
  );
};

export default inject("schoolStore")(observer(ListSchool));
