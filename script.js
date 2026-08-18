/* =========================================================
   SUDHEER NARAPATI — PORTFOLIO INTERACTIONS
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const body = document.body;
    const navbar = document.getElementById("navbar");
    const themeToggle = document.getElementById("themeToggle");
    const themeIcon = document.querySelector(".theme-icon");
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");
    const navItems = document.querySelectorAll(".nav-links a");
    const progressBar = document.getElementById("scrollProgress");
    const cursorGlow = document.getElementById("cursorGlow");
    const currentYear = document.getElementById("currentYear");


    /* =====================================================
       CURRENT YEAR
    ===================================================== */

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }


    /* =====================================================
       THEME SYSTEM
    ===================================================== */

    const savedTheme = localStorage.getItem("portfolio-theme");

    if (savedTheme === "light") {
        body.classList.add("light-theme");

        if (themeIcon) {
            themeIcon.textContent = "☀";
        }
    }


    if (themeToggle) {

        themeToggle.addEventListener("click", () => {

            body.classList.toggle("light-theme");

            const lightMode =
                body.classList.contains("light-theme");

            localStorage.setItem(
                "portfolio-theme",
                lightMode ? "light" : "dark"
            );

            if (themeIcon) {
                themeIcon.textContent =
                    lightMode ? "☀" : "☾";
            }

        });

    }


    /* =====================================================
       MOBILE NAVIGATION
    ===================================================== */

    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", () => {

            navLinks.classList.toggle("open");

            menuToggle.classList.toggle("active");

        });

    }


    navItems.forEach(link => {

        link.addEventListener("click", () => {

            if (navLinks) {
                navLinks.classList.remove("open");
            }

            if (menuToggle) {
                menuToggle.classList.remove("active");
            }

        });

    });


    /* =====================================================
       NAVBAR + SCROLL PROGRESS
    ===================================================== */

    const updateScrollUI = () => {

        const scrollTop =
            window.scrollY ||
            document.documentElement.scrollTop;

        if (navbar) {

            if (scrollTop > 30) {
                navbar.classList.add("scrolled");
            } else {
                navbar.classList.remove("scrolled");
            }

        }


        if (progressBar) {

            const documentHeight =
                document.documentElement.scrollHeight -
                document.documentElement.clientHeight;

            const progress =
                documentHeight > 0
                    ? (scrollTop / documentHeight) * 100
                    : 0;

            progressBar.style.width =
                `${Math.min(progress, 100)}%`;

        }

    };


    window.addEventListener(
        "scroll",
        updateScrollUI,
        { passive: true }
    );

    updateScrollUI();


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(".reveal");


    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add("visible");

                            revealObserver.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.12,
                    rootMargin:
                        "0px 0px -45px 0px"
                }
            );


        revealElements.forEach((element, index) => {

            element.style.transitionDelay =
                `${Math.min(index % 4, 3) * 70}ms`;

            revealObserver.observe(element);

        });

    } else {

        revealElements.forEach(element => {
            element.classList.add("visible");
        });

    }


    /* =====================================================
       ANIMATED COUNTERS
    ===================================================== */

    const counters =
        document.querySelectorAll("[data-counter]");


    const animateCounter = element => {

        if (element.dataset.animated === "true") {
            return;
        }

        element.dataset.animated = "true";

        const target =
            Number(element.dataset.counter);

        const prefix =
            element.dataset.prefix || "";

        const suffix =
            element.dataset.suffix || "";

        const duration = 1350;

        const startTime =
            performance.now();


        const updateCounter = currentTime => {

            const elapsed =
                currentTime - startTime;

            const progress =
                Math.min(elapsed / duration, 1);

            const easedProgress =
                1 - Math.pow(1 - progress, 4);

            const currentValue =
                Math.floor(target * easedProgress);

            element.textContent =
                `${prefix}${currentValue}${suffix}`;

            if (progress < 1) {

                requestAnimationFrame(
                    updateCounter
                );

            } else {

                element.textContent =
                    `${prefix}${target}${suffix}`;

            }

        };


        requestAnimationFrame(updateCounter);

    };


    if ("IntersectionObserver" in window) {

        const counterObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            animateCounter(
                                entry.target
                            );

                            counterObserver.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.45
                }
            );


        counters.forEach(counter => {
            counterObserver.observe(counter);
        });

    } else {

        counters.forEach(animateCounter);

    }


    /* =====================================================
       ACTIVE NAVIGATION SECTION
    ===================================================== */

    const sections =
        document.querySelectorAll(
            "main section[id]"
        );


    const updateActiveNavigation = () => {

        const scrollPosition =
            window.scrollY + 180;

        let currentSection = "home";


        sections.forEach(section => {

            const sectionTop =
                section.offsetTop;

            const sectionHeight =
                section.offsetHeight;

            if (
                scrollPosition >= sectionTop &&
                scrollPosition <
                    sectionTop + sectionHeight
            ) {

                currentSection =
                    section.getAttribute("id");

            }

        });


        navItems.forEach(link => {

            link.classList.remove("active");

            const href =
                link.getAttribute("href");

            if (
                href === `#${currentSection}`
            ) {

                link.classList.add("active");

            }

        });

    };


    window.addEventListener(
        "scroll",
        updateActiveNavigation,
        { passive: true }
    );

    updateActiveNavigation();


    /* =====================================================
       CURSOR GLOW
       DESKTOP ONLY
    ===================================================== */

    const finePointer =
        window.matchMedia(
            "(pointer: fine)"
        ).matches;


    if (cursorGlow && finePointer) {

        let mouseX = 0;
        let mouseY = 0;

        let glowX = 0;
        let glowY = 0;


        document.addEventListener(
            "mousemove",
            event => {

                mouseX = event.clientX;
                mouseY = event.clientY;

                cursorGlow.style.opacity =
                    "1";

            }
        );


        document.addEventListener(
            "mouseleave",
            () => {

                cursorGlow.style.opacity =
                    "0";

            }
        );


        const animateGlow = () => {

            glowX +=
                (mouseX - glowX) * 0.09;

            glowY +=
                (mouseY - glowY) * 0.09;

            cursorGlow.style.left =
                `${glowX}px`;

            cursorGlow.style.top =
                `${glowY}px`;

            requestAnimationFrame(
                animateGlow
            );

        };


        animateGlow();

    }


    /* =====================================================
       SUBTLE PROJECT CARD TILT
    ===================================================== */

    const projectVisuals =
        document.querySelectorAll(
            ".project-visual"
        );


    if (finePointer) {

        projectVisuals.forEach(card => {

            card.addEventListener(
                "mousemove",
                event => {

                    const rect =
                        card.getBoundingClientRect();

                    const x =
                        event.clientX -
                        rect.left;

                    const y =
                        event.clientY -
                        rect.top;

                    const centerX =
                        rect.width / 2;

                    const centerY =
                        rect.height / 2;

                    const rotateX =
                        ((y - centerY) /
                            centerY) *
                        -1.2;

                    const rotateY =
                        ((x - centerX) /
                            centerX) *
                        1.2;

                    card.style.transform =
                        `perspective(1200px)
                         rotateX(${rotateX}deg)
                         rotateY(${rotateY}deg)
                         translateY(-2px)`;

                }
            );


            card.addEventListener(
                "mouseleave",
                () => {

                    card.style.transform =
                        "perspective(1200px) rotateX(0deg) rotateY(0deg) translateY(0)";

                }
            );

        });

    }


    /* =====================================================
       HERO INTELLIGENCE PARALLAX
    ===================================================== */

    const intelligenceShell =
        document.querySelector(
            ".intelligence-shell"
        );


    if (
        intelligenceShell &&
        finePointer
    ) {

        intelligenceShell.addEventListener(
            "mousemove",
            event => {

                const rect =
                    intelligenceShell
                        .getBoundingClientRect();

                const x =
                    event.clientX -
                    rect.left;

                const y =
                    event.clientY -
                    rect.top;

                const centerX =
                    rect.width / 2;

                const centerY =
                    rect.height / 2;

                const rotateY =
                    ((x - centerX) /
                        centerX) *
                    1.1;

                const rotateX =
                    ((y - centerY) /
                        centerY) *
                    -1.1;

                intelligenceShell.style.transform =
                    `perspective(1300px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)`;

            }
        );


        intelligenceShell.addEventListener(
            "mouseleave",
            () => {

                intelligenceShell.style.transform =
                    "perspective(1300px) rotateX(0deg) rotateY(0deg)";

            }
        );

    }


    /* =====================================================
       SMOOTH INTERNAL LINKS
    ===================================================== */

    const internalLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    internalLinks.forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const targetId =
                    link.getAttribute("href");

                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }

                const target =
                    document.querySelector(
                        targetId
                    );

                if (!target) {
                    return;
                }

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }
        );

    });


    /* =====================================================
       KEYBOARD ACCESSIBILITY
    ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                navLinks
            ) {

                navLinks.classList.remove(
                    "open"
                );

                if (menuToggle) {
                    menuToggle.classList.remove(
                        "active"
                    );
                }

            }

        }
    );


    /* =====================================================
       PAGE READY
    ===================================================== */

    requestAnimationFrame(() => {

        document.body.classList.add(
            "page-ready"
        );

    });

});