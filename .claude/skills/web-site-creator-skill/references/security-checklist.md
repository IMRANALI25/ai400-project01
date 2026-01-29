# Security Implementation Checklist

## Content Security Policy (CSP)

### Basic CSP Header

```html
<meta http-equiv="Content-Security-Policy" content="
    default-src 'self';
    script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net;
    style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net;
    img-src 'self' data: https:;
    font-src 'self' https://fonts.gstatic.com;
    connect-src 'self' https://api.example.com;
    frame-src 'none';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    manifest-src 'self';
">
```

### Server-Side CSP Headers

```apache
# Apache .htaccess
Header set Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net"
Header set X-Content-Type-Options "nosniff"
Header set X-Frame-Options "DENY"
Header set X-XSS-Protection "1; mode=block"
Header set Strict-Transport-Security "max-age=31536000; includeSubDomains"
Header set Referrer-Policy "strict-origin-when-cross-origin"
```

```nginx
# Nginx
add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net";
add_header X-Content-Type-Options "nosniff";
add_header X-Frame-Options "DENY";
add_header X-XSS-Protection "1; mode=block";
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains";
add_header Referrer-Policy "strict-origin-when-cross-origin";
```

## XSS Prevention

### Input Sanitization

```javascript
// Sanitize HTML input
function sanitizeHTML(str) {
    const temp = document.createElement('div');
    temp.textContent = str;
    return temp.innerHTML;
}

// Sanitize HTML attributes
function sanitizeAttribute(str) {
    return str.replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

// Usage
const userInput = '<script>alert("XSS")</script>';
const safeInput = sanitizeHTML(userInput); // &lt;script&gt;alert(&quot;XSS&quot;)&lt;/script&gt;
```

### Safe DOM Manipulation

```javascript
// BAD - vulnerable to XSS
element.innerHTML = userInput;

// GOOD - safe
element.textContent = userInput;

// GOOD - safe with sanitization
element.innerHTML = sanitizeHTML(userInput);

// Use DOMPurify library for comprehensive sanitization
// import DOMPurify from 'dompurify';
// element.innerHTML = DOMPurify.sanitize(userInput);
```

### Template Validation

```javascript
// Whitelist approach for allowed tags
function validateHTML(input, allowedTags = ['b', 'i', 'em', 'strong', 'a']) {
    const temp = document.createElement('div');
    temp.innerHTML = input;

    const allTags = temp.querySelectorAll('*');
    allTags.forEach(tag => {
        if (!allowedTags.includes(tag.tagName.toLowerCase())) {
            tag.remove();
        }
    });

    return temp.innerHTML;
}
```

## CSRF Protection

### Anti-CSRF Tokens

```html
<!-- Include in forms -->
<form id="contact-form" action="/submit" method="POST">
    <input type="hidden" name="csrf_token" value="{{ csrf_token }}">
    <!-- Other form fields -->
    <button type="submit">Submit</button>
</form>
```

```javascript
// Generate CSRF token (client-side for demo - use server-side in production)
function generateCSRFToken() {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

// Store token
const csrfToken = generateCSRFToken();
localStorage.setItem('csrf_token', csrfToken);

// Include in fetch requests
async function submitForm(data) {
    const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-Token': localStorage.getItem('csrf_token')
        },
        body: JSON.stringify(data)
    });
    return response.json();
}
```

### SameSite Cookie Attribute

```javascript
// Set cookie with SameSite attribute (server-side)
document.cookie = 'session_id=abc123; SameSite=Strict; Secure; HttpOnly';
```

## HTTPS Enforcement

### HTTPS Redirect

```javascript
// Redirect HTTP to HTTPS
if (location.protocol !== 'https:') {
    location.replace(`https:${location.href.substring(location.protocol.length)}`);
}
```

### HSTS Header

```
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
```

## Input Validation

### Client-Side Validation

```javascript
// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// URL validation
function isValidURL(url) {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}

// Phone number validation
function isValidPhone(phone) {
    const phoneRegex = /^\+?[\d\s-()]+$/;
    return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
}

// Sanitize numeric input
function sanitizeNumber(value, min, max) {
    const num = parseInt(value, 10);
    if (isNaN(num)) return min;
    return Math.max(min, Math.min(max, num));
}

// Whitelist validation for dropdowns
function isValidSelect(value, allowedValues) {
    return allowedValues.includes(value);
}
```

### Form Validation Class

```javascript
class SecureForm {
    constructor(formElement, rules = {}) {
        this.form = formElement;
        this.rules = rules;
        this.init();
    }

    init() {
        this.form.addEventListener('submit', this.handleSubmit.bind(this));
    }

    validateField(field) {
        const fieldName = field.name;
        const fieldRules = this.rules[fieldName];
        const value = field.value.trim();

        if (!fieldRules) return true;

        // Required validation
        if (fieldRules.required && !value) {
            return { valid: false, message: 'This field is required' };
        }

        // Type validation
        if (value && fieldRules.type === 'email' && !isValidEmail(value)) {
            return { valid: false, message: 'Please enter a valid email' };
        }

        if (value && fieldRules.type === 'url' && !isValidURL(value)) {
            return { valid: false, message: 'Please enter a valid URL' };
        }

        // Length validation
        if (value && fieldRules.minLength && value.length < fieldRules.minLength) {
            return { valid: false, message: `Minimum ${fieldRules.minLength} characters required` };
        }

        if (value && fieldRules.maxLength && value.length > fieldRules.maxLength) {
            return { valid: false, message: `Maximum ${fieldRules.maxLength} characters allowed` };
        }

        // Pattern validation
        if (value && fieldRules.pattern && !fieldRules.pattern.test(value)) {
            return { valid: false, message: 'Invalid format' };
        }

        // Whitelist validation
        if (value && fieldRules.allowedValues && !fieldRules.allowedValues.includes(value)) {
            return { valid: false, message: 'Invalid value' };
        }

        return { valid: true };
    }

    handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(this.form);
        let isValid = true;

        // Validate all fields
        for (const [name, value] of formData.entries()) {
            const field = this.form.querySelector(`[name="${name}"]`);
            const validation = this.validateField(field);

            if (!validation.valid) {
                isValid = false;
                this.showError(field, validation.message);
            } else {
                this.clearError(field);
            }
        }

        if (isValid) {
            const data = Object.fromEntries(formData.entries());
            // Sanitize data before submission
            const sanitizedData = this.sanitizeData(data);
            console.log('Form is valid:', sanitizedData);
        }
    }

    sanitizeData(data) {
        const sanitized = {};
        for (const [key, value] of Object.entries(data)) {
            sanitized[key] = sanitizeHTML(value);
        }
        return sanitized;
    }

    showError(field, message) {
        field.classList.add('is-invalid');
        let errorElement = field.parentElement.querySelector('.invalid-feedback');
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'invalid-feedback';
            field.parentElement.appendChild(errorElement);
        }
        errorElement.textContent = message;
    }

    clearError(field) {
        field.classList.remove('is-invalid');
        field.classList.add('is-valid');
        const errorElement = field.parentElement.querySelector('.invalid-feedback');
        if (errorElement) {
            errorElement.remove();
        }
    }
}

// Usage
const form = document.querySelector('#contact-form');
const validator = new SecureForm(form, {
    name: { required: true, minLength: 2, maxLength: 100 },
    email: { required: true, type: 'email' },
    phone: { type: 'tel', pattern: /^\+?[\d\s-()]+$/ },
    message: { required: true, minLength: 10, maxLength: 500 },
    country: { allowedValues: ['USA', 'Canada', 'UK', 'Australia'] }
});
```

## Secure Cookie Handling

```javascript
// Set secure cookies (server-side)
function setSecureCookie(name, value, daysToExpire = 7) {
    const date = new Date();
    date.setTime(date.getTime() + (daysToExpire * 24 * 60 * 60 * 1000));
    const expires = `expires=${date.toUTCString()}`;

    document.cookie = `${name}=${value}; ${expires}; path=/; SameSite=Strict; Secure; HttpOnly`;
}

// Note: HttpOnly flag must be set server-side
```

## Password Security

```javascript
// Client-side password strength checker (for UX only)
function checkPasswordStrength(password) {
    const checks = {
        length: password.length >= 8,
        lowercase: /[a-z]/.test(password),
        uppercase: /[A-Z]/.test(password),
        numbers: /\d/.test(password),
        special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };

    const score = Object.values(checks).filter(Boolean).length;

    if (score <= 2) return { strength: 'weak', score };
    if (score <= 3) return { strength: 'medium', score };
    return { strength: 'strong', score };
}

// Password matching validation
function passwordsMatch(password, confirmPassword) {
    return password === confirmPassword && password.length > 0;
}
```

## OWASP Top 10 Compliance

### 1. Injection Attacks

```javascript
// Use parameterized queries for database access
async function getUserById(id) {
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) throw new Error('Invalid ID');

    const response = await fetch(`/api/users/${numericId}`);
    return response.json();
}
```

### 2. Broken Authentication

```javascript
// Implement secure session management
class SessionManager {
    constructor() {
        this.sessionTimeout = 30 * 60 * 1000; // 30 minutes
        this.lastActivity = Date.now();
        this.initInactivityTimer();
    }

    initInactivityTimer() {
        setInterval(() => {
            const now = Date.now();
            if (now - this.lastActivity > this.sessionTimeout) {
                this.logout();
            }
        }, 60000); // Check every minute

        document.addEventListener('click', () => {
            this.lastActivity = Date.now();
        });
    }

    logout() {
        localStorage.removeItem('session_token');
        sessionStorage.clear();
        window.location.href = '/login';
    }
}
```

### 3. Sensitive Data Exposure

```javascript
// Never expose sensitive data in client-side code
// Use HTTPS for all data transmission
// Encrypt sensitive data at rest (server-side)
```

### 4. XML External Entities (XXE)

```javascript
// Avoid parsing XML in client-side code
// If necessary, use secure XML parser with disabled entities
```

### 5. Broken Access Control

```javascript
// Implement role-based access control (server-side)
class AccessControl {
    constructor(userRole) {
        this.userRole = userRole;
        this.permissions = {
            admin: ['read', 'write', 'delete', 'manage_users'],
            editor: ['read', 'write'],
            viewer: ['read']
        };
    }

    hasPermission(action) {
        return this.permissions[this.userRole]?.includes(action) || false;
    }
}
```

## Security Headers Checklist

- [ ] Content-Security-Policy (CSP)
- [ ] X-Content-Type-Options: nosniff
- [ ] X-Frame-Options: DENY
- [ ] X-XSS-Protection: 1; mode=block
- [ ] Strict-Transport-Security (HSTS)
- [ ] Referrer-Policy
- [ ] Permissions-Policy (formerly Feature-Policy)

## Best Practices

1. **Always validate and sanitize user input** (both client and server-side)
2. **Use HTTPS exclusively** in production
3. **Implement CSP** to prevent XSS attacks
4. **Use HttpOnly and Secure flags** for cookies
5. **Never store sensitive data** in localStorage or sessionStorage
6. **Implement rate limiting** for API calls
7. **Keep dependencies updated** to patch vulnerabilities
8. **Use security scanning tools** like OWASP ZAP
9. **Never trust client-side validation** - always validate server-side
10. **Log security events** for monitoring and auditing
