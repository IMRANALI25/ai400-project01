# Security Vulnerability Patterns

This reference provides comprehensive security vulnerability patterns for code review across all supported languages (C, C++, C#, Python, JavaScript, Dart).

## Injection Vulnerabilities

### SQL Injection

**Pattern**: User input directly concatenated into SQL queries

**Detection**:
- String concatenation with user input in SQL queries
- String formatting (`.format()`, `%`, `+`) in SQL statements
- `exec()`, `eval()` with SQL strings

**Examples of Vulnerable Code**:

```python
# VULNERABLE: Direct string concatenation
query = "SELECT * FROM users WHERE id = " + user_id
cursor.execute(query)

# VULNERABLE: String formatting
query = f"SELECT * FROM users WHERE name = '{username}'"
cursor.execute(query)
```

```javascript
// VULNERABLE: String concatenation
const query = "SELECT * FROM users WHERE id = " + userId;
db.query(query);
```

```csharp
// VULNERABLE: String concatenation
string query = "SELECT * FROM users WHERE id = " + userId;
cmd.CommandText = query;
```

**Remediation**:

```python
# SECURE: Parameterized queries
query = "SELECT * FROM users WHERE id = %s"
cursor.execute(query, (user_id,))

# SECURE: ORM with built-in protection
user = User.objects.get(id=user_id)
```

```javascript
// SECURE: Parameterized queries
const query = "SELECT * FROM users WHERE id = ?";
db.query(query, [userId]);
```

```csharp
// SECURE: Parameterized queries
string query = "SELECT * FROM users WHERE id = @UserId";
cmd.Parameters.AddWithValue("@UserId", userId);
cmd.CommandText = query;
```

### Command Injection

**Pattern**: User input passed to system commands without validation

**Detection**:
- `os.system()`, `subprocess.call()` with shell=True in Python
- `exec()`, `spawn()` in JavaScript/Node.js
- `Process.Start()`, `ShellExecute()` in C#
- `system()`, `popen()` in C/C++

**Examples of Vulnerable Code**:

```python
# VULNERABLE: Direct user input in system command
filename = user_input
os.system("cat " + filename)
```

```javascript
// VULNERABLE: Direct user input in exec
const filename = req.body.filename;
exec(`cat ${filename}`, (err, stdout) => { ... });
```

```c
// VULNERABLE: Direct user input in system()
char filename[256];
scanf("%s", filename);
system(filename);
```

**Remediation**:

```python
# SECURE: Use subprocess without shell
subprocess.run(["cat", filename], check=True)

# SECURE: Validate and sanitize input
if not re.match(r'^[a-zA-Z0-9_.-]+$', filename):
    raise ValueError("Invalid filename")
```

```javascript
// SECURE: Use spawn with separate arguments
const child = spawn('cat', [filename]);

// SECURE: Validate input
if (!/^[a-zA-Z0-9_.-]+$/.test(filename)) {
    throw new Error('Invalid filename');
}
```

### LDAP Injection

**Pattern**: User input in LDAP queries without sanitization

**Detection**:
- String concatenation in LDAP queries
- Special LDAP characters not escaped: `*`, `(`, `)`, `\`, `NULL`

**Remediation**:
- Use LDAP escaping functions
- Validate input against whitelist patterns

## Cross-Site Scripting (XSS)

### Reflected XSS

**Pattern**: User input reflected in response without encoding

**Detection**:
- `innerHTML`, `document.write()` with user input
- Template rendering without auto-escaping
- Setting `document.title`, `location` with user input

**Examples of Vulnerable Code**:

```javascript
// VULNERABLE: Direct innerHTML
document.getElementById("output").innerHTML = userInput;

// VULNERABLE: document.write
document.write("<div>" + userInput + "</div>");
```

```python
# VULNERABLE: Django without autoescape
from django.template import Template
t = Template("{{ content }}")
html = t.render(content=user_input)  # If autoescape is off
```

```csharp
// VULNERABLE: Literal output in ASP.NET
@Html.Raw(userInput)
```

**Remediation**:

```javascript
// SECURE: Use textContent
document.getElementById("output").textContent = userInput;

// SECURE: Encode HTML
function encodeHTML(str) {
    return str.replace(/[&<>'"]/g, tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
    }[tag]));
}
```

```python
# SECURE: Use auto-escaping templates
from django.utils.safestring import mark_safe
from django.utils.html import escape
html = escape(user_input)
```

```csharp
// SECURE: Use Razor auto-encoding
@userInput  // Razor automatically encodes
```

### Stored XSS

**Pattern**: User input stored and displayed later without encoding

**Detection**: Same patterns as reflected XSS but in stored data contexts

**Remediation**: Encode on output, not just on input

### DOM-based XSS

**Pattern**: Sources (URL, location.hash) flow to sinks (eval, innerHTML) without sanitization

**Detection**:
- `eval(location.hash)`
- `innerHTML = URL.param`
- `setTimeout(userString)`

## Authentication & Authorization

### Weak Authentication

**Patterns**:
- Hardcoded credentials
- Passwords in plaintext
- Weak password policies
- Missing rate limiting
- No account lockout

**Detection**:
```python
# VULNERABLE: Hardcoded password
DB_PASSWORD = "admin123"

# VULNERABLE: Plaintext password storage
password_hash = md5(password)  # MD5 is broken
```

```javascript
// VULNERABLE: Hardcoded credentials
const API_KEY = "sk-1234567890abcdef";

// VULNERABLE: Weak password check
if (password === user.password) { ... }
```

**Remediation**:
```python
# SECURE: Use bcrypt or Argon2
import bcrypt
hashed = bcrypt.hashpw(password.encode(), bcrypt.gensalt())

# SECURE: Environment variables
DB_PASSWORD = os.environ.get('DB_PASSWORD')
```

```javascript
// SECURE: Use bcrypt
const bcrypt = require('bcrypt');
const hash = await bcrypt.hash(password, 10);

// SECURE: Environment variables
const API_KEY = process.env.API_KEY;
```

### Missing Authorization

**Patterns**:
- No permission checks before resource access
- IDOR (Insecure Direct Object Reference)
- Missing role-based access control

**Detection**:
```python
# VULNERABLE: No authorization check
def get_user(request, user_id):
    user = User.objects.get(id=user_id)  # Anyone can access any user
    return render(request, 'user.html', {'user': user})
```

```javascript
// VULNERABLE: No ownership check
app.get('/documents/:id', async (req, res) => {
    const doc = await Document.findById(req.params.id);
    res.json(doc);  // No check if user owns this document
});
```

**Remediation**:
```python
# SECURE: Check ownership
def get_user(request, user_id):
    user = get_object_or_404(User, id=user_id)
    if user.owner != request.user:
        raise PermissionDenied
    return render(request, 'user.html', {'user': user})
```

```javascript
// SECURE: Verify ownership
app.get('/documents/:id', async (req, res) => {
    const doc = await Document.findById(req.params.id);
    if (doc.ownerId !== req.user.id) {
        return res.status(403).json({error: 'Forbidden'});
    }
    res.json(doc);
});
```

## Cryptographic Issues

### Weak Algorithms

**Patterns**:
- MD5, SHA1 for security purposes
- DES, RC4 ciphers
- ECB mode
- Hardcoded IV/nonce

**Detection**:
```python
# VULNERABLE: MD5
hash = hashlib.md5(data).hexdigest()

# VULNERABLE: SHA1
hash = hashlib.sha1(data).hexdigest()
```

```csharp
// VULNERABLE: MD5
using (MD5 md5 = MD5.Create()) {
    byte[] hash = md5.ComputeHash(data);
}

// VULNERABLE: DES
DES des = DES.Create();
```

**Remediation**:
```python
# SECURE: SHA-256 or better
hash = hashlib.sha256(data).hexdigest()

# SECURE: Use bcrypt for passwords
hashed = bcrypt.hashpw(password, bcrypt.gensalt())
```

```csharp
// SECURE: SHA-256
using (SHA256 sha256 = SHA256.Create()) {
    byte[] hash = sha256.ComputeHash(data);
}

// SECURE: AES-256-GCM
using (AesGcm aes = new AesGcm(key)) { ... }
```

### Hardcoded Secrets

**Patterns**:
- API keys in source code
- Encryption keys hardcoded
- Certificates in code

**Remediation**: Use environment variables, secure vaults, or configuration services

## Insecure Data Handling

### Sensitive Data in Logs

**Detection**:
```python
# VULNERABLE: Logging sensitive data
logger.info(f"User logged in: {username}, password: {password}")
logger.debug(f"Credit card: {credit_card}")
```

```javascript
// VULNERABLE: Logging sensitive data
console.log('User:', user);
console.log('Token:', authToken);
```

**Remediation**: Never log passwords, tokens, credit cards, SSNs, or other sensitive data

### Cleartext Storage

**Detection**:
- Passwords in plaintext
- Sensitive data unencrypted at rest
- No encryption in transit (no HTTPS)

**Remediation**: Encrypt sensitive data at rest, always use HTTPS

## Buffer Overflows (C/C++)

### Unsafe String Functions

**Detection**:
```c
// VULNERABLE: No bounds checking
char buffer[64];
strcpy(buffer, user_input);  // Buffer overflow if input > 63 chars

// VULNERABLE: No bounds checking
gets(buffer);  // Always dangerous

// VULNERABLE: Possible overflow
sprintf(buffer, "Input: %s", user_input);
```

**Remediation**:
```c
// SECURE: Bounded string operations
strncpy(buffer, user_input, sizeof(buffer) - 1);
buffer[sizeof(buffer) - 1] = '\0';

// SECURE: Use snprintf
snprintf(buffer, sizeof(buffer), "Input: %s", user_input);

// SECURE: Use fgets
fgets(buffer, sizeof(buffer), stdin);
```

### Array Bounds Violations

**Detection**:
```c
// VULNERABLE: No bounds checking
int arr[10];
int index = get_user_index();
arr[index] = value;  // Out of bounds write
```

**Remediation**: Always validate array indices before access

## Insecure Dependencies

**Detection**:
- Outdated packages with known vulnerabilities
- Dependencies from untrusted sources
- Unpinned versions (loose version requirements)

**Remediation**:
- Use dependency scanning tools (npm audit, pip-audit, Snyk)
- Pin exact versions in requirements
- Regularly update dependencies
- Review security advisories

## Configuration Security

### Default Credentials

**Detection**:
```python
# VULNERABLE: Default credentials
DEFAULT_USER = "admin"
DEFAULT_PASSWORD = "password123"
```

**Remediation**: Force password change on first login, prevent default credentials

### Debug Mode in Production

**Detection**:
```python
# VULNERABLE: Debug enabled
DEBUG = True
```

```javascript
// VULNERABLE: Detailed error messages
app.use(errorHandler({ dumpExceptions: true, showStack: true }));
```

**Remediation**: Disable debug mode in production

## Session Management

### Session Fixation

**Detection**: Not regenerating session ID after login

**Remediation**:
```python
# SECURE: Regenerate session after login
request.session.cycle_key()
```

```javascript
// SECURE: Regenerate session
req.session.regenerate(function(err) {
    // New session ID
});
```

### Missing Session Expiration

**Detection**: Sessions that never expire

**Remediation**: Implement appropriate timeout periods

## Insecure File Operations

### Path Traversal

**Detection**:
```python
# VULNERABLE: Path traversal
filename = user_input
with open(f'/var/app/{filename}', 'r') as f:
    data = f.read()  # Attacker can use ../../etc/passwd
```

```javascript
// VULNERABLE: Path traversal
const filename = req.body.filename;
const data = fs.readFileSync(`/var/app/${filename}`);
```

**Remediation**:
```python
# SECURE: Validate and sanitize path
import os
filename = os.path.basename(user_input)  # Remove path components
full_path = os.path.join('/var/app', filename)
if not full_path.startswith('/var/app/'):
    raise ValueError("Invalid path")
```

```javascript
// SECURE: Use path.basename and validate
const path = require('path');
const filename = path.basename(userInput);
const fullPath = path.join('/var/app', filename);
if (!fullPath.startsWith('/var/app/')) {
    throw new Error('Invalid path');
}
```

### Unrestricted File Upload

**Detection**:
- No file type validation
- Executable files allowed
- No size limits
- Stored in web-accessible directory with original name

**Remediation**:
- Validate file type (magic bytes, not just extension)
- Restrict to allowed types
- Implement size limits
- Rename files randomly
- Store outside web root or serve with correct Content-Type

## Race Conditions

### Time-of-Check to Time-of-Use (TOCTOU)

**Detection**:
```python
# VULNERABLE: TOCTOU
if os.path.exists(filename):
    with open(filename, 'r') as f:  # File could be changed/deleted
        data = f.read()
```

**Remediation**: Use atomic operations or file locks

## References

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [CWE Top 25](https://cwe.mitre.org/top25/)
- [SECURE CODE REVIEW CHECKLIST (GitHub)](https://github.com/mgreiler/secure-code-review-checklist)
- [Security Code Review Checklist for Developers](https://www.aptori.com/blog/security-code-review-checklist-for-developers)
- [10-Point Secure Code Review Checklist](https://www.hackthebox.com/blog/secure-code-reviews)
