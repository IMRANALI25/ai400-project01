---
name: web-site-creator-skill
description: Generate Enterprise-Level Architecture Websites with HTML5, Vanilla JavaScript, CSS3, Bootstrap5, and TailwindCSS. Use when Claude needs to create complete website structures with enterprise-grade features including scalability, security, performance optimization, and modern UI/UX with animations. This skill handles portfolio sites, organizational websites, e-commerce platforms, and other web applications without using React, NextJS, Vue, or similar frameworks.
---

# Web Site Creator Skill

## Overview

Generate enterprise-level architecture websites using pure HTML5, Vanilla JavaScript, CSS3, Bootstrap5, and TailwindCSS. Create scalable, secure, high-performance websites with modern animated UI/UX, responsive design, and comprehensive architecture.

## Discovery Phase

Before implementation, gather essential requirements from the user:

1. **Purpose**: What type of website is needed?
   - Portfolio website
   - Organization/Corporate website
   - E-commerce platform
   - Blog/Content site
   - SaaS landing page
   - Dashboard/Admin panel
   - Other: [specify]

2. **Page Structure**:
   - How many main pages are required?
   - How many detail pages for each main page?
   - Any special pages (contact, about, services, etc.)?

3. **Design Preferences**:
   - Color scheme preferences
   - Brand guidelines or assets (logos, fonts)
   - Animation preferences (subtle, moderate, heavy)
   - Mobile-first or desktop-first approach

4. **Enterprise Requirements**:
   - Expected traffic/load
   - Security requirements (authentication, data protection)
   - Integration needs (APIs, third-party services)
   - CMS requirements (static, dynamic, headless)

## Architecture Planning

### Enterprise-Level Characteristics

Implement these critical features in every website:

**1. Scalability**
- Modular CSS/JS architecture
- Component-based HTML structure
- Lazy loading for images and content
- Optimized asset delivery
- Database design for growth (if applicable)

**2. High Availability & Reliability**
- CDN integration for static assets
- Optimistic UI updates
- Graceful degradation
- Error boundary handling
- Service worker for offline capability (optional)

**3. Security (Enterprise Grade)**
- Content Security Policy (CSP) headers
- XSS prevention (sanitize user inputs)
- CSRF protection for forms
- HTTPS enforcement
- Secure cookie handling
- Input validation and sanitization
- OWASP Top 10 compliance

**4. Performance Optimization**
- Minified CSS and JS
- Image optimization (WebP, lazy loading)
- Critical CSS inline
- Async/defer script loading
- Browser caching strategies
- Gzip/Brotli compression
- Code splitting for JS

**5. Robust Architecture**
```
project-structure/
├── index.html
├── assets/
│   ├── css/
│   │   ├── main.css
│   │   ├── bootstrap.min.css
│   │   └── tailwind.css
│   ├── js/
│   │   ├── main.js
│   │   ├── components/
│   │   └── utils/
│   ├── images/
│   │   ├── favicon/
│   │   └── optimized/
│   └── fonts/
├── pages/ (if multi-page site)
└── config/
```

**6. Content & Workflow Management**
- Static site generation considerations
- CMS integration patterns
- Content workflow structures
- Metadata management
- SEO optimization (meta tags, structured data)

**7. Integration Capabilities**
- RESTful API integration patterns
- Third-party service hooks (analytics, payment, maps)
- Webhook handling
- OAuth/Authentication setup
- Database connectivity

**8. Data Management**
- Local storage strategies
- Session management
- Form data handling
- State management (Vanilla JS patterns)
- Data validation layers

**9. DevOps & CI/CD**
- Deployment scripts
- Environment configuration
- Build automation (if needed)
- Version control structure
- CI/CD pipeline recommendations

**10. Monitoring & Observability**
- Error tracking integration (Sentry, LogRocket)
- Analytics setup (Google Analytics, Plausible)
- Performance monitoring (Lighthouse, Web Vitals)
- Logging strategies
- Uptime monitoring

## Implementation Workflow

### Phase 1: Setup & Structure

Create the project directory structure following the architecture pattern above.

### Phase 2: HTML Foundation

Build semantic HTML5 with:
- Proper document structure (`<!DOCTYPE html>`, `<html>`, `<head>`, `<body>`)
- Meta tags for SEO, viewport, charset
- Accessibility attributes (ARIA labels, alt text)
- Semantic elements (`<header>`, `<nav>`, `<main>`, `<article>`, `<footer>`)
- Open Graph and Twitter Card meta tags

### Phase 3: UI Components

Generate modern, animated UI components:

**Navigation & Menus**
- Responsive navbar (mobile hamburger menu)
- Mega menus for complex sites
- Sticky header on scroll
- Smooth scroll navigation
- Breadcrumbs for navigation hierarchy

**Toolbars & Action Bars**
- Context-aware toolbars
- Sticky action bars
- Quick action buttons
- Search functionality
- User account controls

**Animations & Transitions**
- Page transition animations
- Scroll-triggered animations (fade-in, slide-up)
- Hover effects (cards, buttons, links)
- Loading animations (skeleton screens, spinners)
- Micro-interactions (button clicks, form feedback)
- Parallax effects (where appropriate)
- Smooth scrolling (CSS `scroll-behavior: smooth`)

**Modern UI Elements**
- Card-based layouts
- Hero sections with CTAs
- Testimonial carousels
- Feature grids
- Image galleries with lightbox
- Modal dialogs
- Toast notifications
- Dropdown menus
- Accordion/FAQ sections
- Tab interfaces
- Progress indicators
- Data tables with sorting/filtering

### Phase 4: Styling (Bootstrap5 + TailwindCSS)

Implement responsive design:
- Mobile-first approach
- Breakpoint system (576px, 768px, 992px, 1200px, 1400px)
- Grid layouts (Bootstrap grid or Tailwind grid)
- Utility-first styling (Tailwind)
- Custom CSS for animations and special components
- Dark mode support (optional)

### Phase 5: JavaScript Functionality

Write modular Vanilla JavaScript:
- IIFE or ES6 modules for encapsulation
- Event delegation for dynamic content
- Debounced/throttled event handlers
- Local storage for preferences
- Form validation and submission
- AJAX/fetch for API calls
- DOM manipulation helpers
- Component initialization system

### Phase 6: Enterprise Features

Implement enterprise-grade capabilities:
- Authentication (if required)
- Authorization patterns
- Error handling and logging
- Performance monitoring hooks
- Analytics integration
- SEO optimization (sitemap, robots.txt, structured data)
- Security headers and policies
- Service worker for offline support

## Technology Stack

**Core Technologies:**
- HTML5 (semantic markup, forms, APIs)
- Vanilla JavaScript (ES6+, modules, fetch API, DOM)
- CSS3 (Grid, Flexbox, Custom Properties, Animations)

**Frameworks & Libraries:**
- Bootstrap5 (component library, grid system)
- TailwindCSS (utility-first CSS framework)
- Optional: Alpine.js for lightweight reactivity

**Build Tools (if needed):**
- PostCSS for CSS processing
- Autoprefixer for browser compatibility
- Image optimization tools (squoosh, sharp)

**CDN Resources:**
- Bootstrap5 CSS/JS
- TailwindCSS CDN
- Font Awesome (icons)
- Google Fonts

## Security Best Practices

1. **XSS Prevention**
   - Sanitize all user inputs
   - Use `textContent` instead of `innerHTML` when possible
   - Implement Content Security Policy

2. **CSRF Protection**
   - Use anti-CSRF tokens for forms
   - Validate origin and referrer headers
   - SameSite cookie attribute

3. **HTTPS Only**
   - Redirect HTTP to HTTPS
   - HSTS headers
   - Secure cookie flags

4. **Input Validation**
   - Client-side validation for UX
   - Server-side validation for security
   - Whitelist approach for allowed inputs

## Performance Optimization Checklist

- [ ] Minify CSS and JavaScript
- [ ] Optimize images (WebP format, compression)
- [ ] Implement lazy loading for images
- [ ] Use async/defer for non-critical scripts
- [ ] Inline critical CSS
- [ ] Enable browser caching
- [ ] Use CDN for static assets
- [ ] Implement code splitting for JS
- [ ] Add preconnect/dns-prefetch for external resources
- [ ] Minimize HTTP requests
- [ ] Use system fonts or optimize web font loading
- [ ] Implement service worker for caching

## Accessibility (WCAG 2.1 AA)

- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Focus indicators
- Alt text for images
- Color contrast ratios (4.5:1 minimum)
- Screen reader compatibility
- Skip to main content link
- Form labels and error messages

## Testing & Deployment

### Testing Checklist
- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)
- [ ] Mobile responsiveness (iOS, Android)
- [ ] Accessibility audit (Lighthouse, axe)
- [ ] Performance audit (Lighthouse score >90)
- [ ] SEO audit
- [ ] Security scan (OWASP ZAP)
- [ ] Form validation testing
- [ ] API integration testing

### Deployment
- CI/CD pipeline setup
- Environment configuration (dev, staging, prod)
- SSL certificate installation
- CDN configuration
- DNS setup
- Backup strategy
- Monitoring setup

## Resources

### Scripts
- `build/` - Build automation scripts
- `deploy/` - Deployment scripts
- `optimize/` - Image/CSS/JS optimization tools

### References
- `html5-patterns.md` - HTML5 best practices and patterns
- `css-architecture.md` - Scalable CSS architecture
- `js-patterns.md` - Vanilla JavaScript design patterns
- `bootstrap-components.md` - Bootstrap5 component usage
- `tailwind-utilities.md` - TailwindCSS utility guide
- `security-checklist.md` - Security implementation checklist
- `performance-guide.md` - Performance optimization techniques

### Assets
- `templates/` - HTML page templates
- `themes/` - Pre-built theme variations
- `components/` - Reusable component snippets

## Example Outputs

Based on user requirements, generate appropriate website types:

**Portfolio Website**: Hero section, about, portfolio grid, services, contact, testimonials

**Organization Website**: Navigation, hero, about us, team, services/capabilities, projects, news, contact

**E-commerce**: Product catalog, product details, shopping cart, checkout, user account, order tracking

**SaaS Landing**: Hero with CTA, features, pricing, testimonials, FAQ, signup form

## Quality Standards

Every generated website must meet:
- Mobile-responsive design
- Fast page load (<3 seconds)
- SEO-optimized (meta tags, structured data)
- Accessible (WCAG 2.1 AA compliant)
- Secure (CSP, HTTPS, input sanitization)
- Cross-browser compatible
- Clean, maintainable code
- Well-documented structure
