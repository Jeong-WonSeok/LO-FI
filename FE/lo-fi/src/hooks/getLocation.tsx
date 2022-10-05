export const getLocation = () => {
  if (navigator.geolocation) { // GPS를 지원하면
    // 이것으로 현재 위치를 가져온다.
    navigator.geolocation.getCurrentPosition(function(position) {
      const location = {
        "lat": position.coords.latitude,
        "lon": position.coords.longitude
      }
      return location
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