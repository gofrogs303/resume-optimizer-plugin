---
name: resume-optimizer
description: Systematic resume optimization for job applications. Tailors resumes to job postings through requirement mapping, ATS optimization, historical resume mining, and content enhancement. Use when user asks to optimize, tailor, or customize a resume for a specific job posting, role, or company. Triggers include 'optimize my resume for', 'tailor my experience for', 'help me apply to', or providing a job description with request for resume updates.
---

# Resume Optimizer

Systematic, multi-phase approach to resume optimization that produces ATS-optimized resumes with comprehensive requirement coverage analysis.

## Workflow

Resume optimization follows this sequence:

1. **Gather inputs** - Job posting, current resume, historical resumes
2. **Analyze requirements** - Map JD requirements to resume coverage
3. **Mine historical content** - Search bullet bank for relevant language
4. **Optimize content** - Apply writing principles and ATS best practices
5. **Deliver outputs** - Optimized resume + requirement checklist

## Phase 1: Gather Inputs

Collect these materials:

**Required:**
- Job description (URL, text, or document)
- Current resume to optimize (user will provide or specify which version)

**Automatically retrieve:**
- Historical bullet points from `resume-bullets.md` for language mining
- Previous optimization checklists if available

Ask user: "Which resume version should I use as the starting point?" if not provided.

## Phase 2: Analyze Requirements

Extract from job description:
1. Required qualifications
2. Preferred qualifications
3. Key responsibilities
4. Technical skills
5. Soft skills/cultural fit

Create requirement mapping using template from `requirements-checklist-template.md`:
- Identify where each requirement is currently addressed
- Mark status: ✅ Strong / ⚠️ Weak / ❌ Missing
- Note gaps and mitigation strategies

## Phase 3: Mine Historical Content

Search `resume-bullets.md` for strong language from previous resumes. This file contains pre-curated bullet points organized by source role (CITI_SVP, CITI_VP, CITI_AVP, BNSF, CED).

Search for:
- Specific frameworks mentioned in JD (NIST 800-53, SOC2, DORA, etc.)
- Technical certifications
- Role-specific keywords (GRC, compliance program, audit, product)
- Quantified achievements related to JD requirements

The bullet bank contains proven phrasing across both GRC/audit and product management positioning. Extract relevant bullets and adapt for this application. This avoids reinventing language and ensures consistent quantified results.

## Phase 4: Optimize Content

**Use the resume data template** from `resume-data-template.js` as the canonical structure. This template defines exactly which fields are FIXED (never change) and which are VARIABLE (change per application):

- **FIXED** — header, company names, locations, dates, role titles, education, honors. Do not modify these.
- **VARIABLE** — summary (60-word max), role bullets (sourced from bullet bank), certifications (subset relevant to target role per `resume-data-template.js`).

Populate the VARIABLE fields by:
1. Writing an optimized summary tailored to the target role
2. Selecting and adapting bullets from `resume-bullets.md` for each role
3. Including only certifications relevant to the job description

**Writing style:** Follow `writing-guidelines.md` for all bullet writing — active voice, lead with impact, quantify everything, concrete language.

**Bullet point formula:** `[Action Verb] + [What] + [How/Context] + [Quantified Result]`

Example: "Established IT SOX compliance program managing 50+ controls across 15 applications, reducing audit findings by 40% and achieving zero material weaknesses for 3 consecutive years"

**ATS optimization and formatting:** Follow `docx-handling.md` for all ATS rules and formatting guidance.

**Domain terminology:** Reference `industry-keywords.md` for domain-specific keywords and frameworks.

**Strategic positioning:**
- Standard section order: Summary → Experience → Certifications → Education
- Reorder experience to lead with most relevant roles
- Move certifications higher if emphasized in JD (confirm before deviating from established section structure)
- Tailor job descriptions to emphasize relevant aspects
- Create skills section that mirrors JD language

## Phase 5: Deliver Outputs

**Implementation approach:**
1. Copy `resume-data-template.js` and populate VARIABLE fields with optimized content from Phase 4
2. Use `generate-resume-docx.js` to generate the .docx file — this script enforces all formatting rules (font, sizing, bold/italic, tab-stop alignment, bullet numbering, section borders)
3. Convert to PDF using LibreOffice: `soffice --headless --convert-to pdf resume.docx`
4. Finalize requirement checklist from `requirements-checklist-template.md`

**Do NOT manually construct docx formatting.** Always use `generate-resume-docx.js` — see `docx-handling.md` for details on the formatting it handles.

Produce three deliverables:

1. **Optimized resume (.docx)** - Generated via `generate-resume-docx.js`
2. **Optimized resume (.pdf)** - PDF via LibreOffice conversion
3. **Requirement checklist** - Completed version showing how each requirement is addressed

Present all files using the present_files tool.

## Quality Standards

Before delivering, verify:
- [ ] Every required qualification addressed
- [ ] 80%+ preferred qualifications covered
- [ ] All bullets quantified where possible
- [ ] Key JD phrases appear verbatim where possible (for ATS)
- [ ] No bullets exceed 2 lines
- [ ] Active voice throughout
- [ ] Consistent formatting
- [ ] Recent/relevant experience leads
- [ ] Summary is 60 words or fewer
- [ ] FIXED fields unchanged (company names, dates, locations, titles, education, honors)
- [ ] Only relevant certifications included (not aspirational padding)

## Key Principles

**Leverage historical content:** Don't reinvent language — mine `resume-bullets.md` for proven phrasing and quantified results from previous tailored versions.

**Systematic not ad-hoc:** Follow all five phases even for "quick" optimizations to ensure consistency and quality.

**ATS-first mindset:** Resume must pass automated screening before human review. Exact keyword matching is critical.

**Quantify everything:** Every achievement should have a number — team size, percentage improvement, dollar amount, time saved, controls managed, findings reduced.
