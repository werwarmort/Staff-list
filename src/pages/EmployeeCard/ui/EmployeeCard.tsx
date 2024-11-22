import { ReactElement, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Button, Descriptions, Avatar, Spin } from 'antd';
import employees from '../../../App/api/employees.json';
import IEmployee from '@/pages/EmployeeCard/interfaces/IEmployee.ts';
import styles from './EmployeeCard.module.scss';
import descriptionFields from '@/pages/EmployeeCard/config/descriptionFields.ts';

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
      <div className={styles.spinContainer}>
        <Spin size="large" />
      </div>
    );
  }

  if (!employee) {
    return <div>Сотрудник не найден</div>;
  }

  return (
    <div className={styles.container}>
      <Button
        type="primary"
        className={styles.backButton}
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
        className={styles.card}
      >
        <Descriptions bordered column={1}>
          {descriptionFields.map(({ label, key, isDate }) => (
            <Descriptions.Item label={label} key={key}>
              {isDate
                ? new Date(
                    employee[key as keyof IEmployee],
                  ).toLocaleDateString()
                : employee[key as keyof IEmployee]}
            </Descriptions.Item>
          ))}
        </Descriptions>
      </Card>
    </div>
  );
};

export default EmployeeCard;
