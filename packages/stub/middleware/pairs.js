const express = require('express')
const pairs = express()

const Ajv = require('ajv')
const ajv = new Ajv()

const moment = require('moment')
const axios = require('axios')

const helpers = require('../helpers/helpers')

let data = require('../mocks/pairs')
const pairsSchema = require('../mocks/pairs-schema')

// GET -- Return pairs based on patient or doctor query, otherwise return all
pairs.get('/pairs', async (req, res) => {
    let patientId = req.query.user || null
    let doctorId = req.query.doctor || null
    
    if (patientId || doctorId) {
        let pairs = data.filter(item => {
            if (patientId && doctorId) {
                return item.patient_id == patientId && item.doctor_id == doctorId
            } else if (patientId && !doctorId) {
                return item.patient_id == patientId
            } else if (!patientId && doctorId) {
                return item.doctor_id == doctorId
            }
        })

        let results = []
        if (!patientId && doctorId) {
            let patientIds = pairs.map(item => {
                return item.patient_id
            })
            let patients = await axios.get(`http://localhost:4000/patients?ids=${patientIds.toString()}`)
            results = patients.data
        } else if (patientId && !doctorId) {
            let doctorIds = pairs.map(item => {
                return item.doctor_id
            })
            let doctors = await axios.get(`http://localhost:4000/doctors?ids=${doctorIds.toString()}`)
            results = doctors.data
        }

        if (results.length != 0) {
            res.send(results)
        } else {
            res.status(404).send("Pair not found")
        }
    } else {
        res.send(data)
    }
})

// POST -- Create a pair, return error if already exists
pairs.post('/pairs', async (req, res) => {
    let valid = ajv.validate(pairsSchema, req.body)
    let existing = data.find(item => {
        return req.body.doctor_id == item.doctor_id && req.body.patient_id == item.patient_id
    })

    if (valid && !existing) {
        data.push(req.body)
        res.status(201).send("Pair has been created")
    } else if (valid && existing) {
        res.status(409).send("Pair already exists")
    } else {
        res.status(400).send("Bad request")
    }
})

// GET -- Return a pair by id, return error if not found
pairs.get('/pairs/:pairId', async (req, res) => {
    let pair = data.find(item => {
        return req.params.pairId == item.uid
    })

    if (pair) {
        res.send(pair)
    } else {
        res.status(404).send("Pair not found")
    }
})

class Middleware {
    
}

module.exports = pairs