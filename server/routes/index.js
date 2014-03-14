'use strict';
var passport = require('passport');

/**
 * Declare routes here for services/proxies/etc.
 * @param {Express} app Express application to add routes to.
 */
module.exports = function(app) {
  app.get('/api/v1/questions', function(req, res){
    res.json({status: 200});
  });
  app.get('/logout', function(req, res){
    req.logout();
  });
  app.get('/auth/github', passport.authenticate('github'));
  app.get('/auth/github/callback', function(req, res, next){
    passport.authenticate('github', function(err, user, info){
      if (err){
        return res.render('oauth');
      }
      return res.render('oauth', {success: true, access_token: user.githubToken, user: user});
    })(req, res, next);
  });
}
