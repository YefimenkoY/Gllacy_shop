(function() {

    $(function() {

        var
            buttons = $('.button')
                .not('.button--map')
                .not('.button--callback'),
            scrollTo = $('.map .container').offset().top,
            TIME_ANIMATION =  1000;

        buttons.each(function() {
            var $this = $(this);
            
            $this.on('click', function(e) {
                e.preventDefault();
                
                $('body').animate({
                    scrollTop: scrollTo
                },TIME_ANIMATION, 'linear')
            });
        })
    })
}());
