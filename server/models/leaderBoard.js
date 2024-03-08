const mongoose = require('mongoose');
const {Schema} = mongoose;

const leaderBoardSchema = new Schema({
   botName: String,
   wins: Number,
   losses: Number,
   draws: Number,
   botType:String,
   bot_creater:String,
   botId:String
});
const leaderBoardModel  = mongoose.model('LeaderBoard',leaderBoardSchema);
module.exports = leaderBoardModel;