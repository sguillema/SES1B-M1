const express = require('express')
const users = express()

const Ajv = require('ajv')
const ajv = new Ajv()

const moment = require('moment')
const crypto = require('crypto')

const helpers = require('../helpers/helpers')

let data = require('../mocks/users')
const usersSchema = require('../mocks/users-schema')

// GET -- Return all users
users.get('/users', async (req, res) => {
    res.send(data)
})

// POST -- Create a user, return error if already exists
users.post('/users', async (req, res) => {
    req.body.uid = helpers.generateId()
    req.body.created_at = moment().format()

    let password =  auth.setPassword(req.body.password)
    req.body.password = password.hash
    req.body.salt = password.salt

    req.body.profile_id = helpers.getRandomInt(10, 99).toString()
    console.log(req.body)
    let valid = ajv.validate(usersSchema, req.body)
    let existing = data.find(item => {
        return req.body.email == item.email
    })

    if (valid && !existing) {
        data.push(req.body)
        res.status(201).send("User has been created")
    } else if (valid && existing) {
        res.status(409).send("User with this email already exists")
    } else {
        res.status(400).send("Bad request")
    }
})

// GET -- Return a user by id, return error if not found
users.get('/users/:userId', async (req, res) => {
    let user = data.find(item => {
        return req.params.userId == item.uid
    })

    if (user) {
        res.send(user)
    } else {
        res.status(404).send("User not found")
    }
})

// POST -- Authenticate credentials, return a token if correct
users.post('/users/auth', async (req, res) => {
    let incomingEmail = req.body.email
    let incomingPassword = req.body.password

    let user = data.find(item => {
        return incomingEmail == item.email
    })

    if (user && auth.validatePassword(incomingPassword, user.salt, user.password)) {
        // Placeholder token implementation
        res.send({
            uid: user.uid,
            token: "supersecret"
        })
    } else {
        res.status(404).send("Invalid credentials")
    }
})

class Authentication {
    /**
     * Set a password. Returns a hash of that password and salt used for it.
     * @param {string} password A string of the password we want to hash
     * @returns {object} An object that contains a hash of the password and salt used for it.
     * @memberof Authentication
     */
    setPassword(password){
        let salt = crypto.randomBytes(16).toString('hex')
        let hash = crypto.pbkdf2Sync(password, salt, 10000, 512, 'sha512').toString('hex')
        return {
            salt: salt,
            hash: hash
        }
    }

    /**
     * Validate a password using a string of a password, and checking it against a stored hash+salt.
     * @param {string} password A string of the password we want to validate.
     * @param {string} salt A string used to reverse-hash the hash to get the original password value.
     * @param {string} hash A string that is a hash of the original password combined with salt.
     * @returns {boolean} A boolean on whether the password provided is valid.
     * @memberof Authentication
     */
    validatePassword(password, salt, hash){
        const hash = crypto.pbkdf2Sync(password, salt, 10000, 512, 'sha512').toString('hex')
        return this.hash === hash
    }
}

const auth = new Authentication()

module.exports = users