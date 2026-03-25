# Working with DOCX Files for Resume Optimization

This guide explains how to read, create, and edit .docx resume files during optimization.

## Reading Existing Resumes

### Extract Text Content

Use `python-docx` to read resume content:

```python
from docx import Document

doc = Document('current_resume.docx')

# Extract all text
full_text = []
for paragraph in doc.paragraphs:
    full_text.append(paragraph.text)

content = '\n'.join(full_text)
```

### Extract Structured Content

```python
from docx import Document

doc = Document('resume.docx')

# Identify sections by style or content
sections = {}
current_section = None

for paragraph in doc.paragraphs:
    text = paragraph.text.strip()
    
    # Detect section headers (commonly bold or larger font)
    if paragraph.style.name.startswith('Heading') or is_section_header(text):
        current_section = text
        sections[current_section] = []
    elif current_section and text:
        sections[current_section].append(text)
```

## Creating New Resumes

**Use `scripts/generate-resume-docx.js`** for all new resume generation. This script enforces the canonical formatting rules and takes a populated data object from `assets/resume-data-template.js`.

```bash
npm install docx
```

See `assets/resume-data-template.js` for the data structure (FIXED vs VARIABLE fields) and `scripts/generate-resume-docx.js` for the formatting implementation.

Do NOT manually construct docx paragraphs for resume creation — the generator handles all formatting decisions:
- Company + dates: bold, right-aligned via tab stop
- Role + location: italic, right-aligned (first role only; sub-roles show italic title only)
- LinkedIn as clickable hyperlink
- Bullet numbering via LevelFormat.BULLET (never unicode)
- US Letter, 0.5" margins, Arial font
- Section headers with bottom border

### ATS-Compatible Formatting Rules

These rules are enforced automatically by `scripts/generate-resume-docx.js`. Listed here for reference and for manual editing scenarios.

**Page Setup:**
- US Letter size: 12240 x 15840 DXA (8.5" x 11")
- Margins: 0.5" all sides
- Single column layout (no tables for layout)

**Typography:**
- Font: Arial (hardcoded in generator)
- Size: 10pt body text, 16pt name
- Bold: company names, dates, section headers
- Italic: role titles, locations

**Sections:**
- Standard headers: "SUMMARY", PROFESSIONAL EXPERIENCE", "EDUCATION", "CERTIFICATIONS"
- Consistent formatting for section headers

**Lists:**
- Use proper bullet numbering (never unicode characters like •, ‣)
- Consistent indentation

**Avoid:**
- Tables for layout
- Text boxes
- Headers/footers with critical info
- Images or graphics
- Columns
- Unusual fonts

## Editing Existing Resumes

For small edits, use `python-docx`:

```python
from docx import Document

doc = Document('resume.docx')

# Find and replace text
for paragraph in doc.paragraphs:
    if 'old text' in paragraph.text:
        # Replace in runs to preserve formatting
        for run in paragraph.runs:
            if 'old text' in run.text:
                run.text = run.text.replace('old text', 'new text')

# Add new paragraph
from docx.shared import Pt
new_para = doc.add_paragraph()
new_para.add_run('New bullet point text').font.size = Pt(10)

doc.save('updated_resume.docx')
```

For major restructuring, create a new document using docx-js with the optimized content.

## Key Principles for Resume Documents

1. **ATS Compatibility First**: Simple formatting beats elaborate design
2. **Consistent Formatting**: Same spacing, same bullet style, same fonts throughout
3. **Standard Section Names**: Use conventional headers ATS systems recognize
4. **No Special Characters**: Stick to standard ASCII where possible
5. **Single Column**: Multi-column layouts break ATS parsing
6. **Quantify Everything**: Include metrics in bullet points (managed X, reduced Y%)

## Converting to PDF

Many job applications require PDF submissions. Convert the final .docx to PDF while preserving formatting.

### Using LibreOffice (Recommended)

LibreOffice provides high-quality PDF conversion with proper font embedding:

```bash
# Convert DOCX to PDF
soffice --headless --convert-to pdf optimized_resume.docx
```

This produces `optimized_resume.pdf` with:
- Embedded fonts (ensures consistent rendering)
- Preserved formatting
- Searchable text (critical for ATS systems)
- Standard PDF/A compliance

### Verification After Conversion

Always verify the PDF output:

```bash
# Convert PDF to images to visually inspect
python -c "
from pdf2image import convert_from_path
images = convert_from_path('optimized_resume.pdf')
images[0].save('resume_page1.png')
"
```

Or extract text to verify content is searchable:

```bash
# Extract text from PDF
pdftotext optimized_resume.pdf - | head -20
```

### PDF Best Practices

**Always provide both formats:**
- Submit .docx for systems that parse Word documents directly
- Submit PDF for universal compatibility and appearance preservation
- Some ATS systems prefer .docx, others prefer PDF - when in doubt, provide both

**PDF-specific considerations:**
- File size: Keep under 1MB (compress images if needed)
- Security: Don't password-protect (ATS systems can't read protected PDFs)
- Metadata: Ensure PDF title matches your name
- Text layer: PDF must have searchable text, not just images