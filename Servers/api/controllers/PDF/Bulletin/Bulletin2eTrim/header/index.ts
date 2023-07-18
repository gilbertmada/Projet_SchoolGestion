import getColumns from '../../table.Bulletin';

const Header1 = (y: number, jsPdfPrint: any) => {

  jsPdfPrint.addPage('a4', 'p');

  jsPdfPrint.rect(30, y, 175, 10); // empty square
  jsPdfPrint.setFontSize(16);
  jsPdfPrint.setTextColor(0, 0, 0);
  jsPdfPrint.setFont('Helvetica', 'bold');
  jsPdfPrint.text(75, y - 2, `2e TRIMESTRE`);




  const width = 160 / getColumns.length;
  let incrementWidth = 32;


  for (let i = 0; i < getColumns.length; i++) {
    jsPdfPrint.setFontSize(10);
    jsPdfPrint.setTextColor(0, 0, 0);
    jsPdfPrint.setFont('helvetica', 'bold');
    jsPdfPrint.text(incrementWidth, y + 6, getColumns[i].headerName);

    incrementWidth += width;
  }
};

export { Header1 };
