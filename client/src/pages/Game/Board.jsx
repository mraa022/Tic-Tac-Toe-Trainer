import React, { useState,useEffect } from 'react'
import Square from './Square'
import '../../styles/board.css'
export default function Board(props) {
    const [board,setBoard] = useState(["","","","","","","","",""])
    const [matrix, setMatrix] = useState([[0,0,0],[0,0,0],[0,0,0]])
    const matrixPos = {0:[0,0],1:[0,1],2:[0,2],3:[1,0],4:[1,1],5:[1,2],6:[2,0],7:[2,1],8:[2,2]}
    const playerNum = {'X':1,'O':-1,'':0}
    const [player,setPlayer] = useState("X")
    const [turn,setTurn] = useState("X")
    const chooseSquare = async(square)=>{
        if (turn==player && board[square]==""){
            
            setTurn(player === "X" ? "O" : "X");
            setBoard(board.map((val,idx)=>{
                if (idx === square && val===""){
                    return player
                }
                return val
            }))

            setMatrix(matrix.map((row,rowIdx)=>{
                return row.map((val,colIdx)=>{
                    if (rowIdx === matrixPos[square][0] && colIdx === matrixPos[square][1]){
                        return playerNum[player]
                    }
                    return val
                })
            }))
            
            setPlayer(player === "X" ? "O" : "X");
        }
    }
    useEffect(()=>{
        console.log(matrix)
    },[matrix])

    
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
