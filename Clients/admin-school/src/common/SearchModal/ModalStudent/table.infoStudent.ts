import { GridColDef } from '@material-ui/data-grid';


export const getStudentColumns = (
  classes: { [index: string]: string },
  screenSize: number
): GridColDef[] => {
  return [
    
    {
      field: "schoolName",
      headerName: "Ecole",
      width: Math.floor(screenSize / 7),
      headerClassName: classes.tableHeader,
    },
    {
      field: "firstName",
      headerName: "Nom",
      width: Math.floor(screenSize / 7),
      headerClassName: classes.tableHeader,
    },
    {
      field: "lastName",
      headerName: "Prénom",
      width: Math.floor(screenSize / 5),
      headerClassName: classes.tableHeader,
    },
    {
      field: "class",
      headerName: "Nom de classe",
      width: Math.floor(screenSize / 5),
      headerClassName: classes.tableHeader,
    },
    {
      field: "matriculNumber",
      headerName: "Numéro matricule",
      width: Math.floor(screenSize / 5),
      headerClassName: classes.tableHeader,
    },
 
  ];
};