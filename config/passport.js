
// we use our own home made local strategy as opposed 
// to others (Facebook, Google OAuth etc...)
var LocalStrategy   = require('passport-local').Strategy;

// setup db
var mysql       = require('mysql');
var bcrypt      = require('bcrypt-nodejs');
var dbconfig    = require('./database');
var connection  = mysql.createConnection(dbconfig.connection);

connection.query('USE '+ dbconfig.database);

// expose this function to our app using module.exports
module.exports = function(passport) {

    /***
    *
    *   Passport session setup
    *   Note: Required for persistent login sessions.
    *   Passport needs ability to serialize and 
    *   unserialize users out of session
    *
    ***/

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });


    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        connection.query("SELECT * FROM users WHERE id = ? ", [id], function(err, rows) {

            done(err, rows[0]);
        });
    });
    
    /***
    *
    *   Local signup
    *   
    ***/
    
    passport.use(
        'local-signup',
        new LocalStrategy({
            usernameField : 'username',
            passwordField : 'password',
            passReqToCallback : true
        },
        function (req, username, password, done) {
            // check if user already exist
            connection.query("SELECT * FROM users WHERE username = ?", [username], function(err, rows) {
                if (err)
                    return done(err);
                if (rows.length) {
                    return done(null, false, req.flash('signupMessage', 'The username is already taken'));
                } else {
                    // create user
                    var newUserMysql = {
                        username: username,
                        password: bcrypt.hashSync(password, null, null)
                    };
                    
                    var insertQuery = "INSERT INTO users ( username, password ) values(?,?)";
                    
                    connection.query(insertQuery, [newUserMysql.username, newUserMysql.password], function(err, rows) {
                        newUserMysql.id = rows.insertId;

                        return done(null, newUserMysql);
                    });
                }
            });
        })
    );
    
    /***
    *
    *   Local login
    *   
    ***/
    
    passport.use(
        'local-login',
        new LocalStrategy({
            usernameField : 'username',
            passwordField : 'password',
            passReqToCallback : true
        },
        function (req, username, password, done) {

            connection.query("SELECT * FROM users WHERE username = ?", [username], function (err, rows) {
                if (err)
                    return done(err);
                if (!rows.length) {
                    return done(null, false, req.flash('loginMessage', 'No user found.'));
                }
                
                if (!bcrypt.compareSync(password, rows[0].password))
                    return done(null, false, req.flash('loginMessage', 'Wrong password'));

                // all is well
                return done(null, rows[0]);
            });
        })
    );    
    
}

