import axios from 'axios';
import moment from 'moment';
import { FC, useRef, useState } from 'react';
import config from '../../config';
import downloadFile from '../../services/downloadServices';
import rootStore from '../../store/AppStore';
import Preview from './Preview';
import FormUpload from './FormUpload';
import useStyles from './style';
import ViewAfterUpload from './ViewAfterUpload';

interface UploadFileOtherProps {
  setData: (e: any, key: string) => void;
  document: any;
  category: string;
}

const axiosInstance = axios.create({
  baseURL: config.servers.apiUrl,
});

const UploadFileOther: FC<UploadFileOtherProps> = ({ setData, document, category }) => {
  const [responseApi, setResponseApi] = useState<any>(document?.Other ? document?.Other : {});
  const [name, setName] = useState<any>('');
  const endPoint = 'Message';
  const [progress, setProgress] = useState<any>(0);
  const hiddenFileInput = useRef<any>({});
  const [checked, setChecked] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [error_name, setError_name] = useState(false);
  const handleClick = () => {
    if (name !== '') {
      setError_name(false);
      hiddenFileInput.current.click();
    } else {
      setError_name(true);
    }
  };

  const getExtName = (FileName: string) => {
    const fileName = FileName.split('/');
    const size = fileName.length;
    return fileName[size - 1];
  };

  const onChange = (e: any) => {
    e.preventDefault(); // prevent the form from submitting

    setProgress(0);
    setChecked(!checked);

    if (e.target.files[0]) {
      const imageSizeKO = e.target.files[0].size / 2048;

      if (imageSizeKO > 4096) {
        setChecked(false);
        rootStore.updateSnackBar(true, 'La taille du fichier est trop grand');
        return;
      }

      const formData = new FormData();

      const getTypeFile: string = e.target.files[0].type;

      const extName = getExtName(e.target.files[0].name);

      const fileUploaded = new File([e.target.files[0]], `${category}-${name}.${extName}`, {
        type: getTypeFile,
      });

      formData.append('file', fileUploaded);

      axiosInstance
        .post(`${config.servers.apiUrl}uploadFile/upload/${endPoint}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: data => {
            setProgress(Math.round((100 * data.loaded) / data.total));
          },
        })
        .then((res: any) => {
          const response = {
            label: `Message : ${name}`,
            date: moment().format('DD-MM-YYYY'),
            path: res.data.path,
            filename: res.data.filename,
          };
          setData({ ...response }, 'Message');
          setResponseApi({ ...response });
          setChecked(false);
        })
        .catch((err: any) => {
          rootStore.updateSnackBar(true, "l'upload a échoué , veuillez réessayer");
          setChecked(false);
        });
    }
  };

  const download = (e: any) => {
    downloadFile(
      `${config.servers.apiUrl}uploadFile/file/download/${endPoint}/${responseApi?.filename}`
    );
  };

  const deleteFile = (e: any) => {
    e.preventDefault(); // prevent the form from submitting

    axiosInstance
      .post(`/uploadFile/delete`, { path: responseApi?.path })
      .then((res: any) => {
        const fileUpload = { ...document };
        delete fileUpload[endPoint];
        setData({ ...fileUpload }, 'deleted');

        setResponseApi({});
      })
      .catch((err: any) => {
        rootStore.updateSnackBar(true, 'une erreur est survenue , veuilliez réessayer plus tard');
      });
  };

  const classes = useStyles();

  const toggleModal = () => {
    setOpenModal(!openModal);
  };

  const handleChange = (e: any) => {
    setName(e.target.value);
  };


  return (
    <div className={classes.container}>
      <Preview
        handleClose={toggleModal}
        openModal={openModal}
        link={`${config.servers.apiUrl}uploadFile/file/${endPoint}/${responseApi?.filename}`}
        downloadLink={`${config.servers.apiUrl}uploadFile/file/download/${endPoint}/${responseApi?.filename}`}
      />

      {!responseApi?.filename && (
        <FormUpload
          name={name}
          handleChange={handleChange}
          error_name={error_name}
          handleClick={handleClick}
          onChange={onChange}
          hiddenFileInput={hiddenFileInput}
          category={category}
        />
      )}
         
      {responseApi?.filename && (
        <ViewAfterUpload
          checked={checked}
          progress={progress}
          responseApi={responseApi}
          download={download}
          toggleModal={toggleModal}
          deleteFile={deleteFile}
        />
      )}
    </div>
  );
};

export default UploadFileOther;
