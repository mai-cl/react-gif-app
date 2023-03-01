import React from 'react'
import { useFetchGifs } from '../hooks/useFetchGifs'
import GifGridItem from './GifGridItem'

const GifGrid = ({ category }) => {
  const { data: images, loading } = useFetchGifs(category)

  if (images.length === 0 && loading === false) {
    return (
      <h2 className='animate__animated animate__fadeIn'>
        No hay resultados para "{category}"
      </h2>
    )
  }

  return (
    <>
      <h2 className='animate__animated animate__fadeIn'>
        {category ? category : 'Trending'}
      </h2>
      {loading ? (
        <p className='animate__animated animate__flash animate__infinite'>
          Loading
        </p>
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
