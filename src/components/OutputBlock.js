import React from 'react'

const OutputBlock = (props) => {
  return (
    <div className='output-block' onClick={() => props.onDelete(props.item)}>{props.item}</div>
  )
}

export default OutputBlock