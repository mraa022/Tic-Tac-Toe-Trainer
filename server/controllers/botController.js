const Bot = require('../models/bot');
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

module.exports = {
    createBot,
    botsList,
    getBot,
    allBots
}