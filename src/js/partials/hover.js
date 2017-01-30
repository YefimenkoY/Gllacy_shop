(function() {
    $(function() {
        var
            item = $('.nav__item--hover'),
            parent = item.find('.menu'),
            form = $('.form__submit'),
            formHover = form.find('.form__hover'),
            TIME_ANIMATION = 400;

        var showItem = function(itemParent, itmeChild) {

            itemParent.hover(function() {
                itmeChild
                    .css({visibility: 'visible'})
                    .stop()
                    .fadeIn(TIME_ANIMATION);
            },function() {
                itmeChild
                    .stop()
                    .fadeOut(TIME_ANIMATION);
            })
        };

        showItem(item, parent);
        showItem(form, formHover);
    });
}());
