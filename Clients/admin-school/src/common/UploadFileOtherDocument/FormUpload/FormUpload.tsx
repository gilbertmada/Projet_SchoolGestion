import { TextField } from '@material-ui/core';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import BackupIcon from '@material-ui/icons/Backup';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { FC } from 'react';
import useStyles from '../style';

interface UploadFileOtherProps {
  handleChange: (e: any) => void;
  handleClick: (e: any) => void;
  error_name: any;
  name: any;
  onChange: any;
  hiddenFileInput: any;
  category: string;
}

const UploadFileOther: FC<UploadFileOtherProps> = ({
  name,
  handleChange,
  error_name,
  handleClick,
  onChange,
  hiddenFileInput,
  category,
}) => {
  const classes = useStyles();
  return (
    <div>
      <Typography>Ajouter un document</Typography>
      <Grid container={true}>
        <Grid item={true} md={10} xs={12}>
          <TextField
            label="Nom du document"
            value={name || ''}
            required={true}
            onChange={handleChange}
            error={error_name}
          />
        </Grid>

        <Grid item={true} md={2} xs={12}>
          <div>
            <Button
              variant="contained"
              color="secondary"
              className={classes.bgBlackbtn}
              onClick={handleClick}>
              <BackupIcon />
            </Button>
            <input
              type="file"
              name="fileUpload"
              onChange={onChange}
              ref={hiddenFileInput}
              className={classes.none}
              required={true}
            />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default UploadFileOther;
