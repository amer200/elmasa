const About = require('../models/about');
const Project = require('../models/project');
const projectcateg = require('../models/projectcateg');
exports.getMain = async (req, res) => {
    const about = await About.findOne();
    const projects = await Project.find();
    const categ = await projectcateg.find();
    res.render('admin/index', {
        about: about,
        projects: projects,
        categs: categ
    })
}
/* about */
exports.about = (req, res) => {
    const ar = req.body.ar;
    const en = req.body.en;
    About.findOne()
        .then(a => {
            if (a) {
                a.ar = ar;
                a.en = en;
                if (req.file) {
                    fs.unlink(`public${a.img}`, err => {
                        if (err) {
                            console.log(err)
                        }
                    })
                    a.img = req.file.path.split('public')[1];
                }
                return a.save()
            } else {
                const a = new About({
                    ar: ar,
                    en: en,
                    img: req.file.path.split('public')[1]
                })
                return a.save()
            }
        })
        .then(a => {
            res.redirect('/admin')
        })
        .catch(err => {
            console.log(err)
        })
}
/* projects */
exports.addProject = (req, res) => {
    const name = {
        ar: req.body.namear,
        en: req.body.nameen
    };
    const desc = {
        ar: req.body.descar,
        en: req.body.descen
    };
    const categ = req.body.categ;
    let imgs = []
    req.files.forEach(i => {
        imgs.push(i.path.split('public')[1])
    })
    const project = new Project({
        name: name,
        desc: desc,
        categ: categ,
        imgs: imgs
    })
    project.save()
        .then(s => {
            res.redirect('/admin');
        })
        .catch(err => {
            console.log(err)
        })
}
exports.addProjectCateg = (req, res) => {
    const ar = req.body.ar;
    const en = req.body.en;
    const categ = new projectcateg({
        ar: ar,
        en: en
    })
    categ.save()
        .then(c => {
            res.redirect('/admin');
        })
        .catch(err => {
            console.log(err)
        })
}
exports.removeProjectCateg = (req, res) => {
    const id = req.params.id;
    projectcateg.findByIdAndRemove(id)
        .then(p => {
            res.send({
                msg: 'ok'
            })
        })
        .catch(err => {
            console.log(err)
        })
}
exports.removeProject = (req, res) => {
    const id = req.params.id;
    Project.findByIdAndRemove(id)
        .then(p => {
            p.imgs.forEach(i => {
                fs.unlink(`public${i}`, (err) => {
                    console.log(err)
                })
            })
            res.send({
                msg: 'ok'
            })
        })
        .catch(err => {
            console.log(err)
        })
}