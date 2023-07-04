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


  jsPdfPrint.setFontSize(18);
  jsPdfPrint.setFont('Helvetica','bold');
  jsPdfPrint.text(70, 15, `${data?.schoolName}`);

  jsPdfPrint.setFontSize(18);
  jsPdfPrint.setFont('Helvetica','bold');
  jsPdfPrint.text(75, 40, `BULLETIN DE NOTES`);

  jsPdfPrint.rect(76, 45,50, 60);

  jsPdfPrint.setFontSize(18);
  jsPdfPrint.setFont('Helvetica','bold');
  jsPdfPrint.text(65, 140, `ANNEE SCOLAIRE : ${data?.scolarYear}`);

  jsPdfPrint.setFontSize(15);
  jsPdfPrint.setFont('Helvetica','normal');
  jsPdfPrint.text(12, 170, `Nom : ${data?.firstName}`);

  jsPdfPrint.setFontSize(15);
  jsPdfPrint.setFont('Helvetica','normal');
  jsPdfPrint.text(12, 175, `Prénom: ${data?.lastName}`);

  jsPdfPrint.setFontSize(15);
  jsPdfPrint.setFont('Helvetica','normal');
  jsPdfPrint.text(12, 180, `Classe : ${data?.class}`);

  jsPdfPrint.setFontSize(15);
  jsPdfPrint.setFont('Helvetica','normal');
  jsPdfPrint.text(12, 185, `Numéro matricule : ${data?.matriculNumber}`);


 
};

export default Head;
