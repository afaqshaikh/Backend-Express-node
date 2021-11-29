const express = require('express')
const dotenv = require('dotenv')
const app = express()
const cors = require('cors')
const bd = require('body-parser')

dotenv.config()
require("./db/connection")
app.use(require('./router/routes'))
// app.use(express.json())
app.use(cors())
app.use(bd.urlencoded({
    extended: false
}))
app.use(bd.json())


const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log("server is runnig at " + PORT)
})
