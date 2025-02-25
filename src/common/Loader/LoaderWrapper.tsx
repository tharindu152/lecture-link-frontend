import { ReactNode, useEffect, useState } from 'react';
import Loader from './Loader.tsx';
import useColorMode from '../../hooks/useColorMode.tsx';

interface LoaderWrapperProps {
  children: ReactNode;
}

function LoaderWrapper({ children }: Readonly<LoaderWrapperProps>) {
  const [loading, setLoading] = useState(true);
  useColorMode();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return <>{children}</>;
}

export default LoaderWrapper