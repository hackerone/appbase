define(["backbone", "swipe", "bs/tab"], function(Backbone, Swipe) {
  return Backbone.View.extend({
    el: ".app",
    events: {
      "click .swipe-control .next": "slideNext",
      "click .swipe-control .prev": "slidePrev",
      "click .item-target": "slideTo",
      "click .nav-tabs a": "switchTab"
    },
    initialize: function() {
      var self;
      this.$('.bg-image').addClass('active');
      self = this;
      return this.initSwipe();
    },
    switchTab: function(e) {
      e.preventDefault();
      return $(e.currentTarget).tab('show');
    },
    initSwipe: function() {
      var self, thumbSlide, thumbWrap;
      thumbWrap = $('<div class="swipe-thumb-wrap swipe-wrap"></div>');
      thumbSlide = $('<div class="swipe-thumb-slide"></div>');
      this.$('.swipe-img').each(function(i, e) {
        if (i > 1 && i % 6 === 0) {
          thumbWrap.append(thumbSlide);
          thumbSlide = $('<div class="swipe-thumb-slide"></div>');
        }
        return thumbSlide.append("<a class='item-target' data-target=" + i + "><img src='" + $(e).data('thumb') + "'></a>");
      });
      thumbWrap.append(thumbSlide);
      this.$('.swipe-thumb').append(thumbWrap);
      $($('.item-target')[0]).addClass('active');
      this.thumbswipe = new Swipe(this.$('#swipe-thumb')[0]);
      self = this;
      return this.swipe = new Swipe(this.$("#gallery")[0], {
        stopPropogation: true,
        callback: function(i, el) {
          self.slideChange.call(self, i, $('img', el));
          return true;
        }
      });
    },
    slideNext: function(e) {
      e.preventDefault();
      return this.thumbswipe.next();
    },
    slidePrev: function(e) {
      e.preventDefault();
      return this.thumbswipe.prev();
    },
    slideTo: function(e) {
      e.preventDefault();
      return this.swipe.slide($(e.currentTarget).data('target'));
    },
    slideChange: function(i, img) {
      var bot, src, top;
      $('.item-target').removeClass('active');
      $($('.item-target')[i]).addClass('active');
      bot = this.$('.img.bot');
      top = this.$('.img.top');
      src = bot.attr('src');
      top.attr('src', src);
      top.removeClass('inactive');
      return setTimeout(function() {
        bot.attr('src', img.data('thumb'));
        return top.addClass('inactive');
      }, 100);
    }
  });
});

/*
//# sourceMappingURL=listing.js.map
*/
