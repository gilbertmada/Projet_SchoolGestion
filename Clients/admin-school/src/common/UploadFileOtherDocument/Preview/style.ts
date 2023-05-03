import makeStyles from '@material-ui/core/styles/makeStyles';

const forBtn = {
  background: '#0AB1E1',
  color: 'white',
  height: '28px',
  fontWeight: 0,
  '&:hover': {
    backgroundColor: '#0AB1E1',
  },
};

const useStyles = makeStyles({
  closeButton: {
    color: '#977F7F',
    fontSize: '20px',
  },
  paper: {
    background: 'white',
    height: '90vh',
    overflowX: 'hidden',
    width: '100%',
    '&.MuiDialog-paperWidthSm': {
      maxWidth: '90%',
    },
  },
  border: {
    borderBottom: '0.5px solid #977F7F',
    padding: '0px 0px 0px 10px',
  },
  textFieldStyle: {
    width: 200,
  },
  btnSearch: {
    ...forBtn,
  },
  btnSearchLabel: {
    textTransform: 'capitalize',
    fontSize: '13px',
  },
  tableStyle: {
    height: '60vh',
  },
  close: {
    ...forBtn,
    margin: '25px 25px 0px 0px',
    position: 'absolute',
    right: 0,
  },
  tableHeader: {
    background: '#0AB1E1',
    color: 'white',
    alignContent: 'center',
  },
  bgWhiteM: {
    background: 'white',
  },
  tableRow: {
    '& .MuiDataGrid-colCell': {
      border: '0.5px solid #DADADA',
      '& .MuiDataGrid-columnSeparator': {
        display: 'none',
      },
    },
    '& .MuiDataGrid-cell': {
      border: '0.5px solid #DADADA',
    },
    '& .MuiDataGrid-row:hover': {
      backgroundColor: '#C5E7F0 !important',
      cursor: 'pointer',
    },
  },
  menuTitle: {
    height: 'auto',
    fontSize: '1.5em',
    alignContent: 'center',
    margin: '0',
    padding: '2vh 4vh',
    backgroundColor: '#dadada',
    color: '#222',
    width: 'calc(100% + 20px)',
  },
});

export default useStyles;
