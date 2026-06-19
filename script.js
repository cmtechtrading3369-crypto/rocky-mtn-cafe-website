// Rocky Mountain Cafe - Interactive Features

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    initMenuTabs();
    initStatusIndicator();
    initNavigation();
    initContactForm();
    initSmoothScroll();
});

// ===== MENU TABS =====
function initMenuTabs() {
    const menuTabs = document.querySelectorAll('.menu-tab');
    const menuCategories = document.querySelectorAll('.menu-category');

    menuTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Remove active class from all tabs
            menuTabs.forEach(t => t.classList.remove('active'));
            
            // Hide all menu categories
            menuCategories.forEach(cat => cat.classList.add('hidden'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Show selected category
            const selectedCategory = document.getElementById(`${category}-menu`);
            if (selectedCategory) {
                selectedCategory.classList.remove('hidden');
            }
        });
    });
}

// ===== STATUS INDICATOR =====
function initStatusIndicator() {\n    const statusDot = document.getElementById('statusDot');
    const statusText = document.getElementById('statusText');
    
    function updateStatus() {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const day = now.getDay();
        
        // Hours: 6am-5pm (6:00-17:00), 7 days a week
        const isOpen = (hours >= 6 && hours < 17);
        
        if (isOpen) {
            statusDot.classList.remove('closed');
            statusDot.style.background = '#27ae60';
            
            // Calculate time until closing
            const closingHour = 17;
            const timeUntilClose = closingHour - hours - (minutes > 0 ? 1 : 0);
            statusText.textContent = `Open · Closes at 5:00 PM (${timeUntilClose}h away)`;
        } else {
            statusDot.classList.add('closed');
            statusDot.style.background = '#e74c3c';
            
            // Calculate time until opening
            if (hours >= 17) {
                statusText.textContent = 'Closed · Opens tomorrow at 6:00 AM';
            } else {
                const timeUntilOpen = 6 - hours;
                statusText.textContent = `Closed · Opens at 6:00 AM (${timeUntilOpen}h from now)`;
            }
        }
    }
    
    // Update immediately and then every minute
    updateStatus();
    setInterval(updateStatus, 60000);
}

// ===== NAVIGATION HIGHLIGHTING =====
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Update active link on scroll
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

// ===== CONTACT FORM =====
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const message = document.getElementById('message').value.trim();
            const formStatus = document.getElementById('formStatus');
            
            // Validation
            if (!name) {
                showFormStatus('Please enter your name', 'error', formStatus);
                return;
            }
            
            if (!email || !isValidEmail(email)) {
                showFormStatus('Please enter a valid email address', 'error', formStatus);
                return;
            }
            
            if (!message) {
                showFormStatus('Please enter a message', 'error', formStatus);
                return;
            }
            
            // In a real application, you would send this to a server
            // For now, we'll just show a success message
            showFormStatus('Thank you for reaching out! We will be in touch soon.', 'success', formStatus);
            
            // Clear form
            setTimeout(() => {
                contactForm.reset();
                formStatus.style.display = 'none';
            }, 3000);
        });
    }
}

function showFormStatus(message, type, element) {
    element.textContent = message;
    element.className = `form-status ${type}`;
    element.style.display = 'block';
    
    // Auto-hide error messages after 5 seconds
    if (type === 'error') {
        setTimeout(() => {
            element.style.display = 'none';
        }, 5000);
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ===== SMOOTH SCROLL =====
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            // Don't prevent default for nav items - let browser handle it
            if (href !== '#') {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// ===== UTILITY: ANIMATION ON SCROLL =====
function observeElementsOnScroll() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.card, .menu-item, .special-item, .review').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });
}

// Initialize scroll animations when page loads
window.addEventListener('load', observeElementsOnScroll);

// ===== DEBUGGING HELPERS =====
console.log('🏔️ Rocky Mountain Cafe Website Loaded');
console.log('📱 Responsive Design Active');
console.log('☕ Enjoying some code with your coffee?');
