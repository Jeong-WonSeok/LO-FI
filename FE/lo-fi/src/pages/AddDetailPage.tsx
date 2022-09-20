import React, {useEffect, useRef, useState, useCallback} from 'react'
import { useParams } from 'react-router-dom'
import male from '../assets/img/icon/male.png'
import select_male from '../assets/img/icon/select_male.png'
import female from '../assets/img/icon/female.png'
import select_female from '../assets/img/icon/select_female.png'
import './AddDetailPage.css'
import close from '../assets/img/icon/close.png'
import { useNavigate } from 'react-router-dom'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/esm/locale';

export type infoType = {
  name: String,
  spiece: String,
  Gender: String,
  age: Number,
  location: String,
  detail_loctaion: String,
  date: Date,
  description: String
  picture: FileList,
}


export default function AddDetailPage() {
  const stringList: string[] = [];
  const navigate = useNavigate();
  const [previewImg, setPreviewImg] = useState(stringList)
  const [ info, setInfo ] = useState({ 
    name: "",
    category: "",
    speice: "",
    gender: "",
    age: 1,
    location: "",
    detail_loctaion: "",
    picture: stringList,
    date: new Date(),
    description: ""
  })

  const [isInfo, setIsInfo] = useState({
    isName: true,
    isCategory: true,
    isSpeice: true,
    isGender: true,
    isAge: true,
    isLocation: true,
    isDetailLocation: true,
    isDate: true,
    isDescription: true,
  })
  const { category } = useParams();


  const inputRef = useRef<HTMLInputElement | null> (null);

  const onUplopadImage = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      addImage(e.target.files)
      return;
    }
  }, []) 

  const onUploadImageButtonClick = useCallback(() => {
    if (!inputRef.current) {
      return;
    }
    inputRef.current.click();
  }, []);

  const addImage = ((files: FileList) => {
    // 파일 리스트
    const nowImageURLList = [...previewImg];
    for (let i=0; i < files.length; i++ ) {
      // 미리보기가 가능하게 변수화
      let nowImageUrl: string = ""; 
      nowImageUrl = URL.createObjectURL(files[i]);
      nowImageURLList.push(nowImageUrl);
    }
    setPreviewImg(nowImageURLList)
    console.log(info.picture)
  })

  // 값이 변경될 때 마다 제출 여부를 실행함
  // useEffect(() => {
  //   isSubmit()
  // }, [info])
  

  // 데이터 입력시 선언
  // 입력이 늘어나면 그것에 맞춰 텍스트 박스의 길이가 늘어남
  const resize = (e: any) => {
    setInfo(prevState => ({
      ...prevState,
      "description": e.target.value
    }))
    const textEle = document.getElementById('description') as HTMLTextAreaElement
    textEle.style.height = '1px';
    textEle.style.height = (12 + e.target.scrollHeight) + 'px';
  }
  
  // 이미지 등록한거 스크롤
  window.onload = function() {
    const slider = document.querySelector('.add-img-list')  as HTMLDivElement;
    let isMouseDown = false;
    let startX = 0;
    let scrollLeft = 0;
    
    slider.addEventListener('mousedown', (e) => {
      isMouseDown = true;
      startX = e.pageX - slider.offsetLeft
      scrollLeft = slider.scrollLeft
    })
  
    slider.addEventListener('mouseleave', () => {
      isMouseDown = false;
    })
  
    slider.addEventListener('mouseup', () => {
      isMouseDown = false;
    })
  
    slider.addEventListener('mousemove', (e) => {
      if (!isMouseDown) return;
  
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 1;
      slider.scrollLeft = scrollLeft - walk;
    })
  }

  const handleName = (e: any) => {
    setInfo(prevState => ({
      ...prevState,
      "name": e.target.value
    }))
  }

  const handleSpeice = (e: any) => {
    setInfo(prevState => ({
      ...prevState,
      "speice": e.target.value
    }))
  }

  const handleGender = (gender: string) => {
    setInfo(prevState => ({
      ...prevState,
      "gender": gender
    }))
  }

  const handleAge = (e: any) => {
    setInfo(prevState => ({
      ...prevState,
      "age": Number(e.target.value)
    }))
  }

  const handleLocation = (e: any) => {
    setInfo(prev => ({
      ...prev,
      "location" : e.target.value
    }))
  }
  
  const handleDetailLoation = (e: any) => {
    setInfo(prevState => ({
      ...prevState,
      "detail_loctaion": e.target.value
    }))
  }

  const handleChangeDate = (date: any) => {
    setInfo(prevState => ({
      ...prevState,
      "date" : date
    }))
  }

  const isSubmit = () => {
    // 공통사항 검사
    if (info.name && info.location && info.detail_loctaion && info.date) {
      setIsInfo(prev => ({
        ...prev,
        "isName" : true,
        "isLocation" :  true,
        "isDetailLocation" :  true,
        "isDate" :  true
      }))
      switch(category) {
        case "animal":
          if (info.speice && info.age && info.gender && info.description) {
            // axios 요청 보내기
            return 
          } else {
            return setIsInfo(prev => ({
              ...prev,
              "isSpeice" : (info.speice ? true : false),
              "isAge" : (info.age ? true : false),
              "isGender" : (info.gender ? true : false),
              "isDescription" : (info.description ? true : false)
            }))
          }
        case "people":
          if (info.age && info.gender && info.description) {
            // axios 요청 보내기
            return 
          } else {
            return setIsInfo(prev => ({
              ...prev,
              "isAge" : (info.age ? true : false),
              "isGender" : (info.gender ? true : false),
              "isDescription" : (info.description ? true : false)
            }))
          }
        case "lost_item":
          if (info.category && info.description) {
            // axios 요청 보내기
            return 
          } else {
            return setIsInfo(prev => ({
              ...prev,
              "isCategory" : (info.category ? true : false),
              "isDescription" : (info.description ? true : false)
            }))
          }
        case "take_item":
          if (info.category && info.description) {
            // axios 요청 보내기
            return 
          } else {
            return setIsInfo(prev => ({
              ...prev,
              "isCategory" : (info.category ? true : false),
              "isDescription" : (info.description ? true : false)
            }))
          }  
      }
    } else {
      setIsInfo(prev => ({
        "isCategory" : (info.category ? true : false),
        "isSpeice" : (info.speice ? true : false),
        "isAge" : (info.age ? true : false),
        "isGender" : (info.gender ? true : false),
        "isDescription" : (info.description ? true : false),
        "isName" : (info.name ? true : false),
        "isLocation" : (info.location ? true : false),
        "isDetailLocation" : (info.detail_loctaion ? true : false),
        "isDate" : (info.date ? true : false)
      }))
      
    }
    
    
  }

  switch (category) {
    case "animal":
      return (
        <div className='add-detail-container'>
          <div className='detail-top-nav'> 
            <img className="detail-back" src={close} alt="" width={25} height={25} onClick={() => navigate(-2)}/>
            <button className='submit-button' onClick={isSubmit}>제출</button>
          </div>
          <div className='add-component'>
            <label htmlFor="name">반려동물 이름</label>
            <input type="text" id="name" value={info.name} onChange={handleName}/>
          </div>
          <div className='add-alert'>
            {isInfo.isName ? "" : "이름을 입력해주세요"}
          </div>
          <hr />
          <div className='add-component'>
            <label htmlFor="name">반려동물 품종</label>
            <input type="text" id="name" value={info.speice} onChange={handleSpeice}/>
          </div>
          <div className='add-alert'>
            {isInfo.isSpeice ? "" : "품종을 입력해주세요"}
          </div>
          <hr />
          <div className='add-component'>
            <label htmlFor="gender">성별</label>
            <div className='add-component-gender'>
              <img src={info.gender === "male" ? select_male : male} alt="" onClick={() => handleGender("male")} width={40} height={40}/>
              <img src={info.gender === "female" ? select_female : female} alt="" onClick={() => handleGender("female")} width={40} height={40}/>
            </div>
          </div>
          <div className='add-alert'>
            {isInfo.isGender ? "" : "성별을 입력해주세요"}
          </div>
          <hr />
          <div className='add-component'>
            <label htmlFor="age">실종당시 나이</label>
            <input type="number" id="age" value={info.age}  onChange={handleAge} />
          </div>
          <div className='add-alert'>
            {isInfo.isAge ? "" : "나이를 입력해주세요"}
          </div>
          <hr />
          <div className='add-component'>
            {/* 추후에 선택상자로 표현할 예정 */}
            <label htmlFor="location">실종 지역</label>
            <select name="cars" id="location" value={info.location} onChange={handleLocation}>
              <option value="">지역을 선택해주세요</option>
              <option value="서울특별시">서울특별시</option>
              <option value="강원도">강원도</option>
              <option value="경기도">경기도</option>
              <option value="경상남도">경상남도</option>
              <option value="경상북도">경상북도</option>
              <option value="광주광역시">광주광역시</option>
              <option value="대구광역시">대구광역시</option>
              <option value="대전광역시">대전광역시</option>
              <option value="부산광역시">부산광역시</option>
              <option value="울산광역시">울산광역시</option>
              <option value="인천광역시">인천광역시</option>
              <option value="전라남도">전라남도</option>
              <option value="전라북도">전라북도</option>
              <option value="충청남도">충청남도</option>
              <option value="충청북도">충청북도</option>
              <option value="제주특별자치도">제주특별자치도</option>
              <option value="세종특별자치시">세종특별자치시</option>
              <option value="해외">해외</option>
              <option value="기타">기타</option>
            </select>
          </div>
          <div className='add-alert'>
            {isInfo.isLocation ? "" : "지역을 입력해주세요"}
          </div>
          <hr />
          <div className='add-component'>
            <label htmlFor="detail_location">상세 지역</label>
            <input type="text" id="detail_location" value={info.detail_loctaion} onChange={handleDetailLoation}/>
          </div>
          <div className='add-alert'>
            {isInfo.isDetailLocation ? "" : "상세지역을 입력해주세요"}
          </div>
          <hr />
          <div className='add-component' style={{display: "flex", flexDirection: "column"}}>
            <div style={{display: "flex", justifyContent: "space-between", marginBottom: "5px"}}>
              <label htmlFor="picture">사진</label>
              <input type="file" multiple src="" alt="" id='picture' ref={inputRef} onChange={onUplopadImage} accept="image/*" style={{display: "none"}}/>
              <button className="add-picture-button" onClick={onUploadImageButtonClick}>사진등록</button>
            </div>
            <div id="add-img-list" className='add-img-list'>
              {previewImg.map(imgUrl => {
                return (
                  <img src={imgUrl} alt="" key={imgUrl} width={250} height={250}/>
                )
              })}
            </div>
          </div>
          <hr />
          <div className='add-component'>
            <label htmlFor="date">실종 일자</label>
            <div>
            <DatePicker 
                selected={info.date} 
                locale={ko}
                maxDate={new Date()} // 최대 날짜는 오늘 까지
                dateFormat="yyyy-MM-dd" // 날짜 형식
                onChange={date => handleChangeDate(date)} />
            </div>
          </div>
          <div className='add-alert'>
            {isInfo.isDate ? "" : "날짜을 입력해주세요"}
          </div>
          <hr />
          <div className='add-component add-componet-description'>
            <label htmlFor="description" style={{marginBottom: "5px"}}>특징</label>
            <textarea name="" id="description" placeholder='특징을 적어주세요' value={info.description} onChange={resize}></textarea>
          </div>
          <div className='add-alert'>
            {isInfo.isDescription ? "" : "특징을 입력해주세요"}
          </div>
          <hr />
        </div>
      )
    case "people":
      return (
        <div className='add-detail-container'>
          <div className='detail-top-nav'> 
            <img className="detail-back" src={close} alt="" width={25} height={25} onClick={() => navigate(-2)}/>
            <button className='submit-button' onClick={isSubmit}>제출</button>
          </div>
          <div className='add-component'>
            <label htmlFor="name">실종자 이름</label>
            <input type="text" id="name" value={info.name} onChange={handleName}/>
          </div>
          <div className='add-alert'>
            {isInfo.isName ? "" : "이름을 입력해주세요"}
          </div>
          <hr />
          <div className='add-component'>
            <label htmlFor="gender">성별</label>
            <div className='add-component-gender'>
              <img src={info.gender === "male" ? select_male : male} alt="" onClick={() => handleGender("male")} width={40} height={40}/>
              <img src={info.gender === "female" ? select_female : female} alt="" onClick={() => handleGender("female")} width={40} height={40}/>
            </div>
          </div>
          <div className='add-alert'>
            {isInfo.isGender ? "" : "성별을 입력해주세요"}
          </div>
          <hr />
          <div className='add-component'>
            <label htmlFor="age">실종당시 나이</label>
            <input type="number" id="age" value={info.age}  onChange={handleAge} />
          </div>
          <div className='add-alert'>
            {isInfo.isAge ? "" : "나이를 입력해주세요"}
          </div>
          <hr />
          <div className='add-component'>
            {/* 추후에 선택상자로 표현할 예정 */}
            <label htmlFor="location">실종 지역</label>
            <select name="cars" id="location" value={info.location} onChange={handleLocation}>
              <option value="">지역을 선택해주세요</option>
              <option value="서울특별시">서울특별시</option>
              <option value="강원도">강원도</option>
              <option value="경기도">경기도</option>
              <option value="경상남도">경상남도</option>
              <option value="경상북도">경상북도</option>
              <option value="광주광역시">광주광역시</option>
              <option value="대구광역시">대구광역시</option>
              <option value="대전광역시">대전광역시</option>
              <option value="부산광역시">부산광역시</option>
              <option value="울산광역시">울산광역시</option>
              <option value="인천광역시">인천광역시</option>
              <option value="전라남도">전라남도</option>
              <option value="전라북도">전라북도</option>
              <option value="충청남도">충청남도</option>
              <option value="충청북도">충청북도</option>
              <option value="제주특별자치도">제주특별자치도</option>
              <option value="세종특별자치시">세종특별자치시</option>
              <option value="해외">해외</option>
              <option value="기타">기타</option>
            </select>
          </div>
          <div className='add-alert'>
            {isInfo.isLocation ? "" : "지역을 입력해주세요"}
          </div>
          <hr />
          <div className='add-component'>
            <label htmlFor="detail_location">상세 지역</label>
            <input type="text" id="detail_location" value={info.detail_loctaion} onChange={handleDetailLoation}/>
          </div>
          <div className='add-alert'>
            {isInfo.isDetailLocation ? "" : "상세지역을 입력해주세요"}
          </div>
          <hr />
          <div className='add-component'>
            <label htmlFor="picture">사진</label>
            <input type="file" src="" alt="" />
          </div>
          <hr />
          <div className='add-component'>
            <label htmlFor="date">실종 일자</label>
            <div>
            <DatePicker 
                selected={info.date} 
                locale={ko}
                maxDate={new Date()} // 최대 날짜는 오늘 까지
                dateFormat="yyyy-MM-dd" // 날짜 형식
                onChange={date => handleChangeDate(date)} />
            </div>
          </div>
          <div className='add-alert'>
            {isInfo.isDate ? "" : "날짜을 입력해주세요"}
          </div>
          <hr />
          <div className='add-component add-componet-description'>
            <label htmlFor="description" style={{marginBottom: "5px"}}>실종 당시 인상착의</label>
            <textarea name="" id="description" placeholder='인상 착의를 적어주세요' value={info.description} onChange={resize}></textarea>
          </div>
          <div className='add-alert'>
            {isInfo.isDescription ? "" : "인상 착의를 입력해주세요"}
          </div>
          <hr />
        </div>
      )
    case "lost-item" :
      return (
        <div className='add-detail-container'>
          <div className='detail-top-nav'> 
            <img className="detail-back" src={close} alt="" width={25} height={25} onClick={() => navigate(-2)}/>
            <button className='submit-button' onClick={isSubmit}>제출</button>
          </div>
          <div className='add-component'>
            <label htmlFor="name">물품명</label>
            <input type="text" id="name" value={info.name} onChange={handleName}/>
          </div>
          <div className='add-alert'>
            {isInfo.isName ? "" : "물품명을 입력해주세요"}
          </div>
          <hr />
          <div className='add-component'>
            <label htmlFor="add-category">분류</label>
            <select name="" id="add-category">
              <option value="">분류를 선택하세요</option>
              <option value="가방">가방</option>
              <option value="귀금속">귀금속</option>
              <option value="도서용품">도서용품</option>
              <option value="서류">서류</option>
              <option value="산업용품">산업용품</option>
              <option value="쇼핑백">쇼핑백</option>
              <option value="스포츠용품">스포츠용품</option>
              <option value="악기">악기</option>
              <option value="유가증권">유가증권</option>
              <option value="의류">의류</option>
              <option value="자동차">자동차</option>
              <option value="전자기기">전자기기</option>
              <option value="지갑">지갑</option>
              <option value="증명서">증명서</option>
              <option value="컴퓨터">컴퓨터</option>
              <option value="카드">카드</option>
              <option value="현금">현금</option>
              <option value="휴대폰">휴대폰</option>
              <option value="기타물품">기타물품</option>
            </select>
          </div>
          <div className='add-alert'>
            {isInfo.isCategory ? "" : "분류를 입력해주세요"}
          </div>
          <hr />
          <div className='add-component'>
            <label htmlFor="location">분실 지역</label>
            <select name="cars" id="location" value={info.location} onChange={handleLocation}>
              <option value="">지역을 선택하세요</option>
              <option value="서울특별시">서울특별시</option>
              <option value="강원도">강원도</option>
              <option value="경기도">경기도</option>
              <option value="경상남도">경상남도</option>
              <option value="경상북도">경상북도</option>
              <option value="광주광역시">광주광역시</option>
              <option value="대구광역시">대구광역시</option>
              <option value="대전광역시">대전광역시</option>
              <option value="부산광역시">부산광역시</option>
              <option value="울산광역시">울산광역시</option>
              <option value="인천광역시">인천광역시</option>
              <option value="전라남도">전라남도</option>
              <option value="전라북도">전라북도</option>
              <option value="충청남도">충청남도</option>
              <option value="충청북도">충청북도</option>
              <option value="제주특별자치도">제주특별자치도</option>
              <option value="세종특별자치시">세종특별자치시</option>
              <option value="해외">해외</option>
              <option value="기타">기타</option>
            </select>
          </div>
          <div className='add-alert'>
            {isInfo.isLocation ? "" : "지역을 입력해주세요"}
          </div>
          <hr />
          <div className='add-component'>
            <label htmlFor="detail_location">상세 지역</label>
            <input type="text" id="detail_location" value={info.detail_loctaion} onChange={handleDetailLoation}/>
          </div>
          <div className='add-alert'>
            {isInfo.isDetailLocation ? "" : "상세지역을 입력해주세요"}
          </div>
          <hr />
          <div className='add-component'>
            <label htmlFor="picture">사진</label>
            <input type="file" src="" alt="" />
          </div>
          <hr />
          <div className='add-component'>
            <label htmlFor="date">분실 일자</label>
            <div>
            <DatePicker 
                selected={info.date} 
                locale={ko}
                maxDate={new Date()} // 최대 날짜는 오늘 까지
                dateFormat="yyyy-MM-dd" // 날짜 형식
                onChange={date => handleChangeDate(date)} />
            </div>
          </div>
          <div className='add-alert'>
            {isInfo.isDate ? "" : "날짜을 입력해주세요"}
          </div>
          <hr />
          <div className='add-component add-componet-description'>
            <label htmlFor="description" style={{marginBottom: "5px"}}>특징</label>
            <textarea name="" id="description" placeholder='특징을 적어주세요' value={info.description} onChange={resize}></textarea>
          </div>
          <div className='add-alert'>
            {isInfo.isDescription ? "" : "특징을 입력해주세요"}
          </div>
          <hr />
        </div>
      )
    case "take-item":
      return (
        <div className='add-detail-container'>
          <div className='detail-top-nav'> 
            <img className="detail-back" src={close} alt="" width={25} height={25} onClick={() => navigate(-2)}/>
            <button className='submit-button' onClick={isSubmit}>제출</button>
          </div>
          <div className='add-component'>
            <label htmlFor="name">물품명</label>
            <input type="text" id="name" value={info.name} onChange={handleName}/>
          </div>
          <div className='add-alert'>
            {isInfo.isName ? "" : "물품명을 입력해주세요"}
          </div>
          <hr />
          <div className='add-component'>
            <label htmlFor="add-category">분류</label>
            <select name="" id="add-category">
              <option value="">분류를 선택하세요</option>
              <option value="가방">가방</option>
              <option value="귀금속">귀금속</option>
              <option value="도서용품">도서용품</option>
              <option value="서류">서류</option>
              <option value="산업용품">산업용품</option>
              <option value="쇼핑백">쇼핑백</option>
              <option value="스포츠용품">스포츠용품</option>
              <option value="악기">악기</option>
              <option value="유가증권">유가증권</option>
              <option value="의류">의류</option>
              <option value="자동차">자동차</option>
              <option value="전자기기">전자기기</option>
              <option value="지갑">지갑</option>
              <option value="증명서">증명서</option>
              <option value="컴퓨터">컴퓨터</option>
              <option value="카드">카드</option>
              <option value="현금">현금</option>
              <option value="휴대폰">휴대폰</option>
              <option value="기타물품">기타물품</option>
            </select>
          </div>
          <div className='add-alert'>
            {isInfo.isCategory ? "" : "분류를 입력해주세요"}
          </div>
          <hr />
          <div className='add-component'>
            <label htmlFor="location">습득 지역</label>
            <select name="cars" id="location" value={info.location} onChange={handleLocation}>
              <option value="">지역을 선택하세요</option>
              <option value="서울특별시">서울특별시</option>
              <option value="강원도">강원도</option>
              <option value="경기도">경기도</option>
              <option value="경상남도">경상남도</option>
              <option value="경상북도">경상북도</option>
              <option value="광주광역시">광주광역시</option>
              <option value="대구광역시">대구광역시</option>
              <option value="대전광역시">대전광역시</option>
              <option value="부산광역시">부산광역시</option>
              <option value="울산광역시">울산광역시</option>
              <option value="인천광역시">인천광역시</option>
              <option value="전라남도">전라남도</option>
              <option value="전라북도">전라북도</option>
              <option value="충청남도">충청남도</option>
              <option value="충청북도">충청북도</option>
              <option value="제주특별자치도">제주특별자치도</option>
              <option value="세종특별자치시">세종특별자치시</option>
              <option value="해외">해외</option>
              <option value="기타">기타</option>
            </select>
          </div>
          <div className='add-alert'>
            {isInfo.isLocation ? "" : "지역을 입력해주세요"}
          </div>
          <hr />
          <div className='add-component'>
            <label htmlFor="detail_location">상세 지역</label>
            <input type="text" id="detail_location" value={info.detail_loctaion} onChange={handleDetailLoation}/>
          </div>
          <div className='add-alert'>
            {isInfo.isDetailLocation ? "" : "상세지역을 입력해주세요"}
          </div>
          <hr />
          <div className='add-component'>
            <label htmlFor="picture">사진</label>
            <input type="file" src="" alt="" />
          </div>
          <hr />
          <div className='add-component'>
            <label htmlFor="date">습득 일자</label>
            <div>
            <DatePicker 
                selected={info.date} 
                locale={ko}
                maxDate={new Date()} // 최대 날짜는 오늘 까지
                dateFormat="yyyy-MM-dd" // 날짜 형식
                onChange={date => handleChangeDate(date)} />
            </div>
          </div>
          <div className='add-alert'>
            {isInfo.isDate ? "" : "날짜을 입력해주세요"}
          </div>
          <hr />
          <div className='add-component add-componet-description'>
            <label htmlFor="description" style={{marginBottom: "5px"}}>특징</label>
            <textarea name="" id="description" placeholder='특징을 적어주세요' value={info.description} onChange={resize}></textarea>
          </div>
          <div className='add-alert'>
            {isInfo.isDescription ? "" : "특징을 입력해주세요"}
          </div>
          <hr />
        </div>
      )
    default:
      return (
        <div>잘못된 접근 입니다.</div>
      )
  }

}
