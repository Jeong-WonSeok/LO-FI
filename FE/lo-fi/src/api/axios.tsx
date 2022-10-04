import axios from 'axios';

const instance = axios.create({
  // baseURL: "http://j7b102.p.ssafy.io:8085/",
  baseURL: "http://localhost:8080/",
  headers: {
    
  },  
});

export default instance;