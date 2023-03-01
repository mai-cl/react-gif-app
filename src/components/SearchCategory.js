import React, { useState } from 'react'
import PropTypes from 'prop-types'

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
    <form onSubmit={handleSubmit}>
      <input type='text' value={inputValue} onChange={handleInputchange} />
    </form>
  )
}

SearchCategory.propTypes = {
  setCategory: PropTypes.func.isRequired,
}

export default SearchCategory
