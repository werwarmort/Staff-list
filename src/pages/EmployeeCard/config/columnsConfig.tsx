import { ColumnType } from 'antd/es/table';
import IEmployee from '@/shared/interfaces/IEmployee.ts';

export const columns: ColumnType<IEmployee>[] = [
  {
    title: 'Фото',
    dataIndex: 'photo',
    key: 'photo',
    render: (photo: string) => (
      <img width={50} src={photo} alt="фото работника" />
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
