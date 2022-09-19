import React from 'react';
import "./LoginPage.css";

import logo from "../assets/img/icon/lofi_logo.png";
import kakao_button from "../assets/img/social_login/kakao_login_medium_wide.png";
import Google_button from "../assets/img/social_login/btn_google_signin_dark_normal_web@2x.png";
import {REST_API_KEY, REDIRECT_URI} from "./KaKaoLoginData"
const LoginPage = () => {

    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

    const handleLogin = () => {
        window.location.href = KAKAO_AUTH_URL;
    }
  return (
    <div className="container">
      {/* <div className="bar"></div> */}
      <div className="login">
        <div className="login_logo">
          <img
            src={logo}
            className="login_logo_img"
            alt="로고 이미지"
            width={50}
            height={50}
          ></img>
          <span className="login_logo_text">LO-FI</span>
        </div>
        <div className="login_id">
          <span className="text">E-mail</span>
          <input type="email" name="" id="" placeholder="Email" />
        </div>
        <div className="login_pw">
          <span className="text">Password</span>
          <input type="password" name="" id="" placeholder="Password" />
        </div>
        <div className="login_button">
            <button >로그인</button>        
            <button >회원가입</button>

        </div>
        <button className="login_socialLogin" type="button" onClick={handleLogin}>
            <img src={kakao_button} alt="카카오로 바로 시작"></img>
        </button>
        <button className="login_socialLogin" type="button">
            <img src={Google_button} alt="카카오로 바로 시작"></img>
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
