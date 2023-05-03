import makeStyles from '@material-ui/core/styles/makeStyles';

export default makeStyles({
  menu: {
    
    top: '46px !important',
    backgroundColor: '#1E2A43',
    '& .MuiButtonBase-root:hover': {
      backgroundColor: '#0AB1E1',
      color: '#fff',
    },
    width: '20%',
    height:'50%'
  },
compte:{
    display: 'flex',
    width: '90%',
    textAlign: 'center',
    marginLeft: '5%',
    '& .MuiTextField-root': {
      width: '100%',
    },
    '& svg': {
      marginTop: '15px',
      marginRight: '10px',
    },
},
deconnecte:{
  display: 'flex',
  width: '90%',
  textAlign: 'center',
  marginLeft: '5%',
  '& .MuiTextField-root': {
    width: '100%',
  },
  '& svg': {
    marginTop: '15px',
    marginRight: '10px',
  },
},
  coloredIcon: {
    color: '#0AB1E1',
    cursor: 'pointer',
    textAlign: 'center',
  },
});
