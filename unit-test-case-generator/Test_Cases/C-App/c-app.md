# Test Cases for C-App File Management System

**Source File**: c-app.c
**Language**: C
**Date Generated**: 2026-01-28

## Overview

This test document covers unit test cases for a file management system in C that provides functionality to create files, insert data interactively, and display file contents.

## Test Case Summary

| Category | Count |
|----------|-------|
| Happy Path | 4 |
| Invalid Inputs | 12 |
| Boundary Values | 4 |
| Edge Cases | 6 |
| Error Handling | 8 |
| **Total** | **34** |

## Test Cases

| Test Case ID | Test Scenario | Test Description | Preconditions | Test Steps | Test Data | Expected Result | Priority |
|--------------|---------------|------------------|---------------|------------|-----------|-----------------|----------|
| TC-CREATE-001 | Valid file creation | Verify system creates new file with valid filename to ensure file initialization | No file exists with given name | 1. Call create_file() with valid filename<br>2. Check if file pointer is not NULL<br>3. Verify file is created on disk | "test.txt" | File created successfully, function returns without error | Critical |
| TC-CREATE-002 | NULL filename pointer | Confirm function handles NULL filename gracefully to prevent crash | None | 1. Call create_file() with NULL pointer<br>2. Verify no segmentation fault occurs | NULL | Program exits with error or handles NULL safely | Critical |
| TC-CREATE-003 | Empty filename | Validate function behavior with empty string filename to ensure proper error handling | None | 1. Call create_file() with empty string ""<br>2. Check fopen() return value | "" | fopen() returns NULL, error message printed | High |
| TC-CREATE-004 | Invalid filename characters | Test function with special characters that may be invalid in filenames | None | 1. Call create_file() with invalid chars "test/?.txt"<br>2. Verify error handling | "test/?.txt" | fopen() fails, appropriate error message displayed | High |
| TC-CREATE-005 | Existing file overwrite | Verify behavior when file already exists to prevent data loss | File "existing.txt" already exists | 1. Call create_file() on existing file<br>2. Check if file is overwritten | "existing.txt" | File is truncated/overwritten in "w" mode | Medium |
| TC-CREATE-006 | Long filename | Test function with filename at buffer boundary to ensure no overflow | None | 1. Call create_file() with 255-char filename<br>2. Verify no buffer overflow | 255 characters | Function handles long filename correctly | High |
| TC-CREATE-007 | Filename with path separators | Validate function handles directory paths correctly | Target directory exists | 1. Call create_file() with path "data/test.txt"<br>2. Verify file created in correct location | "data/test.txt" | File created in specified directory | Medium |
| TC-CREATE-008 | Read-only filesystem | Confirm function handles read-only filesystem gracefully | Filesystem is read-only | 1. Call create_file() on read-only FS<br>2. Verify error handling | Any filename | fopen() returns NULL, error message shown | Medium |
| TC-CREATE-009 | Permission denied | Test function behavior when lacking write permissions | Directory exists but no write permission | 1. Call create_file() in restricted directory<br>2. Verify error handling | "/root/test.txt" | fopen() fails with error message | High |
| TC-CREATE-010 | Disk full | Validate function handles insufficient disk space to prevent system crash | Disk is full | 1. Call create_file() when disk full<br>2. Verify graceful failure | Any filename | fopen() fails, appropriate error displayed | Critical |
| TC-CREATE-011 | Filename with spaces | Test function handles filenames with spaces correctly | None | 1. Call create_file() with "my file.txt"<br>2. Verify file created | "my file.txt" | File created successfully with spaces in name | Low |
| TC-CREATE-012 | Relative path filename | Validate function handles relative paths correctly | Current directory is writable | 1. Call create_file() with "./test.txt"<br>2. Verify file location | "./test.txt" | File created in current directory | Medium |
| TC-INSERT-001 | Valid data insertion | Verify function appends data to existing file to ensure data persistence | File exists and is writable | 1. Call insert_data() on existing file<br>2. Enter valid text data<br>3. Type "END" to finish<br>4. Verify file contains data | "Hello World" | Data appended to file successfully | Critical |
| TC-INSERT-002 | Empty input | Validate function handles immediate "END" command to ensure no empty writes | File exists | 1. Call insert_data()<br>2. Immediately type "END"<br>3. Verify file unchanged | "END" | No data written to file, function exits | Medium |
| TC-INSERT-003 | NULL filename | Confirm function handles NULL filename gracefully to prevent crash | None | 1. Call insert_data() with NULL<br>2. Verify no segfault occurs | NULL | Function handles NULL or exits with error | Critical |
| TC-INSERT-004 | Non-existent file | Test function behavior when file doesn't exist to ensure proper error handling | File does not exist | 1. Call insert_data() on missing file<br>2. Check fopen() return value | "missing.txt" | fopen() returns NULL, error message displayed | High |
| TC-INSERT-005 | Single line input | Verify function correctly saves single line of data to ensure basic functionality | File exists | 1. Call insert_data()<br>2. Enter one line<br>3. Type "END"<br>4. Verify content | "Single line" | Single line saved correctly to file | High |
| TC-INSERT-006 | Multiple lines input | Validate function handles multiple lines correctly to ensure bulk data entry | File exists | 1. Call insert_data()<br>2. Enter multiple lines<br>3. Type "END"<br>4. Verify all lines saved | 5 lines of text | All lines appended to file correctly | High |
| TC-INSERT-007 | Maximum buffer length | Test function with input exactly at buffer size boundary to prevent overflow | File exists | 1. Call insert_data()<br>2. Enter 1023 character line<br>3. Type "END" | 1023 chars | Line processed without buffer overflow | Critical |
| TC-INSERT-008 | Buffer overflow attempt | Confirm function handles input exceeding buffer size to prevent memory corruption | File exists | 1. Call insert_data()<br>2. Enter >1024 character line | 1025+ chars | fgets() truncates to buffer size safely | Critical |
| TC-INSERT-009 | Special characters in input | Test function handles special characters and escape sequences correctly | File exists | 1. Call insert_data()<br>2. Enter text with special chars<br>3. Type "END" | "Hello\n\tWorld" | Special characters written correctly to file | Medium |
| TC-INSERT-010 | NULL bytes in input | Validate function handles binary data or null bytes in input stream | File exists | 1. Call insert_data()<br>2. Simulate input with NULL bytes | Binary data | Function handles or rejects NULL bytes | Medium |
| TC-INSERT-011 | Immediate EOF on stdin | Confirm function handles EOF signal on stdin gracefully to prevent hang | File exists | 1. Call insert_data()<br>2. Send EOF signal immediately | Ctrl+D / EOF | fgets() returns NULL, loop exits cleanly | High |
| TC-INSERT-012 | Very long input sequence | Test function with many lines to ensure no memory leaks or issues | File exists | 1. Call insert_data()<br>2. Enter 1000 lines<br>3. Type "END" | 1000 lines | All lines processed, file grows correctly | Medium |
| TC-DISP-001 | Valid file display | Verify function displays existing file contents correctly to ensure data retrieval | File with content exists | 1. Call display_file() on file<br>2. Verify all content printed on stdout | File with text | All file content displayed correctly | Critical |
| TC-DISP-002 | NULL filename | Confirm function handles NULL filename to prevent crash | None | 1. Call display_file() with NULL<br>2. Verify no segfault | NULL | Function handles NULL or exits with error | Critical |
| TC-DISP-003 | Non-existent file | Test function behavior when file doesn't exist to ensure proper error handling | File doesn't exist | 1. Call display_file() on missing file<br>2. Check error message | "missing.txt" | fopen() returns NULL, error printed | High |
| TC-DISP-004 | Empty file | Validate function handles empty file gracefully to ensure no errors | Empty file exists | 1. Call display_file() on empty file<br>2. Verify no crash or error | Empty file | Function exits immediately, no content displayed | Medium |
| TC-DISP-005 | Large file display | Test function displays large file correctly to ensure performance | Large file exists | 1. Call display_file() on large file<br>2. Verify complete display | 1MB file | Entire file displayed character by character | Medium |
| TC-DISP-006 | Binary file content | Confirm function can handle binary files without corruption | Binary file exists | 1. Call display_file() on binary file<br>2. Verify no crash | Binary data | File content displayed (may be non-printable) | Low |
| TC-DISP-007 | File with newlines | Test function correctly preserves and displays line endings to ensure formatting | File with multiple lines exists | 1. Call display_file() on text file<br>2. Verify line breaks shown | Multi-line file | All newlines preserved and displayed | High |
| TC-DISP-008 | File with special characters | Validate function displays special characters correctly | File with special chars exists | 1. Call display_file()<br>2. Check special char display | "Hello\tWorld\n" | Special characters displayed correctly | Medium |
| TC-MAIN-001 | Valid workflow execution | Verify complete main workflow executes correctly to ensure full functionality | None | 1. Run program<br>2. Enter valid filename<br>3. Enter data<br>4. Type "END" | "test.txt", "data" | File created, data saved, content displayed | Critical |
| TC-MAIN-002 | NULL filename input | Confirm main handles NULL filename gracefully to prevent crash | None | 1. Run program<br>2. Send NULL on stdin | NULL | fgets() returns NULL, main returns 1 | Critical |
| TC-MAIN-003 | Filename with newline | Verify main correctly strips newline from filename to ensure file operations work | None | 1. Run program<br>2. Enter "test.txt" with newline | "test.txt\n" | Newline stripped, filename valid | High |
| TC-MAIN-004 | Empty filename input | Test main behavior with empty filename input to ensure proper handling | None | 1. Run program<br>2. Press Enter without typing | "" (empty) | create_file() called with empty string | Medium |
| TC-MAIN-005 | Maximum filename length | Validate main handles maximum filename length correctly to prevent buffer overflow | None | 1. Run program<br>2. Enter 255 character filename | 255 chars | Filename truncated to 255 chars safely | Critical |
| TC-MAIN-006 | Filename overflow attempt | Test main rejects or handles overly long filenames to prevent buffer overflow | None | 1. Run program<br>2. Enter >256 character filename | 257+ chars | fgets() limits to 256 chars including null | Critical |

## Language-Specific Test Considerations

### C Language Specific Tests

#### Memory Management
- Verify all FILE pointers are properly closed (fclose called)
- Check for memory leaks (no malloc/free in this code, but good practice)
- Validate buffer boundaries (filename[256], buffer[1024])

#### Pointer Safety
- NULL pointer checks before fopen operations
- FILE pointer validation before file operations
- String pointer validation before strcmp operations

#### String Handling
- strcspn for newline removal safety
- strcmp return value handling
- Null terminator placement after newline removal

#### Buffer Overflow Prevention
- fgets() with sizeof() ensures buffer limits
- Fixed-size arrays prevent stack overflow
- Input validation on filename length

#### File Operation Safety
- fopen mode validation ("w", "r", "a")
- Error checking after each fopen
- FILE* NULL checks before operations

#### Integer/Character Operations
- fgetc() EOF check (returns int, not char)
- Character-by-character reading safety
- EOF constant proper usage

## Test Execution Priority Order

1. **Critical Priority** (Execute First)
   - NULL pointer handling tests
   - Buffer overflow prevention tests
   - File operation error handling

2. **High Priority** (Execute Second)
   - Boundary value tests
   - Invalid input tests
   - Error condition tests

3. **Medium Priority** (Execute Third)
   - Edge case tests
   - Special character tests
   - Multi-line input tests

4. **Low Priority** (Execute Last)
   - UI polish tests
   - Nice-to-have features
   - Rare edge cases

## Test Environment Setup

### Prerequisites
- C compiler (gcc, clang, etc.)
- Text editor or IDE for code modifications
- File system with write permissions
- Sufficient disk space for test files

### Test Data Files
- Create test files with various sizes
- Prepare files with special characters
- Set up directories with different permissions

### Test Scenarios
- Normal filesystem operations
- Read-only filesystem simulation
- Disk full condition simulation
- Permission-restricted directories

## Automated Testing Recommendations

### Unit Test Framework
Consider using:
- **CUnit**: Standard C testing framework
- **Check**: Lightweight testing for C
- **Unity**: Simple framework for embedded systems
- **Google Test**: C++ framework with C support

### Test Automation
```c
// Example test structure
void test_create_file_valid() {
    // Arrange
    const char* filename = "test_valid.txt";

    // Act
    create_file(filename);

    // Assert
    FILE* check = fopen(filename, "r");
    CU_ASSERT(check != NULL);
    if (check) fclose(check);
    remove(filename);
}
```

## Defect Reporting Template

When defects are found, report:
1. Test Case ID that failed
2. Expected vs Actual behavior
3. Steps to reproduce
4. Environment details
5. Severity assessment

---

**Document Version**: 1.0
**Last Updated**: 2026-01-28
**Test Coverage Target**: 100% function coverage, 80% branch coverage
