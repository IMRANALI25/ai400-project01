# Performance Optimization Techniques

## Critical Rendering Path Optimization

### Critical CSS Inline

```html
<style>
    /* Inline critical above-the-fold CSS */
    body { margin: 0; font-family: system-ui, sans-serif; }
    .header { position: fixed; top: 0; width: 100%; }
    .hero { padding: 100px 20px; text-align: center; }
</style>

<!-- Load rest of CSS asynchronously -->
<link rel="preload" href="assets/css/main.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="assets/css/main.css"></noscript>
```

### Defer Non-Critical JavaScript

```html
<!-- Defer script execution until after HTML parsing -->
<script src="assets/js/main.js" defer></script>

<!-- Async for independent scripts -->
<script src="assets/js/analytics.js" async></script>
```

## Image Optimization

### Modern Image Formats

```html
<!-- WebP with fallback -->
<picture>
    <source srcset="image.webp" type="image/webp">
    <source srcset="image.jpg" type="image/jpeg">
    <img src="image.jpg" alt="Description" loading="lazy">
</picture>
```

### Responsive Images

```html
<img
    src="image-800.jpg"
    srcset="image-400.jpg 400w,
            image-800.jpg 800w,
            image-1200.jpg 1200w,
            image-1600.jpg 1600w"
    sizes="(max-width: 600px) 400px,
           (max-width: 1200px) 800px,
           1200px"
    alt="Responsive image"
    loading="lazy"
>
```

### Lazy Loading

```html
<!-- Native lazy loading -->
<img src="image.jpg" loading="lazy" alt="Description">

<!-- Intersection Observer for advanced lazy loading -->
<script>
class LazyLoader {
    constructor(options = {}) {
        this.options = {
            rootMargin: '50px',
            threshold: 0.1,
            ...options
        };
        this.init();
    }

    init() {
        if ('IntersectionObserver' in window) {
            this.observer = new IntersectionObserver(
                this.handleIntersect.bind(this),
                this.options
            );

            document.querySelectorAll('img[data-src]').forEach(img => {
                this.observer.observe(img);
            });
        } else {
            // Fallback for older browsers
            this.loadAllImages();
        }
    }

    handleIntersect(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                this.loadImage(img);
                this.observer.unobserve(img);
            }
        });
    }

    loadImage(img) {
        const src = img.dataset.src;
        const srcset = img.dataset.srcset;

        if (src) img.src = src;
        if (srcset) img.srcset = srcset;

        img.addEventListener('load', () => {
            img.classList.add('loaded');
        });
    }

    loadAllImages() {
        document.querySelectorAll('img[data-src]').forEach(img => {
            this.loadImage(img);
        });
    }
}

// Initialize
const lazyLoader = new LazyLoader();
</script>
```

## Code Splitting

### Dynamic Imports (ES6 Modules)

```javascript
// Load module on demand
button.addEventListener('click', async () => {
    const { heavyComponent } = await import('./heavy-component.js');
    heavyComponent.init();
});

// Route-based splitting
async function loadRoute(route) {
    switch(route) {
        case 'home':
            const home = await import('./routes/home.js');
            return home.default;
        case 'about':
            const about = await import('./routes/about.js');
            return about.default;
        default:
            const notFound = await import('./routes/not-found.js');
            return notFound.default;
    }
}
```

## Caching Strategies

### Service Worker for Caching

```javascript
// service-worker.js
const CACHE_NAME = 'v1';
const urlsToCache = [
    '/',
    '/assets/css/main.css',
    '/assets/js/main.js',
    '/assets/images/logo.png'
];

// Install event
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );
});

// Fetch event
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Cache hit - return response
                if (response) {
                    return response;
                }

                // Clone the request
                const fetchRequest = event.request.clone();

                return fetch(fetchRequest).then(response => {
                    // Check if valid response
                    if (!response || response.status !== 200 || response.type !== 'basic') {
                        return response;
                    }

                    // Clone the response
                    const responseToCache = response.clone();

                    caches.open(CACHE_NAME)
                        .then(cache => {
                            cache.put(event.request, responseToCache);
                        });

                    return response;
                });
            })
    );
});

// Register service worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
        .then(registration => {
            console.log('ServiceWorker registered:', registration);
        })
        .catch(error => {
            console.log('ServiceWorker registration failed:', error);
        });
}
```

### Browser Caching Headers

```apache
# Apache .htaccess
# Cache images
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/webp "access plus 1 year"
    ExpiresByType image/svg+xml "access plus 1 year"
    ExpiresByType image/x-icon "access plus 1 year"

    # Cache CSS and JavaScript
    ExpiresByType text/css "access plus 1 month"
    ExpiresByType application/javascript "access plus 1 month"

    # Cache fonts
    ExpiresByType font/ttf "access plus 1 year"
    ExpiresByType font/woff "access plus 1 year"
    ExpiresByType font/woff2 "access plus 1 year"
</IfModule>

# Enable compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript
</IfModule>
```

```nginx
# Nginx
# Cache configuration
location ~* \.(jpg|jpeg|png|gif|webp|svg|ico)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}

location ~* \.(css|js)$ {
    expires 1m;
    add_header Cache-Control "public";
}

# Gzip compression
gzip on;
gzip_types text/html text/plain text/css text/javascript application/javascript application/json;
gzip_min_length 1000;
```

## Resource Hints

### Preconnect and DNS Prefetch

```html
<!-- Preconnect to important origins -->
<link rel="preconnect" href="https://cdn.jsdelivr.net">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

<!-- DNS prefetch for less critical origins -->
<link rel="dns-prefetch" href="https://analytics.example.com">
<link rel="dns-prefetch" href="https://api.example.com">

<!-- Preload critical resources -->
<link rel="preload" href="assets/css/main.css" as="style">
<link rel="preload" href="assets/js/main.js" as="script">
<link rel="preload" href="assets/fonts/main.woff2" as="font" crossorigin>
```

## Font Loading Optimization

```html
<!-- Preload critical font -->
<link rel="preload" href="assets/fonts/main.woff2" as="font" crossorigin>

<!-- Font display strategy -->
<style>
@font-face {
    font-family: 'CustomFont';
    src: url('assets/fonts/main.woff2') format('woff2');
    font-weight: 400;
    font-style: normal;
    font-display: swap; /* or optional, fallback, block */
}
</style>

<!-- Async font loading for Google Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet">
```

## CSS Optimization

### Minify and Optimize

```bash
# Build tools
npm install --save-dev postcss cssnano autoprefixer

# postcss.config.js
module.exports = {
    plugins: [
        require('autoprefixer'),
        require('cssnano')
    ]
}
```

### Remove Unused CSS

```javascript
// Use PurgeCSS with build tools
// Removes unused CSS classes from production builds

const PurgeCSS = require('@fullhuman/postcss-purgecss')({
    content: ['./**/*.html'],
    defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
    css: ['./assets/css/main.css'],
    output: './assets/css/main.purged.css'
});
```

### CSS Containment

```css
/* Isolate component rendering */
.card {
    contain: layout style paint;
}

/* Optimize animations */
.animated-element {
    contain: layout style paint;
    will-change: transform;
    transform: translateZ(0); /* Force GPU acceleration */
}
```

## JavaScript Optimization

### Debounce and Throttle

```javascript
// Debounce for search, resize
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

// Throttle for scroll events
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

// Usage
window.addEventListener('resize', debounce(handleResize, 250));
window.addEventListener('scroll', throttle(handleScroll, 100));
```

### RequestAnimationFrame for Animations

```javascript
// Use RAF for smooth animations
function animate() {
    // Animation logic
    element.style.transform = `translateX(${position}px)`;
    requestAnimationFrame(animate);
}

// Start animation
requestAnimationFrame(animate);
```

### Code Minification

```javascript
// Use minification tools for production
// - Terser for JavaScript
// - UglifyJS for older projects
// - Rollup, Webpack, or Parcel for bundling

// Example: Terser
const { minify } = require('terser');

const code = `
    function hello(name) {
        console.log('Hello, ' + name);
    }
`;

minify(code).then(result => {
    console.log(result.code); // Minified output
});
```

## Network Optimization

### HTTP/2 Server Push

```apache
# Apache with HTTP/2
H2Push on

<FilesMatch "\.css$">
    Header add Link "</assets/css/main.css>; rel=preload; as=style"
</FilesMatch>
```

### Bundle Size Optimization

```javascript
// Tree shaking - remove unused code
// export functions instead of entire objects
export function doSomething() {}
export function doSomethingElse() {}

// Import only what you need
import { doSomething } from './utils.js';

// Avoid large libraries for simple tasks
// Instead of lodash, use native methods
const array = [1, 2, 3];
const doubled = array.map(x => x * 2); // Instead of _.map
```

## Performance Monitoring

### Web Vitals Measurement

```javascript
// Measure Core Web Vitals
function measureWebVitals() {
    // Largest Contentful Paint (LCP)
    new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        console.log('LCP:', lastEntry.renderTime || lastEntry.loadTime);
    }).observe({ entryTypes: ['largest-contentful-paint'] });

    // First Input Delay (FID)
    new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
            console.log('FID:', entry.processingStart - entry.startTime);
        }
    }).observe({ entryTypes: ['first-input'] });

    // Cumulative Layout Shift (CLS)
    let clsValue = 0;
    new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
            if (!entry.hadRecentInput) {
                clsValue += entry.value;
                console.log('CLS:', clsValue);
            }
        }
    }).observe({ entryTypes: ['layout-shift'] });
}

measureWebVitals();
```

### Custom Performance Metrics

```javascript
// Measure page load time
window.addEventListener('load', () => {
    const perfData = performance.timing;
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
    const connectTime = perfData.responseEnd - perfData.requestStart;
    const renderTime = perfData.domComplete - perfData.responseEnd;

    console.log('Page Load Time:', pageLoadTime);
    console.log('Connect Time:', connectTime);
    console.log('Render Time:', renderTime);
});

// Measure custom timing
performance.mark('myOperationStart');
// ... do operation ...
performance.mark('myOperationEnd');
performance.measure('myOperation', 'myOperationStart', 'myOperationEnd');

const measure = performance.getEntriesByName('myOperation')[0];
console.log('Operation Duration:', measure.duration);
```

## Performance Checklist

### Page Speed

- [ ] LCP (Largest Contentful Paint) < 2.5s
- [ ] FID (First Input Delay) < 100ms
- [ ] CLS (Cumulative Layout Shift) < 0.1
- [ ] First Contentful Paint < 1.8s
- [ ] Time to Interactive < 3.8s
- [ ] Speed Index < 3.4s

### Optimization Tasks

- [ ] Minify CSS and JavaScript
- [ ] Optimize images (WebP, lazy loading)
- [ ] Enable compression (Gzip/Brotli)
- [ ] Implement browser caching
- [ ] Use CDN for static assets
- [ ] Remove unused CSS
- [ ] Defer non-critical JavaScript
- [ ] Implement service worker
- [ ] Optimize font loading
- [ ] Minimize HTTP requests
- [ ] Reduce DOM size
- [ ] Avoid excessive DOM manipulations
- [ ] Use CSS animations instead of JavaScript
- [ ] Implement virtual scrolling for long lists
- [ ] Use Web Workers for heavy computations

### Best Practices

1. **Measure first** - Use Lighthouse and WebPageTest
2. **Optimize critical rendering path** - Inline critical CSS
3. **Lazy load everything possible** - Images, components, routes
4. **Minimize main thread work** - Use Web Workers
5. **Cache aggressively** - Service workers, browser caching
6. **Optimize images** - Modern formats, responsive images
7. **Minimize JavaScript** - Tree shaking, code splitting
8. **Use efficient CSS selectors** - Avoid deep nesting
9. **Implement resource hints** - Preload, preconnect
10. **Monitor performance** - Web Vitals, RUM (Real User Monitoring)
