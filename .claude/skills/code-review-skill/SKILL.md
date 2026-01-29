---
name: code-review-skill
description: |
  This skill generates professional, enterprise-level code review documents for source code files. Use when users request code reviews, static code analysis, or quality assessments of their code. Supports C (.c), Python (.py, .ipynb), JavaScript (.js), Dart (.dart), C++ (.cpp), and C# (.cs) files. The skill performs comprehensive deep analysis including security vulnerabilities, performance issues, code quality, best practices violations, maintainability assessment, and provides before/after code examples for fixes. Outputs review documents to /code-review/Review_Codes/Review_Source_Code_Title/ in Markdown format.
---

# Code Review Skill

## Overview

Generate professional, enterprise-level code review documents that analyze source code for quality, security, performance, and maintainability issues. This skill performs comprehensive deep analysis with actionable remediation guidance including before/after code examples.

## Before Implementation

Gather context to ensure successful implementation:

| Source | Gather |
|--------|--------|
| **Codebase** | Existing project structure, coding standards, conventions |
| **Conversation** | User's specific review focus areas, priorities, concerns |
| **Skill References** | Language-specific standards, security patterns, best practices |
| **User Guidelines** | Team-specific conventions, project requirements |

Ensure all required context is gathered before implementing.

## Analysis Workflow

```
Input Source Code
       ↓
Validate File Type
       ↓
   [Supported?] ───No──→ Return "This Source Code/File is not Valid."
       │
      Yes
       ↓
Parse & Analyze Code
       ↓
Generate Review Sections
       ↓
Create Output Directory Structure
       ↓
Write Markdown Review Document
       ↓
Return Review File Path
```

## Step 1: Validate Input File

Check file extension against supported languages:

| Extension | Language |
|-----------|----------|
| `.c` | C |
| `.py`, `.ipynb` | Python |
| `.js` | JavaScript |
| `.dart` | Dart |
| `.cpp` | C++ |
| `.cs` | C# |

**If file type not supported:** Return exact message: "This Source Code/File is not Valid."

## Step 2: Perform Comprehensive Code Analysis

Analyze code across these categories:

### 2.1 Security Vulnerabilities

Check for common security issues:
- **Injection attacks**: SQL injection, command injection, LDAP injection
- **Cross-site scripting (XSS)**: Unsanitized user input/output
- **Authentication/Authorization**: Weak auth mechanisms, missing authorization checks
- **Cryptographic issues**: Hardcoded keys, weak algorithms, no encryption
- **Insecure data handling**: Sensitive data in logs, cleartext storage
- **Buffer overflows** (C/C++): Unsafe string operations, array bounds
- **Dependency vulnerabilities**: Outdated or vulnerable libraries

**Reference:** `references/security-checklist.md` for comprehensive security patterns.

### 2.2 Code Quality & Structure

Evaluate code organization and maintainability:
- **Function/method complexity**: Cyclomatic complexity, length, nesting depth
- **Code duplication**: Repeated logic patterns
- **Modularity**: Separation of concerns, single responsibility
- **Naming conventions**: Consistent, descriptive names per language standards
- **Code organization**: Logical file structure, proper imports/includes
- **Design patterns**: Appropriate use of patterns, anti-patterns

### 2.3 Potential Bugs & Logic Issues

Identify actual or potential bugs:
- **Null/undefined references**: Missing null checks, uninitialized variables
- **Resource leaks**: Unclosed files, connections, memory leaks
- **Race conditions**: Unshared mutable state, missing synchronization
- **Off-by-one errors**: Loop bounds, array indexing
- **Type mismatches**: Implicit conversions, type confusion
- **Exception handling**: Missing try-catch, overly broad catches, silent failures
- **Edge cases**: Unhandled boundary conditions, empty inputs

### 2.4 Performance Concerns

Analyze performance issues:
- **Algorithmic complexity**: Inefficient algorithms (O(n²) where O(n) possible)
- **Database queries**: N+1 queries, missing indexes, inefficient joins
- **Caching issues**: Missing caching where beneficial, incorrect cache invalidation
- **Memory usage**: Unnecessary copies, large object allocations
- **I/O operations**: Excessive file/network operations
- **Loop optimizations**: Repeated calculations in loops, unnecessary iterations

### 2.5 Best Practices Violations

Check adherence to language-specific best practices:
- **Language idioms**: Non-idiomatic code patterns
- **Standard library usage**: Reinventing the wheel, ignoring built-in functions
- **Error handling**: Language-specific error handling patterns
- **Code style**: Inconsistent formatting, violation of style guides

**Reference:** `references/language-standards.md` for language-specific best practices.

### 2.6 Documentation Completeness

Assess documentation quality:
- **Function/method documentation**: Missing docstrings, unclear parameters
- **Inline comments**: Complex logic without explanations, misleading comments
- **README/API docs**: Missing usage examples, unclear purpose
- **Type annotations**: Missing type hints (Python), unclear interfaces

### 2.7 Error Handling

Evaluate error management:
- **Exception handling**: Missing, too broad, or incorrect exception handling
- **Error messages**: Unhelpful error messages, no error context
- **Graceful degradation**: Fallback mechanisms, recovery strategies
- **Logging**: Insufficient logging, excessive logging, wrong log levels

### 2.8 Maintainability Assessment

Assess long-term maintainability:
- **Code readability**: Clear variable names, logical flow, appropriate abstraction
- **Test coverage**: Missing tests, untestable code design
- **Configuration management**: Hardcoded values, missing config files
- **Technical debt**: Accumulated shortcuts, TODO comments, temporary code
- **Extensibility**: Ability to add features without major refactoring

## Step 3: Generate Review Document

Create Markdown document with following structure:

### 3.1 Document Header

```markdown
# Code Review Report: [Source File Name]

**Generated:** [Date/Time]
**File Analyzed:** [File Path]
**Language:** [Language Name]
**Lines of Code:** [Count]
**Analysis Type:** Comprehensive Deep Analysis
```

### 3.2 Executive Summary

Brief overview (2-3 paragraphs):
- Overall code quality assessment
- Critical findings count
- Top priority issues to address

### 3.3 Detailed Findings

Organize findings by category. Each issue includes:

```markdown
## [Category Name]

### Issue: [Descriptive Title]

**Severity:** [Critical/High/Medium/Low]
**Location:** Line [X]
**Impact:** [What happens if not fixed]

**Description:**
[Clear explanation of the issue]

**Code Example:**
```[language]
[Original problematic code]
```

**Remediation:**
```[language]
[Fixed code with improvements]
```

**Explanation:**
[Why the fix is better, what it addresses]

**References:**
- [Link to relevant documentation or best practice]
```

### 3.4 Category Sections

Create sections for each analysis category:
1. **Security Vulnerabilities**
2. **Code Quality & Structure**
3. **Potential Bugs & Issues**
4. **Performance Concerns**
5. **Best Practices Violations**
6. **Documentation Completeness**
7. **Error Handling**
8. **Maintainability Assessment**

### 3.5 Recommendations

Prioritized action items:
1. **Immediate Action** (Critical security issues, bugs)
2. **Short-term** (High-priority quality issues)
3. **Medium-term** (Performance optimizations, documentation)
4. **Long-term** (Refactoring, architectural improvements)

### 3.6 Positive Findings

Acknowledge good practices observed:
- Well-implemented features
- Good design patterns
- Clear documentation
- Proper error handling

## Step 4: Create Output Directory Structure

Create directory: `/code-review/Review_Codes/Review_[SourceFileTitle]/`

**Naming Rules:**
- Remove file extension from source file to get `[SourceFileTitle]`
- Sanitize filename: Remove special characters, replace spaces with underscores
- Example: `user-auth.py` → `Review_user-auth/`
- Example: `My API Handler.js` → `Review_My_API_Handler/`

## Step 5: Write Review Document

Save review as: `[Original Source Filename].md`

**Example:**
- Input: `D:\project\src\auth.py`
- Output: `D:\vscode-python\ai400-project01-master\.claude\skills\code-review-skill\code-review\Review_Codes\Review_auth\auth.py.md`

## Step 6: Return Results

Provide user with:
- Full path to generated review document
- Summary of findings (counts by severity)
- Top 3 critical issues

## Output Format Specification

### Markdown Document Standards

- Use GitHub Flavored Markdown (GFM)
- Code fences with language identifiers
- Proper heading hierarchy (H1 for title, H2 for categories, H3 for issues)
- Bullet points for lists
- Tables for summaries when appropriate
- Bold for severity levels and emphasis

### Severity Definitions

| Severity | Description | Response Time |
|----------|-------------|---------------|
| **Critical** | Security vulnerabilities, crashes, data loss | Immediate |
| **High** | Major bugs, significant performance issues | 1-2 days |
| **Medium** | Code quality, maintainability concerns | 1 week |
| **Low** | Minor style issues, nice-to-have improvements | When convenient |

## Language-Specific Analysis

For each supported language, apply language-specific checks:

### C/C++
- Buffer overflow vulnerabilities
- Memory leaks, use-after-free
- Undefined behavior
- MISRA C compliance (if applicable)

### Python
- PEP 8 compliance
- Type hints usage
- Exception handling best practices
- Packaging and import structure

### JavaScript
- ESLint rules compliance
- Async/await patterns
- Prototype pollution risks
- DOM XSS vulnerabilities

### Dart
- Effective Dart guidelines
- Null safety usage
- Async patterns
- Flutter-specific patterns (if applicable)

### C#
- .NET coding guidelines
- Async/await best practices
- LINQ usage
- Resource disposal patterns

**Reference:** `references/language-standards.md` for detailed language-specific patterns.

## Error Handling

### If File Cannot Be Read
- Return clear error message explaining why
- Suggest remedies (permissions, encoding issues, etc.)

### If Analysis Fails
- Document what analysis completed successfully
- Explain what failed and why
- Suggest manual review for failed sections

### If Output Directory Cannot Be Created
- Return clear error message
- Suggest alternative location or permissions issue

## Scope

### What This Skill Does

- Analyzes source code files for quality, security, and performance issues
- Generates comprehensive, professional code review documents in Markdown format
- Provides before/after code examples for remediation
- Supports 6 programming languages (C, C++, C#, Python, JavaScript, Dart)
- Organizes output in structured directory hierarchy
- Identifies critical issues with severity classifications

### What This Skill Does NOT Do

- Execute or run the code being analyzed
- Modify the original source code files
- Perform dynamic analysis or runtime testing
- Analyze build systems or configuration files
- Review compiled binaries or executable files
- Integrate with version control systems
- Compare code across multiple commits
- Provide automated refactoring services

## Resources

### references/

Domain expertise embedded in skill:
- `security-checklist.md` - Comprehensive security vulnerability patterns
- `language-standards.md` - Language-specific coding standards and best practices
- `code-quality-metrics.md` - Code quality assessment criteria
- `common-anti-patterns.md` - Common anti-patterns across supported languages

Load these references during analysis to ensure comprehensive, standards-compliant reviews.

## Summary

This skill provides enterprise-level code review capabilities by:
1. Validating input file type
2. Performing deep comprehensive analysis across 8 categories
3. Generating professional Markdown review documents
4. Providing actionable remediation with code examples
5. Organizing output in structured directory hierarchy
6. Following language-specific best practices and standards
