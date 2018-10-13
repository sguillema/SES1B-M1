const express = require('express')
const patients = express()

const Ajv = require('ajv')
const ajv = new Ajv()

const moment = require('moment')

const helpers = require('../helpers/helpers')

let data = require('../mocks/patients')
const patientsSchema = require('../mocks/patients-schema')

// GET -- Return patients based on search query. Query must be minimum 3 characters, otherwise return none. OR return patients based on ids (preferable to use /:patientId endpoint for single patient). If no query or ids provided, return all
patients.get('/patients', async (req, res) => {
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
        res.status(404).send('No Patients found')
    } else {
        res.send(data)

        // TODO: Differentiate between bad request and GET all request
        // res.status(400).send('Bad request')
    }
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