

const HeaderTableMatiere= (y: number,list?: any, jsPdfPrint?: any) => {
  jsPdfPrint.rect(5, y, 25,82); // empty square_Head

  jsPdfPrint.rect(5, 17, 25, 10);// empty square_matiere
  jsPdfPrint.rect(30, 17, 32, 10);// empty square_NJ
  jsPdfPrint.rect(62, 17, 32, 10);// empty square_NC
  jsPdfPrint.rect(94, 17, 32, 10);// empty square_Coef
  jsPdfPrint.rect(126, 17, 32, 10);// empty square_NoteDef
  jsPdfPrint.rect(158, 17, 47, 10);// empty square_Signature


  jsPdfPrint.rect(5, 35, 200, 8);// empty rect_Lign
  jsPdfPrint.rect(5, 43, 200, 8);// empty rect_Lign
  jsPdfPrint.rect(5, 51, 200, 8);// empty rect_Lign
  jsPdfPrint.rect(5, 59, 200, 8);// empty rect_Lign
  jsPdfPrint.rect(5, 67, 200, 8);// empty rect_Lign
  jsPdfPrint.rect(5, 75, 200, 8);// empty rect_Lign
  jsPdfPrint.rect(5, 83, 200, 8);// empty rect_Lign
  jsPdfPrint.rect(5, 91, 200, 8);// empty rect_Lign

    jsPdfPrint.setFontSize(10);
    jsPdfPrint.setTextColor(0, 0, 0);
    jsPdfPrint.setFont('helvetica','bold');
    jsPdfPrint.text(6, y - 4, `MATIERES`);



  jsPdfPrint.rect(30, y, 32, 82); // empty rect column

  if (list[0].label === 'MATHEMATIQUES') {
    jsPdfPrint.setFontSize(7);
    jsPdfPrint.setFont('Helvetica', 'bold');
    jsPdfPrint.text(6, 33, `${list[0].label}`);
   
  }

  jsPdfPrint.rect(62, y, 32, 82); // empty rect column

  if (list[1].label === 'PHYSIQUE_CHIMIE') {
    jsPdfPrint.setFontSize(7);
    jsPdfPrint.setFont('Helvetica', 'bold');
    jsPdfPrint.text(6, 41, `${list[1].label}`);
   
  }

  jsPdfPrint.rect(94, y, 32, 82);// empty rect column

  if (list[2].label === 'ANGLAIS') {
    jsPdfPrint.setFontSize(7);
    jsPdfPrint.setFont('Helvetica', 'bold');
    jsPdfPrint.text(6, 49, `${list[2].label}`);
   
  }

  jsPdfPrint.rect(126, y, 32, 82);// empty rect column

  if (list[3].label === 'MALAGASY') {
    jsPdfPrint.setFontSize(7);
    jsPdfPrint.setFont('Helvetica', 'bold');
    jsPdfPrint.text(6, 57, `${list[3].label}`);
   
  }

  jsPdfPrint.rect(158, y,47, 82);// empty rect column

  if (list[4].label === 'FRANÇAIS') {
    jsPdfPrint.setFontSize(7);
    jsPdfPrint.setFont('Helvetica', 'bold');
    jsPdfPrint.text(6, 65, `${list[4].label}`);
   
  }

  
  if (list[5].label === 'PHILOSOPHIE') {
    jsPdfPrint.setFontSize(7);
    jsPdfPrint.setFont('Helvetica', 'bold');
    jsPdfPrint.text(6, 73, `${list[5].label}`);
  }


  if (list[6].label === 'HISTO_GEO') {
    jsPdfPrint.setFontSize(7);
    jsPdfPrint.setFont('Helvetica', 'bold');
    jsPdfPrint.text(6,81, `${list[6].label}`);
  }

  if (list[7].label === 'SVT') {
    jsPdfPrint.setFontSize(7);
    jsPdfPrint.setFont('Helvetica', 'bold');
    jsPdfPrint.text(6, 89, `${list[7].label}`);
  }



  if (list[8].label === 'EPS') {
    jsPdfPrint.setFontSize(7);
    jsPdfPrint.setFont('Helvetica', 'bold');
    jsPdfPrint.text(6, 97, `${list[8].label}`);
  }

};

export { HeaderTableMatiere };
