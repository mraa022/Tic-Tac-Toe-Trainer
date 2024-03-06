const express = require('express');
const router = express.Router();
const cors = require('cors');
const {createBot,botsList} = require('../controllers/botController')

// middleware
router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:5173'
    })
)

router.post('/create_bot',createBot)
router.get('/bots_list',botsList)


module.exports = router