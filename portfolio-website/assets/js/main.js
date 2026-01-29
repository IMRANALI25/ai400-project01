/**
 * Main JavaScript File
 * Portfolio Website - Enterprise-grade functionality
 */

(function() {
    'use strict';

    // ===================================
    // Configuration
    // ===================================
    const CONFIG = {
        scrollThreshold: 50,
        animationThreshold: 0.1,
        smoothScroll: true,
        navbarDarkOnScroll: true
    };

    // ===================================
    // DOM Elements
    // ===================================
    const DOM = {
        navbar: document.querySelector('.navbar'),
        header: document.querySelector('.header'),
        animatedElements: document.querySelectorAll('[data-animate]'),
        navLinks: document.querySelectorAll('.nav-link'),
        forms: document.querySelectorAll('form')
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
            DOM.header.style.background = 'rgba(15, 23, 42, 0.98)';
        } else {
            DOM.header.classList.remove('scrolled');
            DOM.header.style.background = 'rgba(15, 23, 42, 0.95)';
        }
    }

    /**
     * Smooth scroll to anchor
     */
    function smoothScrollToAnchor(event) {
        const targetId = event.target.getAttribute('href');

        if (!targetId || targetId === '#' || targetId.startsWith('http')) {
            return;
        }

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            event.preventDefault();
            const offsetTop = targetElement.offsetTop - 70;
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
                    {
                        threshold: this.threshold,
                        rootMargin: '0px 0px -50px 0px'
                    }
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
                    element.classList.add('animated');
                    element.style.opacity = '1';
                    this.observer.unobserve(element);
                }
            });
        }
    }

    // ===================================
    // Parallax Effect
    // ===================================

    /**
     * Add parallax effect to hero section
     */
    class ParallaxEffect {
        constructor(element, speed = 0.5) {
            this.element = element;
            this.speed = speed;
            this.init();
        }

        init() {
            if (!this.element) return;

            window.addEventListener('scroll', throttle(() => {
                const scrolled = window.scrollY;
                const yPos = -(scrolled * this.speed);
                this.element.style.transform = `translateY(${yPos}px)`;
            }, 16));
        }
    }

    // ===================================
    // Typing Effect
    // ===================================

    /**
     * Typing animation for text
     */
    class TypingEffect {
        constructor(element, words, wait = 3000) {
            this.element = element;
            this.words = words;
            this.wait = wait;
            this.wordIndex = 0;
            this.txt = '';
            this.isDeleting = false;
            this.init();
        }

        init() {
            if (!this.element) return;
            this.type();
        }

        type() {
            const current = this.wordIndex % this.words.length;
            const fullTxt = this.words[current];

            if (this.isDeleting) {
                this.txt = fullTxt.substring(0, this.txt.length - 1);
            } else {
                this.txt = fullTxt.substring(0, this.txt.length + 1);
            }

            this.element.innerHTML = this.txt;

            let typeSpeed = 100;

            if (this.isDeleting) {
                typeSpeed /= 2;
            }

            if (!this.isDeleting && this.txt === fullTxt) {
                typeSpeed = this.wait;
                this.isDeleting = true;
            } else if (this.isDeleting && this.txt === '') {
                this.isDeleting = false;
                this.wordIndex++;
                typeSpeed = 500;
            }

            setTimeout(() => this.type(), typeSpeed);
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

            if (rules.required && !field.value.trim()) {
                isValid = false;
                errorMessage = rules.message || 'This field is required';
            }

            if (isValid && rules.email && field.value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(field.value)) {
                    isValid = false;
                    errorMessage = rules.message || 'Please enter a valid email';
                }
            }

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
                    feedbackElement.style.display = 'block';
                }
            } else {
                field.classList.remove('is-invalid');
                field.classList.add('is-valid');
                if (feedbackElement) {
                    feedbackElement.style.display = 'none';
                }
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
                console.log('Form data:', data);
                this.showSuccessMessage();
            }
        }

        showSuccessMessage() {
            const alert = document.createElement('div');
            alert.className = 'alert alert-success alert-dismissible fade show';
            alert.style.background = 'var(--primary-color)';
            alert.style.color = 'white';
            alert.style.border = 'none';
            alert.innerHTML = `
                Message sent successfully!
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            `;
            this.form.before(alert);
            this.form.reset();

            setTimeout(() => {
                alert.remove();
            }, 5000);
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

        // Page visibility change
        document.addEventListener('visibilitychange', handleVisibilityChange);
    }

    /**
     * Handle window resize
     */
    function handleResize() {
        // Close mobile menu if open
        const navbarCollapse = document.querySelector('.navbar-collapse');
        if (navbarCollapse && navbarCollapse.classList.contains('show')) {
            const bsCollapse = new bootstrap.Collapse(navbarCollapse);
            bsCollapse.hide();
        }
    }

    /**
     * Handle page visibility change (pause animations when tab not visible)
     */
    function handleVisibilityChange() {
        if (document.hidden) {
            // Pause animations
        } else {
            // Resume animations
        }
    }

    // ===================================
    // Preloader
    // ===================================

    /**
     * Hide preloader when page is loaded
     */
    function hidePreloader() {
        const preloader = document.querySelector('.preloader');
        if (preloader) {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 300);
        }
    }

    // ===================================
    // Initialize Application
    // ===================================

    /**
     * Initialize all components
     */
    function init() {
        // Hide preloader
        hidePreloader();

        // Initialize event listeners
        initEventListeners();

        // Initialize scroll animations
        const scrollAnimator = new ScrollAnimator();

        // Initialize parallax effect on hero
        const hero = document.querySelector('.hero');
        if (hero) {
            new ParallaxEffect(hero, 0.5);
        }

        // Initialize form validators
        DOM.forms.forEach(form => {
            const validator = new FormValidator(form);
            validator.addField('name', { required: true, minLength: 2 });
            validator.addField('email', { required: true, email: true });
            validator.addField('message', { required: true, minLength: 10 });
        });

        // Initial navbar state
        handleNavbarScroll();

        console.log('Portfolio website initialized successfully');
    }

    // Run initialization when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // ===================================
    // Public API
    // ===================================
    window.PortfolioAPI = {
        scrollTo: (element) => {
            const target = typeof element === 'string'
                ? document.querySelector(element)
                : element;
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        },
        animateElement: (element) => {
            if (typeof element === 'string') {
                element = document.querySelector(element);
            }
            if (element) {
                element.classList.add('animated');
                element.style.opacity = '1';
            }
        }
    };

})();
