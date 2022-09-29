import React, { useRef, useState, useCallback, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import DatePicker from 'react-datepicker'
import { ko } from 'date-fns/esm/locale';

import ReactS3Client from 'react-aws-s3-typescript'
import { s3Config } from '../hooks/s3Config'

import axios from '../api/axios'
import requests from '../api/requests'

import male from '../assets/img/icon/male.png'
import select_male from '../assets/img/icon/select_male.png'
import female from '../assets/img/icon/female.png'
import select_female from '../assets/img/icon/select_female.png'
import close from '../assets/img/icon/close.png'
import './AddDetailPage.css'
import 'react-datepicker/dist/react-datepicker.css';

import MapMarker from '../components/MapMarker'
import ImgList from '../components/AddPagePreviewImgList'
import { useAppDispatch } from '../hooks/reduxHook';



export interface infoType {
  info: {
    name: String,
    spiece: String,
    Gender: String,
    age: Number,
    nowAge: Number,
    location: String,
    detail_location: String,
    date: Date,
    description: String
    time: String,
    point: Number
  },
  previewFileList: String[]
}

// 자식에서 부모로 데이터 넘겨주기 위해
export interface Iprops {
  getAddress: (address: string) => void
}

interface DataType {
  address: string,
  lat: number,
  lon: number
}

export interface getAddressType {
  address: string
}

export default function AddDetailPage(history: any) {
  let del_count = 0;
  const [isModal, setIsModal] = useState(false);
  const [isDetailModal, setIsDetailModal] = useState(false);
  const previewFileList: string[] = [];
  const fileList: File[] = [];
  const myFileList: File[] = [];
  let picture = '';
  const navigate = useNavigate();
  const [previewImg, setPreviewImg] = useState(previewFileList)
  const [files, setFiles] = useState(fileList)
  const [ info, setInfo ] = useState({ 
    name: "",
    category: "",
    speice: "",
    gender: "",
    age: 0,
    nowAge: 0,
    time: new Date().toTimeString().slice(0, 5),
    location: "",
    detail_location: "",
    date: new Date(),
    description: "",
    lat: 0,
    lon: 0,
    point: 0
  })
  const { category } = useParams();

  const target = document.getElementById('sumbit') as HTMLButtonElement

  useEffect(() => {
    if (target) {
      if (info.name && info.location) {
        switch ( category ) {
          case "animal":
          case "person":
            if (info.age && info.gender && info.description) {
              target.classList.add("submit-success");
              target.disabled = false;
              return
            } else {
              target.classList.remove("submit-success");
              target.disabled = true;
              return 
            }
          case "article":
            if (info.category) {
              target.disabled = false;
              target.classList.add("submit-success");
              return
            } else {
              target.disabled = true;
              target.classList.remove("submit-success");
              return
            }
          case "found": 
            if (info.category && info.detail_location) {
              target.classList.add("submit-success");
              target.disabled = false;
              return
            } else {
              target.classList.remove("submit-success");
              target.disabled = true;
              return
            }
        }
      } else {
        // 조건 불충족시 버튼 비활성화
        target.classList.remove("submit-success");
        target.disabled = true;
      }
    }
  }, [info])
  

  // 이미지 업로드 로직
  const inputRef = useRef<HTMLInputElement | null> (null);

  const onUploadImageButtonClick = useCallback(() => {
    if (!inputRef.current) {
      return;
    }
    inputRef.current.click();
  }, []);

  const onUplopadImage = ( async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      // 파일이 3개 이상이면 잘라냄
      if (previewImg.length < 3) {
         // fileList를 Array의 형태로 
        const uploadFiles = Array.prototype.slice.call(e.target.files)

        uploadFiles.forEach((uploadFile) => {
          myFileList.push(uploadFile)
        });

        setFiles(myFileList)
        addImage(myFileList)
        return;
      } else {
        const dataTranster = new DataTransfer()

        Array.from(files)
          .filter((file, fileidx) => {
            if (fileidx !== 3) {
              return file
            }
          })
          .forEach(file => {
            dataTranster.items.add(file)
          })
    
        const InputFile = document.querySelector('#picture') as HTMLInputElement
        InputFile.files = dataTranster.files;

        return;
      }
    }
  })

  const addImage = ((files: Array<File>) => {
    const nowImageURLList = [...previewImg];
    for (let i=0; i < files.length; i++ ) {
      
      // 미리보기가 가능하게 변수화
      let nowImageUrl: string = ""; 
      nowImageUrl = URL.createObjectURL(files[i]);
      nowImageURLList.push(nowImageUrl);
    }
    setPreviewImg(nowImageURLList)
  })

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
    const nowDay = new Date();
    const nowyear = nowDay.getFullYear()
    setInfo(prevState => ({
      ...prevState,
      "age": Number(e.target.value),
      "nowAge": Number(nowyear - prevState.date.getFullYear() + e.target.value)
    }))
  }

  const handleChangeDate = (date: any) => {
    const nowDay = new Date();
    const nowyear = nowDay.getFullYear()
    setInfo(prevState => ({
      ...prevState,
      "date" : date,
      "nowAge": Number(nowyear - date.getFullYear() + info.age)
    }))
  }

  const handlePoint = (e: any) => {
    setInfo(prev => ({
      ...prev,
      "point": Number(e.target.value)
    }))
  }

  const handleTime = (e: any) => {
    setInfo(prev => ({
      ...prev,
      "time": e.target.value
    }))
  }

  const getAddress = (data: DataType) => {
    if (isModal) {
      setInfo((current) => {
        let newInfo = {...current}
        newInfo['location'] = data['address']
        newInfo['lat'] = data['lat']
        newInfo['lon'] = data['lon']
        return newInfo
      })
    } else if (isDetailModal) {
      setInfo((current) => {
        let newInfo = {...current}
        newInfo['detail_location'] = data['address']
        return newInfo
      })
    }
    setIsDetailModal(false)
    setIsModal(false)
  }

  const handleDetail = (e: any) => {
    setInfo(prev => ({
      ...prev,
      "detail_location": e.target.value
    }))
  }

  const handleCategory = (e: any) => {
    setInfo(prev => ({
      ...prev, 
      "category": e.target.value
    }))
  } 

  const closeModal = () => {
    setIsModal(false)
    setIsDetailModal(false)
  }

  // 이미지 제거
  const deleteImg = (idx: number) => {
    // 해당 인덱스 제거
    setFiles((current) => {
      let newFile = [...current]
      newFile.splice(idx, 1)
      return newFile
    })

    myFileList.splice(idx, 1)

    setPreviewImg((current) => {
      let newPreviewFile = [...current]
      newPreviewFile.splice(idx, 1)
      return newPreviewFile
    })

    const dataTranster = new DataTransfer()
    
    Array.from(files)
      .filter((file, fileidx) => {
        if (fileidx !== Number(idx) + del_count) {
          return file
        }
      })
      .forEach(file => {
        dataTranster.items.add(file)
      })

    const InputFile = document.querySelector('#picture') as HTMLInputElement
    InputFile.files = dataTranster.files;
    del_count += 1
  }

  const s3 = new ReactS3Client(s3Config);

  const uploadS3Files = (S3files: File[]) => {
    // 사진 데이터 s3에 저장하기
    // for문을 돌려 upload 후 리턴된 경로를 info에 저장한다.
    if (S3files.length === 0) {
      return
    } else {
      picture = ''
      for (let i=0; i < S3files.length; i++) {
        s3.uploadFile(S3files[i], S3files[i].name).then(async (data) => { 
          // 이게 비동기적으로 처리되서 지금 사진이 안들어가는 것처럼 보임
          picture += data.location + " "
        }).catch(err => console.error(err))
      }
      return
    }
  }

  const isSubmit = async () => {
    // 중복 제출을 막기위해서
    target.disabled = true;
    // 공통사항 검사
    if (info.name && info.location) {
      await uploadS3Files(files)

      setTimeout( async () => {
        // 날짜 전처리
      var year = info.date.getFullYear();
      var month = ("0" + (1 + info.date.getMonth())).slice(-2);
      var day = ("0" + info.date.getDate()).slice(-2);
      
      const result = year + "-" + month + "-" + day
      
      switch(category) {
        case "animal":
          if (info.speice && info.age && info.gender && info.description) {
            const sendData = {
              "age": String(info.age),
              "breed": info.speice,
              "date": result,
              "description": info.description,
              "gender": info.gender,
              "location": info.location,
              "locationDescription": info.detail_location,
              "lat": info.lat,
              "lon": info.lon,
              "name": info.name,
              "picture": picture,
              "point": info.point,
              "time": info.time
            }
            console.log(sendData)
            const res = await axios.post(requests.addAnimal, sendData, {headers: {
              // Token: localStorage.getItem('token'),
            }})

            console.log('받은 데이터',res)
            
            navigate(`/search/${category}/${res.data}`)
            return 
          }
          return
        case "person":
          if (info.age && info.gender && info.description) {
            const sendData = {
              "missingAge": info.age,
              "ageNow": Number(info.nowAge),
              "missingDate": result,
              "missingClothes": info.description,
              "gender": info.gender,
              "location": info.location,
              "locationDescription": info.detail_location,
              "lat": info.lat,
              "lon": info.lon,
              "name": info.name,
              "picture": picture,
              "point": info.point,
              "missingTime": info.time
            }
            console.log(sendData)
            const res = await axios.post(requests.addPerson, sendData, {headers: {
              // Token: localStorage.getItem('token'),
            }})

            console.log('받은 데이터',res)
            
            navigate(`/search/${category}/${res.data}`)
            return
          }
          return
        case "article":
          if (info.category) {
            const city = info.location.split(" ")
            const sendData = {
              "date": result,
              "city": city[0],
              "category": info.category,
              "description": info.description,
              "location": info.location,
              "locationDescription": info.detail_location,
              "lat": info.lat,
              "lon": info.lon,
              "name": info.name,
              "picture": picture,
              "point": info.point,
              "time": info.time
            }
            console.log(sendData)
            const res = await axios.post(requests.addArticle, sendData, {headers: {
              // Token: localStorage.getItem('token'),
            }})

            console.log('받은 데이터',res)

            navigate(`/search/${category}/${res.data}`)
            return 
          }
          return
        case "found":
          if (info.category) {
            const sendData = {
              "date": result,
              "category": info.category,
              "description": info.description,
              "foundLocation": info.location,
              "safeLocation": info.detail_location,
              "lat": info.lat,
              "lon": info.lon,
              "name": info.name,
              "picture": picture,
              "point": info.point,
              "time": info.time,
            }
            console.log(sendData)
            const res = await axios.post(requests.addFound, sendData, {headers: {
              // Token: localStorage.getItem('token'),
            }})

            console.log('받은 데이터',res)

            navigate(`/search/${category}/${res.data}`)
            return
          }
          return
        }
      }, 1000)
    } else {
      target.disabled = false;
    }
  }

  switch (category) {
    case "animal":
      return (
        <div className='add-detail-container'>
          <div className='detail-top-nav'> 
            <img className="detail-back" src={close} alt="" width={25} height={25} onClick={() => navigate(-1)}  style={{cursor: "pointer"}}/>
            <button type="submit" className='submit-button' id="sumbit" onClick={isSubmit}>제출</button>
          </div>
          <div className="input_required">
            는 필수 입력입니다
          </div>
          <div className='add-component required'>
            <label htmlFor="name">반려동물 이름</label>
            <input type="text" id="name" value={info.name} onChange={handleName}/>
          </div>
          <hr />
          <div className='add-component required'>
            <label htmlFor="speice">반려동물 품종</label>
            <input type="text" id="speice" value={info.speice} onChange={handleSpeice}/>
          </div>
          <hr />
          <div className='add-component required'>
            <label htmlFor="gender">성별</label>
            <div className='add-component-gender'>
              <img src={info.gender === "male" ? select_male : male} alt="" onClick={() => handleGender("male")} width={40} height={40}/>
              <img src={info.gender === "female" ? select_female : female} alt="" onClick={() => handleGender("female")} width={40} height={40}/>
            </div>
          </div>
          <hr />
          <div className='add-component required'>
            <label htmlFor="age">실종당시 나이</label>
            <input type="number" id="age" value={info.age}  onChange={handleAge} />
          </div>
          <hr />
          <div className='add-component required'>
            <label htmlFor="location">실종위치</label>
            <div>
              <button onClick={() => setIsModal(true)} className={info.location ? "off" : "on"} style={{borderRadius: "20px", backgroundColor: "#B4E0D7", padding: "0 10px"}}>위치 찾기</button>
              <span id="detail_location" className={info.location ? "on" : "off"} onClick={() => setIsModal(true)} style={{width: "300px", textAlign:'right', cursor: "pointer"}}>{info.location}</span>
            </div>
          </div>
          <div>
            {isModal && <MapMarker getAddress={getAddress} closeModal={closeModal}/>}
          </div>
          <hr />
          <div className='add-component'>
            <label htmlFor="detail_location">상세위치</label>
            <input type="text" id="detail_location" value={info.detail_location} onChange={handleDetail}/>
          </div>
          <hr />
          <div className='add-component' style={{display: "flex", flexDirection: "column"}}>
            <div style={{display: "flex", justifyContent: "space-between", marginBottom: "5px"}}>
              <label htmlFor="picture">사진</label>
              <input type="file" src="" alt="" id='picture' ref={inputRef} onChange={onUplopadImage} accept="image/*" style={{display: 'none'}}/>
              <button className="add-picture-button" onClick={onUploadImageButtonClick}>사진등록</button>
            </div>
            <div className={previewImg.length === 0 ? "picture_off" : ""}>사진은 최대 3장까지 등록 가능합니다.</div>
            <ImgList previewImg={previewImg} deleteImg={deleteImg} />
            <div className='add-alert'></div>
          </div>
          <hr />
          <div className='add-component required'>
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
          <hr />
          <div className='add-component required'>
            <label htmlFor="time">실종 시간</label>
            <input type="time" name="" id="time" value={info.time} onChange={handleTime}/>
          </div>
          <hr />
          <div className='add-component add-componet-description required'>
            <label htmlFor="description" style={{marginBottom: "5px"}}>특징</label>
            <textarea name="" id="description" placeholder='특징을 적어주세요' value={info.description} onChange={resize}></textarea>
          </div>
          <hr />
          <div className='add-component'>
            <label htmlFor="point">사례금</label>
            <div>
              <input type="number" id="point" value={info.point} onChange={handlePoint} style={{textAlign: "right"}}/>
              <span> point</span>
            </div>
          </div>
          <hr />
        </div>
      )
    case "person":
      return (
        <div className='add-detail-container'>
          <div className='detail-top-nav'> 
            <img className="detail-back" src={close} alt="" width={25} height={25} onClick={() => navigate(-1)}  style={{cursor: "pointer"}}/>
            <button className='submit-button' id="sumbit" onClick={isSubmit}>제출</button>
          </div>
          <div className="input_required">
            는 필수 입력입니다
          </div>
          <div className='add-component required'>
            <label htmlFor="name">실종자 이름</label>
            <input type="text" id="name" value={info.name} onChange={handleName}/>
          </div>
          <hr />
          <div className='add-component required'>
            <label htmlFor="gender">성별</label>
            <div className='add-component-gender'>
              <img src={info.gender === "male" ? select_male : male} alt="" onClick={() => handleGender("male")} width={40} height={40}/>
              <img src={info.gender === "female" ? select_female : female} alt="" onClick={() => handleGender("female")} width={40} height={40}/>
            </div>
          </div>
          <hr />
          <div className='add-component required'>
            <label htmlFor="age">실종당시 나이</label>
            <input type="number" id="age" value={info.age}  onChange={handleAge} />
          </div>
          <hr />
          <div className='add-component required'>
            <label htmlFor="nowAge">현재나이</label>
            <span>{info.nowAge}</span>
          </div>
          <hr />
          <div className='add-component required'>
            <label htmlFor="detail_location">실종위치</label>
            <div>
              <button onClick={() => setIsModal(true)} className={info.location ? "off" : "on"} style={{borderRadius: "20px", backgroundColor: "#B4E0D7", padding: "0 10px"}}>위치 찾기</button>
              <span id="detail_location" className={info.location ? "on" : "off"} onClick={() => setIsModal(true)} style={{width: "300px", textAlign:'right', cursor: "pointer"}}>{info.location}</span>
            </div>
          </div>
          <div>
            {isModal && <MapMarker getAddress={getAddress} closeModal={closeModal}/>}
            </div>
          <hr />
          <div className='add-component'>
            <label htmlFor="detail_location">상세위치</label>
            <input type="text" id="detail_location" value={info.detail_location} onChange={handleDetail}/>
          </div>
          <hr />
          <div className="add-component" style={{display: "flex", justifyContent: "space-between", marginBottom: "5px"}}>
            <label htmlFor="picture">사진</label>
            <input type="file" src="" alt="" multiple id='picture' ref={inputRef} onChange={onUplopadImage} accept="image/*" style={{display: "none"}}/>
            <button className="add-picture-button" onClick={onUploadImageButtonClick}>사진등록</button>
          </div>
          <ImgList previewImg={previewImg} deleteImg={deleteImg} />
          <hr />
          <div className='add-component required'>
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
          <hr />
          <div className='add-component required'>
            <label htmlFor="time">실종 시간</label>
            <input type="time" name="" id="time" value={info.time} onChange={handleTime}/>
          </div>
          <hr />
          <div className='add-component add-componet-description required'>
            <label htmlFor="description" style={{marginBottom: "5px"}}>실종 당시 인상착의</label>
            <textarea name="" id="description" placeholder='인상 착의를 적어주세요' value={info.description} onChange={resize}></textarea>
          </div>
          <hr />
          <div className='add-component'>
            <label htmlFor="point">사례금</label>
            <div>
              <input type="number" id="point" value={info.point} onChange={handlePoint} style={{textAlign: "right"}}/>
              <span> point</span>
            </div>
          </div>
          <hr />
        </div>
      )
    case "article" :
      return (
        <div className='add-detail-container'>
          <div className='detail-top-nav'> 
            <img className="detail-back" src={close} alt="" width={25} height={25} onClick={() => navigate(-1)}  style={{cursor: "pointer"}}/>
            <button className='submit-button' id="sumbit" onClick={isSubmit}>제출</button>
          </div>
          <div className="input_required">
            는 필수 입력입니다
          </div>
          <div className='add-component required'>
            <label htmlFor="name">물품명</label>
            <input type="text" id="name" value={info.name} onChange={handleName}/>
          </div>
          <hr />
          <div className='add-component required'>
            <label htmlFor="add-category">분류</label>
            <select name="" id="add-category" onChange={handleCategory}>
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
          <hr />
          <div className='add-component required'>
            <label htmlFor="detail_location">분실위치</label>
            <div>
              <button onClick={() => setIsModal(true)} className={info.location ? "off" : "on"} style={{borderRadius: "20px", backgroundColor: "#B4E0D7", padding: "0 10px"}}>위치 찾기</button>
              <span id="detail_location" className={info.location ? "on" : "off"} onClick={() => setIsModal(true)} style={{width: "300px", textAlign:'right', cursor: "pointer"}}>{info.location}</span>
            </div>
          </div>
          <div>
            {isModal && <MapMarker getAddress={getAddress} closeModal={closeModal}/>}
            </div>
          <hr />
          <div className='add-component'>
            <label htmlFor="detail_location">상세위치</label>
            <input type="text" id="detail_location" value={info.detail_location} onChange={handleDetail}/>
          </div>
          <hr />
          <div className="add-component" style={{display: "flex", justifyContent: "space-between", marginBottom: "5px"}}>
            <label htmlFor="picture">사진</label>
            <input type="file" src="" alt="" multiple id='picture' ref={inputRef} onChange={onUplopadImage} accept="image/*" style={{display: "none"}}/>
            <button className="add-picture-button" onClick={onUploadImageButtonClick}>사진등록</button>
          </div>
          <ImgList previewImg={previewImg} deleteImg={deleteImg} />
          <hr />
          <div className='add-component required'>
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
          <hr />
          <div className='add-component required'>
            <label htmlFor="time">분실 시간</label>
            <input type="time" name="" id="time" value={info.time} onChange={handleTime}/>
          </div>
          <hr />
          <div className='add-component add-componet-description'>
            <label htmlFor="description" style={{marginBottom: "5px"}}>특징</label>
            <textarea name="" id="description" placeholder='특징을 적어주세요' value={info.description} onChange={resize}></textarea>
          </div>
          <hr />
          <div className='add-component'>
            <label htmlFor="point">사례금</label>
            <div>
              <input type="number" id="point" value={info.point} onChange={handlePoint} style={{textAlign: "right"}}/>
              <span> point</span>
            </div>
          </div>
          <hr />
        </div>
      )
    case "found":
      return (
        <div className='add-detail-container'>
          <div className='detail-top-nav'> 
            <img className="detail-back" src={close} alt="" width={25} height={25} onClick={() => navigate(-1)}  style={{cursor: "pointer"}}/>
            <button className='submit-button' id="sumbit" onClick={isSubmit}>제출</button>
          </div>
          <div className="input_required">
            는 필수 입력입니다
          </div>
          <div className='add-component required'>
            <label htmlFor="name">물품명</label>
            <input type="text" id="name" value={info.name} onChange={handleName}/>
          </div>
          <hr />
          <div className='add-component required'>
            <label htmlFor="add-category">분류</label>
            <select name="" id="add-category" onChange={handleCategory}>
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
          <hr />
          <div className='add-component required'>
            <label htmlFor="detail_location">습득위치</label>
            <div>
              <button onClick={() => setIsModal(true)} className={info.location ? "off" : "on"} style={{borderRadius: "20px", backgroundColor: "#B4E0D7", padding: "0 10px"}}>위치 찾기</button>
              <span id="detail_location" className={info.location ? "on" : "off"} onClick={() => setIsModal(true)} style={{width: "300px", textAlign:'right', cursor: "pointer"}}>{info.location}</span>
            </div>
          </div>
          <div>
            {isModal && <MapMarker getAddress={getAddress} closeModal={closeModal}/>}
            </div>
          <hr />
          <div className='add-component required'>
            <label htmlFor="detail_location">보관장소</label>
            <div>
              <button onClick={() => setIsDetailModal(true)} className={info.detail_location ? "off" : "on"} style={{borderRadius: "20px", backgroundColor: "#B4E0D7", padding: "0 10px"}}>위치 찾기</button>
              <span id="detail_location" className={info.detail_location ? "on" : "off"} onClick={() => setIsModal(true)} style={{width: "300px", textAlign:'right', cursor: "pointer"}}>{info.detail_location}</span>
            </div>
          </div>
          <div>
            {isDetailModal && <MapMarker getAddress={getAddress} closeModal={closeModal}/>}
            </div>
          <hr />
          <div className="add-component" style={{display: "flex", justifyContent: "space-between", marginBottom: "5px"}}>
            <label htmlFor="picture">사진</label>
            <input type="file" src="" alt="" multiple id='picture' ref={inputRef} onChange={onUplopadImage} accept="image/*" style={{display: "none"}}/>
            <button className="add-picture-button" onClick={onUploadImageButtonClick}>사진등록</button>
          </div>
          <ImgList previewImg={previewImg} deleteImg={deleteImg} />
          <hr />
          <div className='add-component required'>
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
          <hr />
          <div className='add-component required'>
            <label htmlFor="time">습득 시간</label>
            <input type="time" name="" id="time" value={info.time} onChange={handleTime}/>
          </div>
          <hr />
          <div className='add-component add-componet-description'>
            <label htmlFor="description" style={{marginBottom: "5px"}}>특징</label>
            <textarea name="" id="description" placeholder='특징을 적어주세요' value={info.description} onChange={resize}></textarea>
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
