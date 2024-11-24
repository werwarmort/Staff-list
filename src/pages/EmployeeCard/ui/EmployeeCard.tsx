import { ReactElement } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Button, Descriptions, Avatar, Spin, Alert } from 'antd';
import { useQuery } from 'react-query';
import IEmployee from '@/shared/interfaces/IEmployee.ts';
import styles from './EmployeeCard.module.scss';
import descriptionFields from '@/pages/EmployeeCard/config/descriptionFields.ts';
import defaultPhoto from '@/shared/assets/userEmployee.svg';
import fetchEmployeeById from '@/pages/EmployeeCard/services/fetchEmployeeById.ts';

const EmployeeCard = (): ReactElement => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: employee,
    error,
    isLoading,
  } = useQuery<IEmployee, Error>(
    ['employee', id],
    () => fetchEmployeeById(Number(id)),
    { enabled: !!id },
  );

  if (isLoading) {
    return (
      <div className={styles.spinContainer}>
        <Spin size="large" />
      </div>
    );
  }

  if (error instanceof Error) {
    return <Alert message="Ошибка" description={error.message} type="error" />;
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
            src={employee.photo || defaultPhoto}
            size={100}
            alt="employee-photo"
            className={styles.userPhoto}
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
