require.config
  shim:
    "skrollr":
      "exports" : "skrollr"
  paths:
    "jquery" : "../components/jquery/dist/jquery",
    "backbone" : "../components/backbone/backbone",
    "underscore" : "../components/lodash/dist/lodash.underscore",
    "skrollr": "../components/skrollr/src/skrollr"
    "rjs": "../components/requirejs/require"
    "selectize": "../components/selectize/dist/js/standalone/selectize.min"

require ["skrollr", "selectize"], (skrollr) ->
  skrollr.init
    forceHeight: false
    smoothScrolling: false

  $('select').selectize();
