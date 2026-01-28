---
name: document-reader-formatter-skill
description: |
  Professional Word document reader, analyzer, formatter, and delivery system.
  This skill should be used when users ask to format Word documents (.docx), apply
  professional styling, structure business/academic documents, create tables,
  manage layouts, proofread content, apply formatting standards, add graphics,
  automate document tasks, ensure accessibility, secure documents, or deliver
  high-quality formatted outputs.
---

# Document Reader & Formatter

Professional Word document processing system for reading, analyzing, structuring, formatting, reviewing, and delivering high-quality documents that meet business, academic, and enterprise standards.

## What This Skill Does

Transforms raw or poorly formatted documents into professional, publication-ready Word documents through comprehensive formatting capabilities:

1. **Document Reading & Analysis** - Parse document structure, identify formatting issues, determine document type
2. **Text Formatting & Styling** - Apply professional typography, fonts, colors, spacing
3. **Professional Document Structuring** - Implement proper hierarchy, sections, organization
4. **Table & Layout Management** - Create and format tables, manage page layouts
5. **Advanced Document Navigation** - Cross-references, bookmarks, navigation pane
6. **Proofreading & Review** - Track changes, comments, spelling/grammar check
7. **Professional Formatting Standards** - Apply business, academic, enterprise standards
8. **Graphics & Visual Formatting** - Insert and format images, shapes, SmartArt, charts
9. **Automation & Productivity Features** - Macros, fields, templates, building blocks
10. **Accessibility & Compatibility** - Alt text, WCAG compliance, version compatibility
11. **Security & Document Control** - Protection, passwords, digital signatures
12. **Professional Output & Delivery** - Save with proper organization in formatted-documents folder

## 12 Core Abilities

### 1. Document Reading & Analysis
- Read and parse .docx files using Read tool
- Analyze document structure and identify elements
- Detect formatting inconsistencies
- Determine document type (business, academic, enterprise)
- Assess current state vs. target requirements

### 2. Text Formatting & Styling
- Apply professional fonts (serif for academic, sans-serif for business)
- Set appropriate font sizes (10-12pt body, larger for headers)
- Configure font colors using professional palettes
- Apply bold, italic, underline appropriately
- Use character styles for consistent emphasis

### 3. Professional Document Structuring
- Implement proper heading hierarchy (H1, H2, H3, etc.)
- Create title pages and cover pages
- Add front matter (TOC, lists, abstracts)
- Organize content with section breaks (not page breaks)
- Configure outline numbering (1, 1.1, 1.1.1)

### 4. Table & Layout Management
- Create tables with appropriate rows/columns
- Apply professional table styles
- Configure header rows (repeat on each page)
- Set column widths and row heights
- Merge/split cells for complex layouts
- Add table captions

### 5. Advanced Document Navigation
- Create bookmarks for quick navigation
- Insert cross-references to headings, figures, tables
- Add hyperlinks to external sources
- Enable Navigation Pane for document browsing
- Create table of contents, figures, tables

### 6. Proofreading & Review
- Enable Track Changes for collaborative editing
- Add comments for suggestions and questions
- Run spelling and grammar check
- Use Thesaurus for word variety
- Review and address all markup
- Accept/reject revisions appropriately

### 7. Professional Formatting Standards
- Apply business document standards (reports, letters, memos)
- Implement academic standards (APA, MLA, Chicago)
- Follow enterprise guidelines (proposals, technical docs)
- Maintain consistency across document elements
- Use style-based formatting (not direct formatting)

### 8. Graphics & Visual Formatting
- Insert images at appropriate locations
- Resize images within page margins
- Configure text wrapping (Square, In Line, Tight)
- Add figure captions below images
- Insert and format shapes and SmartArt
- Create charts from data
- Add alt text for accessibility

### 9. Automation & Productivity Features
- Use field codes for automatic updates (dates, page numbers)
- Create and apply templates for consistency
- Use building blocks for reusable content
- Record macros for repetitive tasks
- Configure AutoCorrect for common typos
- Generate TOC and indexes automatically

### 10. Accessibility & Compatibility
- Add alt text to all images and graphics
- Ensure sufficient color contrast (4.5:1 minimum)
- Use proper heading structure for screen readers
- Check compatibility with older Word versions
- Test grayscale rendering
- Use styles instead of manual formatting

### 11. Security & Document Control
- Restrict editing (read-only, comments, forms)
- Add password protection (open/modify)
- Mark as final to prevent changes
- Add digital signatures
- Remove sensitive information (Document Inspector)
- Protect tracked changes

### 12. Professional Output & Delivery
- Save formatted documents in specified subfolder
- Use descriptive filenames with version numbers
- Include document properties (title, author, subject)
- Verify all fields are updated
- Check print layout before saving
- Deliver in appropriate format (.docx, .pdf if requested)

## Document Types Supported

### Business Documents
- **Reports**: Executive summaries, annual reports, status reports
- **Letters**: Cover letters, business letters, correspondence
- **Memorandums**: Internal communications, policy memos
- **Proposals**: Business proposals, project proposals, grant proposals
- **Presentations**: Handouts, speaker notes, slide documents

### Academic Documents
- **Research Papers**: APA, MLA, Chicago, IEEE styles
- **Essays**: Literature reviews, argumentative essays
- **Theses/Dissertations**: Graduate-level academic documents
- **Case Studies**: Business case analysis, academic case studies
- **Lab Reports**: Scientific experiment documentation

### Enterprise Documents
- **Technical Documentation**: User guides, manuals, specifications
- **Policy Documents**: HR policies, procedures, guidelines
- **Training Materials**: Courseware, workbooks, handouts
- **Contracts**: Legal agreements, terms of service
- **Compliance Documents**: Audit reports, certifications

## Output Location

**ALWAYS save formatted documents in:**
```
.claude/skills/document-reader-formatter-skill/formatted-documents/[document-title-with-extension]
```

**Naming convention**: Use descriptive title, include version if iterative
- Example: `Annual-Report-2024-Final.docx`
- Example: `Research-Paper-Smith-v2.docx`
- Example: `Proposal-Project-Alpha-Draft.docx`

## Before Implementation

Gather context to ensure successful implementation:

| Source | Gather |
|--------|--------|
| **Input Document** | Read current state, identify formatting needs, determine document type |
| **Conversation** | User requirements, target standard, deadline, special requirements |
| **Skill References** | Appropriate formatting standards, style guides, workflows |
| **Previous Work** | Existing templates, brand guidelines, style preferences |

Ensure all requirements understood before implementing formatting.

## Workflow: Format Document to Professional Standards

### Step 1: Analyze Input Document
1. Read the document using Read tool
2. Identify document type (business/academic/enterprise)
3. Note current formatting issues
4. Determine target standard (see `references/formatting-standards.md`)

### Step 2: Apply Document Structure
1. Set page margins and orientation
2. Add headers and footers with page numbers
3. Insert section breaks for major divisions
4. Configure different first page if needed
5. Set up page numbering format

### Step 3: Apply Professional Styles
1. Clear existing formatting (apply Normal style)
2. Apply Heading 1-9 styles to section headers
3. Set font (11-12pt for body)
4. Configure line spacing (1.15-1.5)
5. Set paragraph spacing (6pt after)

### Step 4: Format Content Elements
1. Convert text lists to proper bulleted/numbered lists
2. Apply table styles to tables
3. Format images with text wrapping
4. Add captions to tables and figures
5. Insert cross-references

### Step 5: Add Front Matter
1. Create title page (if required)
2. Insert table of contents
3. Insert list of tables/figures (if needed)
4. Add executive summary or abstract
5. Update all fields (F9)

### Step 6: Quality Check
1. Run spelling and grammar check
2. Verify heading hierarchy
3. Check page breaks (avoid widows/orphans)
4. Update all cross-references
5. Test navigation (bookmarks, links)

### Step 7: Save and Deliver
1. Save to `formatted-documents/` subfolder
2. Use descriptive filename
3. Verify all formatting applied correctly
4. Confirm file opens correctly
5. Notify user of completion

## Reference Files

| File | Purpose | When to Read |
|------|---------|--------------|
| `formatting-standards.md` | Professional formatting rules for all document types | Always read for style guidance |
| `word-processing-features.md` | Advanced Word features and how to use them | When implementing specific features |
| `workflows.md` | Step-by-step procedures for common tasks | When working on complex documents |

## Quality Checklist

Before delivering formatted document, verify:

- [ ] Document structure matches target type
- [ ] All headings use proper styles (not manual formatting)
- [ ] Font sizes and styles consistent throughout
- [ ] Margins and spacing correct for document type
- [ ] Page numbers present and formatted correctly
- [ ] Headers/footers appropriate for document type
- [ ] Tables styled and captioned
- [ ] Images sized, wrapped, and captioned
- [ ] Cross-references work correctly
- [ ] Table of contents current (if applicable)
- [ ] No widows/orphans at page breaks
- [ ] Spell check completed
- [ ] Accessibility features included (alt text)
- [ ] Saved in correct subfolder with descriptive name

## What This Skill Does NOT Do

- Does not create content from scratch (user provides content)
- Does not design custom logos or graphics (user provides assets)
- Does not print documents (only saves digital files)
- Does not convert to PDF unless specifically requested
- Does not violate document security or password protection
