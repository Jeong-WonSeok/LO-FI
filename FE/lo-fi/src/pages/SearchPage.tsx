import React, {useState} from 'react'
import Category from '../components/Category'
import search_icon from '../assets/img/icon/search_icon.png'
import './SearchPage.css'
import List from '../components/List';
import axios from '../api/axios';

export default function SearchPage() {
  const [SearchText, setSearchText] = useState("");

  // 검색로직 작성
  const handleChange = (e: any) => {
    setSearchText(e.target.value);
    // 새로 입력이 들어오면 기존에 있던 Timeset 초기화
    clearTimeout();
    // 3초 정도 대기
    setTimeout(() => {
      axios.get();
    }, 3000)
  }
  return (
    <div style={{height: '100%', width: '100%'}}>
      {/* 시간이 지나면 자동으로 검색 되도록 구현 */}
      <div className='search_box flex justify-between'>
        <img src={search_icon} alt="" width={20} height={20}/>
        <input className="search_input" type="text" value={SearchText} onChange={handleChange} placeholder="빨간색 가방"/>
      </div>
      <Category/>
      <List/>
    </div>
  )
}
