import { makeStyles } from '@material-ui/core/styles';

export const contentCommonStyle = {
  background: '#F3F3F3',
  padding: '5px 0px 5px 0px',
  borderRadius: '5px 5px 5px 5px',
  boxShadow: '2px 2px #DADADA',
};

const useStyles = makeStyles(theme => ({
  root: {
    height: 180,
  },
  containerC: {
    display: 'flex',
  },
  paper: {
    margin: theme.spacing(1),
  },
  accordion: {
    padding: 0,
    margin: 0,
    boxShadow: 'none',
  },

  svg: {
    width: 100,
    height: 100,
  },
  polygon: {
    fill: theme.palette.common.white,
    stroke: theme.palette.divider,
    strokeWidth: 1,
  },
  container: {
    width: '100%',
    margin: '0.5vh auto',
    padding: '2vh',
    border: '1px dashed #dadada',
  },
  gridBox: {
    ...contentCommonStyle,
    margin: '0',
    marginBottom: '10px',
    padding: '10px',
    boxShadow: 'none',
    border: '2px solid #dadada',
    background: 'white',
  },
  table: {
    minWidth: 650,
  },
  spacingCustomGrid: {
    marginTop: '1.5em',
  },
  menuTitle: {
    height: 'auto',
    fontSize: '1.5em',
    alignContent: 'center',
    margin: '-10px 0 0 -10px',
    paddingLeft: '10px',
    backgroundColor: '#0AB1E1',
    color: '#fff',
    width: 'calc(100% + 20px)',
  },
  containedGrid: {
    alignItems: "center",
    display: "flex",
    textAlign: "center",
    flexWrap: "nowrap",
   
  },
  containedIcon: {
    display: "flex",
    textAlign: "center",
    flexWrap: "nowrap",
  },
  bgBlackbtn: {
    color: '#ffffff',
    backgroundColor: '#000000',
    margin: '0 0.5 0 0',
  },
  none: {
    display: 'none',
  },
}));

export default useStyles;
