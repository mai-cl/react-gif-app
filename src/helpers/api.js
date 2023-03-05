export const getGifs = async (category, offset = 0) => {
  const url = category
    ? `https://api.giphy.com/v1/gifs/search?q=${encodeURI(
        category
      )}&limit=12&offset=${offset}&api_key=${process.env.REACT_APP_API_KEY}`
    : `https://api.giphy.com/v1/gifs/trending?limit=12&offset=${offset}&api_key=${process.env.REACT_APP_API_KEY}`

  return fetchData(url)
}

const fetchData = async url => {
  const resp = await fetch(url)
  const data = await resp.json()

  const gifs = data.data.map(img => {
    return {
      id: img.id,
      title: img.title,
      url: img.images?.fixed_width.url,
      dimensions: {
        width: img.images.fixed_width.width,
        height: img.images.fixed_width.height,
      },
    }
  })
  return { gifs, pagination: data.pagination, meta: data.meta }
}
