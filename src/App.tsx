import { useRoutes } from 'react-router-dom';
import { routes } from './routes/AppRoutes.tsx';
import LoaderWrapper from './common/Loader/LoaderWrapper';

function App() {
  const wrappedRoutes = useRoutes(routes);
  return <LoaderWrapper>{wrappedRoutes}</LoaderWrapper>;
}

export default App;
