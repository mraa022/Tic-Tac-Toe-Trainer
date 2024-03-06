import React from 'react'
import {useLocation} from 'react-router-dom';
import { useNavigate } from 'react-router'
export default function ChooseBotType() {
    const navigate = useNavigate();
    const location = useLocation();
    const bot = location.state.bot;
  return (
    <div>
      <button onClick={()=>navigate('/play_bot',{state: {type: 'X',Q_table:bot.player_x_q}})}>Play against X-Bot</button>
      <button onClick={()=>navigate('/play_bot',{state: {type: 'O',Q_table:bot.player_o_q}})}>Play against O-Bot</button>
    </div>
  )
}
