App.ExternalAuthenticator = Ember.SimpleAuth.Authenticators.Base.extend({
  restore: function(properties) {
    var _this = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      if (!Ember.isEmpty(properties.access_token)) {
        var store = App.__container__.lookup('store:main');
        var currentUser = store.push('user', JSON.parse(properties.user));
        App.__container__.lookup('controller:currentUser').set('content', currentUser);
        resolve(properties);
      } else {
        reject();
      }
    });
  },
  authenticate: function() {
    return new Ember.RSVP.Promise(function(resolve, reject) {
      App.ExternalConnector.one('externalAuthenticationSucceeded', function(properties) {
        properties.user.id = properties.user.githubId
        Ember.run(function() { 
          var store = App.__container__.lookup('store:main');
          var currentUser = store.push('user', properties.user);
          App.__container__.lookup('controller:currentUser').set('content', currentUser);
          properties.user = JSON.stringify(properties.user);
          resolve(properties); 
        });
      });
      App.ExternalConnector.one('externalAuthenticationFailed', function(error) {
        Ember.run(function() { reject(error); });
      });
      var authWindow = window.open(
        'http://localhost:3000/auth/github'
      );
    });
  }
});

App.ExternalConnector = Ember.Object.createWithMixins(Ember.Evented);
