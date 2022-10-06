// import { useEffect } from "react";
import React from 'react';
import { useLocation, useNavigate } from "react-router-dom";
// import { REDIRECT_URI, REST_API_KEY } from "./KaKaoLoginData";


const GoogleLogin = () => {
  //토큰 값 변수에 저장
  const token = useLocation().search.split("=")[1];
  //localStorage에 토큰 값 저장 후 렌더링
  localStorage.setItem("token", token);
  window.location.href="/"
   return <div></div>;
};

export default GoogleLogin;
