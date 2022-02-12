import axios from 'axios';

const api = axios.create({
baseURL: `https://thdinformatica.herokuapp.com/`,
  proxy: {
    host: 'backend',
    port: 3333,
  },
});

export default api;
