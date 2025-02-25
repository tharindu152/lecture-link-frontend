import { Navigate, Outlet } from 'react-router-dom';
import { type RouteObject, useRoutes } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import DefaultLayout from './layout/DefaultLayout';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Calendar from './pages/UiElements/Calendar.tsx';
import Chart from './pages/UiElements/Chart.tsx';
import Dashboard from './pages/Dashboard/Dashboard.tsx';
import FormLayout from './pages/Form/FormLayout';
import Institute from './pages/Institute/Institute.tsx';
import Settings from './pages/UiElements/Settings.tsx';
import Programs from './pages/Institute/Programs.tsx';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import Program from './pages/Institute/Program.tsx';
import UpdateInstituteForm from './pages/Form/UpdateInstituteForm';
import UpdateProgramForm from './pages/Form/UpdateProgramForm';
import Subjects from './pages/Institute/Subjects.tsx';
import Subject from './pages/Institute/Subject.tsx';
import UpdateSubjectForm from './pages/Form/UpdateSubjectForm';
import NotFound from './pages/UiElements/NotFound.tsx';
import { useEffect, useState } from 'react';
import Lecturers from './pages/Lecturer/Lecturers.tsx';
import Lecturer from './pages/Lecturer/Lecturer.tsx';
import UpdateLecturerForm from './pages/Form/UpdateLecturerForm.tsx';
import FilteredLecturers from './pages/Lecturer/FilteredLecturers.tsx';
import SmartMatchLecturers from './pages/Lecturer/SmartMatchLecturers.tsx';
import Institutes from './pages/Institute/Institutes.tsx';
import Qualification from './pages/Lecturer/Qualification.tsx';
import Qualifications from './pages/Lecturer/Qualifications.tsx';
import UpdateQualificationForm from './pages/Form/UpdateQualificationForm.tsx';
import FilteredSubjects from './pages/Institute/FilteredSubjects.tsx';
import SmartMatchSubjects from './pages/Institute/SmartMatchSubjects.tsx';
import useColorMode from './hooks/useColorMode.tsx';

function App() {
  const routes: RouteObject[] = [
    // Redirect base path to `/auth/signin`
    {
      path: '/',
      element: <Navigate to="/auth/signin" />,
    },
    // Authentication routes
    {
      path: 'auth',
      children: [
        {
          path: 'signin',
          element: (
            <>
              <PageTitle title="Lecture Link | SignIn" />
              <SignIn />
            </>
          ),
        },
        {
          path: 'signup',
          element: (
            <>
              <PageTitle title="Lecture Link | SignUp" />
              <SignUp />
            </>
          ),
        },
      ],
    },
    // Protected App Routes (with DefaultLayout)
    {
      path: 'app',
      element: <DefaultLayoutWrapper />,
      children: [
        {
          index: true,
          element: <Navigate to="dashboard" />, // Redirect `/app` to `/app/dashboard`
        },
        {
          path: 'dashboard',
          element: (
            <>
              <PageTitle title="Lecture Link | Dashboard" />
              <Dashboard />
            </>
          ),
        },
        {
          path: 'profile',
          children: [
            {
              index: true, // `/app/profile`
              element: (
                <>
                  <PageTitle title="Lecture Link | Institute" />
                  <Institute />
                </>
              ),
            },
            {
              path: 'update-institute',
              element: (
                <>
                  <PageTitle title="Lecture Link | Update Institute Form" />
                  <UpdateInstituteForm />
                </>
              ),
            },
            {
              path: 'institutes',
              element: (
                <>
                  <PageTitle title="Lecture Link | Institutes" />
                  <Institutes />
                </>
              ),
            },
            {
              path: 'institutes/:instituteId',
              element: (
                <>
                  <PageTitle title="Lecture Link | Institutes" />
                  <Institute />
                </>
              ),
            },
          ],
        },
        {
          path: 'programs',
          children: [
            {
              index: true, // `/app/programs`
              element: (
                <>
                  <PageTitle title="Lecture Link | Programs" />
                  <Programs />
                </>
              ),
            },
            {
              path: 'add-program', // `/app/programs/add-program`
              element: (
                <>
                  <PageTitle title="Lecture Link | Update Program Form" />
                  <UpdateProgramForm />
                </>
              ),
            },
            {
              path: ':programId', // `/app/programs/:programId`
              element: (
                <>
                  <PageTitle title="Lecture Link | Program" />
                  <Program />
                </>
              ),
            },
          ],
        },
        {
          path: 'subjects',
          children: [
            {
              index: true, // `/app/subjects`
              element: (
                <>
                  <PageTitle title="Lecture Link | Subjects" />
                  <Subjects />
                </>
              ),
            },
            {
              path: 'add-subject',
              element: (
                <>
                  <PageTitle title="Lecture Link | Update Subject Form" />
                  <UpdateSubjectForm />
                </>
              ),
            },
            {
              path: 'filtered-subjects',
              element: (
                <>
                  <PageTitle title="Lecture Link | Subjects" />
                  <FilteredSubjects />
                </>
              ),
            },
            {
              path: 'smartmatch-subjects', // `/app/subjects`
              element: (
                <>
                  <PageTitle title="Lecture Link | Subjects" />
                  <SmartMatchSubjects />
                </>
              ),
            },
            {
              path: ':subject', // `/app/subjects/:subject`
              element: (
                <>
                  <PageTitle title="Lecture Link | Subject" />
                  <Subject />
                </>
              ),
            },
          ],
        },
        {
          path: 'qualifications',
          children: [
            {
              index: true, // `/app/subjects`
              element: (
                <>
                  <PageTitle title="Lecture Link | Qualifications" />
                  <Qualifications />
                </>
              ),
            },
            {
              path: 'add-qualification',
              element: (
                <>
                  <PageTitle title="Lecture Link | Update Qualification Form" />
                  <UpdateQualificationForm />
                </>
              ),
            },
            {
              path: ':qualificationId', // `/app/subjects/:subject`
              element: (
                <>
                  <PageTitle title="Lecture Link | Qualification" />
                  <Qualification/>
                </>
              ),
            },
          ],
        },
        {
          path: 'lecturers',
          children: [
            {
              index: true, // `/app/lecturers`
              element: (
                <>
                  <PageTitle title="Lecture Link | lecturers" />
                  <Lecturers />
                </>
              ),
            },
            {
              path: 'filtered-lecturers', // `/app/lecturers`
              element: (
                <>
                  <PageTitle title="Lecture Link | lecturers" />
                  <FilteredLecturers />
                </>
              ),
            },
            {
              path: 'smartmatch-lecturers', // `/app/lecturers`
              element: (
                <>
                  <PageTitle title="Lecture Link | lecturers" />
                  <SmartMatchLecturers />
                </>
              ),
            },
            {
              path: 'add-lecturer',
              element: (
                <>
                  <PageTitle title="Lecture Link | Update Lecturer Form" />
                  <UpdateLecturerForm />
                </>
              ),
            },
            {
              path: ':lecturerId', // '/app/lecturers/:lecturer-id'
              element: (
                <>
                  <PageTitle title="Lecture Link | lecturer" />
                  <Lecturer />
                </>
              ),
            },
          ],
        },
        {
          path: 'calendar',
          element: (
            <>
              <PageTitle title="Lecture Link | Calendar" />
              <Calendar />
            </>
          ),
        },
        {
          path: 'forms/form-layout',
          element: (
            <>
              <PageTitle title="Lecture Link | FormLayout" />
              <FormLayout />
            </>
          ),
        },
        {
          path: 'settings',
          element: (
            <>
              <PageTitle title="Lecture Link | Settings" />
              <Settings />
            </>
          ),
        },
        {
          path: 'chart',
          element: (
            <>
              <PageTitle title="Lecture Link | Chart" />
              <Chart />
            </>
          ),
        },
        {
          path: 'ui',
          children: [
            {
              path: 'alerts',
              element: (
                <>
                  <PageTitle title="Lecture Link | Alerts" />
                  <Alerts />
                </>
              ),
            },
            {
              path: 'buttons',
              element: (
                <>
                  <PageTitle title="Lecture Link | Buttons" />
                  <Buttons />
                </>
              ),
            },
          ],
        },
        // Catch-all route within `/app` for unmatched paths
        {
          path: '*',
          element: (
            <>
              <PageTitle title="Lecture Link | 404" />
              <NotFound />
            </>
          ),
        },
      ],
    },
    // Global catch-all route (for paths outside `/auth` and `/app`)
    {
      path: '*',
      element: (
        <>
          <PageTitle title="Lecture Link | 404" />
          <NotFound />
        </>
      ),
    },
  ];

  const wrappedRoutes = useRoutes(routes);

  return (
    <div>
      <LoaderWrapper>{wrappedRoutes}</LoaderWrapper>
    </div>
  );
}

// DefaultLayout wrapper for protected routes
function DefaultLayoutWrapper() {
  return (
    <DefaultLayout>
      <Outlet />
    </DefaultLayout>
  );
}

// Loader wrapper to keep the loader functionality
function LoaderWrapper({ children }: { readonly children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  useColorMode();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000); // Simulating a loading state
    return () => clearTimeout(timer); // Cleanup timer
  }, []);

  if (loading) {
    return <Loader />;
  }

  return <>{children}</>;
}

export default App;