import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import box from '../assets/img/icon/box.png'
import calendar from '../assets/img/icon/calendar.png'
import pin from '../assets/img/icon/pin.png'
import default_img from '../assets/img/icon/default_img.png'
import male from '../assets/img/icon/select_male.png'
import female from '../assets/img/icon/select_female.png'
import './List.css'
import { useAppSelector } from '../hooks/reduxHook'

export type dataType = {
  id: number,
  breed: string,
  name: string,
  gender: string,
  age: number,
  ageNow: number,
  location: string,
  foundLocation: string,
  safeLocation: string,
  date: string,
  time: string,
  category: string,
  description: string,
  dress: string,
  picture: string,
  picture_list: string[],
  lat: number,
  lon: number,
  userId: number, 
  email: string,
  phone: string
}

export default function List() {
  // useSelector 와 달리 따로 type을 지정해주지 않아도 작동
  const {data, pending, search, search_data, category, error } = useAppSelector(state => state.mainData);

  const ObjectArray: Array<object> = []
  const [list, setList] = useState(ObjectArray)

  useEffect(() => {
    
    if (error) {
      return
    } else {
      if (search) {
        setList((current) => {
          let newData = [...current]
          if (search_data[0] === undefined) {
            search_data.shift()
            newData = search_data
          } else {
            newData = search_data
          } 
          return newData
          })
        } else {
          setList((current) => {
            let newData = [...current]
            if (data[0] === undefined) {
              data.shift()
              newData = data
            } else {
              newData = data
            } 
            return newData
            
            })
          } 
      } 
  }, [search, data, search_data])

  // 로딩중
  if (pending && !search) {
    return (
      <div className='list-container'>
        <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
      </div>
    )
  } else {
    if (list.length) {
      if (category === "animal" || category === "person") {
        return (
          <div className='list-container'>
            {list.map((data: any) => {
              return (
                <Link to={`${category}/${data.id}`} key={data.id} className='list-item-container'>
                  <img src={data.picture.split(' ')[0] ? data.picture.split(' ')[0] : default_img} alt="실종품 사진" width={100} height={100}/>
                  <div className='list-item-info'>
                    <div className='list-item-span'>
                      <img src={pin} alt="" width={18} height={18}/>
                      <span>{data.location.length > 15 ? data.location.slice(0, 15) + '...' : data.location}</span>
                    </div>
                    <div className='list-item-span'>
                      <img src={calendar} alt="" width={18} height={18}/>
                      <span>{data.date}</span>
                    </div>
                    <div className='list-item-span'>
                      <img src={data.gender === "female" || data.gender === "암컷" ? female : male} alt="" width={18} height={188} />
                      <span>{data.name + ' / ' + data.age} {data.ageNow ? ' / ' + data.ageNow : ''}</span>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        )
      } else {
        return (
          <div className='list-container'>
            {list.map((data: any) => {
              return (
                <Link to={`${category}/${data.id}`} key={data.id} className='list-item-container'>
                  <img src={data.picture.split(' ')[0] ? data.picture.split(' ')[0] : default_img} alt="실종품 사진" width={100} height={100}/>
                  <div className='list-item-info'>
                    <div className='list-item-span'>
                      <img src={pin} alt="" width={18} height={18}/>
                      { category === "found" && <span>{ data.safeLocation.length > 13 ? data.safeLocation.slice(0, 13) + '...' : data.safeLocation}</span>}
                      { category === "article" && <span>{data.location.length > 13 ? data.location.slice(0, 13) + '...' : data.location}</span>}
                    </div>
                    <div className='list-item-span'>
                      <img src={calendar} alt="" width={18} height={18}/>
                      <span>{data.date}</span>
                    </div>
                    <div className='list-item-span'>
                      <img src={box} alt="" width={18} height={188} />
                      <span>{data.name.length > 13 ? data.name.slice(0,13) + '...' : data.name}</span>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        )
      }
    } else if (search_data.length === 0 && search) {
      return (
        <div className='list-container' style={{fontSize: "20px"}}>
          찾는 데이터가 없습니다.
        </div>
      )
    } else {
      return (
        <div className='list-container' style={{fontSize: "20px"}}>
          근처에 데이터가 없습니다.
        </div>
      )
    } 
  }
}