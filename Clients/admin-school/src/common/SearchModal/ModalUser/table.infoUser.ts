import { GridColDef } from '@material-ui/data-grid';
import { usersRoles } from "../../utils/data";



export const getUserColumns = (
  classes: { [index: string]: string },
  screenSize: number
): GridColDef[] => {
  return [
  
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
      field: "username",
      headerName: "Nom d'utilisateur",
      width: Math.floor(screenSize / 5),
      headerClassName: classes.tableHeader,
    },
    {
      field: "email",
      headerName: "E-mail",
      width: Math.floor(screenSize / 5),
      headerClassName: classes.tableHeader,
    },
    {
      field: "role",
      headerName: "Rôle",
      width: Math.floor(screenSize / 5),
      headerClassName: classes.tableHeader,
      valueFormatter: (params) =>
        usersRoles.find((role) => role.code === params.row.role)?.label,
        
        
    },
  ];
};