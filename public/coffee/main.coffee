require.config
  paths:
    "jquery" : "../components/jquery/dist/jquery",
    "backbone" : "../components/backbone/backbone",
    "underscore" : "../components/lodash/dist/lodash.underscore",
    "backbone-forms-core": "../components/backbone-forms/distribution.amd/backbone-forms",
    "backbone-forms": "../components/backbone-forms/distribution.amd/templates/bootstrap3",
    "text" : "../components/requirejs-text/text",
    "mustache" : "../components/mustache/mustache"

require ["backbone", "Game"], (Backbone, Game) ->
  Backbone.history.start({pushState: true})