import axios from 'axios';
import { env } from 'process';

const instance = axios.create({
  baseURL: "http://localhost:8080/",
  params: {
    // 잠시 테스트를 위해 사용함
    servicekey: process.env.REACT_APP_LOST_ITEM_KEY
  },  
});

export default instance;