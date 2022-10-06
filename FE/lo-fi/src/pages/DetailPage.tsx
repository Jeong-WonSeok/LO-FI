import React, {useEffect, useState} from 'react';
import styled from 'styled-components';

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
import DetailMap from '../components/DetailMap';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../api/axios'
import requests from '../api/requests'

// 캐로젤
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import MailModal from '../components/MailModal';

type dataType = {
  id: number,
  breed: string,
  name: string,
  gender: string,
  age: number,
  ageNow: number,
  location: string,
  foundLocation: string,
  safeLocation: string,
  police: string,
  policeTel: string,
  date: string,
  time: string,
  category: string,
  description: string,
  dress: string,
  picture: string,
  lat: number,
  lon: number,
  picture_list: string[]
  userId: number,
  email: string,
  phone: string,
}

type resType = {
  email: string,
  id: number,
  point: number
}

export default function DetailPage() {
  const navigate = useNavigate()
  const id = useParams();
  const [openModal, setOpenModal] = useState(false)
  const [openMailModal, setOpenMailModal] = useState(false)
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
    police: '',
    policeTel: '',
    date: '',
    time: '',
    category: '',
    description: '',
    dress: '',
    picture: '',
    picture_list: [''],
    lat: 0,
    lon: 0,
    userId: 0, 
    email: '',
    phone: ''
  })

  // 캐로젤 세팅
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    centerPadding: '0px'
  };

  const getData = async () => {
    const params = { Id: id.id, category : id.category}
    
    // 데이터 받아오기
    const res =  await axios.get(requests.detail, {params})
    console.log(res.data)
    const inputData:dataType = res.data
    // 이메일이 있다면 변경
    if (inputData.userId) {
      const userRes = await axios.get(requests.profile, {params: {userId: inputData.userId}})
      setData((prev) => ({
        ...prev,
        "email": userRes.data.email
      }))
    }
    
    setData((current) => {
      let newData = {...current}
      newData = inputData
      if (inputData.picture) { 
        const list = inputData.picture.split(' ')
        newData['picture_list'] = list.splice(0, list.length - 1)
      } else {
        newData['picture_list'] = ['']
      }
      return newData
    })
  }

  useEffect(() => {
   getData()
   
  const token = localStorage.getItem("token");
  if (!token) {
    console.log('로그인 되지 않음')
    navigate('/login')
  }
  }, [])

  const closeModal = () => {
    setOpenModal(false)
  }
  
  // 모달창 켜기
  const closeMail = () => {
    setOpenMailModal(false)
  }

  switch (id.category) {
    case "animal":
      return(
      <div className='detail-container'>
      <BackTopNab back={"/search"}/>
      <div className='deatil-info-container'>
        <div style={{width:"360px", padding: "10px"}}>
        {data.picture_list && <StyledSlider {...settings}>
            {data.picture_list.map((image, idx) => {
              return (
                <ProductImg src={image ? image : default_img} key={idx} alt=""/>
              )
            })}
          </StyledSlider>}
        {!data.picture_list && <ProductImg src={default_img} alt=""/> }
        </div>
      <div className='detail-info'>
        <div className='detail-span'>
          <img src={pin} alt="" width={20} height={20}/>
          <span>{data.location}</span>
          <button className="detail-map-open" onClick={() => setOpenModal(true)}>지도보기</button>
          {openModal && <DetailMap lon={data.lon} lat={data.lat} closeModal={closeModal}/>}
        </div>
        <div className='detail-span' >
          <img src={calendar} alt="" width={20} height={20} />
          <span>{data.date}</span>
        </div>
        <div className='detail-span'>
          <img src={animal} alt=""  width={20} height={20}/>
          <span>{data.name} / {data.breed} </span>
        </div>
        <div className='detail-span' style={{marginLeft: "20px"}}>
          <span>{data.description}</span>
        </div>
        <div className='detail-span'>
          <img src={phone} alt="" width={20} height={20} />
          <span>{data.email ? data.email : data.policeTel}</span>
        </div>
      </div>
      <div className='detail-button'>
      {data.email && <button onClick={() => setOpenMailModal(true)}>분실동물 신고</button>}
      {data.policeTel && <a style={{textDecoration: "none", color: "black"}} href={"tel:" + data.policeTel}>분실동물 신고</a>}
            
      </div>
      </div>
      {openMailModal && <MailModal closeMail={closeMail} email={data.email} />}
    </div>
      )
    case "person":
      return(
      <div className='detail-container'>
      <BackTopNab back={"/search"}/>
      <div className='deatil-info-container'>
        <div style={{width:"360px", padding: "10px"}}>
        {data.picture_list && <StyledSlider {...settings}>
            {data.picture_list.map((image, idx) => {
              return (
                <ProductImg src={image ? image : default_img} key={idx} alt=""/>
              )
            })}
          </StyledSlider>}
        </div>
      <div className='detail-info'>
        <div className='detail-span'>
          <img src={pin} alt="" width={20} height={20}/>
          <span>{data.location}</span>
          <button className="detail-map-open" onClick={() => setOpenModal(true)}>지도보기</button>
          {openModal && <DetailMap lon={data.lon} lat={data.lat} closeModal={closeModal}/>}
        </div>
        <div className='detail-span' >
          <img src={calendar} alt="" width={20} height={20} />
          <span>{data.date} {'/ ' + data.time.slice(0,5)} </span>
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
          <span>{data.email ? data.email : data.policeTel}</span>
        </div>
      </div>
      <div className='detail-button'>
      {data.email && <button onClick={() => setOpenMailModal(true)}>실종자 신고</button>}
      {data.policeTel && <a style={{textDecoration: "none", color: "black"}} href={"tel:" + data.policeTel}>실종자 신고</a>}
      </div>
      </div>
      {openMailModal && <MailModal closeMail={closeMail} email={data.email} />}
    </div>
      )
    case "article":
      return(
      <div className='detail-container'>
      <BackTopNab back={"/search"}/>
      <div className='deatil-info-container'>
        <div style={{width:"360px", padding: "10px"}}>
          {data.picture_list && <StyledSlider {...settings}>
              {data.picture_list.map((image, idx) => {
                return (
                  <ProductImg src={image ? image : default_img} key={idx} alt=""/>
                )
              })}
            </StyledSlider>}
          {!data.picture_list && <ProductImg src={default_img} alt=""/> }
        </div>
      <div className='detail-info'>
        <div className='detail-span'>
          <img src={pin} alt="" width={20} height={20}/>
          <span>{data.location}</span>
          <button className="detail-map-open" onClick={() => setOpenModal(true)}>지도보기</button>
          {openModal && <DetailMap lon={data.lon} lat={data.lat} closeModal={closeModal}/>}
        </div>
        <div className='detail-span' >
          <img src={calendar} alt="" width={20} height={20} />
          <span>{data.date} {'/ ' + data.time.slice(0,5)} </span>
        </div>
        <div className='detail-span'>
          <img src={box} alt=""  width={20} height={20}/>
          <span>{data.name}</span>
        </div>
        { data.police &&         
        <div className='detail-span'>
          <img src={person} alt="" width={20} height={20} />
          <span>{data.police}</span>
        </div>}
        <div className='detail-span'>
          <img src={phone} alt="" width={20} height={20} />
          <span>{data.email ? data.email : data.policeTel}</span>
        </div>
      </div>
      <div className='detail-button'>
      {data.email && <button onClick={() => setOpenMailModal(true)}>분실물 신고</button>}
      {data.policeTel && <a style={{textDecoration: "none", color: "black"}} href={"tel:" + data.policeTel}>분실물 신고</a>}
      </div>
      </div>
      {openMailModal && <MailModal closeMail={closeMail} email={data.email} />}
    </div>
      )
    case "found":
      return (
        <div className='detail-container'>
          <BackTopNab back={"/search"}/>
          <div className='deatil-info-container'>
          <div style={{width:"360px", padding: "10px"}}>
            {data.picture_list && <StyledSlider {...settings}>
                {data.picture_list.map((image, idx) => {
                  return (
                    <ProductImg src={image ? image : default_img} key={idx} alt=""/>
                  )
                })}
              </StyledSlider>}
            {!data.picture_list && <ProductImg src={default_img} alt=""/> }
          </div>
          <div className='detail-info'>
            <div className='detail-span'>
              <img src={pin} alt="" width={20} height={20}/>
              <span>{data.safeLocation}</span>
              <button className="detail-map-open" onClick={() => setOpenModal(true)}>지도보기</button>
              {openModal && <DetailMap lon={data.lon} lat={data.lat} closeModal={closeModal}/>}
            </div>
            <div className='detail-span' >
              <img src={calendar} alt="" width={20} height={20} />
              <span>{data.date} {'/ ' + data.time.slice(0,5)} </span>
            </div>
            <div className='detail-span'>
              <img src={box} alt=""  width={20} height={20}/>
              <span>{data.name}</span>
            </div>
            <div className='detail-span'>
              <img src={phone} alt="" width={20} height={20} />
              <span>{data.email ? data.email : data.policeTel}</span>
            </div>
          </div>
          <div className='detail-button'>
            { <button onClick={() => setOpenMailModal(true)}>습득물 신고</button>}
            {data.policeTel && <a style={{textDecoration: "none", color: "black"}} href={"tel:" + data.policeTel}>습득물 신고</a>}
          </div>
          </div>
          {openMailModal && <MailModal closeMail={closeMail} email={data.email} />}
        </div>
      )
    default:
      return (
        <div>
          <BackTopNab back={"/search"}/>
          <div>잘못된 접근입니다.</div>
        </div>
      )
  }
}

const StyledSlider = styled(Slider)`
  .slick-prev {
    left: -24px !important;
    z-index: 3;
  }

  .slick-prev:before, .slick-next:before {
    color: black !important;
  }

  .slick-next {
    right: -24px !important;
    z-index: 3;
  }

  .slick-dots {
    display: flex;
    width: 100px;
    margin: 0;
    padding: 0;
    left: 50%;
    bottom: 10px;
    transform: translate(-50%, -50%);
  }

  .slick-dots li {
    width: 6px;
    height: 6px;
    margin: 0 3.5px;
  }

  .slick-dots li button {
    width: 6px;
    height: 6px;
  }

  .slick-dots li button:before {
    width: 6px;
    height: 6px;
    color: white;
  }

  .slick-dots li.slick-active button:before {
    color: white !important;
  }

  li {
    margin: 0;
    padding: 0;
  }
`;

const ProductImg = styled.img`
  width: 300px;
  border-radius: 10px;
  object-fit: cover;
`;