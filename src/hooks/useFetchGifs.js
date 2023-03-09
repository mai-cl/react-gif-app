import { useState, useEffect, useRef } from 'react'
import { getGifs } from '../helpers/api'

const GIFS_QTY_PER_REQUEST = 12

export const useFetchGifs = (category, searchCounter) => {
  const [state, setState] = useState({
    gifs: [],
    loading: true,
    loadingMoreResults: false,
    error: null,
  })
  const offsetRef = useRef(0)
  const [pagination, setPagination] = useState({
    reqsQty: 0,
    totalResults: 0,
  })

  function areThereMoreResults() {
    return (
      Math.ceil(pagination.totalResults / GIFS_QTY_PER_REQUEST) >
      pagination.reqsQty + 1
    )
  }

  function getNextResults() {
    setPagination({
      ...pagination,
      reqsQty: pagination.reqsQty + 1,
    })
  }

  useEffect(() => {
    if (!pagination.reqsQty) return

    setState(prevState => ({
      ...prevState,
      error: null,
      loadingMoreResults: true,
    }))

    offsetRef.current += GIFS_QTY_PER_REQUEST

    getGifs(category, offsetRef.current)
      .then(data => {
        setState(prevState => ({
          ...prevState,
          gifs: [...prevState.gifs, ...data.gifs],
          loadingMoreResults: false,
        }))
      })
      .catch(err => {
        setState(prevState => ({
          ...prevState,
          loadingMoreResults: false,
          error: { message: err.message },
        }))
      })
  }, [pagination.reqsQty])

  useEffect(() => {
    window.stop()
    setState(prevState => ({
      ...prevState,
      gifs: [],
      loading: true,
      error: null,
    }))

    getGifs(category)
      .then(data => {
        setState(prevState => ({
          ...prevState,
          gifs: data.gifs,
          loading: false,
        }))
        setPagination({
          reqsQty: 0,
          totalResults: data.pagination.total_count,
        })
        offsetRef.current = 0
      })
      .catch(err => {
        setState(prevState => ({
          ...prevState,
          loading: false,
          error: { message: err.message },
        }))
      })
  }, [category, searchCounter])

  return { state, getNextResults, areThereMoreResults }
}
