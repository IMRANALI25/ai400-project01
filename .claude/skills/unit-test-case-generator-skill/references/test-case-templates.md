# Unit Test Case Templates

Ready-to-use test case templates for each supported programming language.

## C Language Templates

### Basic Function Test Template

```c
/* Test: Test function returns sum of two numbers */
void test_calculateSum_TwoValidInputs_ReturnsSum() {
    // Arrange
    int num1 = 10;
    int num2 = 20;
    int expected = 30;

    // Act
    int result = calculateSum(num1, num2);

    // Assert
    assert_equal(expected, result);
}
```

### Edge Case Test Template

```c
/* Test: Test function handles zero correctly */
void test_calculateSum_ZeroAndPositive_ReturnsValidResult() {
    // Arrange
    int num1 = 0;
    int num2 = 5;
    int expected = 5;

    // Act
    int result = calculateSum(num1, num2);

    // Assert
    assert_equal(expected, result);
}
```

### Error Condition Test Template

```c
/* Test: Test function handles NULL pointer */
void test_processString_NullPointer_ThrowsError() {
    // Arrange
    char *input = NULL;

    // Act & Assert
    ASSERT_NULL(processString(input));
}
```

---

## Python Templates

### Basic Function Test (pytest)

```python
def test_calculate_sum_two_valid_numbers_returns_sum():
    """Test that calculate_sum returns the sum of two valid numbers."""
    # Arrange
    num1 = 10
    num2 = 20
    expected = 30

    # Act
    result = calculate_sum(num1, num2)

    # Assert
    assert result == expected
```

### Edge Case Test (pytest)

```python
def test_calculate_sum_with_zero_returns_valid_result():
    """Test that calculate_sum handles zero correctly."""
    # Arrange
    num1 = 0
    num2 = 15
    expected = 15

    # Act
    result = calculate_sum(num1, num2)

    # Assert
    assert result == expected
```

### Exception Test (pytest)

```python
def test_divide_by_zero_throws_exception():
    """Test that divide_by_zero raises ValueError for zero divisor."""
    # Arrange
    numerator = 10
    divisor = 0

    # Act & Assert
    with pytest.raises(ValueError, match="Cannot divide by zero"):
        divide(numerator, divisor)
```

### Parametrized Test (pytest)

```python
@pytest.mark.parametrize("input, expected", [
    (2, 4),
    (0, 0),
    (-1, -2),
    (100, 200),
])
def test_calculate_square_various_inputs_returns_square(input, expected):
    """Test that calculate_square returns correct square for various inputs."""
    # Arrange & Act
    result = calculate_square(input)

    # Assert
    assert result == expected
```

### Async Test (pytest-asyncio)

```python
@pytest.mark.asyncio
async def test_fetch_data_success_returns_data():
    """Test that fetch_data successfully retrieves data."""
    # Arrange
    url = "https://api.example.com/data"

    # Act
    result = await fetch_data(url)

    # Assert
    assert result is not None
    assert "status" in result
```

---

## JavaScript Templates

### Basic Function Test (Jest)

```javascript
describe('calculateSum', () => {
    test('should return sum when given two valid numbers', () => {
        // Arrange
        const num1 = 10;
        const num2 = 20;
        const expected = 30;

        // Act
        const result = calculateSum(num1, num2);

        // Assert
        expect(result).toBe(expected);
    });
});
```

### Edge Case Test (Jest)

```javascript
test('should handle empty array correctly', () => {
    // Arrange
    const input = [];

    // Act
    const result = processData(input);

    // Assert
    expect(result).toEqual([]);
});
```

### Error Condition Test (Jest)

```javascript
test('should throw error for null input', () => {
    // Arrange
    const input = null;

    // Act & Assert
    expect(() => {
        processData(input);
    }).toThrow("Input cannot be null");
});
```

### Async Test (Jest)

```javascript
test('should fetch user data successfully', async () => {
    // Arrange
    const userId = 123;

    // Act
    const result = await fetchUserData(userId);

    // Assert
    expect(result).toBeDefined();
    expect(result.id).toBe(userId);
});
```

### DOM Test (Jest + React Testing Library)

```javascript
test('button click should increment counter', () => {
    // Arrange
    const { getByText } = render(<Counter />);

    // Act
    fireEvent.click(getByText('Increment'));

    // Assert
    expect(getByText('Count: 1')).toBeInTheDocument();
});
```

---

## Dart Templates

### Basic Function Test

```dart
void main() {
  group('calculateSum', () {
    test('returns sum of two valid numbers', () {
      // Arrange
      final num1 = 10;
      final num2 = 20;
      final expected = 30;

      // Act
      final result = calculateSum(num1, num2);

      // Assert
      expect(result, expected);
    });
  });
}
```

### Edge Case Test

```dart
test('returns zero when given array is empty', () {
  // Arrange
  final numbers = <int>[];

  // Act
  final result = sumArray(numbers);

  // Assert
  expect(result, 0);
});
```

### Exception Test

```dart
test('throws FormatException when given invalid date', () {
  // Arrange
  const invalidDate = '2023-13-45'; // Invalid month and day

  // Act & Assert
  expect(() => parseDate(invalidDate), throwsFormatException);
});
```

### Async Test

```dart
test('fetches user data successfully', () async {
  // Arrange
  final userId = '123';

  // Act
  final result = await fetchUserData(userId);

  // Assert
  expect(result, isNotNull);
  expect(result.id, userId);
});
```

---

## C++ Templates

### Basic Function Test (Google Test)

```cpp
TEST(CalculateSum, TwoValidInputs_ReturnsSum) {
    // Arrange
    int num1 = 10;
    int num2 = 20;
    int expected = 30;

    // Act
    int result = calculateSum(num1, num2);

    // Assert
    EXPECT_EQ(expected, result);
}
```

### Edge Case Test (Google Test)

```cpp
TEST(CalculateSum, ZeroInput_ReturnsZero) {
    // Arrange
    std::vector<int> inputs = {0, 0};

    // Act
    int result = calculateSum(inputs);

    // Assert
    EXPECT_EQ(0, result);
}
```

### Exception Test (Google Test)

```cpp
TEST(ParseInt, InvalidString_ThrowsException) {
    // Arrange
    std::string input = "not_a_number";

    // Act & Assert
    EXPECT_THROW(
        parseInt(input),
        std::invalid_argument
    );
}
```

### Fixture-Based Test (Google Test)

```cpp
class CalculatorTest : public ::testing::Test {
protected:
    Calculator calc;
    void SetUp() override {
        calc = Calculator();
    }
};

TEST_F(CalculatorTest, Add_DefaultValues_ReturnsSum) {
    // Act
    int result = calc.add(5, 3);

    // Assert
    EXPECT_EQ(8, result);
}
```

---

## C# Templates

### Basic Function Test (MSTest)

```csharp
[TestMethod]
public void CalculateSum_TwoValidNumbers_ReturnsSum()
{
    // Arrange
    int num1 = 10;
    int num2 = 20;
    int expected = 30;

    // Act
    int result = _calculator.CalculateSum(num1, num2);

    // Assert
    Assert.AreEqual(expected, result);
}
```

### Edge Case Test (xUnit)

```csharp
[Fact]
public void ProcessList_EmptyList_ReturnsEmptyResult()
{
    // Arrange
    var input = new List<int>();

    // Act
    var result = _processor.ProcessList(input);

    // Assert
    Assert.Empty(result);
}
```

### Exception Test (NUnit)

```csharp
[Test]
public void Divide_DivideByZero_ThrowsDivideByZeroException()
{
    // Arrange
    int numerator = 10;
    int divisor = 0;

    // Act & Assert
    Assert.Throws<DivideByZeroException>(() =>
        _calculator.Divide(numerator, divisor)
    );
}
```

### Async Test (xUnit)

```csharp
[Fact]
public async Task FetchData_ValidUrl_ReturnsData()
{
    // Arrange
    var url = "https://api.example.com/data";

    // Act
    var result = await _service.FetchData(url);

    // Assert
    Assert.NotNull(result);
    Assert.Equal("success", result.Status);
}
```

### Data-Driven Test (MSTest)

```csharp
[DataRow(1, 2, 3)]
[DataRow(0, 5, 5)]
[DataRow(-1, 1, 0)]
[DataTestMethod]
public void Add_TwoNumbers_ReturnsSum(int num1, int num2, int expected)
{
    // Act
    int result = _calculator.Add(num1, num2);

    // Assert
    Assert.AreEqual(expected, result);
}
```

---

## Test Case Description Guidelines

### 1-2 Line Description Format

**Good Examples**:
- "Test that function returns correct sum for two positive integers"
- "Verify that empty input array returns zero"
- "Check that division by zero throws appropriate exception"
- "Ensure function handles null pointer gracefully"

**Bad Examples**:
- "Test sum" (too vague)
- "Test edge case" (not specific)
- "Test error" (doesn't say what error)
- "Test basic functionality" (unclear)

### Description Components

Each 1-2 line description should include:

1. **What is being tested**: The function/method and scenario
2. **Why it matters**: The importance or context
3. **Expected outcome**: What should happen

**Pattern**: "Test that [function] [scenario] [expected result]"

---

## Test Case Priority Guidelines

### High Priority (Must-Have)
- Core functionality
- Business logic
- User-facing features
- Security-critical operations
- Regulatory/compliance requirements

### Medium Priority (Should-Have)
- Edge cases (boundaries)
- Error handling
- Performance considerations
- Integration points
- Data validation

### Low Priority (Nice-to-Have)
- Rare edge cases
- UI/UX refinements
- Logging and debugging
- Configuration options
- Documentation examples

---

## Language-Specific File Extensions

| Language | Valid Extensions | Invalid Extensions |
|----------|-----------------|-------------------|
| C | .c | .h, .hpp, .cpp |
| Python | .py, .ipynb | .pyw, .pyc |
| JavaScript | .js | .jsx, .ts, .json |
| Dart | .dart | .dat, .txt |
| C++ | .cpp | .c, .h, .hpp |
| C# | .cs | .vb, .fs |

**Note**: Jupyter notebooks (.ipynb) are supported for Python but require special handling to parse code cells.
