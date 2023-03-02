import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { FaSearch } from 'react-icons/fa'

const SearchCategory = ({ setCategory }) => {
  const [inputValue, setInputValue] = useState('')

  const handleInputchange = e => {
    setInputValue(e.target.value)
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (inputValue.trim().length > 2) {
      setCategory(inputValue)
      setInputValue('')
    }
  }

  return (
    <form className='search-form' onSubmit={handleSubmit}>
      <input
        className='search-input'
        type='text'
        value={inputValue}
        onChange={handleInputchange}
      />
      <button type='submit' className='search-btn'>
        <FaSearch className='search-icon' size='1.6rem' />
      </button>
    </form>
  )
}

SearchCategory.propTypes = {
  setCategory: PropTypes.func.isRequired,
}

export default SearchCategory
