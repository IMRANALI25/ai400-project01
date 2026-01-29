# Unit Testing Standards & Best Practices

Enterprise-level standards for generating professional unit test cases across programming languages.

## Overview

Unit tests verify the smallest testable parts of an application (functions, methods, classes, modules) in isolation from the rest of the system. These standards ensure generated test cases are comprehensive, maintainable, and follow industry best practices.

## Supported Languages

| Language | File Extensions | Testing Frameworks |
|----------|-----------------|-------------------|
| **C** | .c | CUnit, Unity, Check, Google Test |
| **Python** | .py, .ipynb | unittest, pytest, nose2, unittest2 |
| **JavaScript** | .js | Jest, Mocha, Jasmine, QUnit, AVA |
| **Dart** | .dart | test package, test package, mockito |
| **C++** | .cpp | Google Test, Catch2, Boost.Test, CppUnit |
| **C#** | .cs | MSTest, NUnit, xUnit, MbUnit |

## General Unit Testing Principles

### AAA Pattern (Arrange-Act-Assert)

All test cases should follow this structure:

```
1. ARRANGE: Set up the test objects and prepare data
2. ACT: Execute the function/method being tested
3. ASSERT: Verify the result matches expectations
```

### Test Case Naming Conventions

**Format**: `[MethodName_StateUnderTest_ExpectedOutcome]`

**Examples**:
- `calculateSum_TwoValidNumbers_ReturnsSum`
- `validateEmail_InvalidEmail_ThrowsException`
- `parseJSON_ValidJSON_ReturnsObject`
- `divideByZero_ZeroDivisor_ThrowsException`

### Test Case Categories

1. **Happy Path Tests** - Normal operating conditions
   - Valid inputs
   - Expected behavior
   - Success scenarios

2. **Edge Cases** - Boundary conditions
   - Minimum/maximum values
   - Empty/null inputs
   - Single element collections

3. **Error Conditions** - Invalid inputs
   - Negative numbers where invalid
   - Null/undefined values
   - Invalid data types
   - Out of range values

4. **Security Tests** - Input validation
   - SQL injection attempts
   - XSS vulnerabilities
   - Buffer overflow risks
   - Authentication/authorization

---

## Language-Specific Standards

### 1. C Language Unit Tests

#### Frameworks
- **CUnit** - Standard C framework
- **Google Test** - Cross-platform, recommended
- **Unity** - Lightweight, embedded systems

#### Test Case Template

```c
void test_function_name_scenario_expected_result() {
    // Arrange
    type input1 = 10;
    type input2 = 20;
    type expected = 30;

    // Act
    type result = function_to_test(input1, input2);

    // Assert
    ASSERT_EQUAL(expected, result);
}
```

#### Best Practices
- Test all functions with Cyclomatic Complexity > 1
- Test boundary conditions (INT_MIN, INT_MAX, 0, 1, -1)
- Test pointer validity (NULL checks)
- Test memory management (allocation/deallocation)
- Test error handling (error codes, NULL returns)
- Use descriptive test function names
- One assertion per test (when possible)
- Mock external dependencies

#### Common Test Cases for C
- **Arithmetic Operations**: Overflow, underflow, divide by zero
- **String Operations**: NULL strings, empty strings, buffer overflow
- **Array Operations**: Out of bounds, NULL arrays, size limits
- **Pointer Operations**: NULL pointers, dangling pointers, memory leaks
- **Struct Operations**: Field access, initialization, copying

---

### 2. Python Unit Tests

#### Frameworks
- **unittest** - Built-in module
- **pytest** - Modern, feature-rich (recommended)
- **nose2** - Extended unittest
- **unittest2** - Backport for Python 2/3 compatibility

#### Test Case Template

```python
def test_function_name_scenario_expected_result():
    """Test case description: what is being tested and why."""
    # Arrange
    input_value = 10
    expected_output = 20

    # Act
    result = function_to_test(input_value)

    # Assert
    assert expected_output == result
```

#### Best Practices
- Use descriptive test names with docstrings
- Follow PEP 8 style guide
- Test with Pythonic idioms (list comprehensions, generators)
- Test exceptions with `pytest.raises()`
- Use fixtures for setup/teardown
- Parametrize tests for multiple inputs
- Mock external dependencies (unittest.mock, pytest-mock)
- Test async functions with pytest-asyncio
- Test class methods, properties, and magic methods

#### Common Test Cases for Python
- **Data Types**: Type conversion, None/empty values, special values
- **Collections**: Empty lists/dicts, single items, duplicates
- **Strings**: Empty strings, unicode, encoding
- **Exceptions**: Invalid inputs, edge cases, custom exceptions
- **Async**: Race conditions, timeout, error handling
- **Classes**: Initialization, inheritance, polymorphism
- **File I/O**: Missing files, permissions, encoding errors

---

### 3. JavaScript Unit Tests

#### Frameworks
- **Jest** - Facebook's framework (recommended)
- **Mocha** - Flexible, popular
- **Jasmine** - Behavior-driven
- **QUnit** - jQuery-focused
- **AVA** - Concurrent test execution

#### Test Case Template

```javascript
describe('FunctionName', () => {
    test('should return expected result when given valid input', () => {
        // Arrange
        const input = 10;
        const expected = 20;

        // Act
        const result = functionName(input);

        // Assert
        expect(result).toBe(expected);
    });
});
```

#### Best Practices
- Use descriptive test names (should format when given then expected)
- Group related tests with describe blocks
- Use `beforeEach` and `afterEach` for setup/teardown
- Test promises with `.resolves()` and `.rejects()`
- Test async/await with async/await keywords
- Mock functions with `jest.fn()` and `jest.spyOn()`
- Test DOM manipulation with jsdom
- Test React components with @testing-library/react
- Parameterize tests with test.each

#### Common Test Cases for JavaScript
- **Types**: Undefined, null, NaN, objects, arrays
- **Equality**: == vs ===, shallow vs deep equality
- **Asynchronous**: Promises, async/await, callbacks
- **DOM**: Element existence, classes, attributes
- **Events**: Click handlers, form submission, custom events
- **Modules**: Imports, exports, default vs named
- **Error Handling**: try/catch, thrown errors, error objects

---

### 4. Dart Unit Tests

#### Frameworks
- **test** package - Built-in Dart testing
- **test** package (flutter_test) - Flutter testing
- **mockito** - Mocking framework

#### Test Case Template

```dart
void main() {
  group('FunctionName', () {
    test('should return expected result when given valid input', () {
      // Arrange
      final input = 10;
      final expected = 20;

      // Act
      final result = functionName(input);

      // Assert
      expect(result, expected);
    });
  });
}
```

#### Best Practices
- Use group() to organize related tests
- Use descriptive test names
- Test with expect() matchers
- Use setUp() and tearDown() for fixtures
- Mock classes with mockito
- Test asynchronous code with async/await
- Test streams with test streams utilities
- Test Flutter widgets with WidgetTester
- Follow Dart naming conventions

#### Common Test Cases for Dart
- **Types**: Null safety, type casting, generics
- **Collections**: Empty lists, single items, duplicates
- **Async**: Futures, Streams, Completers
- **Error Handling**: Exceptions, onerror, catchError
- **Classes**: Constructors, getters/setters, operators
- **Flutter**: Widgets, state, lifecycle

---

### 5. C++ Unit Tests

#### Frameworks
- **Google Test** (gtest) - Industry standard (recommended)
- **Catch2** - Modern, BDD-style
- **Boost.Test** - Part of Boost libraries
- **CppUnit** - C++ port of JUnit

#### Test Case Template

```cpp
TEST(FunctionName, Scenario_ExpectedResult) {
    // Arrange
    int input1 = 10;
    int input2 = 20;
    int expected = 30;

    // Act
    int result = functionName(input1, input2);

    // Assert
    EXPECT_EQ(expected, result);
}
```

#### Best Practices
- Use TEST() macro for normal tests
- Use TEST_F() for fixture-based tests
- Use TEST_P() for parameterized tests
- Test object-oriented features (constructors, operators)
- Test templates with multiple types
- Test exceptions with EXPECT_THROW
- Test floating point with EXPECT_NEAR
- Mock objects with Google Mock
- Test RAII patterns

#### Common Test Cases for C++
- **Constructors/Destructors**: Resource management, exceptions
- **Operator Overloading**: All operators, edge cases
- **Templates**: Multiple type instantiations
- **Inheritance**: Base/derived class behavior
- **Polymorphism**: Virtual functions, abstract classes
- **STL Containers**: Empty, full, different types
- **Memory**: Smart pointers, leaks, dangling pointers
- **Exceptions**: Throwing, catching, re-throwing

---

### 6. C# Unit Tests

#### Frameworks
- **MSTest** - Microsoft's framework (VS default)
- **NUnit** - Popular, feature-rich
- **xUnit** - Community framework
- **MbUnit** - Lightweight, extensible

#### Test Case Template

```csharp
[TestMethod]
public void FunctionName_Scenario_ExpectedResult()
{
    // Arrange
    var input = 10;
    var expected = 20;

    // Act
    var result = _className.FunctionName(input);

    // Assert
    Assert.AreEqual(expected, result);
}
```

#### Best Practices
- Use `[TestMethod]` attribute for test methods
- Use `[TestClass]` attribute for test classes
- Use `[SetUp]` and `[TearDown]` for fixtures
- Use `[TestCategory]` for organization
- Use `[TestCase]` for parameterized tests
- Mock interfaces with Moq or NSubstitute
- Test async methods with async/await
- Test exceptions with ExpectedException attribute
- Follow .NET naming conventions

#### Common Test Cases for C#
- **Types**: Null, default values, type conversion
- **Collections**: Empty, single item, LINQ operations
- **Async**: Tasks, async/await, cancellation
- **Exceptions**: Throwing, catching, custom exceptions
- **Properties**: Getters, setters, auto-implemented
- **Generics**: Type constraints, multiple types
- **LINQ**: Queries, projections, aggregations
- **Events**: Subscribing, raising, custom events

---

## Enterprise Test Case Documentation Format

### Test Case Document Structure

```markdown
# Unit Test Cases for [Component/Module Name]

## Test Case Summary
- **Total Test Cases**: X
- **Languages**: [Language]
- **Framework**: [Framework Name]
- **Author**: [Name/Team]
- **Date**: [Date]
- **Version**: [Version]

## Test Cases

### TC001: [Test Case Name]

**Priority**: High/Medium/Low
**Type**: Functional/Edge/Error/Security
**Complexity**: Low/Medium/High
**Automated**: Yes/No

**Description**: [1-2 line description of what is being tested and why]

**Preconditions**:
- [List of required setup conditions]
- [Required test data or fixtures]

**Test Steps**:
1. [Step 1 with specific details]
2. [Step 2 with specific details]
3. [Step 3 with specific details]

**Test Data**:
| Input | Expected Output | Notes |
|-------|---------------|-------|
| value1 | result1 | Explanation |
| value2 | result2 | Explanation |

**Expected Result**:
- [Clear statement of what should happen]
- [Success criteria]

**Actual Result**: [To be filled during execution]
- [Pass/Fail status]
- [Notes if failed]

**Dependencies**:
- [Other test cases this depends on]
- [Required fixtures or mocks]

---

## Test Coverage Guidelines

### Statement Coverage
- Aim for 80% minimum, 90% preferred
- Test all branches (if/else, switch/case)
- Test all loops (for, while, do-while, foreach)

### Branch Coverage
- Test all true/false conditions
- Test all exception paths
- Test all early returns

### Path Coverage
- Test all possible execution paths
- Focus on complex logic
- Identify unreachable code (dead code)

### Condition Coverage
- Test all boolean operators (&&, ||, !)
- Test all relational operators (==, !=, <, >, etc.)
- Test all combinations in compound conditions

---

## Test Case Quality Checklist

Before finalizing test cases, verify:

- [ ] Each test has clear, descriptive name
- [ ] AAA pattern followed (Arrange-Act-Assert)
- [ ] Test data includes valid, edge, and error cases
- [ ] Assertions are specific and meaningful
- [ ] Tests are independent (can run in any order)
- [ ] Tests are repeatable (same result each time)
- [ ] Tests are fast (complete in reasonable time)
- [ ] Tests maintainable (easy to understand and modify)
- [ ] Edge cases identified and tested
- [ ] Error conditions tested
- [ ] Security considerations addressed
- [ ] Naming conventions followed
- [ ] Documentation is clear and complete

---

## Anti-Patterns to Avoid

### What NOT to Do

1. **Don't test the framework** - Trust that Assert works
2. **Don't test trivial code** - Only test non-obvious logic
3. **Don't test multiple concerns** - One test per scenario
4. **Don't use magic numbers** - Use named constants
5. **Don't hardcode test data** - Use fixtures or parameters
6. **Don't write fragile tests** - Tests should be robust
7. **Don't ignore warnings** - Investigate and fix
8. **Don't duplicate test logic** - Extract to helper functions
9. **Don't test private methods** - Test public interface only
10. **Don't skip error cases** - Test must-fail scenarios

### Common Mistakes

- **Testing implementation details** instead of behavior
- **Brittle tests** that break with minor code changes
- **Tests with random behavior** (without seeding)
- **Tests that depend on execution order**
- **Tests with hidden dependencies**
- **Tests that are too slow** (performance tests go elsewhere)
- **Tests with unclear failure messages**
- **Missing edge case coverage
