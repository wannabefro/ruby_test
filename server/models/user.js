'use strict';

var connection = require('./index');
var Schema = require('mongoose').Schema;

var userSchema = new Schema({
  githubId: String,
  githubToken: String,
  username: String,
  email: String,
});

// May change if using multiple strategies for Passport.
userSchema.path('username').required(true);
userSchema.path('githubId').required(true);
userSchema.path('githubToken').required(true);

module.exports = connection.model('User', userSchema);
