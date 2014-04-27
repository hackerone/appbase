(function() {
  define(["backbone", "views/listing"], function(Backbone, Listing) {
    var Route;
    Route = Backbone.Router.extend({
      routes: {
        "listing": "listing"
      },
      listing: function() {
        var listing;
        console.log("lx");
        return listing = new Listing();
      }
    });
    return new Route();
  });

}).call(this);

/*
//# sourceMappingURL=route.js.map
*/
