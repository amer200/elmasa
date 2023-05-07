const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
    name: {
        ar: String,
        en: String
    },
    desc: {
        ar: String,
        en: String
    },
    img: String
})

module.exports = mongoose.model('Blog', blogSchema);