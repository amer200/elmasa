const About = require('../models/about');
const Project = require('../models/project');
exports.getMain = async (req, res) => {
    let lang = 'en';
    if (req.session.lang) {
        lang = req.session.lang;
    }
    res.render('main-en/index')
}
exports.getProjects = async (req, res) => {
    const projects = await Project.find();
    let allP = [];
    let lang = 'en';
    if (req.session.lang) {
        lang = req.session.lang;
    }
    for (let i = 0; i <= projects.length; i+=2) {
        let part;
        part = projects.splice(i, 2);
        allP.push(part)
    }
    res.render(`main-${lang}/project`, {
        projects: allP
    })
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