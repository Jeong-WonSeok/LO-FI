import React, {useState} from 'react'
import main from '../assets/img/Footer/main_tap.png'
import select_main from '../assets/img/Footer/select_main_tap.png'
import search from '../assets/img/Footer/search_tap.png'
import select_search from '../assets/img/Footer/select_search_tap.png'
import chat from '../assets/img/Footer/chat.png'
import select_chat from '../assets/img/Footer/select_chat.png'
import user from '../assets/img/Footer/user.png'
import select_user from '../assets/img/Footer/select_user.png'
import './FooterBar.css'

export default function FooterBar() {
  const [Select, setSelect] = useState("main");

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
    }
  };

  return (
    <div className="Footer_contain">
        <button className="navigater" onClick={() => handleChangeTap('main')}>
          <img src={Select === 'main' ? select_main : main} alt="동물"
          width="40px" height="40px"/>
        </button>
        <button className="navigater" onClick={() => handleChangeTap('search')}>
          <img src={Select === 'search' ? select_search : search} alt=""
          width="40px" height="40px"/>
        </button>
        <button className='navigater add_button'>
          <div className='plus'>+</div>
        </button>
        <button className="navigater" onClick={() => handleChangeTap('chat')}>
          <img src={Select === 'chat' ? select_chat : chat} alt=""
          width="40px" height="40px"/>
        </button>
        <button className="navigater" onClick={() => handleChangeTap('user')}>
          <img src={Select === 'user' ? select_user : user} alt=""
          width="40px" height="40px" />
        </button>
    </div>
  )
}
