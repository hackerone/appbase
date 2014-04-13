(function() {
  require.config({
    shim: {
      "skrollr": {
        "exports": "skrollr"
      }
    },
    paths: {
      "jquery": "/components/jquery/dist/jquery",
      "backbone": "/components/backbone/backbone",
      "underscore": "/components/lodash/dist/lodash.underscore",
      "backbone-forms-core": "/components/backbone-forms/distribution.amd/backbone-forms",
      "backbone-forms": "/components/backbone-forms/distribution.amd/templates/bootstrap3",
      "text": "/components/requirejs-text/text",
      "handlebars": "/components/handlebars/handlebars.runtime.amd.min",
      "hogan": "/components/hogan/web/builds/2.0.0/hogan-2.0.0.amd",
      "skrollr": "/components/skrollr/src/skrollr"
    }
  });

  require(["skrollr"], function(skrollr) {
    return skrollr.init();
  });

}).call(this);

/*
//# sourceMappingURL=main.js.map
*/
