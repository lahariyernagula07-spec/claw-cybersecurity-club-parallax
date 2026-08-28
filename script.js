var loader = document.getElementById("loader");
var menuButton = document.getElementById("menuButton");
var navMenu = document.getElementById("navMenu");
var layers = document.querySelectorAll(".parallax");
var hero = document.querySelector(".hero");
var mouseX = 0;
var mouseY = 0;
var scrollY = 0;
var currentMouseX = 0;
var currentMouseY = 0;
var currentScrollY = 0;

window.addEventListener("load", function () {
    if (loader) {
        setTimeout(function () {
            loader.classList.add("hide");
        }, 650);
    }
});

if (menuButton && navMenu) {
    menuButton.addEventListener("click", function () {
        navMenu.classList.toggle("open");
    });

    var links = navMenu.querySelectorAll("a");
    for (var i = 0; i < links.length; i++) {
        links[i].addEventListener("click", function () {
            navMenu.classList.remove("open");
        });
    }
}

if (hero) {
    hero.addEventListener("mousemove", function (event) {
        mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (event.clientY / window.innerHeight - 0.5) * 2;
    });

    hero.addEventListener("mouseleave", function () {
        mouseX = 0;
        mouseY = 0;
    });
}

window.addEventListener("scroll", function () {
    scrollY = window.pageYOffset;
});

function updateParallax() {
    currentMouseX += (mouseX - currentMouseX) * 0.055;
    currentMouseY += (mouseY - currentMouseY) * 0.055;
    currentScrollY += (scrollY - currentScrollY) * 0.055;

    for (var i = 0; i < layers.length; i++) {
        var speed = parseFloat(layers[i].getAttribute("data-speed")) || 0;
        var x = currentMouseX * speed * 32;
        var y = currentMouseY * speed * 22 + Math.min(currentScrollY * speed * 0.18, 55);

        if (layers[i].classList.contains("heroImage")) {
            layers[i].style.transform = "scale(1.06) translate3d(" + x + "px," + y + "px,0)";
        } else {
            layers[i].style.transform = "translate3d(" + x + "px," + y + "px,0)";
        }
    }

    window.requestAnimationFrame(updateParallax);
}

updateParallax();

var sections = document.querySelectorAll("section[id]");
var navLinks = document.querySelectorAll("#navMenu a");

window.addEventListener("scroll", function () {
    var current = "";

    for (var i = 0; i < sections.length; i++) {
        var top = sections[i].offsetTop - 160;
        var height = sections[i].offsetHeight;

        if (scrollY >= top && scrollY < top + height) {
            current = sections[i].getAttribute("id");
        }
    }

    for (var j = 0; j < navLinks.length; j++) {
        navLinks[j].classList.remove("active");

        if (navLinks[j].getAttribute("href") === "#" + current) {
            navLinks[j].classList.add("active");
        }
    }
});
