import React, { useRef, useState, useCallback} from 'react'
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
import {addData} from '../redux/modules/mainData'
import { useAppDispatch } from '../hooks/reduxHook';



export interface infoType {
  info: {
    name: String,
    spiece: String,
    Gender: String,
    age: Number,
    location: String,
    detail_loctaion: String,
    date: Date,
    description: String
    picture: String[],
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
  const dispatch = useAppDispatch()
  const [isModal, setIsModal] = useState(false);
  const previewFileList: string[] = [];
  const fileList: File[] = [];
  const myFileList: File[] = [];
  const navigate = useNavigate();
  const [previewImg, setPreviewImg] = useState(previewFileList)
  const [files, setFiles] = useState(fileList)
  const [ info, setInfo ] = useState({ 
    name: "",
    category: "",
    speice: "",
    gender: "",
    age: 1,
    location: "",
    detail_loctaion: "",
    picture: [''],
    date: new Date(),
    description: "",
    lat: 0,
    lon: 0,
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
      // fileList를 Array의 형태로 
      const uploadFiles = Array.prototype.slice.call(e.target.files)

      uploadFiles.forEach((uploadFile) => {
        myFileList.push(uploadFile)
      });

      setFiles(myFileList)
      addImage(myFileList)
      return;
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
    setInfo(prevState => ({
      ...prevState,
      "age": Number(e.target.value)
    }))
  }

  const handleChangeDate = (date: any) => {
    setInfo(prevState => ({
      ...prevState,
      "date" : date
    }))
  }

  const getAddress = (data: DataType) => {
    setInfo((current) => {
      let newInfo = {...current}
      newInfo['detail_loctaion'] = data['address']
      newInfo['lat'] = data['lat']
      newInfo['lon'] = data['lon']
      return newInfo
    })
    setIsModal(false)
  }

  const closeModal = () => {
    setIsModal(false)
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
        if (fileidx !== Number(idx)) {
          return file
        }
      })
      .forEach(file => {
        dataTranster.items.add(file)
      })

    const InputFile = document.querySelector('#picture') as HTMLInputElement
    InputFile.files = dataTranster.files;
  }

  const s3 = new ReactS3Client(s3Config);

  const uploadS3Files = (S3files: File[]) => {
    // 사진 데이터 s3에 저장하기
    const arr:string[] =  []
    // for문을 돌려 upload 후 리턴된 경로를 info에 저장한다.
    if (S3files.length === 0) {
      return
    } else {
      for (let i=0; i < S3files.length; i++) {
        s3.uploadFile(S3files[i], S3files[i].name).then((data) => {
          // 잘들어가는 것을 확인
          console.log('데이터 위치',data.location)
          arr.push(data.location)
          setInfo((prev) => {
            let newInfo = {...prev};
            newInfo['picture'] = arr
            return newInfo
          });
        }).catch(err => console.error(err))
      }
      return
    }
  }
  const isSubmit = async () => {
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
            await uploadS3Files(files);
            const res = await axios.post(requests.addAnimal, {Headers: {
              Token: localStorage.getItem('token'),
              data: info
            }})
            dispatch(addData("animal", res))
            return history.push('/search')
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
            await uploadS3Files(files);
            const res = await axios.post(requests.addAnimal, {Headers: {
              Token: localStorage.getItem('token'),
              data: info
            }})
            dispatch(addData("people", res))
            return history.push('/search')
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
            await uploadS3Files(files);
            const res = await axios.post(requests.addAnimal, {Headers: {
              Token: localStorage.getItem('token'),
              data: info
            }})
            dispatch(addData("lostItem", res))
            return history.push('/search')
          } else {
            return setIsInfo(prev => ({
              ...prev,
              "isCategory" : (info.category ? true : false),
              "isDescription" : (info.description ? true : false)
            }))
          }
        case "take_item":
          if (info.category && info.description) {
            await uploadS3Files(files);
            const res = await axios.post(requests.addAnimal, {Headers: {
              Token: localStorage.getItem('token'),
              data: info
            }})
            dispatch(addData("takeItem", res))
            return history.push('/search') 
          } else {
            return setIsInfo(prev => ({
              ...prev,
              "isCategory" : (info.category ? true : false),
              "isDescription" : (info.description ? true : false)
            }))
          }  
    }} else {
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
            <button type="submit" className='submit-button' onClick={isSubmit}>제출</button>
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
            <label htmlFor="detail_location">실종위치</label>
            <span id="detail_location" onClick={() => setIsModal(true)} style={{width: "300px"}}>{info.detail_loctaion}</span>
          </div>
          <div>
            {isModal && <MapMarker getAddress={getAddress} closeModal={closeModal}/>}
            </div>
          <div className='add-alert'>
            {isInfo.isDetailLocation ? "" : "위치를 입력해주세요"}
          </div>
          <hr />
          <div className='add-component' style={{display: "flex", flexDirection: "column"}}>
            <div style={{display: "flex", justifyContent: "space-between", marginBottom: "5px"}}>
              <label htmlFor="picture">사진</label>
              <input type="file" src="" alt="" id='picture' ref={inputRef} onChange={onUplopadImage} accept="image/*" style={{display: 'none'}}/>
              <button className="add-picture-button" onClick={onUploadImageButtonClick}>사진등록</button>
            </div>
            <ImgList previewImg={previewImg} deleteImg={deleteImg} />
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
            <label htmlFor="detail_location">실종위치</label>
            <span id="detail_location" onClick={() => setIsModal(true)} style={{width: "300px"}}>{info.detail_loctaion}</span>
          </div>
          <div>
            {isModal && <MapMarker getAddress={getAddress} closeModal={closeModal}/>}
            </div>
          <div className='add-alert'>
            {isInfo.isDetailLocation ? "" : "위치를 입력해주세요"}
          </div>
          <hr />
          <div className="add-component" style={{display: "flex", justifyContent: "space-between", marginBottom: "5px"}}>
            <label htmlFor="picture">사진</label>
            <input type="file" src="" alt="" multiple id='picture' ref={inputRef} onChange={onUplopadImage} accept="image/*" style={{display: "none"}}/>
            <button className="add-picture-button" onClick={onUploadImageButtonClick}>사진등록</button>
          </div>
          <ImgList previewImg={previewImg} deleteImg={deleteImg} />
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
            <label htmlFor="detail_location">습득위치</label>
            <span id="detail_location" onClick={() => setIsModal(true)} style={{width: "300px"}}>{info.detail_loctaion}</span>
          </div>
          <div>
            {isModal && <MapMarker getAddress={getAddress} closeModal={closeModal}/>}
            </div>
          <div className='add-alert'>
            {isInfo.isDetailLocation ? "" : "위치를 입력해주세요"}
          </div>
          <hr />
          <div className="add-component" style={{display: "flex", justifyContent: "space-between", marginBottom: "5px"}}>
            <label htmlFor="picture">사진</label>
            <input type="file" src="" alt="" multiple id='picture' ref={inputRef} onChange={onUplopadImage} accept="image/*" style={{display: "none"}}/>
            <button className="add-picture-button" onClick={onUploadImageButtonClick}>사진등록</button>
          </div>
          <ImgList previewImg={previewImg} deleteImg={deleteImg} />
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
            <label htmlFor="detail_location">습득위치</label>
            <span id="detail_location" onClick={() => setIsModal(true)} style={{width: "300px"}}>{info.detail_loctaion}</span>
          </div>
          <div>
            {isModal && <MapMarker getAddress={getAddress} closeModal={closeModal}/>}
            </div>
          <div className='add-alert'>
            {isInfo.isDetailLocation ? "" : "위치를 입력해주세요"}
          </div>
          <hr />
          <div className="add-component" style={{display: "flex", justifyContent: "space-between", marginBottom: "5px"}}>
            <label htmlFor="picture">사진</label>
            <input type="file" src="" alt="" multiple id='picture' ref={inputRef} onChange={onUplopadImage} accept="image/*" style={{display: "none"}}/>
            <button className="add-picture-button" onClick={onUploadImageButtonClick}>사진등록</button>
          </div>
          <ImgList previewImg={previewImg} deleteImg={deleteImg} />
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
