//Reviews slider
let slider = null;
function initSwiper() {
    if (window.innerWidth < 1024) {
        if (!slider) {
            slider = new Swiper('.reviews__slider', {
                slidesPerView: 1,
                spaceBetween: 32,
                scrollbar: {
                    el: ".swiper-scrollbar",
                    draggable: true
                },
            });
        }
    } else {
        if (slider) {
            slider.destroy(true, true);
            slider = null;
        }
    }
}
window.addEventListener('DOMContentLoaded', initSwiper);
window.addEventListener('resize', initSwiper);

document.addEventListener('DOMContentLoaded', () => {
    //Slider
    let swiper = new Swiper(".images-slider", {
        slidesPerView: 1,
        spaceBetween: 10,
        centeredSlides: true,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        breakpoints: {
            640: {
                slidesPerView: 2,
            },
            1280: {
                slidesPerView: 3,
            },
        },
    });

    // Header Show/Hide
    let didScroll = false;
    let lastScrollTop = 0;
    let delta = 200;
    let header = document.querySelector('header');
    let navbarHeight = header.offsetHeight;

    window.addEventListener('scroll', function(event) {
        didScroll = true;
    });

    setInterval(function() {
        if (didScroll) {
            hasScrolled();
            didScroll = false;
        }
    }, 250);

    function hasScrolled() {
        let st = window.pageYOffset || document.documentElement.scrollTop;
        if (Math.abs(lastScrollTop - st) <= delta)
            return;
        if (st > lastScrollTop && st > navbarHeight) {
            header.classList.add('header-to-top');
        } else {
            if (st + window.innerHeight < document.documentElement.scrollHeight) {
                header.classList.remove('header-to-top');
            }
        }
        lastScrollTop = st;
    }

    //Show menu
    document.getElementById('menuToggle').onclick = function() {
        document.body.classList.toggle('show-menu');
    };

    //Active class change
    const sections = document.querySelectorAll('.animated-items');

    sections.forEach(function(section) {
        const items = section.querySelectorAll('.animate-item');
        let currentIndex = 0;

        setInterval(function() {
            items[currentIndex].classList.remove('active');
            currentIndex = (currentIndex + 1) % items.length;
            items[currentIndex].classList.add('active');
        }, 4000);
    });

    /*Tabs*/
    function openTab(tabName, buttonElement) {
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });

        document.querySelectorAll('.tab-button').forEach(btn => {
            btn.classList.remove('active');
        });

        document.querySelectorAll('.global-btn').forEach(link => {
            link.classList.remove('active');
        });

        document.querySelectorAll('.tab-content[data-tab="' + tabName + '"]').forEach(content => {
            content.classList.add('active');
        });

        buttonElement.classList.add('active');

        const globalBtn = document.querySelector('.global-btn[data-tab="' + tabName + '"]');
        if (globalBtn) {
            globalBtn.classList.add('active');
        }
    }

    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            openTab(tabName, this);
        });
    });

    if (tabButtons.length > 0) {
        tabButtons[0].click();
    }

    //Anchor smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const id = this.getAttribute('href').substring(1);
            const target = document.getElementById(id);
            if (!target) return;

            // const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
            const scrollToPosition = targetPosition;

            document.body.classList.remove('show-menu');

            window.scrollTo({
                top: scrollToPosition,
                behavior: 'smooth'
            });
        });
    });


});

