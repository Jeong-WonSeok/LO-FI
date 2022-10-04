import React, {useState, useEffect} from 'react'
import dog from '../assets/img/Category/remove_dog.png'
import select_dog from '../assets/img/Category/color_dog.png'
import lost_item from '../assets/img/Category/remove_lost_item.png'
import select_lost_item from '../assets/img/Category/color_lost_item.png'
import take_item from '../assets/img/Category/remove_take_item.png'
import select_take_item from '../assets/img/Category/color_take_item.png'
import baby from '../assets/img/Category/remove_baby.png'
import select_baby from '../assets/img/Category/color_baby.png'
import './Category.css';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHook'
import { getData } from '../redux/modules/mainData'

export default function Category() {
  const [Select, setSelect] = useState("article");

  const dispatch = useAppDispatch();

  const handleChangeTap = (tag: string) => {
    // 선택하면 데이터가 바뀜
    switch (tag) {
      case "animal":
        dispatch(getData("animal"))
        setSelect("animal");
        return
      case "article":
        dispatch(getData("article"))
        setSelect("article");
        return
      case "person":
        dispatch(getData("person"))
        setSelect("person");
        return
      case "found":
        dispatch(getData("found"))
        setSelect("found");
        return
    }
  }

  useEffect(() => {
    dispatch(getData("article"))
  }, [])
  

  return (
    <div className="category-container">
      <button className='category-buttons' onClick={() => handleChangeTap('animal')}>
        <img src={Select === 'animal' ? select_dog : dog} alt="동물"
        width="20px" height="20px"/>
        <span>실종동물</span>
      </button>
      <button className='category-buttons' onClick={() => handleChangeTap('article')}>
        <img src={Select === 'article' ? select_lost_item : lost_item} alt=""
        width="20px" height="20px"/>
        <span>분실물</span>
      </button>
      <button className='category-buttons' onClick={() => handleChangeTap('person')}>
        <img src={Select === 'person' ? select_baby : baby} alt=""
        width="20px" height="20px"/>
        <span>실종아동</span>
      </button>
      <button className='category-buttons' onClick={() => handleChangeTap('found')}>
        <img src={Select === 'found' ? select_take_item : take_item} alt=""
        width="20px" height="20px" />
        <span>습득물</span>
      </button>
    </div>
  )
}
