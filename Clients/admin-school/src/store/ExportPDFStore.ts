import axios from 'axios';
import config from '../config';
import downloadFile from '../services/downloadServices';
import { rootStore } from '.';
import { log } from 'console';

export interface ExportPdfInterface {
  exportToPdfListStudent: (data: any) => void;
  exportToPdfRecuDroit: (data: any) => void;
  exportToPdfRecuEcolage: (data: any) => void;
  exportToPdfRecuFraisDivers: (data: any) => void;
  exportPdfEmploiDuTemps: (data: any) => void;
}

class ExportToPDFStore implements ExportPdfInterface {

  exportToPdfListStudent = async (data: any) => {
    try {
      const resp = await axios.post(`${config.servers.apiUrl}exportToPdf/list`, data);

      if (resp) {
        downloadFile(
          `${config.servers.apiUrl}uploadFile/file/download/PDFFiles/${resp.data.filename}`
        );
        
      }
    } catch (error: any) {
      if (error.message.includes('code 400')) {
        return;
      }
      rootStore.updateSnackBar(true, "Une erreur s'est produite. Veuillez réessayer plus tard!");
    }
  };

  exportToPdfRecuDroit = async (data: any) => {

    try {
      const resp = await axios.post(`${config.servers.apiUrl}exportToPdf/recuDroit`, data);
 
      if (resp) {
        downloadFile(
          `${config.servers.apiUrl}uploadFile/file/download/PDFFiles/${resp.data.filename}`
        );
        
      }
    } catch (error: any) {
      if (error.message.includes('code 400')) {
        return;
      }
      rootStore.updateSnackBar(true, "Une erreur s'est produite. Veuillez réessayer plus tard!");
    }
  };

  exportToPdfRecuEcolage = async (data: any) => {

    try {
      const resp = await axios.post(`${config.servers.apiUrl}exportToPdf/recuEcolage`, data);

      if (resp) {
        downloadFile(
          `${config.servers.apiUrl}uploadFile/file/download/PDFFiles/${resp.data.filename}`
        );
        
      }
    } catch (error: any) {
      if (error.message.includes('code 400')) {
        return;
      }
      rootStore.updateSnackBar(true, "Une erreur s'est produite. Veuillez réessayer plus tard!");
    }
  };
  
  exportToPdfRecuFraisDivers = async (data: any) => {
    try {
      const resp = await axios.post(`${config.servers.apiUrl}exportToPdf/recuFraisDivers`, data);

      if (resp) {
        downloadFile(
          `${config.servers.apiUrl}uploadFile/file/download/PDFFiles/${resp.data.filename}`
        );
        
      }
    } catch (error: any) {
      if (error.message.includes('code 400')) {
        return;
      }
      rootStore.updateSnackBar(true, "Une erreur s'est produite. Veuillez réessayer plus tard!");
    }
  };

  exportPdfEmploiDuTemps = async (data: any) => {
    try {
      console.log('emploi du temps.....',data);
      
      const resp = await axios.post(`${config.servers.apiUrl}exportToPdf/emploiDuTemps`, data);
      console.log('emploi du tempsretour.....',resp);
      if (resp) {
        downloadFile(
          `${config.servers.apiUrl}uploadFile/file/download/PDFFiles/${resp.data.filename}`
        );
        
      }
    } catch (error: any) {
      if (error.message.includes('code 400')) {
        return;
      }
      rootStore.updateSnackBar(true, "Une erreur s'est produite. Veuillez réessayer plus tard!");
    }
  };
}

export default new ExportToPDFStore()