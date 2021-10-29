const express = require('express')
const cors = require('cors')
const bd = require('body-parser')
const authModel = require('./authSchema')
const dotenv = require('dotenv')
const app = express()
const mongoose = require('mongoose')
const port = 5000

dotenv.config()

app.use(cors())
app.use(bd.urlencoded({
    extended: false
}))
app.use(bd.json())

const db = `mongodb+srv://afaque:${process.env.MONGODB_PASS}@cluster0.slkgc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

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


app.get('/', (req, res) => {
    res.send("hello from afaque")
})

app.post('/signup', (req, res) => {
    console.log(req.body, "Signup request")
    let userCreate = new authModel({
        email:req.body.email,
        password:req.body.password
    })
    userCreate.save().then((response)=>{
        // console.log(res)
        res.status(200).send({result:response.message})
    }).catch((err)=>{
        // console.log(err)
        res.status(400).send({result:err.message})

    })
    // res.send("sign up")
})

app.listen(port, () => {
    console.log("server is runnig....")
})
