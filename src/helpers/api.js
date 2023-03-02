export const getGifs = async category => {
  const url = `https://api.giphy.com/v1/gifs/search?q=${encodeURI(
    category
  )}&limit=15&api_key=${process.env.REACT_APP_API_KEY}`

  return fetchData(url)
}

export const getTrendingGifs = async () => {
  const url = `https://api.giphy.com/v1/gifs/trending?limit=15&api_key=${process.env.REACT_APP_API_KEY}`

  return fetchData(url)
}

const fetchData = async url => {
  const resp = await fetch(url)
  const { data } = await resp.json()

  const gifs = data.map(img => {
    return {
      id: img.id,
      title: img.title,
      url: img.images?.downsized_medium.url,
    }
  })
  return gifs
}
