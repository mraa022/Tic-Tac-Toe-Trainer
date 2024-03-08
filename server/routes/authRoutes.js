const express = require('express');
const router = express.Router();
const cors = require('cors');
const {registerUser,loginUser,logOut,getProfile} = require('../controllers/authController')

// middleware
router.use(
    cors({
        credentials: true,
        origin: 'https://tic-tac-toe-trainer-client.vercel'
    })
)

router.post('/register',registerUser)
router.post('/login',loginUser)
router.post('/logout',logOut)
router.get('/profile',getProfile)


module.exports = router