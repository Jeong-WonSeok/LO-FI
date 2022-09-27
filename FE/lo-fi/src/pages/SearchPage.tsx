import React, {useState} from 'react'
import Category from '../components/Category'
import search_icon from '../assets/img/icon/search_icon.png'
import './SearchPage.css'
import List from '../components/List';
import map from '../assets/img/Category/map.png'
import { useNavigate } from 'react-router-dom';


export default function SearchPage() {
  const navigate = useNavigate();
  const [SearchText, setSearchText] = useState("");

  const handleChange = (e: any) => {
    setSearchText(e.target.value);
  }

  const goMap = () => {
    navigate('/')
  }

  return (
    <div style={{height: '100%', width: '100%'}}>
      <div className='search_top_nav'>
        <div className='search_map' onClick={goMap}>
          <img src={map} alt="" width={35} height={35} />
          <span>지도로</span>
        </div>
        <div className='search_box'>
          <img src={search_icon} alt="" width={20} height={20}/>
          <input className="search_input" type="text" value={SearchText} onChange={handleChange}/>
        </div>
      </div>
      <Category/>
      <List/>
    </div>
  )
}
