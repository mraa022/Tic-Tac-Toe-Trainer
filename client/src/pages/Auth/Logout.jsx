import React, { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router'
import Cookies from 'js-cookie'


export default function Logout() {
    const navigate = useNavigate()
    useEffect(() => {
      
      Cookies.remove('token')
      navigate('/')
      navigate(0)
    }, [])
    
  return (
    <div>
      <h1>Logging out...</h1>
    </div>
  )
}