const mongoose = require('mongoose');

const projectcategSchema = mongoose.Schema({
    ar: String,
    en: String,
})

module.exports = mongoose.model('projectcateg', projectcategSchema);