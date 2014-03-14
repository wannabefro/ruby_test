Ember.Application.initializer({
  name: 'currentUser',
  initialize: function(container, application){
    var store = container.lookup('store:main');
    var controller = container.lookup('controller:currentUser').set('content', null);
    container.typeInjection('controller', 'currentUser', 'controller:currentUser');
  }
});
