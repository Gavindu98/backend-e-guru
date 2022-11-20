require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bodyparser = require('body-parser')
const app = express()
const dbConnect = require('./config/dbConnection')



// db connection
dbConnect()

// middleware for json
app.use(express.json())
app.use(cors())

app.use('/api/auth', require('./routes/authRouter'))
app.use('/api/post', require('./routes/private/postRouter'))
app.use('/api/post-comment', require('./routes/private/commentRouter'))


const port = process.env.PORT || 8080

app.listen(port, ()=>{
    console.log(`App is listning to port: ${port}`);
})

