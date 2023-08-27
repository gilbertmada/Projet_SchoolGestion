import { inject, observer } from "mobx-react";
import moment from "moment";
import { FC, useEffect, useState } from "react";
import ReactHtmlParser from "react-html-parser";
import { StudentStoreInterface } from "../../../../store/StudentStore";
import { UserStoreInterface } from "../../../../store/UserStore";
import { AbstractEmptyInterface } from "../../../../types";
import useStyles from "./style";
import { toJS } from 'mobx';

interface ContratProps extends AbstractEmptyInterface {
  studentStore: StudentStoreInterface;
  userStore: UserStoreInterface;
}

const History: FC<AbstractEmptyInterface> = (props) => {
  const { studentStore, userStore } = props as ContratProps;

  const classes = useStyles();


  useEffect(() => {
    studentStore.getAllStudent();

  }, [studentStore]);


  return (
    <div className={classes.container}>
      <div className={classes.title}>Historique des modifications</div>
      <div className={classes.data}>

        {studentStore.selectedStudent?.isPrive ? (studentStore.selectedStudent?.historyStudentDroit
          .slice()
          .sort((a: any) => {
            const date1 = new Date(a.date).getTime();
            return date1;
          })
          .map((k: any) => {
            return <div key={k}>{ReactHtmlParser(k.text)}</div>;
          })) :
          !studentStore.selectedStudent?.isPrive ?
            (studentStore.selectedStudent?.historyStudentDroit
              .slice()
              .sort((a: any) => {
                const date1 = new Date(a.date).getTime();
                return date1;
              })
              .map((k: any) => {
                return <div key={k}>{ReactHtmlParser(k.text)}</div>;
              })) :
            ""}

        {studentStore.selectedStudent?.isPrive ? (studentStore.selectedStudent?.historyStudentEcolage
          .slice()
          .sort((a: any) => {
            const date1 = new Date(a.date).getTime();
            return date1;
          })
          .map((k: any) => {
            return <div key={k}>{ReactHtmlParser(k.text)}</div>;
          })) :
          !studentStore.selectedStudent?.isPrive ?
            (studentStore.selectedStudent?.historyStudentFrais
              .slice()
              .sort((a: any) => {
                const date1 = new Date(a.date).getTime();
                return date1;
              })
              .map((k: any) => {
                return <div key={k}>{ReactHtmlParser(k.text)}</div>;
              })) : ""}
      </div>
    </div>
  );
};

export default inject("studentStore", "userStore")(observer(History));
