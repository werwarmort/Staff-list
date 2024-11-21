import { RouteObject } from 'react-router';
import Layout from '../ui/Layout/Layout.tsx';
import HomePage from '@/pages/HomePage';

const routes: RouteObject[] = [
  {
    path: '',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/employee',
        element: <div>EmployeePage</div>,
      },
    ],
  },
];

export default routes;
