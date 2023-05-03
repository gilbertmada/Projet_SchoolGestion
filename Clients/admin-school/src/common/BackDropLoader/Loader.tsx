import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { FC } from 'react';
import useStyles from './style';

interface LoaderInterface {
  isLoading: boolean;
}

const Loader: FC<LoaderInterface> = props => {
  const { isLoading } = props as LoaderInterface;
  const classes = useStyles();

  return (
    <div>
      <Backdrop className={classes.backdrop} open={isLoading}>
        <CircularProgress color="inherit" />
        &nbsp;En attente de traitement...
      </Backdrop>
    </div>
  );
};

export default Loader;
