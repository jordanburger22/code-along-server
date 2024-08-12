const mongoose = require('mongoose')
const Schema = mongoose.Schema


const journalPostSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    entry: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    user: {
        type: String,
        required: true
    }
})


module.exports = mongoose.model('JournalPost', journalPostSchema)