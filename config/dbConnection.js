const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, ()=>{
            console.log('App is connected to MongoDB');
        })
        
    } catch (error) {
        console.error(error);
    }
}

module.exports = connectDB
