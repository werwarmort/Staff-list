import { ReactElement } from 'react';
import { Routes } from 'react-router';
import nested from './module/utils/nested.tsx';
import routes from './config/routes.tsx';
import { QueryClient, QueryClientProvider } from 'react-query';

function App(): ReactElement {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Routes>{nested(routes)}</Routes>
      </QueryClientProvider>
    </>
  );
}

export default App;
