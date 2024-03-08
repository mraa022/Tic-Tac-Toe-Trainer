import React, { useState,useEffect } from 'react'
import Square from '.././Game/Square'
import '../../styles/board.css'
import {useLocation} from 'react-router-dom';
import { useNavigate } from 'react-router'
import axios from 'axios'
export default function BotvBot() {
    const location = useLocation();
    const navigate = useNavigate();
    const Q_table1 = location.state.Q_table1
    const Q_table2 = location.state.Q_table2
    const type = location.state.type

    const {my_botName,my_bot_creator,my_bot_id,my_bot_symbol} = location.state.my_bot
    const {opponent_botName,opponent_bot_creator,opponent_bot_id,opponent_bot_symbol} = location.state.opponent_bot

    

    const [board,setBoard] = useState(["","","","","","","","",""])
    const [matrix,setMatrix] = useState([[0,0,0],[0,0,0],[0,0,0]])
    const matrixPos = {0:[0,0],1:[0,1],2:[0,2],3:[1,0],4:[1,1],5:[1,2],6:[2,0],7:[2,1],8:[2,2]}
    const botActions = {'(0, 0)':0,'(0, 1)':1,'(0, 2)':2,'(1, 0)':3,'(1, 1)':4,'(1, 2)':5,'(2, 0)':6,'(2, 1)':7,'(2, 2)':8}
    const playerNum = {'X':1,'O':-1,'':0}
    const botSymbol = type
    const otherpBotSymbol = type === 'X' ? 'O' : 'X'
    const Q_tables = {[botSymbol]:Q_table1,[otherpBotSymbol]:Q_table2}
    const [botTurn,setBotTurn] = useState('X') // X always goes first
    const gameOverMsg = {[botSymbol]:"your Bot won",[otherpBotSymbol]:"Other Bot won"}
    const [gameOver,setGameOver] = useState(false)
    const hash_board = ()=>{
        let hash = 0
        let k=0
        for (let row=0;row<3;row++){
            for (let col=0;col<3;col++){
                hash+= (3**k)*matrix[row][col]
                k+=1
            }
        }
        // return str(hash)
         
        return String(hash)
    }
    const getMax = object => { // gets a list of max key values in a dictionary
        let max = Math.max(...Object.values(object))
        return Object.keys(object).filter(key => object[key]==max)
    }


    const find_bot_move = (Q_table)=>{
        const s = hash_board()
        
        const possible_actions = Q_table[s]
        if (!possible_actions){
            alert("One of the bots never saw this state before. Thus the game was prematurely ended.")
            setGameOver(true)
            navigate(0)
        }
        else{
           // pick random action above possible_actions 
          const actions = getMax(possible_actions); // multiple actions that might have same value. pick random one
          const random_action = actions[Math.floor(Math.random() * actions.length)];
          // get botActions at the key random_action
           const actual_action = botActions[random_action];
           if (board[actual_action] !== ""){
               if(botTurn === playerNum){
                    alert("Your Bot chose a square that is already taken. Therefore it lost. Please train it again")
                    axios.post('/bots/leaderBoard',{bot_id:my_bot_id,bot_name:my_botName,bot_creator:my_bot_creator,status:'loss',bot_type:botSymbol})
                    axios.post('/bots/leaderBoard',{bot_id:opponent_bot_id,bot_name:opponent_botName,bot_creator:opponent_bot_creator,status:'win',bot_type:otherpBotSymbol})
               }
               else{
                    alert("The other Bot chose a square that is already taken. Therefore it lost and you won.")
                    axios.post('/bots/leaderBoard',{bot_id:opponent_bot_id,bot_name:opponent_botName,bot_creator:opponent_bot_creator,status:'loss',bot_type:otherpBotSymbol})
                    axios.post('/bots/leaderBoard',{bot_id:my_bot_id,bot_name:my_botName,bot_creator:my_bot_creator,status:'win',bot_type:botSymbol})
               } 
               
               setGameOver(true)
               navigate(0)
           }
           else{
            return actual_action
           }
        }
    }


    useEffect(()=>{
        setMatrix([
            [playerNum[board[0]],playerNum[board[1]],playerNum[board[2]]],
            [playerNum[board[3]],playerNum[board[4]],playerNum[board[5]]],
            [playerNum[board[6]],playerNum[board[7]],playerNum[board[8]]]
        ])
        // if the game is won 
        // check diagonals 
        
    },[board])
    useEffect(()=>{

    if (matrix[0][0] === matrix[1][1] && matrix[1][1] === matrix[2][2] && matrix[0][0] !== 0){
            if (matrix[0][0]==1){
                if(playerNum[botSymbol] === 1){
                    axios.post('/bots/leaderBoard',{bot_id:my_bot_id,bot_name:my_botName,bot_creator:my_bot_creator,status:'win',bot_type:botSymbol})
                    axios.post('/bots/leaderBoard',{bot_id:opponent_bot_id,bot_name:opponent_botName,bot_creator:opponent_bot_creator,status:'loss',bot_type:otherpBotSymbol})
                }
                else{
                    axios.post('/bots/leaderBoard',{bot_id:my_bot_id,bot_name:my_botName,bot_creator:my_bot_creator,status:'loss',bot_type:botSymbol})
                    axios.post('/bots/leaderBoard',{bot_id:opponent_bot_id,bot_name:opponent_botName,bot_creator:opponent_bot_creator,status:'win',bot_type:otherpBotSymbol})
                }
                alert(gameOverMsg['X'])
            }
            else{
                if(playerNum[botSymbol] === -1){
                    axios.post('/bots/leaderBoard',{bot_id:my_bot_id,bot_name:my_botName,bot_creator:my_bot_creator,status:'win',bot_type:botSymbol})
                    axios.post('/bots/leaderBoard',{bot_id:opponent_bot_id,bot_name:opponent_botName,bot_creator:opponent_bot_creator,status:'loss',bot_type:otherpBotSymbol})
                }
                else{
                    axios.post('/bots/leaderBoard',{bot_id:my_bot_id,bot_name:my_botName,bot_creator:my_bot_creator,status:'loss',bot_type:botSymbol})
                    axios.post('/bots/leaderBoard',{bot_id:opponent_bot_id,bot_name:opponent_botName,bot_creator:opponent_bot_creator,status:'win',bot_type:otherpBotSymbol})
                }
                alert(gameOverMsg['O'])
            }
            setGameOver(true)
            navigate(0)
        }
        // check other diagonal
        if (matrix[0][2] === matrix[1][1] && matrix[1][1] === matrix[2][0] && matrix[0][2] !== 0){
            if (matrix[0][2]==1){
                if(playerNum[botSymbol] === 1){
                    axios.post('/bots/leaderBoard',{bot_id:my_bot_id,bot_name:my_botName,bot_creator:my_bot_creator,status:'win',bot_type:botSymbol})
                    axios.post('/bots/leaderBoard',{bot_id:opponent_bot_id,bot_name:opponent_botName,bot_creator:opponent_bot_creator,status:'loss',bot_type:otherpBotSymbol})
                }
                else{
                    axios.post('/bots/leaderBoard',{bot_id:my_bot_id,bot_name:my_botName,bot_creator:my_bot_creator,status:'loss',bot_type:botSymbol})
                    axios.post('/bots/leaderBoard',{bot_id:opponent_bot_id,bot_name:opponent_botName,bot_creator:opponent_bot_creator,status:'win',bot_type:otherpBotSymbol})
                }
                alert(gameOverMsg['X'])
            }
            else{
                if(playerNum[botSymbol] === -1){
                    axios.post('/bots/leaderBoard',{bot_id:my_bot_id,bot_name:my_botName,bot_creator:my_bot_creator,status:'win',bot_type:botSymbol})
                    axios.post('/bots/leaderBoard',{bot_id:opponent_bot_id,bot_name:opponent_botName,bot_creator:opponent_bot_creator,status:'loss',bot_type:otherpBotSymbol})
                }
                else{
                    axios.post('/bots/leaderBoard',{bot_id:my_bot_id,bot_name:my_botName,bot_creator:my_bot_creator,status:'loss',bot_type:botSymbol})
                    axios.post('/bots/leaderBoard',{bot_id:opponent_bot_id,bot_name:opponent_botName,bot_creator:opponent_bot_creator,status:'win',bot_type:otherpBotSymbol})
                }
                alert(gameOverMsg['O'])
            }
            setGameOver(true)
            navigate(0)
        }
        // check rows
        for (let i=0;i<3;i++){
            if (matrix[i][0] === matrix[i][1] && matrix[i][1] === matrix[i][2] && matrix[i][0] !== 0){
                if (matrix[i][0]==1){
                    if(playerNum[botSymbol] === 1){
                        axios.post('/bots/leaderBoard',{bot_id:my_bot_id,bot_name:my_botName,bot_creator:my_bot_creator,status:'win',bot_type:botSymbol})
                        axios.post('/bots/leaderBoard',{bot_id:opponent_bot_id,bot_name:opponent_botName,bot_creator:opponent_bot_creator,status:'loss',bot_type:otherpBotSymbol})
                    }
                    else{
                        axios.post('/bots/leaderBoard',{bot_id:my_bot_id,bot_name:my_botName,bot_creator:my_bot_creator,status:'loss',bot_type:botSymbol})
                        axios.post('/bots/leaderBoard',{bot_id:opponent_bot_id,bot_name:opponent_botName,bot_creator:opponent_bot_creator,status:'win',bot_type:otherpBotSymbol})
                    }
                    alert(gameOverMsg['X'])
                }
                else{
                    if(playerNum[botSymbol] === -1){
                        axios.post('/bots/leaderBoard',{bot_id:my_bot_id,bot_name:my_botName,bot_creator:my_bot_creator,status:'win',bot_type:botSymbol})
                        axios.post('/bots/leaderBoard',{bot_id:opponent_bot_id,bot_name:opponent_botName,bot_creator:opponent_bot_creator,status:'loss',bot_type:otherpBotSymbol})
                    }
                    else{
                        axios.post('/bots/leaderBoard',{bot_id:my_bot_id,bot_name:my_botName,bot_creator:my_bot_creator,status:'loss',bot_type:botSymbol})
                        axios.post('/bots/leaderBoard',{bot_id:opponent_bot_id,bot_name:opponent_botName,bot_creator:opponent_bot_creator,status:'win',bot_type:otherpBotSymbol})
                    }
                    alert( gameOverMsg['O'])
                }
                setGameOver(true)
                navigate(0)
                
            }
        }
        // check columns
        for (let i=0;i<3;i++){

            if (matrix[0][i] === matrix[1][i] && matrix[1][i] === matrix[2][i] && matrix[0][i] !== 0){
                if (matrix[0][i]==1){
                    if(playerNum[botSymbol] === 1){
                        axios.post('/bots/leaderBoard',{bot_id:my_bot_id,bot_name:my_botName,bot_creator:my_bot_creator,status:'win',bot_type:botSymbol})
                        axios.post('/bots/leaderBoard',{bot_id:opponent_bot_id,bot_name:opponent_botName,bot_creator:opponent_bot_creator,status:'loss',bot_type:otherpBotSymbol})
                    }
                    else{
                        axios.post('/bots/leaderBoard',{bot_id:my_bot_id,bot_name:my_botName,bot_creator:my_bot_creator,status:'loss',bot_type:botSymbol})
                        axios.post('/bots/leaderBoard',{bot_id:opponent_bot_id,bot_name:opponent_botName,bot_creator:opponent_bot_creator,status:'win',bot_type:otherpBotSymbol})
                    }
                    alert(gameOverMsg['X'])
                }
                else{
                    if(playerNum[botSymbol] === -1){
                        axios.post('/bots/leaderBoard',{bot_id:my_bot_id,bot_name:my_botName,bot_creator:my_bot_creator,status:'win',bot_type:botSymbol})
                        axios.post('/bots/leaderBoard',{bot_id:opponent_bot_id,bot_name:opponent_botName,bot_creator:opponent_bot_creator,status:'loss',bot_type:otherpBotSymbol})
                    }
                    else{
                        axios.post('/bots/leaderBoard',{bot_id:my_bot_id,bot_name:my_botName,bot_creator:my_bot_creator,status:'loss',bot_type:botSymbol})
                        axios.post('/bots/leaderBoard',{bot_id:opponent_bot_id,bot_name:opponent_botName,bot_creator:opponent_bot_creator,status:'win',bot_type:otherpBotSymbol})
                    }
                    alert(gameOverMsg['O'])
                }
                setGameOver(true)
                navigate(0)
            }
        }
        // check draw
        if (!board.includes("")){
            axios.post('/bots/leaderBoard',{bot_id:my_bot_id,bot_name:my_botName,bot_creator:my_bot_creator,status:'draw',bot_type:botSymbol})
            axios.post('/bots/leaderBoard',{bot_id:opponent_bot_id,bot_name:opponent_botName,bot_creator:opponent_bot_creator,status:'draw',bot_type:otherpBotSymbol})
            alert("Draw")
            setGameOver(true)
            navigate(0)
        }
    },[matrix])

    const chooseSquare = (clickedByButton,square)=>{
        if (clickedByButton && !gameOver){
            setBoard(board.map((val,idx)=>{
                if (idx === square && val===""){
                    return botTurn
                }
                return val
            }))
            if (botTurn === "X"){
                setBotTurn("O")
            }
            else{
                setBotTurn("X")
            }
        }
            
    }

    return (
        // div that can't be clicked by mouse but still has the property onClick
        // this is to prevent the user from clicking on the board while the bot is playing
        // the bot will play when the user clicks the "See Next move" button

    <div>



        <button onClick={()=>{
            const bot_action = find_bot_move(Q_tables[botTurn])
            if (bot_action != null){
                chooseSquare(true,bot_action)
            }
            else{
                alert("The bot has never seen this state before. Please train it again")
                setGameOver(true)
                navigate(0)
            }
      }}>See Next move</button>

      <div className='board'>
      <div className="row">
        <Square chooseSquare={()=>{
            chooseSquare(false,0)
        }} val={board[0]}></Square>
        <Square chooseSquare={()=>{
            chooseSquare(false,1)
        }} val={board[1]}></Square>
        <Square chooseSquare={()=>{
            chooseSquare(false,2)
        }} val={board[2]}></Square>
      </div>
      <div className="row">
        <Square chooseSquare={()=>{
            chooseSquare(false,3)
        }} val={board[3]}></Square>
        <Square chooseSquare={()=>{
            chooseSquare(false,4)
        }} val={board[4]}></Square>
        <Square chooseSquare={()=>{
            chooseSquare(false,5)
        }} val={board[5]}></Square>
      </div>
      <div className="row">
        <Square chooseSquare={()=>{
            chooseSquare(false,6)
        }} val={board[6]}></Square>
        <Square chooseSquare={()=>{
            chooseSquare(false,7)
        }} val={board[7]}></Square>
        <Square chooseSquare={()=>{
            chooseSquare(false,8)
        }} val={board[8]}></Square>
      </div>
      
    </div>
    </div>
    
  )
}
