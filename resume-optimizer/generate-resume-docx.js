// =============================================================================
// RESUME DOCX GENERATOR
// =============================================================================
// Usage: Populate resumeData from assets/resume-data-template.js with optimized
//        content, then call buildResume(data) to generate a formatted .docx.
//
// Requires: npm install docx
//
// Formatting rules:
//   - Name: centered, bold, 16pt
//   - Contact: centered, 10pt, LinkedIn as hyperlink
//   - Section headers: bold, 11pt, bottom border
//   - Company + dates: bold left + bold right (tab-stop aligned)
//   - Role + location: italic left + italic right (first role only shows location)
//   - Sub-roles: italic title only (no location, no dates)
//   - Bullets: 10pt, proper numbering (not unicode)
//   - Education: university bold + date bold, degree italic + location italic
//   - Page: US Letter, 0.5" margins, Arial font
// =============================================================================

const { Document, Packer, Paragraph, TextRun, AlignmentType, LevelFormat,
        ExternalHyperlink, TabStopType, BorderStyle } = require("docx");
const fs = require("fs");

// ── Styling constants ────────────────────────────────────────────────────
const FONT = "Arial";
const BODY_SIZE = 20;        // 10pt
const NAME_SIZE = 32;        // 16pt
const CONTACT_SIZE = 20;     // 10pt
const SECTION_SIZE = 22;     // 11pt
const COMPANY_SIZE = 20;     // 10pt
const TITLE_SIZE = 20;       // 10pt

const SECTION_BORDER = {
  bottom: { style: BorderStyle.SINGLE, size: 6, color: "000000", space: 1 }
};

// Tab stop at right margin: US Letter 8.5" - 0.5" margins = 7.5" = 10800 DXA
const RIGHT_TAB = 10800;

// ── Helpers ──────────────────────────────────────────────────────────────

/**
 * Two-column row using right-aligned tab stop.
 * Supports independent bold/italics for left and right text.
 */
function twoColRow(leftText, rightText, opts = {}) {
  const { bold = false, italics = false, size = BODY_SIZE,
          rightBold = false, rightItalics = false } = opts;
  return new Paragraph({
    tabStops: [{ type: TabStopType.RIGHT, position: RIGHT_TAB }],
    spacing: { after: 0 },
    children: [
      new TextRun({ text: leftText, font: FONT, size, bold, italics }),
      new TextRun({ text: "\t", font: FONT, size }),
      new TextRun({ text: rightText, font: FONT, size, bold: rightBold, italics: rightItalics })
    ]
  });
}

/** Section header with bottom border. */
function sectionHeader(text) {
  return new Paragraph({
    spacing: { before: 200, after: 80 },
    border: SECTION_BORDER,
    children: [
      new TextRun({ text, font: FONT, size: SECTION_SIZE, bold: true })
    ]
  });
}

// ── Document builder ─────────────────────────────────────────────────────

/**
 * Build a complete resume Document from a resumeData object.
 * @param {Object} data - Resume data matching assets/resume-data-template.js schema
 * @returns {Document} docx Document ready for Packer.toBuffer()
 */
function buildResume(data) {
  const children = [];

  // Header: Name
  children.push(new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 0 },
    children: [
      new TextRun({ text: data.header.name, font: FONT, size: NAME_SIZE, bold: true })
    ]
  }));

  // Header: Contact info with LinkedIn hyperlink
  children.push(new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 80 },
    children: [
      new ExternalHyperlink({
        link: data.header.contactInfo.linkedInUrl,
        children: [
          new TextRun({
            text: data.header.contactInfo.linkedInText,
            font: FONT, size: CONTACT_SIZE,
            style: "Hyperlink"
          })
        ]
      }),
      new TextRun({
        text: ` | ${data.header.contactInfo.email} | ${data.header.contactInfo.phone}`,
        font: FONT, size: CONTACT_SIZE
      })
    ]
  }));

  // Summary
  children.push(sectionHeader("SUMMARY"));
  children.push(new Paragraph({
    spacing: { after: 0 },
    children: [new TextRun({ text: data.summary, font: FONT, size: BODY_SIZE })]
  }));

  // Professional Experience
  children.push(sectionHeader("PROFESSIONAL EXPERIENCE"));

  data.experience.forEach(job => {
    // Company + dates: both bold
    children.push(twoColRow(job.company, job.dates, {
      bold: true, size: COMPANY_SIZE, rightBold: true
    }));

    job.roles.forEach((role, roleIndex) => {
      if (roleIndex === 0) {
        // First role: title + location, both italic
        children.push(twoColRow(role.title, job.location, {
          italics: true, size: TITLE_SIZE, rightItalics: true
        }));
      } else {
        // Sub-roles: italic title only (no location, no dates)
        children.push(new Paragraph({
          spacing: { before: 80, after: 0 },
          children: [
            new TextRun({ text: role.title, font: FONT, size: TITLE_SIZE, italics: true })
          ]
        }));
      }

      // Bullets
      role.bullets.forEach(bullet => {
        children.push(new Paragraph({
          numbering: { reference: "bullets", level: 0 },
          spacing: { after: 20 },
          children: [new TextRun({ text: bullet, font: FONT, size: BODY_SIZE })]
        }));
      });
    });

    // Gap between companies
    children.push(new Paragraph({ spacing: { after: 80 }, children: [] }));
  });

  // Certifications and Skills
  children.push(sectionHeader("CERTIFICATIONS AND SKILLS"));
  data.certificationsAndSkills.forEach(line => {
    children.push(new Paragraph({
      spacing: { after: 0 },
      children: [new TextRun({ text: line, font: FONT, size: BODY_SIZE })]
    }));
  });

  // Education
  children.push(sectionHeader("EDUCATION"));
  children.push(twoColRow(data.education.university, data.education.graduationDate, {
    bold: true, rightBold: true
  }));
  children.push(twoColRow(data.education.degree, data.education.location, {
    italics: true, rightItalics: true
  }));

  // Honors
  children.push(sectionHeader("HONORS"));
  data.honors.forEach(honor => {
    children.push(new Paragraph({
      spacing: { after: 0 },
      children: [new TextRun({ text: honor, font: FONT, size: BODY_SIZE })]
    }));
  });

  // Assemble document
  return new Document({
    styles: {
      default: {
        document: { run: { font: FONT, size: BODY_SIZE } }
      }
    },
    numbering: {
      config: [{
        reference: "bullets",
        levels: [{
          level: 0,
          format: LevelFormat.BULLET,
          text: "\u2022",
          alignment: AlignmentType.LEFT,
          style: {
            paragraph: { indent: { left: 540, hanging: 270 } }
          }
        }]
      }]
    },
    sections: [{
      properties: {
        page: {
          size: { width: 12240, height: 15840 },   // US Letter
          margin: { top: 720, right: 720, bottom: 720, left: 720 }  // 0.5" margins
        }
      },
      children
    }]
  });
}

// ── Export for use by optimizer ───────────────────────────────────────────

/**
 * Generate resume .docx file from populated data.
 * @param {Object} data - Populated resume data object
 * @param {string} outputPath - File path for output .docx
 */
async function generateResume(data, outputPath) {
  const doc = buildResume(data);
  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync(outputPath, buffer);
  return { path: outputPath, size: buffer.length };
}

module.exports = { buildResume, generateResume };
