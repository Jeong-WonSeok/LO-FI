// import axios from "axios";
import axios from "../api/axios";
import requests from "../api/requests";
import { stringify } from "querystring";
import React, { ReactEventHandler } from "react";
import { useState } from "react";
import { collapseTextChangeRangesAcrossMultipleVersions } from "typescript";
import "./RegisterPage.css";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();
  // const [user, setUser] = useState();

  // const handleRegister = (data:any) => {
  //   data.preventDefault();
  //   console.log(data);
  //   console.log(data.target);
  // }

  //이메일, 비밀번호, 비밀번호 확인
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [checkPassword, setCheckPassword] = useState<string>("");

  //오류메시지
  const [emailMessage, setEmailMessage] = useState<String>("");
  const [passwordMessage, setPasswordMessage] = useState<String>("");
  const [checkPasswordMessage, setCheckPasswordMessage] = useState<String>("");

  //유효성 검사
  const [isEmail, setIsEmail] = useState<boolean>(false);
  const [isPassword, setIsPassword] = useState<boolean>(false);
  const [isCheckPassword, setIsCheckPassword] = useState<boolean>(false);

  //이메일 체크 (백엔드에서 받아온 인증번호)
  const [emailAuth, setEmailAuth] = useState<String>("");

  //이메일 체크 (사용자가 입력한 인증번호)
  const [emailAuthInput, setEmailAuthInput] = useState<String>("");
  // const onChangeId = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setId(e.target.value);
  // };

  // const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setName(e.target.value);
  // };

  // const onChangeJob = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setJob(e.target.value);
  // };

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    const emailCurrent = e.target.value;
    setEmail(emailCurrent);

    if (!emailRegex.test(emailCurrent)) {
      setEmailMessage("이메일 형식을 확인해주세요.");
      setIsEmail(false);
    } else {
      setEmailMessage("올바른 형식입니다.");
      setIsEmail(true);
    }
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    const passwordCurrent = e.target.value;
    setPassword(passwordCurrent);

    if (!passwordRegex.test(passwordCurrent)) {
      setPasswordMessage("숫자+영문자+특수문자 조합 8자리 이상 입력해주세요.");
      setIsPassword(false);
    } else {
      setPasswordMessage("안전한 비밀번호입니다.");
      setIsPassword(true);
    }
  };

  const onChangeCheckPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checkPasswordCurrent = e.target.value;
    setCheckPassword(checkPasswordCurrent);
    if (password === checkPasswordCurrent) {
      setCheckPasswordMessage("비밀번호가 같습니다.");
      setIsCheckPassword(true);
    } else {
      setCheckPasswordMessage("비밀번호가 다릅니다.");
      setIsCheckPassword(false);
    }
  };

  const onCheckPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (password !== checkPassword) {
      alert("비밀번호를 확인해주세요");
    }
  };

  //사용자가 입력한 인증번호 값을 EmailAuthInput에 저장함
  const onChangeEmailAuth = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailAuthInput(e.target.value);
  }

  //***********이메일 체크************** */

  const onCheckEmail = () => {
    console.log(email);
    //로컬 테스트 api
    // axios.get(`http://localhost:8080/api/account/emailCheck?email=${email}`)
    //서버 api
    axios.get(requests.emailCheck+`?email=${email}`)
    .then((response) => {
      console.log(response);
      if (response.data==="exists") {
        alert("이미 존재하는 이메일입니다.")
        navigate('/login')
      } else {
        setEmailAuth(response.data);
      }
    })
    .catch((error) => {
      console.log(error);
    })
  };

  //backEnd로 회원가입 요청 보내기 (이메일, 비밀번호, 제공자)
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // console.log("서버에 저장된 인증번호")
    // console.log(emailAuth);
    // console.log("내가 보내는 인증번호")
    // console.log(emailAuthInput);
    
    // 인증번호를 입력하지 않은경우
    if(emailAuthInput=='') {
      alert("인증번호를 입력해주세요.")
    }
    // 입력한 인증번호와 실제 인증번호가 같을 경우
    else if(emailAuth==emailAuthInput) {
      axios
        .post(
          requests.signup,
          // "http://localhost:8080/api/register/signUp",
          {
            email: email,
            password: password,
            provider: "lofi",
          },
          {
            headers: { "Content-type": `application/json` },
          }
        )
        .then((response) => {
          // console.log(response);
          // window.location.href = "http://localhost:3000/login";
          navigate("/login");
        })
        .catch((error) => {
          // console.error(error.response);
        });
        //인증번호 다른 경우
    } else  {
      alert("다시 인증해주세요.")
    }

  };

  return (
    <div className="register_container">
      <form onSubmit={onSubmit} className="register">
        <span id="register_text">회원가입</span>

        <div className="login_id">
          <span className="text">E-mail</span>
          <input
            type="email"
            id="email"
            placeholder="Email"
            onChange={onChangeEmail}
          />
          {email.length > 0 && (
            <span
              className={` ${
                isEmail ? "register_success_color" : "register_error_color"
              }`}
            >
              {emailMessage}
            </span>
          )}
        </div>
        <button type="button" className="register_button" onClick={onCheckEmail}>
          인증번호 받기
        </button>
        <div className="login_id">
          <input
            type="password"
            id="emailcheck"
            placeholder="인증번호 입력"
            onChange={onChangeEmailAuth}
          />
        </div>
        <div className="login_id">
          <span className="text">비밀번호</span>
          <input
            type="password"
            id="password"
            placeholder="비밀번호"
            onChange={onChangePassword}
          />
          {password.length > 0 && (
            <span
              className={` ${
                isPassword ? "register_success_color" : "register_error_color"
              }`}
            >
              {passwordMessage}
            </span>
          )}
        </div>
        <div className="login_id">
          <span className="text">비밀번호 확인</span>
          <input
            type="password"
            id="checkPw"
            placeholder="비밀번호 확인"
            onChange={onChangeCheckPassword}
            onBlur={onCheckPassword}
          />
          {checkPassword.length > 0 && (
            <span
              className={` ${
                isCheckPassword
                  ? "register_success_color"
                  : "register_error_color"
              }`}
            >
              {checkPasswordMessage}
            </span>
          )}
        </div>
        <button
          disabled={!(isEmail && isPassword && isCheckPassword)}
          className="register_button"
        >
          회원가입
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
