(function() {
  require.config({
    shim: {
      "skrollr": {
        "exports": "skrollr"
      }
    },
    paths: {
      "jquery": "../components/jquery/dist/jquery",
      "backbone": "../components/backbone/backbone",
      "underscore": "../components/lodash/dist/lodash.underscore",
      "skrollr": "../components/skrollr/src/skrollr",
      "rjs": "../components/requirejs/require"
    }
  });

  require(["skrollr"], function(skrollr) {
    return skrollr.init();
  });

}).call(this);

/*
//# sourceMappingURL=main.js.map
*/
