import React from 'react'
import {
  HiOutlineCheckCircle,
  HiOutlineExclamationTriangle,
} from 'react-icons/hi2'

const colorMessage = {
  success: 'flash-message-success',
  error: 'flash-message-error',
}

const iconMessage = {
  success: <HiOutlineCheckCircle size='2rem' />,
  error: <HiOutlineExclamationTriangle size='2rem' />,
}

const FlashMessage = ({ text, type }) => {
  return (
    <div className={'flash-message ' + colorMessage[type]}>
      {iconMessage[type]}
      <p className='flash-message-text'>{text}</p>
    </div>
  )
}

export default FlashMessage
