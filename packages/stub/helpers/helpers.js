const moment = require('moment')

class Helpers {
    getRandomInt(min, max){
        min = Math.ceil(min)
        max = Math.floor(max)
        return Math.floor(Math.random() * (max - min)) + min
    }

    generateId(){
        return moment().format("x") + this.getRandomInt(1000, 9999).toString()
    }
}

module.exports = new Helpers()