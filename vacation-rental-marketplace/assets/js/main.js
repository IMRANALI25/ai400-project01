/**
 * StayConnect - Vacation Rental Marketplace
 * Main JavaScript - Search, Filters, Maps, and Interactivity
 */

(function() {
    'use strict';

    // DOM Elements
    const navbar = document.getElementById('mainNav');
    const searchForm = document.getElementById('searchForm');
    const propertyCards = document.querySelectorAll('.property-card');
    const favoriteBtns = document.querySelectorAll('.favorite-btn');
    const filterBtns = document.querySelectorAll('.btn-filter');
    const priceFilter = document.getElementById('priceFilter');
    const typeFilter = document.getElementById('typeFilter');
    const ratingFilter = document.getElementById('ratingFilter');
    const amenitiesFilter = document.getElementById('amenitiesFilter');
    const gridViewBtn = document.getElementById('gridViewBtn');
    const listViewBtn = document.getElementById('listViewBtn');
    const propertiesGrid = document.getElementById('propertiesGrid');
    const loadMoreBtn = document.getElementById('loadMoreBtn');

    // Toast notifications
    const addedToast = new bootstrap.Toast(document.getElementById('addedToFavoritesToast'));
    const removedToast = new bootstrap.Toast(document.getElementById('removedFromFavoritesToast'));

    // State management
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    let currentView = 'grid';

    // ==========================================
    // Navigation
    // ==========================================

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ==========================================
    // Search Form
    // ==========================================

    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const location = document.getElementById('searchLocation').value;
        const checkIn = document.getElementById('searchCheckIn').value;
        const checkOut = document.getElementById('searchCheckOut').value;
        const guests = document.getElementById('searchGuests').value;

        // Store search parameters
        const searchParams = {
            location,
            checkIn,
            checkOut,
            guests
        };

        localStorage.setItem('searchParams', JSON.stringify(searchParams));

        // Show loading state
        this.classList.add('loading');

        // Simulate search
        setTimeout(() => {
            this.classList.remove('loading');
            filterProperties(searchParams);

            // Scroll to properties section
            document.getElementById('explore').scrollIntoView({ behavior: 'smooth' });
        }, 500);
    });

    // ==========================================
    // Property Filtering
    // ==========================================

    function filterProperties(searchParams = {}) {
        propertyCards.forEach(card => {
            let show = true;

            // Search parameters
            if (searchParams.location) {
                const location = card.querySelector('.card-text').textContent.toLowerCase();
                if (!location.includes(searchParams.location.toLowerCase())) {
                    show = false;
                }
            }

            // Price filter
            const priceValue = priceFilter.value;
            if (priceValue) {
                const price = parseInt(card.dataset.price);
                if (priceValue === '500+') {
                    if (price < 500) show = false;
                } else {
                    const [min, max] = priceValue.split('-').map(Number);
                    if (price < min || price > max) show = false;
                }
            }

            // Type filter
            const typeValue = typeFilter.value;
            if (typeValue && card.dataset.type !== typeValue) {
                show = false;
            }

            // Rating filter
            const ratingValue = ratingFilter.value;
            if (ratingValue) {
                const rating = parseFloat(card.querySelector('.rating span').textContent);
                if (rating < parseInt(ratingValue)) show = false;
            }

            // Category filter
            if (window.activeCategory && window.activeCategory !== 'all') {
                if (card.dataset.category !== window.activeCategory) {
                    show = false;
                }
            }

            // Show or hide card
            if (show) {
                card.style.display = '';
                card.style.animation = 'fadeIn 0.5s ease-out';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Filter event listeners
    priceFilter.addEventListener('change', () => filterProperties());
    typeFilter.addEventListener('change', () => filterProperties());
    ratingFilter.addEventListener('change', () => filterProperties());

    // Quick category filters
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            window.activeCategory = this.dataset.category;
            filterProperties();
        });
    });

    // ==========================================
    // Favorites Functionality
    // ==========================================

    // Initialize favorite buttons
    function initializeFavorites() {
        favoriteBtns.forEach(btn => {
            const card = btn.closest('.property-card');
            const propertyId = card.querySelector('a').href.split('id=')[1];

            if (favorites.includes(propertyId)) {
                btn.classList.add('active');
                btn.innerHTML = '<i class="fas fa-heart"></i>';
            }
        });
    }

    // Favorite button click handlers
    favoriteBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();

            const card = this.closest('.property-card');
            const propertyId = card.querySelector('a').href.split('id=')[1];
            const propertyTitle = card.querySelector('.card-title').textContent;

            if (favorites.includes(propertyId)) {
                // Remove from favorites
                favorites = favorites.filter(id => id !== propertyId);
                this.classList.remove('active');
                this.innerHTML = '<i class="far fa-heart"></i>';
                removedToast.show();
            } else {
                // Add to favorites
                favorites.push(propertyId);
                this.classList.add('active');
                this.innerHTML = '<i class="fas fa-heart"></i>';
                addedToast.show();
            }

            // Save to localStorage
            localStorage.setItem('favorites', JSON.stringify(favorites));
        });
    });

    initializeFavorites();

    // ==========================================
    // Grid/List View Toggle
    // ==========================================

    gridViewBtn.addEventListener('click', function() {
        if (currentView !== 'grid') {
            currentView = 'grid';
            this.classList.add('active');
            listViewBtn.classList.remove('active');

            propertiesGrid.classList.remove('list-view');
            propertyCards.forEach(card => {
                card.classList.remove('col-12');
                card.classList.add('col-md-6', 'col-lg-4');
            });
        }
    });

    listViewBtn.addEventListener('click', function() {
        if (currentView !== 'list') {
            currentView = 'list';
            this.classList.add('active');
            gridViewBtn.classList.remove('active');

            propertiesGrid.classList.add('list-view');
            propertyCards.forEach(card => {
                card.classList.remove('col-md-6', 'col-lg-4');
                card.classList.add('col-12');
            });
        }
    });

    // ==========================================
    // Map Initialization
    // ==========================================

    const map = L.map('map').setView([20, 0], 2);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 18
    }).addTo(map);

    // Sample property locations
    const propertyLocations = [
        { id: 1, lat: 34.0259, lng: -118.7798, title: 'Ocean View Paradise', price: 150 },
        { id: 2, lat: 43.7711, lng: 11.2486, title: 'Tuscany Luxury Villa', price: 280 },
        { id: 3, lat: 39.1911, lng: -106.8175, title: 'Cozy Mountain Retreat', price: 95 },
        { id: 4, lat: -8.4095, lng: 115.1889, title: 'Enchanted Treehouse', price: 200 },
        { id: 5, lat: 40.7128, lng: -74.0060, title: 'Modern City Loft', price: 175 },
        { id: 6, lat: 21.7796, lng: -71.9986, title: 'Caribbean Beach Villa', price: 350 }
    ];

    // Add markers
    propertyLocations.forEach(property => {
        const marker = L.marker([property.lat, property.lng]).addTo(map);
        const popupContent = `
            <div style="min-width: 200px;">
                <h6 style="font-weight: 600; margin-bottom: 5px;">${property.title}</h6>
                <p style="margin-bottom: 5px;">$${property.price} / night</p>
                <a href="pages/property/property-detail.html?id=${property.id}" class="btn btn-sm btn-primary" style="background-color: #0066CC; border: none; color: white;">View Details</a>
            </div>
        `;
        marker.bindPopup(popupContent);
    });

    // ==========================================
    // Load More Functionality
    // ==========================================

    let visibleProperties = 6;

    loadMoreBtn.addEventListener('click', function() {
        const hiddenCards = Array.from(propertyCards).filter(card =>
            card.style.display !== 'none' && !card.classList.contains('loaded')
        );

        if (hiddenCards.length > 0) {
            const cardsToShow = hiddenCards.slice(0, 3);
            cardsToShow.forEach(card => {
                card.classList.add('loaded');
                card.style.animation = 'fadeIn 0.6s ease-out';
            });

            if (hiddenCards.length <= 3) {
                this.style.display = 'none';
            }
        } else {
            this.style.display = 'none';
        }
    });

    // Mark initially visible properties
    propertyCards.forEach((card, index) => {
        if (index < visibleProperties) {
            card.classList.add('loaded');
        }
    });

    // ==========================================
    // Destination Cards Click Handler
    // ==========================================

    const destinationCards = document.querySelectorAll('.destination-card');
    destinationCards.forEach(card => {
        card.addEventListener('click', function() {
            const destination = this.querySelector('h3').textContent;
            document.getElementById('searchLocation').value = destination;
            document.getElementById('explore').scrollIntoView({ behavior: 'smooth' });
            filterProperties({ location: destination });
        });
    });

    // ==========================================
    // Smooth Scroll for Anchor Links
    // ==========================================

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            if (href !== '#' && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);

                if (target) {
                    const navbarHeight = navbar.offsetHeight;
                    const targetPosition = target.offsetTop - navbarHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // ==========================================
    // Form Validation Enhancement
    // ==========================================

    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            if (!this.checkValidity()) {
                e.preventDefault();
                e.stopPropagation();
            }
            this.classList.add('was-validated');
        });
    });

    // ==========================================
    // Date Input Enhancement
    // ==========================================

    const checkInInput = document.getElementById('searchCheckIn');
    const checkOutInput = document.getElementById('searchCheckOut');

    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    checkInInput.setAttribute('min', today);
    checkOutInput.setAttribute('min', today);

    // Update checkout minimum based on checkin
    checkInInput.addEventListener('change', function() {
        if (this.value) {
            checkOutInput.setAttribute('min', this.value);
        }
    });

    // ==========================================
    // Performance: Lazy Loading Images
    // ==========================================

    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.src = img.dataset.src || img.src;
        });
    } else {
        // Fallback for older browsers
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

        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }

    // ==========================================
    // Debounce Helper Function
    // ==========================================

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

    // ==========================================
    // Analytics Event Tracking
    // ==========================================

    function trackEvent(category, action, label) {
        console.log(`Event: ${category} - ${action} - ${label}`);
        // Send to analytics service
        // gtag('event', action, {
        //     'event_category': category,
        //     'event_label': label
        // });
    }

    // Track property views
    propertyCards.forEach(card => {
        card.addEventListener('click', () => {
            const title = card.querySelector('.card-title').textContent;
            trackEvent('Property', 'View', title);
        });
    });

    // Track searches
    searchForm.addEventListener('submit', () => {
        const location = document.getElementById('searchLocation').value;
        trackEvent('Search', 'Submit', location);
    });

    // ==========================================
    // Error Handling
    // ==========================================

    window.addEventListener('error', (e) => {
        console.error('JavaScript Error:', e.error);
    });

    window.addEventListener('unhandledrejection', (e) => {
        console.error('Unhandled Promise Rejection:', e.reason);
    });

    // ==========================================
    // Initialize on DOM Ready
    // ==========================================

    document.addEventListener('DOMContentLoaded', () => {
        console.log('StayConnect initialized');

        // Add loaded class
        document.body.classList.add('loaded');

        // Initialize favorites from localStorage
        initializeFavorites();

        // Mark initial properties as loaded
        propertyCards.forEach((card, index) => {
            if (index < 6) {
                card.classList.add('loaded');
            }
        });

        // Restore search parameters if available
        const savedSearchParams = localStorage.getItem('searchParams');
        if (savedSearchParams) {
            const params = JSON.parse(savedSearchParams);
            document.getElementById('searchLocation').value = params.location || '';
            document.getElementById('searchCheckIn').value = params.checkIn || '';
            document.getElementById('searchCheckOut').value = params.checkOut || '';
            document.getElementById('searchGuests').value = params.guests || '2';
        }
    });

    // ==========================================
    // Service Worker Registration (Optional)
    // ==========================================

    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            // Uncomment when service worker is implemented
            // navigator.serviceWorker.register('/sw.js')
            //     .then(registration => console.log('SW registered'))
            //     .catch(error => console.log('SW registration failed'));
        });
    }

})();
