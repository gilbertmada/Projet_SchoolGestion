import axios from "axios";
import { lazy } from "react";
import { Route, Switch } from "react-router-dom";
import Login from "../components/Login";
import { inject, observer } from 'mobx-react';
import authServices from "../services/AuthServices";
import { CreateUser, ListUser, User } from "../components/User";
import { ProtectedRoute } from "../common/ProtectedRoute";
import {
  allUsers,
  superUtilisateur,
  admins,
  utilisateurPermission,

} from "../common/utils/data";


const Dashboard = lazy(() => import("../components/Dashboard"));
const CreateStudent = lazy(() => import("../components/Student/CreateStudent/CreateStudent"));
const CreateSchool = lazy(() => import("../components/Ecole/CreateSchool/CreateSchool"));
const ListSchool = lazy(() => import("../components/Ecole/ListSchool/listSchool"));
const CreateClass = lazy(() => import("../components/Class/CreateClass/CreateClass"));
const ListClass = lazy(() => import("../components/Class/ListClass/listClass"));
const Ecolage = lazy(() => import("../components/Student/Ecolage/Ecolage"));
const ListStudent = lazy(() => import("../components/Student/ListStudent/listStudent"));
const CreateDocument = lazy(() => import("../components/Student/Document/Document"));
const CreateProfessor = lazy(() => import("../components/Professor/CreateProfessor"));
const ListProfessor = lazy(() => import("../components/Professor/ListProfessor"));
const CreateNote = lazy(() => import("../components/Notes/CreateNotes/CreateNote"));
const ListeNote = lazy(() => import("../components/Notes/ListNote/listNote"));


let signOutTime: any = 0;

const signOut = () => {
  authServices.setAccessToken("");
  authServices.signOut();
};

const startTimer = () => {
  signOutTime = setTimeout(signOut, 1800000);
};

const Router = () => {

  axios.interceptors.response.use((resp) => {
    const { token } = resp.headers;
    if (token !== "" && token !== undefined) {
      if (signOutTime === 0 || signOutTime === undefined) {
        startTimer();
      } else {
        clearTimeout(signOutTime);
        startTimer();
      }
      authServices.setAccessToken(token);

    }
    return resp;
  });

  return (
    <Switch>
      <Route
        path="/login"
        exact={true}
        component={Login}
      />
      <ProtectedRoute
        path="/"
        exact={true}
        component={Dashboard}
        access={utilisateurPermission}
      />
      <ProtectedRoute
        path="/user/list"
        exact={true}
        component={ListUser}
        access={admins}
      />
      <ProtectedRoute
        path="/user/new-user"
        exact={true}
        access={admins}
        component={CreateUser}
      />
      <ProtectedRoute
        path="/user/profile"
        exact={true}
        component={User}
        access={admins}
      />
      <ProtectedRoute
        path="/student/list"
        exact={true}
        component={ListStudent}
        access={utilisateurPermission}
      />
      <ProtectedRoute
        path="/student/new-student"
        exact={true}
        access={utilisateurPermission}
        component={CreateStudent}
      />
      <ProtectedRoute
        path="/student/document"
        exact={true}
        access={utilisateurPermission}
        component={CreateDocument}
      />
      <ProtectedRoute
        path="/student/ecolage"
        exact={true}
        component={Ecolage}
        access={utilisateurPermission}
      />
      <ProtectedRoute
        path="/professor/new-professor"
        exact={true}
        access={utilisateurPermission}
        component={CreateProfessor}
      />
      <ProtectedRoute
        path="/professor/list"
        exact={true}
        // access={adminswithCom}
        access={utilisateurPermission}
        component={ListProfessor}
      />
      <ProtectedRoute
        path="/class/new-class"
        exact={true}
        access={utilisateurPermission}
        component={CreateClass}
      />
      <ProtectedRoute
        path="/class/list"
        exact={true}
        access={utilisateurPermission}
        component={ListClass}
      />

      <ProtectedRoute
        path="/school/new-school"
        exact={true}
        access={superUtilisateur}
        component={CreateSchool}
      />
      <ProtectedRoute
        path="/school/list"
        exact={true}
        access={superUtilisateur}
        component={ListSchool}
      />
      <ProtectedRoute
        path="/note/new-note"
        exact={true}
        access={utilisateurPermission}
        component={CreateNote}
      />
        <ProtectedRoute
        path="/note/list"
        exact={true}
        access={utilisateurPermission}
        component={ListeNote}
      />
    </Switch>
  )
};

export default inject('authStore', 'userStore')(observer(Router));
