
import './App.css'
import {Routes,Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Register from './pages/Auth/Register'
import Login from './pages/Auth/Login'
import Logout from './pages/Auth/Logout'
import axios from 'axios'

import {Toaster} from 'react-hot-toast'
import {UserContextProvider} from './context/userContext'

import {UserContext} from './context/userContext'
import CreateBotX from './pages/Bot-Trainer/CreateBotX'
import CreateBotO from './pages/Bot-Trainer/CreateBotO'

axios.defaults.baseURL = 'http://localhost:8000'
axios.defaults.withCredentials = true

function App() {
  
  return (
    
    
    
    <UserContextProvider>
      <Navbar/>
      <Toaster position='bottom-right' toastOptions = {{duration:2000}}/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>} />
        
        <Route path='/logout' element={<Logout/>} />
        <Route path='/create_x_bot' element={<CreateBotX/>} />
        <Route path='/create_o_bot' element={<CreateBotO/>} />
        
      </Routes>
    </UserContextProvider>
    
    
  )
}

export default App
