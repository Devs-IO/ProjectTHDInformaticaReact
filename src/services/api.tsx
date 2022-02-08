import axios from 'axios';

const api = axios.create({
  baseURL: `http://localhost:3333`,
  proxy: {
    host: 'backend',
    port: 3333,
  },
});

export default api;
