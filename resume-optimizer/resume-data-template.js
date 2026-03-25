// =============================================================================
// RESUME DATA TEMPLATE
// =============================================================================
// This template defines the canonical structure for all resume optimizations.
//
// FIXED fields  = hardcoded values that NEVER change between optimizations.
//                 Do not modify these during optimization.
// VARIABLE fields = placeholders replaced per job application.
//                   These are the ONLY fields the optimizer should change.
//
// Variable fields:
//   - summary                          (tailored per application, 60-word max)
//   - experience[].roles[].bullets[]   (tailored per application from bullet bank)
//   - certificationsAndSkills[]        (subset of certs relevant to target role)
//
// Fixed fields (do NOT change):
//   - header (name, contact info, LinkedIn URL)
//   - experience[].company, .location, .dates
//   - experience[].roles[].title
//   - education (university, location, date, degree)
//   - honors
// =============================================================================

const resumeData = {
  // ── FIXED ──────────────────────────────────────────────────────────────
  header: {
    name: "MAX NEWEY",
    contactInfo: {
      linkedInUrl: "https://www.linkedin.com/in/maxnewey/",
      linkedInText: "LinkedIn",
      email: "maxnewey40@gmail.com",
      phone: "(303)-819-4992"
    }
    // NOTE: "LinkedIn" renders as a clickable hyperlink in docx output.
  },

  // ── VARIABLE ───────────────────────────────────────────────────────────
  // Hard limit: 60 words max. Tailored to target role.
  summary: "REPLACE_WITH_OPTIMIZED_SUMMARY",

  // ── EXPERIENCE ─────────────────────────────────────────────────────────
  // Structure: company (FIXED) → roles (FIXED titles) → bullets (VARIABLE)
  // Multi-role companies: first role shows location; sub-roles omit it.
  // Dates are company-level only (not per sub-role).
  experience: [
    {
      company: "Citigroup Inc.",          // FIXED
      location: "Irving, Texas",          // FIXED
      dates: "May 2021 \u2013 Present",   // FIXED
      roles: [
        {
          title: "Senior IT Audit Manager (SVP) \u2013 Cyber & Infrastructure Audit", // FIXED
          bullets: [                        // VARIABLE — typically 3-4 bullets
            "REPLACE_WITH_BULLET",
            "REPLACE_WITH_BULLET",
            "REPLACE_WITH_BULLET",
            "REPLACE_WITH_BULLET"
          ]
        },
        {
          title: "Audit Manager (VP) \u2013 Cyber & Infrastructure Audit",  // FIXED
          bullets: [                                                          // VARIABLE — typically 1 bullet
            "REPLACE_WITH_BULLET"
          ]
        },
        {
          title: "Senior Auditor (AVP) \u2013 Cyber & Infrastructure Audit", // FIXED
          bullets: [                                                           // VARIABLE — typically 1 bullet
            "REPLACE_WITH_BULLET"
          ]
        }
      ]
    },
    {
      company: "BNSF Railway",                  // FIXED
      location: "Fort Worth, TX",               // FIXED
      dates: "October 2018 \u2013 May 2021",    // FIXED
      roles: [
        {
          title: "Auditor II \u2013 IT SOX",    // FIXED
          bullets: [                              // VARIABLE — typically 3-4 bullets
            "REPLACE_WITH_BULLET",
            "REPLACE_WITH_BULLET",
            "REPLACE_WITH_BULLET",
            "REPLACE_WITH_BULLET"
          ]
        }
      ]
    },
    {
      company: "Consolidated Electrical Distributors Inc.", // FIXED
      location: "Irving, Texas",                           // FIXED
      dates: "June 2016 \u2013 June 2018",                // FIXED
      roles: [
        {
          title: "Internal Auditor",              // FIXED
          bullets: [                               // VARIABLE — typically 2-3 bullets
            "REPLACE_WITH_BULLET",
            "REPLACE_WITH_BULLET",
            "REPLACE_WITH_BULLET"
          ]
        }
      ]
    }
  ],

  // ── VARIABLE ───────────────────────────────────────────────────────────
  // Sourced from assets/resume-bullets.md. Include only certs relevant to
  // the target role. Available certs: CISSP, CISA, CCSP, CIA, AWS SAA, GCP PSE
  certificationsAndSkills: [
    "REPLACE_WITH_RELEVANT_CERTS"
  ],

  // ── FIXED ──────────────────────────────────────────────────────────────
  education: {
    university: "University of Colorado Boulder",
    location: "Boulder, Colorado",
    graduationDate: "May 2016",
    degree: "Bachelor of Science: Business Administration \u2013 Accounting"
  },

  // ── FIXED ──────────────────────────────────────────────────────────────
  honors: [
    "Eagle Scout Rank"
  ]
};

module.exports = resumeData;
