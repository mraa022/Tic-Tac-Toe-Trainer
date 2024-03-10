import React from 'react'
import { useContext } from 'react';
import { UserContext } from '../context/userContext'
import {useEffect,useState} from 'react'
export default function Home() {
    console.log("HI")
    // const { user } = useContext(UserContext)
   

  return (
    <div>
      <h1>Welcome to the Tic-Tac-Toe training website where you train Tic-Tac-Toe bots and have them play against bots trained by other users.
        You can login in with: (Username: test, Password: 123456) if you don't want to create a new account. 
      </h1>
      
    </div>
  )
}
