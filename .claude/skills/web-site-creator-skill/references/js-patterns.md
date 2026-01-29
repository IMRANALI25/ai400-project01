# Vanilla JavaScript Design Patterns

## Module Patterns

### IIFE (Immediately Invoked Function Expression)

```javascript
const MyModule = (function() {
    // Private variables
    let privateVar = 'private';

    // Private functions
    function privateFunction() {
        console.log(privateVar);
    }

    // Public API
    return {
        publicMethod: function() {
            privateFunction();
        },
        publicVar: 'public'
    };
})();

// Usage
MyModule.publicMethod();
```

### ES6 Modules

```javascript
// utils.js
export function formatDate(date) {
    return new Date(date).toLocaleDateString();
}

export function sanitizeInput(input) {
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
}

// main.js
import { formatDate, sanitizeInput } from './utils.js';

console.log(formatDate(new Date()));
```

### Class-Based Pattern

```javascript
class Component {
    constructor(element) {
        this.element = element;
        this.init();
    }

    init() {
        this.bindEvents();
    }

    bindEvents() {
        this.element.addEventListener('click', this.handleClick.bind(this));
    }

    handleClick(event) {
        event.preventDefault();
        console.log('Clicked');
    }

    destroy() {
        this.element.removeEventListener('click', this.handleClick);
    }
}

// Usage
const button = new Component(document.querySelector('.btn'));
```

## DOM Manipulation

### Efficient DOM Queries

```javascript
// Cache selectors
const selectors = {
    header: document.querySelector('.header'),
    navigation: document.querySelector('.navbar'),
    mainContent: document.querySelector('.main-content'),
    buttons: document.querySelectorAll('.btn')
};

// Single element
const element = document.getElementById('unique-id');

// Multiple elements
const items = document.querySelectorAll('.item');

// Context-specific queries
const container = document.querySelector('.container');
const buttons = container.querySelectorAll('.btn');
```

### Creating Elements

```javascript
// Create element
const div = document.createElement('div');
div.className = 'card';
div.textContent = 'Card content';

// Add attributes
div.setAttribute('data-id', '123');
div.dataset.id = '123'; // Modern approach

// Append to DOM
document.body.appendChild(div);

// Insert before
parentElement.insertBefore(newElement, referenceElement);

// Insert after
function insertAfter(newElement, referenceElement) {
    referenceElement.parentNode.insertBefore(newElement, referenceElement.nextSibling);
}
```

### Event Delegation

```javascript
// Instead of attaching to each item
document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('click', handleClick); // Bad for dynamic content
});

// Use delegation (good for dynamic content)
document.querySelector('.container').addEventListener('click', function(event) {
    if (event.target.matches('.item') || event.target.closest('.item')) {
        const item = event.target.closest('.item');
        handleClick.call(item, event);
    }
});
```

## State Management

### Simple State Store

```javascript
class Store {
    constructor(initialState = {}) {
        this.state = initialState;
        this.listeners = [];
    }

    getState() {
        return { ...this.state };
    }

    setState(newState) {
        this.state = { ...this.state, ...newState };
        this.notify();
    }

    subscribe(listener) {
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter(l => l !== listener);
        };
    }

    notify() {
        this.listeners.forEach(listener => listener(this.state));
    }
}

// Usage
const store = new Store({ count: 0, user: null });

store.subscribe(state => {
    console.log('State changed:', state);
});

store.setState({ count: 1 });
```

### Local Storage Helper

```javascript
const Storage = {
    get(key, defaultValue = null) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (error) {
            console.error('Error reading from localStorage:', error);
            return defaultValue;
        }
    },

    set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error('Error writing to localStorage:', error);
        }
    },

    remove(key) {
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.error('Error removing from localStorage:', error);
        }
    },

    clear() {
        try {
            localStorage.clear();
        } catch (error) {
            console.error('Error clearing localStorage:', error);
        }
    }
};

// Usage
Storage.set('user', { name: 'John', age: 30 });
const user = Storage.get('user');
```

## API Integration

### Fetch Wrapper

```javascript
class API {
    constructor(baseURL) {
        this.baseURL = baseURL;
        this.headers = {
            'Content-Type': 'application/json'
        };
    }

    setAuthToken(token) {
        this.headers['Authorization'] = `Bearer ${token}`;
    }

    async get(endpoint) {
        try {
            const response = await fetch(`${this.baseURL}${endpoint}`, {
                method: 'GET',
                headers: this.headers
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('GET request failed:', error);
            throw error;
        }
    }

    async post(endpoint, data) {
        try {
            const response = await fetch(`${this.baseURL}${endpoint}`, {
                method: 'POST',
                headers: this.headers,
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('POST request failed:', error);
            throw error;
        }
    }

    async put(endpoint, data) {
        try {
            const response = await fetch(`${this.baseURL}${endpoint}`, {
                method: 'PUT',
                headers: this.headers,
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('PUT request failed:', error);
            throw error;
        }
    }

    async delete(endpoint) {
        try {
            const response = await fetch(`${this.baseURL}${endpoint}`, {
                method: 'DELETE',
                headers: this.headers
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('DELETE request failed:', error);
            throw error;
        }
    }
}

// Usage
const api = new API('https://api.example.com');
api.setAuthToken('your-token-here');

const data = await api.get('/users');
await api.post('/users', { name: 'John', email: 'john@example.com' });
```

## Utility Functions

### Debounce and Throttle

```javascript
// Debounce - delays function execution until after wait time has elapsed
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

// Usage for search input
const searchInput = document.querySelector('#search');
searchInput.addEventListener('input', debounce((event) => {
    console.log('Searching for:', event.target.value);
}, 300));

// Throttle - limits function execution to once every wait time
function throttle(func, wait) {
    let inThrottle;
    return function executedFunction(...args) {
        if (!inThrottle) {
            func(...args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, wait);
        }
    };
}

// Usage for scroll events
window.addEventListener('scroll', throttle(() => {
    console.log('Scroll position:', window.scrollY);
}, 100));
```

### DOM Helper Functions

```javascript
const DOM = {
    // Show element
    show(element) {
        element.style.display = '';
    },

    // Hide element
    hide(element) {
        element.style.display = 'none';
    },

    // Toggle visibility
    toggle(element) {
        element.style.display = element.style.display === 'none' ? '' : 'none';
    },

    // Add class
    addClass(element, className) {
        element.classList.add(className);
    },

    // Remove class
    removeClass(element, className) {
        element.classList.remove(className);
    },

    // Toggle class
    toggleClass(element, className) {
        element.classList.toggle(className);
    },

    // Has class
    hasClass(element, className) {
        return element.classList.contains(className);
    },

    // Get/Set attribute
    attr(element, name, value) {
        if (value !== undefined) {
            element.setAttribute(name, value);
        }
        return element.getAttribute(name);
    },

    // Get/Set HTML content
    html(element, content) {
        if (content !== undefined) {
            element.innerHTML = content;
        }
        return element.innerHTML;
    },

    // Get/Set text content (secure)
    text(element, content) {
        if (content !== undefined) {
            element.textContent = content;
        }
        return element.textContent;
    }
};

// Usage
const button = document.querySelector('.btn');
DOM.addClass(button, 'active');
console.log(DOM.hasClass(button, 'active')); // true
```

## Form Handling

### Form Validation

```javascript
class FormValidator {
    constructor(formElement) {
        this.form = formElement;
        this.validators = {};
        this.init();
    }

    init() {
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

        // Required validation
        if (rules.required && !field.value.trim()) {
            isValid = false;
            errorMessage = rules.message || 'This field is required';
        }

        // Email validation
        if (isValid && rules.email && field.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value)) {
                isValid = false;
                errorMessage = rules.message || 'Please enter a valid email';
            }
        }

        // Min length validation
        if (isValid && rules.minLength && field.value.length < rules.minLength) {
            isValid = false;
            errorMessage = rules.message || `Minimum ${rules.minLength} characters required`;
        }

        // Update UI
        this.updateFieldStatus(field, isValid, errorMessage);

        return isValid;
    }

    updateFieldStatus(field, isValid, errorMessage) {
        const errorElement = field.parentElement.querySelector('.error-message');

        if (!isValid) {
            field.classList.add('is-invalid');
            if (errorElement) {
                errorElement.textContent = errorMessage;
                errorElement.style.display = 'block';
            }
        } else {
            field.classList.remove('is-invalid');
            field.classList.add('is-valid');
            if (errorElement) {
                errorElement.style.display = 'none';
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
            console.log('Form is valid:', data);
            // Submit form data
        }
    }
}

// Usage
const form = document.querySelector('#contact-form');
const validator = new FormValidator(form);

validator.addField('name', { required: true, minLength: 2 });
validator.addField('email', { required: true, email: true });
validator.addField('message', { required: true, minLength: 10 });
```

## Animations

### Scroll Animations

```javascript
class ScrollAnimator {
    constructor(options = {}) {
        this.threshold = options.threshold || 0.1;
        this.init();
    }

    init() {
        this.elements = document.querySelectorAll('[data-animate]');
        this.observer = new IntersectionObserver(
            this.handleIntersect.bind(this),
            { threshold: this.threshold }
        );

        this.elements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            this.observer.observe(element);
        });
    }

    handleIntersect(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
                this.observer.unobserve(element);
            }
        });
    }

    destroy() {
        this.observer.disconnect();
    }
}

// Usage
// HTML: <div data-animate>Content</div>
const animator = new ScrollAnimator();
```

## Best Practices

1. **Use strict mode** - `'use strict';` at the top of files
2. **Cache DOM queries** - Store selectors in variables
3. **Use event delegation** - For dynamic content
4. **Avoid global variables** - Use modules or IIFE
5. **Handle errors gracefully** - Use try-catch
6. **Sanitize user input** - Prevent XSS attacks
7. **Use const/let** - Not var
8. **Optimize loops** - Cache array lengths
9. **Debounce/throttle events** - For scroll, resize, input
10. **Use async/await** - For asynchronous code
