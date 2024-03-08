import React, { useState,useEffect } from 'react'
import Square from './Square'
import '../../styles/board.css'
import {useLocation} from 'react-router-dom';
import { useNavigate } from 'react-router'

export default function Board() {
    const location = useLocation();
    const navigate = useNavigate();
    const Q_table = location.state.Q_table
    const type = location.state.type
    const [board,setBoard] = useState(["","","","","","","","",""])
    const [matrix,setMatrix] = useState([[0,0,0],[0,0,0],[0,0,0]])
    const [botTurn,setBotTurn] = useState(false) 
    const matrixPos = {0:[0,0],1:[0,1],2:[0,2],3:[1,0],4:[1,1],5:[1,2],6:[2,0],7:[2,1],8:[2,2]}
    const botActions = {'(0, 0)':0,'(0, 1)':1,'(0, 2)':2,'(1, 0)':3,'(1, 1)':4,'(1, 2)':5,'(2, 0)':6,'(2, 1)':7,'(2, 2)':8}
    const playerNum = {'X':1,'O':-1,'':0}
    const playerSymbol = type === 'X' ? 'O' : 'X'
    const [clickedSquare,setClickedSquare] = useState(null);
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


    const find_bot_move = ()=>{
        const s = hash_board()
        
        const possible_actions = Q_table[s]
        if (!possible_actions){
            alert("The bot has never seen this state before. please train it again.")
            setGameOver(true)
            setBotTurn(!botTurn)
            navigate(0)
        }
        else{
           // pick random action above possible_actions 
          const actions = getMax(possible_actions); // multiple actions that might have same value. pick random one
          const random_action = actions[Math.floor(Math.random() * actions.length)];
          // get botActions at the key random_action
           const actual_action = botActions[random_action];
           if (board[actual_action] !== ""){
               alert("The bot chose a square that is already taken. Please train it again")
               setGameOver(true)
               setBotTurn(!botTurn)
               navigate(0)
           }
           else{
            return actual_action
           }
        }
    }



    useEffect(()=>{
        if(type==='X'){
            
            const action =  find_bot_move()
            if (action != null){
                setBoard(board.map((val,idx)=>{
                if (idx === action && val===""){
                    return type
                }
                return val
            }))}
        }
    },[])
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
        if(clickedSquare != null){
        setBotTurn(!botTurn)
    }
    if (matrix[0][0] === matrix[1][1] && matrix[1][1] === matrix[2][2] && matrix[0][0] !== 0){
            if (matrix[0][0]==1){
                alert("X wins")
            }
            else{
                alert("O wins")
            }
            setGameOver(true)
            navigate(0)
        }
        // check other diagonal
        if (matrix[0][2] === matrix[1][1] && matrix[1][1] === matrix[2][0] && matrix[0][2] !== 0){
            if (matrix[0][2]==1){
                alert("X wins")
            }
            else{
                alert("O wins")
            }
            setGameOver(true)
            navigate(0)
        }
        // check rows
        for (let i=0;i<3;i++){
            if (matrix[i][0] === matrix[i][1] && matrix[i][1] === matrix[i][2] && matrix[i][0] !== 0){
                if (matrix[i][0]==1){
                    alert("X wins")
                }
                else{
                    alert("O wins")
                }
                setGameOver(true)
                navigate(0)
                
            }
        }
        // check columns
        for (let i=0;i<3;i++){
            if (matrix[0][i] === matrix[1][i] && matrix[1][i] === matrix[2][i] && matrix[0][i] !== 0){
                if (matrix[0][i]==1){
                    alert("X wins")
                }
                else{
                    alert("O wins")
                }
                setGameOver(true)
                navigate(0)
            }
        }
        // check draw
        if (!board.includes("")){
            alert("Draw")
            setGameOver(true)
            navigate(0)
        }
    },[matrix])
    useEffect(()=>{
        console.log(botTurn)
        if (botTurn && !gameOver){
            const bot_move = find_bot_move()
            if (bot_move != null){
                setBoard(board.map((val,idx)=>{
                if (idx === bot_move && val===""){
                    return type
                }
                return val
            }))}
        }
        
    },[botTurn])
    const chooseSquare = (square)=>{
            setClickedSquare(true)
            setBoard(board.map((val,idx)=>{
                if (idx === square && val===""){
                    return playerSymbol
                }
                return val
            }))
            
            

    }


    
    return (
    <div className='board'>
      <div className="row">
        <Square chooseSquare={()=>{
            chooseSquare(0)
        }} val={board[0]}></Square>
        <Square chooseSquare={()=>{
            chooseSquare(1)
        }} val={board[1]}></Square>
        <Square chooseSquare={()=>{
            chooseSquare(2)
        }} val={board[2]}></Square>
      </div>
      <div className="row">
        <Square chooseSquare={()=>{
            chooseSquare(3)
        }} val={board[3]}></Square>
        <Square chooseSquare={()=>{
            chooseSquare(4)
        }} val={board[4]}></Square>
        <Square chooseSquare={()=>{
            chooseSquare(5)
        }} val={board[5]}></Square>
      </div>
      <div className="row">
        <Square chooseSquare={()=>{
            chooseSquare(6)
        }} val={board[6]}></Square>
        <Square chooseSquare={()=>{
            chooseSquare(7)
        }} val={board[7]}></Square>
        <Square chooseSquare={()=>{
            chooseSquare(8)
        }} val={board[8]}></Square>
      </div>
    </div>
  )
}
