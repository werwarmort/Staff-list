import { ReactElement, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Button, Descriptions, Avatar, Spin } from 'antd';
import employees from '../../../App/api/employees.json';
import IEmployee from '@/pages/EmployeeCard/interfaces/IEmployee.ts';

const EmployeeCard = (): ReactElement => {
  const { id } = useParams();
  const [employee, setEmployee] = useState<IEmployee | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const employeeData = employees.find(emp => emp.id === Number(id));
    if (employeeData) {
      setEmployee(employeeData);
    }
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <Spin size="large" />
      </div>
    );
  }

  if (!employee) {
    return <div>Сотрудник не найден</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <Button
        type="primary"
        style={{ marginBottom: '20px' }}
        onClick={() => navigate(-1)}
      >
        Назад
      </Button>
      <Card
        title={`Карточка сотрудника: ${employee.firstName} ${employee.lastName}`}
        extra={
          <Avatar
            src={employee.photo || 'default-photo-url.jpg'}
            size={100}
            alt="employee-photo"
          />
        }
        style={{ maxWidth: '800px', margin: '0 auto' }}
      >
        <Descriptions bordered column={1}>
          <Descriptions.Item label="Фамилия">
            {employee.lastName}
          </Descriptions.Item>
          <Descriptions.Item label="Имя">
            {employee.firstName}
          </Descriptions.Item>
          <Descriptions.Item label="Отчество">
            {employee.middleName}
          </Descriptions.Item>
          <Descriptions.Item label="Департамент">
            {employee.department}
          </Descriptions.Item>
          <Descriptions.Item label="Должность">
            {employee.post}
          </Descriptions.Item>
          <Descriptions.Item label="Дата рождения">
            {new Date(employee.birthDate).toLocaleDateString()}
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </div>
  );
};

export default EmployeeCard;
