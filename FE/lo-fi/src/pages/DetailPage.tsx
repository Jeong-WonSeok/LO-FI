import React, {useEffect, useState} from 'react';

import box from '../assets/img/icon/box.png'
import calendar from '../assets/img/icon/calendar.png'
import pin from '../assets/img/icon/pin.png'
import animal from '../assets/img/icon/animal.png'
import default_img from '../assets/img/icon/default_img.png'
import person from '../assets/img/icon/user.png'
import phone from '../assets/img/icon/phone-call.png'
import male from '../assets/img/icon/select_male.png'
import female from '../assets/img/icon/select_female.png'

import './DetailPage.css'
import BackTopNab from '../components/BackTopNab'
import { useParams } from 'react-router-dom';
import axios from '../api/axios'
import requests from '../api/requests'

export default function DetailPage() {
  const id = useParams();
  const [data, setData] = useState({
    id: 0,
    breed: '',
    name: '',
    gender: '',
    age: 0,
    ageNow: 0,
    location: '',
    foundLocation: '',
    safeLocation: '',
    date: '',
    time: '',
    category: '',
    description: '',
    dress: '',
    picture: [''],
    lat: 0,
    lon: 0
  })

  const getData = async () => {
    const params = { Id: id.id, category : id.category}
    
    // 데이터 받아오기
    const res =  await axios.get(requests.detail, {params})
    console.log('받은 데이터', res)
    setData((current) => {
      let newData = {...current}
      newData = res.data
      if (res.data.picture) {
        newData['picture'] = [res.data.picture]
      } else {
        newData['picture'] = ['']
      }
      return newData
    })
  }

  useEffect(() => {
   getData()
  }, [])
  
  switch (id.category) {
    case "animal":
      return(
        <div className='detail-container'>
      <BackTopNab back={"/search"}/>
      <div className='deatil-info-container'>
        {data.picture.map(image => {
          return (
            <img src={image ? image : default_img} alt="" />
          )
        })}
      
      <div className='detail-info'>
        <div className='detail-span'>
          <img src={pin} alt="" width={20} height={20}/>
          <span>{data.location}</span>
        </div>
        <div className='detail-span' >
          <img src={calendar} alt="" width={20} height={20} />
          <span>{data.date}</span>
        </div>
        <div className='detail-span'>
          <img src={animal} alt=""  width={20} height={20}/>
          <span>{data.name} / {data.breed} </span>
        </div>
        <div className='detail-span'>
          <img src={person} alt="" width={20} height={20} />
          <span>{data.description}</span>
        </div>
        <div className='detail-span'>
          <img src={phone} alt="" width={20} height={20} />
          <span>042-123-4567</span>
        </div>
      </div>
      <div className='detail-button'>
        <button>습득물 신고</button>
      </div>
      </div>
    </div>
      )
    case "person":
      return(
      <div className='detail-container'>
      <BackTopNab back={"/search"}/>
      <div className='deatil-info-container'>
        {data.picture.map(image => {
          return (
            <img src={image ? image : default_img} alt="" />
          )
        })}
      
      <div className='detail-info'>
        <div className='detail-span'>
          <img src={pin} alt="" width={20} height={20}/>
          <span>{data.location}</span>
        </div>
        <div className='detail-span' >
          <img src={calendar} alt="" width={20} height={20} />
          <span>{data.date} {'/' + data.time} </span>
        </div>
        <div className='detail-span'>
          <img src={data.gender === "male" ? male : female} alt=""  width={20} height={20}/>
          <span>{data.name} / {data.age} / {data.ageNow} </span>
        </div>
        <div className='detail-span'>
          <img src={person} alt="" width={20} height={20} />
          <span>{data.dress}</span>
        </div>
        <div className='detail-span'>
          <img src={phone} alt="" width={20} height={20} />
          <span>042-123-4567</span>
        </div>
      </div>
      <div className='detail-button'>
        <button>습득물 신고</button>
      </div>
      </div>
    </div>
      )
    case "article":
      return(
      <div className='detail-container'>
      <BackTopNab back={"/search"}/>
      <div className='deatil-info-container'>
        {data.picture.map(image => {
          return (
            <img src={image ? image : default_img} alt="" />
          )
        })}
      
      <div className='detail-info'>
        <div className='detail-span'>
          <img src={pin} alt="" width={20} height={20}/>
          <span>{data.foundLocation}</span>
        </div>
        <div className='detail-span' >
          <img src={calendar} alt="" width={20} height={20} />
          <span>{data.date} / {data.time} </span>
        </div>
        <div className='detail-span'>
          <img src={box} alt=""  width={20} height={20}/>
          <span>{data.name}</span>
        </div>
        <div className='detail-span'>
          <img src={person} alt="" width={20} height={20} />
          <span>{data.safeLocation}</span>
        </div>
        <div className='detail-span'>
          <img src={phone} alt="" width={20} height={20} />
          <span>042-123-4567</span>
        </div>
      </div>
      <div className='detail-button'>
        <button>습득물 신고</button>
      </div>
      </div>
    </div>
      )
    case "found":
      return (
        <div className='detail-container'>
          <BackTopNab back={"/search"}/>
          <div className='deatil-info-container'>
            {data.picture.map(image => {
              return (
                <img src={image ? image : default_img} alt="" />
              )
            })}
          
          <div className='detail-info'>
            <div className='detail-span'>
              <img src={pin} alt="" width={20} height={20}/>
              <span>{data.foundLocation}</span>
            </div>
            <div className='detail-span' >
              <img src={calendar} alt="" width={20} height={20} />
              <span>{data.date} / {data.time} </span>
            </div>
            <div className='detail-span'>
              <img src={box} alt=""  width={20} height={20}/>
              <span>{data.name}</span>
            </div>
            <div className='detail-span'>
              <img src={person} alt="" width={20} height={20} />
              <span>{data.safeLocation}</span>
            </div>
            <div className='detail-span'>
              <img src={phone} alt="" width={20} height={20} />
              <span>042-123-4567</span>
            </div>
          </div>
          <div className='detail-button'>
            <button>습득물 신고</button>
          </div>
          </div>
        </div>
      )
    default:
      return (
        <div>잘못된 접근입니다.</div>
      )
  }
}
