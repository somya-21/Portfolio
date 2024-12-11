// Navigation Toggle
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');

burger.addEventListener('click', () => {
    nav.classList.toggle('nav-active');
    
    navLinks.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });
    
    burger.classList.toggle('toggle');
});

// Scroll Animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    // Add animation classes to elements
    const animateElements = document.querySelectorAll('.skill-card, .project-card, .contact-item, .form-group');
    animateElements.forEach((el, index) => {
        el.classList.add('animate', 'fade-in-up');
        el.style.animationDelay = `${index * 100}ms`;
        observer.observe(el);
    });
});

// Mouse move effect on sections
document.querySelectorAll('section').forEach(section => {
    section.addEventListener('mousemove', (e) => {
        const rect = section.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        
        section.style.setProperty('--mouse-x', `${x}%`);
        section.style.setProperty('--mouse-y', `${y}%`);
    });
});

// Typing effect for hero section
const heroText = document.querySelector('.hero-content h1');
if (heroText) {
    const text = heroText.textContent;
    heroText.textContent = '';
    let index = 0;

    function typeText() {
        if (index < text.length) {
            heroText.textContent += text.charAt(index);
            index++;
            setTimeout(typeText, 100);
        }
    }

    setTimeout(typeText, 500);
}

// Typing Animation
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = ''; // Clear initial text
    
    function type() {
        if (i < text.length) {
            element.innerHTML = text.substring(0, i + 1) + '<span class="cursor">|</span>';
            i++;
            
            // Add natural typing delays
            let delay = speed;
            const char = text[i - 1];
            
            // Longer pauses at punctuation and word breaks
            if (char === ',') delay = 500;
            if (char === ' ') delay = 200;
            if (text.substring(i - 2, i) === 'Hi') delay = 400;
            if (text.substring(i - 2, i) === "m ") delay = 300;
            
            setTimeout(type, delay);
        } else {
            // Keep cursor blinking at the end
            element.innerHTML = text + '<span class="cursor">|</span>';
        }
    }
    
    type();
}

// Start animation when page loads
document.addEventListener('DOMContentLoaded', function() {
    const typingElement = document.querySelector('.typing-text');
    if (typingElement) {
        setTimeout(() => {
            typeWriter(typingElement, "Hi, I'm Somya Tandon", 100);
        }, 500); // Initial delay before starting
    }
});

// Typing Animation
document.addEventListener('DOMContentLoaded', () => {
    const typingText = document.querySelector('.typing-text');
    if (typingText) {
        // Reset the animation when the element comes into view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    typingText.style.animation = 'none';
                    typingText.offsetHeight; // Trigger reflow
                    typingText.style.animation = 'typing 3.5s steps(40, end)';
                    
                    // Reset highlight animation
                    const highlight = typingText.querySelector('.highlight');
                    if (highlight) {
                        highlight.style.animation = 'none';
                        highlight.offsetHeight; // Trigger reflow
                        highlight.style.animation = 'fadeIn 0.5s ease forwards';
                        highlight.style.animationDelay = '2s';
                    }
                }
            });
        }, { threshold: 0.5 });

        observer.observe(typingText);
    }
});

// Scroll to top button
const scrollTopBtn = document.createElement('div');
scrollTopBtn.classList.add('scroll-top');
scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Project image hover effect
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        
        const image = card.querySelector('img');
        if (image) {
            image.style.transform = `scale(1.1) translate(${x * 10}px, ${y * 10}px)`;
        }
    });
    
    card.addEventListener('mouseleave', () => {
        const image = card.querySelector('img');
        if (image) {
            image.style.transform = '';
        }
    });
});

// Form animation
const formControls = document.querySelectorAll('.form-control');
formControls.forEach(control => {
    control.addEventListener('focus', () => {
        control.parentElement.classList.add('focused');
    });
    
    control.addEventListener('blur', () => {
        if (!control.value) {
            control.parentElement.classList.remove('focused');
        }
    });
});

// Skills animation
document.querySelectorAll('.skill-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        const icon = card.querySelector('.skill-icon');
        if (icon) {
            icon.style.transform = `scale(1.2) rotate(${Math.random() * 20 - 10}deg)`;
        }
    });
    
    card.addEventListener('mouseleave', () => {
        const icon = card.querySelector('.skill-icon');
        if (icon) {
            icon.style.transform = '';
        }
    });
});

// Contact Form Handling
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // You can add your form submission logic here
    // For now, we'll just log the values
    console.log('Form submitted:', { name, email, subject, message });
    
    // Show success message
    alert('Thank you for your message! I will get back to you soon.');
    
    // Clear form
    this.reset();
});

// Scroll Animations for Experience Cards
const experienceCards = document.querySelectorAll('.experience-card');
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px'
};

const experienceObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

experienceCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.6s ease-out';
    experienceObserver.observe(card);
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
