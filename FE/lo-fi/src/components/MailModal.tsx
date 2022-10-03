import React, {useRef, useEffect, useState} from 'react'
import close from '../assets/img/icon/close.png'
import './MailModal.css'

export default function MailModal(props:any) {
  const el = useRef<HTMLDivElement|null> (null)
  const [context, setContext] = useState('')
  const [send, setSend] = useState(false)
  const [url, setUrl] = useState( `mailto:${props.email}&amp;subject=등록된 물건을 찾았습니다`)

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

  const handleUrl = (e:any) => {
    setContext(e.target.value)
    setUrl(
      `mailto:${props.email}?mailto&subject=등록된 물건을 찾았습니다&mailto&body=${e.target.value}`
    )
  }

  const sendEmail = () => {
    setSend(true)
    setTimeout(() => props.closeMail(), 2000)
  }

  if (send) {
    return (
      <div className='mail-modal-background'>
        <div className='send-finish'>
          전송이 완료되었습니다.
        </div>
      </div>

    )
  } else {
    return (
      <div className='map_wrap' ref={el} >
        <div className='mail-container'>
          <div className='mail-top-nav'>
            <img src={close} alt="" width={20} height={20} onClick={closeModal} />
            <a href={url}
            className='mail-send-button' onClick={sendEmail}>전송</a>
          </div>
          <div className='mail-content'>
            <p style={{fontSize: "20px"}}>보낼 내용</p>
            <textarea name="" className='mail-textarea' onChange={handleUrl} value={context}></textarea>
          </div>
        </div>
      </div>
      
    )
  }
}
