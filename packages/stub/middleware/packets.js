const express = require('express')
const packets = express()

const Ajv = require('ajv')
const ajv = new Ajv()

const moment = require('moment')

const helpers = require('../helpers/helpers')

let data = require('../mocks/packets')
const packetsSchema = require('../mocks/packets-schema')

// GET -- Return all packets
packets.get('/packets', (req, res) => {
	res.send(data)
})

// POST -- Create a packet
packets.post('/packets', (req, res) => {
	req.body.uid = helpers.generateId()
	req.body.created_ad = moment().format()
	let valid = ajv.validate(packetsSchema, req.body)
	
	if (valid) {
		data.push(req.body)
		res.status(201).send("Packet has been created")
	} else {
		res.status(400).send("Bad request")
	}
})

packets.get('/packets', (req, res) => res.send('Hello Packets!'))

class Middleware {
    
}

module.exports = packets