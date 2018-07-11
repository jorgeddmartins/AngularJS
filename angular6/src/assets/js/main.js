jQuery(function($) {

    'use strict';

    $('.accordion-toggle').on('click', function() {
        $(this).closest('.panel-group').children().each(function() {
            $(this).find('>.panel-heading').removeClass('active');
        });
        $(this).closest('.panel-heading').toggleClass('active');
    });
    $(document).ready(function() {
        var time = 12;
        var $progressBar, $bar, $elem, isPause, tick, percentTime;
        $("#main-slider").find('.owl-carousel').owlCarousel({ slideSpeed: 500, paginationSpeed: 500, singleItem: true, navigation: true, navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"], afterInit: progressBar, afterMove: moved, startDragging: pauseOnDragging, transitionStyle: "fadeUp" });

        function progressBar(elem) {
            $elem = elem;
            buildProgressBar();
            start();
        }

        function buildProgressBar() {
            $progressBar = $("<div>", { id: "progressBar" });
            $bar = $("<div>", { id: "bar" });
            $progressBar.append($bar).appendTo($elem);
        }

        function start() {
            percentTime = 0;
            isPause = false;
            tick = setInterval(interval, 10);
        };

        function interval() {
            if (isPause === false) {
                percentTime += 1 / time;
                $bar.css({ width: percentTime + "%" });
                if (percentTime >= 100) { $elem.trigger('owl.next') }
            }
        }

        function pauseOnDragging() {
            isPause = true;
        }

        function moved() {
            clearTimeout(tick);
            start();
        }
    });
    new WOW().init();
    smoothScroll.init();
    $(window).load(function() {
        'use strict';
        var $portfolio_selectors = $('.portfolio-filter >li>a');
        var $portfolio = $('.portfolio-items');
        $portfolio.isotope({ itemSelector: '.portfolio-item', layoutMode: 'fitRows' });
        $portfolio_selectors.on('click', function() {
            $portfolio_selectors.removeClass('active');
            $(this).addClass('active');
            var selector = $(this).attr('data-filter');
            $portfolio.isotope({ filter: selector });
            return false;
        });
    });
    $(document).ready(function() {
        $('.progress-bar').bind('inview', function(event, visible, visiblePartX, visiblePartY) {
            if (visible) {
                $(this).css('width', $(this).data('width') + '%');
                $(this).unbind('inview');
            }
        });
        $.fn.animateNumbers = function(stop, commas, duration, ease) {
            return this.each(function() {
                var $this = $(this);
                var start = parseInt($this.text().replace(/,/g, ""));
                commas = (commas === undefined) ? true : commas;
                $({ value: start }).animate({ value: stop }, {
                    duration: duration == undefined ? 1000 : duration,
                    easing: ease == undefined ? "swing" : ease,
                    step: function() {
                        $this.text(Math.floor(this.value));
                        if (commas) {
                            $this.text($this.text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
                        }
                    },
                    complete: function() {
                        if (parseInt($this.text()) !== stop) {
                            $this.text(stop);
                            if (commas) {
                                $this.text($this.text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
                            }
                        }
                    }
                });
            });
        };
        $('.animated-number').bind('inview', function(event, visible, visiblePartX, visiblePartY) {
            var $this = $(this);
            if (visible) {
                $this.animateNumbers($this.data('digit'), false, $this.data('duration'));
                $this.unbind('inview');
            }
        });
    });
    var form = $('#main-contact-form');
    form.submit(function(event) {
        event.preventDefault();
        var form_status = $('<div class="form_status"></div>');
        $.ajax({
            url: $(this).attr('action'),
            beforeSend: function() {
                form.prepend(form_status.html('<p><i class="fa fa-spinner fa-spin"></i> Email is sending...</p>').fadeIn());
            }
        }).done(function(data) {
            form_status.html('<p class="text-success">Thank you for contact us. As early as possible  we will contact you</p>').delay(3000).fadeOut();
        });
    });

    $("a[rel^='prettyPhoto']").prettyPhoto({ social_tools: false });



});