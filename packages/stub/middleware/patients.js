const express = require('express')
const patients = express()

const Ajv = require('ajv')
const ajv = new Ajv()

const moment = require('moment')

const helpers = require('../helpers/helpers')

let data = require('../mocks/patients')
const patientsSchema = require('../mocks/patients-schema')

// GET -- Return all patients
patients.get('/patients', async (req, res) => {
    res.send(data)
})

// POST -- Create a patient, return error if already exists
patients.post('/patients', async (req, res) => {
    let valid = ajv.validate(patientsSchema, req.body)
    let existing = data.find(item => {
        return req.body.email == item.email
    })

    if (valid && !existing) {
        data.push(req.body)
        res.status(201).send("Patient has been created")
    } else if (valid && existing) {
        res.status(409).send("Patient with this email already exists")
    } else {
        res.status(400).send("Bad request")
    }
})

// GET -- Return a patient by id, return error if not found
patients.get('/patients/:patientId', async (req, res) => {
    let patient = data.find(item => {
        return req.params.patientId == item.uid
    })

    if (patient) {
        res.send(patient)
    } else {
        res.status(404).send("Patient not found")
    }
})

class Middleware {
    
}

module.exports = patients