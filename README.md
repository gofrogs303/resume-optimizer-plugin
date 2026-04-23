# Resume Optimizer Plugin

A Claude Code plugin for systematic resume optimization. Tailors resumes to job postings through requirement mapping, ATS optimization, historical resume mining, and content enhancement.

## Installation

### From GitHub

```
/plugin marketplace add maxnewey/resume-optimizer-plugin
/plugin install resume-optimizer@resume-optimizer-plugin
```

### Local

```
/plugin install /path/to/resume-optimizer-plugin
```

## Usage

Trigger the skill by asking Claude to optimize, tailor, or customize a resume:

- "Optimize my resume for this job posting"
- "Tailor my experience for [role] at [company]"
- "Help me apply to [job link]"
- Provide a job description and ask for resume updates

## What It Does

1. **Gathers inputs** — Job posting, current resume, historical resumes
2. **Analyzes requirements** — Maps JD requirements to resume coverage
3. **Mines historical content** — Searches bullet bank for proven language
4. **Optimizes content** — Applies writing principles and ATS best practices
5. **Delivers outputs** — Optimized .docx + .pdf resume and requirement checklist

## Files

| File | Purpose |
|------|---------|
| `SKILL.md` | Main skill instructions |
| `resume-bullets.md` | Historical bullet bank organized by role |
| `resume-data-template.js` | Canonical resume structure (FIXED vs VARIABLE fields) |
| `generate-resume-docx.js` | Script to generate formatted .docx files |
| `requirements-checklist-template.md` | Template for requirement coverage analysis |
| `writing-guidelines.md` | Bullet writing style guide |
| `docx-handling.md` | ATS rules and formatting guidance |
| `industry-keywords.md` | Domain-specific keywords and frameworks |
| `optimization-framework.md` | Optimization methodology |
| `bullet-role-mapping-review.md` | Role-to-bullet mapping reference |

## Author

Max Newey
