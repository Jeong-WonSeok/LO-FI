import React, {RefObject, useEffect} from 'react'
import { infoType } from '../pages/AddDetailPage';

export default function AddPagePreviewImgList(previewFileList: infoType['previewFileList'], dragRef: RefObject<HTMLDivElement>) {
  let isDown = false; // 사용자가 마우스를 눌렀는지 판단할 변수 선언
  let startX: number; // 사용자가 마우스를 누른 시작 지점 변수 선언
  let startScrollLeft: number; // 사용자가 마우스를 눌렀을 때 scrollLeft의 위치 변수 선언

  const mouseTouchDown = (e: MouseEvent | TouchEvent) => { // 마우스를 눌렀을 때 이벤트 함수
    const ref = dragRef.current; // dragRef.current가 아래에서 반복적으로 사용되기에 선언
    if (ref) {
      isDown = true; // 마우스가 눌림
      if (e.type === 'mousedown' && 'pageX' in e) { // 이벤트 타입이 mousedown이고 e객체에 pageX 속성이 있을 때, 즉, 마우스이벤트를 실행했을 때
        startX = e.pageX - ref.offsetLeft; // 마우스를 누른 시작 지점에 pageX - offsetLeft 할당
      } else if (e.type === 'touchstart' && 'touches' in e) { // 이벤트 타입이 touchstart이고 e객체에 touches 속성이 있을 때, 즉, 터치이벤트를 실행했을 때
        startX = e.touches[0].pageX - ref.offsetLeft; // 마우스를 누른 시작 지점에 pageX - offsetLeft 할당
      }
      startScrollLeft = ref.scrollLeft; // 마우스를 눌렀을 때 scrollLeft의 위치는 ref의 scorllLeft로 할당
    }
  };
  const mouseTouchLeave = (e: MouseEvent | TouchEvent) => { // 마우스가 해당 target을 벗어났을 때 실행하는 이벤트 함수
    isDown = false; // 마우스를 뗐다고 판단
  };
  const mouseTouchUp = (e: MouseEvent | TouchEvent) => { // 마우스를 뗐을 때 실행하는 이벤트 함수
    isDown = false; // 마우스를 뗐다고 판단
  };
  const mouseTouchMove = (e: MouseEvent | TouchEvent) => { // 마우스를 target 내에서 움직일 때 실행하는 이벤트 함수
    const ref = dragRef.current; // dragRef.current가 아래에서 반복적으로 사용되기에 선언

    if (!isDown) return; // 마우스가 눌린 상태라면 리턴
    if (e.cancelable) e.preventDefault(); // 이벤트 취소가 가능할 때, 마우스를 움직이면서 지나가는 경로에 있는 다른 이벤트를 발생하는 현상을 방지

    if (ref) {
      if (e.type === 'mousemove' && 'pageX' in e) {
        const currentX = e.pageX - ref.offsetLeft; // 현재 위치는 pageX에서 offsetLeft를 뺀 값
        const walk = currentX - startX; // 변위 즉, 움직인 거리는 현재 위치에서 시작 위치를 뺀 값
        ref.scrollLeft = startScrollLeft - walk; // ref의 scrollLeft 위치에 마우스를 누를 때 scrollLeft 값에서 움직인 거리만큼 뺀다.
      } else if (e.type === 'touchmove' && 'touches' in e) {
        const currentX = e.touches[0].pageX - ref.offsetLeft;
        const walk = currentX - startX;
        ref.scrollLeft = startScrollLeft - walk;
      }
    }
  };

  useEffect(() => {
    const ref = dragRef.current; // dragRef.current가 아래에서 반복적으로 사용되기에 선언
    if (ref) { // 마운트 시에 이벤트를 등록
      ref.addEventListener('mousedown', mouseTouchDown);
      ref.addEventListener('mouseleave', mouseTouchLeave);
      ref.addEventListener('mouseup', mouseTouchUp);
      ref.addEventListener('mousemove', mouseTouchMove);
      ref.addEventListener('touchstart', mouseTouchDown);
      ref.addEventListener('touchcancel', mouseTouchLeave);
      ref.addEventListener('touchend', mouseTouchUp);
      ref.addEventListener('touchmove', mouseTouchMove);
    }

    return () => {
      if (ref) { // 언마운트 시에 이벤트 삭제
        ref.removeEventListener('mousedown', mouseTouchDown);
        ref.removeEventListener('mouseleave', mouseTouchLeave);
        ref.removeEventListener('mouseup', mouseTouchUp);
        ref.removeEventListener('mousemove', mouseTouchMove);
        ref.removeEventListener('touchstart', mouseTouchDown);
        ref.removeEventListener('touchcancel', mouseTouchLeave);
        ref.removeEventListener('touchend', mouseTouchUp);
        ref.removeEventListener('touchmove', mouseTouchMove);
      }
    };
  }, [dragRef]);

  return (
    <div id="add-img-list" className='add-img-list'>
      {previewFileList.map(imgUrl => {
        return (
          // <img src={imgUrl} alt="" key={imgUrl} width={250} height={250}/>
          <div>{imgUrl}</div>
        )
      })}
    </div>
  )
}
