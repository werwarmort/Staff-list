import { ReactElement, useState } from 'react';
import { Table, Spin, Alert } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import EmployeeSearch from '@/features/EmployeeSearch/ui';
import { columns } from '@/pages/EmployeeCard/config/columnsConfig.tsx';
import defaultPhoto from '@/shared/assets/userEmployee.svg';
import IEmployee from '@/shared/interfaces/IEmployee.ts';
import fetchEmployees from '@/pages/HomePage/services/fetchEmployees.ts';

const EmployeesTable = (): ReactElement => {
  const [searchText, setSearchText] = useState<string>('');
  const navigate = useNavigate();

  const { data, error, isLoading } = useQuery('employees', fetchEmployees);

  // преобразуем данные для отображения
  const transformedEmployees =
    data?.map((employee: IEmployee) => ({
      ...employee,
      birthDate: new Date(employee.birthDate).toLocaleDateString(),
      photo: employee.photo || defaultPhoto,
    })) || [];

  // фильтр сотрудников
  const filteredEmployees = transformedEmployees.filter(
    (employee: IEmployee) => {
      const fullName =
        `${employee.firstName} ${employee.lastName} ${employee.middleName}`.toLowerCase();
      return fullName.includes(searchText.toLowerCase());
    },
  );

  // обработчик изменения текста поиска
  const handleSearch = (value: string) => {
    setSearchText(value);
  };

  if (isLoading) {
    return <Spin />;
  }

  if (error instanceof Error) {
    return <Alert message="Ошибка" description={error.message} type="error" />;
  }

  return (
    <div>
      <h1>Список сотрудников</h1>
      <EmployeeSearch onSearch={handleSearch} />
      <Table
        dataSource={filteredEmployees}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 5 }}
        onRow={record => ({
          onClick: () => {
            navigate(`/employee/${record.id}`);
          },
        })}
      />
    </div>
  );
};

export default EmployeesTable;
