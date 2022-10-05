import React, {useState, useEffect, useRef} from 'react'
import home from '../assets/img/Footer/home.png'
import select_home from '../assets/img/Footer/select_home.png'
import plus from '../assets/img/Footer/plus.png'
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

  const el =  useRef<HTMLInputElement>(null)

  // 프로필은 선택이 되는 문제가 있음
  useEffect(() => {
    window.addEventListener('click', (e) => {
      if (e.target === el.current) {
        setCheck(false)
      } 
    })

    if (window.location.href.includes('Profile')) {
      handleChangeTap('user')
    } else if (window.location.href.includes('search')) {
      handleChangeTap('search')
    } else if (window.location.href.includes('plus')) {
      handleChangeTap('plus')
    } else {
      handleChangeTap('main')
    }

    return (
      window.removeEventListener('click', (e) => {
        if (e.target === el.current) {
          setCheck(false)
        }
      })
    )
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

  
  if (window.location.href.includes('/register') || window.location.href.includes('/login')) return null;
  return (
    <div className='Footer-center'>
      <div className="Footer_contain" id="Footer_contain">
        <Link className="navigater" to="/" onClick={() => handleChangeTap('main')}>
          <img src={Select === 'main' ? select_home : home} alt="" width={25} height={25}/>
          <p style={Select === 'user' ? {color: ""} : {color: "#676767"}}>Home</p>
        </Link>
        <div className='navigater category-button'>
          <div id="button_background" className={check ? "" : "button_off"} ref={el}>
            <div className={check ? "button_open" : "button_off"}>
              <div className='category-add-buttons'>
                <Link to="/add/animal" className='category-add-button' onClick={() => setCheck(!check)}>
                  <img src={animal} alt="" width={30} height={30}/>
                  <p>반려동물</p>
                </Link>
                <Link to="/add/person" className='category-add-button'onClick={() => setCheck(!check)}>
                  <img src={people} alt="" width={30} height={30}/>
                  <p>사람</p>
                </Link>
                <Link to="/add/article" className='category-add-button' onClick={() => setCheck(!check)}>
                  <img src={lost_item} alt="" width={30} height={30}/>
                  <p>분실물</p>
                </Link>
                <Link to="/add/found" className='category-add-button' onClick={() => setCheck(!check)}>
                  <img src={take_item} alt="" width={30} height={30}/>
                  <p>습득물</p>
                </Link>
              </div>
            </div>
          </div>
          <input type="checkbox" id="plus" style={{display: "none"}} onChange={() => setCheck(!check)}/>
          <label htmlFor="plus">
            <img className={check ? "open_category" : ""} src={plus} alt="" width={40} height={40}/>
          </label>
        </div>
        <Link className="navigater" to="/Profile/" onClick={() => handleChangeTap('user')}>
          <img src={Select === 'user' ? select_user : user} alt="" width={25} height={25} />
          <p style={Select === 'user' ? {color: ""} : {color: "#676767"}}>Profile</p>
        </Link>
      </div>
    </div>
  )
}
