import { Navigate, type RouteObject } from 'react-router-dom';
import DefaultLayoutWrapper from '../layout/DefaultLayoutWrapper.tsx';
import PageTitle from '../components/Miscellaneous/PageTitle.tsx';
import SignIn from './../pages/Authentication/SignIn';
import SignUp from './../pages/Authentication/SignUp';
import Dashboard from './../pages/Dashboard/Dashboard';
import Institute from '../pages/Institute/Institute.tsx';
import UpdateInstituteForm from '../components/Forms/UpdateInstituteForm.tsx';
import Institutes from './../pages/Institute/Institutes';
import Programs from './../pages/Institute/Programs';
import UpdateProgramForm from '../components/Forms/UpdateProgramForm.tsx';
import Subjects from './../pages/Institute/Subjects';
import UpdateSubjectForm from '../components/Forms/UpdateSubjectForm.tsx';
import FilteredSubjects from './../pages/Institute/FilteredSubjects';
import Lecturers from './../pages/Lecturer/Lecturers';
import FilteredLecturers from './../pages/Lecturer/FilteredLecturers';
import AiMatchLecturers from '../pages/Lecturer/AiMatchLecturers.tsx';
import Qualifications from './../pages/Lecturer/Qualifications';
import UpdateQualificationForm from '../components/Forms/UpdateQualificationForm.tsx';
import NotFound from '../components/Miscellaneous/NotFound';
import ProgramView from '../pages/Institute/ProgramView.tsx';
import Subject from '../pages/Institute/Subject.tsx';
import Qualification from '../pages/Lecturer/Qualification.tsx';
import Lecturer from '../pages/Lecturer/Lecturer.tsx';
import UpdateLecturerForm from '../components/Forms/UpdateLecturerForm.tsx';
import About from '../pages/Dashboard/About.tsx';
import PricingCard from '../pages/Lecturer/PricingCard.tsx';
import LecturerProfile from '../pages/Lecturer/LecturerProfile.tsx';
import InstituteProfile from '../pages/Institute/InstituteProfile.tsx';
import AddSubjectForm from '../components/Forms/AddSubjectForm.tsx';
import AddQualificationForm from '../components/Forms/AddQualificationForm.tsx';
import SubjectView from '../pages/Institute/SubjectView.tsx';
import PaymentSuccess from '../pages/Lecturer/PaymentSuccess.tsx';

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
      { path: 'about', element: <><PageTitle title="Lecture Link | Dashboard" /><About /></> },

      { path: 'institutes', children: [
          { index: true, element: <><PageTitle title="Institutes" /><Institutes /></> },
          { path: ':instituteId', element: <><PageTitle title="Lecture Link | Institute" /><Institute /></> },
          { path: 'settings', element: <><PageTitle title="Lecture Link | Settings" /><UpdateInstituteForm /></> },
        ]},

      { path: 'profile', children: [
          { index: true, element: <><PageTitle title={`Lecture Link | ${localStorage.getItem("role") === 'INSTITUTE' ? "Institute" : "Lecturer"}`} />{localStorage.getItem("role") === 'INSTITUTE' ? <InstituteProfile /> : <LecturerProfile/>}</> },
          { path: 'update-institute/:instituteId', element: <><PageTitle title="Lecture Link | Update Institute" /><UpdateInstituteForm /></> },
          { path: 'update-lecturer/:lecturerId', element: <><PageTitle title="Lecture Link | Update Lecturer" /><UpdateLecturerForm /></> },
          { path: 'pricing-card', element:<><PageTitle title="Lecture Link | Pay" /><PricingCard /></> },
          { path: 'sucsess', element:<><PageTitle title="Lecture Link | Payment Success" /><PaymentSuccess /></>},
        ]},

      { path: 'programs', children: [
          { index: true, element: <><PageTitle title="Lecture Link | Programs" /><Programs /></> },
          { path: 'add-program', element: <><PageTitle title="Lecture Link | Add Program" /><UpdateProgramForm /></> },
          { path: 'update-program/:programId', element: <><PageTitle title="Lecture Link | Update Program" /><UpdateProgramForm /></> },
          { path: ':programId', element: <><PageTitle title="Lecture Link | Program" /><ProgramView /></> }
        ]},

      { path: 'subjects', children: [
          { index: true, element: <><PageTitle title="Subjects" /><Subjects /></> },
          { path: 'add-subject', element: <><PageTitle title="Lecture Link | Add Subject" /><AddSubjectForm /></> },
          { path: 'update-subject/:subjectId', element: <><PageTitle title="Lecture Link | Update Subject" /><UpdateSubjectForm /></> },
          { path: 'filtered-subjects', element: <><PageTitle title="Lecture Link | Filtered Subjects" /><FilteredSubjects /></> },
          { path: 'filtered-subjects/:subjectId', element: <><PageTitle title="Lecture Link | Filtered Subjects" /><SubjectView /></> },
          { path: ':subjectId', element: <><PageTitle title="Lecture Link | Subject" /><Subject /></> }
        ]},

      { path: 'lecturers', children: [
          { index: true, element: <><PageTitle title="Lecturers" /><Lecturers /></> },
          { path: 'filtered-lecturers', element: <><PageTitle title="Filtered Lecturers" /><FilteredLecturers /></> },
          { path: 'aimatch-lecturers', element: <><PageTitle title="AI Match Lecturers" /><AiMatchLecturers /></> },
          { path: ':lecturerId', element: <><PageTitle title="Lecture Link | Lecturer" /><Lecturer /></> },
          { path: 'settings', element: <><PageTitle title="Lecture Link | Settings" /><UpdateLecturerForm /></> },
        ]},

      { path: 'qualifications', children: [
          { index: true, element: <><PageTitle title="Qualifications" /><Qualifications /></> },
          { path: 'add-qualification', element: <><PageTitle title="Add Qualification" /><AddQualificationForm /></> },
          { path: 'update-qualification/:qualificationId', element: <><PageTitle title="Update Qualification" /><UpdateQualificationForm /></> },
          { path: ':qualificationId', element: <><PageTitle title="Lecture Link | Qualification" /><Qualification /></> }
        ]},

      { path: '*', element: <><PageTitle title="404 Not Found" /><NotFound /></> },
    ],
  },
  { path: '*', element: <><PageTitle title="404 Not Found" /><NotFound /></> },
];
