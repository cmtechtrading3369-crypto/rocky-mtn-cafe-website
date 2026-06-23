// Rocky Mountain Cafe - Interactive Features

// ===== GLOBAL VARIABLES =====
let cart = [];

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    initNavbar();
    initMenuTabs();
    initTeaPricing();
    initCartSystem();
    initCheckoutSystem();
    initContactForm();
    initNewsletterForm();
    initSmoothScroll();
    initScrollAnimations();
    initHeroSlideshow();
    initThemeToggle();
    initLazyLoading();
});

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
            
            // Remove active class from all tabs and update ARIA attributes
            menuTabs.forEach(t => {
                t.classList.remove('active');
                t.setAttribute('aria-selected', 'false');
            });
            
            // Hide all tab content
            document.querySelectorAll('.menu-tab-content').forEach(content => {
                content.classList.remove('active');
            });
            
            // Activate clicked tab and update ARIA
            this.classList.add('active');
            this.setAttribute('aria-selected', 'true');
            
            // Show target content
            const targetContent = document.getElementById(targetTab + '-tab');
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
}

// ===== TEA PRICING =====
function initTeaPricing() {
    const teaTab = document.getElementById('tea-tab');
    if (!teaTab) return;

    const selects = teaTab.querySelectorAll('.flavor-select');
    selects.forEach(select => {
        const updatePrice = () => {
            const menuItem = select.closest('.menu-item');
            if (!menuItem) return;

            const priceEl = menuItem.querySelector('.price');
            const addBtn = menuItem.querySelector('.btn-add-cart');
            const value = select.value;
            const text = select.options[select.selectedIndex].text;

            let price = null;
            const match = text.match(/\$(\d+(?:\.\d+)?)/);
            if (match) {
                price = parseFloat(match[1]);
            }

            if (priceEl && price !== null) {
                priceEl.textContent = '$' + price.toFixed(price % 1 === 0 ? 0 : 2);
            }
            if (addBtn && price !== null) {
                addBtn.setAttribute('data-price', price);
            }
        };

        select.addEventListener('change', updatePrice);
        updatePrice();
    });
}

// ===== CART SYSTEM =====
function initCartSystem() {
    const cartButton = document.getElementById('cartButton');
    const cartButtonMobile = document.getElementById('cartButtonMobile');
    const cartModal = document.getElementById('cartModal');
    const closeCart = document.getElementById('closeCart');
    const addToCartButtons = document.querySelectorAll('.btn-add-cart');
    const checkoutBtn = document.getElementById('checkoutBtn');
    const doordashBtn = document.getElementById('doordashBtn');

    // Open cart modal (desktop)
    if (cartButton) {
        cartButton.addEventListener('click', function() {
            cartModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    // Open cart modal (mobile)
    if (cartButtonMobile) {
        cartButtonMobile.addEventListener('click', function() {
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
            const menuItem = this.closest('.menu-item');
            const flavorSelect = menuItem ? menuItem.querySelector('.flavor-select') : null;
            const selectedFlavor = flavorSelect ? flavorSelect.value : null;
            const cartName = selectedFlavor && selectedFlavor !== 'Regular' ? name + ' (' + selectedFlavor + ')' : name;
            addToCart(cartName, price);

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
        pickupForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            const submitBtn = pickupForm.querySelector('button[type="submit"]');
            const originalText = submitBtn ? submitBtn.textContent : '';
            if (submitBtn) {
                submitBtn.textContent = 'Redirecting to payment...';
                submitBtn.disabled = true;
            }

            const customerName = document.getElementById('customer-name').value.trim();
            const customerPhone = document.getElementById('customer-phone').value.trim();
            const pickupTime = document.getElementById('pickup-time').value;

            if (!customerName || !customerPhone || !pickupTime) {
                alert('Please fill in all fields');
                if (submitBtn) {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }
                return;
            }

            const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            const tax = subtotal * 0.07;
            const total = subtotal + tax;

            const requestData = {
                items: cart.map(item => ({
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity
                })),
                total: total.toFixed(2),
                customer: {
                    name: customerName,
                    phone: customerPhone,
                    pickup_time: pickupTime
                }
            };

            try {
                const response = await fetch('/api/create-checkout', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(requestData)
                });

                const data = await response.json();

                if (!response.ok || !data.checkoutUrl) {
                    throw new Error(data.error || data.details || 'Failed to create checkout');
                }

                // Clear cart before leaving
                cart = [];
                updateCartUI();
                updateCartCount();

                // Redirect to Square hosted checkout
                window.location.href = data.checkoutUrl;
            } catch (err) {
                console.error('Checkout error:', err);
                alert('Payment setup failed. Please try again or call us directly.\n\n(' + err.message + ')');
                if (submitBtn) {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }
            }
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

// ===== NEWSLETTER FORM =====
function initNewsletterForm() {
    const newsletterForm = document.getElementById('newsletterForm');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('newsletter-email').value.trim();
            const newsletterStatus = document.getElementById('newsletterStatus');
            
            // Validation
            if (!email || !isValidEmail(email)) {
                showFormStatus('Please enter a valid email address', 'error', newsletterStatus);
                return;
            }
            
            // Track newsletter signup in GA4
            if (typeof gtag !== 'undefined') {
                gtag('event', 'newsletter_signup', {
                    'email_domain': email.split('@')[1]
                });
            }
            
            // Show success message
            showFormStatus('✓ Successfully subscribed! Check your email for a welcome offer.', 'success', newsletterStatus);
            
            // Clear form
            setTimeout(() => {
                newsletterForm.reset();
                newsletterStatus.style.display = 'none';
            }, 3000);
        });
    }
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

// ===== LAZY LOADING =====
function initLazyLoading() {
    // Support for native lazy loading attribute
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        img.classList.add('lazy-loaded');
                    }
                    observer.unobserve(img);
                }
            });
        });
        
        // Observe all images with data-src attribute
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
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

// ===== HERO SLIDESHOW =====
function initHeroSlideshow() {
    // Slideshow disabled - using static hero image
    // To re-enable, uncomment the code below
    /*
    const hero = document.querySelector('.hero');
    if (!hero) return;

    const defaultImage = 'images/IMG_4567.png';
    const heroImages = [
        defaultImage,
        'images/IMG_6439.jpeg',
        'images/IMG_6440.jpeg',
        'images/IMG_6441.jpeg',
        'images/IMG_6442.jpeg',
        'images/IMG_6423.jpeg',
        'images/IMG_6429.jpeg',
        'images/IMG_6430.jpeg',
        'images/IMG_6434.jpeg',
        'images/IMG_6435.jpeg',
        'images/IMG_6436.jpeg',
        'images/IMG_6437.jpeg',
        'images/IMG_6438.jpeg'
    ];

    let currentIndex = 0;
    let cycleCount = 0;
    let imagesShownInCycle = 0;

    // Set initial background to default image
    hero.style.backgroundImage = `url('${defaultImage}')`;

    function changeBackgroundImage() {
        currentIndex = (currentIndex + 1) % heroImages.length;
        hero.style.backgroundImage = `url('${heroImages[currentIndex]}')`;

        imagesShownInCycle++;

        // Check if we've completed a full cycle
        if (imagesShownInCycle >= heroImages.length) {
            cycleCount++;
            imagesShownInCycle = 0;

            // After 2 full cycles, reset to default image
            if (cycleCount >= 2) {
                currentIndex = 0;
                cycleCount = 0;
                hero.style.backgroundImage = `url('${defaultImage}')`;
            }
        }
    }

    // Change image every 3 seconds
    setInterval(changeBackgroundImage, 3000);
    */
}

// ===== THEME TOGGLE =====
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;

    // Check for saved theme preference or default to light
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        const icon = themeToggle.querySelector('i');
        if (theme === 'dark') {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    }
}

// ===== DEBUGGING =====
console.log('🏔️ Rocky Mountain Cafe Website Loaded');
console.log('📱 Responsive Design Active');
console.log('🛒 Cart System Ready');
console.log('☕ Enjoying some code with your coffee?');

// ===== SERVICE WORKER REGISTRATION =====
function initServiceWorker() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
            navigator.serviceWorker.register('service-worker.js')
                .then(registration => {
                    console.log('✓ Service Worker registered successfully:', registration.scope);
                    
                    // Check for updates periodically
                    setInterval(() => {
                        registration.update();
                    }, 60000); // Check every minute
                })
                .catch(error => {
                    console.log('⚠️ Service Worker registration failed:', error);
                });

            // Listen for controller change (new service worker activated)
            navigator.serviceWorker.addEventListener('controllerchange', () => {
                console.log('🔄 Service Worker updated');
                showOfflineIndicator('Updated to latest version', 'success', 2000);
            });
        });

        // Handle offline/online status
        window.addEventListener('online', () => {
            console.log('📡 Back online!');
            document.body.classList.remove('offline');
            showOfflineIndicator('You are online', 'online', 2000);
        });

        window.addEventListener('offline', () => {
            console.log('📡 You are offline');
            document.body.classList.add('offline');
            showOfflineIndicator('You are offline - Using cached data', 'error', 0);
        });

        // Check initial online status
        if (!navigator.onLine) {
            document.body.classList.add('offline');
            showOfflineIndicator('You are offline - Using cached data', 'error', 0);
        }
    }
}

function showOfflineIndicator(message, type, duration) {
    let indicator = document.getElementById('offlineIndicator');
    
    if (!indicator) {
        indicator = document.createElement('div');
        indicator.id = 'offlineIndicator';
        indicator.className = 'offline-indicator';
        document.body.appendChild(indicator);
    }

    let icon = 'fa-wifi-slash';
    if (type === 'online') icon = 'fa-wifi';
    if (type === 'success') icon = 'fa-check-circle';

    indicator.innerHTML = `<i class="fas ${icon}"></i> <span>${message}</span>`;
    indicator.className = `offline-indicator show ${type}`;

    if (duration > 0) {
        setTimeout(() => {
            indicator.classList.remove('show');
        }, duration);
    }
}

// Initialize service worker on page load
document.addEventListener('DOMContentLoaded', initServiceWorker);