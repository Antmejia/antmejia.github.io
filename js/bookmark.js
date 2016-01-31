$(document).ready(function() {
    $("a[href*=#]").bind("click", function(e) {
        e.preventDefault();
        e.stopPropagation();
        var target = $(this).attr("href");
        $(target).velocity("scroll", {
            duration: 360,
            offset: -55,
            easing: "ease-in-out"
        });
    });
});
