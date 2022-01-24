$(document).ready(function () {

    // function isIOS() {
    //     return /iP(ad|hone|od).+Version\/[\d\.]+.*Safari/i.test(navigator.userAgent);
    // }

    // var isMenuShowing = false;
    // var isToggled = false;
    // var isToggleFinished = false;
    // var menuHeight = 60;

    // var scrollPivot = null;
    // var scrollDistanceUp = 0;
    // var scrollDistanceDown = 0;

    // var mainScrollPosition;

    // var toggleBooking = function (isVoucher) {
    //     //$('.main-content').toggleClass('toggled');
    //     var height = window.innerHeight;
    //     var toggleOffset = $('.main-content').scrollTop() > 300 ? (height - menuHeight) : height;
    //     if (window.innerWidth < 568) toggleOffset += 60;

    //     if (isIOS())
    //         $(window).scrollTop(mainScrollPosition);


    //     if (isToggled) {
    //         $('.booking-content').removeClass('toggled').velocity({ translateY: 0 }, 500, "swing", function () {
    //             //$('.booking-content').fadeOut();
    //             //$('.booking-content').animate({ opacity: 0 });
    //             $('#booking_frame').hide();
    //             $('#voucher_frame').hide();
    //             isToggleFinished = false;
    //         });
    //         $('.menu-bar').removeClass('toggled');
    //         $('html, body').css({ overflow: 'scroll' });
    //         $('.menu-bar .book-button').html('Book a table');
    //         $('.menu-bar .voucher-button').show();
    //         $('.menu-bar .menu-logo').show();
    //     } else {
    //         if (isIOS()) {
    //             mainScrollPosition = $(window).scrollTop();
    //             $(window).scrollTop(0);
    //         }
    //         $('.booking-content').show();
    //         isVoucher ? $('#voucher_frame').show() : $('#booking_frame').show();
    //         isVoucher ? $('.booking-text').hide() : $('.booking-text').show();
    //         $('.booking-content').addClass('toggled').velocity({ translateY: toggleOffset }, 500, "swing");
    //         $('.menu-bar').addClass('toggled');
    //         isVoucher ? $('.menu-bar .book-button').html('Close voucher') : $('.menu-bar .book-button').html('Close booking');
    //         $('.menu-bar .voucher-button').hide();
    //         $('.menu-bar .menu-logo').hide();
    //         $('.booking-content').scrollTop(0);
    //         $('html, body').css({ overflow: 'hidden' });

    //     }

    //     isToggled = !isToggled;
    //     if (isToggled) isToggleFinished = true;

    // }

    // $('.book-button').click(function () {
    //     //toggleBooking(false);
    // });

    // $('.voucher-button').click(function () {
    //     toggleBooking(true);
    // });

    // var showMenu = function () {

    //     if (!isMenuShowing) {
    //         $('.menu-bar').animate({ transform: 'translateY(0)' })

    //         isMenuShowing = true;
    //     }

    // };

    // var hideMenu = function () {

    //     if (isMenuShowing) {
    //         $('.menu-bar').animate({ marginTop: 'translateY(' + -menuHeight + 'px)' })

    //         isMenuShowing = false;
    //     }

    // }

    var percentageToOpacity = function (percentage, offset) {
        var distance = (percentage * 100);

        if (distance >= (50 - offset) && distance <= (50 + offset))
            return 1;

        if (distance > 50)
            distance = 100 - distance;

        return ((distance / (50 - offset)))

    }


    // $('.hero-copy:not(.no-animate)').jScrollability(
    //     function ($el) { return $el.closest('section').offset().top; },
    //     function ($el) { return $el.closest('section').offset().top + $el.closest('section').height() * 2; },
    //     function ($el, pcnt) {
    //         if (isToggleFinished) return false;
    //         $el.css({
    //             'opacity': percentageToOpacity(pcnt, 10),
    //             'transform': 'translateX(' + ((percentageToOpacity(pcnt, 5) * 20) - 20) + 'px)'
    //         });
    //     }
    // )

    // $('.hero-book:not(.no-animate)').jScrollability(
    //     function ($el) { return $el.closest('section').offset().top; },
    //     function ($el) { return $el.closest('section').offset().top + $el.closest('section').height() * 2; },
    //     function ($el, pcnt) {
    //         if (isToggleFinished) return false;
    //         //if (window.innerWidth < 568) return false;
    //         $el.css({
    //             'opacity': percentageToOpacity(pcnt, 10),
    //         });
    //     }
    // )


    // $('#first-cover').jScrollability(
    //     function ($el) { 
    //         console.log($('#first-cover').parent().offset().top + $('#first-cover').parent().height() * 2)
    //         return $('#first-cover').parent().offset().top; 
    //     },
    //     function ($el) { return $('#first-cover').parent().offset().top + $('#first-cover').parent().height() * 2; },
    //     function ($el, pcnt) {
    //         //console.log(1.2 - percentageToOpacity(pcnt, 10));
    //         console.log(pcnt);
    //         //if (window.innerWidth < 568) return false;
    //         if (isToggleFinished) return false;
    //         $('#first-cover').css({
    //             'opacity': 1.2 - percentageToOpacity(pcnt, 10)
    //         });
    //     }
    // )


    var headroom = new Headroom(
        document.querySelectorAll('.menu-bar')[0]
    );


    headroom.init();
    $(window).on('scroll', function() {
        var scrollTop = $(this).scrollTop();

        $('.background-cover').css({
          opacity: function() {
            var top = $(this).closest('section').offset().top;
            var bottom = $(this).parent().offset().top + $(this).parent().height() * 2; 
            var pcnt = 0.5 + ((scrollTop - top) / (bottom - top));
            return 1 - percentageToOpacity(pcnt, 10);
          }
        });

        $('.hero-book:not(.no-animate)').css({
            opacity: function() {
              var top = $(this).closest('section').offset().top;
              var bottom = $(this).closest('section').offset().top + $(this).closest('section').height() * 2; 
              var pcnt = 0.5 + ((scrollTop - top) / (bottom - top));
              return percentageToOpacity(pcnt, 10);
            }
          });

        $('.hero-copy:not(.no-animate)').css({
            transform: function() {
                var top = $(this).closest('section').offset().top;
                var bottom = $(this).closest('section').offset().top + $(this).closest('section').height() * 2; 
                var pcnt = 0.5 + ((scrollTop - top) / (bottom - top));
                return 'translateX(' + ((percentageToOpacity(pcnt, 5) * 20) - 20) + 'px)'
            },
            opacity: function() {
              var top = $(this).closest('section').offset().top;
              var bottom = $(this).closest('section').offset().top + $(this).closest('section').height() * 2; 
              var pcnt = 0.5 + ((scrollTop - top) / (bottom - top));
              return percentageToOpacity(pcnt, 10);
            }
          });
      });

    // (function($) {
    //     $(document).ready(function() {
    //         $.jScrollability([
    //             {
    //                 'selector': '.background-cover',
    //                 'start': 'parent',
    //                 'end': 'parent',
    //                 'fn': {
    //                     'opacity': {
    //                         'start': 1,
    //                         'end': 0,
    //                     }
    //                 }
    //             }
    //         ]);
    //     });
    // })(jQuery);


});