import React from 'react'
import loading from './loading.gif'
export default function Spinner() {
  return (
    <div class = 'text-center'>
      <img src={loading} alt="loading" />
    </div>
  )
}
