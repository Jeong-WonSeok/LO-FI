import React from 'react'
import arrowBack from '../assets/img/icon/arrow.png'
import close from '../assets/img/icon/close.png'
import { useNavigate } from 'react-router-dom'
import './BackTopNab.css'



type BackProps = {
    back: number;
}

export default function BackTopNab({back} : BackProps) {
const navigate = useNavigate();

  return (
    <div className='detail-top-nav'> 
      <img className="detail-back" src={back === -1 ? arrowBack : close} alt="" width={25} height={25} onClick={() => navigate(back)}/>
    </div>
  ) 
}