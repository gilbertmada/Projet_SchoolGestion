import moment from 'moment';

const Deliberation1erTrim = (y: number, list?: any, jsPdfPrint?: any) => {


  jsPdfPrint.setFontSize(10);
  jsPdfPrint.setTextColor(0, 0, 0);
  jsPdfPrint.setFont('helvetica', 'bold');
  jsPdfPrint.text(25, y, `Moyenne du 1ère Trimestre : ${list.generalMoyen1erTrim}/20`);


  jsPdfPrint.setFontSize(10);
  jsPdfPrint.setFont('Helvetica', 'bold');
  jsPdfPrint.text(131, y, `Rang ${list.rang0} sur ${list.nbrStudentClass} élèves `);


  jsPdfPrint.setFontSize(12);
  jsPdfPrint.setFont('Helvetica', 'bold');
  jsPdfPrint.text(25, y + 20, `Décision du conseil de classe : `);


  jsPdfPrint.setFontSize(8);
  jsPdfPrint.setFont('Helvetica', 'bold');
  jsPdfPrint.text(25, y + 25, `Félicitation `);



  jsPdfPrint.setFontSize(8);
  jsPdfPrint.setFont('Helvetica', 'bold');
  jsPdfPrint.text(25, y + 30, `Tableau d'honneur `);


  jsPdfPrint.setFontSize(8);
  jsPdfPrint.setFont('Helvetica', 'bold');
  jsPdfPrint.text(25, y + 35, `Encouragement `);


  jsPdfPrint.setFontSize(8);
  jsPdfPrint.setFont('Helvetica', 'bold');
  jsPdfPrint.text(25, y + 40, `Avertissement `);

  jsPdfPrint.setFontSize(8);
  jsPdfPrint.setFont('Helvetica', 'bold');
  jsPdfPrint.text(25, y + 45, `Blâme `);

  jsPdfPrint.setFontSize(9);
  jsPdfPrint.setFont('Helvetica', 'bold');
  jsPdfPrint.text(131, y + 45, `${list.stud.schoolName},  le ${moment().format("DD/MM/YYYY")} `);


  jsPdfPrint.setFontSize(10);
  jsPdfPrint.setFont('Helvetica', 'bold');
  jsPdfPrint.text(25, y + 55, `Signature des parents `);


  jsPdfPrint.setFontSize(10);
  jsPdfPrint.setFont('Helvetica', 'bold');
  jsPdfPrint.text(135, y + 55, `Le (ou la) ${list.roleUser} `);


  if (list.generalMoyen1erTrim >= 14) {
    jsPdfPrint.setTextColor(0, 0, 0, 0);
    jsPdfPrint.line(25, y + 26, 40, y + 26);
  }

  if (list.generalMoyen1erTrim >= 12 && 13 > list.generalMoyen1erTrim) {
    jsPdfPrint.setTextColor(0, 0, 0, 0);
    jsPdfPrint.line(25, y + 31, 50, y + 31);
  }

  if (list.generalMoyen1erTrim >= 10 && 12 > list.generalMoyen1erTrim) {
    jsPdfPrint.setTextColor(0, 0, 0, 0);
    jsPdfPrint.line(25, y + 36, 46, y + 36);
  }

  if (10 > list.generalMoyen1erTrim) {
    jsPdfPrint.setTextColor(0, 0, 0, 0);
    jsPdfPrint.line(25, y + 46, 34, y + 46);
  }

};

export { Deliberation1erTrim };
