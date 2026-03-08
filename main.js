document.addEventListener('DOMContentLoaded', () => {
    // --- NAVBAR CHANGE ON SCROLL ---
    const nav = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // --- REVEAL ANIMATIONS (GSAP) ---
    // Register scroll plugin
    gsap.registerPlugin(ScrollTrigger);

    // Hero Anim
    gsap.from('.hero-label', { opacity: 0, y: 20, duration: 1, delay: 0.2 });
    gsap.from('.hero-title', { opacity: 0, y: 30, duration: 1.2, delay: 0.4 });
    gsap.from('.hero-sub', { opacity: 0, y: 25, duration: 1, delay: 0.6 });
    gsap.from('.hero-cta', { opacity: 0, y: 20, duration: 1, delay: 0.8 });

    // Section Titles
    const titles = document.querySelectorAll('.section-title');
    titles.forEach(title => {
        gsap.from(title, {
            scrollTrigger: {
                trigger: title,
                start: 'top 80%',
            },
            opacity: 0,
            y: 30,
            duration: 1,
            ease: 'power3.out'
        });
    });

    // Skills Staggered Reveal
    gsap.from('.skill-box', {
        scrollTrigger: {
            trigger: '.skill-grid',
            start: 'top 95%',
        },
        opacity: 0,
        y: 20,
        stagger: 0.05,
        duration: 0.4,
        ease: 'power2.out',
        clearProps: 'all'
    });

    // Project Items Reveal
    const projectsAlt = document.querySelectorAll('.project-item-alt');
    projectsAlt.forEach((item, index) => {
        const details = item.querySelector('.project-details');
        const img = item.querySelector('.project-img-container');

        gsap.from(details, {
            scrollTrigger: { trigger: item, start: 'top 80%' },
            opacity: 0,
            x: index % 2 === 0 ? 50 : -50,
            duration: 1,
            ease: 'power3.out'
        });

        gsap.from(img, {
            scrollTrigger: { trigger: item, start: 'top 80%' },
            opacity: 0,
            x: index % 2 === 0 ? -50 : 50,
            duration: 1,
            ease: 'power3.out'
        });
    });

    // Journey Reveal
    const journeyItems = document.querySelectorAll('.journey-item-v2');
    journeyItems.forEach((item, index) => {
        const info = item.querySelector('.journey-info-v2');
        const graphic = item.querySelector('.journey-graphic');

        gsap.from(info, {
            scrollTrigger: { trigger: item, start: 'top 85%' },
            opacity: 0,
            x: item.classList.contains('right-aligned') ? 40 : -40,
            duration: 1,
            ease: 'power3.out'
        });

        gsap.from(graphic, {
            scrollTrigger: { trigger: item, start: 'top 85%' },
            opacity: 0,
            scaleY: 0,
            transformOrigin: 'top',
            duration: 1.2,
            ease: 'power2.out'
        });
    });

    // --- FORM SUBMISSION ---
    const form = document.getElementById('contact-form');
    const status = document.getElementById('form-status');

    if (form) {
        const modal = document.getElementById('success-modal');
        const closeModalBtn = document.getElementById('modal-close');

        const showModal = () => {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scroll
        };

        const closeModal = () => {
            modal.classList.remove('active');
            document.body.style.overflow = ''; // Restore scroll
        };

        closeModalBtn.addEventListener('click', closeModal);
        modal.querySelector('.modal-overlay').addEventListener('click', closeModal);

        form.onsubmit = async (e) => {
            e.preventDefault();
            const submitBtn = document.getElementById('submit-btn');
            const originalText = submitBtn.innerText;

            submitBtn.innerText = 'SENDING...';
            submitBtn.disabled = true;
            status.innerHTML = '';
            status.className = 'form-status';

            const formData = new FormData(form);

            try {
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    showModal();
                    form.reset();
                } else {
                    status.innerHTML = 'There was an error sending your message. Please try again.';
                    status.classList.add('error');
                }
            } catch (err) {
                status.innerHTML = 'Oops! Something went wrong. Connection lost.';
                status.classList.add('error');
            } finally {
                submitBtn.innerText = originalText;
                submitBtn.disabled = false;
            }
        };
    }
    // Back to Top functionality
    const backToTopBtn = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 600) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Active Navigation Highlighting with GSAP
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section[id]');

    // Clear active state when at top
    ScrollTrigger.create({
        start: "top top",
        end: 200,
        onToggle: self => {
            if (self.isActive) {
                navLinks.forEach(link => link.classList.remove('active'));
            }
        }
    });

    sections.forEach(section => {
        ScrollTrigger.create({
            trigger: section,
            start: "top 200px",
            end: "bottom 200px",
            onToggle: self => {
                if (self.isActive) {
                    navLinks.forEach(link => {
                        if (link.getAttribute('href') === `#${section.id}`) {
                            link.classList.add('active');
                        } else {
                            link.classList.remove('active');
                        }
                    });
                }
            }
        });
    });
});
