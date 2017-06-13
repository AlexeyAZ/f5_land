$(function () {

    var body = $("body");
    var thanksLocation = "thanks.html";

    if ($('input[type="range"]').length) {
        $('input[type="range"]').rangeslider({
            polyfill: false
        });
    };

    webshim.setOptions('forms', {
        lazyCustomMessages: true,
        replaceValidationUI: true
    });
    webshim.polyfill('forms');

    function phoneLink() {
        var md = new MobileDetect(window.navigator.userAgent);
        var phoneLink = $("[data-phone]");

        if (md.mobile()) {
            phoneLink.attr("href", "tel:" + $(".phone-link").data("phone"));
            phoneLink.removeClass("js-small-btn");
        } else {
            phoneLink.attr("href", "");
            phoneLink.addClass("js-small-btn");
        }
    };
    phoneLink();

    // form handler
    var name;

    $("input[name=phone]").inputmask({
        "mask": "+9(999)999-9999",
        greedy: false,
        clearIncomplete: true
    });

    body.on("click", ".js-small-btn", function (e) {
        e.preventDefault();

        if (!$(".thanks").length) {
            $("html").addClass("form-open");
            $(".form-wrap_small").addClass("form-wrap_open");
        }
    });

    body.on("click", function (e) {
        var self = $(e.target);

        if (self.hasClass("form-wrap_small") || self.hasClass("form__close")) {
            $("html").removeClass("form-open");
            $(".form-wrap").removeClass("form-wrap_open");
        } else if (self.hasClass("form-wrap_big")) {
            location = thanksLocation;
        }
    });

    if (typeof wl != "undefined") {
        wl.callbacks.onFormSubmit = function ($form, res) {
            if ($form.data('next')) {

                if (res.status == 200) {
                    smallFormHandler($form);
                } else {
                    wl.callbacks.def.onFormSubmit($form, res);
                }
            } else {
                location = thanksLocation;
            }
        };
    } else {
        $("#smallForm, #bottomForm").submit(function (e) {
            e.preventDefault();
            var self = $(this);

            smallFormHandler(self);
        });

        $("#bigForm").submit(function (e) {
            e.preventDefault();

            var self = $(this);
            var formData = self.serialize();

            $.ajax({
                type: "POST",
                url: "php/sendpresent.php",
                data: formData,
                success: function (data) {
                    location = thanksLocation;
                }
            });
        });
    }

    if ($("#thanksName").length) {
        $("#thanksName").text(localStorage.getItem("landclientname"));
    };

    function smallFormHandler(form) {

        $(".form-wrap_open").removeClass("form-wrap_open");
        $(".form-wrap_big").addClass("form-wrap_open");
        $("html").addClass("form-open");

        var selfName = form.find("input[name=name]");
        var selfPhone = form.find("input[name=phone]");
        var selfEmail = form.find("input[name=email]");
        var formData = form.serialize();

        name = selfName.val();

        $("[name=name1]").val(selfName.val());
        $("[name=phone1]").val(selfPhone.val());
        $("[name=email1]").val(selfEmail.val());

        $.ajax({
            type: "POST",
            url: "php/send.php",
            data: formData
        });

        if (name) {
            localStorage.setItem("landclientname", name + ", наши");
        } else {
            localStorage.setItem("landclientname", "Наши");
        }
    }
});
//# sourceMappingURL=app.js.map