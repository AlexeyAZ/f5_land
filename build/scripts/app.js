$(function () {

    var body = $("body");
    var thanksLocation = "thanks.html";

    // if ($('input[type="range"]').length) {
    //     $('input[type="range"]').rangeslider({
    //         polyfill: false,
    //     });
    // };

    createSliders();
    function createSliders() {
        var sliders = document.querySelectorAll(".sec3__slider");
        var packageSlider = "packagedSlider";
        var salesSlider = "salesSlider";
        var timeSlider = "timeSlider";

        for (var i = 0; i < sliders.length; i++) {
            var sliderOptions = {};
            var item = sliders[i];

            if (item.id === packageSlider) {

                sliderOptions = {
                    start: [0],
                    range: {
                        'min': [0],
                        'max': [5]
                    }
                };
            } else if (item.id === salesSlider) {

                sliderOptions = {
                    start: [0],
                    range: {
                        'min': [0],
                        'max': [5]
                    }
                };
            } else if (item.id === timeSlider) {

                sliderOptions = {
                    start: [1],
                    range: {
                        'min': [1],
                        'max': [12]
                    }
                };
            }

            noUiSlider.create(item, {
                step: 1,
                connect: [true, false],
                start: sliderOptions.start,
                range: sliderOptions.range,
                pips: {
                    mode: 'steps',
                    filter: function () {
                        return 1;
                    },
                    density: 100
                }
            });
        };

        for (var i = 0; i < sliders.length; i++) {
            sliders[i].noUiSlider.on('update', setNumbers);
        }

        function setNumbers() {
            var price = document.getElementById("price");
            var result;

            var pS = document.getElementById(packageSlider);
            var sS = document.getElementById(salesSlider);
            var tS = document.getElementById(timeSlider);

            var psValue = +pS.noUiSlider.get();
            var ssValue = +sS.noUiSlider.get();
            var tsValue = +tS.noUiSlider.get();

            result = (psValue + ssValue + tsValue) * 5500;
            price.innerText = String(result).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
        }
    };

    function sec4ListItemsAnimate() {
        var items = document.querySelectorAll(".sec4__list-item");
        var images = document.querySelectorAll(".sec4__doorimg");
        var itemsArr = [];
        var imgsArr = [];

        for (var i = 0; i < items.length; i++) {
            itemsArr.push(items[i]);
        }

        for (var j = 0; j < images.length; j++) {
            imgsArr.push(images[j]);
        }

        function setActiveItemSec4(item, img) {
            item = item || items[0];
            img = img || images[0];

            item.classList.add("sec4__list-item_active");
            img.classList.add("sec4__doorimg_active");
        };
        setActiveItemSec4();

        function actionsItemSec4() {

            for (var i = 0; i < items.length; i++) {
                items[i].addEventListener("mouseenter", sec4MouseEnter);
                items[i].addEventListener("click", sec4MouseClick);
            }
        }
        actionsItemSec4();

        function sec4MouseEnter() {
            var itemIndex = itemsArr.indexOf(this);

            removeClass(itemsArr, "sec4__list-item_active");
            removeClass(imgsArr, "sec4__doorimg_active");

            setActiveItemSec4(this, images[itemIndex]);
        }

        function sec4MouseClick() {
            var itemIndex = itemsArr.indexOf(this);
            var itemBody = this.querySelector(".sec4__list-body");
            var itemBodyText = this.querySelector(".sec4__list-body-text");
            var openCls = "sec4__list-item_open";
            var itemBodyTextHeight = itemBodyText.clientHeight;

            if (this.classList.contains(openCls)) {
                this.classList.remove(openCls);
                itemBody.style.height = 0;
            } else {
                itemsArr.forEach(function (item, i) {

                    if (item.classList.contains(openCls)) {
                        item.classList.remove(openCls);
                        item.querySelector(".sec4__list-body").style.height = 0;
                    }
                });
                itemBody.style.height = itemBodyTextHeight + "px";
                this.classList.add(openCls);
            }
        };

        function removeClass(arr, cls) {

            arr.forEach(function (item, i, ar) {

                if (item.classList.contains(cls)) {
                    item.classList.remove(cls);
                }
            });
        }
    };
    sec4ListItemsAnimate();

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
        clearIncompvare: true
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
        $("#smallForm, #bottomForm, #sec5Form").submit(function (e) {
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
