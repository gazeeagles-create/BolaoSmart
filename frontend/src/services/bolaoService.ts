import axios from 'axios';

const API_URL = 'http://localhost:3001/api/bolao';

export const getBolaoDetails = async (id: string | undefined) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};
