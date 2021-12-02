const express = require('express')
const routes = express.Router()
const cors = require('cors')
const bd = require('body-parser')
const bcrypt = require('bcryptjs')

require("../db/connection")
const User = require('../modal/authSchema')

routes.use(cors())
routes.use(bd.urlencoded({
    extended: false
}))
routes.use(bd.json())

routes.get('/', (req, res) => {
    res.send("hello from afaque from routes")
})

//Signup
routes.post('/signup', async (req, res) => {

    const { name, email, phone, password, cpassword } = req.body

    if (!name || !email || !phone || !password || !cpassword) {
        return res.status(422).json({ error: "Fill the field" })
    }
    try {

        const userExits = await User.findOne({ email: email })

        if (userExits) return res.status(422).json({ error: "User already exits" })

        let userCreate = new User({ name, email, phone, password, cpassword })

        const newUser = await userCreate.save()


        if (newUser) {
            res.status(201).json({ result: "User Register Sucessfully" })
        } else {
            res.status(400).json({ result: "User is not registered" })
        }

    } catch (err) {
        console.log(err)
    }

})

//Sginin
routes.post('/signin', async (req, res) => {
    // console.log(req.body)

    try {
        let token;
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(422).json({ error: "Fill the field properly" })
        }

        const userlogin = await User.findOne({ email: email })
        // console.log(userlogin)


        if (userlogin) {

            const passMatch = await bcrypt.compare(password, userlogin.password)
            token = await userlogin.generateAuthToken()
            // console.log(token);

            if (!passMatch) {
                return res.status(400).json({ error: "Invalid Credential" })
            } else {
                return res.status(200).json({ message: "User Login Sucessfully" })
            }

        } else {
            return res.status(400).json({ error: "Invalid Credential" })
        }



    } catch (error) {
        console.log(error)
    }

})




module.exports = routes