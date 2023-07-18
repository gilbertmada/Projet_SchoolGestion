import getColumns from '../table.Column';

const HeaderTable = (y: number, jsPdfPrint: any, nextTable?: boolean) => {
  jsPdfPrint.rect(5, y, 200, 10); // empty square

  jsPdfPrint.setFontSize(15);
  jsPdfPrint.setFont('Helvetica', 'bold');
  jsPdfPrint.text(60, 35, 'SAGESSE-DISCIPLINE-REUSSITE');

  if (!nextTable) {
    jsPdfPrint.setFontSize(15);
    jsPdfPrint.setTextColor(0, 0, 0);
    jsPdfPrint.setFont('helvetica');
    jsPdfPrint.text(80, y - 2, `LISTES DES ELEVES`);
  }

  const width = 200 / getColumns.length;
  console.log("width...", width);

  let incrementWidth = 8;

  for (let i = 0; i < getColumns.length; i++) {
    jsPdfPrint.setFontSize(9);
    jsPdfPrint.setTextColor(0, 0, 0);
    jsPdfPrint.setFont('helvetica', 'bold');
    jsPdfPrint.text(incrementWidth, y + 6, getColumns[i].headerName);

    incrementWidth += width;
    jsPdfPrint.rect(5, y, incrementWidth - 8, 10); // empty square
  }
};

export { HeaderTable };
