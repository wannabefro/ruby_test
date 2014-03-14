App.EditorView = Ember.View.extend({
  didInsertElement: function(){
    var editor = ace.edit('editor');
    editor.setTheme("ace/theme/solarized_dark");
    editor.getSession().setMode("ace/mode/ruby");
  }

});
