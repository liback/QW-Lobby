
module.exports = function getSessionUser(req, res, next) {
    var user = false;
    
    if (req.isAuthenticated()) {
        user = req.user;        
    }
    
    res.locals.sessionUser = user;
    next();
};
