import moment from 'moment';

const Deliberation3eTrim = (y: number, list?: any, jsPdfPrint?: any) => {


  jsPdfPrint.setFontSize(10);
  jsPdfPrint.setTextColor(0, 0, 0);
  jsPdfPrint.setFont('helvetica', 'normal');
  jsPdfPrint.text(25, y, `Moyenne du 1ère Trimestre : ${list.generalMoyen1erTrim}/20`);

  jsPdfPrint.setFontSize(10);
  jsPdfPrint.setTextColor(0, 0, 0);
  jsPdfPrint.setFont('helvetica', 'normal');
  jsPdfPrint.text(25, y + 5, `Moyenne du 2e Trimestre : ${list.generalMoyen2eTrim}/20`);

  jsPdfPrint.setFontSize(10);
  jsPdfPrint.setTextColor(0, 0, 0);
  jsPdfPrint.setFont('helvetica', 'normal');
  jsPdfPrint.text(25, y + 10, `Moyenne du 3e Trimestre : ${list.generalMoyen3eTrim}/20`);

  jsPdfPrint.setFontSize(10);
  jsPdfPrint.setTextColor(0, 0, 0);
  jsPdfPrint.setFont('helvetica', 'bold');
  jsPdfPrint.text(25, y + 20, `Moyenne annulle : ${list.generalMoyenTrim}/20`);

  jsPdfPrint.setFontSize(10);
  jsPdfPrint.setFont('Helvetica', 'bold');
  jsPdfPrint.text(131, y + 20, `Rang ${list.rang} sur ${list.nbrStudentClass} élèves `);


  jsPdfPrint.setFontSize(12);
  jsPdfPrint.setFont('Helvetica', 'bold');
  jsPdfPrint.text(25, y + 30, `Décision du conseil de classe : `);

  jsPdfPrint.setFontSize(8);
  jsPdfPrint.setFont('Helvetica', 'bold');
  jsPdfPrint.text(25, y + 35, `Admis(e) en classe supérieur  `);


  jsPdfPrint.setFontSize(8);
  jsPdfPrint.setFont('Helvetica', 'bold');
  jsPdfPrint.text(25, y + 40, `Autorisé(e) à redoubler  `);

  jsPdfPrint.setFontSize(8);
  jsPdfPrint.setFont('Helvetica', 'bold');
  jsPdfPrint.text(25, y + 45, `Remise à sa famille `);


  jsPdfPrint.setFontSize(9);
  jsPdfPrint.setFont('Helvetica', 'bold');
  jsPdfPrint.text(131, y + 45, `${list.stud.schoolName},  le ${moment().format("DD/MM/YYYY")} `);


  jsPdfPrint.setFontSize(10);
  jsPdfPrint.setFont('Helvetica', 'bold');
  jsPdfPrint.text(25, y + 70, `Signature des parents `);


  jsPdfPrint.setFontSize(10);
  jsPdfPrint.setFont('Helvetica', 'bold');
  jsPdfPrint.text(135, y + 70, `Le (ou la) ${list.roleUser} `);


  if (list.generalMoyenTrim >= 10) {
    jsPdfPrint.setTextColor(0, 0, 0, 0);
    jsPdfPrint.line(25, y + 36, 64, y + 36);
  }


  if (10 > list.generalMoyenTrim && list.generalMoyenTrim >=5 ) {
    jsPdfPrint.setTextColor(0, 0, 0, 0);
    jsPdfPrint.line(25, y + 41, 56, y + 41);
  }

  if (5 > list.generalMoyenTrim) {
    jsPdfPrint.setTextColor(0, 0, 0, 0);
    jsPdfPrint.line(25, y + 46, 51, y + 46);
  }
};

export { Deliberation3eTrim };
