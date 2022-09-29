import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import box from '../assets/img/icon/box.png'
import calendar from '../assets/img/icon/calendar.png'
import pin from '../assets/img/icon/pin.png'
import './List.css'
import { useAppSelector } from '../hooks/reduxHook'

export default function List() {
  // useSelector 와 달리 따로 type을 지정해주지 않아도 작동
  const { data, pending, search, search_data, category, error } = useAppSelector(state => state.mainData);

  interface datatype {
    atcId: String,
    lstPlace: String,
    lstPrdtNm: String,
    lstYmd: String,
  }

  // interfact object [] aksemfrl
  interface datatype extends Array<datatype> {}

  const [test, setTest] = useState<datatype | object[]>([{
    atcId: '',
    lstPlace: '',
    lstPrdtNm: '',
    lstYmd: '',
  }]);

  useEffect(() => {
    if (error) {
      setTest([{
        atcId: '1',
        lstPlace: '대전광역시 유성구',
        lstPrdtNm: '에코백',
        lstYmd: '2022.09.20',
      }])
    } else {
      setTest(data)
    } 
  }, [data])

  // 로딩중
  if (pending) {
    return (
      <div className='list-container'>
        <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
      </div>
    )
  } else {
    if (!search) {
      return (
        <div className='list-container'>
          {test.map((data: any) => {
            return (
              <Link to={`${category}/${data.atcId}`} key={data.atcId} className='list-item-container'>
                <img src={data.image} alt="실종품 사진" width={100} height={100}/>
                <div className='list-item-info'>
                  <div className='list-item-span'>
                    <img src={pin} alt="" width={18} height={18}/>
                    <span>{data.lstPlace}</span>
                  </div>
                  <div className='list-item-span'>
                    <img src={calendar} alt="" width={18} height={18}/>
                    <span>{data.lstYmd}</span>
                  </div>
                  <div className='list-item-span'>
                    <img src={box} alt="" width={18} height={188} />
                    <span>{data.lstPrdtNm}</span>
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
          {test.map((search_data: any) => {
            return (
              <Link to={`${search_data.atcId}`} key={search_data.atcId} className='list-item-container'>
                <img src={search_data.image} alt="실종품 사진" width={100} height={100}/>
                <div className='list-item-info'>
                  <div className='list-item-span'>
                    <img src={pin} alt="" width={18} height={18}/>
                    <span>{search_data.lstPlace}</span>
                  </div>
                  <div className='list-item-span'>
                    <img src={calendar} alt="" width={18} height={18}/>
                    <span>{search_data.lstYmd}</span>
                  </div>
                  <div className='list-item-span'>
                    <img src={box} alt="" width={18} height={188} />
                    <span>{search_data.lstPrdtNm}</span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      )
    }
  }
}