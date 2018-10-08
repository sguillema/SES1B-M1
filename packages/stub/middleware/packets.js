const express = require('express')
const packets = express()

const Ajv = require('ajv')
const ajv = new Ajv()

const moment = require('moment')

const helpers = require('../helpers/helpers')

let data = require('../mocks/packets')
const packetsSchema = require('../mocks/packets-schema')

// GET -- Return packets based on user or doctor query, otherwise return all
packets.get('/packets', (req, res) => {
	let patientId = req.query.user || null
	let doctorId = req.query.doctor || null

	if (patientId || doctorId) {
		let packets = data.filter(item => {
			if (patientId && doctorId) {
				return item.user_id == patientId && item.doctor_id == doctorId
			} else if (patientId && !doctorId) {
				return item.user_id == patientId
			} else if (!patientId && doctorId) {
				return item.doctor_id == doctorId
			}
		})

		if (packets.length != 0) {
			res.send(packets)
		} else {
			res.status(404).send("Packet not found")
		}
	} else {
		res.send(data)
	}
})

// POST -- Create a packet
packets.post('/packets', (req, res) => {
	req.body.uid = helpers.generateId()
	req.body.created_at = moment().format()
	req.body.status = 'pending'
	let valid = ajv.validate(packetsSchema, req.body)
	
	if (valid) {
		data.push(req.body)
		res.status(201).send("Packet has been created")
	} else {
		res.status(400).send("Bad request")
	}
})

// GET -- Return a packet by id, return error if not found
packets.get('/packets/:packetId', (req, res) => {
	let packet = data.find(item => {
		return req.params.packetId == item.uid
	})

	if (packet) {
		res.send(packet)
	} else {
		res.status(404).send("Packet could not be found")
	}
})

class Middleware {
    
}

module.exports = packets