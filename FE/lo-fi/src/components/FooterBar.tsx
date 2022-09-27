import React, {useState, useEffect} from 'react'
import main from '../assets/img/Footer/main_tap.png'
import select_main from '../assets/img/Footer/select_main_tap.png'
import search from '../assets/img/Footer/search_tap.png'
import select_search from '../assets/img/Footer/select_search_tap.png'
import chat from '../assets/img/Footer/chat.png'
import select_chat from '../assets/img/Footer/select_chat.png'
import user from '../assets/img/Footer/user.png'
import select_user from '../assets/img/Footer/select_user.png'
import animal from '../assets/img/Category/color_dog.png'
import people from '../assets/img/Category/color_baby.png'
import lost_item from '../assets/img/Category/color_lost_item.png'
import take_item from '../assets/img/Category/color_take_item.png'
import './FooterBar.css'
import { Link } from 'react-router-dom'

export default function FooterBar() {
  const [Select, setSelect] = useState("main");
  const [check, setCheck] = useState(false);

  useEffect(() => {
    if (window.location.href.includes('Profile')) {
      handleChangeTap('user')
    } else if (window.location.href.includes('search')) {
      handleChangeTap('search')
    } else if (window.location.href.includes('plus')) {
      handleChangeTap('plus')
    } else {
      handleChangeTap('main')
    }
  }, [Select])
  

  const handleChangeTap = (tag: string) => {
    // 선택하면 데이터가 바뀜
    switch (tag) {
      case "main":
        setSelect("main");
        return
      case "search":
        setSelect("search");
        return
      case "chat":
        setSelect("chat");
        return
      case "user":
        setSelect("user");
        return
      case "plus":
        setSelect("plus");
        return
    }
  };

  return (
    <div className='Footer-center'>
      <div className="Footer_contain">
        <Link className="navigater" to="/" onClick={() => handleChangeTap('main')}>
          <img src={Select === 'main' ? select_main : main} alt=""
          width="40px" height="40px"/>
        </Link>
        <div className='navigater category-button'>
          <div className={check ? "button_open" : "button_off"}>
            <div className='category-add-buttons'>
              <Link to="/add/animal" className='category-add-button' onClick={() => setCheck(!check)}>
                <img src={animal} alt="" width={30} height={30}/>
                <p>반려동물</p>
              </Link>
              <Link to="/add/people" className='category-add-button'onClick={() => setCheck(!check)}>
                <img src={people} alt="" width={30} height={30}/>
                <p>사람</p>
              </Link>
              <Link to="/add/lost-item" className='category-add-button' onClick={() => setCheck(!check)}>
                <img src={lost_item} alt="" width={30} height={30}/>
                <p>분실물</p>
              </Link>
              <Link to="/add/take-item" className='category-add-button' onClick={() => setCheck(!check)}>
                <img src={take_item} alt="" width={30} height={30}/>
                <p>습득물</p>
              </Link>
            </div>
          </div>
          <input type="checkbox" id="plus" style={{display: "none"}} onChange={() => setCheck(!check)}/>
          <label htmlFor="plus">
            <div className={check ? "open_category" : ""} style={{fontSize: "40px", lineHeight: "15px", width: "27px", height: "25px"}}>+</div>
          </label>
        </div>
        <Link className="navigater" to="/Profile/" onClick={() => handleChangeTap('user')}>
          <img src={Select === 'user' ? select_user : user} alt=""
          width="40px" height="40px" />
        </Link>
      </div>
    </div>
  )
}
