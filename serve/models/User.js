const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: {
        type: String
    },
    password: {
        type: String,
        select: false,
        set(val) {
            return require('bcrypt').hashSync(val, 10)
        }
    }
})

module.exports = mongoose.model('User', schema)