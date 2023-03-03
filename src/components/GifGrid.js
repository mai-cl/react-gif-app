import React, { useRef } from 'react'
import { useFetchGifs } from '../hooks/useFetchGifs'
import GifGridItem from './GifGridItem'
import LoadingDots from './LoadingDots'

const GifGrid = ({ category }) => {
  const {
    state: { gifs, loading },
    getNextResults,
    areThereMoreResults,
  } = useFetchGifs(category)

  if (gifs.length === 0 && loading === false) {
    return <h2 className='heading-2'>No hay resultados para "{category}"</h2>
  }

  return (
    <>
      <h2 className='heading-2'>
        {category
          ? `Resultados para 
        "${category}"`
          : 'Trending'}
      </h2>

      <div className='card-grid'>
        {gifs.map((img, index) => (
          <GifGridItem {...img} key={img.id + index} />
        ))}
      </div>
      {loading && <LoadingDots />}
      {areThereMoreResults() && !loading ? (
        <button className='btn btn-center' onClick={getNextResults}>
          Cargar más resultados
        </button>
      ) : null}
    </>
  )
}

export default GifGrid
