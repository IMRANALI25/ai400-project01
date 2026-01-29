/**
 * Fashion Model Portfolio - Main JavaScript
 * Handles navigation, portfolio filtering, gallery lightbox, form validation, and animations
 */

(function() {
    'use strict';

    // ==========================================
    // DOM Elements
    // ==========================================

    const navbar = document.getElementById('mainNav');
    const navLinks = document.querySelectorAll('.nav-link-custom');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const contactForm = document.getElementById('contactForm');
    const lightboxModal = new bootstrap.Modal(document.getElementById('lightboxModal'));
    const lightboxImage = document.getElementById('lightboxImage');
    const viewGalleryBtns = document.querySelectorAll('.view-gallery');
    const prevImageBtn = document.getElementById('prevImage');
    const nextImageBtn = document.getElementById('nextImage');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    const successToast = new bootstrap.Toast(document.getElementById('successToast'));

    // ==========================================
    // Navigation & Scroll Effects
    // ==========================================

    // Navbar scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Add background on scroll
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Hide/show navbar on scroll
        if (currentScroll > lastScroll && currentScroll > 500) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }

        lastScroll = currentScroll;
    });

    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            if (href.startsWith('#') && href !== '#') {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    const navbarHeight = navbar.offsetHeight;
                    const targetPosition = targetElement.offsetTop - navbarHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });

                    // Close mobile menu if open
                    const navbarCollapse = document.getElementById('navbarNav');
                    if (navbarCollapse.classList.contains('show')) {
                        const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                        bsCollapse.hide();
                    }

                    // Update active link
                    navLinks.forEach(l => l.classList.remove('active'));
                    this.classList.add('active');
                }
            }
        });
    });

    // Active nav link on scroll
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', debounce(() => {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - navbar.offsetHeight - 100;
            const sectionId = section.getAttribute('id');
            const correspondingLink = document.querySelector(`.nav-link-custom[href="#${sectionId}"]`);

            if (correspondingLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    correspondingLink.classList.add('active');
                }
            }
        });
    }, 100));

    // ==========================================
    // Portfolio Filtering
    // ==========================================

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');

            // Filter items with animation
            portfolioItems.forEach((item, index) => {
                const itemCategory = item.getAttribute('data-category');

                // Add staggered animation delay
                item.style.transitionDelay = `${index * 50}ms`;

                if (filterValue === 'all' || itemCategory === filterValue) {
                    item.classList.remove('hidden');
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';

                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';

                    setTimeout(() => {
                        item.classList.add('hidden');
                    }, 300);
                }
            });
        });
    });

    // ==========================================
    // Portfolio Lightbox Gallery
    // ==========================================

    let currentImageIndex = 0;
    const portfolioImages = Array.from(portfolioItems).map(item => ({
        src: item.querySelector('.portfolio-image').src,
        title: item.querySelector('.portfolio-info h4').textContent,
        category: item.getAttribute('data-category')
    }));

    function openLightbox(index) {
        currentImageIndex = index;
        updateLightboxImage();
        lightboxModal.show();
    }

    function updateLightboxImage() {
        const image = portfolioImages[currentImageIndex];
        lightboxImage.src = image.src;
        lightboxImage.alt = image.title;
        document.getElementById('lightboxModalLabel').textContent = image.title;
    }

    function showNextImage() {
        currentImageIndex = (currentImageIndex + 1) % portfolioImages.length;
        updateLightboxImage();
    }

    function showPrevImage() {
        currentImageIndex = (currentImageIndex - 1 + portfolioImages.length) % portfolioImages.length;
        updateLightboxImage();
    }

    // View gallery button clicks
    viewGalleryBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const index = parseInt(this.getAttribute('data-index'));
            openLightbox(index);
        });
    });

    // Portfolio card clicks
    portfolioItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            openLightbox(index);
        });
    });

    // Lightbox navigation
    nextImageBtn.addEventListener('click', showNextImage);
    prevImageBtn.addEventListener('click', showPrevImage);

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (document.getElementById('lightboxModal').classList.contains('show')) {
            if (e.key === 'ArrowRight') {
                showNextImage();
            } else if (e.key === 'ArrowLeft') {
                showPrevImage();
            } else if (e.key === 'Escape') {
                lightboxModal.hide();
            }
        }
    });

    // ==========================================
    // Contact Form Validation & Submission
    // ==========================================

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Reset previous validation
            this.classList.remove('was-validated');
            const formData = new FormData(this);
            let isValid = true;

            // Custom validation
            const requiredFields = this.querySelectorAll('[required]');
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('is-invalid');
                } else {
                    field.classList.remove('is-invalid');
                }
            });

            // Email validation
            const emailField = this.querySelector('#email');
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailField.value && !emailPattern.test(emailField.value)) {
                isValid = false;
                emailField.classList.add('is-invalid');
            }

            // Privacy consent
            const privacyConsent = this.querySelector('#privacyConsent');
            if (!privacyConsent.checked) {
                isValid = false;
                privacyConsent.classList.add('is-invalid');
            }

            if (isValid) {
                // Simulate form submission
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';

                // Simulate API call
                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalText;

                    // Show success toast
                    successToast.show();

                    // Reset form
                    contactForm.reset();
                    this.classList.remove('was-validated');

                    // Log form data (in production, send to server)
                    console.log('Form submitted successfully:', Object.fromEntries(formData));
                }, 2000);
            } else {
                this.classList.add('was-validated');
            }
        });

        // Real-time validation feedback
        const formInputs = contactForm.querySelectorAll('input, textarea, select');
        formInputs.forEach(input => {
            input.addEventListener('blur', function() {
                if (this.hasAttribute('required') && !this.value.trim()) {
                    this.classList.add('is-invalid');
                } else if (this.type === 'email' && this.value) {
                    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailPattern.test(this.value)) {
                        this.classList.add('is-invalid');
                    } else {
                        this.classList.remove('is-invalid');
                        this.classList.add('is-valid');
                    }
                } else if (this.value.trim()) {
                    this.classList.remove('is-invalid');
                    this.classList.add('is-valid');
                }
            });

            input.addEventListener('input', function() {
                if (this.classList.contains('is-invalid') && this.value.trim()) {
                    this.classList.remove('is-invalid');
                }
            });
        });
    }

    // ==========================================
    // Scroll Reveal Animations
    // ==========================================

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: stop observing once revealed
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Add reveal class to elements
    const revealElements = document.querySelectorAll('.stat-card, .brand-card, .experience-card, .magazine-card, .portfolio-card');
    revealElements.forEach(el => {
        el.classList.add('reveal');
        observer.observe(el);
    });

    // ==========================================
    // Load More Functionality
    // ==========================================

    let itemsToShow = 6;
    const totalItems = portfolioItems.length;

    loadMoreBtn.addEventListener('click', function() {
        const hiddenItems = Array.from(portfolioItems).filter(item => item.classList.contains('hidden'));

        if (hiddenItems.length > 0) {
            // Show next batch of items
            const itemsToShowNow = hiddenItems.slice(0, 3);
            itemsToShowNow.forEach(item => {
                item.classList.remove('hidden');
                item.style.animation = 'fadeInUp 0.6s ease-out forwards';
            });

            // Hide button if no more items
            if (hiddenItems.length <= 3) {
                this.style.display = 'none';
            }
        } else {
            this.style.display = 'none';
        }
    });

    // ==========================================
    // Performance Optimization
    // ==========================================

    // Debounce function
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

    // Lazy loading images (native support with fallback)
    if ('loading' in HTMLImageElement.prototype) {
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        lazyImages.forEach(img => {
            img.src = img.dataset.src || img.src;
        });
    } else {
        // Fallback for browsers that don't support lazy loading
        const lazyImages = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    }

    // ==========================================
    // Analytics Integration (Placeholder)
    // ==========================================

    // Google Analytics (replace with your tracking ID)
    // function initGoogleAnalytics() {
    //     // Add your GA initialization code here
    //     console.log('Analytics initialized');
    // }

    // Track page views
    // initGoogleAnalytics();

    // Track events
    function trackEvent(category, action, label) {
        console.log(`Event: ${category} - ${action} - ${label}`);
        // In production, send to analytics service
        // gtag('event', action, {
        //     'event_category': category,
        //     'event_label': label
        // });
    }

    // Track portfolio filter clicks
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            trackEvent('Portfolio', 'Filter', filter);
        });
    });

    // Track contact form submissions
    if (contactForm) {
        contactForm.addEventListener('submit', () => {
            trackEvent('Contact', 'Submit', 'Contact Form');
        });
    }

    // ==========================================
    // Error Handling
    // ==========================================

    window.addEventListener('error', (e) => {
        console.error('JavaScript Error:', e.error);
        // In production, send error to error tracking service
        // Sentry.captureException(e.error);
    });

    // ==========================================
    // Initialize on DOM Ready
    // ==========================================

    document.addEventListener('DOMContentLoaded', () => {
        console.log('Fashion Model Portfolio initialized');

        // Add loaded class to body
        document.body.classList.add('loaded');

        // Initialize first filter as active
        if (filterBtns.length > 0) {
            filterBtns[0].classList.add('active');
        }

        // Smooth reveal for hero content
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            setTimeout(() => {
                heroContent.style.opacity = '1';
            }, 100);
        }
    });

    // ==========================================
    // Service Worker Registration (Offline Support)
    // ==========================================

    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            // Uncomment when service worker is implemented
            // navigator.serviceWorker.register('/sw.js')
            //     .then(registration => {
            //         console.log('ServiceWorker registered:', registration);
            //     })
            //     .catch(error => {
            //         console.log('ServiceWorker registration failed:', error);
            //     });
        });
    }

})();
