import React, {RefObject, useEffect, useState, useRef} from 'react'
import close from '../assets/img/icon/close.png'
import './AddPagePreviewimgList.css'
import { Iprops } from '../pages/AddDetailPage'
//previewFileList: string[], dragRef: RefObject<HTMLElement>, deleteImg: Iprops
export default function AddPagePreviewImgList(props:any) {
  const list: string[] = []
  const [fileList, setFileList] = useState(list)
  const el = useRef<HTMLDivElement| null>(null)

  const deleteIdx = (e:any) => {
    props.deleteImg(e.target.id)
  }

  useEffect(() => {
    setFileList(props.previewImg)
  }, [props.previewImg]);

  return (
    <div className='add-img-list'>
      {fileList.map((imgUrl, idx) => {
        return (
          <div key={idx}>
            <div className='img-delete-background' onClick={deleteIdx} >
              <img src={close} alt="" className='img-close' id={`${idx}`} width={10} height={10}/>
            </div>
            <img src={imgUrl} alt="" key={imgUrl} width={250} height={250}/>
          </div>
        )
      })}
    </div>
  )
}
