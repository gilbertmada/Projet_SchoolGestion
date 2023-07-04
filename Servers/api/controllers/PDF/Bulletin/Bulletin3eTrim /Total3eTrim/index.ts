

const Total3eTrim = (list?: any, jsPdfPrint?: any) => {

  jsPdfPrint.rect(5, 91, 200, 8);// empty rect_Lign

  jsPdfPrint.setFontSize(10);
  jsPdfPrint.setTextColor(0, 0, 0);
  jsPdfPrint.setFont('helvetica', 'bold');
  jsPdfPrint.text(6, 105, `TOTAL`);


  jsPdfPrint.setFontSize(8);
  jsPdfPrint.setFont('Helvetica', 'bold');
  jsPdfPrint.text(99, 105, `${list.totalCoefJ0}`);


  jsPdfPrint.setFontSize(8);
  jsPdfPrint.setFont('Helvetica', 'bold');
  jsPdfPrint.text(131, 105, `${list.total3eTrim}`);


};

export { Total3eTrim };
