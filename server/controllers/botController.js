const Bot = require('../models/bot');
const LeaderBoard = require('../models/leaderBoard');
const jwt = require('jsonwebtoken');

const createBot = async(req,res)=>{
    
    const {token} = req.cookies
   
    if (token){
        const {username} = jwt.verify(token,process.env.JWT_SECRET)
        
        try {
            const {botName,player_x_q,player_o_q} = req.body
            console.log(botName, " FFFFF")
            const bot = await Bot.create({
                bot_creater:username,
                botName:botName,
                bot_creater: username,
                player_x_q: player_x_q,
                player_o_q: player_o_q
            })
            return res.json(bot)
        } catch (error) {
            console.log(error)
        }
    }
    
}

const botsList = async(req,res)=>{
    const token = req.cookies.token
    if (token){
        jwt.verify(token,process.env.JWT_SECRET,{},async(err,user)=>{
            if(err) throw err;
            result = await Bot.find({bot_creater:user.username},{botName:1,_id:1})
            res.json(result)
        })
    }
    
}

const allBots = async(req,res)=>{
    const bots = await Bot.find({},{botName:1,_id:1,bot_creater:1})
    res.json(bots)

}

const getBot = async(req,res)=>{
    const id = req.body['id']
    const bot = await Bot.findById(id)
    console.log(id)
    res.json(bot)
    
}

const insertLeaderboard=async(req,res)=>{
    const {bot_id,bot_creator,bot_type,bot_name,status} = req.body
    console.log(req.body)
    const leaderBoard_info = await LeaderBoard.findOne({botId:bot_id,botType:bot_type})
    if (!leaderBoard_info){
        const result = await LeaderBoard.create({
            bot_creater:bot_creator,
            botName:bot_name,
            botType:bot_type,
            botId:bot_id,
            wins:status==='win'? 1:0,
            losses: status === 'loss'? 1:0,
            draws: status === 'draw'? 1:0
        })
        // wins is 0 if status is not win otherwise 1
        const wins = 0? status !== 'win':1
        

    }
    else{
        
        if (status === 'win'){
            leaderBoard_info.wins += 1
        }
        else if (status === 'loss'){
            leaderBoard_info.losses += 1
        }
        else{
            leaderBoard_info.draws += 1
        }
        
        await LeaderBoard.updateOne({botId:bot_id,botType:bot_type},leaderBoard_info)
    }
    res.json(leaderBoard_info)
}

const botsLeaderboard = async(req,res)=>{
    // sort in decreasing order of wins
    const leaderBoard = await LeaderBoard.find({},{botName:1,wins:1,losses:1,draws:1,botType:1,bot_creater:1}).sort({wins:-1})
    res.json(leaderBoard)

}

module.exports = {
    createBot,
    botsList,
    getBot,
    allBots,
    insertLeaderboard,
    botsLeaderboard
}