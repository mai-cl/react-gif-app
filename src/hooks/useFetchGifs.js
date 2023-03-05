import { useState, useEffect, useRef } from 'react'
import { getGifs } from '../helpers/api'

const GIFS_QTY_PER_REQUEST = 12

export const useFetchGifs = category => {
  const [state, setState] = useState({
    gifs: [],
    loading: true,
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

    setState({ gifs: state.gifs, loading: true })

    offsetRef.current += GIFS_QTY_PER_REQUEST

    getGifs(category, offsetRef.current).then(data => {
      setState({
        gifs: [...state.gifs, ...data.gifs],
        loading: false,
      })
    })
  }, [pagination.reqsQty])

  useEffect(() => {
    window.stop()
    setState({ gifs: [], loading: true })

    getGifs(category).then(data => {
      setState({
        gifs: data.gifs,
        loading: false,
      })
      setPagination({
        reqsQty: 0,
        totalResults: data.pagination.total_count,
      })
      offsetRef.current = 0
    })
  }, [category])

  return { state, getNextResults, areThereMoreResults }
}
