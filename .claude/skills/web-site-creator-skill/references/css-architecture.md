# Scalable CSS Architecture

## CSS Organization

### File Structure

```
assets/
└── css/
    ├── main.css           # Main stylesheet (imports all others)
    ├── base/              # Base styles
    │   ├── reset.css
    │   ├── typography.css
    │   └── variables.css
    ├── components/        # Reusable components
    │   ├── buttons.css
    │   ├── cards.css
    │   ├── forms.css
    │   └── navigation.css
    ├── layout/            # Layout styles
    │   ├── grid.css
    │   ├── header.css
    │   └── footer.css
    ├── pages/             # Page-specific styles
    │   ├── home.css
    │   └── about.css
    └── utilities/         # Utility classes
        └── helpers.css
```

### Main CSS File

```css
/* main.css */

/* Import base styles */
@import url('base/reset.css');
@import url('base/variables.css');
@import url('base/typography.css');

/* Import components */
@import url('components/buttons.css');
@import url('components/cards.css');
@import url('components/forms.css');
@import url('components/navigation.css');

/* Import layout */
@import url('layout/grid.css');
@import url('layout/header.css');
@import url('layout/footer.css');

/* Import pages */
@import url('pages/home.css');
@import url('pages/about.css');

/* Import utilities */
@import url('utilities/helpers.css');
```

## CSS Custom Properties (Variables)

### Theme Variables

```css
:root {
    /* Colors */
    --primary-color: #0066cc;
    --secondary-color: #6c757d;
    --success-color: #28a745;
    --danger-color: #dc3545;
    --warning-color: #ffc107;
    --info-color: #17a2b8;
    --light-color: #f8f9fa;
    --dark-color: #343a40;

    /* Text Colors */
    --text-primary: #212529;
    --text-secondary: #6c757d;
    --text-muted: #adb5bd;

    /* Backgrounds */
    --bg-primary: #ffffff;
    --bg-secondary: #f8f9fa;
    --bg-dark: #343a40;

    /* Spacing */
    --spacing-xs: 0.25rem;
    --spacing-sm: 0.5rem;
    --spacing-md: 1rem;
    --spacing-lg: 1.5rem;
    --spacing-xl: 2rem;
    --spacing-xxl: 3rem;

    /* Typography */
    --font-family-base: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    --font-size-base: 1rem;
    --font-size-sm: 0.875rem;
    --font-size-lg: 1.125rem;
    --font-size-xl: 1.25rem;
    --font-size-xxl: 1.5rem;

    /* Borders */
    --border-color: #dee2e6;
    --border-radius-sm: 0.2rem;
    --border-radius: 0.25rem;
    --border-radius-lg: 0.3rem;
    --border-radius-circle: 50%;

    /* Shadows */
    --shadow-sm: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
    --shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
    --shadow-lg: 0 1rem 3rem rgba(0, 0, 0, 0.175);

    /* Transitions */
    --transition-fast: 150ms ease-in-out;
    --transition-base: 300ms ease-in-out;
    --transition-slow: 500ms ease-in-out;
}

/* Dark mode override */
@media (prefers-color-scheme: dark) {
    :root {
        --text-primary: #f8f9fa;
        --text-secondary: #adb5bd;
        --bg-primary: #1a1a1a;
        --bg-secondary: #2d2d2d;
    }
}
```

## Component Styling

### Buttons

```css
.btn {
    display: inline-block;
    font-weight: 400;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    user-select: none;
    border: 1px solid transparent;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    line-height: 1.5;
    border-radius: var(--border-radius);
    transition: all var(--transition-base);
    cursor: pointer;
}

.btn:hover {
    opacity: 0.85;
    transform: translateY(-1px);
    box-shadow: var(--shadow);
}

.btn-primary {
    color: #fff;
    background-color: var(--primary-color);
    border-color: var(--primary-color);
}

.btn-secondary {
    color: #fff;
    background-color: var(--secondary-color);
    border-color: var(--secondary-color);
}

.btn-outline {
    color: var(--primary-color);
    background-color: transparent;
    border-color: var(--primary-color);
}

.btn-lg {
    padding: 0.75rem 1.5rem;
    font-size: 1.125rem;
}

.btn-sm {
    padding: 0.25rem 0.5rem;
    font-size: 0.875rem;
}
```

### Cards

```css
.card {
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-color: var(--bg-primary);
    background-clip: border-box;
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
    box-shadow: var(--shadow-sm);
    transition: all var(--transition-base);
}

.card:hover {
    box-shadow: var(--shadow);
    transform: translateY(-2px);
}

.card-body {
    flex: 1 1 auto;
    padding: 1.25rem;
}

.card-title {
    margin-bottom: 0.75rem;
    font-size: 1.25rem;
    font-weight: 500;
}

.card-text {
    margin-bottom: 1rem;
}

.card-img-top {
    width: 100%;
    border-top-left-radius: calc(var(--border-radius) - 1px);
    border-top-right-radius: calc(var(--border-radius) - 1px);
}
```

## Layout Systems

### Flexbox Layout

```css
/* Container */
.container {
    width: 100%;
    padding-right: var(--spacing-md);
    padding-left: var(--spacing-md);
    margin-right: auto;
    margin-left: auto;
}

@media (min-width: 576px) {
    .container { max-width: 540px; }
}
@media (min-width: 768px) {
    .container { max-width: 720px; }
}
@media (min-width: 992px) {
    .container { max-width: 960px; }
}
@media (min-width: 1200px) {
    .container { max-width: 1140px; }
}

/* Flex utilities */
.d-flex { display: flex; }
.flex-row { flex-direction: row; }
.flex-column { flex-direction: column; }
.justify-content-start { justify-content: flex-start; }
.justify-content-center { justify-content: center; }
.justify-content-end { justify-content: flex-end; }
.justify-content-between { justify-content: space-between; }
.align-items-start { align-items: flex-start; }
.align-items-center { align-items: center; }
.align-items-end { align-items: flex-end; }
```

### CSS Grid Layout

```css
.grid {
    display: grid;
    gap: var(--spacing-lg);
}

.grid-2 {
    grid-template-columns: repeat(2, 1fr);
}

.grid-3 {
    grid-template-columns: repeat(3, 1fr);
}

.grid-4 {
    grid-template-columns: repeat(4, 1fr);
}

@media (max-width: 768px) {
    .grid-2,
    .grid-3,
    .grid-4 {
        grid-template-columns: 1fr;
    }
}
```

## Animations

### Keyframe Animations

```css
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes slideInLeft {
    from {
        transform: translateX(-100%);
    }
    to {
        transform: translateX(0);
    }
}

@keyframes pulse {
    0%, 100% {
        opacity: 1;
    }
    50% {
        opacity: 0.5;
    }
}

/* Usage */
.fade-in {
    animation: fadeIn 0.5s ease-out;
}

.slide-in {
    animation: slideInLeft 0.5s ease-out;
}

.pulse {
    animation: pulse 2s infinite;
}
```

### Transition Classes

```css
.transition-all {
    transition: all var(--transition-base);
}

.transition-transform {
    transition: transform var(--transition-base);
}

.transition-opacity {
    transition: opacity var(--transition-base);
}

/* Hover effects */
.hover-lift:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);
}

.hover-scale:hover {
    transform: scale(1.05);
}
```

## Responsive Design

### Media Query Mixins (conceptual)

```css
/* Mobile First Approach */
/* Default styles for mobile */

/* Small devices (landscape phones, 576px and up) */
@media (min-width: 576px) {
    .container { max-width: 540px; }
}

/* Medium devices (tablets, 768px and up) */
@media (min-width: 768px) {
    .container { max-width: 720px; }
}

/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) {
    .container { max-width: 960px; }
}

/* Extra large devices (large desktops, 1200px and up) */
@media (min-width: 1200px) {
    .container { max-width: 1140px; }
}
```

### Utility Classes

```css
/* Display */
.d-none { display: none; }
.d-block { display: block; }
.d-inline { display: inline; }
.d-inline-block { display: inline-block; }

@media (min-width: 768px) {
    .d-md-block { display: block; }
    .d-md-none { display: none; }
}

/* Spacing */
.m-0 { margin: 0; }
.mt-1 { margin-top: var(--spacing-sm); }
.mb-1 { margin-bottom: var(--spacing-sm); }
.mx-auto { margin-left: auto; margin-right: auto; }

.p-1 { padding: var(--spacing-sm); }
.p-2 { padding: var(--spacing-md); }
.py-3 { padding-top: var(--spacing-lg); padding-bottom: var(--spacing-lg); }

/* Text alignment */
.text-left { text-align: left; }
.text-center { text-align: center; }
.text-right { text-align: right; }

/* Width utilities */
.w-100 { width: 100%; }
.w-75 { width: 75%; }
.w-50 { width: 50%; }
.w-25 { width: 25%; }
```

## Performance Optimization

### Critical CSS

```css
/* Inline critical above-the-fold CSS */
.critical-css {
    /* Essential styles for initial render */
    font-family: var(--font-family-base);
    font-size: var(--font-size-base);
    line-height: 1.5;
}
```

### CSS Optimization

1. **Minify CSS** - Remove whitespace and comments
2. **Remove unused CSS** - Use tools like PurgeCSS
3. **Combine files** - Reduce HTTP requests
4. **Use CSS containment** - Isolate component rendering
5. **Avoid expensive properties** - Use `transform` instead of `position` changes
6. **Use will-change wisely** - Hint browsers for animations

```css
/* Good - GPU accelerated */
.animated {
    transform: translateX(100px);
    will-change: transform;
}

/* Avoid - Triggers layout */
.bad-animated {
    left: 100px;
}
```

## Best Practices

1. **Use CSS custom properties** for theming
2. **Organize CSS by component** not by page
3. **Use BEM naming** for components (optional)
4. **Avoid deep nesting** in preprocessors
5. **Use relative units** (rem, em, %) not pixels
6. **Minimize !important usage**
7. **Use shorthand properties** when appropriate
8. **Group related styles** together
9. **Comment complex sections** briefly
10. **Test across browsers** and devices
