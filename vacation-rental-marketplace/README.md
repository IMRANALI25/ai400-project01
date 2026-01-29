# StayConnect - Vacation Rental Marketplace

A complete vacation rental marketplace website inspired by Airbnb, featuring property listings, advanced search, booking system, and interactive maps.

## 🌟 Features

### Core Functionality
- **Advanced Search System**
  - Location-based search
  - Date range picker
  - Guest count filter
  - Price range filtering
  - Property type filtering
  - Rating-based filtering

- **Property Listings**
  - Grid and list view options
  - Beautiful card-based layout
  - Quick filters (Beachfront, Cabins, Luxury, Unique, Urban)
  - Favorite/save functionality
  - Real-time filtering

- **Property Detail Pages**
  - Image gallery with lightbox
  - Detailed property information
  - Host profile and reviews
  - Amenities list
  - Interactive location map
  - Booking system with calendar

- **Booking System**
  - Date selection
  - Guest count
  - Price calculation
  - Confirmation modal
  - Service fee calculation

- **Interactive Maps**
  - Leaflet.js integration
  - OpenStreetMap tiles
  - Property markers with popups
  - Click-to-view functionality

- **User Features**
  - Save favorites (localStorage)
  - Account dropdown menu
  - Responsive navigation
  - Mobile-optimized design

### Design & UX
- **Modern Blue Theme** (#0066CC) - Professional and trustworthy
- **Responsive Design** - Mobile-first approach
- **Smooth Animations** - Micro-interactions and transitions
- **Clean UI** - Card-based layouts with shadows
- **Accessibility** - WCAG 2.1 AA compliant

### Technical Features
- **SEO Optimized** - Meta tags, Open Graph, structured data
- **Performance** - Lazy loading, optimized assets
- **Security** - Input validation, XSS prevention
- **Cross-browser** - Works on all modern browsers

## 📁 Project Structure

```
vacation-rental-marketplace/
├── index.html                      # Homepage
├── assets/
│   ├── css/
│   │   └── main.css                # Main stylesheet
│   ├── js/
│   │   ├── main.js                 # Homepage functionality
│   │   └── property-detail.js      # Property page functionality
│   └── images/
│       ├── optimized/              # Optimized images
│       ├── properties/             # Property images
│       └── favicon/                # Favicons
├── pages/
│   ├── property/
│   │   └── property-detail.html    # Property detail page
│   └── user/
│       ├── login.html              # Login page (to be created)
│       ├── signup.html             # Signup page (to be created)
│       └── dashboard.html          # User dashboard (to be created)
└── README.md                       # This file
```

## 🚀 Getting Started

### 1. Setup

The project is ready to use as-is. No build process required!

```bash
# Navigate to project directory
cd vacation-rental-marketplace

# Start a local server
python -m http.server 8000
```

Then open: http://localhost:8000

### 2. Customize Content

**Update Homepage (`index.html`):**
- Change "StayConnect" branding to your name
- Update property listings
- Modify destinations
- Add your contact information

**Update Styling (`assets/css/main.css`):**
- Change primary color: `--primary-color: #0066CC`
- Adjust animations and transitions
- Modify responsive breakpoints

**Update JavaScript (`assets/js/main.js`):**
- Add Google Analytics tracking
- Configure API endpoints
- Customize property data

### 3. Add Property Images

Place images in `assets/images/properties/`:
- `property-1.jpg` through `property-6.jpg` for listings
- `property-1-2.jpg`, `property-1-3.jpg`, etc. for gallery images
- Recommended size: 1200x800px for listings
- Format: JPG or WebP

## 🎨 Customization

### Change Colors

Edit `assets/css/main.css` (line 8):
```css
:root {
    --primary-color: #0066CC;      /* Your color */
    --primary-dark: #004080;       /* Darker shade */
}
```

### Add Properties

In `index.html`, duplicate a property card div and update:
- Image src
- Title
- Location
- Price
- Rating
- Amenities
- Link to detail page

### Modify Search Filters

Edit filter selects in `index.html`:
- Price ranges
- Property types
- Rating options
- Amenities

## 🔧 Features to Implement (Future Enhancements)

### Authentication
- User registration/login
- Social login (Google, Facebook)
- Password reset
- Email verification

### User Dashboard
- Booking history
- Saved properties
- Profile management
- Payment methods

### Host Features
- List new properties
- Edit property details
- Calendar management
- Booking requests
- Earnings dashboard

### Advanced Features
- Real-time availability
- Instant book
- Messaging system
- Reviews and ratings
- Payment integration (Stripe)
- Smart pricing
- Discount codes

### Admin Panel
- User management
- Property approval
- Booking management
- Analytics dashboard
- Payment processing

## 📱 Testing

### Test Locally
```bash
# Start server
python -m http.server 8000

# Or with Node.js
npx serve .
```

### Test Checklist
- [ ] Search functionality works
- [ ] Filters apply correctly
- [ ] Property cards display properly
- [ ] Favorites save/load
- [ ] Map shows markers
- [ ] Booking form validates
- [ ] Responsive design works
- [ ] All links work

## 🌐 Deployment

### Option 1: Netlify (Easiest)
1. Go to netlify.com
2. Drag and drop the `vacation-rental-marketplace` folder
3. Done!

### Option 2: GitHub Pages
1. Push to GitHub repository
2. Enable GitHub Pages in settings
3. Select main branch
4. Done!

### Option 3: Vercel
1. Go to vercel.com
2. Import Git repository
3. Deploy automatically

### Custom Domain
1. Buy domain from registrar
2. Update DNS records
3. Update sitemap and meta tags
4. Enable SSL certificate

## 🔒 Security Considerations

### Client-Side
- Input validation
- XSS prevention
- CSRF tokens
- HTTPS only

### Server-Side (When Implementing Backend)
- Password hashing (bcrypt)
- JWT tokens
- Rate limiting
- SQL injection prevention
- File upload validation

## 📊 Performance Optimization

### Images
- Use WebP format
- Compress images
- Lazy loading
- Responsive images

### Code
- Minify CSS/JS
- Remove unused code
- Defer non-critical JS
- Use CDN for libraries

### Server
- Enable gzip compression
- Browser caching
- CDN delivery
- HTTP/2

## 🎓 Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Custom properties, Grid, Flexbox, Animations
- **JavaScript (ES6+)** - Modules, fetch API, DOM
- **Bootstrap5** - Component library
- **TailwindCSS** - Utility framework
- **Leaflet.js** - Interactive maps
- **OpenStreetMap** - Map tiles
- **Font Awesome** - Icons

## 📖 API Integration (To Be Implemented)

### Required APIs

**Map Service:**
- Currently using: OpenStreetMap (free)
- Alternative: Google Maps API (paid)

**Payment Processing:**
- Stripe
- PayPal
- Braintree

**Email Service:**
- SendGrid
- Mailgun
- AWS SES

**Authentication:**
- Firebase Auth
- Auth0
- Custom JWT

## 🐛 Troubleshooting

### Images Not Loading
- Check file paths are correct
- Verify images exist in directory
- Clear browser cache

### Map Not Showing
- Check internet connection
- Verify Leaflet CSS/JS are loaded
- Check browser console for errors

### Filters Not Working
- Clear browser cache
- Check JavaScript console for errors
- Verify data attributes on property cards

### Booking Form Issues
- Check date inputs have values
- Verify form validation
- Check JavaScript console

## 📝 License

This project is provided as-is for educational purposes.

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📞 Support

For questions or issues:
1. Check this README
2. Review code comments
3. Check browser console for errors

---

**Version:** 1.0.0
**Last Updated:** January 2024
**Status:** Production Ready (Frontend Only)

**Note:** This is a frontend-only implementation. To make it fully functional, you'll need to add a backend server, database, and payment processing.