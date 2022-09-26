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

  // const [userData, setUserData] = useState([]);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [checkPassword, setCheckPassword] = useState<string>("");
  // const [provider, setProvider] = useState('lofi');
  const [id, setId] = useState<string>("");
  const [job, setJob] = useState<string>("");
  const [name, setName] = useState<string>("");


  const onChangeId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  };

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const onChangeJob = (e: React.ChangeEvent<HTMLInputElement>) => {
    setJob(e.target.value);
  };


  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onChangeCheckPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckPassword(e.target.value);
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

  //*************테스트용***************
  // const test = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   axios
  //     .post(
  //       "https://reqres.in/api/users",
  //       {
  //         job : job,
  //         name : name
  //       },
  //       {
  //         headers: { "Content-Type": `application/json` },
  //       }
  //     )
  //     .then((response) => {
  //       console.log(response.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  //backEnd로 회원가입 요청 보내기 (이메일, 비밀번호, 제공자)
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (email === "") {
      alert("이메일을 입력해주세요");
    }
    if (password === "") {
      alert("비밀번호를 입력해주세요");
    }

    axios
      .post("http://localhost:8080/api/register/signUp/", {
        email: email,
        password: password,
        provider: "lofi",
      },{
        headers : {"Content-type": `application/json`}
      })
      .then((response) => {
        console.log(response);
        window.location.href="http://localhost:3000/login"
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  return (
    <div className="register_container">
      {/* <form onSubmit={test} className="register">
        <div className="login_id">
          <span className="text">id</span>
          <input
            type="text"
            id="id"
            placeholder="id"
            onChange={onChangeId}
          />
        </div>
        <div className="login_id">
          <span className="text">job</span>
          <input
            type="text"
            id="job"
            placeholder="job"
            onChange={onChangeJob}
          />
        </div>
        <div className="login_id">
          <span className="text">name</span>
          <input
            type="text"
            id="name"
            placeholder="Name"
            onChange={onChangeName}
          />
        </div>
        <button>버튼</button>
      </form> */}


      <form onSubmit={onSubmit} className="register">
        <span id="register_text">회원가입</span>
        <a>{email}</a>
        {password}
        {checkPassword}
        <div className="login_id">
          <span className="text">E-mail</span>
          <input
            type="email"
            id="email"
            placeholder="Email"
            onChange={onChangeEmail}
          />
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
        </div>
        <button className="register_button">회원가입</button>
      </form>
    </div>
  );
};

export default RegisterPage;
