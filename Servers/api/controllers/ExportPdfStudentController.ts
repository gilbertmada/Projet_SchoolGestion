import { Request, Response, NextFunction } from "express";
import JSPDF from 'jspdf';
import moment from 'moment';
import font from '../utils/font.json'
import fs from 'fs';
import { Student } from "~~/entity/Student";
import { INotes, Notes } from "~~/entity/Notes";
import { page } from "pdfkit";
import Head from "./PDF/ListStudent/Head";
import HeadRecu from "./PDF/RecuDroit/HeadRecu";
import TableRecu from "./PDF/RecuDroit/TableRecu";
import HeadRecuEcolage from "./PDF/RecuEcolage/HeadRecuEcolage";
import HeadEmploiDuTemps from "./PDF/EmploiDuTemps/HeadEmploiDuTemps";
import HeadBulletin from "./PDF/Bulletin/Bulletin1erTrim/HeadBulletin";
import { Table1erTrim } from "./PDF/Bulletin/Bulletin1erTrim/Table1erTrim";
import { Table2eTrim } from "./PDF/Bulletin/Bulletin2eTrim/Table2eTrim";
import { Table3eTrim } from "./PDF/Bulletin/Bulletin3eTrim /Table3eTrim";
import { Header0 } from "./PDF/Bulletin/Bulletin1erTrim/header";
import { Header1 } from "./PDF/Bulletin/Bulletin2eTrim/header";
import { Header2 } from "./PDF/Bulletin/Bulletin3eTrim /header";
import { HeaderTableHorrorMorning } from "./PDF/EmploiDuTemps/headerHorrorMorning";
import { HeaderTableMatiere } from "./PDF/Bulletin/Bulletin1erTrim/headerTableMatiere";
import { HeaderTableMatiere2e } from "./PDF/Bulletin/Bulletin2eTrim/headerTableMatiere";
import { Total1erTrim } from "./PDF/Bulletin/Bulletin1erTrim/Total1erTrim";
import { Deliberation1erTrim } from "./PDF/Bulletin/Bulletin1erTrim/Deliberation1erTrim";
import { Total2eTrim } from "./PDF/Bulletin/Bulletin2eTrim/Total2eTrim";
import { Deliberation2eTrim } from "./PDF/Bulletin/Bulletin2eTrim/Deliberation2eTrim";
import { HeaderTableMatiere3e } from "./PDF/Bulletin/Bulletin3eTrim /headerTableMatiere";
import { Total3eTrim } from "./PDF/Bulletin/Bulletin3eTrim /Total3eTrim";
import { Deliberation3eTrim } from "./PDF/Bulletin/Bulletin3eTrim /Deliberation3eTrim";
import { HeaderTableHorrorAfternoon } from "./PDF/EmploiDuTemps//headerHorrorAfternoon";
import { TableBetween } from "./PDF/EmploiDuTemps/tableBetween";
import { TableEmploiDuTemps } from "./PDF/EmploiDuTemps/TableEmploiDuTemps";
import TableRecuEcolage from "./PDF/RecuEcolage/TableRecuEcolage";
import HeadRecuFraisDivers from "./PDF/RecuFraisDivers/HeadRecuFraisDivers";
import TableRecuFraisDivers from "./PDF/RecuFraisDivers/TableRecuFraisDivers";
import { ListToClass } from "./PDF/ListStudent/ListToClass";
import { HeaderTable } from "./PDF/ListStudent/header"
import { HeaderTableEmploiDuTemps } from "./PDF/EmploiDuTemps/header"
import { horror } from '../utils/index';


export default class ExportPdfStudentController {

    static exportPdfList = async (req: Request, res: Response) => {

        const path = "./fichier/PDFFiles/";

        if (!fs.existsSync(path)) {
            fs.mkdirSync(path, { recursive: true });
        }

        const jsPdfPrint = new JSPDF('p', 'mm', 'a4', true);
        jsPdfPrint.addFileToVFS('Roboto-Bold.ttf', font.font);
        jsPdfPrint.addFont('Roboto-Bold.ttf', 'custom', 'normal');
        jsPdfPrint.setFont('custom', 'normal');

        try {

            const data = req.body;


            Head(
                {
                    schoolName: `${data[0].schoolName}`,
                    class: `${data[0].class}`,
                    height: `${data[0].height}`,
                },
                jsPdfPrint
            );
            HeaderTable(50, jsPdfPrint);

            ListToClass(
                [
                    ...data.sort((a: any, b: any) => {
                        return a.matriculNumber - b.matriculNumber
                    })

                ],
                60,
                jsPdfPrint
            )

            const filename = `LISTES DES ELEVES AU CLASSE DE ${data[0].class}.pdf`;
            const pathPdf = `${path}${filename}`;
            fs.writeFileSync(pathPdf, jsPdfPrint.output())
            jsPdfPrint.save(pathPdf);

            return res.status(200).send({
                status: "success",
                message: "file successfully downloaded",
                path: pathPdf,
                filename: filename,
            });
        } catch (error) {
            console.log('this is an error', error);

            res.status(500).send({
                status: "error",
                message: "Something went wrong" + error,

            });
        }
    }

    static exportPdfRecuDroit = async (req: Request, res: Response) => {

        const path = "./fichier/PDFFiles/";

        if (!fs.existsSync(path)) {
            fs.mkdirSync(path, { recursive: true });
        }

        const jsPdfPrint = new JSPDF('p', 'mm', 'a5', true);
        jsPdfPrint.addFileToVFS('Roboto-Bold.ttf', font.font);
        jsPdfPrint.addFont('Roboto-Bold.ttf', 'custom', 'normal');
        jsPdfPrint.setFont('custom', 'normal');

        try {

            const data = req.body;


            HeadRecu(
                {
                    schoolName: `${data.schoolName}`,
                    class: `${data.class}`,
                    height: `${data.height}`,
                },
                jsPdfPrint
            );

            TableRecu(
                {
                    firstName: `${data.firstName}`,
                    lastName: `${data.lastName}`,
                    address: `${data.address}`,
                    inscriptionDroit: `${data.inscriptionDroit}`,
                },
                jsPdfPrint
            )

            const filename = `Réçu de droit ${data.lastName}.pdf`;
            const pathPdf = `${path}${filename}`;
            fs.writeFileSync(pathPdf, jsPdfPrint.output())
            jsPdfPrint.save(pathPdf);

            return res.status(200).send({
                status: "success",
                message: "file successfully downloaded",
                path: pathPdf,
                filename: filename,
            });
        } catch (error) {
            console.log('this is an error', error);

            res.status(500).send({
                status: "error",
                message: "Something went wrong" + error,

            });
        }
    }

    static exportPdfRecuEcolage = async (req: Request, res: Response) => {

        const path = "./fichier/PDFFiles/";

        if (!fs.existsSync(path)) {
            fs.mkdirSync(path, { recursive: true });
        }

        const jsPdfPrint = new JSPDF('p', 'mm', 'a5', true);
        jsPdfPrint.addFileToVFS('Roboto-Bold.ttf', font.font);
        jsPdfPrint.addFont('Roboto-Bold.ttf', 'custom', 'normal');
        jsPdfPrint.setFont('custom', 'normal');

        try {

            const data = req.body.ecolagePrive;
            const otherData = req.body.otherDataPrive;
            const index = data.length - 1;
            const dataFinally = data[index];



            HeadRecuEcolage(
                {
                    schoolName: `${otherData.schoolName}`,
                    class: `${otherData.class}`,
                    height: `${otherData.height}`,
                },
                jsPdfPrint
            );

            TableRecuEcolage(
                {
                    lastName: `${dataFinally.student}`,
                    matriculNumber: `${dataFinally.matriculNumber}`,
                    datePayEcolage: `${dataFinally.datePayEcolage}`,
                    ecolageMonth: `${dataFinally.ecolageMonth}`,
                    ecolage: `${dataFinally.ecolage}`,
                },
                jsPdfPrint
            )

            const filename = `Réçu d'écolage de ${dataFinally.student}.pdf`;
            const pathPdf = `${path}${filename}`;
            fs.writeFileSync(pathPdf, jsPdfPrint.output())
            jsPdfPrint.save(pathPdf);

            return res.status(200).send({
                status: "success",
                message: "file successfully downloaded",
                path: pathPdf,
                filename: filename,
            });
        } catch (error) {
            console.log('this is an error', error);

            res.status(500).send({
                status: "error",
                message: "Something went wrong" + error,

            });
        }
    }

    static exportPdfRecuFraisDivers = async (req: Request, res: Response) => {

        const path = "./fichier/PDFFiles/";

        if (!fs.existsSync(path)) {
            fs.mkdirSync(path, { recursive: true });
        }

        const jsPdfPrint = new JSPDF('p', 'mm', 'a5', true);
        jsPdfPrint.addFileToVFS('Roboto-Bold.ttf', font.font);
        jsPdfPrint.addFont('Roboto-Bold.ttf', 'custom', 'normal');
        jsPdfPrint.setFont('custom', 'normal');

        try {

            const data = req.body.droit;
            const otherData = req.body.otherDataFraisDivers
            const index = data.length - 1;
            const dataFinally = data[index];


            HeadRecuFraisDivers(
                {
                    schoolName: `${otherData.schoolName}`,
                    class: `${otherData.class}`,
                    height: `${otherData.height}`,
                },
                jsPdfPrint
            );

            TableRecuFraisDivers(
                {
                    lastName: `${dataFinally.student}`,
                    matriculNumber: `${dataFinally.matriculNumber}`,
                    datePayDivers: `${dataFinally.datePayDivers}`,
                    frais: `${dataFinally.frais}`,
                },
                jsPdfPrint
            )

            const filename = `Réçu de frais divers de ${dataFinally.student}.pdf`;
            const pathPdf = `${path}${filename}`;
            fs.writeFileSync(pathPdf, jsPdfPrint.output())
            jsPdfPrint.save(pathPdf);

            return res.status(200).send({
                status: "success",
                message: "file successfully downloaded",
                path: pathPdf,
                filename: filename,
            });
        } catch (error) {
            console.log('this is an error', error);

            res.status(500).send({
                status: "error",
                message: "Something went wrong" + error,

            });
        }
    }

    static exportPdfEmploiDuTemps = async (req: Request, res: Response) => {

        const path = "./fichier/PDFFiles/";

        if (!fs.existsSync(path)) {
            fs.mkdirSync(path, { recursive: true });
        }

        const jsPdfPrint = new JSPDF('l', 'mm', 'a4', true);
        jsPdfPrint.addFileToVFS('Roboto-Bold.ttf', font.font);
        jsPdfPrint.addFont('Roboto-Bold.ttf', 'custom', 'normal');
        jsPdfPrint.setFont('custom', 'normal');

        try {

            const data = req.body;

            console.log("emploi body...", data);

            HeadEmploiDuTemps(
                {
                    schoolName: `${data[0].schoolName}`,
                    class: `${data[0].className}`,
                },
                jsPdfPrint
            );

            HeaderTableEmploiDuTemps(50, jsPdfPrint);

            HeaderTableHorrorMorning(60, jsPdfPrint, false, horror);

            TableBetween(120, jsPdfPrint);

            HeaderTableHorrorAfternoon(130, jsPdfPrint, horror);

            TableEmploiDuTemps(
                [
                    horror,
                    ...data.sort((a: any, b: any) => {
                        return a.prof.IM - b.prof.IM
                    }),


                ],
                jsPdfPrint
            )


            const filename = `Emploi du temps ${data[0].className}.pdf`;
            const pathPdf = `${path}${filename}`;
            fs.writeFileSync(pathPdf, jsPdfPrint.output())
            jsPdfPrint.save(pathPdf);

            return res.status(200).send({
                status: "success",
                message: "file successfully downloaded",
                path: pathPdf,
                filename: filename,
            });
        } catch (error) {
            console.log('this is an error', error);

            res.status(500).send({
                status: "error",
                message: "Something went wrong" + error,

            });
        }
    }
    static exportToPdfBulletinTrim = async (req: Request, res: Response) => {

        const path = "./fichier/PDFFiles/";
        const arrayMoyen1erTrim: any = [];
        const arrayMoyen2eTrim: any = [];
        const arrayMoyen3eTrim: any = [];
        const arrayMoyenTrim: any = [];
        if (!fs.existsSync(path)) {
            fs.mkdirSync(path, { recursive: true });
        }

        const jsPdfPrint = new JSPDF('p', 'mm', 'a4', true);
        jsPdfPrint.addFileToVFS('Roboto-Bold.ttf', font.font);
        jsPdfPrint.addFont('Roboto-Bold.ttf', 'custom', 'normal');
        jsPdfPrint.setFont('custom', 'normal');

        try {

            const data = req.body;

            const students = await Student.find({
                $and: [
                    {
                        $or: [
                            { class: data.stud.class },
                        ],
                    },
                ],
            });
            const nbrStudentClass = students.length;
            const notes = await Notes.find({
                $and: [
                    {
                        $or: [
                            { "stud.class": data.stud.class },
                        ],
                    },
                ],
            });

            for (let i = 0; i < notes.length; i++) {
                if (notes[i].generalMoyen1erTrim !== 0) {
                    arrayMoyen1erTrim.push(notes[i].generalMoyen1erTrim);
                }

            }

            for (let i = 0; i < notes.length; i++) {
                if (notes[i].generalMoyen2eTrim !== 0) {
                    arrayMoyen2eTrim.push(notes[i].generalMoyen2eTrim);
                }

            }

            for (let i = 0; i < notes.length; i++) {
                if (notes[i].generalMoyen3eTrim !== 0) {
                    arrayMoyen3eTrim.push(notes[i].generalMoyen3eTrim);
                }

            }

            for (let i = 0; i < notes.length; i++) {
                if (notes[i].generalMoyenTrim !== 0) {
                    arrayMoyenTrim.push(notes[i].generalMoyenTrim);
                }

            }

            const newArrayMoyen1erTrim: any[] = arrayMoyen1erTrim.sort((a: any, b: any) => {
                return b - a;
            })

            const newArrayMoyen2eTrim: any[] = arrayMoyen2eTrim.sort((a: any, b: any) => {
                return b - a;
            })

            const newArrayMoyen3eTrim: any[] = arrayMoyen3eTrim.sort((a: any, b: any) => {
                return b - a;
            })
            const newArrayMoyenTrim: any[] = arrayMoyenTrim.sort((a: any, b: any) => {
                return b - a;
            })

            const getRang1erTrim = () => {
                let rang: any = "";
                for (let i = 0; i < newArrayMoyen1erTrim.length; i++) {
                    if (newArrayMoyen1erTrim[i] === data.generalMoyen1erTrim) {

                        rang = i + 1;
                    }

                }
                return rang;
            }

            const getRang2eTrim = () => {
                let rang: any = "";
                for (let i = 0; i < newArrayMoyen2eTrim.length; i++) {
                    if (newArrayMoyen2eTrim[i] === data.generalMoyen2eTrim) {
                        rang = i + 1;
                    }

                }
                return rang;
            }

            const getRang3eTrim = () => {
                let rang: any = "";
                for (let i = 0; i < newArrayMoyen3eTrim.length; i++) {
                    if (newArrayMoyen3eTrim[i] === data.generalMoyen3eTrim) {
                        rang = i + 1;
                    }

                }
                return rang;
            }

            const getRangTrim = () => {
                let rang: any = "";

                for (let i = 0; i < newArrayMoyenTrim.length; i++) {

                    if (newArrayMoyenTrim[i] === data.generalMoyenTrim) {

                        rang = i + 1;
                    }

                }

                return rang;
            }
            //  arrayDeNoteJ,arrayDeCoefJ,arrayDeNoteCompo 1er Trim
            const arrayDeNoteJ: any[] = [
                { label: 'MATHEMATIQUES', valueNote: data.noteJournalier?.note_Maths },
                { label: 'PHYSIQUE_CHIMIE', valueNote: data.noteJournalier?.note_Pc },
                { label: 'ANGLAIS', valueNote: data.noteJournalier?.note_Ang },
                { label: 'MALAGASY', valueNote: data.noteJournalier?.note_Mal },
                { label: 'FRANÇAIS', valueNote: data.noteJournalier?.note_Fr },
                { label: 'PHILOSOPHIE', valueNote: data.noteJournalier?.note_Philo },
                { label: 'HISTO_GEO', valueNote: data.noteJournalier?.note_HistoGeo },
                { label: 'SVT', valueNote: data.noteJournalier?.note_SVT },
                { label: 'EPS', valueNote: data.noteJournalier?.note_Eps },
            ]

            const arrayDeCoefJ: any[] = [
                { label: 'MATHEMATIQUES', valueCoef: data.noteJournalier?.coef_Maths },
                { label: 'PHYSIQUE_CHIMIE', valueCoef: data.noteJournalier?.coef_Pc },
                { label: 'ANGLAIS', valueCoef: data.noteJournalier?.coef_Ang },
                { label: 'MALAGASY', valueCoef: data.noteJournalier?.coef_Mal },
                { label: 'FRANÇAIS', valueCoef: data.noteJournalier?.coef_Fr },
                { label: 'PHILOSOPHIE', valueCoef: data.noteJournalier?.coef_Philo },
                { label: 'HISTO_GEO', valueCoef: data.noteJournalier?.coef_HistoGeo },
                { label: 'SVT', valueCoef: data.noteJournalier?.coef_SVT },
                { label: 'EPS', valueCoef: data.noteJournalier?.coef_Eps },
            ]


            const arrayDeNoteCompo: any[] = [
                { label: 'MATHEMATIQUES', valueNote: data.noteComposition?.note_Maths },
                { label: 'PHYSIQUE_CHIMIE', valueNote: data.noteComposition?.note_Pc },
                { label: 'ANGLAIS', valueNote: data.noteComposition?.note_Ang },
                { label: 'MALAGASY', valueNote: data.noteComposition?.note_Mal },
                { label: 'FRANÇAIS', valueNote: data.noteComposition?.note_Fr },
                { label: 'PHILOSOPHIE', valueNote: data.noteComposition?.note_Philo },
                { label: 'HISTO_GEO', valueNote: data.noteComposition?.note_HistoGeo },
                { label: 'SVT', valueNote: data.noteComposition?.note_SVT },
                { label: 'EPS', valueNote: data.noteComposition?.note_Eps },
            ]
            //  arrayDeNoteJ2e,arrayDeCoefJ2e,arrayDeNoteCompo2e 2e Trim

            const arrayDeNoteJ2e: any[] = [
                { label: 'MATHEMATIQUES', valueNote: data.noteJournalier2e?.note_Maths },
                { label: 'PHYSIQUE_CHIMIE', valueNote: data.noteJournalier2e?.note_Pc },
                { label: 'ANGLAIS', valueNote: data.noteJournalier2e?.note_Ang },
                { label: 'MALAGASY', valueNote: data.noteJournalier2e?.note_Mal },
                { label: 'FRANÇAIS', valueNote: data.noteJournalier2e?.note_Fr },
                { label: 'PHILOSOPHIE', valueNote: data.noteJournalier2e?.note_Philo },
                { label: 'HISTO_GEO', valueNote: data.noteJournalier2e?.note_HistoGeo },
                { label: 'SVT', valueNote: data.noteJournalier2e?.note_SVT },
                { label: 'EPS', valueNote: data.noteJournalier2e?.note_Eps },
            ]




            const arrayDeNoteCompo2e: any[] = [
                { label: 'MATHEMATIQUES', valueNote: data.noteComposition2e?.note_Maths },
                { label: 'PHYSIQUE_CHIMIE', valueNote: data.noteComposition2e?.note_Pc },
                { label: 'ANGLAIS', valueNote: data.noteComposition2e?.note_Ang },
                { label: 'MALAGASY', valueNote: data.noteComposition2e?.note_Mal },
                { label: 'FRANÇAIS', valueNote: data.noteComposition2e?.note_Fr },
                { label: 'PHILOSOPHIE', valueNote: data.noteComposition2e?.note_Philo },
                { label: 'HISTO_GEO', valueNote: data.noteComposition2e?.note_HistoGeo },
                { label: 'SVT', valueNote: data.noteComposition2e?.note_SVT },
                { label: 'EPS', valueNote: data.noteComposition2e?.note_Eps },
            ]

            //  arrayDeNoteJ3e,arrayDeNoteCompo3e 3e Trim

            const arrayDeNoteJ3e: any[] = [
                { label: 'MATHEMATIQUES', valueNote: data.noteJournalier3e?.note_Maths },
                { label: 'PHYSIQUE_CHIMIE', valueNote: data.noteJournalier3e?.note_Pc },
                { label: 'ANGLAIS', valueNote: data.noteJournalier3e?.note_Ang },
                { label: 'MALAGASY', valueNote: data.noteJournalier3e?.note_Mal },
                { label: 'FRANÇAIS', valueNote: data.noteJournalier3e?.note_Fr },
                { label: 'PHILOSOPHIE', valueNote: data.noteJournalier3e?.note_Philo },
                { label: 'HISTO_GEO', valueNote: data.noteJournalier3e?.note_HistoGeo },
                { label: 'SVT', valueNote: data.noteJournalier3e?.note_SVT },
                { label: 'EPS', valueNote: data.noteJournalier3e?.note_Eps },
            ]




            const arrayDeNoteCompo3e: any[] = [
                { label: 'MATHEMATIQUES', valueNote: data.noteComposition3e?.note_Maths },
                { label: 'PHYSIQUE_CHIMIE', valueNote: data.noteComposition3e?.note_Pc },
                { label: 'ANGLAIS', valueNote: data.noteComposition3e?.note_Ang },
                { label: 'MALAGASY', valueNote: data.noteComposition3e?.note_Mal },
                { label: 'FRANÇAIS', valueNote: data.noteComposition3e?.note_Fr },
                { label: 'PHILOSOPHIE', valueNote: data.noteComposition3e?.note_Philo },
                { label: 'HISTO_GEO', valueNote: data.noteComposition3e?.note_HistoGeo },
                { label: 'SVT', valueNote: data.noteComposition3e?.note_SVT },
                { label: 'EPS', valueNote: data.noteComposition3e?.note_Eps },
            ]
            const listCoefJ = () => {
                const list = [];
                for (let i = 0; i < arrayDeCoefJ.length; i++) {
                    if (arrayDeCoefJ[i].valueCoef !== undefined) {
                        list.push(arrayDeCoefJ[i].valueCoef)
                    }
                }
                return list;
            };

            const getTotalCoefJ: number = listCoefJ().length > 0 ? listCoefJ()
                .map((item: any) => parseInt(item, 10))
                .reduce((a: any, b: any) => a + b) : 0;


            HeadBulletin(
                {
                    schoolName: `${data.stud.schoolName}`,
                    scolarYear: `${data.stud.scolarYear}`,
                    firstName: `${data.stud.firstName}`,
                    lastName: `${data.stud.lastName}`,
                    class: `${data.stud.class}`,
                    matriculNumber: `${data.stud.matriculNumber}`,
                },
                jsPdfPrint
            );
            const newData1erTrim = {
                ...data,
                totalCoefJ0: +getTotalCoefJ,
                nbrStudentClass,
                rang0: getRang1erTrim()
            }
            const newData2eTrim = {
                ...data,
                totalCoefJ0: +getTotalCoefJ,
                nbrStudentClass,
                rang0: getRang1erTrim(),
                rang1: getRang2eTrim()
            }

            const newData3eTrim = {
                ...data,
                totalCoefJ0: +getTotalCoefJ,
                nbrStudentClass,
                rang0: getRang1erTrim(),
                rang1: getRang2eTrim(),
                rang3: getRang3eTrim(),
                rang: getRangTrim()
            }

          
            if (data.generalMoyen1erTrim !== undefined) {
                if (data.generalMoyen2eTrim === undefined || data.generalMoyen2eTrim === 0) {
                    Header0(17, jsPdfPrint)
                    HeaderTableMatiere(27, newData1erTrim.arrayListNoteDef, jsPdfPrint)
                    Table1erTrim(arrayDeNoteJ, arrayDeNoteCompo, arrayDeCoefJ, newData1erTrim.arrayListNoteDef, jsPdfPrint);
                    Total1erTrim(newData1erTrim, jsPdfPrint);
                    Deliberation1erTrim(120, newData1erTrim, jsPdfPrint);
                }
            }
            if (data.generalMoyen2eTrim !== undefined) {
                if (data.generalMoyen1erTrim !== undefined || data.generalMoyen1erTrim !== 0) {

                    Header0(17, jsPdfPrint)
                    HeaderTableMatiere(27, newData2eTrim.arrayListNoteDef, jsPdfPrint)
                    Table1erTrim(arrayDeNoteJ, arrayDeNoteCompo, arrayDeCoefJ, newData2eTrim.arrayListNoteDef, jsPdfPrint);
                    Total1erTrim(newData2eTrim, jsPdfPrint);
                    Deliberation1erTrim(120, newData2eTrim, jsPdfPrint);

                    Header1(17, jsPdfPrint)
                    HeaderTableMatiere2e(27, newData2eTrim.arrayListNoteDef2e, jsPdfPrint)
                    Table2eTrim(arrayDeNoteJ2e, arrayDeNoteCompo2e, arrayDeCoefJ, newData2eTrim.arrayListNoteDef2e, jsPdfPrint);
                    Total2eTrim(newData2eTrim, jsPdfPrint);
                    Deliberation2eTrim(120, newData2eTrim, jsPdfPrint);
                }
            }

            if (data.generalMoyen3eTrim !== undefined) {
                Header2(17, jsPdfPrint)
                HeaderTableMatiere3e(27, newData3eTrim.arrayListNoteDef3e, jsPdfPrint)
                Table3eTrim(arrayDeNoteJ3e, arrayDeNoteCompo3e, arrayDeCoefJ, newData3eTrim.arrayListNoteDef3e, jsPdfPrint);
                Total3eTrim(newData3eTrim, jsPdfPrint);
                Deliberation3eTrim(120, newData3eTrim, jsPdfPrint);

            }

            const filename = `Bulletin de note de ${data.stud.lastName}.pdf`;
            const pathPdf = `${path}${filename}`;
            fs.writeFileSync(pathPdf, jsPdfPrint.output())
            jsPdfPrint.save(pathPdf);

            return res.status(200).send({
                status: "success",
                message: "file successfully downloaded",
                path: pathPdf,
                filename: filename,
            });
        } catch (error) {
            console.log('this is an error', error);

            res.status(500).send({
                status: "error",
                message: "Something went wrong" + error,

            });
        }
    }
   
}