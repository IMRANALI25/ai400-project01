# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Claude Code Skills Repository** - an educational collection of modular skills that extend Claude's capabilities. Skills are self-contained packages with embedded domain expertise that Claude Code loads to handle specialized tasks.

Each skill is a zero-shot domain expert with procedural knowledge and domain patterns bundled as references.

## Common Commands

### Create a New Skill
```bash
# Initialize a new skill from template
python .claude/skills/init_skill.py <skill-name> --path <output-path>

# Example:
python .claude/skills/init_skill.py data-analyzer --path .claude/skills
```

### Validate a Skill
```bash
# Validate skill structure and frontmatter
python .claude/skills/quick_validate.py <path-to-skill-directory>

# Example:
python .claude/skills/quick_validate.py .claude/skills/my-skill
```

### Package a Skill
```bash
# Create distributable .skill file (zip format)
python .claude/skills/package_skill.py <path-to-skill-folder> [output-directory]

# Example:
python .claude/skills/package_skill.py .claude/skills/my-skill ./dist
```

**Note**: The packaging script automatically runs validation before creating the .skill file.

## Architecture

### Progressive Disclosure System

Skills use a **three-level loading system** to optimize context usage:

1. **Metadata** (~100 tokens) - YAML frontmatter always in context
   - `name`: Skill identifier (hyphen-case, ≤64 chars)
   - `description`: What + When to trigger (≤1024 chars)
   - `allowed-tools`: Optional tool restrictions
   - `model`: Optional model override

2. **SKILL.md body** (<500 lines) - Loaded when skill triggers
   - Procedural knowledge: workflows, decision trees, steps
   - Imperative instructions ("Do X" not "You should X")
   - No verbose explanations - concise is key

3. **Bundled Resources** - Loaded as needed by Claude
   - `references/` - Domain expertise loaded into context
   - `scripts/` - Executable code (Python/Bash/etc.)
   - `assets/` - Templates/files for output (not loaded into context)

### Skill Types

Five skill archetypes with distinct patterns:

| Type | Purpose | Key Sections |
|------|---------|--------------|
| **Builder** | Create artifacts | Clarifications → Output Spec → Standards → Checklist |
| **Guide** | Provide instructions | Workflow → Examples → Official Docs |
| **Automation** | Execute workflows | Scripts → Dependencies → Error Handling |
| **Analyzer** | Extract insights | Scope → Criteria → Output Format |
| **Validator** | Enforce quality | Criteria → Scoring → Thresholds → Remediation |

See `.claude/skills/skill-creator-pro/references/skill-patterns.md` for type-specific patterns.

### Skill Creation Workflow

When creating a new skill, follow this process:

```
Metadata → Discovery → Requirements → Analyze → Embed → Structure → Implement → Validate
```

1. **Metadata**: Determine skill type and domain
2. **Discovery**: Research domain automatically (docs, best practices, anti-patterns)
3. **Requirements**: Ask user for their specific context (not domain knowledge)
4. **Analyze**: Identify procedural (HOW) vs domain (WHAT) knowledge
5. **Embed**: Put domain expertise into `references/`
6. **Structure**: Create skill directory with SKILL.md
7. **Implement**: Write skill following type patterns
8. **Validate**: Run `quick_validate.py` and test

### Key Design Principles

**Concise is Key**: Context window is a shared resource (~1,500+ tokens per activation). Challenge each sentence - does Claude really need this explanation?

**Reusable Intelligence**: Skills handle variations, not single requirements. Encode constants (best practices) and clarify variables (user context).

```
❌ Bad: "Create bar chart with sales data using Recharts"
✅ Good: "Create visualizations - adaptable to data shape, chart type, library"
```

**Appropriate Freedom**: Match specificity to task fragility:
- **High freedom**: Multiple valid approaches ("Choose your preferred style")
- **Medium freedom**: Preferred pattern exists (pseudocode with parameters)
- **Low freedom**: Fragile operations (exact scripts, few parameters)

**Zero-Shot Implementation**: Generated skills include "Before Implementation" section that gathers:
- Codebase context (existing patterns, conventions)
- Conversation context (user requirements, preferences)
- Skill references (embedded domain expertise)
- User guidelines (project-specific standards)

## Directory Structure

```
.claude/skills/
├── skill-creator/              # Basic skill creation framework
│   ├── SKILL.md
│   ├── scripts/                # Skill management tools
│   │   ├── init_skill.py       # Initialize new skill
│   │   ├── package_skill.py    # Package to .skill file
│   │   └── quick_validate.py   # Validate structure
│   └── references/             # Skill creation guides
├── skill-creator-pro/          # Advanced skill creation with domain expertise
│   ├── SKILL.md
│   ├── scripts/                # Same tools as skill-creator
│   └── references/             # Comprehensive patterns and workflows
│       ├── skill-patterns.md       # Frontmatter spec, type patterns
│       ├── workflows.md            # Sequential/conditional workflows
│       ├── output-patterns.md      # Template patterns
│       ├── reusability-patterns.md # Varies vs constant analysis
│       ├── quality-patterns.md     # Clarifications, checklists
│       ├── technical-patterns.md   # Error handling, security
│       └── creation-workflow.md    # Detailed creation process
├── pdf/                        # PDF manipulation
├── docx/                       # Word documents
├── pptx/                       # PowerPoint presentations
├── xlsx/                       # Excel spreadsheets
├── interview/                  # Discovery conversations
└── [other skills]/
```

## Important Files

### Core Scripts (in root `.claude/skills/`)
- `init_skill.py` - Creates new skill directory from template
- `package_skill.py` - Packages skill into distributable .skill zip file
- `quick_validate.py` - Validates SKILL.md frontmatter and structure

### Meta-Skills
- `skill-creator/SKILL.md` - Basic skill creation guidance
- `skill-creator-pro/SKILL.md` - Production-grade skill creation with domain discovery framework
- `skill-validator/SKILL.md` - Quality validation with scoring (7 weighted criteria, 0-100 scale)

## When Creating or Modifying Skills

### Frontmatter Requirements
- `name` must be hyphen-case, ≤64 chars, match directory name
- `description` must include **What** (capability) + **When** (triggers), ≤1024 chars
- Use third-person style: "This skill should be used when..." not "Use when..."

### SKILL.md Requirements
- Maximum 500 lines (extract details to `references/`)
- Imperative mood throughout
- Define scope: what it does AND does not do
- For generated skills: include "Before Implementation" section for context gathering

### Resource Organization
- **`references/`**: Domain expertise (API docs, best practices, patterns) - loaded into context
- **`scripts/`**: Executable code for automation/validation - can be run directly
- **`assets/`**: Templates, boilerplate, fonts - used in output, not loaded into context

### Naming Conventions
- Skill directories: hyphen-case (e.g., `data-visualizer`, `api-helper`)
- SKILL.md: Capitalized title case headers
- references/: lowercase-with-hyphens.md (e.g., `api-reference.md`, `best-practices.md`)

## Validation

Always validate skills before packaging:
```bash
python .claude/skills/quick_validate.py <skill-path>
```

Validation checks:
- SKILL.md exists with valid YAML frontmatter
- `name` follows hyphen-case convention (≤64 chars)
- `description` is present (≤1024 chars, no angle brackets)
- Only allowed frontmatter keys: `name`, `description`, `license`, `allowed-tools`, `metadata`

## Testing

Skills are zero-shot - they should work without prior examples. Test by:
1. Invoking the skill on realistic user requests
2. Verifying it handles edge cases and variations
3. Checking that embedded domain expertise is sufficient
4. Ensuring it only asks user for their context (not domain knowledge)
