import React, { useEffect, useState } from 'react';
import Category from '../components/Category';
import search_icon from '../assets/img/icon/search_icon.png'
import list from '../assets/img/Category/list.png'
import default_img from '../assets/img/icon/default_img.png'
import box from '../assets/img/icon/box.png'
import calendar from '../assets/img/icon/calendar.png'
import pin from '../assets/img/icon/pin.png'
import { useAppDispatch, useAppSelector } from '../hooks/reduxHook'
import './MainPage.css'
import { useNavigate } from 'react-router-dom';

// 카카오 불러오기
const kakao = (window as any).kakao

type positionType = {
  title: String,
  latlng: any
}

const MainPage = () => {
  const navigate = useNavigate();
  const { data, pending, error, category } = useAppSelector(state => state.mainData)
  
  const [location, setLocation] = useState({
    lat: 0,
    lon: 0
  })

  const [SearchText, setSearchText] = useState("");

  const handleChange = (e: any) => {
    setSearchText(e.target.value);
  }

  useEffect(() => {

    //메인페이지에서 토큰이 있는지 확인하고 토큰이 없으면
    //login페이지로 보냄
    const token = localStorage.getItem("token");
    // if (!token) {
    //   console.log('로그인 되지 않음')
    //   navigate('/login')
    // }
    
    // 좌표데이터를 가져온 후에 지도를 로드하기 위해
    // 나갔다가 다시 돌아오면 위치 데이터가 들어오지 않음
    async function fecthmap() {
    // 현재 위치 가져오기
    getLocation()
    var mapContainer = document.getElementById('map'), // 지도를 표시할 div  
    mapOption = { 
      center: new kakao.maps.LatLng(location.lat, location.lon), // 지도의 중심좌표
      level: 3 // 지도의 확대 레벨
    };

    var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다
    
    var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png"; 
    var imageSize = new kakao.maps.Size(24, 35); 

    if (data[0]) {
      data.forEach((position: any) => {
        var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize); 
        var marker = new kakao.maps.Marker({
          map: map, // 마커를 표시할 지도
          position: new kakao.maps.LatLng(position.lat, position.lon), // 마커를 표시할 위치
          title : position.id, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
          clickable: true,
          image : markerImage // 마커 이미지 
        });

        marker.setMap(map);
        var content = `<div class="marker-info">
        <img src=${position.picture.split(' ')[0] ? position.picture.split(' ')[0] : default_img} width={100} height={100}>
          <div class='list-item-marker-info'>
            <div class='marker-info-list-item-span'>
              <img src=${pin} alt="" width={18} height={18}/>
              <span>${position.location? position.location.slice(0, 10) : position.safeLocation.slice(0, 10)}</span>
            </div>
            <div class='marker-info-list-item-span'>
              <img src=${calendar} alt="" width={18} height={18}/>
              <span>${position.date}</span>
            </div>
            <div class='marker-info-list-item-span'>
              <img src=${box} alt="" width={18} height={18} />
              <span>${position.name} ${position.age ? ' / ' + position.age : ''}</span>
            </div>
          </div>
        </div>`

        // 마커 위에 커스텀오버레이를 표시합니다
        // 마커를 중심으로 커스텀 오버레이를 표시하기위해 CSS를 이용해 위치를 설정했습니다
        var overlay = new kakao.maps.CustomOverlay({
            content: content,
            position: marker.getPosition()
        });

        // 마커를 클릭했을 때 커스텀 오버레이를 표시합니다
        kakao.maps.event.addListener(marker, 'click', function() {
          map.setCenter(marker.getPosition())
          overlay.setMap(map);
        });

        // 커스텀 오버레이를 닫기 위해 호출되는 함수입니다 
        kakao.maps.event.addListener(map, 'click', function() {
          overlay.setMap(null);     
        })
      })
    }

    // 현재위치 표시
    var gps_content = '<div class="now-location"><div class="location-back"></div></div>';
    var gps_position = new kakao.maps.LatLng(location.lat,location.lon)
    var currentOverlay = new kakao.maps.CustomOverlay({
        position: gps_position,
        content: gps_content,
        map: map,
        zIndex: 3,
    });
    currentOverlay.setMap(map);

  }
  fecthmap();

  }, [location, data]);

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

  const goList = () => {
    navigate('/search')
  }

  return (
    <div style={{width: '100%'}}>
      <div className='search_top_nav' >
        <div className='search_map' onClick={goList}>
          <img src={list} alt="" width={35} height={35} />
          <span>목록으로</span>
        </div>
        <div className='search_box'>
          <img src={search_icon} alt="" width={20} height={20}/>
          <input className="search_input" type="text" value={SearchText} onChange={handleChange}/>
        </div>
      </div>
      <Category/>
      
      <div id="map" style={{height: '85vh', width: "100%"}}>

      </div>
    </div>
  )
}

export default MainPage;