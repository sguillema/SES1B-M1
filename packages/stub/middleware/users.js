const express = require('express')
const users = express()

const Ajv = require('ajv')
const ajv = new Ajv()

const moment = require('moment')

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
        res.status(404).send("User could not be found")
    }
})

class Middleware {
    
}

module.exports = users