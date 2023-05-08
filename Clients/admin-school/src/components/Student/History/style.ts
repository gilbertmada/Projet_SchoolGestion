import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles({
  title: {
    color: 'white',
    background: '#0AB1E1',
    padding: '10px 0px 10px 10px',
    fontWeight: 'bold',
    fontFamily: '"Roboto", sans-serif',
  },
  data: {
    background: 'white',
    padding: '5px',
    height: '32vh',
    border: '2px solid #C4C4C4',
    overflowY: 'scroll',
    width: '100%',
  },
  container: {
    margin: '2vh 0',
  },
  amount: {
    fontWeight: 'bold',
  },
});

export default useStyles;
