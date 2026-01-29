# Language-Specific Coding Standards

This reference provides coding standards, best practices, and patterns for each supported language (C, C++, C#, Python, JavaScript, Dart).

## Python (PEP 8 and Beyond)

### Code Style (PEP 8)

**Naming Conventions**:
```python
# Modules: lowercase_with_underscores
import my_module

# Classes: CapWords (CamelCase)
class UserAccount:
    pass

# Functions and variables: lowercase_with_underscores
def calculate_total():
    max_items = 10

# Constants: UPPER_CASE_WITH_UNDERSCORES
MAX_CONNECTIONS = 100
API_KEY = "secret"

# Protected members: single leading underscore
class MyClass:
    def _internal_method(self):  # Protected
        pass

# Private members: double leading underscore
class MyClass:
    def __private_method(self):  # Private (name mangling)
        pass
```

**Indentation and Spacing**:
```python
# GOOD: 4 spaces for indentation
def my_function(param1, param2):
    if param1:
        return param2

# GOOD: Spaces around operators
x = 5 + 3
if x > 10 and y < 20:

# GOOD: Spaces after commas
items = [1, 2, 3, 4]
function(a, b, c)

# BAD: No spaces around =
# GOOD: Spaces around = in assignments (but not in keyword arguments)
# Correct: def function(default=10):
```

**Line Length**:
- Maximum 79 characters for code
- Maximum 72 characters for comments/docstrings

### Type Hints (PEP 484)

```python
# GOOD: Use type hints
def calculate_price(quantity: int, unit_price: float) -> float:
    return quantity * unit_price

from typing import List, Dict, Optional

def process_items(items: List[str]) -> Dict[str, int]:
    return {item: len(item) for item in items}

def find_user(user_id: int) -> Optional[User]:
    return User.query.get(user_id)

# GOOD: Type aliases
UserId = int
UserData = Dict[str, Any]

def get_user(user_id: UserId) -> UserData:
    ...
```

### Docstrings (PEP 257)

```python
# GOOD: Google style docstring
def calculate_compound_interest(principal, rate, periods, years):
    """Calculate compound interest over time.

    Args:
        principal (float): Initial investment amount
        rate (float): Annual interest rate as decimal (e.g., 0.05 for 5%)
        periods (int): Number of compounding periods per year
        years (int): Number of years to invest

    Returns:
        float: Total value after investment period

    Raises:
        ValueError: If principal is negative or rate is invalid

    Example:
        >>> calculate_compound_interest(1000, 0.05, 12, 10)
        1643.62
    """
    ...

# GOOD: NumPy style docstring
def process_data(data):
    """Process raw data into cleaned format.

    Parameters
    ----------
    data : list of dict
        Raw data records to process

    Returns
    -------
    list of dict
        Cleaned and validated data records

    See Also
    --------
    validate_data : Validates individual records
    transform_data : Transforms data formats
    """
```

### Exception Handling

```python
# GOOD: Specific exceptions
try:
    result = database.query(sql)
except DatabaseConnectionError as e:
    logger.error(f"Database connection failed: {e}")
    return None
except InvalidQueryError as e:
    logger.error(f"Invalid query: {e}")
    raise

# BAD: Catching all exceptions
try:
    result = risky_operation()
except Exception:  # Too broad
    pass

# GOOD: Exception chaining
try:
    process_data(data)
except ValueError as e:
    raise DataProcessingError("Failed to process") from e

# GOOD: Context managers for resource management
with open('file.txt', 'r') as f:
    data = f.read()
# File automatically closed

# GOOD: Custom exceptions
class ValidationError(Exception):
    """Raised when data validation fails."""
    pass
```

### Import Organization

```python
# GOOD: PEP 8 import order
# 1. Standard library
import os
import sys
from typing import List, Optional

# 2. Third-party libraries
import requests
from django.conf import settings

# 3. Local application imports
from myapp.models import User
from myapp.utils import calculate_total

# GOOD: Use absolute imports
from myapp.utils import helper

# BAD: Avoid relative imports when possible
from ..utils import helper
```

### Python Best Practices

```python
# GOOD: List comprehensions for simple transformations
squares = [x**2 for x in range(10)]

# BAD: Overly complex list comprehensions
# Use a regular function instead
result = [complex_transform(x) for x in items if x > 0 and validate(x)]

# GOOD: Context managers
with open('file.txt') as f:
    data = f.read()

# GOOD: f-strings for formatting (Python 3.6+)
name = "Alice"
greeting = f"Hello, {name}!"

# BAD: Old-style formatting
greeting = "Hello, %s!" % name

# GOOD: Use generators for large datasets
def process_large_file(filename):
    with open(filename) as f:
        for line in f:  # Generator, not loading all into memory
            yield process_line(line)

# GOOD: dataclasses for data containers (Python 3.7+)
from dataclasses import dataclass

@dataclass
class User:
    id: int
    name: str
    email: str
    active: bool = True
```

## JavaScript (Modern ES6+)

### Code Style

**Naming Conventions**:
```javascript
// Variables and functions: camelCase
const userName = 'Alice';
function calculateTotal() { }

// Classes: PascalCase
class UserAccount { }

// Constants: UPPER_SNAKE_CASE
const MAX_CONNECTIONS = 100;
const API_KEY = 'secret';

// Private fields (ES2022): #prefix
class MyClass {
    #privateField = 0;
    #privateMethod() { }
}
```

### Modern JavaScript (ES6+) Features

```javascript
// GOOD: const and let (avoid var)
const API_URL = 'https://api.example.com';
let counter = 0;

// GOOD: Arrow functions
const add = (a, b) => a + b;
items.map(item => item.value);

// GOOD: Template literals
const message = `Hello, ${name}! You have ${count} messages.`;

// GOOD: Destructuring
const { name, email } = user;
const [first, second] = array;

// GOOD: Spread/Rest
const newArray = [...oldArray, newItem];
const sum = (...numbers) => numbers.reduce((a, b) => a + b, 0);

// GOOD: Optional chaining (ES2020)
const city = user?.address?.city;

// GOOD: Nullish coalescing (ES2020)
const value = input ?? 'default';

// GOOD: Async/await
async function fetchData() {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch failed:', error);
        throw error;
    }
}

// BAD: Promise chains when async/await is clearer
fetch(url)
    .then(res => res.json())
    .then(data => { })
    .catch(err => { });
```

### Error Handling

```javascript
// GOOD: Specific error handling
try {
    const user = await fetchUser(id);
} catch (error) {
    if (error instanceof NetworkError) {
        console.error('Network issue:', error.message);
    } else if (error instanceof AuthError) {
        console.error('Auth failed:', error.message);
    } else {
        throw error;  // Re-throw unexpected errors
    }
}

// GOOD: Custom error types
class ValidationError extends Error {
    constructor(message, field) {
        super(message);
        this.name = 'ValidationError';
        this.field = field;
    }
}
```

### Module System

```javascript
// GOOD: ES6 modules
// Export
export const API_URL = '...';
export function helper() { }
export default class MyClass { }

// Import
import MyClass, { helper, API_URL } from './myModule.js';
import * as utils from './utils.js';

// BAD: CommonJS (prefer ES6)
const utils = require('./utils');
module.exports = MyClass;
```

### JavaScript Best Practices

```javascript
// GOOD: Use strict equality
if (x === 5) { }
if (x !== null) { }

// BAD: Loose equality
if (x == 5) { }  // Can do unexpected type coercion

// GOOD: Function parameter defaults
function greet(name = 'Guest') {
    console.log(`Hello, ${name}`);
}

// GOOD: Array methods
const doubled = numbers.map(n => n * 2);
const evens = numbers.filter(n => n % 2 === 0);
const total = numbers.reduce((sum, n) => sum + n, 0);

// GOOD: Object property shorthand
const name = 'Alice';
const age = 30;
const person = { name, age };  // Instead of { name: name, age: age }

// GOOD: Destructuring for function parameters
function processUser({ id, name, email }) {
    // ...
}
```

## C# Coding Standards

### Naming Conventions (.NET Guidelines)

```csharp
// Classes, Interfaces, Methods: PascalCase
public class UserService { }
public interface IUserRepository { }
public void CalculateTotal() { }

// Local variables, parameters: camelCase
int itemCount;
string userName;
public void ProcessOrder(int orderId) { }

// Private fields: _camelCase with underscore prefix
private string _connectionString;

// Constants: PascalCase
public const int MaxConnections = 100;

// Properties: PascalCase
public string UserName { get; set; }

// Async methods: Async suffix
public async Task<User> GetUserAsync(int id) { }
```

### Modern C# Patterns

```csharp
// GOOD: String interpolation (C# 6+)
string message = $"Hello, {name}!";

// GOOD: Null-conditional operators (C# 6+)
int? length = users?.Length;
string city = user?.Address?.City;

// GOOD: Null-coalescing (C# 8+)
string name = userName ?? "Guest";
int count = items?.Count ?? 0;

// GOOD: Pattern matching (C# 7+)
if (obj is string s) {
    Console.WriteLine(s.Length);
}

// GOOD: Expression-bodied members (C# 6+)
public string FullName => $"{FirstName} {LastName}";
public int CalculateTotal() => price * quantity;

// GOOD: Using declarations (C# 8+)
using var file = new StreamReader(path);
// Automatically disposed

// GOOD: Async/await
public async Task<User> GetUserAsync(int id) {
    try {
        return await _context.Users.FindAsync(id);
    } catch (Exception ex) {
        _logger.LogError(ex, "Failed to get user");
        throw;
    }
}

// GOOD: LINQ
var activeUsers = users.Where(u => u.IsActive)
                      .OrderBy(u => u.Name)
                      .ToList();
```

### Resource Management

```csharp
// GOOD: using statement for deterministic cleanup
using (var connection = new SqlConnection(connectionString)) {
    connection.Open();
    // ...
}  // Automatically disposed

// GOOD: IDisposable implementation
public class ResourceManager : IDisposable {
    private bool _disposed = false;

    public void Dispose() {
        Dispose(true);
        GC.SuppressFinalize(this);
    }

    protected virtual void Dispose(bool disposing) {
        if (!_disposed) {
            if (disposing) {
                // Dispose managed resources
            }
            // Free unmanaged resources
            _disposed = true;
        }
    }
}
```

### Exception Handling

```csharp
// GOOD: Specific exceptions
try {
    ProcessFile(path);
} catch (FileNotFoundException ex) {
    _logger.LogError(ex, "File not found");
} catch (UnauthorizedAccessException ex) {
    _logger.LogError(ex, "Access denied");
    throw;
}

// GOOD: Custom exceptions
public class BusinessException : Exception {
    public BusinessException(string message) : base(message) { }
    public BusinessException(string message, Exception inner)
        : base(message, inner) { }
}
```

## C/C++ Standards

### C Coding Standards

```c
// GOOD: Descriptive function names (snake_case)
int calculate_total(int price, int quantity);

// GOOD: Constants are UPPER_CASE
#define MAX_BUFFER_SIZE 256
const int MAX_CONNECTIONS = 100;

// GOOD: Structs are PascalCase or snake_case
typedef struct {
    int id;
    char name[50];
} UserInfo;

// GOOD: Safe string operations
char buffer[256];
strncpy(buffer, input, sizeof(buffer) - 1);
buffer[sizeof(buffer) - 1] = '\0';

// GOOD: Check return values
if (fopen(file, "r") == NULL) {
    perror("Failed to open file");
    return ERROR;
}

// GOOD: Use sizeof instead of hardcoded sizes
int array[10];
size_t n = sizeof(array) / sizeof(array[0]);
```

### C++ Coding Standards

```cpp
// GOOD: Use standard library containers
std::vector<int> numbers = {1, 2, 3, 4, 5};
std::map<std::string, int> ages;
std::unique_ptr<User> user_ptr = std::make_unique<User>();

// GOOD: Range-based for loops
for (const auto& item : items) {
    process(item);
}

// GOOD: Const correctness
void process(const std::string& data);  // Read-only parameter
const int MAX_SIZE = 100;  // Compile-time constant

// GOOD: Smart pointers (avoid raw pointers)
std::unique_ptr<Resource> ptr = std::make_unique<Resource>();
std::shared_ptr<Resource> shared = std::make_shared<Resource>();

// BAD: Raw pointers with manual memory management
Resource* ptr = new Resource();
delete ptr;  // Easy to forget or cause leaks

// GOOD: RAII for resource management
class FileManager {
public:
    FileManager(const std::string& path) : file_(fopen(path.c_str(), "r")) { }
    ~FileManager() { if (file_) fclose(file_); }
private:
    FILE* file_;
};

// GOOD: Standard library algorithms
std::sort(vec.begin(), vec.end());
auto it = std::find(vec.begin(), vec.end(), target);
```

### Memory Safety (C++)

```cpp
// GOOD: Use std::string instead of char*
std::string name = "Alice";

// GOOD: Use std::vector instead of arrays
std::vector<int> numbers(100);

// GOOD: Avoid C-style casts
// BAD: int x = (int)ptr;
// GOOD: int x = static_cast<int>(value);

// GOOD: Use std::array for fixed-size arrays
std::array<int, 10> fixed_array;

// GOOD: Move semantics for efficiency
std::string result = build_huge_string();  // Move instead of copy
```

## Dart (Effective Dart Guidelines)

### Code Style

```dart
// GOOD: camelCase for variables, functions, parameters
var userName = 'Alice';
int calculateTotal(int price, int quantity) => price * quantity;

// GOOD: PascalCase for types, classes, enums
class UserAccount { }
enum Status { active, inactive }

// GOOD: lowercase_with_underscores for libraries, packages
import 'package:my_package/utils.dart';

// GOOD: camelCase for constants (traditional Dart style)
const maxConnections = 100;
const apiTimeout = 5000;

// GOOD: Private members use _ prefix
class MyClass {
  int _privateField;
  void _privateMethod() { }
}
```

### Null Safety (Dart 2.12+)

```dart
// GOOD: Non-nullable by default
String name = 'Alice';  // Cannot be null
int calculate(int x, int y) => x + y;

// GOOD: Nullable types with ?
String? name;  // Can be null
int? calculate(int? x, int? y) => x != null && y != null ? x + y : null;

// GOOD: Null-aware operators
String? name;
String displayName = name ?? 'Guest';
int? length = name?.length;

// GOOD: Late keyword for lazy initialization
late String heavyComputation = calculateHeavyValue();

// GOOD: Required keyword for named parameters
class User {
  final String name;
  User({required this.name});
}
```

### Async Patterns

```dart
// GOOD: async/await
Future<String> fetchData() async {
  try {
    final response = await http.get(url);
    return response.body;
  } catch (e) {
    log('Error: $e');
    rethrow;
  }
}

// GOOD: Error handling in async
await fetchData().catchError((error) {
  log('Failed: $error');
});
```

### Collections

```dart
// GOOD: Collection literals
var names = ['Alice', 'Bob', 'Charlie'];
var ages = {'Alice': 30, 'Bob': 25};

// GOOD: Spread operators
var allNames = ['Alice', ...names, 'Zoe'];

// GOOD: Collection if/for
var filtered = [
  'Apple',
  if (includeBanana) 'Banana',
  for (var item in items) item.toUpperCase(),
];

// GOOD: Null-aware operators with collections
var items = [];
var first = items.firstOrNull;  // Returns null if empty
var last = items.lastOrNull;
```

## Cross-Language Best Practices

### What to Check Across All Languages

1. **Naming**: Follow language-specific conventions consistently
2. **Error Handling**: Proper try-catch with specific exception types
3. **Resource Management**: Use RAII, context managers, or using statements
4. **Null Safety**: Handle null/undefined appropriately
5. **Type Safety**: Use type annotations/hints where beneficial
6. **Immutability**: Prefer const/readonly/final when appropriate
7. **Code Organization**: Logical structure, proper separation of concerns
8. **Documentation**: Document public APIs, complex logic
9. **Testing**: Code should be testable, have appropriate test coverage
10. **Security**: Follow secure coding practices per language

### Common Anti-Patterns to Avoid

All Languages:
- Magic numbers (use named constants)
- Deep nesting (>4 levels)
- Functions/methods that are too long (>50 lines)
- God classes/functions (too many responsibilities)
- Copy-paste code (DRY - Don't Repeat Yourself)
- Inconsistent style (use linters/formatters)

Language-Specific Anti-Patterns in `references/common-anti-patterns.md`
