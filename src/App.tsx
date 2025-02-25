import { useRoutes } from 'react-router-dom';
import { routes } from './routes/AppRoutes.tsx';
import LoaderWrapper from './common/Loader/LoaderWrapper';
import { MainProvider } from './context/MainContext.tsx';

function App() {
  const wrappedRoutes = useRoutes(routes);
  return (
    <>
      <MainProvider>
        <LoaderWrapper>{wrappedRoutes}</LoaderWrapper>
      </MainProvider>
    </>
  );
}

export default App;
