
module.exports = function isLoggedIn(req, res, next) {
    
    // If authenticated then continue...
    if (req.isAuthenticated()) {
        return next();
    } else {
        // ...otherwise deny
        res.redirect('/');
    }
    
};
