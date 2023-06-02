
import Users from '../../Assets/dashboard/CLICAR-user-20.svg';
import school from '../../Assets/dashboard/school.png';
import etuduant from '../../Assets/dashboard/etudiants.png';
import note from '../../Assets/dashboard/note.jpg';
import enseignant from '../../Assets/dashboard/enseignant.png';
import rootStore from '../../store/AppStore';
import classe from '../../Assets/dashboard/classe.svg';
import { inject, observer } from 'mobx-react';
import {
  admins,
  utilisateurPermission,
  superUtilisateur,
} from '../utils/data';
import { userStore } from '../../store';


export interface Idashboard {
  titre: string;
  link: string;
  nbr: number;
  images: any;
  permissions?: string[];
}


const rowData = (): Idashboard[] => [
  {
    titre: 'UTILISATEUR',
    link: '/user/list',
    nbr: rootStore.numbers.usersNumber,
    images: Users,
    permissions: admins,
  },
  {
    titre: 'ELEVES',
    link: '/student/list',
    nbr: rootStore.numbers.studentNumber,
    images: etuduant,
    permissions: utilisateurPermission,
  },
  {
    titre: 'ENSEIGNANTS',
    link: '/professor/list',
    nbr: rootStore.numbers.professorNumber,
    images: enseignant,
    permissions: utilisateurPermission,
  },
  {
    titre: 'CLASSES',
    link: '/class/list',
    nbr: rootStore.numbers.classNumber,
    images: classe,
    permissions: utilisateurPermission,
  },
  {
    titre: 'ECOLES',
    link: '/school/list',
    nbr: rootStore.numbers.schoolNumber,
    images: school,
    permissions: superUtilisateur,
  },
  {
    titre: 'NOTES',
    link: '/note/list',
    nbr: rootStore.numbers.noteNumber,
    images: note,
    permissions: utilisateurPermission,
  },
  // {
  //   titre: 'TEST',
  //   link: '/test',
  //   nbr: 0,
  //   images: test,
  //   permissions: admins,
  // },
 
];

export default rowData;

