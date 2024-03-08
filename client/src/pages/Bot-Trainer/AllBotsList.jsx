import React, { useState,useEffect } from 'react'
import axios from 'axios'
import Bot from '../../components/Bot/Bot'
import { useNavigate } from 'react-router'
import '../../styles/bots.css'
import { useContext } from 'react';
import { UserContext } from '../../context/userContext'
import Cookies from 'js-cookie'
export default function AllBotsList() {
    const navigate = useNavigate();
    const [bots,setBots] = useState([])
    const { user } = useContext(UserContext)
    
    useEffect(()=>{
        
        axios.get('bots/all_bots')
        .then(res=>{
            
            setBots(res.data)
        })
        .catch(err=>{
            console.log(err)
        })
    },[])
    const testBot = (bot)=>{
        console.log(bot)
        axios.post('bots/get_bot',{id:bot._id}).then(res=>{
            navigate('/bot_type',{state:{bot:res.data}})
        })
    }

    const challangeBot = (bot)=>{
        Cookies.set('opponent',bot._id)
        navigate('/pick_bot') // pick the bot you want to play for you
    }

  return (
    
    <div>
        <h1>All bots</h1>
        <div key='1' className='bots'>
      
            {bots.map((bot,idx)=>{
               return( <div>
                    <Bot key={idx} botName={bot.botName} creator={bot.bot_creater}></Bot>
                    <button key={bot._id} onClick={e=>{testBot(bot)}}>Play against bot</button>
                    <button onClick={e=>{challangeBot(bot)}}>Challange bot</button>
                </div>)

               })}  
        </div>
    </div>
    
  )
}
