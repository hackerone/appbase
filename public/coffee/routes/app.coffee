define ["backbone", "views/listing"],(Backbone, Listing) ->
  Backbone.Router.extend

    routes:
      "listing": "listing"

    listing: () -> 
      list = new Listing()