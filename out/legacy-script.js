// Rocky Mountain Cafe - Interactive Features

// ===== GLOBAL VARIABLES =====
let cart = [];
let squareCard;

// ===== INITIALIZATION =====
function initSite() {
    if (window.__rockyCafeInitialized) {
        return;
    }

    window.__rockyCafeInitialized = true;
    initNavbar();
    initMenuTabs();
    initCartSystem();
    initCheckoutSystem();
    initContactForm();
    initSmoothScroll();
    initScrollAnimations();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSite);
} else {
    initSite();
}

// ===== NAVBAR =====
function initNavbar() {
    const navbarToggle = document.getElementById('navbarToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (navbarToggle) {
        navbarToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animate hamburger menu
            const spans = navbarToggle.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            if (navbarToggle) {
                const spans = navbarToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    });
    
    // Active link on scroll
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            
            if (scrollPos >= top && scrollPos < top + height) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

// ===== MENU TABS =====
function initMenuTabs() {
    const menuTabs = document.querySelectorAll('.menu-tab');
    
    menuTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all tabs
            menuTabs.forEach(t => t.classList.remove('active'));
            
            // Hide all tab content
            document.querySelectorAll('.menu-tab-content').forEach(content => {
                content.classList.remove('active');
            });
            
            // Activate clicked tab
            this.classList.add('active');
            
            // Show target content
            const targetContent = document.getElementById(targetTab + '-tab');
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
}

// ===== CART SYSTEM =====
function initCartSystem() {
    const cartButton = document.getElementById('cartButton');
    const cartModal = document.getElementById('cartModal');
    const closeCart = document.getElementById('closeCart');
    const addToCartButtons = document.querySelectorAll('.btn-add-cart');
    const checkoutBtn = document.getElementById('checkoutBtn');
    const doordashBtn = document.getElementById('doordashBtn');
    
    // Open cart modal
    if (cartButton) {
        cartButton.addEventListener('click', function() {
            cartModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    
    // Close cart modal
    if (closeCart) {
        closeCart.addEventListener('click', function() {
            cartModal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    
    // Close modal on outside click
    if (cartModal) {
        cartModal.addEventListener('click', function(e) {
            if (e.target === cartModal) {
                cartModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
    
    // Add to cart buttons
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const name = this.getAttribute('data-name');
            const price = parseFloat(this.getAttribute('data-price'));
            addToCart(name, price);
            
            // Visual feedback
            this.innerHTML = '<i class="fas fa-check"></i> Added';
            this.style.background = '#27ae60';
            
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-plus"></i> Add';
                this.style.background = '';
            }, 1000);
        });
    });
    
    // Checkout button
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            if (cart.length > 0) {
                cartModal.classList.remove('active');
                openCheckoutModal();
            }
        });
    }
    
    // DoorDash button
    if (doordashBtn) {
        doordashBtn.addEventListener('click', function() {
            if (cart.length > 0) {
                window.open('https://www.doordash.com/', '_blank');
            }
        });
    }
    
    updateCartUI();
}

function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }
    
    updateCartUI();
    updateCartCount();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
    updateCartCount();
}

window.removeFromCart = removeFromCart;

function updateCartUI() {
    const cartItems = document.getElementById('cartItems');
    const cartSubtotal = document.getElementById('cartSubtotal');
    const cartTax = document.getElementById('cartTax');
    const cartTotal = document.getElementById('cartTotal');
    const checkoutBtn = document.getElementById('checkoutBtn');
    const doordashBtn = document.getElementById('doordashBtn');
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        if (checkoutBtn) checkoutBtn.disabled = true;
        if (doordashBtn) doordashBtn.disabled = true;
        cartSubtotal.textContent = '$0.00';
        cartTax.textContent = '$0.00';
        cartTotal.textContent = '$0.00';
        return;
    }
    
    let html = '';
    cart.forEach((item, index) => {
        html += `
            <div class="cart-item">
                <div class="cart-item-info">
                    <span class="cart-item-name">${item.name}</span>
                    <span class="cart-item-qty">${item.quantity} × $${item.price.toFixed(2)}</span>
                </div>
                <button class="cart-item-remove" onclick="removeFromCart(${index})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
    });
    
    cartItems.innerHTML = html;
    
    // Calculate totals
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.07;
    const total = subtotal + tax;
    
    cartSubtotal.textContent = '$' + subtotal.toFixed(2);
    cartTax.textContent = '$' + tax.toFixed(2);
    cartTotal.textContent = '$' + total.toFixed(2);
    
    if (checkoutBtn) checkoutBtn.disabled = false;
    if (doordashBtn) doordashBtn.disabled = false;
}

function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    if (cartCount) {
        cartCount.textContent = totalItems;
        cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
    }
}

// ===== CHECKOUT SYSTEM =====
function initCheckoutSystem() {
    const closeCheckout = document.getElementById('closeCheckout');
    const checkoutModal = document.getElementById('checkoutModal');
    const orderTypeBtns = document.querySelectorAll('.order-type-btn');
    const pickupForm = document.getElementById('pickupForm');
    const doordashForm = document.getElementById('doordashForm');
    const backToCart = document.getElementById('backToCart');
    
    // Close checkout modal
    if (closeCheckout) {
        closeCheckout.addEventListener('click', function() {
            checkoutModal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    
    // Close modal on outside click
    if (checkoutModal) {
        checkoutModal.addEventListener('click', function(e) {
            if (e.target === checkoutModal) {
                checkoutModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
    
    // Order type selection
    orderTypeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const type = this.getAttribute('data-type');
            
            orderTypeBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            if (type === 'pickup') {
                pickupForm.classList.remove('hidden');
                doordashForm.classList.add('hidden');
            } else {
                pickupForm.classList.add('hidden');
                doordashForm.classList.remove('hidden');
            }
        });
    });
    
    // Back to cart
    if (backToCart) {
        backToCart.addEventListener('click', function(e) {
            e.preventDefault();
            checkoutModal.classList.remove('active');
            document.getElementById('cartModal').classList.add('active');
        });
    }
    
    // Pickup form submission
    if (pickupForm) {
        pickupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // In a real implementation, this would process the Square payment
            alert('Thank you for your order! In a real implementation, this would process your payment through Square.');
            
            // Clear cart and close modal
            cart = [];
            updateCartUI();
            updateCartCount();
            checkoutModal.classList.remove('active');
            document.body.style.overflow = '';
            this.reset();
        });
    }
    
    updateCheckoutSummary();
}

function openCheckoutModal() {
    const checkoutModal = document.getElementById('checkoutModal');
    updateCheckoutSummary();
    checkoutModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function updateCheckoutSummary() {
    const checkoutItems = document.getElementById('checkoutItems');
    const checkoutTotal = document.getElementById('checkoutTotal');
    const doordashItems = document.getElementById('doordashItems');
    const doordashTotal = document.getElementById('doordashTotal');
    
    if (cart.length === 0) return;
    
    let html = '';
    cart.forEach(item => {
        html += `
            <div class="summary-item">
                <span>${item.name} × ${item.quantity}</span>
                <span>$${(item.price * item.quantity).toFixed(2)}</span>
            </div>
        `;
    });
    
    if (checkoutItems) checkoutItems.innerHTML = html;
    if (doordashItems) doordashItems.innerHTML = html;
    
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.07;
    const total = subtotal + tax;
    
    const totalText = '$' + total.toFixed(2);
    if (checkoutTotal) checkoutTotal.textContent = totalText;
    if (doordashTotal) doordashTotal.textContent = totalText;
}

// ===== CONTACT FORM =====
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('contact-name').value.trim();
            const email = document.getElementById('contact-email').value.trim();
            const phone = document.getElementById('contact-phone').value.trim();
            const message = document.getElementById('contact-message').value.trim();
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
            
            // Simulate form submission
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
    if (!element) return;
    
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
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href !== '#') {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    const navHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = target.offsetTop - navHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
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
    
    // Observe elements for animation
    const elementsToAnimate = document.querySelectorAll(
        '.menu-item, .feature-card, .review-card, .info-card, .gallery-item'
    );
    
    elementsToAnimate.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });
}

// ===== KEYBOARD ACCESSIBILITY =====
document.addEventListener('keydown', function(e) {
    // Close modals with Escape key
    if (e.key === 'Escape') {
        const cartModal = document.getElementById('cartModal');
        const checkoutModal = document.getElementById('checkoutModal');
        
        if (checkoutModal.classList.contains('active')) {
            checkoutModal.classList.remove('active');
            document.body.style.overflow = '';
        } else if (cartModal.classList.contains('active')) {
            cartModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
});

// ===== DEBUGGING =====
console.log('🏔️ Rocky Mountain Cafe Website Loaded');
console.log('📱 Responsive Design Active');
console.log('🛒 Cart System Ready');
console.log('☕ Enjoying some code with your coffee?');