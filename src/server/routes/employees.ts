import * as express from 'express';
import { Request, Response } from 'express';
import { getEmployeeById, getEmployees } from '../services/employeeService';

const employeesRoutes = express.Router();

// GET запрос ~ /api/employees?page=1&pageSize=10
employeesRoutes.get('/', (req, res) => {
  const page = parseInt(req.query.page as string) || 1; // текущая страница, по умолчанию 1
  const pageSize = parseInt(req.query.pageSize as string) || 5; // размер страницы, по умолчанию 5

  const { employees, totalEmployees, totalPages } = getEmployees(
    page,
    pageSize,
  );

  res.json({
    employees, // список сотрудников для текущей страницы
    totalEmployees, // общее количество сотрудников
    totalPages, // общее количество страниц
    currentPage: page, // текущая страница
  });
});

// GET /api/employees/:id
employeesRoutes.get('/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const employee = getEmployeeById(id);
  if (employee) {
    res.json(employee);
  } else {
    res.status(404).json({ error: 'Employee not found' });
  }
});

export default employeesRoutes;
