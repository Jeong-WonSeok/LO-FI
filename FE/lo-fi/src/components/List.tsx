import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import box from '../assets/img/icon/box.png'
import calendar from '../assets/img/icon/calendar.png'
import pin from '../assets/img/icon/pin.png'
import './List.css'
import { useAppSelector } from '../hooks/reduxHook'

export default function List() {
  // useSelector 와 달리 따로 type을 지정해주지 않아도 작동
  const { data, pending } = useAppSelector(state => state.mainData);

  interface datatype {
    atcId: String,
    lstPlace: String,
    lstPrdtNm: String,
    lstSbjt: String,
    lstYmd: String,
    prdtClNm: String,
    rnum: Number
  }

  // interfact object [] aksemfrl
  interface datatype extends Array<datatype> {}

  const [test, setTest] = useState<datatype | object[]>([{
    atcId: '',
    lstPlace: '',
    lstPrdtNm: '',
    lstSbjt: '',
    lstYmd: '',
    prdtClNm: '',
    rnum: 0
  }]);

  useEffect(() => {
    setTest(data)
    console.log('store에 저장된 데이터', data)
    console.log('컴포넌트에 저장된 값', test)
  }, [pending])

  // 로딩중
  if (pending) {
    return (
      <div className='list-container'>loading...</div>
    )
  } else {
    return (
      <div className='list-container'>
        {test.map((data: any) => {
          return (
            <Link to={`${data.atcId}`} className='list-item-container'>
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
  }
}
