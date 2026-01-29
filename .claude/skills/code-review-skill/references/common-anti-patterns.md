# Common Anti-Patterns Across Languages

This reference catalogs common anti-patterns, their consequences, and how to fix them across all supported languages.

## God Object / God Class

### Description

A class or object that knows too much or does too much.

### Examples

**Python (Bad)**:
```python
class UserSystem:
    def create_user(self, data):
        # User creation
        pass

    def send_email(self, to, subject):
        # Email functionality
        pass

    def process_payment(self, amount, card):
        # Payment processing
        pass

    def generate_report(self):
        # Report generation
        pass

    def backup_database(self):
        # Database backup
        pass
```

**Refactored (Good)**:
```python
class UserService:
    def create_user(self, data):
        pass

class EmailService:
    def send_email(self, to, subject):
        pass

class PaymentService:
    def process_payment(self, amount, card):
        pass

class ReportService:
    def generate_report(self):
        pass

class BackupService:
    def backup_database(self):
        pass
```

### Consequences
- Hard to maintain
- Difficult to test
- Violates Single Responsibility Principle
- Changes ripple through entire system

## Magic Numbers

### Description

Unnamed numerical constants in code.

### Examples

**Bad**:
```python
# What do these numbers mean?
if elapsed_time > 86400:
    send_alert()

buffer = allocate(1024)

price = amount * 1.0825  # What tax rate is this?
```

**Good**:
```python
SECONDS_PER_DAY = 86400
DEFAULT_BUFFER_SIZE = 1024
SALES_TAX_RATE = 0.0825  # 8.25% California sales tax

if elapsed_time > SECONDS_PER_DAY:
    send_alert()

buffer = allocate(DEFAULT_BUFFER_SIZE)

price = amount * (1 + SALES_TAX_RATE)
```

### Consequences
- Code is harder to understand
- Difficult to update consistently
- Prone to errors from typos

## Shotgun Surgery

### Description

Every time you make a change, you have to make many small changes to many different classes.

### Examples

**Bad (Scattered Logic)**:
```python
# user_service.py
def create_user(user_data):
    user = db.insert(user_data)
    logger.info(f"User created: {user.id}")
    analytics.track("user_created", user.id)
    cache.set(f"user:{user.id}", user)

# product_service.py
def create_product(product_data):
    product = db.insert(product_data)
    logger.info(f"Product created: {product.id}")
    analytics.track("product_created", product.id)
    cache.set(f"product:{product.id}", product)
```

**Good (Centralized)**:
```python
class EntityService:
    def create(self, entity_type, data):
        entity = db.insert(entity_type, data)
        self._log_created(entity_type, entity.id)
        self._track_created(entity_type, entity.id)
        self._cache_entity(entity_type, entity)
        return entity

# Usage
user_service = EntityService()
user = user_service.create("user", user_data)
```

### Consequences
- Error-prone changes
- Hard to maintain consistency
- Easy to miss updates

## Golden Hammer

### Description

Using the same tool/solution for every problem.

### Examples

**Bad (Everything is a Regex)**:
```python
import re

def is_number(s):
    return bool(re.match(r'^\d+$', s))  # Could use s.isdigit()

def is_empty(s):
    return bool(re.match(r'^\s*$', s))  # Could use not s.strip()

def has_lowercase(s):
    return bool(re.search(r'[a-z]', s))  # Could use any(c.islower() for c in s)
```

**Good**:
```python
def is_number(s):
    return s.isdigit()

def is_empty(s):
    return not s.strip()

def has_lowercase(s):
    return any(c.islower() for c in s)
```

### Consequences
- Unnecessarily complex code
- Poor performance
- Harder to read and maintain

## Copy-Paste Programming

### Description

Duplicating code instead of using abstractions.

### Examples

**Bad**:
```python
def calculate_circle_area(radius):
    pi = 3.14159
    return pi * radius * radius

def calculate_cylinder_volume(radius, height):
    pi = 3.14159
    return pi * radius * radius * height

def calculate_cone_volume(radius, height):
    pi = 3.14159
    return (pi * radius * radius * height) / 3
```

**Good**:
```python
PI = 3.14159

def circle_area(radius):
    return PI * radius * radius

def cylinder_volume(radius, height):
    return circle_area(radius) * height

def cone_volume(radius, height):
    return cylinder_volume(radius, height) / 3
```

### Consequences
- Code bloat
- Maintenance nightmare
- Inconsistencies as copies diverge

## Lava Flow

### Description

Dead code and forgotten design that no one understands but everyone is afraid to touch.

### Examples

**Bad**:
```python
# TODO: Refactor this mess - don't touch!
def process_order_legacy(order):
    # 500 lines of convoluted logic
    # Many commented-out sections
    # Unknown author from 5 years ago
    # No one knows if it's still needed
    pass

def process_order(order):
    # New implementation
    pass
```

**Good**:
```python
# Delete dead code, or document why it's kept
def process_order(order):
    # Clear, current implementation
    pass
```

### Consequences
- Unmaintainable code
- Fear of changes
- Accumulates more bad code around it

## Feature Envy

### Description

A method that accesses data of another object more than its own.

### Examples

**Bad (JavaScript)**:
```javascript
class OrderProcessor {
    processOrder(order) {
        // Feature envy: accesses all of order's internals
        const customer = order.customer;
        const items = order.items;
        const total = order.calculateTotal();
        const tax = order.getTaxRate();

        // Should be in Order class
        const subtotal = items.reduce((sum, item) => sum + item.price, 0);
        const discount = customer.membership === 'gold' ? 0.1 : 0;
        const finalTotal = subtotal * (1 - discount) * (1 + tax);
        // ...
    }
}
```

**Good**:
```javascript
class Order {
    calculateFinalTotal() {
        const subtotal = this.calculateSubtotal();
        const discount = this.customer.getDiscount();
        const tax = this.getTaxRate();
        return subtotal * (1 - discount) * (1 + tax);
    }
}

class OrderProcessor {
    processOrder(order) {
        const total = order.calculateFinalTotal();
        // Process payment
    }
}
```

### Consequences
- Violates encapsulation
- Tight coupling between objects
- Hard to maintain

## Primitive Obsession

### Description

Using primitive types instead of small classes for specific concepts.

### Examples

**Bad (C#)**:
```csharp
public void ProcessOrder(
    string customerName,
    string customerEmail,
    string customerPhone,
    string customerAddress,
    string customerCity,
    string customerZip,
    // ... many more primitives
)
```

**Good**:
```csharp
public class Customer
{
    public string Name { get; set; }
    public string Email { get; set; }
    public string Phone { get; set; }
    public Address Address { get; set; }
}

public class Address
{
    public string Street { get; set; }
    public string City { get; set; }
    public string ZipCode { get; set; }
}

public void ProcessOrder(Customer customer)
```

### Consequences
- Long parameter lists
- Type errors (email passed where phone expected)
- Hard to add validation/behavior

## Data Clumps

### Description

Groups of variables that always appear together.

### Examples

**Bad**:
```python
def draw_shape(x, y, width, height, color):
    pass

def move_shape(x, y, width, height, dx, dy):
    pass

def resize_shape(x, y, width, height, new_width, new_height):
    pass
```

**Good**:
```python
class Rectangle:
    def __init__(self, x, y, width, height, color):
        self.x = x
        self.y = y
        self.width = width
        self.height = height
        self.color = color

def draw_shape(rectangle):
    pass

def move_shape(rectangle, dx, dy):
    pass

def resize_shape(rectangle, new_width, new_height):
    pass
```

### Consequences
- Long parameter lists
- Hard to maintain
- Data inconsistencies

## Long Parameter List

### Description

Methods with too many parameters (more than 4-5).

### Examples

**Bad**:
```python
def create_user(username, password, email, first_name, last_name,
                phone, address, city, state, zip_code, country,
                birth_date, gender, newsletter, preferences):
    # 15 parameters!
    pass
```

**Good**:
```python
class User:
    def __init__(self, username, password, email):
        self.username = username
        self.password = password
        self.email = email

class UserProfile:
    def __init__(self, first_name, last_name, phone):
        self.first_name = first_name
        self.last_name = last_name
        self.phone = phone

class UserPreferences:
    def __init__(self, newsletter, preferences):
        self.newsletter = newsletter
        self.preferences = preferences

def create_user(user: User, profile: UserProfile, prefs: UserPreferences):
    pass
```

### Consequences
- Hard to call
- Hard to remember order
- Prone to errors

## Poltergeists

### Description

Objects with limited lifecycle and responsibility, created only to invoke operations on other objects.

### Examples

**Bad (Java/C# style)**:
```python
class OrderValidator:
    def __init__(self, validator):
        self.validator = validator

    def validate(self, order):
        return self.validator.validate(order)

class OrderPrinter:
    def __init__(self, printer):
        self.printer = printer

    def print(self, order):
        self.printer.print(order)

# Usage
validator = OrderValidator(validator_impl)
validator.validate(order)
```

**Good**:
```python
# Remove the unnecessary wrapper
validator_impl.validate(order)
printer.print(order)
```

### Consequences
- Unnecessary complexity
- No real purpose
- Adds indirection without benefit

## Boat Anchor

### Description
Dead/unused code that serves no purpose.

### Examples

**Bad**:
```python
class OrderProcessor:
    def __init__(self):
        self.database = DatabaseConnection()
        self.cache = RedisCache()
        self.legacy_system = LegacySystem()  # Never used!
        self.logger = Logger()

        self.backup_connection = DatabaseConnection()  # Duplicate!

    def process_order(self, order):
        # backup_connection never used here
        self.database.save(order)
```

**Good**:
```python
class OrderProcessor:
    def __init__(self):
        self.database = DatabaseConnection()
        self.cache = RedisCache()
        self.logger = Logger()
```

### Consequences
- Wasted memory
- Confusing code
- Maintenance burden

## Spaghetti Code

### Description

Tangled, unstructured code with complex control flow.

### Examples

**Bad**:
```python
def process_data(data):
    if data:
        if data.get('type') == 'user':
            if data.get('active'):
                if data.get('verified'):
                    if data.get('paid'):
                        return 'process'
                    else:
                        if data.get('trial'):
                            return 'trial_process'
                        else:
                            return 'no_access'
                else:
                    return 'not_verified'
            else:
                return 'inactive'
        else:
            if data.get('type') == 'admin':
                return 'admin_process'
            else:
                return 'invalid_type'
    else:
        return 'no_data'
```

**Good**:
```python
def process_data(data):
    if not data:
        return 'no_data'

    if not data.get('active', False):
        return 'inactive'

    if not data.get('verified', False):
        return 'not_verified'

    user_type = data.get('type')
    if user_type == 'admin':
        return 'admin_process'
    elif user_type == 'user':
        return _process_user(data)
    else:
        return 'invalid_type'

def _process_user(user_data):
    if user_data.get('paid', False):
        return 'process'
    elif user_data.get('trial', False):
        return 'trial_process'
    else:
        return 'no_access'
```

### Consequences
- Impossible to follow
- Hard to debug
- Difficult to modify

## Ravioli Code

### Description

Too many small, disconnected classes/modules without clear structure.

### Examples

**Bad**:
```python
# Too many tiny classes doing almost nothing
class UserNameValidator:
    def validate(self, name):
        return len(name) > 0

class UserEmailValidator:
    def validate(self, email):
        return '@' in email

class UserAgeValidator:
    def validate(self, age):
        return age > 0

class UserPrinter:
    def print(self, user):
        print(user)

class UserSaver:
    def save(self, user):
        db.save(user)
```

**Good**:
```python
class UserValidator:
    def validate(self, user):
        return self._valid_name(user.name) and \
               self._valid_email(user.email) and \
               self._valid_age(user.age)

class UserRepository:
    def save(self, user):
        db.save(user)
```

### Consequences
- Over-engineering
- Hard to navigate
- Excessive indirection

## Monkey Patching

### Description

Modifying code at runtime without proper structure.

### Examples

**Bad (Python)**:
```python
# Modifying built-in or library code at runtime
import requests

def patched_get(*args, **kwargs):
    # Custom behavior
    return original_get(*args, **kwargs)

original_get = requests.get
requests.get = patched_get
```

**Good**:
```python
# Proper inheritance or wrapper
class CustomRequests:
    def __init__(self):
        self._requests = requests

    def get(self, *args, **kwargs):
        # Custom behavior
        return self._requests.get(*args, **kwargs)
```

### Consequences
- Unexpected behavior
- Hard to debug
- Brittle code

## Sequential Coupling

### Description

Methods must be called in specific order.

### Examples

**Bad**:
```python
class DataProcessor:
    def load(self, file):
        self.data = read_file(file)

    def validate(self):
        # Fails if load() not called first!
        if not self.data:
            raise Exception("No data loaded")

    def process(self):
        # Fails if validate() not called first!
        if not self._validated:
            raise Exception("Not validated")
```

**Good**:
```python
class DataProcessor:
    def __init__(self, file):
        self.data = read_file(file)
        self._validated = False
        self._validate()
        self._processed = self._process()

    def _validate(self):
        validate_data(self.data)
        self._validated = True

    def _process(self):
        return process_data(self.data)
```

### Consequences
- Error-prone usage
- Hidden dependencies
- Hard to use correctly

## Platform-Specific Anti-Patterns

### Python

**Import Star**:
```python
# Bad: Makes namespace unclear
from module import *

# Good: Explicit imports
from module import function1, function2
```

**Mutable Default Arguments**:
```python
# Bad: Shared across calls!
def append_item(item, items=[]):
    items.append(item)
    return items

# Good
def append_item(item, items=None):
    if items is None:
        items = []
    items.append(item)
    return items
```

### JavaScript

**var Instead of const/let**:
```javascript
// Bad
var x = 10;

// Good
const x = 10;
let counter = 0;
```

**Missing Semicolons** (when relying on ASI):
```javascript
// Can cause unexpected behavior
return
{a: 1}  // Returns undefined!

// Good
return {a: 1};
```

### C#

**Disposable Not Disposed**:
```csharp
// Bad: Resource leak
var file = new StreamWriter(path);
file.Write(data);

// Good
using (var file = new StreamWriter(path)) {
    file.Write(data);
}
```

**String Concatenation in Loops**:
```csharp
// Bad: Performance issue
string result = "";
foreach (var item in items) {
    result += item.ToString();
}

// Good
var sb = new StringBuilder();
foreach (var item in items) {
    sb.Append(item.ToString());
}
string result = sb.ToString();
```

### C/C++

**Memory Leaks**:
```c
// Bad: Memory leak
char* buffer = malloc(1024);
// Forgot to free!

// Good
char* buffer = malloc(1024);
// Use buffer
free(buffer);
```

**Unchecked Return Values**:
```c
// Bad: Ignoring errors
FILE* f = fopen("file.txt", "r");
// Assume it worked

// Good
FILE* f = fopen("file.txt", "r");
if (f == NULL) {
    perror("Failed to open file");
    return ERROR;
}
```

### Dart

**Build Method Too Long**:
```dart
// Bad: Build method doing everything
@override
Widget build(BuildContext context) {
  // 200+ lines of UI and logic
}

// Good: Extract to smaller widgets
@override
Widget build(BuildContext context) {
  return Column(
    children: [
      _buildHeader(),
      _buildContent(),
      _buildFooter(),
    ],
  );
}
```

**setState in Build**:
```dart
// Bad: Causes infinite loop
@override
Widget build(BuildContext context) {
  setState(() {
    counter++;
  });
  return Text('$counter');
}

// Good: Separate concerns
@override
Widget build(BuildContext context) {
  return Text('$counter');
}

void increment() {
  setState(() {
    counter++;
  });
}
```
