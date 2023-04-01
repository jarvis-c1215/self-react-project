import React from 'react'
import Spinner from 'react-bootstrap/Spinner';

export default function LoadingSpinner() {
  return (
  <Spinner animation="border" variant="primary" style={{position: 'absolute', bottom: '-50px'}}>
    <span className="visually-hidden">Loading...</span>
  </Spinner>
  )
}