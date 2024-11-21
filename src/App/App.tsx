import { ReactElement } from 'react';
import { Routes } from 'react-router';
import nested from './module/utils/nested.tsx';
import routes from './config/routes.tsx';

function App(): ReactElement {
  return (
    <>
      <Routes>{nested(routes)}</Routes>
    </>
  );
}

export default App;
