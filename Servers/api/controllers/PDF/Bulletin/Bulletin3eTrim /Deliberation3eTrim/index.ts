import moment from 'moment';

const Deliberation3eTrim = (y: number, list?: any, jsPdfPrint?: any) => {


  jsPdfPrint.setFontSize(10);
  jsPdfPrint.setTextColor(0, 0, 0);
  jsPdfPrint.setFont('helvetica', 'bold');
  jsPdfPrint.text(25, y, `Moyenne du 1ère Trimestre : ${list.generalMoyen1erTrim}/20`);

  jsPdfPrint.setFontSize(10);
  jsPdfPrint.setTextColor(0, 0, 0);
  jsPdfPrint.setFont('helvetica', 'bold');
  jsPdfPrint.text(25, y + 5, `Moyenne du 2e Trimestre : ${list.generalMoyen2eTrim}/20`);

  jsPdfPrint.setFontSize(10);
  jsPdfPrint.setTextColor(0, 0, 0);
  jsPdfPrint.setFont('helvetica', 'bold');
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
  jsPdfPrint.text(25, y + 35, `Félicitation `);


  jsPdfPrint.setFontSize(8);
  jsPdfPrint.setFont('Helvetica', 'bold');
  jsPdfPrint.text(25, y + 40, `Tableau d'honneur `);

  jsPdfPrint.setFontSize(8);
  jsPdfPrint.setFont('Helvetica', 'bold');
  jsPdfPrint.text(25, y + 45, `Encouragement `);

  jsPdfPrint.setFontSize(8);
  jsPdfPrint.setFont('Helvetica', 'bold');
  jsPdfPrint.text(25, y + 50, `Avertissement `);

  jsPdfPrint.setFontSize(8);
  jsPdfPrint.setFont('Helvetica', 'bold');
  jsPdfPrint.text(25, y + 55, `Blâme `);

  jsPdfPrint.setFontSize(8);
  jsPdfPrint.setFont('Helvetica', 'bold');
  jsPdfPrint.text(25, y + 60, `Admis en classe de : `);

  jsPdfPrint.setFontSize(8);
  jsPdfPrint.setFont('Helvetica', 'bold');
  jsPdfPrint.text(25, y + 65, `Redoublant en classe de : `);

  jsPdfPrint.setFontSize(8);
  jsPdfPrint.setFont('Helvetica', 'bold');
  jsPdfPrint.text(25, y + 70, `Remise à sa famille `);

  jsPdfPrint.setFontSize(8);
  jsPdfPrint.setFont('Helvetica', 'bold');
  jsPdfPrint.text(25, y + 75, `Non autoriser à tripler `);

  jsPdfPrint.setFontSize(9);
  jsPdfPrint.setFont('Helvetica', 'bold');
  jsPdfPrint.text(131, y + 75, `${list.stud.schoolName},  le ${moment().format("DD/MM/YYYY")} `);


  jsPdfPrint.setFontSize(10);
  jsPdfPrint.setFont('Helvetica', 'bold');
  jsPdfPrint.text(25, y + 90, `Signature des parents `);


  jsPdfPrint.setFontSize(10);
  jsPdfPrint.setFont('Helvetica', 'bold');
  jsPdfPrint.text(135, y + 90, `Le (ou la) ${list.roleUser} `);
};

export { Deliberation3eTrim };
