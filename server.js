require('dotenv').config()
const express = require('express')
const app = express()
const dbConnect = require('./config/dbConnection')



// db connection
dbConnect()

// middleware for json
app.use(express.json())

app.use('/api/auth', require('./routes/authRouter'))


const port = process.env.PORT || 8080

app.listen(port, ()=>{
    console.log(`App is listning to port: ${port}`);
})

