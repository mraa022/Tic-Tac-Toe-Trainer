import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router'
import { useEffect, useState } from 'react'
import { useContext } from 'react';
import { UserContext } from '../../context/userContext'
import '../../styles/form.css'
import Cookies from 'js-cookie'
export default function CreateBotX() {
    const navigate = useNavigate()
    const { user } = useContext(UserContext)
   
    const [botInfo, setBotInfo] = useState({
        botName: '',
        alpha_x: 0,
        epsilon_x: 0,
        gamma_x: 0,
        reward_x:0,
        punishment_x:0,
        draw_x:0,
    })

    const createBot = async (e) => {
        e.preventDefault()
        if (user){
            Cookies.set('X',JSON.stringify(botInfo))
            console.log(Cookies.get('X'));
            navigate('/create_o_bot')
           
            
        console.log("HI")
    }
}
    return (
        <div>
            <h1>X player properties</h1>
            <form onSubmit={createBot} className="bot-form">
                <div className='bot-info'>
                    <label>Bot name</label>
                    <input value={botInfo.botName} onChange={(e) => setBotInfo({ ...botInfo, botName: e.target.value })} placeholder='enter bot name...'></input>

                    <details>
                    <summary>Additional Information</summary>
                    <p>This paramater is called the "learning rate" and should be between 0 and 1. It controls how fast the bot updates it's policy. If it's too
                        large, the bot will update too fast and might overshoot. If it's instead too low, the bot will take
                        too long to learn.</p>
                    </details>
                    <label>Alpha value</label>
                    <input value={botInfo.alpha_x} onChange={(e) => setBotInfo({ ...botInfo, alpha_x: e.target.value })} type='number' placeholder='enter Alpha...'></input>


                    <details>
                    <summary>Additional Information</summary>
                    <p>This paramater is the "exploration probability", It should be between 0 and 1. If it's high, the bot will 
                        explore new strategies more often, and if it's low the bot will stick to the current best strategy it knows.
                        If it's too high, the bot will spend all of it's time exploring and not "exploiting", and if it's too low, 
                        it will spend all of it's time expoloiting the best strategy it knows and not find any better strategy.</p>
                    </details>
                    <label>Epsilon value</label>
                    <input value={botInfo.epsilon_x} onChange={(e) => setBotInfo({ ...botInfo, epsilon_x: e.target.value })} type='number' placeholder='enter Epsilon...'></input>


                    <details>
                    <summary>Additional Information</summary>
                    <p>This paramater is called the "discout factor", it should be between 0 and 1. It controls how much the bot
                        "cares" about the future. The closer it is to 0, the more likely the bot will only learn startegies that produce immediate results/rewards.
                        And the closer it is to 1, the more likely the bot will learn strategies that produce long term results/rewards.
                    </p>
                    </details>
                    <label>Gamma value</label>
                    <input value={botInfo.gamma_x} onChange={(e) => setBotInfo({ ...botInfo, gamma_x: e.target.value })} type='number' placeholder='enter Gamma...'></input>


                    <details>
                    <summary>Additional Information</summary>
                    <p>This is the signal you send to the bot to tell it "you did well" if it wins a game. It can be any number
                        (positive means good, negative means bad, 0 means neutral). 
                    </p>
                    </details>
                    <label>Reward value</label>
                    <input value={botInfo.reward_x} onChange={(e) => setBotInfo({ ...botInfo, reward_x: e.target.value })} type='number' placeholder='enter Reward...'></input>



                    <details>
                    <summary>Additional Information</summary>
                    <p>This the signal you send to the bot to "punish" it when it looses a game. It can be any number, but it's usually negative</p>
                    </details>
                    <label>Punishment value</label>
                    <input value={botInfo.punishment_x} onChange={(e) => setBotInfo({ ...botInfo, punishment_x: e.target.value })} type='number' placeholder='enter Punishment...'></input>


                    <details>
                    <summary>Additional Information</summary>
                    <p>This is the signal you send to the bot when the game ends in a draw. It can also be any numbeer.
                        An example of possible values is (reward=1, punishment=-1, draw=0). Or draw=0.5 since it's not as good as winnig,
                        but still better than loosing.
                    </p>
                    </details>
                    <label>Draw value</label>
                    <input value={botInfo.draw_x} onChange={(e) => setBotInfo({ ...botInfo, draw_x: e.target.value })} type='number' placeholder='enter Draw...'></input>

                </div>

                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}
