const About = require('../models/about');
const Project = require('../models/project');
const Blog = require('../models/blog');
const projectcateg = require('../models/projectcateg');
const Serv = require('../models/serv');
const fs = require('fs');
exports.getMain = async (req, res) => {
    const about = await About.findOne();
    const projects = await Project.find().populate('categ');
    const blogs = await Blog.find();
    const categ = await projectcateg.find();
    const servs = await Serv.find();
    res.render('admin/index', {
        about: about,
        projects: projects,
        blogs: blogs,
        categs: categ,
        servs: servs
    })
}
/* about */
exports.about = (req, res) => {
    const ar = req.body.ar;
    const en = req.body.en;
    const video = req.body.video;
    const map = req.body.map;
    About.findOne()
        .then(a => {
            if (a) {
                a.ar = ar;
                a.en = en;
                a.video = video;
                a.map = map;
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
                    video: video,
                    map: map,
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
    const map = req.body.map;
    let imgs = []
    req.files.forEach(i => {
        imgs.push(i.path.split('public')[1])
    })
    const project = new Project({
        name: name,
        desc: desc,
        categ: categ,
        map: map,
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
exports.EditProject = (req, res) => {
    const id = req.params.id;
    const name = {
        ar: req.body.namear,
        en: req.body.nameen
    };
    const desc = {
        ar: req.body.descar,
        en: req.body.descen
    };
    const categ = req.body.categ;
    const map = req.body.map;
    Project.findById(id)
        .then(p => {
            p.name = name;
            p.desc = desc;
            p.categ = categ;
            p.map = map;
            if (req.files) {
                req.files.forEach(i => {
                    p.imgs.push(i.path.split('public')[1])
                })
            }
            return p.save()
        })
        .then(p => {
            console.log(p)
            res.redirect('/admin');
        })
        .catch(err => {
            console.log(err)
        })
}
exports.removeProjectImg = (req, res) => {
    const id = req.params.id;
    const img = req.body.img;
    console.log(req.body)
    Project.findById(id)
        .then(p => {
            p.imgs = p.imgs.filter(i => {
                return i != img
            })
            return p.save()
        })
        .then(p => {
            res.status(200).json({
                msg: "ok"
            })
        })
        .catch(err => {
            console.log(err)
        })
}
/** services */
exports.addServ = (req, res) => {
    const img = req.file.path.split('public')[1];
    const title = {
        ar: req.body.titlear,
        en: req.body.titleen
    };
    const content = {
        ar: req.body.ar,
        en: req.body.en
    }
    const serv = new Serv({
        img: img,
        title: title,
        content: content
    })
    serv.save()
        .then(s => {
            res.redirect('/admin')
        })
        .catch(err => {
            console.log(err)
        })
}
exports.editServ = (req, res) => {
    const id = req.params.id;
    // const img = req.file.path.split('public')[1];
    const title = {
        ar: req.body.titlear,
        en: req.body.titleen
    };
    const content = {
        ar: req.body.ar,
        en: req.body.en
    }
    Serv.findById(id)
        .then(serv => {
            serv.content = content;
            serv.title = title;
            if (req.file) {
                serv.img = req.file.path.split('public')[1];
            }
            return serv.save()
        })
        .then(s => {
            res.redirect('/admin')
        })
        .catch(err => {
            console.log(err)
        })
}
exports.removeServ = (req, res) => {
    const id = req.params.id;
    Serv.findByIdAndRemove(id)
        .then(s => {
            fs.unlink(`public${s.img}`, (err) => {
                console.log(err)
            })
            res.redirect('/admin')
        })
        .catch(err => {
            console.log(err)
        })
}
exports.getAdminLogin = (req, res) => {
    res.render('admin/login')
}
exports.postAdminLogin = (req, res) => {
    const password = req.body.password;
    if (password == process.env.ADMINPASSWORD) {
        req.session.admin = true;
        res.redirect('/admin')
    } else {
        res.send('error: wrong password !')
    }
}
exports.adminLogOut = (req, res) => {
    req.session.destroy();
    res.redirect('/')
}

/* blog */
exports.addBlog = (req, res) => {
    const name = {
        ar: req.body.namear,
        en: req.body.nameen
    };
    const desc = {
        ar: req.body.descar,
        en: req.body.descen
    };

    const blog = new Blog({
        name: name,
        desc: desc,
        img: req.file.path.split('public')[1]
    })
    blog.save()
        .then(s => {
            res.redirect('/admin');
        })
        .catch(err => {
            console.log(err)
        })
}

exports.removeBlog = (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndRemove(id)
        .then(b => {
            fs.unlink(`public${b.img}`, (err) => console.log(err))
            res.send({
                msg: 'ok'
            })
        })
        .catch(err => {
            console.log(err)
        })
}
exports.EditBlog = (req, res) => {
    const id = req.params.id;
    const name = {
        ar: req.body.namear,
        en: req.body.nameen
    };
    const desc = {
        ar: req.body.descar,
        en: req.body.descen
    };
    Blog.findById(id)
        .then(b => {
            b.name = name;
            b.desc = desc;
            if (req.file) {
                b.img = req.file.path.split('public')[1];
            }
            return b.save()
        })
        .then(b => {
            console.log(b)
            res.redirect('/admin');
        })
        .catch(err => {
            console.log(err)
        })
}