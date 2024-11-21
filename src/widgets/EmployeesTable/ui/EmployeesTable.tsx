import { ReactElement, useState } from 'react';
import { Table } from 'antd';
import { useNavigate } from 'react-router-dom';
import employees from '../../../App/api/employees.json';
import EmployeeSearch from '@/features/EmployeeSearch/ui';
import { columns } from '@/pages/EmployeeCard/config/columnsConfig.tsx';
import defaultPhoto from '@/shared/assets/userEmployee.svg';

const EmployeesTable = (): ReactElement => {
  const [searchText, setSearchText] = useState<string>('');
  const navigate = useNavigate();

  // преобразуем данные для отображения
  const transformedEmployees = employees.map(employee => ({
    ...employee,
    birthDate: new Date(employee.birthDate).toLocaleDateString(),
    photo: employee.photo || defaultPhoto,
  }));

  // фильтр сотрудников
  const filteredEmployees = transformedEmployees.filter(employee => {
    const fullName =
      `${employee.firstName} ${employee.lastName} ${employee.middleName}`.toLowerCase();
    return fullName.includes(searchText.toLowerCase());
  });

  // обработчик изменения текста поиска
  const handleSearch = (value: string) => {
    setSearchText(value);
  };

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
