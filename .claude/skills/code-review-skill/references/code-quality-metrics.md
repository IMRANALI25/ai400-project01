# Code Quality Assessment Criteria

This reference provides metrics and criteria for assessing code quality across all supported languages.

## Cyclomatic Complexity

### Definition

Measures the number of linearly independent paths through source code. Higher complexity indicates harder to test and maintain code.

### Calculation

Each decision point (if, for, while, case, catch, &&, ||, ?:) adds 1 to complexity.

```
Complexity = 1 (base) + number of decision points
```

### Complexity Thresholds

| Complexity Rating | Range | Action Required |
|-------------------|-------|-----------------|
| Simple | 1-10 | Acceptable |
| Moderate | 11-20 | Consider refactoring |
| High | 21-50 | Should refactor |
| Very High | 50+ | Must refactor |

### Examples

**Low Complexity (Good)**:
```python
def calculate_discount(price, is_member):
    if is_member:
        return price * 0.9
    return price  # Complexity: 2
```

**High Complexity (Bad)**:
```python
def calculate_price(item, customer, date, location, shipping):
    base_price = item.price

    if customer.is_member:
        if item.category == "electronics":
            if date.weekday() > 4:
                if location == "store":
                    price = base_price * 0.8
                else:
                    price = base_price * 0.85
            else:
                if location == "store":
                    price = base_price * 0.9
                else:
                    price = base_price * 0.95
        else:
            # ... nested conditions
    else:
        # ... more nested conditions
    # Complexity: 15+ (too high)
```

**Refactored (Better)**:
```python
def calculate_price(item, customer, date, location, shipping):
    base_price = item.price
    discount = calculate_discount(customer, item, date, location)
    shipping_cost = calculate_shipping(item, location, shipping)
    return base_price * (1 - discount) + shipping_cost

def calculate_discount(customer, item, date, location):
    discount = 0
    if customer.is_member:
        discount += 0.1
    # Simplified logic
    return discount
```

## Function/Method Length

### Metrics

| Metric | Good | Warning | Critical |
|--------|------|---------|----------|
| Lines of Code | 1-20 | 21-50 | 50+ |
| Parameters | 0-4 | 5-7 | 8+ |

### Issues with Long Functions

- Harder to understand
- Difficult to test
- Multiple responsibilities
- Harder to reuse

### Refactoring Strategies

1. **Extract Method**: Break into smaller functions
2. **Parameter Object**: Replace many parameters with an object
3. **Decompose Conditional**: Extract complex conditions

### Examples

**Too Long (Bad)**:
```python
def process_order(user, items, shipping, payment, promo_code):
    # 200+ lines of order processing logic
    # Validation
    # Calculation
    # Inventory update
    # Payment processing
    # Shipping
    # Notification
    # ... all in one function
```

**Refactored (Good)**:
```python
def process_order(user, items, shipping, payment, promo_code):
    validate_order(user, items)
    total = calculate_total(items, promo_code)
    update_inventory(items)
    charge_payment(user, payment, total)
    ship_items(items, shipping)
    send_confirmation(user, items)

def validate_order(user, items):
    # 10 lines

def calculate_total(items, promo_code):
    # 15 lines
```

## Code Duplication

### Detection

Look for:
- Identical or similar code blocks (3+ lines)
- Same logic in multiple places
- Copy-pasted implementations

### Metrics

| Duplication Level | Impact | Action |
|-------------------|--------|--------|
| <3% | Low | Acceptable |
| 3-5% | Medium | Consider deduplicating |
| 5-10% | High | Should deduplicate |
| 10%+ | Very High | Must deduplicate |

### Refactoring Strategies

1. **Extract Function**: Move common code to function
2. **Template Method**: For similar algorithms
3. **Strategy Pattern**: For varying implementations

### Examples

**Duplicated (Bad)**:
```python
# In user_service.py
def save_user(user):
    user.created_at = datetime.now()
    user.created_by = get_current_user()
    db.session.add(user)
    db.session.commit()
    log.info(f"User created: {user.id}")

# In product_service.py
def save_product(product):
    product.created_at = datetime.now()
    product.created_by = get_current_user()
    db.session.add(product)
    db.session.commit()
    log.info(f"Product created: {product.id}")
```

**Deduplicated (Good)**:
```python
def save_entity(entity, entity_type):
    entity.created_at = datetime.now()
    entity.created_by = get_current_user()
    db.session.add(entity)
    db.session.commit()
    log.info(f"{entity_type} created: {entity.id}")

# Usage
save_entity(user, "User")
save_entity(product, "Product")
```

## Nesting Depth

### Metrics

| Depth | Status | Action |
|-------|--------|--------|
| 1-3 | Good | Acceptable |
| 4-5 | Warning | Consider refactoring |
| 6+ | Critical | Refactor required |

### Refactoring Strategies

1. **Guard Clauses**: Early return for edge cases
2. **Extract Method**: Move nested logic to separate function
3. **Strategy Pattern**: Replace complex conditionals

### Examples

**Deep Nesting (Bad)**:
```python
def process_user(user):
    if user:
        if user.is_active:
            if user.has_permission:
                if user.valid_subscription():
                    if not user.is_locked():
                        # Finally! The actual logic
                        grant_access(user)
```

**Refactored (Good)**:
```python
def process_user(user):
    if not user:
        return
    if not user.is_active:
        return
    if not user.has_permission:
        return
    if not user.valid_subscription():
        return
    if user.is_locked():
        return

    grant_access(user)
```

## Modularity & Cohesion

### Good Modularity

- Single Responsibility Principle
- High cohesion (related functionality together)
- Low coupling (minimal dependencies between modules)
- Clear interfaces

### Metrics

| Metric | Good | Warning | Bad |
|--------|------|---------|-----|
| Cohesion | High | Medium | Low |
| Coupling | Low | Medium | High |
| Responsibilities per class | 1 | 2-3 | 4+ |

### Examples

**Low Cohesion (Bad)**:
```python
class UserManager:
    def save_user(self, user):
        # User management

    def send_email(self, to, subject, body):
        # Email functionality (doesn't belong)

    def process_payment(self, amount, card):
        # Payment processing (doesn't belong)

    def log_audit(self, action, user):
        # Audit logging (doesn't belong)
```

**High Cohesion (Good)**:
```python
class UserManager:
    def create_user(self, data):
        # Only user-related operations

    def update_user(self, user, data):
        # ...

    def delete_user(self, user):
        # ...
```

## Naming Conventions

### Good Naming Principles

1. **Descriptive**: Names should reveal intent
2. **Pronounceable**: Humans should be able to say it
3. **Searchable**: Unique enough to find easily
4. **Consistent**: Follow language/standards conventions

### Examples

**Bad Names**:
```python
d = 86400  # What is d?
data = process(x, y, z)  # What kind of data?
handle()  # Handle what?
temp = get_value()  # Temporary what?
```

**Good Names**:
```python
SECONDS_PER_DAY = 86400
user_profile = process_user_data(user_id, preferences, options)
validate_email_address(email)  # Clear intent
original_value = get_value()  # Descriptive
```

## Comments & Documentation

### When to Comment

**Good Comments**:
- Explain **WHY** something is done (not WHAT)
- Document complex algorithms
- Provide usage examples
- Note workarounds or known issues
- Reference external specifications

**Unnecessary Comments**:
- Restating the code (comments that repeat the code)
- Obvious explanations
- Outdated comments
- Commented-out code (should be removed)

### Examples

**Unnecessary (Bad)**:
```python
# Increment counter
counter += 1

# Check if user is logged in
if user.is_logged_in:
    ...
```

**Helpful (Good)**:
```python
# Workaround for legacy API that doesn't support batch requests
# TODO: Remove when API v2 is available
results = [fetch_item(id) for id in item_ids]  # O(n) requests

# Using Miller-Rabin primality test for probabilistic checking
# Gives false positive rate of < 0.00001% for n > 1000
def is_prime(n):
    ...
```

## Error Handling Quality

### Good Error Handling

- Specific exception types
- Meaningful error messages
- Proper error propagation
- Resource cleanup in error cases
- Logging for debugging

### Metrics

| Aspect | Good | Bad |
|--------|------|-----|
| Exception specificity | Specific types | Generic Exception |
| Error messages | Clear, actionable | Vague |
| Silent failures | Never | Often |
| Resource cleanup | Guaranteed | Partial/None |

### Examples

**Poor (Bad)**:
```python
try:
    process_order(order)
except:
    pass  # Silent failure - bad!
```

**Good**:
```python
try:
    process_order(order)
except InventoryError as e:
    logger.error(f"Insufficient inventory for order {order.id}: {e}")
    notify_customer(order.customer_id, "Item out of stock")
    raise OrderProcessingError("Cannot process order") from e
except PaymentError as e:
    logger.error(f"Payment failed for order {order.id}: {e}")
    raise OrderProcessingError("Payment declined") from e
```

## Testability Indicators

### Hard to Test Code

- Global state
- Tight coupling
- Hidden dependencies
- Complex setup requirements
- Non-deterministic behavior

### Easy to Test Code

- Dependency injection
- Pure functions
- Clear interfaces
- Minimal setup
- Deterministic

### Examples

**Hard to Test (Bad)**:
```python
def calculate_total():
    # Direct dependency, hard to mock
    price = Database.get_current_price()
    tax_rate = Config.get_tax_rate()
    return price * (1 + tax_rate)
```

**Easy to Test (Good)**:
```python
def calculate_total(price, tax_rate):
    # Pure function, easy to test
    return price * (1 + tax_rate)

# Production code with dependency injection
def get_order_total(price_service, tax_service):
    price = price_service.get_current_price()
    tax_rate = tax_service.get_tax_rate()
    return calculate_total(price, tax_rate)
```

## Performance Indicators

### Common Performance Issues

1. **Algorithmic Complexity**: O(n²) where O(n) possible
2. **Unnecessary Loops**: Repeated calculations
3. **I/O in Loops**: File/network operations inside iterations
4. **Memory Leaks**: Unreleased resources
5. **N+1 Queries**: Database queries in loops

### Examples

**Inefficient (Bad)**:
```python
# O(n²) - nested loop
def find_duplicates(items):
    duplicates = []
    for i, item1 in enumerate(items):
        for j, item2 in enumerate(items):
            if i != j and item1 == item2:
                duplicates.append(item1)
    return duplicates
```

**Efficient (Good)**:
```python
# O(n) - using set
def find_duplicates(items):
    seen = set()
    duplicates = set()
    for item in items:
        if item in seen:
            duplicates.add(item)
        seen.add(item)
    return list(duplicates)
```

**N+1 Query Problem (Bad)**:
```python
# N+1 queries
for order in orders:
    customer = db.query(Customer).filter_by(id=order.customer_id).first()
    print(f"Order {order.id} by {customer.name}")
```

**Optimized (Good)**:
```python
# 2 queries (1 for orders, 1 for customers)
customers = {c.id: c for c in db.query(Customer).all()}
for order in orders:
    customer = customers[order.customer_id]
    print(f"Order {order.id} by {customer.name}")
```

## Maintainability Index

### Components

1. **Halstead Volume**: Complexity of operators and operands
2. **Cyclomatic Complexity**: Control flow complexity
3. **Lines of Code**: Program size
4. **Comment Ratio**: Percentage of comments

### Maintainability Index (MI) Formula

```
MI = max(0, (171 - 5.2 * ln(Halstead Volume) - 0.23 * Cyclomatic Complexity - 16.2 * ln(Lines of Code)) * 100 / 171)
```

### MI Scores

| Score | Maintainability | Action |
|-------|-----------------|--------|
| 85-100 | Highly Maintainable | Excellent |
| 70-84 | Moderately Maintainable | Good |
| 53-69 | Difficult to Maintain | Needs improvement |
| 0-52 | Difficult to Maintain | Refactor required |

## Technical Debt Indicators

### Signs of Technical Debt

- TODO/FIXME comments
- Hacky workarounds
- Inconsistent patterns
- Lack of tests
- Poor documentation
- Copy-paste code
- Dead/commented-out code
- "Quick and dirty" solutions

### Measuring Technical Debt

| Indicator | Threshold | Action |
|-----------|-----------|--------|
| TODO/FIXME count | >10 per file | Review and resolve |
| Code duplication | >5% | Refactor |
| Test coverage | <70% | Add tests |
| Commented code | Any | Remove |
| Cyclomatic complexity | >20 | Simplify |
