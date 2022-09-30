import React from 'react'
import arrowBack from '../assets/img/icon/arrow.png'
import { useNavigate } from 'react-router-dom'
import './BackTopNab.css'


export default function BackTopNab(back: any) {
const navigate = useNavigate();
  return (
    <div className='detail-top-nav'> 
      <img className="detail-back" src={arrowBack} alt="" width={25} height={25} onClick={() => navigate(back.back)}/>
    </div>
  ) 
}