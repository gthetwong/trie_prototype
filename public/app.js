window.App = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},  
  initialize: function() {
    this.router = new this.Routers.Main();
    Backbone.history.start({pushState: true});

    App.autocompleter = new Autocompleter();
    var ws = new WebSocket('ws://' + window.location.host + window.location.pathname);
    ws.onmessage = function(m) { 
      App.autocompleter.add(m.data); 
    };

  }
};
$(document).ready(function(){
  App.initialize();
});




App.Routers.Main = Backbone.Router.extend({
  routes: {
      "": "index",
      "/(:param)": "param_search"
    },

  index: function(){
    var view = new App.Views.Index();
    $("#container").append(view.render().el);
  },
  param_search: function(param){
    var view = new App.Views.Index();
    $("#container").append(view.render().el);
    view.auto_search(param);
  }
});




App.Views.Index = Backbone.View.extend({
  id: "search_temp", 
  events: {"keyup #search_bar": "search_fnc"},
  tagName: "span",
  template: function(){ return "<form> <input id=\"search_bar\" type=\"text\"> Search field</input></form>";},

  render: function(){
    $(this.el).html(this.template());
    // alert("hellowwwworld");
    return this;
  },
  search_fnc: function(){
      $("#titles").empty();
        var word = $("#search_bar").val();
        var results = App.autocompleter.complete(word);
        $.each(results, function(index, value){
          $("#titles").append("<li><a href=\"https://en.wikipedia.org/wiki/"+ value + "\">"+ value + "</li>");
          // $("#titles").html(results);
        });
  },
  auto_search: function(param){
    var results = App.autocompleter.complete(param);
     $.each(results, function(index, value){
          $("#titles").append("<li><a href=\"https://en.wikipedia.org/wiki/"+ value + "\">"+ value + "</li>");
          // $("#titles").html(results);
        });
  }
});

