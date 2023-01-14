import React from 'react'

const OutputBlock = (props) => {
  return (
    <div className='output-block' onClick={() => props.onDelete(props.item)}>Here's a question on the topic of {props.item}</div>
  )
}

export default OutputBlock