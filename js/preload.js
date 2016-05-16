$(function() {
    // Prepare our loading screen
    $("body").prepend('<div id="preload"></div>');
    $("#preload").html('<div class="preDiv"></div>').css("height", responsiveHeight()).show();

    // Add objects that will be animated
    $(".preDiv").html('<div class="prelogo">' + svg[8] + '</div>')
        .append('<div class="preSection"><div class="preBar"></div><h2>Anthony Mejia</h2></div>');
});

$(document).ready(function() {
    // Animations for Preloading Screen

    // Animate logo with fade
    $("#preload svg").velocity({
        opacity: 1
    }, {
        duration: 800,
        delay: preTime - 2600
    });

    $("#preload .amlogo").attr("filter", "url(#shadow)")
        .velocity({
            opacity: 1
        }, {
            duration: 800,
            delay: preTime - 2200
        });

    // Animate name in
    $(".preDiv h2").velocity(
        "transition.slideDownIn", {
            duration: 1400,
            delay: preTime - 1700, //1700
            complete: function() {
                $("body").scrollTop(0);
                scrollOnceArrow = false;
                scrollOncePie = false;
                scrollOnceBar = false;
            }
        });

    // Animate loading bar in
    $(".preBar").velocity(
            "transition.expandIn", {
                duration: 700,
                delay: preTime - 300 //2700
            })
        .velocity({
            width: "86%"
        }, {
            duration: 1200,
            delay: 100
        });

    $("#preload").velocity({
        height: 0,
        opacity: 0.85
    }, {
        delay: preTime + 2300, // 6800, 
        duration: 900,
        easing: "ease-in-out"
    });

    $(".preDiv").velocity({
        scale: 0.3,
        opacity: 0.3,
    }, {
        delay: preTime + 2700, //6500,
        duration: 600,
        easing: "swing",
        complete: function() {
            $("#preload").remove();
        }
    });

    $(".prelogo").velocity({
        translateY: -(($("#preload svg").height())) + "px"
    }, {
        delay: preTime + 2560, //6500,
        duration: 600,
        easing: "easeInQuart"
    });

    if (windWidth < 800) {

        $(".buns").velocity(
            "transition.slideRightIn", {
                delay: preTime + 3900, // 9800
                duration: 700
            });

        $(".navicon svg").velocity(
            "transition.slideLeftIn", {
                delay: preTime + 3650,
                duration: 800,
                easing: "ease-in-out"
            });
    } else {
        $(".logoName").velocity(
            "transition.slideUpIn", {
                delay: preTime + 3650,
                duration: 1050
            });
    }
    $("li.topbar").velocity(
        "transition.fadeIn", {
            delay: preTime + 4400,
            duration: 700,
            complete: function() {

                $nav.append("<li id='navline'></li>");
                var $navLine = $("#navline");
                $navLine.css("left", $(".topbar").first().position().left)
                $(".topbar a").click(function moveLine() {
                    autoScroll = true;
                    tBar = $(this);
                    leftPos = tBar.parent().position().left;
                    barWidth = tBar.parent().width();
                    $navLine.stop().velocity({
                        left: leftPos,
                        width: barWidth
                    }, {
                        complete: function() {
                            autoScroll = false;
                        }
                    });
                    tBar.parent().addClass("curTab").siblings().removeClass("curTab");
                });
            }
        });

    $("#bigJoe p").velocity(
        "transition.slideDownIn", {
            delay: preTime + 5000, //11000
            duration: 1400
        });

    $(".arrowhome").velocity(
        "transition.slideDownBigIn", {
            delay: preTime + 5250, //11000
            duration: 1900,
            complete: function() {
                $("body").css("overflow", "visible");              
                preFinish = true; 
                ga("send", 'event', 'time', 'loading', "Preloading complete");              
            }
        });
});
