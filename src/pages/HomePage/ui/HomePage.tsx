import { ReactElement } from 'react';
import EmployeesTable from '@/widgets/EmployeesTable';

const HomePage = (): ReactElement => {
  return (
    <div>
      <EmployeesTable />
    </div>
  );
};

export default HomePage;
