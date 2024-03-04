import React from 'react'
import { useContext } from 'react';
import { UserContext } from '../context/userContext'
import {useEffect,useState} from 'react'
export default function Home() {
    console.log("HI")
    const { user } = useContext(UserContext)
   

  return (
    <div>
      {user && (<h2>Hi {user.username}</h2>)}
      
    </div>
  )
}
