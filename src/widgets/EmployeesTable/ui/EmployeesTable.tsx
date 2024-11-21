import { ReactElement, useState } from 'react';
import { Table, Image } from 'antd';
import employees from '../../../App/api/employees.json';
import EmployeeSearch from '@/features/EmployeeSearch/ui';

const EmployeesTable = (): ReactElement => {
  const [searchText, setSearchText] = useState<string>('');

  // преобразуем данные для отображения
  const transformedEmployees = employees.map(employee => ({
    ...employee,
    birthDate: new Date(employee.birthDate).toLocaleDateString(),
    photo: employee.photo || 'default-photo-url.jpg', // todo: добавить заглушку
  }));

  // фильтр сотрудников
  const filteredEmployees = transformedEmployees.filter(employee => {
    const fullName =
      `${employee.firstName} ${employee.lastName} ${employee.middleName}`.toLowerCase();
    return fullName.includes(searchText.toLowerCase());
  });

  // конфиг таблицы todo: вынести
  const columns = [
    {
      title: 'Фото',
      dataIndex: 'photo',
      key: 'photo',
      render: (photo: string) => (
        <Image width={50} src={photo} alt="фото работника" />
      ),
    },
    {
      title: 'Фамилия',
      dataIndex: 'lastName',
      key: 'lastName',
    },
    {
      title: 'Имя',
      dataIndex: 'firstName',
      key: 'firstName',
    },
    {
      title: 'Отчество',
      dataIndex: 'middleName',
      key: 'middleName',
    },
    {
      title: 'Департамент',
      dataIndex: 'department',
      key: 'department',
    },
    {
      title: 'Должность',
      dataIndex: 'post',
      key: 'post',
    },
    {
      title: 'Дата рождения',
      dataIndex: 'birthDate',
      key: 'birthDate',
    },
  ];

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
      />
    </div>
  );
};

export default EmployeesTable;
