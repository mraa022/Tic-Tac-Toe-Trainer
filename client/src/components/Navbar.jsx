import {Link} from 'react-router-dom'
import {useContext} from 'react';
import {UserContext} from '../context/userContext'
import axios from 'axios';
// import '../../../styles/navbar.css'
import './../styles/navbar.css'
export default function Navbar() {
  const {user} = useContext(UserContext)
  if (user){
    console.log("LOGED IN")
    return (
      <nav>
          <Link to ='/'>Home</Link>
          <Link to = '/create_x_bot'>Create Bot</Link>
          <Link to = '/all_bots'>My bots</Link>
           <Link to = '/every_bot'>Other bots</Link>
           <Link to = '/leaderboard'>Leaderboard</Link>
          <Link to = '/logout'>Logout</Link>
          
          
         
      </nav>
    )
  }
  else{
    return (
      <nav>
          <Link to ='/'>Home</Link>
          <Link to = '/register'>Register</Link>
          <Link to = '/login'>Login</Link>
      </nav>
    )
  }
}


