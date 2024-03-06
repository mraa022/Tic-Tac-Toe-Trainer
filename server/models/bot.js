const mongoose = require('mongoose');
const {Schema} = mongoose;

const botSchema = new Schema({
   botName: String,
   bot_creater:String,
   player_x_q: { type: Schema.Types.Mixed },
   player_o_q: { type: Schema.Types.Mixed }

});
const BotModel  = mongoose.model('Bot',botSchema);
module.exports = BotModel;