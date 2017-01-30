(function() {

    $(function() {

        var
            regEmail = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/,
            regName = /^[a-zA-Z'][a-zA-Z-' ]+[a-zA-Z']?$/,
            form = $('.callback__form'),
            parent = form.closest('.callback'),
            emailFieldForm = $('input[name="e-mail"]'),
            nameFieldForm = $('input[name="name"]'),
            textareaFieldForm = $('textarea'),
            fields = $('input[name="e-mail"], input[name="name"], textarea'),
            DURATION =  500;

        var isValid = function(data, temp) {
            return temp.test(data);
        };

        var checkField = function(field, regType, event) {

            if (!regType) {
                if ( !field.val() ) {
                    event.preventDefault();
                    showError(parent, field);
                } else {
                    hideError(field);
                }
            } else {
                if (!field.val()) {
                    event.preventDefault();
                    showError(parent, field);
                } else if (!isValid(field.val(), regType)) {
                    event.preventDefault();
                    showError(parent, field);
                } else {
                    hideError(field);
                }
            }
        };

        var showError = function(parent, field) {
            parent
                .addClass('error');
            
            field
                .addClass('error-input');

            setTimeout(function() {
                parent
                    .removeClass('error');
            }, DURATION)
        };

        var hideError = function(field) {
              field
                  .removeClass('error-input');
        };

        var ajaxReq = function(event) {
            var URL = '/massage';

            $.ajax({
                type: "POST",
                url: URL,
                data: form.serialize(),
                success: function(data) {
                    var dataParsed = JSON.parse(data);

                    createPopup(dataParsed);
                }
            });

            event.preventDefault();
        };

        form.on('submit', function(e) {
            var tunnel = true,
                empty = $('.empty'),
                callback = $('.callback');

            checkField(emailFieldForm, regEmail, e);
            checkField(nameFieldForm, regName, e);
            checkField(textareaFieldForm, false, e);

            fields.each(function() {
                var $this = $(this);
                if ( $this.is('.error-input') ) {
                    tunnel = false;
                }
            });

            if (tunnel) {
                ajaxReq(e);

                empty.add(callback)
                    .fadeOut(1000);
                
                fields.each(function() {
                    var $this = $(this);
                    
                    $this.val('');
                })
            }
        });

        var createPopup = function(obj) {
            var temp = '<div class="popup"> <div class="popup__text"> <p>Здравствуйте {{name}}!' +
                ' <br>Ваше сообщение успешно отправлено! </p> </div> </div>';

            var res = temp.replace(/{{name}}/g, obj.name);

            $(res).appendTo('body');

            $('.popup').fadeIn(DURATION);

            fields.each(function() {
                var $this = $(this);
                $this.val('')
            });

            setTimeout(function() {
                $('.popup').fadeOut(DURATION)
                    .remove();
            }, 5000)
        };
    })
}());
