import React from 'react'
import { Spinner } from 'react-bootstrap'

function Loading() {
  return (
    <div className='d-flex justify-content-center align-items-center' style={{height: 'calc(100vh - 56px)'}}>
       <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
    </div>
  )
}

export default Loading
