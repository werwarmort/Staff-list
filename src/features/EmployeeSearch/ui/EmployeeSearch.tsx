import { Input } from 'antd';
import { ChangeEvent } from 'react';

interface SearchProps {
  onSearch: (value: string) => void;
}

const EmployeeSearch = ({ onSearch }: SearchProps) => {
  return (
    <div style={{ marginBottom: '20px' }}>
      <Input.Search
        placeholder="Поиск по фамилии, имени или отчеству"
        allowClear
        enterButton="Поиск"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          onSearch(e.target.value)
        }
        style={{ width: 300 }}
      />
    </div>
  );
};

export default EmployeeSearch;
