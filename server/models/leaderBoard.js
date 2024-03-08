const mongoose = require('mongoose');
const {Schema} = mongoose;

const leaderBoardSchema = new Schema({
   botName: String,
   numWins: Number,
   botType:String,
   bot_creater:String,
   botId:String
});
const leaderBoardModel  = mongoose.model('Bot',leaderBoardSchema);
module.exports = leaderBoardModel;