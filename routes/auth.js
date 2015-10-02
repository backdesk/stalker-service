module.exports = function (app, passport) {
    app.get('/login', function (req, res) {
        res.render('login', {});
    });

    app.post('/login',
        passport.authenticate('local', {
            failureRedirect : '/login',
            successRedirect : '/profile'
        }));

    app.get('/profile', isLoggedIn, function (req, res) {
        res.render('profile', { user : req.user });
    });

    app.post('/profile', isLoggedIn, function (req, res) {
        res.render('profile', { user : req.user });
    });
};

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect('/');
}