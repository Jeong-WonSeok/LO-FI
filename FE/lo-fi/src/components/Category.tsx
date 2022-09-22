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
import { getData, increse } from '../redux/modules/mainData'

export default function Category() {
  const [Select, setSelect] = useState("lost_item");

  const dispatch = useAppDispatch();

  // useSelector 와 달리 따로 type을 지정해주지 않아도 작동
  const { data, pending } = useAppSelector(state => state.mainData);

  const handleChangeTap = (tag: string) => {
    // 선택하면 데이터가 바뀜
    switch (tag) {
      case "dog":
        dispatch(getData("animal"))
        setSelect("dog");
        return
      case "lost_item":
        dispatch(getData("lostItem"))
        setSelect("lost_item");
        return
      case "baby":
        dispatch(getData("person"))
        setSelect("baby");
        return
      case "take_item":
        dispatch(getData("takeItem"))
        setSelect("take_item");
        return
    }
  }

  useEffect(() => {
    dispatch(getData("lostItem"))
  }, [])
  

  return (
    <div className="category-container">
      <button className='category-buttons' onClick={() => handleChangeTap('dog')}>
        <img src={Select === 'dog' ? select_dog : dog} alt="동물"
        width="20px" height="20px"/>
        <span>실종동물</span>
      </button>
      <button className='category-buttons' onClick={() => handleChangeTap('lost_item')}>
        <img src={Select === 'lost_item' ? select_lost_item : lost_item} alt=""
        width="20px" height="20px"/>
        <span>분실물</span>
      </button>
      <button className='category-buttons' onClick={() => handleChangeTap('baby')}>
        <img src={Select === 'baby' ? select_baby : baby} alt=""
        width="20px" height="20px"/>
        <span>실종아동</span>
      </button>
      <button className='category-buttons' onClick={() => handleChangeTap('take_item')}>
        <img src={Select === 'take_item' ? select_take_item : take_item} alt=""
        width="20px" height="20px" />
        <span>습득물</span>
      </button>
    </div>
  )
}
