import React, {useState} from 'react'
import map from '../assets/img/Category/map.png'
import list from '../assets/img/Category/list.png'
import search_icon from '../assets/img/icon/search_icon.png'
import { useNavigate } from 'react-router-dom';
import { searchData, stopSearch } from '../redux/modules/mainData';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHook';
import './SearchBar.css'

export default function SearchBar(props: any) {
  const { category } = useAppSelector(state => state.mainData);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const [SearchText, setSearchText] = useState("");

  const handleChange = (e: any) => {
    setSearchText(e.target.value)
    console.log(e.target.value)
    // 빈값이라면 검색 종료 및 원래 데이터로 돌려놓기
    if (!SearchText) {
      dispatch(stopSearch())
      return
    }
  }

  // 엔터를 입력하면 검색이 실시
  const Search = (e: any) => {
    console.log(SearchText)
    if (e.key === "Enter") {
      dispatch(searchData(category, SearchText))
    }
  }

  const go = () => {
    if (props.category === "map") {
      navigate('/search')
    } else {
      navigate('/')
    }
  }

  switch (props.category) {
    case "map":
      return (
        <div className='search_top_nav'>
          <div className='search_map' onClick={go}>
            <img src={list} alt="" width={35} height={35} />
            <span>목록으로</span>
          </div>
          <div className='search_box'>
            <img src={search_icon} alt="" width={20} height={20}/>
            <input className="search_input" placeholder="검색할 키워드를 입력해주세요" type="text" value={SearchText} onChange={handleChange} onKeyDown={Search}/>
          </div>
        </div>
      );
    case "list":
      return (
        <div className='search_top_nav'>
          <div className='search_map' onClick={go}>
            <img src={map} alt="" width={35} height={35} />
            <span>지도로</span>
          </div>
          <div className='search_box'>
            <img src={search_icon} alt="" width={20} height={20}/>
            <input className="search_input" placeholder="검색할 키워드를 입력해주세요" type="text" value={SearchText} onChange={handleChange} onKeyDown={Search}/>
          </div>
        </div>
      );
    default:
      return (
        <div>잘못된 접근</div>
      )
  }
}
