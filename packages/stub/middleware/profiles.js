const express = require('express')
const profiles = express()

const Ajv = require('ajv')
const ajv = new Ajv()

const moment = require('moment')

const helpers = require('../helpers/helpers')

let data = require('../mocks/profiles')
const profilesSchema = require('../mocks/profiles-schema')

// GET -- Return all profiles
profiles.get('/profiles', async (req, res) => {
    res.send(data)
})

// POST -- Create a profile, return error if already exists
profiles.post('/profiles', async (req, res) => {
    let valid = ajv.validate(profilesSchema, req.body)
    let existing = data.find(item => {
        return req.body.email == item.email
    })

    if (valid && !existing) {
        data.push(req.body)
        res.status(201).send("Profile has been created")
    } else if (valid && existing) {
        res.status(409).send("Profile with this email already exists")
    } else {
        res.status(400).send("Bad request")
    }
})

// GET -- Return a profile by id, return error if not found
profiles.get('/profiles/:profileId', async (req, res) => {
    let profile = data.find(item => {
        return req.params.profileId == item.uid
    })

    if (profile) {
        res.send(profile)
    } else {
        res.status(404).send("Profile not found")
    }
})

class Middleware {
    
}

module.exports = profiles