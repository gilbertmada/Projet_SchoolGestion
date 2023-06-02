import { Button, Dialog, Grid, IconButton } from '@material-ui/core';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import { DataGrid, GridRowModel } from '@material-ui/data-grid';
import CloseIcon from '@material-ui/icons/Close';
import { withStyles } from '@material-ui/styles';
import { inject, observer } from "mobx-react";
import axios from 'axios';
import { FC, useEffect, useLayoutEffect, useState } from 'react';
import config from '../../../config';
import ListSearch from '../../List/ListSearch';
import { IUser } from '../../interface/userInterface';
import useStyles from '../style';
import { ProfessorStoreInterface } from "../../../store/ProfessorStore";
import { AbstractEmptyInterface } from "../../../types";
import { getUserColumns } from './table.infoUser';



const DialogContent = withStyles(() => ({
  root: {
    padding: '15px',
  },
}))(MuiDialogContent);

const SearchSchoolModal: FC<any> = ({ openModal, handleClose, setSchool }) => {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<IUser[] | []>([]);
  const [screenSize, setScreenSize] = useState(screen.width);


  useLayoutEffect(() => {
    setScreenSize(window.innerWidth - 75);
    window.addEventListener('resize', () => setScreenSize(window.innerWidth - 75));
    return () => window.removeEventListener('resize', () => setScreenSize(window.innerWidth - 75));
  }, []);

  const columns = getUserColumns(classes, screenSize);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${config.servers.apiUrl}user/`)
      .then(res => {
        setUser(res.data);
        // setCountDrivers(res.data.count);
      })
      .finally(() => {
        setIsLoading(false);
      });

  }, []);


  const getFiltereUser = async (keyword: string) => {
    if (keyword !== '') {

      setIsLoading(true);
      await axios
        .post(`${config.servers.apiUrl}user/filter`, { keyword })
        .then(res => {
          setUser(res.data);
        })
        .finally(() => {
          setIsLoading(false);
        });

    } else {
      setIsLoading(true);
      await axios
        .get(`${config.servers.apiUrl}user/`)
        .then(res => {
          setUser(res.data);
        })
        .finally(() => {
          setIsLoading(false);
        });


    }
  };

  const selectUser = (data: GridRowModel) => {
    setSchool(data);

    handleClose();
  };



  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={openModal}
      classes={{ paper: classes.paper }}
      fullWidth={true}>
      <MuiDialogTitle
        disableTypography={true}
        id="customized-dialog-title"
        className={classes.border}>
        <Grid container={true} spacing={2} alignItems="center" justify="space-between">
          <Grid item={true}>Rechercher</Grid>
          <Grid item={true}>
            <IconButton aria-label="close" onClick={handleClose}>
              <CloseIcon className={classes.closeButton} />
            </IconButton>
          </Grid>
        </Grid>
      </MuiDialogTitle>
      <DialogContent>
        <div>

          <div>
            <ListSearch search={getFiltereUser} withCreate={false} />
          </div>
          <div className={classes.tableStyle}>
            <DataGrid
              rows={user}
              columns={columns}
              pageSize={10}
              loading={isLoading}
              sortingOrder={['desc', 'asc']}
              disableColumnMenu={true}
              onRowClick={(res: any) => selectUser(res.row)}
              hideFooterSelectedRowCount={true}
              paginationMode="server"
            />
          </div>
          <Button
            size="small"
            className={classes.close}
            classes={{ label: classes.btnSearchLabel }}
            onClick={handleClose}>
            Fermer
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchSchoolModal;
// export default inject("professorStore")(observer(SearchProfessorModal));
