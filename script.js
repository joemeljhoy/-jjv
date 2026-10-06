document.addEventListener("DOMContentLoaded", () => {
    const header = document.getElementById("site-header");
    const navToggle = document.querySelector(".nav-toggle");
    const primaryNav = document.getElementById("primary-nav");
    const navLinks = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll("main section[id]");
    const contactForm = document.getElementById("contact-form");
    const year = document.getElementById("current-year");

    if (year) year.textContent = new Date().getFullYear();

    if (window.Typed && document.querySelector(".typing")) {
        new Typed(".typing", {
            strings: [
                "Power Platform Specialist",
                "SharePoint Solutions Developer",
                "Workflow Automation Specialist"
            ],
            typeSpeed: 55,
            backSpeed: 32,
            backDelay: 1600,
            loop: true,
            smartBackspace: true
        });
    }

    const closeMenu = () => {
        navToggle?.classList.remove("active");
        primaryNav?.classList.remove("open");
        navToggle?.setAttribute("aria-expanded", "false");
        document.body.classList.remove("menu-open");
    };

    navToggle?.addEventListener("click", () => {
        const isOpen = primaryNav.classList.toggle("open");
        navToggle.classList.toggle("active", isOpen);
        navToggle.setAttribute("aria-expanded", String(isOpen));
        document.body.classList.toggle("menu-open", isOpen);
    });

    navLinks.forEach(link => link.addEventListener("click", closeMenu));

    window.addEventListener("scroll", () => {
        header?.classList.toggle("scrolled", window.scrollY > 20);

        let currentSection = "home";
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 140;
            if (window.scrollY >= sectionTop) currentSection = section.id;
        });

        navLinks.forEach(link => {
            link.classList.toggle("active", link.getAttribute("href") === `#${currentSection}`);
        });
    }, { passive: true });

    const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    document.querySelectorAll(".reveal").forEach(element => revealObserver.observe(element));

    contactForm?.addEventListener("submit", event => {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const subject = document.getElementById("subject").value.trim();
        const message = document.getElementById("message").value.trim();

        const emailSubject = encodeURIComponent(subject);
        const emailBody = encodeURIComponent(
            `Hello Joemel,\n\n${message}\n\nName: ${name}\nEmail: ${email}`
        );

        window.location.href = `mailto:jjfvillanueva16@gmail.com?subject=${emailSubject}&body=${emailBody}`;
    });

    document.addEventListener("click", event => {
        if (primaryNav?.classList.contains("open") &&
            !primaryNav.contains(event.target) &&
            !navToggle.contains(event.target)) {
            closeMenu();
        }
    });
});
