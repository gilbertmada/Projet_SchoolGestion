import { inject, observer } from "mobx-react";
import moment from "moment";
import { FC, useEffect, useState } from "react";
import ReactHtmlParser from "react-html-parser";
import { StudentStoreInterface } from "../../../store/StudentStore";
import { UserStoreInterface } from "../../../store/UserStore";
import { AbstractEmptyInterface } from "../../../types";
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

  // const getHistoryDocument = () => {
  //   let history: any[] = [];
  //   const students = toJS(studentStore.allStudent);
  //   for (let i = 0; i < students.length; i++) {
  //       if (studentStore.selectedStudent?.role===students[i].role && studentStore.selectedStudent?.class===students[i].class) {
  //         history= students[i].historyStudent;
  //     }
    
      
  //   }
  //   return history;
  // }


  return (
    <div className={classes.container}>
      <div className={classes.title}>Historique des modifications</div>
      <div className={classes.data}>

        {studentStore.selectedStudent ? studentStore.selectedStudent.historyStudent
          .slice()
          .sort((a: any) => {
            const date1 = new Date(a.date).getTime();
            return date1;
          })
          .map((k: any) => {
            return <div key={k}>{ReactHtmlParser(k.text)}</div>;
          }):""}
      </div>
    </div>
  );
};

export default inject("studentStore", "userStore")(observer(History));
