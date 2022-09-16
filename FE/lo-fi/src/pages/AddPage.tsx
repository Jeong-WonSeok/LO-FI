import React from 'react'
import animal from '../assets/img/Category/color_dog.png'
import people from '../assets/img/Category/color_baby.png'
import lost_item from '../assets/img/Category/color_lost_item.png'
import take_item from '../assets/img/Category/color_take_item.png'
import './AddPage.css'
import BackTopNab from '../components/BackTopNab'
import { Link } from 'react-router-dom'


export default function AddPage() {
  return (
    <div className='add-container'>
      <BackTopNab back={-1}/>
      <h2 style={{fontSize: "30px"}}>무엇을 등록하시나요?</h2>
      <div className='add-buttons'>
        <Link to="/add/animal" className='add-button'>
          <img src={animal} alt="" width={55} height={55}/>
          <p>반려동물</p>
        </Link>
        <Link to="/add/people" className='add-button'>
          <img src={people} alt="" width={55} height={55}/>
          <p>사람</p>
        </Link>
        <Link to="/add/lost-item" className='add-button'>
          <img src={lost_item} alt="" width={55} height={55}/>
          <p>분실물</p>
        </Link>
        <Link to="/add/take-item" className='add-button'>
          <img src={take_item} alt="" width={55} height={55}/>
          <p>습득물</p>
        </Link>
      </div>
    </div>
  )
}
