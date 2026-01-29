/**
 * StayConnect - Property Detail Page
 * Booking system, gallery, and map functionality
 */

(function() {
    'use strict';

    // Property data (would normally come from API)
    const propertyData = {
        id: 1,
        title: 'Ocean View Paradise',
        pricePerNight: 150,
        cleaningFee: 50,
        serviceFeeRate: 0.13,
        location: {
            lat: 34.0259,
            lng: -118.7798
        }
    };

    // ==========================================
    // Image Gallery
    // ==========================================

    window.changeMainImage = function(src) {
        document.getElementById('mainImage').src = src;
    };

    window.showAllImages = function() {
        alert('Image gallery modal would open here showing all property photos');
    };

    // ==========================================
    // Booking Form
    // ==========================================

    const bookingForm = document.getElementById('bookingForm');
    const checkInInput = document.getElementById('checkInDate');
    const checkOutInput = document.getElementById('checkOutDate');
    const guestsSelect = document.getElementById('guestsSelect');
    const bookingModal = new bootstrap.Modal(document.getElementById('bookingModal'));
    const confirmBookingBtn = document.getElementById('confirmBookingBtn');

    // Set minimum dates
    const today = new Date().toISOString().split('T')[0];
    checkInInput.setAttribute('min', today);
    checkOutInput.setAttribute('min', today);

    // Update checkout minimum based on checkin
    checkInInput.addEventListener('change', function() {
        if (this.value) {
            checkOutInput.setAttribute('min', this.value);
            // Update price breakdown
            updatePriceBreakdown();
        }
    });

    checkOutInput.addEventListener('change', updatePriceBreakdown);

    function updatePriceBreakdown() {
        const checkIn = new Date(checkInInput.value);
        const checkOut = new Date(checkOutInput.value);

        if (checkIn && checkOut && checkOut > checkIn) {
            const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
            const subtotal = nights * propertyData.pricePerNight;
            const serviceFee = Math.round(subtotal * propertyData.serviceFeeRate);
            const total = subtotal + propertyData.cleaningFee + serviceFee;

            // Update display (in a real app, these would update DOM elements)
            console.log(`Nights: ${nights}, Total: $${total}`);
        }
    }

    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const checkIn = checkInInput.value;
        const checkOut = checkOutInput.value;
        const guests = guestsSelect.value;

        if (!checkIn || !checkOut) {
            alert('Please select check-in and check-out dates');
            return;
        }

        const checkInDate = new Date(checkIn);
        const checkOutDate = new Date(checkOut);

        if (checkOutDate <= checkInDate) {
            alert('Check-out date must be after check-in date');
            return;
        }

        // Calculate nights and total
        const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
        const subtotal = nights * propertyData.pricePerNight;
        const serviceFee = Math.round(subtotal * propertyData.serviceFeeRate);
        const total = subtotal + propertyData.cleaningFee + serviceFee;

        // Update modal
        document.getElementById('modalDates').textContent = `${checkIn} - ${checkOut}`;
        document.getElementById('modalGuests').textContent = `${guests} guest${guests > 1 ? 's' : ''}`;
        document.getElementById('modalTotal').textContent = `$${total}`;

        // Show confirmation modal
        bookingModal.show();
    });

    // Confirm booking
    confirmBookingBtn.addEventListener('click', function() {
        // Simulate booking process
        this.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Processing...';
        this.disabled = true;

        setTimeout(() => {
            alert('Booking confirmed! Check your email for confirmation details.');
            bookingModal.hide();
            this.innerHTML = 'Confirm & Pay';
            this.disabled = false;

            // Redirect to dashboard or show success page
            // window.location.href = '../user/dashboard.html';
        }, 2000);
    });

    // ==========================================
    // Save Property
    // ==========================================

    const savePropertyBtn = document.getElementById('savePropertyBtn');
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    if (favorites.includes(propertyData.id.toString())) {
        savePropertyBtn.innerHTML = '<i class="fas fa-heart me-1"></i>Saved';
        savePropertyBtn.classList.add('active');
    }

    savePropertyBtn.addEventListener('click', function() {
        const propertyId = propertyData.id.toString();

        if (favorites.includes(propertyId)) {
            favorites = favorites.filter(id => id !== propertyId);
            this.innerHTML = '<i class="far fa-heart me-1"></i>Save';
            this.classList.remove('active');
        } else {
            favorites.push(propertyId);
            this.innerHTML = '<i class="fas fa-heart me-1"></i>Saved';
            this.classList.add('active');
        }

        localStorage.setItem('favorites', JSON.stringify(favorites));
    });

    // ==========================================
    // Map
    // ==========================================

    const map = L.map('propertyMap').setView([propertyData.location.lat, propertyData.location.lng], 14);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    const marker = L.marker([propertyData.location.lat, propertyData.location.lng])
        .addTo(map)
        .bindPopup('<strong>Ocean View Paradise</strong><br>Malibu, California');

    // ==========================================
    // Initialize
    // ==========================================

    document.addEventListener('DOMContentLoaded', () => {
        console.log('Property detail page loaded');
    });

})();
