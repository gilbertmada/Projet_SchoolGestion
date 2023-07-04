
import getColumns from '../../table.Bulletin';

const value = (list: any, field: any) => {

    if (list) {

        if (field === 'arrayDeNoteJ') {
            if (list.valueNote === undefined || list.valueNote === null) {
                return "0";
            } else {
                return `${list.valueNote}`;
            }
        }


        if (field === 'arrayDeNoteCompo') {
            if (list.valueNote === undefined || list.valueNote === null) {
                return "0";
            } else {
                return `${list.valueNote}`;
            }
        }

        if (field === 'arrayDeCoefJ') {
            if (list.valueCoef === undefined || list.valueCoef === null) {
                return "0";
            } else {
                return `${list.valueCoef}`;
            }
        }

        if (field === 'arrayListNoteDef') {
            if (list.value === undefined || list.value === null) {
                return "0";
            } else {
                return `${list.value}`;
            }
        }

    }

    return '';
};

const valueX = (list1: any) => {

    let x = 0;

    if (list1.label === "MATHEMATIQUES") {
        x += 33;
    } else if (list1.label === "PHYSIQUE_CHIMIE") {
        x = 41;
    } else if (list1.label === "ANGLAIS") {
        x = 49;
    }
    else if (list1.label === "MALAGASY") {
        x = 57;
    } else if (list1.label === "FRANÇAIS") {
        x = 65;
    } else if (list1.label === "PHILOSOPHIE") {
        x = 73;
    } else if (list1.label === "HISTO_GEO") {
        x = 81;
    } else if (list1.label === "SVT") {
        x = 89;
    } else if (list1.label === "EPS") {
        x = 97;
    }


    return x;
}



const Table1erTrim = (list0: any[] | [], list1: any[] | [], list2: any[] | [], list3: any[] | [], jsPdfPrint: any) => {


    const incrementWidth_NJ = 33;
    const incrementWidth_NC = 65;
    const incrementWidth_Coef = 99;
    const incrementWidth_ArrayNoteDef = 131;

    for (let a = 0; a < list0.length; a++) {

        jsPdfPrint.setFontSize(9);
        jsPdfPrint.setTextColor(0, 0, 0);
        jsPdfPrint.getFontList('normal');
        jsPdfPrint.text(
            +incrementWidth_NJ,
            +valueX(list0[a]),
            `${value(list0[a], getColumns[0].field as any)}`
        );

    }

    for (let b = 0; b < list1.length; b++) {

        jsPdfPrint.setFontSize(9);
        jsPdfPrint.setTextColor(0, 0, 0);
        jsPdfPrint.getFontList('normal');
        jsPdfPrint.text(
            +incrementWidth_NC,
            +valueX(list1[b]),
            `${value(list1[b], getColumns[1].field as any)}`
        );


    }

    for (let c = 0; c < list2.length; c++) {

        jsPdfPrint.setFontSize(9);
        jsPdfPrint.setTextColor(0, 0, 0);
        jsPdfPrint.getFontList('normal');
        jsPdfPrint.text(
            +incrementWidth_Coef,
            +valueX(list2[c]),
            `${value(list2[c], getColumns[2].field as any)}`
        );

    }


    for (let d = 0; d < list3.length; d++) {

        jsPdfPrint.setFontSize(9);
        jsPdfPrint.setTextColor(0, 0, 0);
        jsPdfPrint.getFontList('normal');
        jsPdfPrint.text(
            +incrementWidth_ArrayNoteDef,
            +valueX(list3[d]),
            `${value(list3[d], getColumns[3].field as any)}`
        );

    }


};

export { Table1erTrim };
