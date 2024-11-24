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
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);

  const navigate = useNavigate();

  const { data, error, isLoading } = useQuery(
    ['employees', currentPage, pageSize], // зависимости запроса
    () => fetchEmployees(currentPage, pageSize),
    {
      keepPreviousData: true, // сохраняем старые данные при смене страницы
    },
  );

  if (isLoading) {
    return <Spin />;
  }

  if (error instanceof Error) {
    return <Alert message="Ошибка" description={error.message} type="error" />;
  }

  // преобразуем данные для отображения
  const transformedEmployees =
    data?.employees.map((employee: IEmployee) => ({
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

  const handleSearch = (value: string) => {
    setSearchText(value);
  };

  // обработчик изменения страницы
  const handlePageChange = (page: number, pageSize: number) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  return (
    <div>
      <h1>Список сотрудников</h1>
      <EmployeeSearch onSearch={handleSearch} />
      <Table
        dataSource={filteredEmployees}
        columns={columns}
        rowKey="id"
        pagination={{
          current: currentPage, // текущая страница
          pageSize: pageSize, // размер страницы
          total: data?.totalEmployees, // общее количество сотрудников
          onChange: handlePageChange, // обработчик изменения страницы
        }}
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
