import { Navigate, type RouteObject } from 'react-router-dom';
import DefaultLayoutWrapper from '../layout/DefaultLayoutWrapper.tsx';
import PageTitle from './../components/PageTitle';
import SignIn from './../pages/Authentication/SignIn';
import SignUp from './../pages/Authentication/SignUp';
import Dashboard from './../pages/Dashboard/Dashboard';
import Institute from './../pages/Institute/Institute';
import UpdateInstituteForm from './../pages/Form/UpdateInstituteForm';
import Institutes from './../pages/Institute/Institutes';
import Programs from './../pages/Institute/Programs';
import UpdateProgramForm from './../pages/Form/UpdateProgramForm';
import Subjects from './../pages/Institute/Subjects';
import UpdateSubjectForm from './../pages/Form/UpdateSubjectForm';
import FilteredSubjects from './../pages/Institute/FilteredSubjects';
import SmartMatchSubjects from './../pages/Institute/SmartMatchSubjects';
import Lecturers from './../pages/Lecturer/Lecturers';
import FilteredLecturers from './../pages/Lecturer/FilteredLecturers';
import SmartMatchLecturers from './../pages/Lecturer/SmartMatchLecturers';
import Qualifications from './../pages/Lecturer/Qualifications';
import UpdateQualificationForm from './../pages/Form/UpdateQualificationForm';
import Settings from './../pages/UiElements/Settings';
import NotFound from './../pages/UiElements/NotFound';
import Program from '../pages/Institute/Program.tsx';
import Subject from '../pages/Institute/Subject.tsx';
import Qualification from '../pages/Lecturer/Qualification.tsx';
import Lecturer from '../pages/Lecturer/Lecturer.tsx';
import UpdateLecturerForm from '../pages/Form/UpdateLecturerForm.tsx';

export const routes: RouteObject[] = [
  { path: '/', element: <Navigate to="/auth/signin" /> },
  {
    path: 'auth',
    children: [
      { path: 'signin', element: <><PageTitle title="Lecture Link | Sign In" /><SignIn /></> },
      { path: 'signup', element: <><PageTitle title="Lecture Link | Sign Up" /><SignUp /></> },
    ],
  },
  {
    path: 'app',
    element: <DefaultLayoutWrapper />,
    children: [
      { index: true, element: <Navigate to="dashboard" /> },
      { path: 'dashboard', element: <><PageTitle title="Lecture Link | Dashboard" /><Dashboard /></> },

      { path: 'profile', children: [
          { index: true, element: <><PageTitle title="Lecture Link | Institute" /><Institute /></> },
          { path: 'update-institute', element: <><PageTitle title="Lecture Link | Update Institute" /><UpdateInstituteForm /></> },
          { path: 'institutes', element: <><PageTitle title="Lecture Link | Institutes" /><Institutes /></> },
          { path: 'institutes/:instituteId', element: <><PageTitle title="Lecture Link | Institute" /><Institute /></> }
        ]},

      { path: 'programs', children: [
          { index: true, element: <><PageTitle title="Lecture Link | Programs" /><Programs /></> },
          { path: 'add-program', element: <><PageTitle title="Lecture Link | Update Program" /><UpdateProgramForm /></> },
          { path: ':programId', element: <><PageTitle title="Lecture Link | Program" /><Program /></> }
        ]},

      { path: 'subjects', children: [
          { index: true, element: <><PageTitle title="Subjects" /><Subjects /></> },
          { path: 'add-subject', element: <><PageTitle title="Lecture Link | Update Subject" /><UpdateSubjectForm /></> },
          { path: 'filtered-subjects', element: <><PageTitle title="Lecture Link | Filtered Subjects" /><FilteredSubjects /></> },
          { path: 'smartmatch-subjects', element: <><PageTitle title="Lecture Link | Smart Match Subjects" /><SmartMatchSubjects /></> },
          { path: ':subjectId', element: <><PageTitle title="Lecture Link | Subject" /><Subject /></> }
        ]},

      { path: 'lecturers', children: [
          { index: true, element: <><PageTitle title="Lecturers" /><Lecturers /></> },
          { path: 'filtered-lecturers', element: <><PageTitle title="Filtered Lecturers" /><FilteredLecturers /></> },
          { path: 'add-lecturer', element: <><PageTitle title="Lecture Link | Update Lecturer" /><UpdateLecturerForm /></> },
          { path: 'smartmatch-lecturers', element: <><PageTitle title="Smart Match Lecturers" /><SmartMatchLecturers /></> },
          { path: ':lecturerId', element: <><PageTitle title="Lecture Link | Lecturer" /><Lecturer /></> }
        ]},

      { path: 'qualifications', children: [
          { index: true, element: <><PageTitle title="Qualifications" /><Qualifications /></> },
          { path: 'add-qualification', element: <><PageTitle title="Update Qualification" /><UpdateQualificationForm /></> },
          { path: ':qualificationId', element: <><PageTitle title="Lecture Link | Qualification" /><Qualification /></> }
        ]},

      { path: 'settings', element: <><PageTitle title="Settings" /><Settings /></> },
      { path: '*', element: <><PageTitle title="404 Not Found" /><NotFound /></> },
    ],
  },
  { path: '*', element: <><PageTitle title="404 Not Found" /><NotFound /></> },
];
