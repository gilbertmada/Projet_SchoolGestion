import getColumns from '../table.EmploiDuTemps';

const HeaderTableHorrorAfternoon = (y: number, jsPdfPrint: any, list?: any) => {
  jsPdfPrint.rect(5, y, 20, 60); // empty square


  jsPdfPrint.rect(5, 140, 280, 10);// empty rect_Lign
  jsPdfPrint.rect(5, 150, 280, 10);// empty rect_Lign
  jsPdfPrint.rect(5, 160, 280, 10);// empty rect_Lign
  jsPdfPrint.rect(5, 170, 280, 10);// empty rect_Lign
  jsPdfPrint.rect(5, 180, 280, 10);// empty rect_Lign

  if (list[6] === '12h-13h') {
    jsPdfPrint.setFontSize(9);
    jsPdfPrint.setFont('Helvetica', 'bold');
    jsPdfPrint.text(6, 135, `${list[6]}`);
    
  }

  jsPdfPrint.rect(25, y, 43, 60); 

  if (list[7] === '13h-14h') {
    jsPdfPrint.setFontSize(9);
    jsPdfPrint.setFont('Helvetica', 'bold');
    jsPdfPrint.text(6, 145, `${list[7]}`);
    
  }

  jsPdfPrint.rect(68, y, 43, 60); 

  if (list[8] === '14h-15h') {
    jsPdfPrint.setFontSize(9);
    jsPdfPrint.setFont('Helvetica', 'bold');
    jsPdfPrint.text(6, 155, `${list[8]}`);
   
  }

  jsPdfPrint.rect(111, y, 43, 60);

  if (list[9] === '15h-16h') {
    jsPdfPrint.setFontSize(9);
    jsPdfPrint.setFont('Helvetica', 'bold');
    jsPdfPrint.text(6, 165, `${list[9]}`);
   

  }

  jsPdfPrint.rect(154, y, 43, 60);

  if (list[10] === '16h-17h') {
    jsPdfPrint.setFontSize(9);
    jsPdfPrint.setFont('Helvetica', 'bold');
    jsPdfPrint.text(6, 175, `${list[10]}`);
    
  }

  jsPdfPrint.rect(197, y, 43, 60);

  if (list[11] === '17h-18h') {
    jsPdfPrint.setFontSize(9);
    jsPdfPrint.setFont('Helvetica', 'bold');
    jsPdfPrint.text(6, 185, `${list[11]}`);
  }
  jsPdfPrint.rect(240, y, 45, 60);

};

export { HeaderTableHorrorAfternoon };
