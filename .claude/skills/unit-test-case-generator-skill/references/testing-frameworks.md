# Testing Frameworks by Language

## C Language (.c)

### Popular Frameworks
- **CUnit**: Standard C unit testing framework
- **Check**: Lightweight C unit testing
- **Unity**: Simple C framework for embedded systems
- **Google Test**: C++ but works with C

### Common Test Patterns
```c
// Test structure example
void test_valid_input() {
    // Arrange
    int input = 5;

    // Act
    int result = calculate(input);

    // Assert
    CU_ASSERT(result == 10);
}
```

### Key Testing Areas
- Pointer operations
- Memory allocation/deallocation
- String manipulation
- Array bounds
- Integer arithmetic overflow

## Python Language (.py, .ipynb)

### Popular Frameworks
- **unittest**: Built-in Python testing framework
- **pytest**: Most popular, powerful features
- **nose2**: Extension of unittest
- **doctest**: Tests in docstrings

### Common Test Patterns
```python
# pytest example
def test_valid_input():
    # Arrange
    input = 5

    # Act
    result = calculate(input)

    # Assert
    assert result == 10
```

### Key Testing Areas
- Exception handling
- Type coercion
- List/dict operations
- Async functions
- Class methods
- Edge cases with None, empty values

## JavaScript Language (.js)

### Popular Frameworks
- **Jest**: Most popular, zero config
- **Mocha**: Flexible, works with various assertion libraries
- **Jasmine**: Behavior-driven development
- **Vitest**: Fast, native ESM

### Common Test Patterns
```javascript
// Jest example
test('valid input', () => {
    // Arrange
    const input = 5;

    // Act
    const result = calculate(input);

    // Assert
    expect(result).toBe(10);
});
```

### Key Testing Areas
- Async/await functions
- Promise rejection
- Array methods
- Object manipulation
- DOM manipulation (frontend)
- Event handling

## Dart Language (.dart)

### Popular Frameworks
- **test**: Dart's official testing package
- **mockito**: Mocking framework

### Common Test Patterns
```dart
// Dart test example
test('valid input', () {
    // Arrange
    var input = 5;

    // Act
    var result = calculate(input);

    // Assert
    expect(result, equals(10));
});
```

### Key Testing Areas
- Null safety (Dart 2.12+)
- Async functions (Future, async/await)
- Stream handling
- Isolate communication
- Class inheritance

## C++ Language (.cpp)

### Popular Frameworks
- **Google Test**: Most popular C++ testing framework
- **Catch2**: Header-only, easy to integrate
- **Boost.Test**: Part of Boost libraries
- **CppUTest**: Lightweight C/C++ framework

### Common Test Patterns
```cpp
// Google Test example
TEST(CalculateTest, ValidInput) {
    // Arrange
    int input = 5;

    // Act
    int result = calculate(input);

    // Assert
    EXPECT_EQ(result, 10);
}
```

### Key Testing Areas
- Object-oriented features
- Template functions/classes
- Exception handling
- STL containers
- Memory management
- Operator overloading

## C# Language (.cs)

### Popular Frameworks
- **xUnit**: Popular for .NET Core/.NET 5+
- **NUnit**: Classic .NET testing framework
- **MSTest**: Microsoft's official framework
- **FluentAssertions**: Assertion library

### Common Test Patterns
```csharp
// xUnit example
[Fact]
public void ValidInput_ReturnsExpectedResult()
{
    // Arrange
    var input = 5;

    // Act
    var result = Calculate(input);

    // Assert
    Assert.Equal(10, result);
}
```

### Key Testing Areas
- Exception handling (Assert.Throws)
- LINQ queries
- Async/await patterns
- Dependency injection
- Interfaces and mocking
- Properties and events
