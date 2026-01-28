# Input Handling Guide

How to process different input types when generating notes.

## Input Type: Topic Title Only

When given only a topic title (e.g., "Photosynthesis", "World War II", "Machine Learning"):

### Steps:
1. **Assess knowledge**: Use existing knowledge about the topic
2. **Structure broadly**: Cover all major aspects of the topic
3. **Fill each level**: Generate appropriate content for each Bloom's level
4. **Be comprehensive**: Include standard information typically covered for this topic
5. **Note limitations**: If topic is obscure, mention that additional sources could provide more depth

### Strategy:
- Create well-organized, general notes
- Cover the most important aspects of the topic
- Use standard knowledge about the subject
- Include commonly taught elements
- Generate practice questions that test understanding

### Example:
Input: "Photosynthesis"
Output: Complete notes covering definition, process, importance, types, etc. at all Bloom's levels

## Input Type: Web Link

When given a URL (e.g., article, blog post, documentation):

### Steps:
1. **Fetch content**: Use WebFetch or webReader MCP to get the page content
2. **Extract key information**: Identify main ideas, important facts, examples
3. **Organize by Bloom's**: Map extracted content to appropriate cognitive levels
4. **Simplify language**: Rewrite complex content in simple, accessible language
5. **Structure notes**: Apply the standard note structure template
6. **Include source**: Reference the web link in the notes

### Strategy:
- Focus on the main content from the page
- Extract what's most important and relevant
- Don't try to capture every detail
- Adapt the author's structure to Bloom's framework
- Preserve key examples and illustrations
- Simplify technical language

### Example:
Input: https://example.com/article-blockchain-basics
Output: Notes based on the article, organized by Bloom's levels, with source link

### Web Reading Tips:
- Use `mcp__web_reader__webReader` for better markdown conversion
- Set `return_format: markdown` for easier processing
- Capture main headings and key sections
- Note important examples or analogies
- Identify the author's main arguments or points

## Input Type: Document File

When given a document file (PDF, DOCX, TXT, etc.):

### Steps:
1. **Read the document**: Use Read tool to access the content
2. **Understand structure**: Identify chapters, sections, headings
3. **Extract key content**: Pull out important information from each section
4. **Map to Bloom's**: Organize extracted content by cognitive level
5. **Simplify**: Rewrite in clear, accessible language
6. **Reference source**: Include document name in notes

### Strategy:
- Follow the document's organization when helpful
- Extract main ideas and supporting details
- Preserve important examples, diagrams, data
- Capture the author's key points
- Adapt document structure to Bloom's framework
- Be comprehensive but selective

### Example:
Input: research_paper.pdf
Output: Notes organized by Bloom's levels capturing key findings, methodology, conclusions, etc.

### Document-Specific Tips:

**PDF files:**
- Use Read tool (can read PDFs directly)
- If text extraction fails, mention the limitation
- Focus on readable text content
- Note if images/figures contain important information

**DOCX files:**
- Use Read tool (can read DOCX files)
- Preserves formatting and structure well
- Extract content following document organization

**TXT files:**
- Straightforward text reading
- Check for special formatting or structure
- May need to interpret organization

**Jupyter notebooks (.ipynb):**
- Read tool shows cells with outputs
- Focus on explanatory text and key code
- Extract main concepts and examples

## Content Organization Strategy

Regardless of input type, organize content by Bloom's levels:

### Remember (from input):
- Definitions provided
- Key terms mentioned
- Facts and figures stated
- Lists and categories

### Understand (from input):
- Explanations and descriptions
- Author's examples
- Main ideas and themes
- Concepts discussed

### Apply (from input):
- Real-world examples given
- Applications mentioned
- How-to information
- Practical uses described

### Analyze (from input):
- Comparisons made
- Analysis provided
- Relationships discussed
- Patterns identified

### Evaluate (from input):
- Author's arguments
- Strengths/weaknesses mentioned
- Criticisms or evaluations
- Judgments made

### Create (based on input):
- Build on author's ideas
- Suggest extensions or improvements
- Propose new applications
- Design related projects

## Language Simplification

Always rewrite content in simple, accessible language:

**Original**: "The photosynthetic apparatus utilizes photonic energy to catalyze the conversion of carbon dioxide and aqueous substrates into carbohydrate derivatives."

**Simplified**: "Plants use light energy to convert carbon dioxide and water into food (sugars)."

### Simplification Techniques:
- Replace technical terms with common words (or define them)
- Shorten long sentences
- Break complex explanations into steps
- Use everyday analogies
- Avoid jargon when possible
- Explain necessary technical terms

## Handling Incomplete Information

When input lacks content for certain Bloom's levels:

1. **Use existing knowledge**: Fill gaps with general knowledge about the topic
2. **Be transparent**: Note when content is inferred rather than from source
3. **Skip when appropriate**: Some topics may not lend themselves to all levels
4. **Focus on available content**: Work with what you have

## Quality Checks

Before finalizing notes, verify:

- [ ] All 6 Bloom's levels are covered (or skipped appropriately)
- [ ] Language is simple and accessible
- [ ] Source is referenced (for web/document inputs)
- [ ] Practice questions are included for each level
- [ ] Content is accurate and well-organized
- [ ] Formatting follows the template structure
- [ ] Content flows logically from Remember to Create
