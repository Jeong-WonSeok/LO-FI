import React, { useEffect, useState } from 'react';
import Category from '../components/Category';
import './MainPage.css'

// 카카오 불러오기
const kakao = (window as any).kakao

const MainPage = () => {
  const [location, setLocation] = useState({
    lat: 0,
    lon: 0
  })

  useEffect(() => {
    // 좌표데이터를 가져온 후에 지도를 로드하기 위해
    // 나갔다가 다시 돌아오면 위치 데이터가 들어오지 않음
    async function fecthmap() {
      // 현재 위치 가져오기
      await getLocation();
      var container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
      var options = { //지도를 생성할 때 필요한 기본 옵션
        center: new kakao.maps.LatLng(location.lat, location.lon), //지도의 중심좌표.
        level: 3 //지도의 레벨(확대, 축소 정도)
      };
      var map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

      // 마커가 표시될 위치입니다 
      var markerPosition  = new kakao.maps.LatLng(location.lat + 0.0001, location.lon + 0.0001); 

      // 마커를 생성합니다
      var marker = new kakao.maps.Marker({
          position: markerPosition
      });

      // 마커가 지도 위에 표시되도록 설정합니다
      marker.setMap(map);
    }
    fecthmap();

  }, [location]);

  function getLocation() {
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
      alert('GPS를 지원하지 않습니다');
    }
  }

  return (
    <div style={{width: '100%'}}>
      <Category/>
      
      <div id="map" style={{height: '90vh'}}>

      </div>
    </div>
  )
}

export default MainPage;