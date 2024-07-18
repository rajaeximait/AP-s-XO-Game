import axios from 'axios';

const BASE_URL = 'http://localhost:3001/api';

export const startGameApi = () => {
  return axios.get(`${BASE_URL}/start`);
};

export const makeMoveApi = (row, col) => {
  return axios.post(`${BASE_URL}/move`, { row, col });
};
