import { employees } from '../data/employees';

export const getEmployees = (page: number, pageSize: number) => {
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  return employees.slice(startIndex, endIndex);
};

export const getEmployeeById = (id: number) => {
  return employees.find(emp => emp.id === id) || null;
};
