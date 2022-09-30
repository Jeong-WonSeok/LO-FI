import React, {useEffect, useState, useRef} from 'react'
import './MapMarker.css'

const kakao = (window as any).kakao

export default function DetailMap(props: any) {
  const el = useRef<HTMLDivElement | null> (null);

  useEffect(() => {
    window.addEventListener('click', (e) => {
      if (e.target === el.current) {
        props.closeModal()
      }
    })
    setTimeout(() =>{
      var mapContainer = document.getElementById('map-marker'), // 지도를 표시할 div 
      mapOption = {
          center: new kakao.maps.LatLng(props.lat, props.lon), // 지도의 중심좌표
          level: 2 // 지도의 확대 레벨
      };  
    
      // 지도를 생성합니다    
      var map = new kakao.maps.Map(mapContainer, mapOption); 

      var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png"; 
      var imageSize = new kakao.maps.Size(24, 35); 
      var position = new kakao.maps.LatLng(props.lat, props.lon)

      // 마커 이미지를 생성합니다    
      var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize); 
      var marker = new kakao.maps.Marker({
        map: map, // 마커를 표시할 지도
        position: position, // 마커를 표시할 위치
        title: '보관중인 장소',
        image : markerImage // 마커 이미지 
      });
        
    
      // 마커가 지도 위에 표시되도록 설정합니다
      marker.setMap(map);

    }, 200)

    return(
      window.removeEventListener('click', (e) => {
        if (e.target === el.current) {
          props.closeModal()
        }
      }, true)
    )
  }, [])

  // const getLocation = () => {
  //   if (navigator.geolocation) { // GPS를 지원하면
  //     // 이것으로 현재 위치를 가져온다.
  //     navigator.geolocation.getCurrentPosition(function(position) {
  //       if (!lat && !lon) {
  //         lat = position.coords.latitude
  //         lon = position.coords.longitude
  //         return
  //       }
  //     }, function(error) {
  //       console.error(error);
  //       return
  //     }, {
  //       enableHighAccuracy: false,
  //       maximumAge: 0,
  //       timeout: Infinity
  //     });
  //   } else {
  //     alert('GPS를 지원하지 않습니다');
  //     return
  //   }
  // }

  return (
  <div className="map_wrap" style={{zIndex: "8"}} ref={el}>
    <div style={{zIndex: "10"}}>
      <div id="map-marker" style={{width:'85vw', height: '50vh', overflow:'hidden', borderRadius: '20px'}}></div>
    </div>
  </div>
  )
}
