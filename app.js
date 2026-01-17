// 1. Text Reveal Setup
const target = document.getElementById('text-reveal-target');
const textContent = target.innerText.trim();
target.innerHTML = '';

// Split text into words and wrap in spans
const words = textContent.split(' ');
words.forEach(word => {
    const span = document.createElement('span');
    span.textContent = word + ' ';
    span.className = 'reveal-word';
    target.appendChild(span);
});

// 2. Intersection Observer for Fade Up Animations
const observerOptions = {
    threshold: 0.4,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target); // Only animate once
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-up').forEach(el => {
    observer.observe(el);
});

// 3. Scroll Listener for Text Reveal
window.addEventListener('scroll', () => {
    const rect = target.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    // Calculate how far the element is into the viewport
    // Start revealing when element enters bottom of screen
    // Finish revealing when element is near top/center
    const progress = 1 - (rect.top / (windowHeight * 0.5));
    
    const spans = target.querySelectorAll('span');
    const totalSpans = spans.length;
    
    // Map progress to number of active spans
    let activeCount = Math.floor(progress * 0.5 * totalSpans);
    
    // Clamp values
    if (activeCount < 0) activeCount = 0;
    if (activeCount > totalSpans) activeCount = totalSpans;
    
    spans.forEach((span, index) => {
        if (index < activeCount) {
            span.classList.add('active');
        } else {
            span.classList.remove('active');
        }
    });
});

// Trigger scroll once on load to set initial state
window.dispatchEvent(new Event('scroll'));


// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenuClose = document.getElementById('mobile-menu-close');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');

// Open mobile menu
mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.remove('translate-x-full');
    document.body.style.overflow = 'hidden';
});

// Close mobile menu
mobileMenuClose.addEventListener('click', () => {
    mobileMenu.classList.add('translate-x-full');
    document.body.style.overflow = '';
});

// Close menu when clicking on a link
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('translate-x-full');
        document.body.style.overflow = '';
    });
});
