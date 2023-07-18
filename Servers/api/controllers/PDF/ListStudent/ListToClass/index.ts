import moment from 'moment';
import { HeaderTable } from '../header';
import getColumns from '../table.Column';

const value = (list: any, field: any) => {
  if (list[field]) {
    if (
      (field === 'firstName' ||
        field === 'lastName' ||
        field === 'matriculNumber' ||
        field === 'height' ||
        field === 'class' ||
        field === 'address') &&
      +list[field] !== undefined
    ) {
      return `${list[field]} `;
    }

    return list[field];
  }

  return '';
};

const ListToClass = (list: any[] | [], y: number, jsPdfPrint: any) => {
  const width = 200 / getColumns.length;

  let incrementWidth = 8;

  let incrementHeight = 68;

  // let nbrInterval = 8;
  let nbrInterval = 20;
  let pageCurrent = 1;

  const nbrPage = Math.ceil(list.length / 22.5);

  for (let a = 0; a < list.length; a++) {

    for (let i = 0; i < getColumns.length; i++) {
      jsPdfPrint.setFontSize(7);
      jsPdfPrint.setTextColor(0, 0, 0);
      jsPdfPrint.setFont('helvetica');

      jsPdfPrint.text(
        incrementWidth,
        incrementHeight,
        `${value(list[a], getColumns[i].field as any)}`
      );
      incrementWidth += width;
      jsPdfPrint.rect(5, incrementHeight-8, incrementWidth - 8, 10); // empty square
    }

    jsPdfPrint.rect(5, incrementHeight - 8, 200, 10); // empty square4

    incrementWidth = 8;
    // incrementHeight += 30;
    incrementHeight += 10;
 

    if (a === nbrInterval) {

      jsPdfPrint.addPage();
      HeaderTable(15, jsPdfPrint, true);
      incrementHeight = 33;
      nbrInterval += 25;
      pageCurrent++;
    }

    jsPdfPrint.text(190, 285, `Page ${pageCurrent}`);
  }

};

export { ListToClass };
