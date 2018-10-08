const express = require('express')
const doctors = express()

const Ajv = require('ajv')
const ajv = new Ajv()

const moment = require('moment')

const helpers = require('../helpers/helpers')

let data = require('../mocks/doctors')
const doctorsSchema = require('../mocks/doctors-schema')

// GET -- Return all doctors
doctors.get('/doctors', async (req, res) => {
    res.send(data)
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