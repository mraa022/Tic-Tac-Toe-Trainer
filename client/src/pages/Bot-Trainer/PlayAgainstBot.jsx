import React from 'react'
import {useLocation} from 'react-router-dom';
export default function PlayAgainstBot() {
    const location = useLocation();
    const type = location.state.type;
    const Q_table = location.state.Q_table;
    console.log(Q_table)
  return (
    <div>
      BOT {type} CHOSEN
    </div>
  )
}
