$(document).on('click', 'a[href^="#"]', function (event) {
    event.preventDefault();

    $('html, body').animate({
        scrollTop: $($.attr(this, 'href')).offset().top - 65
    }, 500);
});

if ($(".scroll-spy").length > 0) {
    var spy = new Gumshoe('.scroll-spy a', {
        navClass: 'active',
        contentClass: 'active',
        nested: true,
        nestedClass: 'active',
        offset: 65,
    });
}

//==== Show Hide Clear Button -------------------
var boxes = $("input.igx-checkbox");

boxes.on("change", function () {
    $(".filters--option .clear").toggleClass("show", boxes.is(":checked"));
});

$(".filters--option .clear").on("click", function () {
    $(this).toggleClass("show");
});

//==== Read More --------------------------------
// const readMoreButton = $(".read-more");

// readMoreButton.on("click", function () {
//     $(this)
//         .parents(".search-results__item")
//         .find(".search-results__item_extract")
//         .toggleClass("active");

//     $(this).text(function (i, text) {
//         return text === "Show More" ? "Show Less" : "Show More";
//     });
// });

//==== Mobile Filters Toggle --------------------
const mobFilterToggle = $(".mobile-filters-trigger");

mobFilterToggle.on("click", function () {
    $(this).text(function (i, text) {
        return text === "Open Filters" ? "Close Filters" : "Open Filters";
    });
});

mobFilterToggle.on("click", function () {
    $(".filters-wrapper").slideToggle();
});

$(window).on("load resize", function () {
    if ($(window).width() > 1200) {
        $(".filters-wrapper").css("display", "block");
    } else {
        $(".filters-wrapper").css("display", "none");
    }
});

//==== Nav --------------------------------------
const sideNavInnerUL = $(".left-col__nav ul ul");
const sideNavToggle = $(".toggle-ul");

sideNavInnerUL.hide();

sideNavToggle.on("click", function () {
    $(this).toggleClass("active").next("ul").slideToggle();
    $(this).parent("li").toggleClass("active");
});

//==== Sidebar Toggle ---------------------------
$(".menu-toggle").on("click", function () {
    $(this).toggleClass("active");
    $(".left-col").toggleClass("active");
    sideNavToggle.removeClass("active").next("ul").slideUp();
    sideNavToggle.parent("li").removeClass("active");
});

//==== Filters ----------------------------------
const filterToggle = $(".filters--option button:not(.clear)");
const filterDropdown = $(".filters--dropdown");

$(window).on("load", function () {
    if ($(window).width() > 1200) {
        $(document).on("click", function (e) {
            if (
                $(e.target).is(
                    ".filters--option button, .filters--dropdown, .form-style-element *"
                ) === false
            ) {
                filterToggle
                    .removeClass("active")
                    .next(".filters--dropdown")
                    .removeClass("active");
            }
        });
    }
});

filterToggle.on("click", function () {
    filterToggle
        .not(this)
        .removeClass("active")
        .next(".filters--dropdown")
        .removeClass("active");
    $(this)
        .toggleClass("active")
        .next(".filters--dropdown")
        .toggleClass("active");
});

$(".filters--dropdown :checkbox").click(function () {
    if ($("input:checkbox:checked").length) {
        $(".filters-list__item").hide();
        $("input:checkbox:checked").each(function () {
            $(
                ".filters-list__item[data-" +
                    $(this).prop("name") +
                    '*="' +
                    $(this).prop("id") +
                    '"]'
            ).show();
            $(".filters-list__dropdown").hide();
            $(".filters-list__item.active").removeClass("active");
        });
    } else {
        $(".filters-list__item").show();
    }
});

$(".clear").on("click", function () {
    $(".form-style-element input").prop("checked", false);
    $(".filters-list__item").show();
});

const filterAccordionToggle = $(".filters-list__item");
const filterAccordionToggleActive = $(".filters-list__item.active");
const filterAccordionToggleInner = $(".filters-list__item--inner");

filterAccordionToggle.on("click", function () {
    filterAccordionToggle
        .not(this)
        .removeClass("active")
        .next(".filters-list__dropdown")
        .slideUp();
    $(this).toggleClass("active").next(".filters-list__dropdown").slideToggle();
});

filterAccordionToggleInner.on("click", function () {
    filterAccordionToggleInner
        .not(this)
        .removeClass("active")
        .next(".filters-list__dropdown--inner")
        .slideUp();
    $(this)
        .toggleClass("active")
        .next(".filters-list__dropdown--inner")
        .slideToggle();
});

$(".filters-list__item").on("click", function () {
    $(".filters-list__item--inner")
        .removeClass("active")
        .next(".filters-list__dropdown--inner")
        .slideUp();
});

//==== Modals -----------------------------------
$(".modal-trigger").on("click", function () {
    $("body").addClass("fixed");
    var myEm = $(this).attr("data-modal");
    $(".igx-modal[data-modal = " + myEm + "]").addClass("active");
});

$(".igx-fade, .igx-modal__header_close").on("click", function () {
    $("body").removeClass("fixed");
    $(".igx-modal").removeClass("active");
});

//==== Copy -------------------------------------
//var clipboard = new ClipboardJS('button.copy-btn')

//clipboard.on('success', function(e) {
//    let oldtext = e.trigger.innerHTML
//    e.trigger.textContent = 'Copied!'
//    setTimeout(() => e.trigger.innerHTML = oldtext, 3000)
//    e.clearSelection();
//});

//==== Truncate ---------------------------------
var ogText = $('.search-results__item_extract');

ogText.each(function() {
    var t = $(this).html(),
        c = $(this).text(),
    copiedText = t.slice(0,300);

    if (c.length < 300) {
        $(this).next(".search-results__item_tags").find(".read-more").hide();
        return;
    };

    $(this).wrapInner('<div class="original"></div>');
    $(this).append('<div class="intro">' + copiedText + '<span>... </span></div>');
    $(this).find('.original').hide();
});

$('.read-more').click(function() {
    $(this).parents(".search-results__item").find(".intro").toggle().prev('.original').toggle();
    $(this).text(function (i, text) {
        return text === "Show More" ? "Show Less" : "Show More";
    });
});