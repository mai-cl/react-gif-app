import { useState, useEffect } from 'react'
import { getGifs, getTrendingGifs } from '../helpers/api'

export const useFetchGifs = category => {
  const [state, setState] = useState({
    data: [],
    loading: true,
  })

  useEffect(() => {
    setState(prevState => ({ ...prevState, loading: true }))
    if (!category) {
      getTrendingGifs().then(data => {
        setState({
          data,
          loading: false,
        })
      })
    } else {
      getGifs(category).then(data => {
        setState({
          data,
          loading: false,
        })
      })
    }
  }, [category])

  return state
}
