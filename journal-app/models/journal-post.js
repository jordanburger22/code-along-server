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
    createdAt: {
        type: Date,
        default: Date.now
    },
    user: {
        type: String,
        required: true
    }
})

const JournalPost = mongoose.model('JournalPost', journalPostSchema)

JournalPost.collection.createIndex({ createdAt: 1}, { expireAfterSeconds: 2592000 })

module.exports = JournalPost