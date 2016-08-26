'use strict';

// Load variables

var pT = "img/";
var img = ["city-45.jpg", "arrowdown.png", "profile.jpg", "favicon.jpg", "lumn-logo.jpg", "lbm-logo.jpg", "eshalsoft-logo.jpg", "eqo-logo.jpg"];
var windHeight = $(window).height();
var windWidth = $(window).width();
var scrollOnceArrow = false;
var scrollOnceChart = false;
var scrollOnceInfo = false;
var preFinish = false;
var inProgress = false;
var autoScroll = false;
var canvasWidth = 0;
var navWidth = 0;
var preTime = 3200;
var $sections = $('.main-section');
var $project, $prodes, tBar, leftPos, barWidth, $nav = $(".navbar");

var myBio = "Born and raised in the Empire City, I'm currently pursuing a career as a Front-End Web Developer. I've always had a passion for turning ideas into something that is functional, yet engaging; creating interactive and appealing web experiences. As I continue to improve my coding and design skills, my showcase will continue to grow while learning from every project I take on. Self taught and self motivated, I only have one opponent: Internet Explorer.</p> <p class=\"mybio\">In my spare time, you can find me shooting hoops, watching football, playing video games, and spending quality time with my family.";
var rank = ["Expert", "Advanced", "Average", "Beginner"];

var social = {
    gplus: {
        platform: "Google-Plus",
        color: "FF4D36",
        link: "https://plus.google.com/11099305054815726998",
        iconClass: 'li-google-plus'
    },

    linkedin: {
        platform: "LinkedIn",
        color: "0A76C8",
        link: "http://www.linkedin.com/in/antmejia",
        iconClass: 'li-linkedin'
    },

    twitter: {
        platform: "Twitter",
        color: "00A0FF",
        link: "http://www.twitter.com/_antmejia",
        iconClass: 'li-twitter'
    },

    github: {
        platform: "Github",
        color: "5FCF80",
        link: "https://github.com/antmejia",
        iconClass: 'li-github'
    }
};

var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

function responsiveHeight() {
    if (isMobile.any()) {
        return screen.height;
    } else {
        return $(window).height();
    }
}
// Function to detect if an element is inside the viewport
$.fn.isOnScreen = function() {
    var viewport = {};
    viewport.top = $(window).scrollTop();
    viewport.bottom = viewport.top + $(window).height();
    var bounds = {};
    bounds.top = this.offset().top;
    bounds.bottom = bounds.top + this.outerHeight();
    return ((bounds.top <= viewport.bottom) && (bounds.bottom >= viewport.top));
};

// Function to detect if an entire element is inside the viewport
$.fn.isOnScreenFull = function() {
    var viewport = {};
    viewport.top = $(window).scrollTop();
    viewport.bottom = viewport.top + $(window).height();
    var bounds = {};
    bounds.top = this.offset().top;
    bounds.bottom = bounds.top + this.outerHeight();
    return ((bounds.bottom <= viewport.bottom) && (bounds.bottom >= viewport.top));
};

// Add Base Layout
$(function() {

    // Reset values for body and show navbar
    $(".navbar").show();
    $("body").css({
        "position": "relative",
        "overflow-x": "hidden"
    });
    $(".main-section").css("min-height", windHeight + $(".navbar-default").height());
    // Add main images
    $(".patio").attr("src", pT + img[0]);
    $(".arrowhome").attr("src", pT + img[1]);

    // Add logo to navbar
    $(".navbar-brand").append('<div class="navicon">' + svg[8] + '</div');
    $(".navicon svg")[0].setAttribute("preserveAspectRatio", "xMaxYMax meet");

    // Format main image to fit window
    $("#bigJoe").show().height(responsiveHeight());

    // Adjust text and set max font size
    $("#bigJoe p").css("font-size", (windWidth * 0.08) + "px");
    if (parseInt($("#bigJoe p").css("font-size"), 10) >= 60) {
        $("#bigJoe p").css("font-size", "60px");
    }
});

// Adjust elements on window resize
$(window).resize(function() {
    windWidth = $(window).width();
    windHeight = responsiveHeight();
    $("#bigJoe").height(windHeight + 10);
    $(".main-section").css("min-height", windHeight + $(".navbar-default").height());
    $("#promodal").height(windHeight);
    if (windWidth < 800 && preFinish === true) {
        $(".buns").show();
    }

    if (windWidth > 800) {
        $("#navline").css("left", ($(".curTab").position().left) + "px");
        $(".buns").hide();
    }

    if (parseInt($("#bigJoe p").css("font-size"), 10) >= 60) {
        $("#bigJoe p").css("font-size", "60px");
    } else {
        $("#bigJoe p").css("font-size", (windWidth * 0.08) + "px");
    }
});

// Hamburger Animation

$(function() {
    $(".buns").click(function() {
        $("#hamburger").toggleClass("open");
    });

    // Collapse mobile navbar when a link is clicked
    $('.navbar-collapse a').click(function() {
        $(".navbar-collapse").collapse("hide");
        $("#hamburger").toggleClass("open");
    });

    // Scroll transition for navbar
    $(window).scroll(function() {

        // check if window scroll for more than the height of our main image minus the size of the navbar.

        if ($(this).scrollTop() > $("#bigJoe").height() - $(".navbar-default").height()) {
            $(".navbar").addClass("opaque").removeClass("trans");
        } else {
            $(".navbar").addClass("trans").removeClass("opaque");
            if (windWidth > 800) {
                navWidth = (($(window).scrollTop() / ($(".main-section").first().offset().top / 140)));
                $("#navline").css("width", navWidth);
            }
        }

        if (autoScroll === false) {
            $('.main-section').each(function() {
                var id = $(this).attr("id");
                var distance = $(this).offset().top - $(window).scrollTop();
                var navLink = $(".topbar a").filter("[href='#" + id + "']");
                if (distance >= 25 && distance <= 85) {
                    tBar = navLink;
                    leftPos = tBar.parent().position().left;
                    barWidth = tBar.parent().width();
                    if (windWidth > 800) {
                        $("#navline").velocity("stop", true).velocity({
                            left: leftPos,
                            width: barWidth
                        });
                    } else {
                        $("#navline").css({
                            "left": leftPos,
                            "width": barWidth
                        });
                    }
                    tBar.parent().addClass("curTab").siblings().removeClass("curTab");
                }
            });
        }
    });
});

$(function() {
    // General Sections
    $(".main-window div").css("min-height", windHeight + $(".navbar-default").height());

    // About Me Section
    $("#aboutme").css("margin-top", $(".navbar").height())
        .html('<h2 class="sectiontitle widescreen">About Me</h2>')
        .append('<div id="aboutface"></div>')
        .append('<div id="aboutsum"></div>');

    $("#aboutface").append('<img class="proPic" alt="Profile Picture" src="' + (pT + img[2]) + '">')
        .append('<h3> Anthony Mejia</h3><h4> New York, NY</h4><hr>');

    for (var key in social) {
        var media = social[key];
        $("#aboutface").append('<a href="' + media.link + '" target="_blank">' + '<i class="social-icon ' + media.iconClass + '"></i></a>');
    }
    if (!Modernizr.backgroundcliptext) {
        $("#aboutface .social-icon").addClass("noclip");
    }

    $(".social-icon").parent().hover(function() {
        if (!$(this).children(".social-icon").hasClass("noclip")) {
            $(this).append('<i class="' + $(this).children(".social-icon").attr("class") + ' gradient icopy"></i>');
            $(this).find(".icopy").velocity({
                opacity: 1,
            }, {
                duration: 300
            });
        } else {
            $(this).children(".social-icon").velocity({
                color: "#418ED5"
            }, {
                duration: 300
            });
        }
    }, function() {
        if ($(this).find(".icopy").length) {
            $(this).find(".icopy").velocity({
                opacity: 0,
            }, {
                duration: 500
            });
        } else {
            $(this).children(".social-icon").velocity({
                color: "#1C5A95"
            }, {
                duration: 500
            });
        }
    });

    $("#aboutsum").append('<h2 class="sectiontitle">About Me</h2>')
        .append('<p class="mybio">' + myBio + '</p>');

    // My Skills Section
    $("#skills").html('<h2 class="sectiontitle"> My Skills</h2>')
        .append('<div id="skillsChart"></div>')
        .append('<div id="skillsum"></div>');
    $("#skillsChart").append('<canvas id="skillsDonut" class="chart" width="auto" height="auto"></canvas>')
        .append('<h3> Technical Skills</h3>')
        .append('<canvas id="skillsBar" class="chart" width="auto" height="310px"></canvas>');
    if (windWidth < 800) {
        canvasWidth = windWidth - (windWidth * 0.1);
    } else {
        canvasWidth = windWidth - (windWidth * 0.7);
    }
    $("canvas").css("max-width", 300 + (windWidth * 0.05) + "px");
});

// Data for donut chart
var donutData = {
    labels: [
        "Attention to Detail",
        "Knitting",
        "Creativity",
        "Adaptability",
        "Cooking"
    ],
    datasets: [{
        data: [300, 100, 800, 500, 200],
        backgroundColor: [
            "#16a085",
            "#FDB45C",
            "#e74c3c",
            "#2980b9",
            "#27ae60"
        ],
        hoverBackgroundColor: [
            "#1abc9c",
            "#FFC870",
            "#F66454",
            "#3498db",
            "#2ecc71"
        ]
    }]
};

// Data for bar chart
var barData = {
    labels: ['HTML5', 'CSS3', 'JavaScript', 'JQuery', 'Adobe CS6', 'AngularJS', 'Ruby'],
    datasets: [{
        label: 'Technical Skills',
        data: [8, 6, 4, 5, 9, 3.25, 4.5],
        backgroundColor: "#34495e",
        borderWidth: 5,
        hoverBackgroundColor: "#4E6F8E"
    }]
};

// This function will determine if the canvas is on screen and if so, draw the chart and animate it. The scrollOnce function makes sure this fires only once
$(window).scroll(function() {

    if (($("#skillsDonut").isOnScreen() === true || $("#skillsBar").isOnScreen() === true) && scrollOnceChart === false && preFinish === true) {
        scrollOnceChart = true;
        var dlay = 1200;
        var skillsDonut = new Chart($("#skillsDonut").get(0).getContext("2d"), {
            type: 'doughnut',
            data: donutData,
            options: {
                cutoutPercentage: 80,
                responsiveAnimationDuration: dlay,
                animation: {
                    duration: dlay,
                    easing: "easeInOutQuint",
                },
                tooltips: {
                    callbacks: {
                        title: function() {
                            return '';
                        },
                        label: function(tooltipItem, data) {
                            return data.labels[tooltipItem.index];
                        }
                    }
                },
                elements: {
                    arc: {
                        borderWidth: 0
                    }
                },
                legend: {
                    display: false
                }
            }
        });

        setTimeout(function() {
            var skillsBar = new Chart($("#skillsBar").get(0).getContext("2d"), {
                type: 'bar',
                data: barData,
                options: {
                    responsiveAnimationDuration: 1400,
                    animation: {
                        duration: 1400,
                        easing: "easeOutQuart",
                    },
                    tooltips: {
                        callbacks: {
                            beforeTitle: function(tooltipItem, data) {
                                return data.labels[tooltipItem.index];
                            },
                            label: function(tooltipItem, data) {
                                var rankIndex = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                                var ranking = "none";
                                if (rankIndex <= 3) {
                                    ranking = rank[3];
                                } else if (rankIndex <= 6) {
                                    ranking = rank[2];
                                } else if (rankIndex <= 8) {
                                    ranking = rank[1];
                                } else {
                                    ranking = rank[0];
                                }
                                return ranking;
                            }
                        }
                    },
                    legend: {
                        display: false
                    },
                    scales: {
                        xAxes: [{
                            ticks: {
                                padding: 5
                            },
                            gridLines: {
                                display: false
                            }
                        }],
                        yAxes: [{
                            ticks: {
                                beginAtZero: true,
                                display: false,
                                max: 10
                            },
                            gridLines: {
                                display: false
                            }
                        }]
                    }
                }

            });
        }, dlay);
    }
});

var breakdown = {
    web: {
        title: "From clean designs to pixel-perfect websites",
        summary: "With great design comes great responsibility.</p><p>Creating a beautiful mockup of your website is definitely helpful for mapping out your thoughts (definitely encouraged when working with a team), but means nothing if it can't be translated to a responsive, functional website. After all, your users are visiting your site for its <span class=\"itc\">content</span>, not its well-chosen colors. A clean, well-thought design is only one of many steps in successfully creating a beautifully unique experience for all users.",
        logo: svg[4]
    },

    mobile: {
        title: "Mobile First, Mobile Second",
        summary: "Now exceeding desktop computers in internet traffic, the mobile trend is making the desktop a thing of the past.</p><p>The mobile first approach is exactly as it sounds: designing for the smallest screens and working your way up. With Google <a href=\"https://support.google.com/adsense/answer/6196932?hl=en\">considering mobile friendliness</a> as a criteria when ranking web pages, implementing a responsive design has become a priority too expensive to ignore. So with that said, this makes mobile a close third as well.",
        logo: svg[5]
    },

    martini: {
        title: "Like a Martini, code is best served...",
        summary: "DRY(<span class=\"bold\">D</span>on't <span class=\"bold\">R</span>epeat <span class=\"bold\">Y</span>ourself).</p><p>The best way to avoid mistakes and typing errors is to type less code. With the use of best common practices, creating clean, efficient code is definitely a priority. Less code means less mistakes, less code to maintain, and much smoother experiences for your audience. That's a win, win, win, solution! ",
        logo: svg[6]
    },

    pong: {
        title: "Have fun while playing with code",
        summary: "Testing and getting comfortable in your projects is an obvious step most developers prefer to skip.</p><p>Not this guy. Playing around with your code and experiencing the site from the eyes of your audience helps you find any bugs and inconsistencies, gives you inspiration for upcoming features, and helps you evaluate your work. Besides, what's the point of making an awesome website if you're not going to use it? It's almost like fixing yourself an ice cream cone and just watching it melt. ",
        logo: svg[7]
    }
};

$(function() {
    for (var key in breakdown) {
        var section = breakdown[key];
        $("#skillsum").append('<div class="bkdown">' + section.logo + '<h4>' + section.title + '</h4><p>' + section.summary + '</p></div>');
    }

});
// Projects Section

var showcase = {
    lumn: {
        name: "lumn",
        title: "lumn Weather App (Under Construction)",
        description: "This is an angular web app that elegantly shows the current forecast and the days ahead of you. This app is still under construction.",
        link: "http://lumn.antmejia.com",
        thumb: pT + img[4]
    },
    eqo: {
        name: "eqo",
        title: "eqo - Simple Calculator",
        description: "This is a simple calculator which can perform all the basic functions. It has a clean, simple layout and looks good on any screen.",
        link: "http://eqo.antmejia.com",
        thumb: pT + img[7]
    },
    goLBM: {
        name: "goLBM",
        title: "Lincoln Business Machines",
        description: "LBM is a computer repair service company with a reputation for providing individualized attention to its clients, striving to be the most innovative technology company in the country.",
        link: "http://golbm.com",
        thumb: pT + img[5]
    },
    eshalsoft: {
        name: "eshalsoft",
        title: "EshalSoft Web Agency",
        description: "Eshalsoft is an Australian based web design/development agency which specializes in building custom web applications for customers looking to expand their web presence. ",
        link: "http://www.eshalsoft.com",
        thumb: pT + img[6]
    },
};

$(function() {
    $("#projects").html('<h2 class="sectiontitle whiteT"> My Projects</h2><div id="promodal"></div>');

    function showModal(obj) {
        var modal = $("#promodal");
        $("body").css("overflow", "hidden");
        modal.html('<div class="modal-close-button">Close</div><div class="modal-title"></div><div class="modal-body"></div>');
        $(".modal-title").append('<h4>' + obj.title + '</h4>');
        $(".modal-body").append('<img src="' + pT + obj.name + '-screen.jpg"><div class="modal-button"><a href="' + obj.link + '" target="_blank">View Website</a></div><div class="modal-wrapper"><p>' + obj.description + '</p></div>');
        // Animations
        modal.velocity(
            "transition.fadeIn", {
                begin: function() {
                    $("#promodal *").css("display", "none");
                    modal.height(responsiveHeight());
                },
                duration: 700,
                delay: 300
            });
        $("#promodal *").not(".modal-close-button").velocity(
            "transition.slideUpIn", {
                begin: function() {},
                delay: 600,
                display: "block",
                stagger: 50,
                duration: 500
            });
        $(".modal-close-button").velocity(
            "transition.fadeIn", {
                delay: 900,
                duration: 700
            });

        $(".modal-close-button").click(function() {
            $("#promodal *").not(".modal-close-button").velocity(
                "transition.slideDownOut", {
                    begin: function() {},
                    delay: 250,
                    display: "block",
                    backwards: true,
                    stagger: 50,
                    duration: 500
                });
            $(".modal-close-button").velocity(
                "transition.fadeOut", {
                    delay: 100,
                    duration: 700
                });
            modal.velocity(
                "transition.shrinkOut", {
                    delay: 750,
                    duration: 400,
                    complete: function() {
                        $("body").css("overflow", "initial");
                    }
                });
        });
    }
    for (var key in showcase) {
        var projects = showcase[key];
        $("#projects").append('<div class="projects"> <img src="' + projects.thumb + '">' + '<div class="prodes"><h4>' + projects.title + '</h4><p>' + projects.description + '</p></div></div>');
        $("#projects img:not(.thumb)").attr("alt", projects.name)
            .attr("class", "thumb");
    }
    // Animates in the project descriptions when clicked.
    $(".projects").click(function() {
        var name = $(this).children("img").attr("alt");
        showModal(showcase[name]);
    });

    // Resume Section
    $("#resume").html('<h2 class="sectiontitle"> My Resume</h2>')
        .append('<div class="reportcard-button">View Report Card</div>')
        .append('<div class="myResume"></div>');
});

var resume = {

    experience: [{
        company: "Smartling",
        title: "Language Resources Intern - Client Services",
        startDate: "Feb. 2015",
        endDate: "May 2015",
        highlights: [
            "Ensured the timely and successful delivery of our solutions according to client needs and objectives.",
            "Operated as the lead point of contact for any and all matters specific to my assigned accounts.",
            "Supported active accounts through attending conference calls and presentations.",
            "Built and maintained strong, long-lasting relationships while working with clients to ensure effective on-boarding, user adoption, retention and overall success.",
            "Helped the department manager with hands-on management of daily activities for current accounts.",
            "Collaborated in communicating clients' needs and feedback throughout the company."
        ]
    }, {
        company: "Smartling",
        title: "HR and Recruiting Intern",
        startDate: "Sep. 2014",
        endDate: "Feb. 2015",
        highlights: [
            "Assisted  the  HR  Director  in  the  preparation,  collection,  and  organization  of paperwork  to  properly  onboard  new  employees.",
            "Coordinated  interviews  with  hiring  managers  and  prospective  employees.",
            "Conducted  interviews  for  interns. ",
            "Created  exit  interviews  for  resigning  employees.",
            "Used  recruiting  tools  to  create  boolean  searches  for  open  positions. ",
            "Hosted  phone  interviews  for  applied  candidates.",
            "Built  a  Human  Resources  intranet  for  the  use  of  all  employees  and  hiring managers  and  maintained  the  database  of  available  resources."
        ]
    }],

    education: {
        college: "City College of the University of New York",
        city: "New York, NY",
        gradDate: "Jan 2016",
        major: "B.S in Computer Science"
    },

    skills: ["Leadership", "Strategy", "Adobe Photoshop", "Adobe Illustrator", "Windows 10", "Google Apps", "Strategic Planning", "Time Management", "Fluent in Spanish", "Research", "Teamwork", "Data Entry", "Mac OS", "Human Resources", "Microsoft Office", "Customer Service", "PowerPoint", "Microsoft Word", "Microsoft Excel"]
};

$(function() {
    function showResume() {
        $(".myResume").html('<h3>Anthony Mejia</h3>')
            .append('<hr><p class="resume-summary">Entry-level Front End Web Developer with experience in Client Services and HR</p>');
        for (var key in resume) {
            var section = resume[key];
            $(".myResume").append('<div class="section ' + key + '"><h4 class="section-title">' + key + '</h4><hr></div>');
        }

        for (var key in resume.experience) {
            var position = resume.experience[key];
            var highlights = position.highlights;
            var html = '<div class="position">';
            html += '<p class="company">' + position.company + '</p>';
            html += '<p class="date">' + position.startDate + ' - ' + position.endDate + '</p>';
            html += '<h5>' + position.title + '</h5>';
            html += '<ul></ul>';
            $(".experience").append(html);
            $.each(highlights, function(index, value) {
                $(".experience ul:not(.highlights)").append('<li>' + value + '</li>');
            });
            $(".experience ul:not(.highlights)").addClass("highlights");
        }

        $(".education").append('<div class="degree"><p>' + resume.education.city + '</p><h6>' + resume.education.college + '</h6><h5>' + resume.education.major + '</h5><p>' + resume.education.gradDate + '</p></div>');

        for (var i = 0; i < resume.skills.length; i++) {
            var skill = resume.skills[i];
            $(".skills").append('<p> ' + skill + ' </p>');
        }

        $(".myResume").append('<a href="Antmejia.pdf" target="_blank"><div class="resume-button">Download Resume</div></a>');
    }

    showResume();

    $(".reportcard-button").click(function() {
        if (inProgress === false) {
            inProgress = true;
            var $button = $(".reportcard-button");
            $button.velocity(
                "transition.slideUpOut", {
                    delay: 600
                });
            ga('send', 'event', 'button', 'click', $button.text());
            if ($button.text() === "View Report Card") {

                var url = "js/amejia.json";

                $.getJSON(url, function(treehouse) {

                    var badges = treehouse.badges;
                    var points = treehouse.points;
                    var total = points.total;

                    var reportCard = {
                        labels: [
                            "HTML",
                            "CSS",
                            "JavaScript",
                            "Ruby",
                            "Development Tools",
                            "Android",
                            "Python",
                            "iOS",
                            "Design",
                            "PHP",
                            "Business",
                            "Java"
                        ],
                        datasets: [{
                            data: [],
                            backgroundColor: [
                                "#42A8D0",
                                "#3A74B3",
                                "#B34C72",
                                "#CF383E",
                                "#4B6189",
                                "#3BB854",
                                "#E698D4",
                                "#2E93A8",
                                "#EA9C51",
                                "#E2CA2C",
                                "#9557AB",
                                "#e74c3c",
                                "#267C53"
                            ],
                            hoverBackgroundColor: [
                                "#4ABFEC",
                                "#4389D3",
                                "#CC5683",
                                "#F66454",
                                "#748AAE",
                                "#61DB7A",
                                "#F7B6E9",
                                "#58BED0",
                                "#FF9733",
                                "#F7DC2F",
                                "#B989CA",
                                "#F66454",
                                "#409D71"
                            ]
                        }]
                    };

                    $(".myResume *").velocity(
                        "transition.slideUpOut", {
                            delay: 1200,
                            stagger: 20,
                            drag: true,
                            backwards: false,
                            complete: function() {
                                    $(".myResume").css("display", "block").html('<div class="point-section"></div>').append('<div id="badges"></div>');
                                    $("#badges").append('<h3 class="total">' + badges.length + '</h3><p class="subtext">Badges Earned</p>');
                                    $(".myResume *").css("display", "none");
                                    for (var i = (badges.length - 10); i < badges.length; i++) {
                                        $("#badges").append('<img src="' + badges[i].icon_url + '">');
                                    }
                                    $(".point-section").html('<canvas id="skillsResume" width="auto" height="auto"></canvas>')
                                        .append('<h3 class="total">' + points.total + '</h3><p class="subtext">Total Points</p>')
                                        .append('<div id="legend"></div>');

                                    $.each(points, function(key, value) {
                                        if (value > 50 && key !== "total") {
                                            var val = value;
                                            for (var i = 0; i < reportCard.labels.length; i++) {
                                                var name = reportCard.labels[i];
                                                if (name === key) {
                                                    reportCard.datasets[0].data.splice(i, 0, value);
                                                    $("#legend").append('<div class="legend-item"><div style="background-color: ' + reportCard.datasets[0].backgroundColor[i] + ';" class="palette"></div><h6>' + key + '</h6><p>' + value + '</p></div>');
                                                }
                                            }
                                        }
                                    });
                                    $(".myResume *").velocity(
                                        "transition.slideDownIn", {
                                            stagger: 50,
                                            complete: function() {
                                                var skillsResume = new Chart($("#skillsResume").get(0).getContext("2d"), {
                                                    type: 'doughnut',
                                                    data: reportCard,
                                                    options: {
                                                        cutoutPercentage: 80,
                                                        responsiveAnimationDuration: 3000,
                                                        animation: {
                                                            duration: 3000,
                                                            easing: "easeInOutCubic",
                                                        },
                                                        tooltips: {
                                                            callbacks: {
                                                                label: function(tooltipItem, data) {
                                                                    return data.labels[tooltipItem.index];
                                                                }
                                                            }
                                                        },
                                                        elements: {
                                                            arc: {
                                                                borderWidth: 0
                                                            }
                                                        },
                                                        legend: {
                                                            display: false
                                                        }
                                                    }
                                                });
                                                $button.text("View Resume").velocity(
                                                    "transition.slideDownIn", {
                                                        delay: 1400,
                                                        complete: function() {
                                                            inProgress = false;
                                                        }
                                                    });
                                            }
                                        });
                                } // End of complete function
                        }); // End of transition
                });
            } // End of IF statement

            if ($button.text() === "View Resume") {
                $(".myResume *").velocity(
                    "transition.slideUpOut", {
                        delay: 1200,
                        drag: true,
                        complete: function() {
                            $(".myResume").css("display", "none");
                            showResume();
                            $(".myResume *").hide().velocity(
                                "transition.slideDownIn", {
                                    stagger: 150,
                                    begin: function() {
                                        $(".myResume").show();
                                    },
                                    complete: function() {
                                        $(".skills p").css("display", "inline-block");
                                        $button.text("View Report Card").velocity(
                                            "transition.slideDownIn", {
                                                delay: 1800,
                                                complete: function() {
                                                    inProgress = false;
                                                }
                                            });
                                    }
                                });
                        }
                    });
            } // End of IF statement    
        } // End of IF statement - In Progress
    }); // End of click function
}); // End of function

$(function() {

    // Contact Section

    var contact = [{
        type: "email",
        icon: svg[9],
        text: "anthony@antmejia.com",
        link: "mailto:anthony@antmejia.com"
    }, {
        type: "telephone",
        icon: svg[10],
        text: "(347) 474-9838",
        link: "tel:3474749838"
    }];

    $("#contact").html('<h2 class="sectiontitle"> Contact Me</h2>')
        .append('<p class="conclusion">To provide feedback, please feel free to use the email address below. </p>')
        .append('<div id="info"></div>');

    for (var i = 0; i < contact.length; i++) {
        var detail = contact[i];
        $("#info").append('<a href="' + detail.link + '"><div class="detail">' + detail.icon + '<p>' + detail.text + '</p></div></a>');
    }

    $(window).scroll(function() {
        if ($("#info").isOnScreenFull() === true && scrollOnceInfo === false && preFinish === true) {
            $(".detail svg").velocity(
                "transition.flipYIn", {
                    duration: 3000,
                    stagger: 250
                });
            $(".detail p").velocity(
                "transition.slideDownIn", {
                    delay: 800,
                    duration: 900,
                    stagger: 200,
                });
            scrollOnceInfo = true;
        }
    });

});

$(function() {
    // Footer
    $("#footer").html('<div class="footer-cushion"></div><div class="inner-footer"></div><div class="stats-section"></div>').append('<p class="copyright">&copy; 2016 Anthony Mejia</p>');
    $(".inner-footer").html('<div class="stats-button"><p>View Page Stats</p></div>');
    $(".stats-button").click(function() {
        $("body").css("overflow", "hidden");
        $(".stats-button").velocity({
            height: "0",
            opacity: "0",
            borderColorAlpha: 0
        }, {
            duration: 900,
            easing: "swing"
        });

        $("#footer").css({
            "position": "fixed",
            "overflow": "auto"
        }).velocity({
            height: "100%"
        }, {
            delay: 1100,
            duration: 1200
        });

        $(".navbar").velocity(
            "transition.slideUpBigOut", {
                delay: 1800,
                duration: 600
            });

        $(".stats-section").velocity({
            height: "100%",
            backgroundColor: "#fff"
        }, {
            delay: 2300,
            duration: 1000
        });
        //  $(".inner-footer").append('<h3> So what did it take to make this site?</h3>');
    });
});


// Analytical Stuff
$(document).ready(function() {

    $("[class$='-button']").click(function() {
        var buttonText = $(this).text();
        ga('send', 'event', 'button', 'click', buttonText);
    });

    $(".detail").click(function() {
        var typeDetail = $(this).attr("id");
        ga('send', 'event', 'contact', 'click', typeDetail);
    });

    $(".projects").click(function() {
        var proName = $(this).children("img").attr("alt");
        ga('send', 'event', 'project', 'click', proName);
    });
});