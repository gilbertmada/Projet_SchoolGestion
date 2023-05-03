import Snackbar from '@material-ui/core/Snackbar';
import { FC } from 'react';
import Alert from '../Alert';
import useStyles from './style';

interface ErrorSnackbarProps {
  open: boolean;
  handleClose: (e?: any) => void;
  errors: string[];
  defaultTitle?: string;
}

const ErrorSnackbar: FC<ErrorSnackbarProps> = ({
  open,
  handleClose,
  errors,
  defaultTitle = 'Vérifiez le formulaire',
}) => {
  const classes = useStyles();
  return (
    <Snackbar
      classes={{ root: classes.root }}
      open={open}
      autoHideDuration={6000}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      onClose={handleClose}>
      <Alert onClose={handleClose} severity="info">
        {defaultTitle}
        <ul>
          {errors.map(error => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      </Alert>
    </Snackbar>
  );
};

export default ErrorSnackbar;
