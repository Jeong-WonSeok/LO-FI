import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import './ProfilePage.css'

export default function ProfilePage() {
  const navigate = useNavigate()
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log('로그인 되지 않음')
      navigate('/login')
    }
  }, [])

  const user = {
    id : 1,
    username: "이싸피",
    point: 0,
  }

  //로그아웃처리
  const onDeleteToken = () =>{
    //로컬스토리지 토큰 값 지우기
    localStorage.clear();
    //토큰 값 지워지고 메인으로
    window.location.href='http://localhost:3000/'
  }

  return (
    <div className='profile-container'>
      <h1 className='profile-username'>{user.username}</h1>
      <div className='profile-userinfo'>
        <div className='profile-component profile-point'>
          <p>포인트</p>
          <p>{user.point}p</p>
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
