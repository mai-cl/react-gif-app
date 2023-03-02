import React, { useState } from 'react'
import SearchCategory from './components/SearchCategory'
import GifGrid from './components/GifGrid'

const App = () => {
  const [category, setCategory] = useState(null)

  return (
    <div className='container'>
      <header className='header'>
        <h1 className='heading-1'>GifsApp</h1>
        <SearchCategory setCategory={setCategory} />
      </header>
      <GifGrid category={category} />
    </div>
  )
}

export default App
