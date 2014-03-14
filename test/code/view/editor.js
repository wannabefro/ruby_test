'use strict';

describe('EditorView', function() {
  var editorView;

  beforeEach(function() {
    Ember.run(function() {
      App.reset();
      editorView = App.EditorView.create();
      editorView.append();
    });
  });

  it('', function() {

  });

  afterEach(function() {
    Ember.run(function() {
      editorView.destroy();
    });
  });
});
