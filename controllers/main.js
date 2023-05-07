const About = require('../models/about');
const Project = require('../models/project');
const Blog = require('../models/blog');
const Serv = require('../models/serv');
exports.getMain = async (req, res) => {
    const about = await About.findOne();
    const projects = await Project.find().populate('categ');
    const blogs = await Blog.find();
    const servs = await Serv.find();
    const parts = projects.reduce(function (result, value, index, array) {
        if (index % 2 === 0)
            result.push(array.slice(index, index + 2));
        return result;
    }, []);
    let lang = 'en';
    if (req.session.lang) {
        lang = req.session.lang;
    }
    res.render(`main-${lang}/index`, {
        about: about,
        projectsP: parts,
        projects: projects,
        blogs: blogs,
        servs: servs
    })
}
exports.getProjects = async (req, res) => {
    const projects = await Project.find();
    let lang = 'en';
    if (req.session.lang) {
        lang = req.session.lang;
    }
    console.log(projects[0])
    res.render(`main-${lang}/project`, {
        projects: projects
    })
}
exports.getProjectById = async (req, res) => {
    const id = req.params.id;
    const project = await Project.findById(id);
    let lang = 'en';
    if (req.session.lang) {
        lang = req.session.lang;
    }
    res.render(`main-${lang}/single_project`, {
        p: project
    })
}

exports.getBlogs = async (req, res) => {
    const blogs = await Blog.find();
    let lang = 'en';
    if (req.session.lang) {
        lang = req.session.lang;
    }
    console.log(blogs[0])
    res.render(`main-${lang}/blog`, {
        blogs: blogs
    })
}
exports.getBlogById = async (req, res) => {
    const id = req.params.id;
    const blog = await Blog.findById(id);
    let lang = 'en';
    if (req.session.lang) {
        lang = req.session.lang;
    }
    res.render(`main-${lang}/single_blog`, {
        b: blog
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
exports.getServices = async (req, res) => {
    const servs = await Serv.find();
    let lang = 'en';
    if (req.session.lang) {
        lang = req.session.lang;
    }
    res.render(`main-${lang}/service`, {
        servs: servs
    })
}
exports.getContact = async (req, res) => {
    let lang = 'en';
    if (req.session.lang) {
        lang = req.session.lang;
    }
    res.render(`main-${lang}/contact`)
}
exports.changeLang = (req, res) => {
    const lang = req.params.l;
    req.session.lang = lang;
    res.redirect('/')
}