import React, { useEffect, useRef, useState } from 'react'
import { useContext } from 'react'
import { HiLink, HiOutlineExternalLink } from 'react-icons/hi'
import MessageContext from '../context/MessageContext'

const GifGridItem = ({ id, title, url, dimensions }) => {
  const imgRef = useRef(null)
  const cardRef = useRef(null)
  const aspectRatio = useRef(null)
  const [spans, setSpans] = useState(0)
  const { showFlashMessage } = useContext(MessageContext)

  useEffect(() => {
    aspectRatio.current = dimensions.width / dimensions.height

    function onResizeWindow() {
      const spansCount = Math.ceil(
        imgRef.current.clientWidth / aspectRatio.current / 10
      )
      setSpans(spansCount)
    }

    function onLoadImg() {
      cardRef.current.classList.remove('card-skeleton')
    }

    onResizeWindow()

    window.addEventListener('resize', onResizeWindow)
    imgRef.current.addEventListener('load', onLoadImg)

    return () => {
      window.removeEventListener('resize', onResizeWindow)
    }
  }, [dimensions])

  function handleClickCopyLink() {
    navigator.clipboard.writeText(`https://i.giphy.com/media/${id}/giphy.gif`)
    showFlashMessage('Link copiado al portapapeles!', 'success')
  }

  function handleClickOpenInNewTab() {
    window.open(`https://i.giphy.com/media/${id}/giphy.gif`, '_blank')
  }

  return (
    <div
      ref={cardRef}
      className='card card-skeleton'
      style={{ gridRowEnd: `span ${spans}` }}
    >
      <div className='card-btn-container'>
        <button className='card-btn' onClick={handleClickCopyLink}>
          <HiLink className='card-btn-icon' size='2.1rem' color='#fff' />
        </button>
        <button className='card-btn' onClick={handleClickOpenInNewTab}>
          <HiOutlineExternalLink
            className='card-btn-icon'
            size='2.1rem'
            color='#fff'
          />
        </button>
      </div>
      <img ref={imgRef} src={url} alt={title} />
    </div>
  )
}

export default GifGridItem
