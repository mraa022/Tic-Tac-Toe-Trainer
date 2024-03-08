
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
import Board from './pages/Game/Board'
import BotsList from './pages/Bot-Trainer/BotsList'
import ChooseBotType from './pages/Bot-Trainer/ChooseBotType'
import AllBotsList from './pages/Bot-Trainer/AllBotsList'
import PickBot from './pages/Bot-Trainer/PickBot'
import BotvBot from './pages/Bot-Trainer/BotvBot'
import Leaderboard from './pages/Bot-Trainer/Leaderboard'

axios.defaults.baseURL = 'https://tic-tac-toe-trainer-server.vercel.app/'
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
        <Route path='/game' element={<Board/>} />
        <Route path='/all_bots' element={<BotsList/>} />
        <Route path='/bot_type' element={<ChooseBotType/>} />
        <Route path='/every_bot' element={<AllBotsList/>} />
        <Route path='/pick_bot' element={<PickBot/>} />
        <Route path='/bot-v-bot' element={<BotvBot/>} />
        <Route path='/leaderboard' element={<Leaderboard/>} />
        
      </Routes>
    </UserContextProvider>
    
    
  )
}

export default App
