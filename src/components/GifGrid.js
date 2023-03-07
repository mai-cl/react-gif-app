import React, { useContext, useEffect } from 'react'
import MessageContext from '../context/MessageContext'
import { useFetchGifs } from '../hooks/useFetchGifs'
import GifGridItem from './GifGridItem'
import LoadingDots from './LoadingDots'

const GifGrid = ({ category }) => {
  const {
    state: { gifs, loading, loadingMoreResults, error },
    getNextResults,
    areThereMoreResults,
  } = useFetchGifs(category)

  const { showFlashMessage } = useContext(MessageContext)

  useEffect(() => {
    if (!error) return
    showFlashMessage(error.message, 'error')
  }, [error])

  if (loading) {
    return <LoadingDots />
  }

  if (error) {
    return <h2 className='heading-2 text-center'>{error.message}</h2>
  }

  if (gifs.length === 0) {
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

      {loadingMoreResults ? (
        <LoadingDots />
      ) : areThereMoreResults() ? (
        <button className='btn btn-center' onClick={getNextResults}>
          Cargar más resultados
        </button>
      ) : null}
    </>
  )
}

export default GifGrid
