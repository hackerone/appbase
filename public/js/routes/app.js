define(["backbone", "views/listing"], function(Backbone, Listing) {
  return Backbone.Router.extend({
    routes: {
      "listing": "listing"
    },
    listing: function() {
      var list;
      return list = new Listing();
    }
  });
});

/*
//# sourceMappingURL=app.js.map
*/
