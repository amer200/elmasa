const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
    name: {
        ar: String,
        en: String
    },
    desc: {
        ar: String,
        en: String
    },
    categ: { type: mongoose.Schema.Types.ObjectId, ref: 'projectcateg' },
    imgs: [String],
    map: String,
    details: [
        {
            name: {
                ar: String,
                en: String
            },
            data: {
                ar: String,
                en: String
            }
        }
    ]
})

module.exports = mongoose.model('Project', projectSchema);