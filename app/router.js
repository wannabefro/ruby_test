App.Router.map(function() {
  this.resource('questions', function(){
    this.route('index', {path: '/'});
  }),
  this.route('editor');
});

App.Router.reopen({
  location: 'history'
});
