define ["backbone", "swipe"], (Backbone, Swipe) ->
  Backbone.View.extend
    el: ".app"

    events: 
      "click .swipe-control .next": "slideNext"
      "click .swipe-control .prev": "slidePrev"
      "click .item-target": "slideTo"

    initialize: () ->

      @$('.gallery-bg').addClass('active')
      self = this

      @swipe = new Swipe(@$("#gallery")[0],
          stopPropogation: true
          callback: (i, el) -> 
            console.log i,el
            self.slideChange.apply(self, $('img',el))
        )

    slideNext: (e) ->
      e.preventDefault()
      @swipe.next()

    slidePrev: (e) ->
      e.preventDefault()
      @swipe.prev()

    slideTo: (e) ->
      e.preventDefault()
      @swipe.slide($(e.currentTarget).data('target'))
        
    slideChange: (img) -> 
      @$('.gallery-bg').attr('src', $(img).attr('src'))