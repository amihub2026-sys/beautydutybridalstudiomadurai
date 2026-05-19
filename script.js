document.addEventListener('DOMContentLoaded', () => {

    /* --- Navigation --- */

    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    const navItems = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {

        if (window.scrollY > 50) {

            navbar.classList.add('scrolled');

        } else {

            navbar.classList.remove('scrolled');

        }

    });

    hamburger.addEventListener('click', () => {

        navLinks.classList.toggle('active');

        hamburger.classList.toggle('active');

    });

    navItems.forEach(item => {

        item.addEventListener('click', () => {

            navLinks.classList.remove('active');

            hamburger.classList.remove('active');

        });

    });

    /* --- Smooth Scroll --- */

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener('click', function (e) {

            e.preventDefault();

            const targetId = this.getAttribute('href');

            if (targetId === '#') return;

            const targetElement =
            document.querySelector(targetId);

            if (targetElement) {

                const headerOffset = 80;

                const elementPosition =
                targetElement.getBoundingClientRect().top;

                const offsetPosition =
                elementPosition +
                window.pageYOffset -
                headerOffset;

                window.scrollTo({

                    top: offsetPosition,
                    behavior: "smooth"

                });

            }

        });

    });

    /* --- Reveal Animation --- */

    const revealElements =
    document.querySelectorAll('.reveal');

    const revealOptions = {

        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"

    };

    const revealObserver =
    new IntersectionObserver(function(entries){

        entries.forEach(entry => {

            if(entry.isIntersecting){

                entry.target.classList.add('active');

            }

        });

    }, revealOptions);

    revealElements.forEach(el =>
    revealObserver.observe(el));

    /* --- Counter --- */

    const counters =
    document.querySelectorAll('.counter');

    const counterObserver =
    new IntersectionObserver((entries, observer) => {

        entries.forEach(entry => {

            if(entry.isIntersecting &&
               entry.target.innerText === '0') {

                countUp(entry.target);

                observer.unobserve(entry.target);

            }

        });

    });

    counters.forEach(counter =>
    counterObserver.observe(counter));

    function countUp(el){

        const target =
        +el.getAttribute('data-target');

        const count =
        +el.innerText;

        const speed = 200;

        const inc = target / speed;

        if(count < target){

            el.innerText =
            Math.ceil(count + inc);

            setTimeout(() => countUp(el), 10);

        } else {

            el.innerText = target;

        }

    }

    /* --- Hero Slider --- */

    const heroSlides =
    document.querySelectorAll('.hero-slide');

    if(heroSlides.length > 0){

        let currentHeroSlide = 0;

        setInterval(() => {

            heroSlides[currentHeroSlide]
            .classList.remove('active');

            currentHeroSlide =
            (currentHeroSlide + 1)
            % heroSlides.length;

            heroSlides[currentHeroSlide]
            .classList.add('active');

        }, 3000);

    }

});


/* =====================================
   BEAUTY DUTY GALLERY
===================================== */

const bdGalleryImages = [

"assests/gallery/1000534179.jpg.jpeg",

"assests/gallery/1000534182.jpg.jpeg",

"assests/gallery/1000668239.jpg.jpeg",

"assests/gallery/1000675068.jpg.jpeg",

"assests/gallery/1000675072.jpg.jpeg",

"assests/gallery/1000710768.jpg.jpeg",

"assests/gallery/1000770142.jpg.jpeg",

"assests/gallery/1000772018.jpg.jpeg",

"assests/gallery/1000776068.jpg.jpeg",

"assests/gallery/WhatsApp Image 2026-05-06 at 1.18.38 PM (1).jpeg",

"assests/gallery/WhatsApp Image 2026-05-06 at 1.18.39 PM (1).jpeg",

"assests/gallery/WhatsApp Image 2026-05-06 at 1.18.39 PM.jpeg"

];

let bdCurrentIndex = 0;


/* OPEN */

window.openGallery = function(index){

    bdCurrentIndex = index;

    document.getElementById("bdGalleryPopup")
    .style.display = "flex";

    document.getElementById("bdPopupImage")
    .src = bdGalleryImages[index];

}


/* CLOSE */

window.closeGallery = function(){

    document.getElementById("bdGalleryPopup")
    .style.display = "none";

}


/* NEXT / PREVIOUS */

window.changeSlide = function(step){

    bdCurrentIndex += step;

    if(bdCurrentIndex < 0){

        bdCurrentIndex =
        bdGalleryImages.length - 1;

    }

    if(bdCurrentIndex >= bdGalleryImages.length){

        bdCurrentIndex = 0;

    }

    document.getElementById("bdPopupImage")
    .src =
    bdGalleryImages[bdCurrentIndex];

}