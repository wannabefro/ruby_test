'use strict';

describe('Repo', function() {
  var repo;

  beforeEach(function() {
    Ember.run(function() {
      App.reset();
      repo = App.Repo.create();
    });
  });

  it('', function() {

  });

  afterEach(function() {
    Ember.run(function() {
      repo.destroy();
    });
  });
});
