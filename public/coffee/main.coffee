require.config
  shim:
    "skrollr":
      "exports" : "skrollr"
    "swipe":
      "exports" : "Swipe"
    "bs": ["jquery"]
  paths:
    "jquery" : "../components/jquery/dist/jquery",
    "backbone" : "../components/backbone/backbone",
    "underscore" : "../components/lodash/dist/lodash.underscore",
    "skrollr": "../components/skrollr/src/skrollr"
    "rjs": "../components/requirejs/require"
    "selectize": "../components/selectize/dist/js/standalone/selectize.min"
    "swipe": "../components/swipe/swipe"
    "bs" : "../components/bootstrap-sass/vendor/assets/javascripts/bootstrap"

require ["backbone", "skrollr", "routes/app" , "selectize"], (Backbone, skrollr, App) ->


  skrollr.init
    forceHeight: false
    smoothScrolling: false

  $('select').selectize()

  app = new App()

  Backbone.history.start
    pushState : true
    
