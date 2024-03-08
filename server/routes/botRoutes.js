const express = require('express');
const router = express.Router();
const cors = require('cors');
const {createBot,botsList,getBot,allBots,insertLeaderboard,botsLeaderboard} = require('../controllers/botController')

// middleware
router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:5173'
    })
)

router.post('/create_bot',createBot)
router.get('/bots_list',botsList)
router.post('/get_bot',getBot)
router.get('/all_bots',allBots)
router.post('/leaderBoard',insertLeaderboard)
router.get('/bots_leaderboard',botsLeaderboard)

module.exports = router