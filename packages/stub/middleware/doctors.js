const express = require('express')
const doctors = express()

const Ajv = require('ajv')
const ajv = new Ajv()

const moment = require('moment')

const helpers = require('../helpers/helpers')

let data = require('../mocks/doctors')
const doctorsSchema = require('../mocks/doctors-schema')

// GET -- Return doctors based on search query. Query must be minimum 3 characters, otherwise return none. OR return doctors based on ids (preferable to use /:doctorId endpoint for single doctor). If no query or ids provided, return all
doctors.get('/doctors', async (req, res) => {
    let idsQuery = req.query.ids || null
    let searchQuery = req.query.search || null
    let ids = null
    let query = null

    if (idsQuery) ids = idsQuery.split(',')
    if (searchQuery) {
        query = searchQuery.toLowerCase()
        if (query && query.length < 3) {
            query = null
        }
    }

    let results = null
    if (query && !ids) {
        results = data.filter(item => {
            let fullName = `${item.first_name.toLowerCase()} ${item.last_name.toLowerCase()}`
            return item.uid.includes(query) || item.email.includes(query) || fullName.includes(query)
        })
    } else if (ids && ids.length > 0 && !query) {
        results = data.filter(item => {
            let match = false
            ids.forEach(id => {
                if (item.uid == id) match = true
            })
            return match
        })
    }
    
    if (results && results.length > 0) {
        res.send(results)
    } else if (results && results.length == 0) {
        res.status(404).send('No Doctors found')
    } else {
        res.send(data)

        // TODO: Differentiate between bad request and GET all request
        // res.status(400).send('Bad request')
    }
})

// POST -- Create a doctor, return error if already exists
doctors.post('/doctors', async (req, res) => {
    let valid = ajv.validate(doctorsSchema, req.body)
    let existing = data.find(item => {
        return req.body.email == item.email
    })

    if (valid && !existing) {
        data.push(req.body)
        res.status(201).send("Doctor has been created")
    } else if (valid && existing) {
        res.status(409).send("Doctor with this email already exists")
    } else {
        res.status(400).send("Bad request")
    }
})

// GET -- Return a doctor by id, return error if not found
doctors.get('/doctors/:doctorId', async (req, res) => {
    let doctor = data.find(item => {
        return req.params.doctorId == item.uid
    })

    if (doctor) {
        res.send(doctor)
    } else {
        res.status(404).send("Doctor not found")
    }
})

class Middleware {
    
}

module.exports = doctors