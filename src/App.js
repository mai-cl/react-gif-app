import React, { useState } from 'react'
import SearchCategory from './components/SearchCategory'
import GifGrid from './components/GifGrid'

const App = () => {
  const [category, setCategory] = useState(null)

  return (
    <>
      <h1>GifsApp</h1>
      <SearchCategory setCategory={setCategory} />
      <GifGrid category={category} />
    </>
  )
}

export default App
