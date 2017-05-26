var GD = GD || {};

document.body.className += 'js';

GD.contactForm = function() {

    var contactUsForm = $('.contact-us-form'),
        formData = {"name": '', "phone":  '', "email":  '', "company":  '', "budget":  '', "info":  ''},
        name = $('#name'),
        phone = $('#phone'),
        email = $('#email'),
        company = $('#company'),
        budget = $('#budget'),
        info = $('#info'),
        form = $('#contactForm'),
        // sucessMgs = $('#sucessMgs'),
        sucessMgs = "<p id='sucessMgs'>Thanks for your enquiry, we&#8217;ll be in touch soon!</p>",
        URL = $(form).attr('action');


    function getFormData() {
        // validate the comment form when it is submitted
        form.validate({
            submitHandler: function (form) {
                formData = {
                    "name": name.val(),
                    "phone": phone.val(),
                    "email": email.val(),
                    "company": company.val(),
                    "budget": budget.val(),
                    "info": info.val()
                };

                $.ajax({
                    type: 'POST',
                    url: URL,
                    data: formData,
                    dataType: 'json'
                }).done(function (response) {

                    console.log('response 1', response);

                    if (response.status === 'error') {

                        console.log('response 2', response);

                    } else {

                        console.log('response 3', response);


                        $('[data-switch-default]').addClass('hidden');
                        // sucessMgs.removeClass('hidden');
                        $('.get-in-touch .content-block').append(sucessMgs);


                    }

                }).fail(function (response) {
                    console.log('response 4', response);
                    console.log('we have an issue!');
                });


            }

        });

    }

    return {
        init: function () {
            //show contact-us-form
            contactUsForm.show();
            getFormData();

        }

    };

}();

GD.general = function() {

    function smoothScroll(el, to, duration) {
        if (duration < 0) {
            return;
        }
        var difference = to - $(window).scrollTop();
        var perTick = difference / duration * 10;
        this.scrollToTimerCache = setTimeout(function() {
            if (!isNaN(parseInt(perTick, 10))) {
                window.scrollTo(0, $(window).scrollTop() + perTick);
                smoothScroll(el, to, duration - 10);
            }
        }.bind(this), 10);
    }

    function enhance() {

        var anchor = $('.scrollTo'),
            section = $('section')[0];


        //smooth scrolling on anchor clicks
        anchor.on('click', function(e) {

            e.preventDefault();
            var speed = ($($(e.currentTarget).attr('href')).offset().top * 0.25);
            // alert(speed);
            smoothScroll($(window), $($(e.currentTarget).attr('href')).offset().top, speed);
        });

        //set the first section's min-height to be the window height
        if ($(section).height() < $(window).height()) {

            var d = document.documentElement.style;
            if (('flexWrap' in d) || ('WebkitFlexWrap' in d) || ('msFlexWrap' in d)) {
                // alert('ok');
                $(section).css('height', $(window).height());
                $(section).addClass('flex-center');
                $(section).find('.nav-list').addClass('padding-0');
                //$('section .nav-list').first().addClass('padding-0');

            }

        }

    }

    function removeloading() {
        $('.loading').fadeOut(200);
    }

    return {
        init: function () {
            setTimeout(removeloading, 1000);
            //removeloading();
            enhance();
        }

    };

}();





$(function() {
    GD.general.init();
    GD.contactForm.init();

});









