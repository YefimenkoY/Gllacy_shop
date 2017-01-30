(function() {

    var wow = new WOW(
        {
            boxClass:     'wow',
            animateClass: 'animated',
            offset:       0,
            mobile:       true,
            live:         true
        }
    ).init();

    $('.slider').slick({
        dots: true,
        infinite: true,
        speed: 600,
        autoplaySpeed: 3000,
        slidesToShow: 1,
        autoplay: true,
        adaptiveHeight: false,
        arrows: false
    });


    $(function() {
        var slickDots = $('.slick-dots li');

        slickDots.each(function() {
            var $this = $(this);

            $this.on('click', function(e) {
                e.preventDefault();

                var index = $(this).index() + 1,
                    body = $('body');

                body
                    .attr('class', '')
                    .addClass('bg-color-' + index)
            });
        })
    });
}());
