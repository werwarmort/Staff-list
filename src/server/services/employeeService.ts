import { employees } from '../data/employees';

export const getEmployees = (page: number, pageSize: number) => {
  const totalEmployees = employees.length; // общее количество сотрудников
  const totalPages = Math.ceil(totalEmployees / pageSize); // общее количество страниц

  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const employeesPage = employees.slice(startIndex, endIndex);

  return {
    employees: employeesPage, // возвращаем сотрудников для текущей страницы
    totalEmployees, // общее количество сотрудников
    totalPages, // количество страниц
  };
};

export const getEmployeeById = (id: number) => {
  return employees.find(emp => emp.id === id) || null;
};
