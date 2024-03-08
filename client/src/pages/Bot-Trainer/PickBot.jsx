import React, { useState,useEffect } from 'react'
import axios from 'axios'
import Bot from '../../components/Bot/Bot'
import { useNavigate } from 'react-router'
import '../../styles/bots.css'
import { useContext } from 'react';
import { UserContext } from '../../context/userContext'
import Cookies from 'js-cookie'
export default function PickBot() {
    const navigate = useNavigate();
    const [bots,setBots] = useState([])
    const { user } = useContext(UserContext)
    
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
        console.log(bot)
        axios.post('bots/get_bot',{id:bot._id}).then(res=>{

            navigate('/bot_type',{state:{bot:res.data,type:'Bot-v-Bot'}})
        })
       
    }

  return (
    
    <div>
        <h1>My bots</h1>
        <div key='1' className='bots'>
      
            {bots.map((bot,idx)=>{
               return( <div>
                    <Bot key={idx} botName={bot.botName}></Bot>
                    <button key={bot._id} onClick={e=>{testBot(bot)}}>Pick bot</button>
                </div>)

               })}  
        </div>
    </div>
    
  )
}
