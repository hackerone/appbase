define(["backbone","swipe","bs/tab"],function(e,t){return e.View.extend({el:".app",events:{"click .swipe-control .next":"slideNext","click .swipe-control .prev":"slidePrev","click .item-target":"slideTo","click .nav-tabs a":"switchTab"},initialize:function(){var e;return this.$(".bg-image").addClass("active"),e=this,this.initSwipe()},switchTab:function(e){return e.preventDefault(),$(e.currentTarget).tab("show")},initSwipe:function(){var e,n,r;return r=$('<div class="swipe-thumb-wrap swipe-wrap"></div>'),n=$('<div class="swipe-thumb-slide"></div>'),this.$(".swipe-img").each(function(e,t){return e>1&&e%6===0&&(r.append(n),n=$('<div class="swipe-thumb-slide"></div>')),n.append("<a class='item-target' data-target="+e+"><img src='"+$(t).data("thumb")+"'></a>")}),r.append(n),this.$(".swipe-thumb").append(r),$($(".item-target")[0]).addClass("active"),this.thumbswipe=new t(this.$("#swipe-thumb")[0]),e=this,this.swipe=new t(this.$("#gallery")[0],{stopPropogation:!0,callback:function(t,n){return e.slideChange.call(e,t,$("img",n)),!0}})},slideNext:function(e){return e.preventDefault(),this.thumbswipe.next()},slidePrev:function(e){return e.preventDefault(),this.thumbswipe.prev()},slideTo:function(e){return e.preventDefault(),this.swipe.slide($(e.currentTarget).data("target"))},slideChange:function(e,t){var n,r,i;return $(".item-target").removeClass("active"),$($(".item-target")[e]).addClass("active"),n=this.$(".img.bot"),i=this.$(".img.top"),r=n.attr("src"),i.attr("src",r),i.removeClass("inactive"),setTimeout(function(){return n.attr("src",t.data("thumb")),n.on("load",function(){return i.addClass("inactive")})},200)}})});