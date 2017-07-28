$(function () {

    var HTML = document.documentElement;
    var body = $("body");
    var thanksLocation = "thanks.html";
    var wlLand = false;

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
                    start: [1],
                    range: {
                        'min': [1],
                        'max': [5]
                    }
                };
            } else if (item.id === salesSlider) {

                sliderOptions = {
                    start: [1],
                    range: {
                        'min': [1],
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

        function delSpaces(str) {
            str = str.replace(/\s/g, '');
            return parseInt(str);
        }

        function formatNumber(str) {
            str = String(str);
            return str.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
        }

        function setNumbers() {
            var proceeds = document.getElementById("proceeds");
            var middleCheck = document.getElementById("middlecheck");
            var middleCheckSale = document.getElementById("middlechecksale");
            var tax = document.getElementById("tax");
            var profit = document.getElementById("profit");
            var salaryFond = document.getElementById("salaryfond");
            var orgCost = document.getElementById("orgcost");
            var monthStr = document.getElementById("monthStr");
            var monthNumber = document.getElementById("monthNumber");

            var proceedsVal;
            var taxVal;
            var profitVal;

            var pS = document.getElementById(packageSlider);
            var sS = document.getElementById(salesSlider);
            var tS = document.getElementById(timeSlider);

            var psValue = +pS.noUiSlider.get();
            var ssValue = +sS.noUiSlider.get();
            var tsValue = +tS.noUiSlider.get();

            proceedsVal = psValue * +delSpaces(middleCheck.innerText) * 0.5 + ssValue * +delSpaces(middleCheckSale.innerText) * 0.4;
            taxVal = proceedsVal * 0.06;
            profitVal = (proceedsVal - taxVal - +delSpaces(salaryFond.innerText) - +delSpaces(orgCost.innerText)) * tsValue;

            proceeds.innerText = formatNumber(proceedsVal);
            tax.innerText = formatNumber(taxVal);
            profit.innerText = formatNumber(profitVal);
            monthNumber.innerText = tsValue;

            if (tsValue === 1) {
                monthStr.innerText = 'месяц';
            } else if (tsValue == 2 || tsValue == 3 || tsValue == 4) {
                monthStr.innerText = 'месяца';
            } else {
                monthStr.innerText = 'месяцев';
            }
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

    if (document.querySelector(".sec1")) {
        sec4ListItemsAnimate();
    }

    function togglePartnersVisibility() {
        var partnersBtn = document.getElementById("showPartners");
        var partnersHide = document.getElementById("partnersHide");
        var partnersItems = partnersHide.querySelectorAll(".partners__item");
        var partnersHideHeight = 0;
        var partnersBtnStatus = false;
        var partnersBtntext = {
            open: "Читать все отзывы",
            close: "Скрыть"
        };

        for (var i = 0; i < partnersItems.length; i++) {
            var itemHeight = partnersItems[i].offsetHeight;
            var styles = window.getComputedStyle(partnersItems[i]);
            var itemMargin = parseFloat(styles['marginBottom']);
            partnersHideHeight += itemHeight + itemMargin;
        }

        partnersHide.addEventListener("transitionend", partnersTransitionEnd);
        partnersBtn.addEventListener("click", partnersBtnClick);

        function partnersBtnClick(e) {
            e.preventDefault();

            if (partnersHide.classList.contains("partners__hide_open")) {
                partnersHide.classList.remove("partners__hide_open");
                partnersHide.style.height = 0;
                partnersBtnStatus = false;
                partnersBtn.innerText = partnersBtntext.open;
            } else {
                partnersHide.classList.add("partners__hide_open");
                partnersHide.style.height = partnersHideHeight + "px";
                partnersBtnStatus = true;
                partnersBtn.innerText = partnersBtntext.close;
            }
        };

        function partnersTransitionEnd() {

            if (partnersBtnStatus) {
                partnersHide.style.height = "auto";
            }
        }
    }

    if (document.querySelector(".sec1")) {
        togglePartnersVisibility();
    }

    // function linesAnimate() {

    //     function initialize(item) {
    //         window.addEventListener("scroll", scrollHandler);

    //         function scrollHandler() {
    //             var rowItems = document.querySelectorAll(item);
    //             console.log(rowItems)
    //         }
    //     }

    //     return {
    //         create: initialize
    //     };
    // }


    // linesAnimate().create(".sec6__block-row");


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

        if (self.hasClass("form-wrap") || self.hasClass("form__close")) {
            $("html").removeClass("form-open");
            $(".form-wrap").removeClass("form-wrap_open");
        }
        // else if(self.hasClass("form-wrap_big")) {
        //     location = thanksLocation;
        // }
    });

    if (typeof wl != "undefined") {
        wlLand = true;

        wl.callbacks.onFormSubmit = function ($form, res) {
            if ($form.data('next')) {

                if (res.status == 200) {
                    smallFormHandler($form);
                } else {
                    wl.callbacks.def.onFormSubmit($form, res);
                }
            } else {

                if ($form.closest(".form-wrap").attr("id") === "giftForm") {
                    giftFormHandler();
                } else {
                    bigFormHandler($form);
                }
            }
        };
    } else {
        wlLand = false;

        $("#smallForm, #bottomForm, #sec5Form, #sec7Form").submit(function (e) {
            e.preventDefault();
            var self = $(this);

            smallFormHandler(self);
        });

        $("#bigForm").submit(function (e) {
            e.preventDefault();
            var self = $(this);

            bigFormHandler(self);
        });
    }

    function formAction() {
        var smallFormWrap = document.querySelector(".form-wrap_small");
        var bigFormWrap = document.querySelector(".form-wrap_big");
        var giftFormWrap = document.querySelector(".form-wrap_gift");

        return {

            openSmallForm: function () {
                document.documentElement.classList.add("form-open");
                smallFormWrap.classList.add("form-wrap_open");
            },

            openBigForm: function () {
                document.documentElement.classList.add("form-open");
                bigFormWrap.classList.add("form-wrap_open");
            },

            openGiftForm: function () {
                document.documentElement.classList.add("form-open");
                giftFormWrap.classList.add("form-wrap_open");
            },

            closeSmallForm: function () {
                document.documentElement.classList.remove("form-open");
                smallFormWrap.classList.remove("form-wrap_open");
            },

            closeBigForm: function () {
                document.documentElement.classList.remove("form-open");
                bigFormWrap.classList.remove("form-wrap_open");
            },

            closeGiftForm: function () {
                document.documentElement.classList.remove("form-open");
                giftFormWrap.classList.remove("form-wrap_open");
            }
        };
    }

    function smallFormHandler(form) {

        var selfName = form.find("input[name=name]");
        var selfPhone = form.find("input[name=phone]");
        var selfEmail = form.find("input[name=email]");
        var formData = form.serialize();

        var landUserInfo = {
            "name": selfName.val(),
            "phone": selfPhone.val(),
            "email": selfEmail.val()
        };

        localStorage.setItem("landUserInfo", JSON.stringify(landUserInfo));

        name = selfName.val();

        if (wlLand === false) {

            $.ajax({
                type: "POST",
                url: "php/send.php",
                data: formData,
                success: function () {
                    location = thanksLocation;
                }
            });
        } else {
            location = thanksLocation;
        }

        if (name) {
            localStorage.setItem("landclientname", name + ", наши");
        } else {
            localStorage.setItem("landclientname", "Наши");
        }
    }

    function bigFormHandler(form) {
        var userInfo;
        var formData;

        if (localStorage.getItem("landUserInfo")) {
            userInfo = JSON.parse(localStorage.getItem("landUserInfo"));
        }

        $("[name=name1]").val(userInfo.name);
        $("[name=phone1]").val(userInfo.phone);
        $("[name=email1]").val(userInfo.email);

        formData = form.serialize();

        if (wlLand === false) {

            $.ajax({
                type: "POST",
                url: "php/sendpresent.php",
                data: formData,
                success: function (data) {
                    formAction().closeBigForm();
                }
            });
        }
    }

    function giftFormHandler() {
        formAction().closeGiftForm();
    }

    function thanksPageHandler() {

        if (isThanksPage()) {
            $("#thanksName").text(localStorage.getItem("landclientname"));
            formAction().openBigForm();
        } else {
            formAction().openGiftForm();
        }

        function isThanksPage() {

            if (document.querySelector(".thanks")) {
                return true;
            } else {
                return false;
            }
        }
    };
    thanksPageHandler();
});
//# sourceMappingURL=app.js.map
