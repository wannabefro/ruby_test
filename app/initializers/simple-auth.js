Ember.Application.initializer({
  name: 'authentication',
  initialize: function(container, application) {
    // register the custom authenticator so the session can find it
    container.register('app:authenticators:custom', App.ExternalAuthenticator);
    Ember.SimpleAuth.setup(container, application);
  }
});
