import getColumns from '../table.EmploiDuTemps';

const HeaderTableEmploiDuTemps = (y: number, jsPdfPrint: any, nextTable?: boolean) => {
  jsPdfPrint.rect(25, y, 260, 10); // empty square

  jsPdfPrint.setFontSize(15);
  jsPdfPrint.setFont('Helvetica', 'bold');
  jsPdfPrint.text(100, 35, 'SAGESSE-DISCIPLINE-REUSSITE');

  if (!nextTable) {
    jsPdfPrint.setFontSize(15);
    jsPdfPrint.setTextColor(0, 0, 0);
    jsPdfPrint.setFont('helvetica');
    jsPdfPrint.text(120, y - 2, `EMPLOI DU TEMPS`);
  }

  const width = 260 / getColumns.length;
  let incrementWidth = 28;

  for (let i = 0; i < getColumns.length; i++) {
    jsPdfPrint.setFontSize(10);
    jsPdfPrint.setTextColor(0, 0, 0);
    jsPdfPrint.setFont('helvetica','bold');
    jsPdfPrint.text(incrementWidth, y + 6, getColumns[i].headerName);

    incrementWidth += width;
  }
};

export { HeaderTableEmploiDuTemps };
