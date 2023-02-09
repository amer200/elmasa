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
    let lang = 'en';
    if (req.session.lang) {
        lang = req.session.lang;
    }
    const parts = projects.reduce(function (result, value, index, array) {
        if (index % 2 === 0)
            result.push(array.slice(index, index + 2));
        return result;
    }, []);
    console.log(parts)
    res.render(`main-${lang}/project`, {
        projects: parts
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