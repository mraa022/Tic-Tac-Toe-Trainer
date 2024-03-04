import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import {toast} from 'react-hot-toast'
import { useNavigate } from 'react-router'
//import '../../../styles/navbar.css'
import '../../styles/form.css'
export default function Register() {
  const navigate = useNavigate()
    const [data,setData] = useState({
        username: '',
        password: ''
    })
    const registerUser=async(e)=>{
        e.preventDefault()
        const {username,password} = data;
        try{
          const{data} = await axios.post('/auth/register',{
            username,password
          })
          if (data.error){
            toast.error(data.error)
          }
          else{
            setData({})
            toast.success('Login Successful. Welcome!')
            navigate('/login')
          }
        }
        catch(error){
            console.log(error)
        }

    }
  return (
    <div>
      <form onSubmit={registerUser}>
          <label>Username</label>
          <input value={data.username} onChange={(e)=>setData({...data, username:e.target.value})} placeholder='enter username...'></input>

          <label>Password</label>
          <input value={data.password} onChange={(e)=>setData({...data, password:e.target.value})} type='password' placeholder='enter Password...'></input>

          <button type='submit'>Submit</button>
      </form>
    </div>
  )
}
