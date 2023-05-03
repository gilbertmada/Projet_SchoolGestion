import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Zoom from '@material-ui/core/Zoom';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import GetAppIcon from '@material-ui/icons/GetApp';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { FC } from 'react';
import BorderLinearProgress from '../BorderLinearProgress';
import useStyles from '../style';

interface ViewAfterUploadProps {
  checked: any;
  progress: any;
  responseApi: any;
  download: (e: any) => void;
  toggleModal: () => void;
  deleteFile: (a: any) => void;
}

const ViewAfterUpload: FC<ViewAfterUploadProps> = ({
  checked,
  progress,
  responseApi,
  download,
  toggleModal,
  deleteFile,
}) => {
  const classes = useStyles();

  return (
    <div>
      <Zoom in={checked}>
        <Box display="flex" alignItems="center">
          <Box width="100%" mr={1}>
            <BorderLinearProgress variant="determinate" value={progress} />
          </Box>
          <Box minWidth={35}>
            <Typography variant="body2" color="textSecondary">{`${progress}%`}</Typography>
          </Box>
        </Box>
      </Zoom>
      <Zoom in={!checked}>
        <Grid container={true} className={classes.containedGrid}>
          <Grid item={true} md={4} xs={12}>
            {responseApi?.label}
          </Grid>
          <Grid item={true} md={4} xs={12}>
            {responseApi?.date}
          </Grid>
          <Grid item={true} md={8} xs={12}>
            <Grid container={true} className={classes.containedIcon}>
              <Grid item={true} md={2}>
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.bgBlackbtn}
                  onClick={download}>
                  <GetAppIcon />
                </Button>
              </Grid>
              <Grid item={true} md={2}>
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.bgBlackbtn}
                  onClick={toggleModal}>
                  <VisibilityIcon />
                </Button>
              </Grid>
              <Grid item={true} md={2}>
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.bgBlackbtn}
                  onClick={deleteFile}>
                  <DeleteForeverIcon />
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Zoom>
    </div>
  );
};

export default ViewAfterUpload;
