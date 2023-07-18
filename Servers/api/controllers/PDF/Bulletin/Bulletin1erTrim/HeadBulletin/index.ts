import { readFileSync } from 'fs';

interface IProps {
  schoolName: string;
  scolarYear: string;
  firstName: string;
  lastName: string;
  class: string;
  matriculNumber: string;

}

const Head = (data: IProps, jsPdfPrint: any) => {

  const imagePath = __dirname.replace('controllers/PDF/Bulletin/Bulletin1erTrim/HeadBulletin', 'assets/images');
  const logo = readFileSync(`${imagePath}/logo.png`);


  jsPdfPrint.addImage(logo, 'PNG', 14, 6, 50, 30);


  jsPdfPrint.setFontSize(18);
  jsPdfPrint.setFont('Helvetica', 'bold');
  jsPdfPrint.text(80, 15, `${data?.schoolName}`);

  jsPdfPrint.setFontSize(18);
  jsPdfPrint.setFont('Helvetica', 'normal');
  jsPdfPrint.text(70, 30, 'SAGESSE-DISCIPLINE-REUSSITE');

  jsPdfPrint.setFontSize(18);
  jsPdfPrint.setFont('Helvetica', 'bold');
  jsPdfPrint.text(80, 45, `BULLETIN DE NOTES`);



  jsPdfPrint.rect(85, 50, 50, 60);

  jsPdfPrint.setFontSize(18);
  jsPdfPrint.setFont('Helvetica', 'bold');
  jsPdfPrint.text(70, 140, `ANNEE SCOLAIRE : ${data?.scolarYear}`);

  jsPdfPrint.setFontSize(15);
  jsPdfPrint.setFont('Helvetica', 'bold');
  jsPdfPrint.text(12, 170, `Nom : `);

  jsPdfPrint.setFontSize(15);
  jsPdfPrint.setFont('Helvetica', 'normal');
  jsPdfPrint.text(61, 170, `...........................................................................................`);


  jsPdfPrint.setFontSize(15);
  jsPdfPrint.setFont('Helvetica', 'normal');
  jsPdfPrint.text(70, 169, `${data?.firstName}`);

  jsPdfPrint.setFontSize(15);
  jsPdfPrint.setFont('Helvetica', 'bold');
  jsPdfPrint.text(12, 180, `Prénom : `);

  jsPdfPrint.setFontSize(15);
  jsPdfPrint.setFont('Helvetica', 'normal');
  jsPdfPrint.text(61, 180, `...........................................................................................`);


  jsPdfPrint.setFontSize(15);
  jsPdfPrint.setFont('Helvetica', 'normal');
  jsPdfPrint.text(70, 179, `${data?.lastName}`);


  jsPdfPrint.setFontSize(15);
  jsPdfPrint.setFont('Helvetica', 'bold');
  jsPdfPrint.text(12, 190, `Classe :`);

  jsPdfPrint.setFontSize(15);
  jsPdfPrint.setFont('Helvetica', 'normal');
  jsPdfPrint.text(61, 190, `...........................................................................................`);


  jsPdfPrint.setFontSize(15);
  jsPdfPrint.setFont('Helvetica', 'normal');
  jsPdfPrint.text(70, 189, ` ${data?.class}`);


  jsPdfPrint.setFontSize(15);
  jsPdfPrint.setFont('Helvetica', 'bold');
  jsPdfPrint.text(12, 200, `Numéro matricule :`);

  jsPdfPrint.setFontSize(15);
  jsPdfPrint.setFont('Helvetica', 'normal');
  jsPdfPrint.text(61, 200, `...........................................................................................`);


  jsPdfPrint.setFontSize(15);
  jsPdfPrint.setFont('Helvetica', 'normal');
  jsPdfPrint.text(70, 199, ` ${data?.matriculNumber}`);


};

export default Head;
