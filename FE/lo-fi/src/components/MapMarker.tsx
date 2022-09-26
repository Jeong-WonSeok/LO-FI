import { info } from 'console';
import React, {useEffect, useState, useRef} from 'react'
import './MapMarker.css'
import {Iprops} from '../pages/AddDetailPage';

const kakao = (window as any).kakao

export default function MapMarker(props: any) {
  let lon = 0;
  let lat = 0;
  const [address, setAddress] = useState('')
  const el = useRef<HTMLDivElement | null> (null);

  useEffect(() => {
    async function fecthmap() {
    window.addEventListener('click', handleCloseModal)
    getLocation()
    setTimeout(() => {
    
    var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
    mapOption = {
        center: new kakao.maps.LatLng(lat, lon), // 지도의 중심좌표
        level: 3 // 지도의 확대 레벨
    };  
  
    // 지도를 생성합니다    
    var map = new kakao.maps.Map(mapContainer, mapOption); 
  
    // 주소-좌표 변환 객체를 생성합니다
    var geocoder = new kakao.maps.services.Geocoder()
  
    var marker = new kakao.maps.Marker(); // 클릭한 위치를 표시할 마커입니다
    // infowindow = new kakao.maps.InfoWindow({zindex:1}); // 클릭한 위치에 대한 주소를 표시할 인포윈도우입니다
  
    // 현재 지도 중심좌표로 주소를 검색해서 지도 좌측 상단에 표시합니다
    // searchAddrFromCoords(map.getCenter(), displayCenterInfo);
  
    // 지도를 클릭했을 때 클릭 위치 좌표에 대한 주소정보를 표시하도록 이벤트를 등록합니다
    // 여기를 하단에 위치를 바꾸는 걸로 하자!
    kakao.maps.event.addListener(map, 'click', function(mouseEvent: any) {
      searchDetailAddrFromCoords(mouseEvent.latLng, function(result: any, status: any) {
        if (status === kakao.maps.services.Status.OK) {
          var infoDiv = document.getElementById('centerAddr') as HTMLDivElement
          infoDiv.innerText = result[0].address.address_name
          setAddress(result[0].address.address_name)
          // var detailAddr = !!result[0].road_address ? '<div>도로명주소 : ' + result[0].road_address.address_name + '</div>' : '';
          // detailAddr += '<div>지번 주소 : ' + result[0].address.address_name + '</div>';
              
          // var content = '<div class="bAddr">' + 
          //   detailAddr + 
          //   '</div>';
  
          // 마커를 클릭한 위치에 표시합니다 
          marker.setPosition(mouseEvent.latLng);
          marker.setMap(map);
  
          // 인포윈도우에 클릭한 위치에 대한 법정동 상세 주소정보를 표시합니다
          // infowindow.setContent(content);
          // infowindow.open(map, marker);
        }   
      });
    });
  
    // 중심 좌표나 확대 수준이 변경됐을 때 지도 중심 좌표에 대한 주소 정보를 표시하도록 이벤트를 등록합니다
    // kakao.maps.event.addListener(map, 'idle', function() {
    //     searchAddrFromCoords(map.getCenter(), displayCenterInfo);
    // });
  
    function searchAddrFromCoords(coords: any, callback: any) {
        // 좌표로 행정동 주소 정보를 요청합니다
        geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);         
    }
  
    function searchDetailAddrFromCoords(coords: any, callback: any) {
        // 좌표로 법정동 상세 주소 정보를 요청합니다
        geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
    }
  
    // 지도 좌측상단에 지도 중심좌표에 대한 주소정보를 표출하는 함수입니다
    // function displayCenterInfo(result: any, status: any) {
    //   if (status === kakao.maps.services.Status.OK) {
    //     var infoDiv = document.getElementById('centerAddr') as HTMLDivElement;
  
    //     for(var i = 0; i < result.length; i++) {
    //       // 행정동의 region_type 값은 'H' 이므로
    //       if (result[i].region_type === 'H') {
    //           infoDiv.innerHTML = result[i].address_name;
    //           break;
    //       }
    //     }
    //   }    
    // }
    }, 100); 
    }
    fecthmap()

    return(
      window.removeEventListener('click', handleCloseModal)
    )
  }, [lat, lon])

  const getLocation = () => {
    if (navigator.geolocation) { // GPS를 지원하면
      // 이것으로 현재 위치를 가져온다.
      navigator.geolocation.getCurrentPosition(function(position) {
        if (!lat && !lon) {
          lat = position.coords.latitude
          lon = position.coords.longitude
          return
        }
      }, function(error) {
        console.error(error);
        return
      }, {
        enableHighAccuracy: false,
        maximumAge: 0,
        timeout: Infinity
      });
    } else {
      alert('GPS를 지원하지 않습니다');
      return
    }
  }

  
  const handleCloseModal = (e: any) => {
    console.log(el.current)
    console.log(e.target)
    if (!el.current || !el.current.contains(e.target)) {
      props.closeModal()
    }
  }

  // 부모 컴포넌트로 데이터 보내기
  const sendData = () => {
    console.log(address)
    console.log(props.getAddress)
    props.getAddress(address)
  }

  return (
  <div className="map_wrap" style={{zIndex: "8"}} ref={el}>
    <div style={{zIndex: "10"}}>
      <div id="map" style={{width:'85vw', height: '85vh', overflow:'hidden'}}></div>
      <div className="hAddr" style={{display: "flex", justifyContent: "space-between", flexDirection: "row"}}>
        <div>
          <p className="title">주소</p>
          <p id="centerAddr"></p>
        </div>
        <button onClick={sendData} style={{borderRadius: "20px", background: "#B4E0D7", width: "50px", padding: "5px"}}>완료</button>
      </div>
    </div>
  </div>
  )
}
