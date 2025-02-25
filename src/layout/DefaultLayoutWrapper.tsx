import { Outlet } from 'react-router-dom';
import DefaultLayout from './DefaultLayout.tsx';

function DefaultLayoutWrapper() {
  return (
    <DefaultLayout>
      <Outlet />
    </DefaultLayout>
  );
}

export default DefaultLayoutWrapper;
