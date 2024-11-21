import { RouteObject } from 'react-router';
import Layout from '../ui/Layout/Layout.tsx';

const routes: RouteObject[] = [
  {
    path: '',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <div>HomePage</div>,
      },
      {
        path: '/employee',
        element: <div>EmployeePage</div>,
      },
    ],
  },
];

export default routes;
