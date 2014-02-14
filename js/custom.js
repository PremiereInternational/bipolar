$(document).ready(function() {
    
    /***************** Smooth Scrolling ******************/
    
    function niceScrollInit(){
        $("html").niceScroll({
            background: '#000',
            scrollspeed: 60,
            mousescrollstep: 35,
            cursorwidth: 15,
            cursorborder: 0,
            cursorcolor: '#FFF',
            cursorborderradius: 6,
            autohidemode: false
        });
        
        $('body, body header').css('padding-right','15px');
    }
    var $smoothActive = $('body').attr('data-smooth-scrolling');
    if( $smoothActive == 1 && $(window).width() > 1024){ niceScrollInit(); }
    
    
    /*ONE PAGE NAV*/
    $('.nav.js nav').onePageNav({
        filter : ':not(.external)',
        scrollThreshold : 0.25
    });
    $('.js').onePageNav({
        filter : ':not(.external)',
        scrollThreshold : 0.25
    });
    $('.mob_nav.js ul').onePageNav({
        filter : ':not(.external)',
        scrollThreshold : 0.25
    });
    $('.trigger').toggle(function(){
        $(this).next().slideDown('normal');
    },function(){
        $(this).next().slideUp('normal');
    });
    /* NAV */
   var aNav = $('nav a');
   
    $('nav a').each(function() {
        $(this).wrapInner('<span class="menu_name"></span>');
        $(this).append('<span class="hover"><span class="arr"></span></span>');
    });
    
    /* BORDERS */
    if($(window).width() > 1024) var w = $(window).width()-15; 
    else var w = $(window).width();
    $('.top_box_left, .top_box_right').css('border-left-width', w);
    $('.bot_box_left, .bot_box_right').css('border-right-width', w);
    
    /* CUSTOM */
    $('.lines').each(function(){
       $(this).wrapInner('<span class="plug"></span>');
    }); 
    
    $('.back2top').click(function(){
       $('html, body').animate({scrollTop : 0},'slow');
        return false;
    });
    
    $('.speed_box:nth-child(2n+1)').addClass('ipad');
    
    $('.slide_link').click(function(){
        var target = $(this).attr('href');
        $('html').scrollTo( target, 800 );
        
    });

   
});
/*      SLIDER  */
$(window).load(function() {
    $('body').animate({opacity : 1}, 1000);
    $('.flexslider').flexslider({
        animation : "fade",
        controlNav: false,
        video: true
    });
    $('a.soc_font').tooltip();
    $('.fsoc').tooltip();
});

$(window).resize(function() {
    var w = $(window).width();
    if (w < 768)
        var ipadw = w
    if (w > 768)
        var ipadw = w-15

    $('.top_box_left, .top_box_right').css('border-left-width', w);
    $('.bot_box_left, .bot_box_right').css('border-right-width', w);
});

// CORUSEL
$(function() {

    $.fn.startCarousel = function() {
        var bodywidth = $('body').width(),
            itemwidth = $('.mycarousel li').outerWidth(true),       
            mycontwidth = bodywidth > itemwidth ? bodywidth - bodywidth%itemwidth : itemwidth,
            licount = $('.mycarousel li').size(),
            jscroll = 1;
            
        if(licount > mycontwidth/itemwidth){
            jscroll =  mycontwidth/itemwidth;
        } else {
            jscroll = 0;
            mycontwidth = licount * itemwidth;
        }
        
        $('.mycont').width(mycontwidth);
            
        $('.mycarousel').jcarousel({
            scroll:jscroll,
            itemLoadCallback: addNavigation
        });
    };

    
    $(this).startCarousel();
    
    $(window).resize(function(){
        $(this).startCarousel();
    }); 
    var carousel = $('.mycarousel');
    $(this.carousel).jcarousel({
        scroll:3,
        wrap: 'none',
        //itemLoadCallback: addNavigation,
        itemLoadCallback: {
            onBeforeAnimation: updateNavigationActive
        }
    });
    
});

addNavigation = function(carousel, state) {
  if ($('ul.pager').length > 2) {
    $('ul.pager').remove();
  }
  console.log('test');
  carousel.pageSize = carousel.last - (carousel.first - 1);
  carousel.pageCount = Math.ceil($(carousel.list).children('li').length / carousel.pageSize);
  carousel.pageNumber = 1;

  // Don't add a pager if there's only one page of results.
  if (carousel.pageCount <= 1) {
    return;
  }
  //$(carousel.list).parents('.jcarousel-container:first').removeClass('jcarousel-navigation');

  // Add a class to the wrapper so it can adjust CSS.
  $(carousel.list).parents('.jcarousel-container:first').addClass('jcarousel-navigation');
  var navigation = $('<ul class="pager"></ul>');

  for (var i = 1; i <= carousel.pageCount; i++) {
    var pagerItem = $(('<span>' + i + '</span>'));
    var listItem = $('<li></li>').attr('jcarousel-page', i).append(pagerItem);
    navigation.append(listItem);

    // Scroll to the correct page when a pager is clicked.
    pagerItem.bind('click', function() {
      // We scroll to the new page based on item offsets. This works with
      // circular carousels that do not divide items evenly, making it so that
      // going back or forward in pages will not skip or repeat any items.
      var newPageNumber = $(this).parent().attr('jcarousel-page');
      var itemOffset = (newPageNumber - carousel.pageNumber) * carousel.pageSize;

      if (itemOffset) {
        carousel.scroll(carousel.first + itemOffset);
      }

      return false;
    });
  }
  console.log($(carousel.list).parents('.jcarousel-clip:first').parents('.mycont'));
  $(carousel.list).parents('.jcarousel-clip:first').parents('.mycont').children('.pagination').html(navigation);
}
updateNavigationActive = function(carousel, item, idx, state) {
    
  // The navigation doesn't even exist yet when this is called on init.
  var $listItems = $(carousel.list).parents('.jcarousel-clip:first').parents('.mycont').children('.pagination').find('.pager li');
  if ($listItems.length == 0) {
    return;
  }

  // jCarousel does some very odd things with circular wraps. Items before the
  // first item are given negative numbers and items after the last are given
  // numbers beyond the total number of items. This complicated logic calculates
  // which page number is active based off this numbering scheme.
  var pageNumber = Math.ceil(idx / carousel.pageSize);
  console.log(item);
  console.log(pageNumber);
  if (pageNumber <= 0 || pageNumber > carousel.pageCount) {
    pageNumber = pageNumber % carousel.pageCount;
    pageNumber = pageNumber == 0 ? carousel.pageCount : pageNumber;
    pageNumber = pageNumber < 0 ? pageNumber + carousel.pageCount : pageNumber;
  }
  carousel.pageNumber = pageNumber;
  var currentPage = $listItems.get(carousel.pageNumber - 1);
  // Set the current page to be active.
  $listItems.not(currentPage).removeClass('active');
  $(currentPage).addClass('active');
}

// ISOTOPE
$(document).ready(function(){
    $(window).load(function() {
        var iso_w = $('.isotope-item').width()-30;
        var iso_h = $('.isotope-item').height()-60;
        $('.over_box_inner').height(iso_h);
        $("#container").isotope('reLayout');
    });
});

$(function() {
    var $container = $('#container');
    var winW = $(window).width();
    if (winW < 768)
        var colW = $container.width() / 2
    if (winW > 768)
        var colW = $container.width() / 3

    $container.isotope({
        itemSelector : '.isotope-item',
        masonry : {
            columnWidth : colW
        }
    });

    var $optionSets = $('#options .option-set'), $optionLinks = $optionSets.find('a');

    $optionLinks.click(function() {
        var $this = $(this);
        // don't proceed if already selected
        if ($this.hasClass('selected')) {
            return false;
        }
        var $optionSet = $this.parents('.option-set');
        $optionSet.find('.selected').removeClass('selected');
        $this.addClass('selected');

        // make option object dynamically, i.e. { filter: '.my-filter-class' }
        var options = {}, key = $optionSet.attr('data-option-key'), value = $this.attr('data-option-value');
        // parse 'false' as false boolean
        value = value === 'false' ? false : value;
        options[key] = value;
        if (key === 'layoutMode' && typeof changeLayoutMode === 'function') {
            // changes in layout modes need extra logic
            changeLayoutMode($this, options)
        } else {
            // otherwise, apply new options
            $container.isotope(options);
        }

        return false;
    });
}); 
