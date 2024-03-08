import React,{useState,useEffect} from 'react'
import axios from 'axios'
import '../../styles/leaderboard.css'
export default function Leaderboard() {

    const [leaderboard,setLeaderboard] = useState([])
    useEffect(()=>{
        axios.get('bots/bots_leaderboard')
        .then(res=>{
            setLeaderboard(res.data)
        })
        .catch(err=>{
            console.log(err)
        })
    },[])
  return (
    
    <div>
        <h1>Leaderboard of all the different bots</h1>
      <table>
        <tr>
          <th>Bot creator</th>
          <th>Bot Name</th>
          <th>Bot symbol</th>
          <th>Wins</th>
          <th>Losses</th>
          <th>Draws</th>
        </tr>
        {leaderboard.map((bot,idx)=>{
          return(
            <tr>
              <td>{bot.bot_creater}</td>
              <td>{bot.botName}</td>
              <td>{bot.botType}</td>
              <td>{bot.wins}</td>
              <td>{bot.losses}</td>
              <td>{bot.draws}</td>
            </tr>
          )
        })}
      </table>
    </div>
  )
}
