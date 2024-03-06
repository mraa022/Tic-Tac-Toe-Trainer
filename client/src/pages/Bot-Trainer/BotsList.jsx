import React, { useState,useEffect } from 'react'
import axios from 'axios'
import Bot from '../../components/Bot/Bot'
import { useNavigate } from 'react-router'
import '../../styles/bots.css'
export default function BotsList() {
    const navigate = useNavigate();
    const [bots,setBots] = useState([])
    useEffect(()=>{
        axios.get('bots/bots_list')
        .then(res=>{
            
            setBots(res.data)
        })
        .catch(err=>{
            console.log(err)
        })
    },[])
    const testBot = (bot)=>{
        navigate('/bot_type',{state:{bot:bot}})
    }

  return (
    
    <div>
        <h1>Bots list</h1>
        <div key='1' className='bots'>
      
            {bots.map((bot,idx)=>{
               return( <div>
                    <Bot key={idx} botName={bot.botName}></Bot>
                    <button key={bot._id} onClick={e=>{testBot(bot)}}>Play against bot</button>
                </div>)

               })}  
        </div>
    </div>
    
  )
}
