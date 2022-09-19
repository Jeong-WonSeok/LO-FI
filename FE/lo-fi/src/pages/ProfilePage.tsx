import React from 'react'
import './ProfilePage.css'

export default function ProfilePage() {
  const user = {
    id : 1,
    username: "이싸피",
    point: 0,
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
      </div>
    </div>
  )
}
