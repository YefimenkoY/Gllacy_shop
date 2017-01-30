(function() {

    $(function() {
        var
            emptyLayout = $('.empty'),
            callback = $('.callback'),
            button = $('.button--map .button__link'),
            closeButton = callback.find('.callback__close'),
            TIME_ANIMATION = 300;

        button.on('click', function(e) {
            e.preventDefault();

            callback.addClass('open-popup');

            emptyLayout
                .add(callback)
                .fadeIn(0);

            setTimeout(function() {
                callback.removeClass('open-popup')
            }, 500)
        });

        closeButton.on('click', function(e) {
            e.preventDefault();
            emptyLayout
                .add(callback)
                .fadeOut(TIME_ANIMATION);
        });
    });
}());
