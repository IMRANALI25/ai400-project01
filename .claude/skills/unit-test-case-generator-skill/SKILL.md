---
name: unit-test-case-generator-skill
description: Generate comprehensive, enterprise-level unit test case documentation for source code files. Analyzes C (.c), Python (.py, .ipynb), JavaScript (.js), Dart (.dart), C++ (.cpp), and C# (.cs) source code to produce professional test case documents with detailed test scenarios, steps, and expected results. Use when user requests test case generation for source code, needs unit test documentation, wants to analyze code for testing coverage, or asks what test cases should be written for specific code. Output test cases to /unit-test-case-generator-skill/Test_Cases/Test Case of [Source Code Title]/[Title of Source Code File].md
---

# Unit Test Case Generator

## Overview

Generate comprehensive unit test case documentation for software source code. Analyze code structure, identify test scenarios, and produce enterprise-level test case documents with detailed descriptions for each test.

## Supported Languages

- **C** (.c)
- **Python** (.py, .ipynb)
- **JavaScript** (.js)
- **Dart** (.dart)
- **C++** (.cpp)
- **C#** (.cs)

## Workflow

### 1. Read and Analyze Source Code

Read the provided source code file completely. Identify:

- **Functions/Methods**: All callable units with signatures
- **Classes/Structs**: Data structures and their relationships
- **Control Flow**: Branches, loops, conditions
- **Input/Output**: Parameters, return values, side effects
- **Dependencies**: External calls, imported modules
- **Error Handling**: Exception scenarios, error codes

For language-specific patterns, consult `references/testing-frameworks.md`.

### 2. Identify Test Scenarios

For each function/method, generate test cases covering:

#### Functional Coverage
- **Happy Path**: Valid, typical inputs
- **Invalid Inputs**: Null/None, wrong types, out of range
- **Boundary Values**: Min, max, min-1, max+1
- **Edge Cases**: Empty collections, single items, zero, negative
- **Error Handling**: Exceptions, error codes, failures

#### Language-Specific Tests

**C/C++**:
- Pointer operations (NULL, dangling, invalid)
- Array bounds (underflow, overflow)
- Integer overflow/underflow
- Memory allocation (malloc/free)
- String termination (null bytes)

**Python**:
- Type coercion (implicit conversions)
- Exception handling (try/except paths)
- Empty/None values
- Mutable default arguments
- List/dict comprehensions

**JavaScript**:
- Type coercion (==, ===)
- Async/await error paths
- Promise rejection
- Array/object mutations
- NaN, Infinity, undefined

**Dart**:
- Null safety violations
- Async function errors
- Stream errors
- Type casting failures

**C#**:
- Exception throwing
- LINQ query edge cases
- Null reference exceptions
- Async method failures
- Generic type constraints

### 3. Format Test Cases

Use enterprise format from `references/test-case-standards.md`:

```markdown
# Test Cases for [Module/File Name]

**Source File**: [filename]
**Language**: [language]
**Date Generated**: [date]

## Test Case Summary

| Category | Count |
|----------|-------|
| Happy Path | X |
| Invalid Inputs | X |
| Boundary Values | X |
| Edge Cases | X |
| Error Handling | X |
| **Total** | **X** |

## Test Cases

| Test Case ID | Test Scenario | Test Description | Preconditions | Test Steps | Test Data | Expected Result | Priority |
|--------------|---------------|------------------|---------------|------------|-----------|-----------------|----------|
```

### 4. Write Test Descriptions

Each test description must be 1-2 lines maximum and include:

- **What**: Specific condition being tested
- **Why**: Business value or risk addressed

Examples:
- "Verify system accepts valid username and password combination to ensure authenticated access"
- "Validate function returns error when dividing by zero to prevent application crash"
- "Confirm array access throws exception for negative index to prevent memory corruption"

### 5. Generate Test Steps

Write numbered, actionable steps:

1. **Arrange**: Set up test data and preconditions
2. **Act**: Execute the function/method being tested
3. **Assert**: Verify expected outcome

Example:
```
1. Initialize array with valid data [1, 2, 3]
2. Call findMax(array) function
3. Verify function returns 3 as maximum value
```

### 6. Assign Priority

- **Critical**: Security, data loss, crash risks
- **High**: Core business logic, user-visible features
- **Medium**: Supporting functionality
- **Low**: Nice-to-have, UI polish

### 7. Output to File

Save to: `/unit-test-case-generator-skill/Test_Cases/Test Case of [Source Code Title]/[Title of Source Code File].md`

**Path construction rules**:
- Test Case of Source Code Title = "Test Case of " + Capitalized file/function/module name (without extension)
- Title of Source Code File = Original filename with extension replaced by .md
- Create subdirectories if they don't exist

Example: For `calculator.c`, output to `/unit-test-case-generator-skill/Test_Cases/Test Case of Calculator/calculator.md`

## Quality Checklist

Before completing, verify:

- [ ] Every function/method has test coverage
- [ ] Happy path, boundary, and error cases covered for each function
- [ ] Language-specific edge cases identified
- [ ] All test descriptions are 1-2 lines maximum
- [ ] Test steps are numbered and actionable
- [ ] Expected results are clear and measurable
- [ ] Priorities assigned appropriately
- [ ] Output file created in correct location

## Resources

- `references/test-case-standards.md`: Enterprise test case format specifications
- `references/testing-frameworks.md`: Language-specific testing patterns and frameworks
