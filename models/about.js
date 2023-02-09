const mongoose = require('mongoose');

const aboutSchema = mongoose.Schema({
    ar: String,
    en: String,
    img: String
})

module.exports = mongoose.model('About', aboutSchema);