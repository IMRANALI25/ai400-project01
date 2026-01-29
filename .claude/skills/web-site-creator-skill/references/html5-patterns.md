# HTML5 Best Practices and Patterns

## Document Structure

### Basic HTML5 Template

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    <!-- SEO Meta Tags -->
    <meta name="description" content="Page description">
    <meta name="keywords" content="keyword1, keyword2">
    <meta name="author" content="Author Name">

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://example.com/">
    <meta property="og:title" content="Page Title">
    <meta property="og:description" content="Page description">
    <meta property="og:image" content="image-url">

    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="https://example.com/">
    <meta property="twitter:title" content="Page Title">
    <meta property="twitter:description" content="Page description">
    <meta property="twitter:image" content="image-url">

    <!-- Favicon -->
    <link rel="icon" type="image/x-icon" href="favicon.ico">

    <!-- Stylesheets -->
    <link rel="stylesheet" href="assets/css/main.css">

    <title>Page Title</title>
</head>
<body>
    <!-- Content here -->
    <script src="assets/js/main.js" defer></script>
</body>
</html>
```

## Semantic Elements

### Page Structure

```html
<body>
    <header class="header">
        <nav class="navbar">
            <!-- Navigation -->
        </nav>
    </header>

    <main class="main-content">
        <article class="article">
            <section class="section">
                <!-- Content sections -->
            </section>
        </article>

        <aside class="sidebar">
            <!-- Sidebar content -->
        </aside>
    </main>

    <footer class="footer">
        <!-- Footer content -->
    </footer>
</body>
```

### Common Semantic Elements

- `<header>` - Introductory content or navigation
- `<nav>` - Navigation links
- `<main>` - Main content of the page
- `<article>` - Self-contained content
- `<section>` - Thematic grouping of content
- `<aside>` - Content tangentially related
- `<footer>` - Footer information
- `<figure>` and `<figcaption>` - Images with captions
- `<details>` and `<summary>` - Expandable content
- `<time>` - Date/time information

## Forms

### Accessible Form Structure

```html
<form id="contact-form" action="/submit" method="post" novalidate>
    <div class="form-group">
        <label for="name">Full Name <span class="required">*</span></label>
        <input
            type="text"
            id="name"
            name="name"
            required
            aria-required="true"
            aria-describedby="name-error"
        >
        <span class="error-message" id="name-error" role="alert"></span>
    </div>

    <div class="form-group">
        <label for="email">Email Address <span class="required">*</span></label>
        <input
            type="email"
            id="email"
            name="email"
            required
            aria-required="true"
            aria-describedby="email-error"
        >
        <span class="error-message" id="email-error" role="alert"></span>
    </div>

    <div class="form-group">
        <label for="message">Message</label>
        <textarea
            id="message"
            name="message"
            rows="5"
            aria-describedby="message-hint"
        ></textarea>
        <small id="message-hint">Maximum 500 characters</small>
    </div>

    <button type="submit" class="btn btn-primary">Submit</button>
</form>
```

### Input Types

- `text` - Single-line text
- `email` - Email address
- `password` - Password field
- `number` - Numeric input
- `tel` - Telephone number
- `url` - URL input
- `date` - Date picker
- `time` - Time picker
- `datetime-local` - Date and time
- `color` - Color picker
- `range` - Slider
- `file` - File upload
- `search` - Search field

## Accessibility

### ARIA Attributes

```html
<!-- Navigation -->
<nav aria-label="Main navigation">
    <ul role="menubar">
        <li role="none"><a role="menuitem" href="/">Home</a></li>
    </ul>
</nav>

<!-- Buttons -->
<button aria-label="Close dialog" aria-pressed="false">
    <span aria-hidden="true">&times;</span>
</button>

<!-- Live Regions -->
<div aria-live="polite" aria-atomic="true">
    Status updates
</div>

<!-- Expanded/Collapsed -->
<button aria-expanded="false" aria-controls="menu1">
    Toggle Menu
</button>
<div id="menu1" hidden>
    Menu content
</div>
```

### Skip Links

```html
<body>
    <a href="#main-content" class="skip-link">Skip to main content</a>

    <main id="main-content">
        <!-- Main content -->
    </main>
</body>
```

```css
.skip-link {
    position: absolute;
    top: -40px;
    left: 0;
    background: #000;
    color: #fff;
    padding: 8px;
    text-decoration: none;
    z-index: 100;
}

.skip-link:focus {
    top: 0;
}
```

## Meta Tags

### SEO Meta Tags

```html
<!-- Basic SEO -->
<meta name="description" content="Description of page content">
<meta name="keywords" content="relevant, keywords">
<meta name="author" content="Author name">

<!-- Canonical URL -->
<link rel="canonical" href="https://example.com/page">

<!-- No Index -->
<meta name="robots" content="noindex, nofollow">
```

### Structured Data (JSON-LD)

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Organization Name",
  "url": "https://www.example.com",
  "logo": "https://www.example.com/logo.png",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+1-555-555-5555",
    "contactType": "Customer Service"
  }
}
</script>
```

## Best Practices

1. **Always include lang attribute on `<html>`**
2. **Use semantic elements instead of divs**
3. **Provide alt text for all images**
4. **Use proper heading hierarchy (h1-h6)**
5. **Label all form inputs**
6. **Use button for actions, anchor for links**
7. **Validate HTML with W3C validator**
8. **Minimize div nesting**
9. **Use meaningful class names**
10. **Include viewport meta tag for responsive design**
