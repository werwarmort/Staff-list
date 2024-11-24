import axios from 'axios';

const fetchEmployees = async () => {
  const response = await axios.get('/api/employees');
  return response.data;
};

export default fetchEmployees;
