import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router'
import { useEffect, useState } from 'react'
import { useContext } from 'react';
import { UserContext } from '../../context/userContext'
import Cookies from 'js-cookie'
import '../../styles/form.css'
export default function CreateBotO() {
    const navigate = useNavigate()
    const { user } = useContext(UserContext)
   
    const [botInfo, setBotInfo] = useState({
        alpha_o: 0,
        epsilon_o: 0,
        gamma_o: 0,
        reward_o:0,
        punishment_o:0,
        draw_o:0,
    })

    const createBot = async (e) => {
        e.preventDefault()
        if (user){
            axios.defaults.withCredentials = false
            var config = { headers: {  
                      'Content-Type': 'application/json',
                      'Access-Control-Allow-Origin': '*'}
             }
            
           
            const O = botInfo
            const X = JSON.parse(Cookies.get('X'))
            const botsInfo = {...O,...X}
            axios.post('http://127.0.0.1:5000',{
                data:botsInfo
            },config).then(({data})=>{
                    axios.defaults.withCredentials = true
                    axios.post('bots/create_bot',{
                        player_o_q: data.player_o_q,
                        player_x_q: data.player_x_q,
                        botName:X.botName
                    }).then(({data})=>{
                        console.log(data)
            })
     })
            
}}
    return (
        <div>
            <h1>O player properties</h1>
            <form onSubmit={createBot} className="bot-form">
                <div className='bot-info'>
                    
                    <label>Alpha value</label>
                    <input value={botInfo.alpha_o} onChange={(e) => setBotInfo({ ...botInfo, alpha_o: e.target.value })} type='number' placeholder='enter Alpha...'></input>
                    
                    <label>Epsilon value</label>
                    <input value={botInfo.epsilon_o} onChange={(e) => setBotInfo({ ...botInfo, epsilon_o: e.target.value })} type='number' placeholder='enter Epsilon...'></input>

                    <label>Gamma value</label>
                    <input value={botInfo.gamma_o} onChange={(e) => setBotInfo({ ...botInfo, gamma_o: e.target.value })} type='number' placeholder='enter Gamma...'></input>

                    <label>Reward value</label>
                    <input value={botInfo.reward_o} onChange={(e) => setBotInfo({ ...botInfo, reward_o: e.target.value })} type='number' placeholder='enter Reward...'></input>

                    <label>Punishment value</label>
                    <input value={botInfo.punishment_o} onChange={(e) => setBotInfo({ ...botInfo, punishment_o: e.target.value })} type='number' placeholder='enter Punishment...'></input>

                    <label>Draw value</label>
                    <input value={botInfo.draw_o} onChange={(e) => setBotInfo({ ...botInfo, draw_o: e.target.value })} type='number' placeholder='enter Draw...'></input>

                </div>

                <button type='submit'>Train Bot</button>
            </form>
        </div>
    )
}
