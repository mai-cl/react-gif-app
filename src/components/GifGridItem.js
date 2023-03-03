import React, { useEffect, useRef, useState } from 'react'

const GifGridItem = ({ id, title, url }) => {
  const imgRef = useRef(null)
  const aspectRatio = useRef(null)
  const [spans, setSpans] = useState(0)

  useEffect(() => {
    const imgNode = imgRef.current

    function onResizeWindow() {
      const imgWidth = imgNode.clientWidth
      const spansCount = Math.ceil(imgWidth / aspectRatio.current / 10)
      setSpans(spansCount)
    }

    function onLoadImg() {
      const imgNaturalHeight = imgNode.naturalHeight
      const imgNaturalWidth = imgNode.naturalWidth
      aspectRatio.current = imgNaturalWidth / imgNaturalHeight

      onResizeWindow()

      window.addEventListener('resize', onResizeWindow)
    }

    imgRef.current.addEventListener('load', onLoadImg)

    return () => {
      window.removeEventListener('resize', onResizeWindow)
      imgNode.removeEventListener('load', onLoadImg)
    }
  }, [])

  function handleClickCopyLink() {
    navigator.clipboard.writeText(`https://i.giphy.com/media/${id}/giphy.gif`)
  }

  function handleClickOpenInNewTab() {
    window.open(`https://i.giphy.com/media/${id}/giphy.gif`, '_blank')
  }

  return (
    <div className='card' style={{ gridRowEnd: `span ${spans}` }}>
      <div className='card-btn-container'>
        <button onClick={handleClickCopyLink}>Copy link</button>
        <button onClick={handleClickOpenInNewTab}>Open in new tab</button>
      </div>
      <img ref={imgRef} src={url} alt={title} />
    </div>
  )
}

export default GifGridItem
