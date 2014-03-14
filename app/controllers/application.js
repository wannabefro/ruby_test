App.ApplicationRoute = Ember.Route.extend(Ember.SimpleAuth.ApplicationRouteMixin, {
  actions: {
    // override authenticateSession to instead of transitioning to a login route start authentication directly
    authenticateSession: function() {
      var _this = this;
      this.get('session').authenticate('app:authenticators:custom', {}).then(function(response) {
        _this.send('sessionAuthenticationSucceeded');
      }, function(error) {
        _this.send('sessionAuthenticationFailed', error);
      });
    },
    invalidateSession: function(){
      var _this = this;
      this.get('session').invalidate().then(function(){
        $.get('logout');
      });
    }
  }
});

