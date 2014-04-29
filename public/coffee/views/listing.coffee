define ["backbone", "swipe", "bs/tab"], (Backbone, Swipe) ->
  Backbone.View.extend
    el: ".app"

    events: 
      "click .swipe-control .next": "slideNext"
      "click .swipe-control .prev": "slidePrev"
      "click .item-target": "slideTo"

      "click .nav-tabs a" : "switchTab"

    initialize: () ->

      @$('.bg-image').addClass('active')
      self = this

      @initSwipe()

    switchTab: (e) ->
      e.preventDefault()

      $(e.currentTarget).tab('show')


      
    initSwipe: () ->
      
      thumbWrap = $('<div class="swipe-thumb-wrap swipe-wrap"></div>')
      thumbSlide = $('<div class="swipe-thumb-slide"></div>')

      @$('.swipe-img').each (i,e) ->
        if i > 1 && i%6 == 0
          thumbWrap.append(thumbSlide)
          thumbSlide = $('<div class="swipe-thumb-slide"></div>')

        thumbSlide.append("<a class='item-target' data-target="+i+"><img src='"+$(e).data('thumb')+"'></a>")         
        

      thumbWrap.append(thumbSlide)

      @$('.swipe-thumb').append(thumbWrap)

      $($('.item-target')[0]).addClass('active')

      @thumbswipe = new Swipe(@$('#swipe-thumb')[0])

      self = this

      @swipe = new Swipe(@$("#gallery")[0],
          stopPropogation: true
          callback: (i, el) -> 
            self.slideChange.call self, i,$('img',el)
            return true
        )

    slideNext: (e) ->
      e.preventDefault()
      @thumbswipe.next()

    slidePrev: (e) ->
      e.preventDefault()
      @thumbswipe.prev()

    slideTo: (e) ->
      e.preventDefault()
      @swipe.slide($(e.currentTarget).data('target'))
        
    slideChange: (i, img) ->
      
      $('.item-target').removeClass('active')
      $($('.item-target')[i]).addClass('active')

      bot = @$('.img.bot')
      top = @$('.img.top')

      src = bot.attr('src')
      top.attr('src', src)
      top.removeClass('inactive')

      setTimeout () ->
        bot.attr('src', img.data('thumb'))
        top.addClass('inactive')
      , 400
