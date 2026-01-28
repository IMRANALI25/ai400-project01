---
name: notes-generator
description: |
  Generate structured educational notes following Bloom's Taxonomy framework.
  This skill should be used when users ask to create study notes, summarize a topic,
  generate educational content from a web link or document, or organize information
  by learning levels (Remember, Understand, Apply, Analyze, Evaluate, Create).
---

# Notes Generator

Generate structured educational notes following Bloom's Taxonomy cognitive framework.

## What This Skill Does

Creates comprehensive study notes organized by the six levels of Bloom's Taxonomy:
1. **Remember** - Key facts, vocabulary, definitions
2. **Understand** - Core concepts explained simply
3. **Apply** - Practical uses and real-world examples
4. **Analyze** - Comparisons, relationships, patterns
5. **Evaluate** - Critical assessment, pros/cons
6. **Create** - Innovation, synthesis, new ideas

Each section includes practice questions specific to that cognitive level.

## Input Types Supported

This skill handles three types of input:

### 1. Topic Title Only
User provides just a subject name (e.g., "Photosynthesis", "Machine Learning", "World War II").

### 2. Web Link
User provides a URL (article, blog post, documentation). Use `mcp__web_reader__webReader` to fetch content.

### 3. Document File
User provides a file (PDF, DOCX, TXT, etc.). Use the Read tool to access the content.

## Workflow

### Step 1: Process Input

**For topic title only:**
- Use existing knowledge about the topic
- Cover all major aspects comprehensively
- Structure broadly around standard elements of the topic

**For web links:**
- Use `mcp__web_reader__webReader` with `return_format: markdown`
- Extract main ideas, key facts, important examples
- Reference the source link in the notes

**For document files:**
- Use the Read tool to access content
- Follow the document's structure when helpful
- Extract key content from each section
- Reference the document name in the notes

See `references/input-handling.md` for detailed processing strategies.

### Step 2: Organize by Bloom's Taxonomy

Map the processed content to the six cognitive levels:

| Level | Focus | Content Type |
|-------|-------|--------------|
| Remember | Facts & recall | Definitions, lists, key terms |
| Understand | Meaning | Explanations, summaries, concepts |
| Apply | Using knowledge | Examples, procedures, applications |
| Analyze | Connections | Comparisons, relationships, patterns |
| Evaluate | Judgment | Pros/cons, critique, assessment |
| Create | New ideas | Projects, designs, innovations |

See `references/blooms-taxonomy.md` for complete taxonomy reference.

### Step 3: Write Notes

Follow the standard structure in `references/note-structure.md`:

**Language Guidelines:**
- Use simple, accessible language (8th-10th grade level)
- Avoid jargon or explain technical terms
- Short sentences and paragraphs
- Include examples and analogies
- Define new terms when introduced

**Content Guidelines:**
- Include 2-3 practice questions per Bloom's level
- Use appropriate question starters for each level
- Apply consistent formatting (H1, H2, H3, bold, bullets, tables)
- Keep sections clearly separated with horizontal rules

### Step 4: Save Notes to Subfolder

**ALWAYS save generated notes in a subfolder within the notes-generator skill directory:**

- **Location**: `.claude/skills/notes-generator/notes-[topic-name]/`
- **Naming convention**: Convert topic title to kebab-case (lowercase with hyphens)
- **File name**: `[Topic-Title]-Study-Notes.md`

**Examples**:
- Topic: "Software Code Review" → Folder: `notes-software-code-review/` → File: `Software-Code-Review-Study-Notes.md`
- Topic: "Machine Learning Basics" → Folder: `notes-machine-learning-basics/` → File: `Machine-Learning-Basics-Study-Notes.md`
- Topic: "World War II" → Folder: `notes-world-war-ii/` → File: `World-War-II-Study-Notes.md`

**Process**:
1. Create the subfolder if it doesn't exist
2. Save the markdown file in that subfolder
3. Confirm the save location to the user

### Step 5: Format Output

Generate a complete Markdown document with:

```markdown
# [Topic]: Study Notes

## Topic Overview
[Brief 2-3 sentence introduction]

## 1. Remember - Key Facts & Vocabulary
[Content + practice questions]

## 2. Understand - Core Concepts
[Content + practice questions]

## 3. Apply - Practical Use
[Content + practice questions]

## 4. Analyze - Deeper Understanding
[Content + practice questions]

## 5. Evaluate - Critical Thinking
[Content + practice questions]

## 6. Create - Innovation & Synthesis
[Content + practice questions]

## Practice Questions by Level
[All questions organized by level]

## Summary & Key Takeaways
[3-5 bullet points]
```

## Reference Files

| File | Purpose | When to Read |
|------|---------|--------------|
| `blooms-taxonomy.md` | Complete taxonomy reference with question patterns, verbs, examples | Always read for guidance |
| `note-structure.md` | Standard template with formatting guidelines | Always read for structure |
| `input-handling.md` | Strategies for processing different input types | Read based on input type |

## Quality Checklist

Before delivering notes, verify:

- [ ] All 6 Bloom's levels covered
- [ ] Language is simple and accessible
- [ ] Practice questions included for each level (2-3 questions)
- [ ] Source referenced (for web/document inputs)
- [ ] Follows standard structure template
- [ ] Clear formatting and hierarchy
- [ ] Accurate content organization by cognitive level
- [ ] Summary section included

## What This Skill Does NOT Do

- Does not create interactive quizzes or tests (just practice questions)
- Does not format as PowerPoint or other formats (only Markdown)
- Does not assess user learning (generates content, not evaluation tools)
- Does not create curriculum or lesson plans (creates study notes only)
