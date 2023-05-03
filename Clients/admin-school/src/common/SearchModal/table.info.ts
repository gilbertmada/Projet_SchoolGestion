import { GridColDef,GridValueGetterParams } from '@material-ui/data-grid';

export const getProfessorColumns = (
  classes: { [index: string]: string },
  screenSize: number
): GridColDef[] => {
  return [
  
    {
        field: "IM",
        headerName: "IM",
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
        width: Math.floor(screenSize / 7),
        headerClassName: classes.tableHeader,
      },

      {
        field: "matiere",
        headerName: "Matière",
        width: Math.floor(screenSize / 5),
        headerClassName: classes.tableHeader,
      },
      {
        field: "email",
        headerName: "E-mail",
        width: Math.floor(screenSize / 5),
        headerClassName: classes.tableHeader,
      },
  ];
};