import axios from "axios";
import { stringify } from "querystring";
import React, { ReactEventHandler } from "react";
import { useState } from "react";
import { collapseTextChangeRangesAcrossMultipleVersions } from "typescript";
import "./RegisterPage.css";

const RegisterPage = () => {
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

  //***********이메일************** */
  // const onCheckEmail = (e: any) => {
  // axios
  //   .get("http://localhost:8080/api/account/emailCheck/", {

  //     email : {email}

  //   })
  // }

  //backEnd로 회원가입 요청 보내기 (이메일, 비밀번호, 제공자)
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axios
      .post(
        "http://localhost:8080/api/register/signUp/",
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
        console.log(response);
        window.location.href = "http://localhost:3000/login";
      })
      .catch((error) => {
        console.log(error.response);
      });
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
        <button className="register_button">이메일 인증</button>
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
        <button disabled={!(isEmail&&isPassword&&isCheckPassword)} className="register_button">회원가입</button>
      </form>
    </div>
  );
};

export default RegisterPage;
