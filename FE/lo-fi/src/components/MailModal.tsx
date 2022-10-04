import React, {useRef, useEffect} from 'react'
import close from '../assets/img/icon/close.png'
import './MailModal.css'

export default function MailModal(props:any) {
  const el = useRef<HTMLDivElement|null> (null)

  useEffect(() => {
    window.addEventListener('click', (e) => {
      if (e.target === el.current) {
        props.closeMail()
      }
    })

    return (
      window.removeEventListener('click', (e) => {
        if (e.target === el.current) {
          props.closeMail()
        }
      })
    )
  })

  const closeModal = () => {
    props.closeMail()
  }

  return (
    <div className='mail-modal-background' ref={el}>
      <div className='mail-container'>
        <div className='mail-top-nav'>
          <img src={close} alt="" width={25} height={25} onClick={closeModal} />
          <button className='mail-send-button'>전송</button>
        </div>
        <div className='mail-content'>
          <p style={{fontSize: "20px"}}>보낼 내용</p>
          <textarea name="" className='mail-textarea'></textarea>
        </div>
      </div>
    </div>
    
  )
}
