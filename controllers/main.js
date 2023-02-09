const About = require('../models/about');
exports.getMain = async (req, res) => {
    res.render('main/index')
}
exports.getProject = async (req, res) => {
    res.render('main/project')
}
exports.getAbout = async (req, res) => {
    const about = await About.findOne();
    let lang = 'en';
    if (req.session.lang) {
        lang = req.session.lang;
    }
    res.render(`main-${lang}/about`, {
        about: about
    })
}
