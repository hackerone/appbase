define(["backbone", "swipe"], function(Backbone, Swipe) {
  return Backbone.View.extend({
    el: ".app",
    events: {
      "click .swipe-control .next": "slideNext",
      "click .swipe-control .prev": "slidePrev",
      "click .item-target": "slideTo"
    },
    initialize: function() {
      var self;
      this.$('.gallery-bg').addClass('active');
      self = this;
      return this.swipe = new Swipe(this.$("#gallery")[0], {
        stopPropogation: true,
        callback: function(i, el) {
          console.log(i, el);
          return self.slideChange.apply(self, $('img', el));
        }
      });
    },
    slideNext: function(e) {
      e.preventDefault();
      return this.swipe.next();
    },
    slidePrev: function(e) {
      e.preventDefault();
      return this.swipe.prev();
    },
    slideTo: function(e) {
      e.preventDefault();
      return this.swipe.slide($(e.currentTarget).data('target'));
    },
    slideChange: function(img) {
      return this.$('.gallery-bg').attr('src', $(img).attr('src'));
    }
  });
});

/*
//# sourceMappingURL=listing.js.map
*/
