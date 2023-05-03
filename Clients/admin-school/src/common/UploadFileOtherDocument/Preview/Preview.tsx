// @ts-ignore
import { Button, Dialog } from '@material-ui/core';
import DialogActions from '@material-ui/core/DialogActions';
import { CustomErrorComponent } from 'custom-error';
import { FC } from 'react';
import FileViewer from 'react-file-viewer';
import downloadFile from '../../../services/downloadServices';
import useStyles from './style';

interface SearchModalProps {
  handleClose: (e?: any) => void;
  openModal: boolean;
  link: string;
  downloadLink: string;
}

const ViewModal: FC<SearchModalProps> = ({ handleClose, openModal, link, downloadLink }) => {
  const classes = useStyles();

  const file = link;

  const getExtName = (url: string) => {
    const arrayUrl = url.split('.');
    const length1 = arrayUrl.length;
    return arrayUrl[length1 - 1];
  };

  const type = getExtName(link);

  const download = (e: any) => {
    downloadFile(downloadLink);
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={openModal}
      classes={{ paper: classes.paper }}
      fullWidth={true}>
      <DialogActions className={classes.menuTitle}>
        {/* <Button className={classes.btnSearch}>
          Télécharger
        </Button> */}
        <Button onClick={handleClose} className={classes.btnSearch}>
          Fermer
        </Button>
      </DialogActions>
      <FileViewer fileType={type} filePath={file} errorComponent={CustomErrorComponent} />
    </Dialog>
  );
};

export default ViewModal;
