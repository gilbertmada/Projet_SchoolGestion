import { readFileSync } from 'fs';

interface IProps {
  schoolName: string;
  class: string;
  height: string;

}

const Head = (data: IProps, jsPdfPrint: any) => {

  const imagePath = __dirname.replace('controllers/PDF/RecuEcolage/HeadRecuEcolage', 'assets/images');
  const logo = readFileSync(`${imagePath}/logo.png`);


  jsPdfPrint.addImage(logo, 'PNG', 14, 6, 50, 30);


  jsPdfPrint.setFontSize(14);
  jsPdfPrint.setFont('Helvetica', 'bold');
  jsPdfPrint.text(80, 17, `${data?.schoolName}`);

  jsPdfPrint.setFontSize(10);
  jsPdfPrint.setTextColor(100);
  jsPdfPrint.setFont('Helvetica', 'normal');
  jsPdfPrint.text(80, 22, `Niveau : ${data?.height}`);

  jsPdfPrint.setFontSize(10);
  jsPdfPrint.setFont('Helvetica', 'normal');
  jsPdfPrint.text(80, 26, `Classe : ${data?.class}`);


};

export default Head;
