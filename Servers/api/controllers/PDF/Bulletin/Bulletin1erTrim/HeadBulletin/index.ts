import { readFileSync } from 'fs';

interface IProps {
    schoolName: string;
    scolarYear:string;
    firstName:string;
    lastName:string;
    class: string;
    matriculNumber:string;

}

const Head = (data: IProps, jsPdfPrint: any) => {

//   const imagePath = __dirname.replace('controllers/PDF/EmploiDuTemps/HeadEmploiDuTemps','assets/images');
//   const logo = readFileSync(`${imagePath}/logo.png`);


//   jsPdfPrint.addImage(logo, 'PNG', 14, 6, 55, 24);


  jsPdfPrint.setFontSize(16);
  jsPdfPrint.setFont('Helvetica','bold');
  jsPdfPrint.text(70, 15, `${data?.schoolName}`);

  jsPdfPrint.setFontSize(15);
  jsPdfPrint.setFont('Helvetica','bold');
  jsPdfPrint.text(75, 30, `BULLETIN DE NOTES`);

  jsPdfPrint.setFontSize(15);
  jsPdfPrint.setFont('Helvetica','bold');
  jsPdfPrint.text(65, 100, `ANNEE SCOLAIRE : ${data?.scolarYear}`);

  jsPdfPrint.setFontSize(12);
  jsPdfPrint.setFont('Helvetica','normal');
  jsPdfPrint.text(12, 110, `Nom : ${data?.firstName}`);

  jsPdfPrint.setFontSize(12);
  jsPdfPrint.setFont('Helvetica','normal');
  jsPdfPrint.text(12, 115, `Prénom: ${data?.lastName}`);

  jsPdfPrint.setFontSize(12);
  jsPdfPrint.setFont('Helvetica','normal');
  jsPdfPrint.text(12, 120, `Classe : ${data?.class}`);

  jsPdfPrint.setFontSize(12);
  jsPdfPrint.setFont('Helvetica','normal');
  jsPdfPrint.text(12, 125, `Numéro matricule : ${data?.matriculNumber}`);


 
};

export default Head;
