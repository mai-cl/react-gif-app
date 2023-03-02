import React from 'react'
import { useFetchGifs } from '../hooks/useFetchGifs'
import GifGridItem from './GifGridItem'
import LoadingDots from './LoadingDots'

const GifGrid = ({ category }) => {
  const { data: images, loading } = useFetchGifs(category)

  if (images.length === 0 && loading === false) {
    return (
      <h2 className='heading-2 animate__animated animate__fadeIn'>
        No hay resultados para "{category}"
      </h2>
    )
  }

  return (
    <>
      <h2 className='heading-2 animate__animated animate__fadeIn'>
        {category
          ? `Resultados para 
        "${category}"`
          : 'Trending'}
      </h2>
      {loading ? (
        <LoadingDots />
      ) : (
        <div className='card-grid'>
          {images.map(img => (
            <GifGridItem {...img} key={img.id} />
          ))}
        </div>
      )}
    </>
  )
}

export default GifGrid
