import React, { useState } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-hot-toast'
//import '../../../styles/navbar.css'
import '../../styles/form.css'
export default function Login() {
  const navigate = useNavigate();
    const [data,setData] = useState({
        username: '',
        password:''
    })
    const loginUser  = async(e)=>{
        e.preventDefault()
        const {username,password} = data;
          try{
            axios.defaults.withCredentials = true
            const {data} = await axios.post('/auth/login',{
              username,password,
              withCredentials: true,
              headers: { crossDomain: true, 'Content-Type': 'application/json'}
            })
            if (data.error){
              toast.error(data.error)
            }
            else{
              console.log("LOGED IN")
              setData({});
              navigate('/')
              navigate(0)
  
            }
          }
          catch{
  
          }
        }
        

    
  return (
    <div>
      <form onSubmit={loginUser}>
        
          <label>Username</label>
          <input value={data.username} onChange={(e)=>setData({...data, username:e.target.value})} placeholder='enter username...'></input>

          <label>Password</label>
          <input value={data.password} onChange={(e)=>setData({...data, password:e.target.value})}type='password' placeholder='enter Password...'></input>

          <button type='submit'>Submit</button>
      </form>
    </div>
  )
}
