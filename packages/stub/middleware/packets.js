const express = require('express')
const packets = express()

const Ajv = require('ajv')
const ajv = new Ajv()

const moment = require('moment')

const helpers = require('../helpers/helpers')

let data = require('../mocks/packets')
const packetsSchema = require('../mocks/packets-schema')

packets.get('/packets', (req, res) => res.send('Hello Packets!'))

class Middleware {
    
}

module.exports = packets