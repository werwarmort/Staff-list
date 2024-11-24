import axios from 'axios';

const fetchEmployees = async (page: number, pageSize: number) => {
  const response = await axios.get('/api/employees', {
    params: { page, pageSize },
  });
  return response.data;
};

export default fetchEmployees;
