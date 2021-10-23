const express = require('express')
const cors = require('cors')
const bd = require('body-parser')

const app = express()
const port = 5000

app.use(cors())
app.use(bd.urlencoded({
    extended : false
}))
app.use(bd.json())


app.get('/',(req,res)=>{
    res.send("hello from afaque")
})

app.post('/signup',(req,res)=>{
    console.log(req.body,"Signup request")
    // res.send("sign up")
})

app.listen(port,()=>{
    console.log("server is runnig....")
})
