import React from 'react'
import '../../styles/bot.css'
export default function Bot({botName,creator}) {
  if (creator){
    return (
      <div className='bot'>
          <h1>{botName}</h1>
  
          <h3>Created by: {creator}</h3>
      </div>
    )
  
  }
  return (
    <div className='bot'>
        <h1>{botName}</h1>

    </div>
  )
}
