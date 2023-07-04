import getColumns from '../table.EmploiDuTemps';

const HeaderTableHorrorMorning = (y: number, jsPdfPrint: any, nextTable?: boolean, list?: any) => {
  jsPdfPrint.rect(5, y, 20, 60); // empty square_Horaire

  jsPdfPrint.rect(5, 50, 20, 10);// empty square_matiere
  jsPdfPrint.rect(25, 50, 43, 10);// empty square_Lundi
  jsPdfPrint.rect(68, 50, 43, 10);// empty square_Mardi
  jsPdfPrint.rect(111, 50, 43, 10);// empty square_Mercredi
  jsPdfPrint.rect(154, 50, 43, 10);// empty square_Jeudi
  jsPdfPrint.rect(197, 50, 43, 10);// empty square_Vendredi
  jsPdfPrint.rect(240, 50, 45, 10);// empty square_Samedi

  if (!nextTable) {
    jsPdfPrint.setFontSize(10);
    jsPdfPrint.setTextColor(0, 0, 0);
    jsPdfPrint.setFont('helvetica', 'bold');
    jsPdfPrint.text(6, y - 3, `Horaires`);
  }


  jsPdfPrint.rect(5, 70, 280, 10);// empty rect_Lign
  jsPdfPrint.rect(5, 80, 280, 10);// empty rect_Lign
  jsPdfPrint.rect(5, 90, 280, 10);// empty rect_Lign
  jsPdfPrint.rect(5, 100, 280, 10);// empty rect_Lign
  jsPdfPrint.rect(5, 110, 280, 10);// empty rect_Lign



  jsPdfPrint.rect(25, y, 43, 60); // empty square_Column

  if (list[0] === '6h-7h') {
    jsPdfPrint.setFontSize(9);
    jsPdfPrint.setFont('Helvetica', 'bold');
    jsPdfPrint.text(6, 65, `${list[0]}`);

  }

  jsPdfPrint.rect(68, y, 43, 60); // empty square_Column

  if (list[1] === '7h-8h') {
    jsPdfPrint.setFontSize(9);
    jsPdfPrint.setFont('Helvetica', 'bold');
    jsPdfPrint.text(6, 75, `${list[1]}`);

  }

  jsPdfPrint.rect(111, y, 43, 60);// empty square_Column

  if (list[2] === '8h-9h') {
    jsPdfPrint.setFontSize(9);
    jsPdfPrint.setFont('Helvetica', 'bold');
    jsPdfPrint.text(6, 85, `${list[2]}`);

  }

  jsPdfPrint.rect(154, y, 43, 60);// empty square_Column

  if (list[3] === '9h-10h') {
    jsPdfPrint.setFontSize(9);
    jsPdfPrint.setFont('Helvetica', 'bold');
    jsPdfPrint.text(6, 95, `${list[3]}`);


  }

  jsPdfPrint.rect(197, y, 43, 60);// empty square_Column

  if (list[4] === '10h-11h') {
    jsPdfPrint.setFontSize(9);
    jsPdfPrint.setFont('Helvetica', 'bold');
    jsPdfPrint.text(6, 105, `${list[4]}`);

  }

  jsPdfPrint.rect(240, y, 45, 60);// empty square_Column

  if (list[5] === '11h-12h') {
    jsPdfPrint.setFontSize(9);
    jsPdfPrint.setFont('Helvetica', 'bold');
    jsPdfPrint.text(6, 115, `${list[5]}`);
  }


};

export { HeaderTableHorrorMorning };
