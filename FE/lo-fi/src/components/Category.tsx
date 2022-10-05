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

const Category = () => {
  const { category } = useAppSelector( state => state.mainData)
  const [Select, setSelect] = useState("");
  const [location, setLocation] = useState({
    "lat": 0,
    "lon": 0
  })

  const dispatch = useAppDispatch();

  const handleChangeTap = (tag: string) => {
    // 선택하면 데이터가 바뀜
    dispatch(getData(tag, location.lat, location.lon))
    setSelect(tag);
  }

  useEffect(() => {
    if (category) {
      setSelect(category)
    } else {
      setSelect('article')
    }
    
    getLocation()
    setTimeout(() => {
      dispatch(getData(Select, location.lat, location.lon))
    }, 200)

  }, [location])

  
  const getLocation = () => {
    if (navigator.geolocation) { // GPS를 지원하면
      // 이것으로 현재 위치를 가져온다.
      navigator.geolocation.getCurrentPosition(function(position) {
        if (!location.lat && !location.lon) {
          setLocation(() => ({
            "lat": position.coords.latitude,
            "lon": position.coords.longitude
          }))
        }
      }, function(error) {
        console.error(error);
      }, {
        enableHighAccuracy: false,
        maximumAge: 0,
        timeout: Infinity
      });
    } else {
      alert('GPS 정보를 불러드리지 못했습니다.\n 새로고침을 해주세요');
    }
  }
  

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

export default React.memo(Category);
