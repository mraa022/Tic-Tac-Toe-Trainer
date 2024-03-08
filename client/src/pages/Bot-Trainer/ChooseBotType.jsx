import React from 'react'
import {useLocation} from 'react-router-dom';
import { useNavigate } from 'react-router'
import Cookies from 'js-cookie'
import axios from 'axios';
export default function ChooseBotType() {
    const navigate = useNavigate();
    const location = useLocation();
    const bot = location.state.bot;
    const type = location.state.type;
    console.log("FFFF ", bot)
    const challangeBot = (bot,type)=>{
      const opponent_id = Cookies.get('opponent')
      axios.post('bots/get_bot',{id:opponent_id}).then(res=>{
        const opponent = res.data
        if(type === 'X'){
          navigate('/bot-v-bot',{state: {type: type,Q_table1:bot.player_x_q,Q_table2:opponent.player_o_q,id1:bot._id,id2:opponent._id}})
        }
        else{
          navigate('/bot-v-bot',{state: {type: type,Q_table1:bot.player_o_q,Q_table2:opponent.player_x_q}})
        }
        
      })
      
    }
    if (!type){
      return (
        <div>
          <button onClick={()=>navigate('/game',{state: {type: 'X',Q_table:bot.player_x_q}})}>Play against X-Bot</button>
          <button onClick={()=>navigate('/game',{state: {type: 'O',Q_table:bot.player_o_q}})}>Play against O-Bot</button>
        </div>
      )
    }
    else{ 
      
     
        return (
        <div>
          <button onClick={()=>{
            challangeBot(bot,'X')
          }}>Your X-bot vs other O-bot</button>
          <button onClick={()=>{
            challangeBot(bot,'O')
          }}>Your O-bot vs other X-bot</button>
        </div>
      )

    }
  
}
