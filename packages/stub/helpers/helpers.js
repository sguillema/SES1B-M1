const moment = require('moment')

class Helpers {
    /**
     * Get a random number between two provided number limits
     * @param {number} min The lower limit to generate a value from
     * @param {number} max The upper limit to generate a value from
     * @returns {number} A random number
     */
    getRandomInt(min, max){
        min = Math.ceil(min)
        max = Math.floor(max)
        return Math.floor(Math.random() * (max - min)) + min
    }

    /**
     * Generate a uid using the current time, with a random number appended to it
     * @returns {string} A uid
     */
    generateId(){
        return moment().format("x") + this.getRandomInt(1000, 9999).toString()
    }
}

module.exports = new Helpers()