import React, { useCallback, useEffect, useRef, useState } from 'react'
import SearchCategory from './components/SearchCategory'
import GifGrid from './components/GifGrid'
import FlashMessage from './components/FlashMessage'
import MessageContext from './context/MessageContext'

const App = () => {
  const [category, setCategory] = useState(null)
  const [searchCounter, setSearchCounter] = useState(0)
  const [message, setMessage] = useState('')
  const [typeMessage, setTypeMessage] = useState(null)
  const [showMessage, setShowMessage] = useState(false)
  const timeoutId = useRef(null)

  /* function showFlashMessage(newMessage, typeMessage) {
    setMessage(newMessage)
    setTypeMessage(typeMessage)
    setShowMessage(true)
  } */

  const showFlashMessage = useCallback(
    (newMessage, typeMessage) => {
      setMessage(newMessage)
      setTypeMessage(typeMessage)
      setShowMessage(true)
    },
    [setMessage, setTypeMessage, setShowMessage]
  )

  useEffect(() => {
    if (!showMessage) return

    if (timeoutId.current) {
      clearTimeout(timeoutId.current)
    }

    timeoutId.current = setTimeout(() => {
      setShowMessage(false)
    }, 3000)
  }, [message, showMessage])

  return (
    <>
      {showMessage && <FlashMessage text={message} type={typeMessage} />}
      <MessageContext.Provider value={{ showFlashMessage }}>
        <div className='container'>
          <header className='header'>
            <h1 className='heading-1'>
              <a className='header-anchor' href='/'>
                GifsApp
              </a>
            </h1>
            <SearchCategory
              setCategory={setCategory}
              setSearchCounter={setSearchCounter}
            />
          </header>
          <GifGrid category={category} searchCounter={searchCounter} />
        </div>
      </MessageContext.Provider>
    </>
  )
}

export default App
