# Python Installation and Setup Guide

## Table of Contents
1. Introduction
2. Python Installation Considerations
3. Installation Methods
4. Installing uv Package Manager
5. Installing Python
6. Running Python Code
7. Additional Resources

---

## 1. Introduction

To start your learning journey, install Python on macOS, Linux, or Windows. This guide provides step-by-step instructions for setting up your Python environment using recommended tools and best practices.

---

## 2. Python Installation Considerations

There are many ways to install Python, but we recommend using the **uv** package manager for the best experience. Other options like conda, pyenv, or the official installers from Python.org are reliable and effective but may become limiting as your Python expertise grows.

### Key Recommendations

**For now, don't worry about the details!** Relax and focus on learning as much as you can about Python. Remember, everything is reversible and can be changed.

If you prefer using conda or pyenv, feel free to experiment—that's perfectly fine.

### What uv Will Help You With

• Installing specific Python versions
• Creating and managing virtual environments
• Installing and managing Python packages and tools
• Replacing several tools like conda, pyenv, pip, poetry, virtualenv, and more

---

## 3. Installing uv Package Manager

The steps for installing uv and running Python code can seem intimidating if you're not familiar with using the terminal. Don't worry! To navigate this process without stress, we recommend that you always read the messages that appear after you run any commands.

### Installation Instructions

**For macOS and Linux:**

```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

**For Windows (PowerShell):**

```powershell
powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
```

**⚠ Important:** Follow the PowerShell instructions to validate the installation. You may need to restart the system.

**📝 Note:** For more details and assistance with installing uv, please refer to the documentation available at docs.astral.sh/uv.

---

## 4. Installing Python

Once we've installed uv, we're ready to install Python to begin our journey!

### Installation Command

Enter the following code in the Terminal or PowerShell:

```bash
uv python install 3.12
```

**Installation complete! The adventure begins now!**

---

## 5. Running Python Code

Python provides several tools and environments for writing and executing code, each suited to different needs.

We'll explore three methods for running Python code:

1. **The Python interpreter** – for immediate feedback
2. **IPython** – for interactive coding experience
3. **JupyterLab** – for developing comprehensive, interactive projects

Future courses will include advanced configurations using tools such as VS Code and virtual environments with uv. For more details, visit TechEngineer.org.

### 5.1 The Python Interpreter

The Python interpreter is the simplest way to execute Python code directly. It allows you to run commands line by line and is ideal for quick testing and simple scripts.

**Features:**
- Quick testing and debugging
- Line-by-line code execution
- Included with Python installations
- Started directly from command line

---

## 6. Best Practices for Terminal Usage

When working with terminal commands, keep these tips in mind:

1. **Read command output** – There's often useful information or instructions provided
2. **Follow the instructions** – Simply follow terminal prompts or do a quick online search
3. **Don't panic** – You may be surprised at how quickly you can find solutions to common problems

---

## 7. Additional Resources

- Official Python Documentation: https://docs.python.org/
- uv Documentation: https://docs.astral.sh/uv/
- TechEngineer.org: https://TechEngineer.org

---

**Document Information**

| Field | Details |
|-------|---------|
| Document Type | Technical Tutorial |
| Target Audience | Python learners, beginners |
| Last Updated | January 2026 |
| Version | 1.0 |

---

*This document was formatted using professional enterprise technical documentation standards.*
