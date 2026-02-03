// ========================================
// PORTFOLIO MAIN JAVASCRIPT
// ========================================

// ========================================
// DOM ELEMENTS
// ========================================
const loader = document.getElementById('loader');
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const typingText = document.getElementById('typingText');
const downloadResumeBtn = document.getElementById('downloadResume');
const contactForm = document.getElementById('contactForm');
const currentYearSpan = document.getElementById('currentYear');

// ========================================
// LOADER FUNCTIONALITY
// ========================================
window.addEventListener('load', () => {
    setTimeout(() => {
        loader.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }, LOADER_DURATION);
});

// ========================================
// NAVBAR SCROLL EFFECT
// ========================================
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Add/remove scrolled class
    if (scrollTop > NAVBAR_SCROLL_THRESHOLD) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScrollTop = scrollTop;
});

// ========================================
// MOBILE MENU TOGGLE
// ========================================
if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking on a nav link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// ========================================
// TYPING EFFECT
// ========================================
if (typingText) {
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingDelay = TYPING_SPEED;

    function typeText() {
        const currentText = TYPING_TEXTS[textIndex];

        if (isDeleting) {
            typingText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingDelay = ERASING_SPEED;
        } else {
            typingText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingDelay = TYPING_SPEED;
        }

        if (!isDeleting && charIndex === currentText.length) {
            // Pause at end of text
            typingDelay = DELAY_BETWEEN_TEXTS;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % TYPING_TEXTS.length;
            typingDelay = 500;
        }

        setTimeout(typeText, typingDelay);
    }

    // Start typing effect after loader
    setTimeout(() => {
        typeText();
    }, LOADER_DURATION + 500);
}

// ========================================
// SMOOTH SCROLLING FOR NAVIGATION LINKS
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// ACTIVE NAVIGATION LINK
// ========================================
const sections = document.querySelectorAll('section[id]');

function highlightNavigation() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (navLink) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLink.style.color = 'var(--color-text-primary)';
            } else {
                navLink.style.color = 'var(--color-text-secondary)';
            }
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// ========================================
// RESUME DOWNLOAD FUNCTIONALITY
// ========================================
if (downloadResumeBtn) {
    downloadResumeBtn.addEventListener('click', (e) => {
        e.preventDefault();

        // You can replace this with actual download logic
        alert('Resume download feature! Please add your resume PDF file to the assets folder and update the path in constants.js');

        // Uncomment below when you have actual resume file
        // const link = document.createElement('a');
        // link.href = RESUME_FILE_PATH;
        // link.download = 'Resume.pdf';
        // link.click();
    });
}

// ========================================
// CONTACT FORM HANDLING
// ========================================
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form values
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };

        // Here you would typically send the data to a backend
        console.log('Form submitted:', formData);

        // Show success message
        alert('Thank you for your message! This is a demo form. In production, connect this to a backend service.');

        // Reset form
        contactForm.reset();
    });
}

// ========================================
// SCROLL ANIMATIONS (INTERSECTION OBSERVER)
// ========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for scroll animations
const animateOnScroll = document.querySelectorAll('.project-card, .timeline-item, .skill-category, .contact-item');
animateOnScroll.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ========================================
// SET CURRENT YEAR IN FOOTER
// ========================================
if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
}

// ========================================
// PARALLAX EFFECT FOR GRADIENT ORBS
// ========================================
const orbs = document.querySelectorAll('.gradient-orb');

window.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;

    orbs.forEach((orb, index) => {
        const speed = (index + 1) * 20;
        const x = (mouseX - 0.5) * speed;
        const y = (mouseY - 0.5) * speed;
        orb.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// ========================================
// CONSOLE MESSAGE
// ========================================
console.log('%c Portfolio Loaded Successfully! ', 'background: linear-gradient(135deg, #8b5cf6, #ec4899); color: white; padding: 10px 20px; border-radius: 5px; font-size: 14px; font-weight: bold;');
console.log('%c Built with ❤️ using HTML, CSS, and JavaScript ', 'color: #a78bfa; font-size: 12px;');

// ========================================
// PERFORMANCE MONITORING (OPTIONAL)
// ========================================
if ('performance' in window) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = window.performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log(`⚡ Page loaded in ${pageLoadTime}ms`);
        }, 0);
    });
}
