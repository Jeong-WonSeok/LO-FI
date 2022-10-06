import React, {useState, useEffect} from 'react'
import map from '../assets/img/Category/map.png'
import list from '../assets/img/Category/list.png'
import search_icon from '../assets/img/icon/search_icon.png'
import { useNavigate } from 'react-router-dom';
import { searchData, stopSearch } from '../redux/modules/mainData';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHook';
import './SearchBar.css'

export default function SearchBar(props: any) {
  const { category, search, pending, search_text } = useAppSelector(state => state.mainData);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const [SearchText, setSearchText] = useState(search_text);

  const xButton = document.getElementById('x_button')
  const handleChange = (e: any) => {
    setSearchText(e.target.value)

    // 빈값이라면 검색 종료 및 원래 데이터로 돌려놓기
    if (e.target.value === "") {
      xButton?.classList.add('not_search')
      dispatch(stopSearch())
      return
    }

    
    xButton?.classList.remove('not_search')
  }

  useEffect(() => {
    setSearchText('')
  
  }, [category])
  

  const endSearch = () => {
    setSearchText('')
    dispatch(stopSearch())
    xButton?.classList.add('not_search')
  }

  // 엔터를 입력하면 검색이 실시
  const Search = (e: any) => {
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
          { search && pending && 
            <div id="searching">
              <div className="loading-container">
              <div className="loading"></div>
              <div id="loading-text">searching</div>
              </div>
            </div>
            }
          <div className='search_map' onClick={go}>
            <img src={list} alt="" width={35} height={35} />
            <span>목록으로</span>
          </div>
          <div className='search_box'>
            <img src={search_icon} alt="" width={20} height={20}/>
            <input className="search_input" placeholder="키워드를 최대 3가지 입력해주세요" type="text" value={SearchText} onChange={handleChange} onKeyDown={Search}/>
            {!SearchText && <div className='stop_search not_search' id="x_button" onClick={endSearch}>X</div>}
            {SearchText && <div className='stop_search' id="x_button" onClick={endSearch}>X</div>}
          </div>
        </div>
      );
    case "list":
      return (
        <div className='search_top_nav'>
          { search && pending && 
            <div id="searching">
              <div className="loading-container">
              <div className="loading"></div>
              <div id="loading-text">searching</div>
              </div>
            </div>
            }
          <div className='search_map' onClick={go}>
            <img src={map} alt="" width={35} height={35} />
            <span>지도로</span>
          </div>
          <div className='search_box'>
            <img src={search_icon} alt="" width={20} height={20}/>
            <input className="search_input" placeholder="키워드를 최대 3가지 입력해주세요" type="text" value={SearchText} onChange={handleChange} onKeyDown={Search}/>
            {!SearchText && <div className='stop_search not_search' id="x_button" onClick={endSearch}>X</div>}
            {SearchText && <div className='stop_search' id="x_button" onClick={endSearch}>X</div>}
          </div>
        </div>
      );
    default:
      return (
        <div>잘못된 접근</div>
      )
  }
}
