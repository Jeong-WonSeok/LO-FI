export const getLocation = (location: any) => {
  if (navigator.geolocation) { // GPS를 지원하면
    // 이것으로 현재 위치를 가져온다.
    navigator.geolocation.getCurrentPosition(function(position) {
      if (!location.lat && !location.lon) {
        const result = {
          "lat": position.coords.latitude,
          "lon": position.coords.longitude
        }
        return result
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