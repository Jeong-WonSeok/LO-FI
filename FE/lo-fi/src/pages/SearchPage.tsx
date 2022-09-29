import React, {useState} from 'react'
import Category from '../components/Category'
import search_icon from '../assets/img/icon/search_icon.png'
import './SearchPage.css'
import List from '../components/List';

export default function SearchPage() {
  const [SearchText, setSearchText] = useState("");

  const handleChange = (e: any) => {
    setSearchText(e.target.value);
  }
  return (
    <div style={{height: '100%', width: '100%'}}>
      {/* 시간이 지나면 자동으로 검색 되도록 구현 */}
      <div className='search_box flex justify-between'>
        <img src={search_icon} alt="" width={20} height={20}/>
        <input className="search_input" type="text" value={SearchText} onChange={handleChange}/>
      </div>
      <Category/>
      <List/>
    </div>
  )
}
