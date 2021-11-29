const express = require('express')
const routes = express.Router()
const cors = require('cors')
const bd = require('body-parser')

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

routes.post('/signup', (req, res) => {

    const { name, email, phone, password, cpassword } = req.body

    if (!name || !email || !phone || !password || !cpassword) {
        return res.status(422).json({ error: "Fill the field" })
    }

    User.findOne({ email: email })
        .then((userExits) => {
            if (userExits) return res.status(422).json({ error: "User already exits" })

            let userCreate = new User({ name, email, phone, password, cpassword })

            userCreate.save()
                .then((response) => {
                    res.status(201).json({ result: response.message })
                })
                .catch((err) => {
                    res.status(400).json({ result: err.message })

                })
            res.send("sign up")

        }).catch((err) => console.log(err))

})

module.exports = routes