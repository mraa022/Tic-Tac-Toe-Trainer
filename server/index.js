const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const {mongoose} = require('mongoose')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');


const app = express()

// db connection
mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log("database connected"))
.catch((err)=>{
    console.log('Database not connected', err)
});



// middleware
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:false}))



// start route
app.get('/',(req,res)=>{
    res.send('Server is running')
})
// routes
app.use('/auth',require('./routes/authRoutes'))
app.use('/bots',require('./routes/botRoutes'))

app.use(bodyParser.json({ limit: '995000mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '600mb' }));

const port = 8000
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})