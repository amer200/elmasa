exports.isAdmin = (req, res, next) => {
    next();
    // if (req.session.admin) {
    //     next();
    // } else {
    //     res.redirect('/admin/login');
    // }
}