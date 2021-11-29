const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()

const db = process.env.MONGODB_DB

mongoose.connect(db).then(()=>{
    console.log('Connection sucessful')
}).catch((err)=>{
    console.log('Connection is not sucessful')
})


// mongoose.connection.on("connected", () => {
//     console.log('Database Connected')
// })

// mongoose.connection.on("error", () => {
//     console.log('Database Not Connected')
// })