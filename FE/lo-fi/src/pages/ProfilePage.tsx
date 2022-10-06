import React, { useEffect, useState } from "react";
import "./ProfilePage.css";
import { useSelector } from "react-redux";
import { RootState } from "../redux/modules/store";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

export default function ProfilePage() {
  const navigate = useNavigate();
  const reduxEmail = useSelector((state: RootState) => state.user.email);
  const reduxId = useSelector((state: RootState) => state.user.id);

  const [id, setId] = useState(0);
  const [email, setEmail] = useState("");
  const [point, setPoint] = useState(0);

  axios
    .get("http://localhost:8080/api/register/myPage", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
    .then((response) => {
      const data = response.data.result;

      setId(response.data.id);
      setEmail(response.data.email);
      setPoint(response.data.point);

    })
    .catch((error) => {
      console.log(error);
    });
  //로그아웃처리
  const onDeleteToken = () => {
    //로컬스토리지 토큰 값 지우기
    localStorage.clear();
    //토큰 값 지워지고 메인으로
    navigate('/')
  }

  return (
    <div className='profile-container'>
      <h1 className='profile-username'>{email}</h1>
      <div className='profile-userinfo'>
        <div className='profile-component profile-point'>
          <p>포인트</p>
          <p>{point}p</p>
        </div>
        <hr />
        <div className='profile-component'>
          잃어버렸어요
        </div>
        <hr />
        <div className='profile-component'>
          주인을 찾고있어요
        </div>
        <hr />
        <div className='profile-component'>
          회원정보
        </div>
        <hr/>
        <div className='profile-component'>
          <button onClick={onDeleteToken}>로그아웃</button>
        </div>
      </div>
    </div>
  )
}
