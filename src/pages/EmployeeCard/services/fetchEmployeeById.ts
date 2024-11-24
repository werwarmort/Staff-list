import axios from 'axios';

const fetchEmployeeById = async (id: number) => {
  const response = await axios.get(`/api/employees/${id}`);
  return response.data;
};

export default fetchEmployeeById;
