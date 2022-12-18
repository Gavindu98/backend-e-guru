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
app.use('/api/lesson', require('./routes/private/lessonRouter'))
app.use('/api/resource', require('./routes/private/resourceRouter'))


const port = process.env.PORT

app.listen(port, () => {
    console.log(`App is listning to port: ${port}`);
})

