import { Navigate, Outlet } from 'react-router-dom';
import DefaultLayout from './DefaultLayout.tsx';

function DefaultLayoutWrapper() {

  const issuer = localStorage.getItem("issuer");

  if (issuer !== import.meta
    // @ts-ignore
    .env.VITE_TOKEN_ISSUER) {
    return <Navigate to="/auth/signin" replace />;
  }

  return (
    <DefaultLayout>
      <Outlet />
    </DefaultLayout>
  );
}

export default DefaultLayoutWrapper;
