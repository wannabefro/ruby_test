'use strict';

var passport = require('passport');
var User = require('../models/user');
var GithubStrategy = require('passport-github').Strategy;
var configAuth = require('./auth');

/**
 * Set up Passport and connect to the application. Passport will use the user
 * model.
 * @param {Express} app Express application to add Passport to.
 */
module.exports = function(app) {
  // Hook in with user model
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  passport.deserializeUser(function(id, done) {
    User.findById(id, '-password').exec(done);
  });
  passport.use(new GithubStrategy({
    clientID: configAuth.githubAuth.clientID,
    clientSecret: configAuth.githubAuth.clientSecret,
    callbackURL: configAuth.githubAuth.callbackURL
  },
  function(token, refreshToken, profile, done) {

    // make the code asynchronous
    // User.findOne won't fire until we have all our data back from Google
    process.nextTick(function() {

      // try to find the user based on their google id
      User.findOne({ 'githubId' : profile.id }, function(err, user) {
        if (err)
          return done(err);

        if (user) {
          return done(null, user);
        } else {
          // if the user isnt in our database, create a new user
          var newUser          = new User();

          newUser.githubId    = profile.id;
          newUser.githubToken = token;
          newUser.username  = profile.username;
          newUser.email = profile.emails[0].value; // pull the first email

          // save the user
          newUser.save(function(err) {
            if (err)
              throw err;
            return done(null, newUser);
          });
        }
      });
    });
  }
                                 ));

                                 // Connect middleware
                                 app.use(passport.initialize());
                                 app.use(passport.session());
};
