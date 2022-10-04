import {useState} from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import "./LoginPage.css";

import logo from "../assets/img/icon/lofi_logo.png";
import kakao_button from "../assets/img/social_login/kakao_login_medium_wide.png";
import Google_button from "../assets/img/social_login/btn_google_signin_dark_normal_web@2x.png";
import google_Icon from "../assets/img/social_login/google_icon.png";
import axios from 'axios';
const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const onChangeEmail = (e : any) => {
    setEmail(e.target.value);
  }

  const onChangePassword = (e : any) => {
    setPassword(e.target.value)
  }

  //로그인 버튼
  const onLoginButton = (e : any) => {
    e.preventDefault();
    console.log(email)
    console.log(password)
    axios
      .post("/api/account/login",{
      email : email,
      password : password
    },
    {
      headers : {"Content-type": `application/json`}
    })
    .then((response) => {
      console.log(response.data.result);
      localStorage.setItem("token", response.data.result);
      navigate('/register')
    })
    .catch((error) => {
      console.log(error);
    });

};

  

  //회원가입 버튼 
  const onRegisterButton = (e : any) => {
    window.location.href="http://localhost:3000/register"
  }


  return (
    <div className="Login_container">
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
          <span className="login_text">E-mail</span>
          <input type="email" name="" id="" placeholder="Email" onChange={onChangeEmail} />
        </div>
        <div className="login_pw">
          <span className="login_text">Password</span>
          <input type="password" name="" id="" placeholder="Password" onChange={onChangePassword}/>
        </div>
        <div className="login_button">
            <button onClick={onLoginButton}>로그인</button>        
            <button onClick={onRegisterButton}>회원가입</button>

        </div>
        <div className="login_social_login">
          <a href="http://localhost:8080/oauth2/authorization/kakao">
              <img src={kakao_button} alt="카카오로 바로 시작"></img>
          </a>
          
          {/* <button className="login_socialLogin" type="button">
              <img src={Google_button} alt="카카오로 바로 시작"></img>
          </button> */}

          <a href="http://localhost:8080/oauth2/authorization/google" >
            <img src={Google_button} className="test" alt="Google_button"></img>
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
