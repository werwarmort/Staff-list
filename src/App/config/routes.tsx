import { RouteObject } from 'react-router';
import Layout from '../ui/Layout/Layout.tsx';
import HomePage from '@/pages/HomePage';
import EmployeeCard from '@/pages/EmployeeCard';

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
        path: '/employee/:id',
        element: <EmployeeCard />,
      },
    ],
  },
];

export default routes;
