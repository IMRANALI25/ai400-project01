/**
 * Main JavaScript File
 * Enterprise-grade vanilla JavaScript for website functionality
 */

(function() {
    'use strict';

    // ===================================
    // Configuration
    // ===================================
    const CONFIG = {
        scrollThreshold: 50,
        animationThreshold: 0.1,
        formValidation: true,
        smoothScroll: true
    };

    // ===================================
    // DOM Elements
    // ===================================
    const DOM = {
        navbar: document.querySelector('.navbar'),
        header: document.querySelector('.header'),
        animatedElements: document.querySelectorAll('[data-animate]'),
        contactForm: document.querySelector('#contact-form'),
        navLinks: document.querySelectorAll('.nav-link')
    };

    // ===================================
    // Utility Functions
    // ===================================

    /**
     * Debounce function to limit execution rate
     */
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    /**
     * Throttle function to limit execution rate
     */
    function throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // ===================================
    // Navigation
    // ===================================

    /**
     * Handle navbar scroll effect
     */
    function handleNavbarScroll() {
        if (window.scrollY > CONFIG.scrollThreshold) {
            DOM.header.classList.add('scrolled');
        } else {
            DOM.header.classList.remove('scrolled');
        }
    }

    /**
     * Smooth scroll to anchor
     */
    function smoothScrollToAnchor(event) {
        if (!CONFIG.smoothScroll) return;

        const targetId = event.target.getAttribute('href');
        if (!targetId || targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            event.preventDefault();
            const offsetTop = targetElement.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }

    /**
     * Update active nav link based on scroll position
     */
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.scrollY;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                DOM.navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // ===================================
    // Animations
    // ===================================

    /**
     * Scroll animation observer
     */
    class ScrollAnimator {
        constructor(threshold = CONFIG.animationThreshold) {
            this.threshold = threshold;
            this.init();
        }

        init() {
            if ('IntersectionObserver' in window) {
                this.observer = new IntersectionObserver(
                    this.handleIntersect.bind(this),
                    { threshold: this.threshold }
                );

                DOM.animatedElements.forEach(element => {
                    this.observer.observe(element);
                });
            } else {
                // Fallback for older browsers
                DOM.animatedElements.forEach(element => {
                    element.style.opacity = '1';
                });
            }
        }

        handleIntersect(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    element.style.opacity = '1';
                    this.observer.unobserve(element);
                }
            });
        }
    }

    // ===================================
    // Form Handling
    // ===================================

    /**
     * Form validator class
     */
    class FormValidator {
        constructor(formElement) {
            this.form = formElement;
            this.validators = {};
            this.init();
        }

        init() {
            if (!this.form) return;

            this.form.addEventListener('submit', this.handleSubmit.bind(this));
            this.form.addEventListener('input', this.handleInput.bind(this));
        }

        addField(fieldName, rules) {
            this.validators[fieldName] = rules;
        }

        handleInput(event) {
            const field = event.target;
            this.validateField(field);
        }

        validateField(field) {
            const fieldName = field.name;
            const rules = this.validators[fieldName];

            if (!rules) return true;

            let isValid = true;
            let errorMessage = '';

            // Required validation
            if (rules.required && !field.value.trim()) {
                isValid = false;
                errorMessage = rules.message || 'This field is required';
            }

            // Email validation
            if (isValid && rules.email && field.value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(field.value)) {
                    isValid = false;
                    errorMessage = rules.message || 'Please enter a valid email';
                }
            }

            // Min length validation
            if (isValid && rules.minLength && field.value.length < rules.minLength) {
                isValid = false;
                errorMessage = rules.message || `Minimum ${rules.minLength} characters required`;
            }

            this.updateFieldStatus(field, isValid, errorMessage);
            return isValid;
        }

        updateFieldStatus(field, isValid, errorMessage) {
            const feedbackElement = field.parentElement.querySelector('.invalid-feedback');

            if (!isValid) {
                field.classList.add('is-invalid');
                field.classList.remove('is-valid');
                if (feedbackElement) {
                    feedbackElement.textContent = errorMessage;
                }
            } else {
                field.classList.remove('is-invalid');
                field.classList.add('is-valid');
            }
        }

        validate() {
            let isFormValid = true;
            const fields = this.form.querySelectorAll('input, textarea, select');

            fields.forEach(field => {
                if (!this.validateField(field)) {
                    isFormValid = false;
                }
            });

            return isFormValid;
        }

        handleSubmit(event) {
            event.preventDefault();

            if (this.validate()) {
                const formData = new FormData(this.form);
                const data = Object.fromEntries(formData.entries());
                console.log('Form is valid:', data);
                // Submit form data to server
                // this.submitForm(data);
            }
        }

        async submitForm(data) {
            try {
                const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                if (response.ok) {
                    this.showSuccessMessage();
                } else {
                    this.showErrorMessage();
                }
            } catch (error) {
                console.error('Form submission error:', error);
                this.showErrorMessage();
            }
        }

        showSuccessMessage() {
            const alert = document.createElement('div');
            alert.className = 'alert alert-success alert-dismissible fade show';
            alert.innerHTML = `
                Message sent successfully!
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            `;
            this.form.before(alert);
            this.form.reset();
        }

        showErrorMessage() {
            const alert = document.createElement('div');
            alert.className = 'alert alert-danger alert-dismissible fade show';
            alert.innerHTML = `
                Error sending message. Please try again.
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            `;
            this.form.before(alert);
        }
    }

    // ===================================
    // Event Listeners
    // ===================================

    /**
     * Initialize event listeners
     */
    function initEventListeners() {
        // Scroll events
        window.addEventListener('scroll', throttle(handleNavbarScroll, 100));
        window.addEventListener('scroll', throttle(updateActiveNavLink, 100));

        // Nav link clicks
        DOM.navLinks.forEach(link => {
            link.addEventListener('click', smoothScrollToAnchor);
        });

        // Window resize
        window.addEventListener('resize', debounce(handleResize, 250));
    }

    /**
     * Handle window resize
     */
    function handleResize() {
        // Close mobile menu if open
        const navbarCollapse = document.querySelector('.navbar-collapse');
        if (navbarCollapse.classList.contains('show')) {
            const bsCollapse = new bootstrap.Collapse(navbarCollapse);
            bsCollapse.hide();
        }
    }

    // ===================================
    // Initialize Application
    // ===================================

    /**
     * Initialize all components
     */
    function init() {
        // Initialize event listeners
        initEventListeners();

        // Initialize scroll animations
        const scrollAnimator = new ScrollAnimator();

        // Initialize form validator if form exists
        if (CONFIG.formValidation && DOM.contactForm) {
            const validator = new FormValidator(DOM.contactForm);
            validator.addField('name', { required: true, minLength: 2 });
            validator.addField('email', { required: true, email: true });
            validator.addField('message', { required: true, minLength: 10 });
        }

        // Initial navbar state
        handleNavbarScroll();

        console.log('Website initialized successfully');
    }

    // Run initialization when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // ===================================
    // Public API (optional)
    // ===================================
    window.WebsiteAPI = {
        scrollTo: (element) => {
            const target = typeof element === 'string'
                ? document.querySelector(element)
                : element;
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        },
        getViewportWidth: () => window.innerWidth,
        getViewportHeight: () => window.innerHeight
    };

})();
