import axios from 'axios';

const instance = axios.create({
  baseURL: "https://j7b102.p.ssafy.io:8085/",
  // baseURL: "http://localhost:8080/",
  headers: {
    Authorization: 'Bearer ' + localStorage.getItem('token')!
  },  
});

export default instance;