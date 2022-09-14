import React, {useState} from 'react'
import { useParams } from 'react-router-dom'
import male from '../assets/img/icon/male.png'
import select_male from '../assets/img/icon/select_male.png'
import female from '../assets/img/icon/female.png'
import select_female from '../assets/img/icon/select_female.png'
import './AddDetailPage.css'
import BackTopNab from '../components/BackTopNab'
import DatePicker from 'react-datepicker'

export default function AddDetailPage() {
  const [ info, setInfo ] = useState({ 
    name: "",
    speice: "",
    gender: "",
    age: 1,
    location: "",
    detail_loctaion: "",
    picture: "",
    date: Date.now(),
    description: ""
  })
  const { category } = useParams();

  // 데이터 입력시 선언
  // 입력이 늘어나면 그것에 맞춰 텍스트 박스의 길이가 늘어남
  const resize = (e: any) => {
    setInfo(prevState => ({
      ...prevState,
      "description": e.target.value
    }))
    const textEle = document.getElementById('description') as HTMLTextAreaElement
    textEle.style.height = '1px';
    textEle.style.height = (12 + e.target.scrollHeight) + 'px';
  }

  const handleName = (e: any) => {
    setInfo(prevState => ({
      ...prevState,
      "name": e.target.value
    }))
  }

  const handleSpeice = (e: any) => {
    setInfo(prevState => ({
      ...prevState,
      "speice": e.target.value
    }))
  }

  const handleGender = (gender: string) => {
    setInfo(prevState => ({
      ...prevState,
      "gender": gender
    }))
  }

  const handleAge = (e: any) => {
    setInfo(prevState => ({
      ...prevState,
      "age": Number(e.target.value)
    }))
  }
  
  const handleDetailLoation = (e: any) => {
    setInfo(prevState => ({
      ...prevState,
      "detail_loctaion": e.target.value
    }))
  }

  switch (category) {
    case "animal":
      return (
        <div className='add-detail-container'>
          <BackTopNab back={-2} submit={"제출완료"}/>
          <div className='add-component'>
            <label htmlFor="name">반려동물 이름</label>
            <input type="text" id="name" value={info.name} onChange={handleName}/>
          </div>
          <hr />
          <div className='add-component'>
            <label htmlFor="name">반려동물 품종</label>
            <input type="text" id="name" value={info.speice} onChange={handleSpeice}/>
          </div>
          <hr />
          <div className='add-component'>
            <label htmlFor="gender">성별</label>
            <div className='add-component-gender'>
              <img src={info.gender === "male" ? select_male : male} alt="" onClick={() => handleGender("male")} width={40} height={40}/>
              <img src={info.gender === "female" ? select_female : female} alt="" onClick={() => handleGender("female")} width={40} height={40}/>
            </div>
          </div>
          <hr />
          <div className='add-component'>
            <label htmlFor="age">실종당시 나이</label>
            <input type="number" id="age" value={info.age}  onChange={handleAge} />
          </div>
          <hr />
          <div className='add-component'>
            {/* 추후에 선택상자로 표현할 예정 */}
            <label htmlFor="location">실종 지역</label>
            <input type="text" id="location" />
          </div>
          <hr />
          <div className='add-component'>
            <label htmlFor="detail_location">상세 지역</label>
            <input type="text" id="detail_location"  value={info.detail_loctaion}  onChange={handleDetailLoation} />
          </div>
          <hr />
          <div className='add-component'>
            <label htmlFor="picture">사진</label>
            <input type="file" src="" alt="" />
          </div>
          <hr />
          <div className='add-component'>
            <label htmlFor="date">실종 일자</label>
            <input type="datetime" name="" id="date" />
          </div>
          <hr />
          <div className='add-component add-componet-description'>
            <label htmlFor="description" style={{marginBottom: "5px"}}>특징</label>
            <textarea name="" id="description" placeholder='특징을 적어주세요' value={info.description} onChange={resize}></textarea>
          </div>
          <hr />
        </div>
      )
    case "people":
      return (
        <div></div>
      )
    case "lost_item":
      return (
        <div></div>
      )
    case "take_item":
      return (
        <div></div>
      )
    default:
      return (
        <div>잘못된 접근 입니다.</div>
      )
  }

}
