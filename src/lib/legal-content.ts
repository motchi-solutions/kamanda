export type LegalSection = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
  afterBullets?: string[];
};

export type LegalDocument = {
  slug: "privacy-policy" | "terms-of-service";
  title: string;
  effectiveDate: string;
  filename: string;
  intro: string;
  sections: LegalSection[];
};

const contactSection: LegalSection = {
  heading: "Contact",
  paragraphs: [
    "Kamanda Management LLC",
    "VUET3222\nCompass building - Al Hulaila,\nAL Hulaila Industrial Zone-FZ, Rakez,\nRas Al Khaimah, United Arab Emirates",
    "Email:\ninfo@kamandagroup.com",
  ],
};

export const legalDocuments: Record<LegalDocument["slug"], LegalDocument> = {
  "privacy-policy": {
    slug: "privacy-policy",
    title: "Privacy Policy",
    effectiveDate: "September 29, 2026",
    filename: "Kamanda-Privacy-Policy.pdf",
    intro:
      'Kamanda Management LLC ("Kamanda," "we," "us," or "our") respects your privacy and aims to handle personal information carefully and responsibly. This Privacy Policy explains what information we collect through kamandagroup.com, why we use it, and how third-party services may process limited information on our behalf.',
    sections: [
      {
        heading: "Information We Collect",
        paragraphs: [
          "When you submit an enquiry through our website, we may collect:",
        ],
        bullets: [
          "Full name",
          "Business name, where applicable",
          "Email address",
          "Phone number, country, and extension if provided",
          "Client type",
          "Service of interest",
          "Subject",
          "Message and any information you choose to include in it",
        ],
        afterBullets: [
          "We also process limited technical information needed to protect and operate the website. This may include an IP address for rate limiting, CAPTCHA verification information, browser/request information, and security-related identifiers.",
        ],
      },
      {
        heading: "How We Use Your Information",
        paragraphs: ["We use information submitted through the website to:"],
        bullets: [
          "Respond to your enquiry",
          "Communicate with you about services you are interested in",
          "Understand your project or business requirements",
          "Coordinate appropriate internal or partner follow-up",
          "Prevent spam, abuse, duplicate submissions, and automated attacks",
          "Maintain the security and reliability of the website",
          "Keep reasonable business and communication records where required",
        ],
        afterBullets: [
          "We do not automatically add contact-form users to marketing lists.",
          "We do not sell or rent your personal information to third parties.",
        ],
      },
      {
        heading: "Contact Form Processing",
        paragraphs: [
          "Contact-form submissions are processed through secure server-side validation before being accepted.",
          "The website currently uses:",
        ],
        bullets: [
          "Brevo for transactional email delivery",
          "Google reCAPTCHA Enterprise for automated abuse and bot detection",
          "Upstash Redis for rate limiting and duplicate-submission protection",
          "Vercel for website hosting and server execution",
        ],
        afterBullets: [
          "We make reasonable efforts to limit the information shared with external service providers to what is necessary for each service to perform its role.",
          "We do not share your personal information with third-party advertising networks or tracking services.",
        ],
      },
      {
        heading: "Brevo Email Processing",
        paragraphs: ["Brevo is used to:"],
        bullets: [
          "Deliver the submitted enquiry to Kamanda",
          "Send an automated confirmation email to the person who submitted the enquiry",
          "Brevo may process the contact details and enquiry information required to deliver those emails.",
        ],
        afterBullets: [
          "Kamanda does not use this contact form to automatically enroll users in marketing campaigns. Brevo's own privacy and service terms apply to its processing.",
        ],
      },
      {
        heading: "Google reCAPTCHA Enterprise",
        paragraphs: [
          "Google reCAPTCHA Enterprise is used to help distinguish legitimate submissions from automated or abusive activity.",
          "Google may process technical and interaction-related information required to perform this security assessment.",
          "Kamanda does not intentionally send the full enquiry message to Google for CAPTCHA verification.",
          "Google's own privacy and service terms apply to its processing.",
        ],
      },
      {
        heading: "Upstash Redis",
        paragraphs: [
          "Upstash Redis is used only for rate limiting and duplicate-submission protection.",
          "The implementation is designed to minimize personal information shared with Upstash.",
          "Before identifiers such as IP addresses or email addresses are used for rate limiting, they are transformed using a keyed cryptographic hash.",
          "Duplicate-submission protection also uses a cryptographic fingerprint rather than storing the raw enquiry content in Redis.",
          "The website is not designed to store the full contact-form message in Upstash.",
        ],
      },
      {
        heading: "Data Minimization",
        paragraphs: [
          "Kamanda aims to collect and process only information reasonably needed to:",
        ],
        bullets: [
          "respond to enquiries",
          "operate the website",
          "protect the website from abuse",
          "support legitimate business communications",
        ],
        afterBullets: [
          "When third-party services are used, we aim to provide only the information necessary for the relevant service.",
        ],
      },
      {
        heading: "Sharing of Information",
        paragraphs: [
          "Kamanda does not sell personal information. Information may be shared only where reasonably necessary with:",
        ],
        bullets: [
          "service providers supporting website operation, email delivery, hosting, security, or abuse prevention",
          "business or specialist partners where appropriate for responding to an enquiry and where such sharing is reasonably necessary",
          "professional advisers where necessary",
          "government, regulatory, or legal authorities where required by applicable law",
        ],
      },
      {
        heading: "Data Retention",
        paragraphs: [
          "Kamanda retains personal information only for as long as reasonably necessary for the purposes for which it was collected, including responding to enquiries, maintaining appropriate business records, resolving disputes, and meeting applicable legal or regulatory requirements.",
          "The website itself does not currently maintain a dedicated database of contact-form submissions.",
          "Transactional emails and related records may remain within Kamanda's email systems and the systems of relevant service providers in accordance with their applicable retention practices.",
        ],
      },
      {
        heading: "Security",
        paragraphs: [
          "Kamanda uses reasonable administrative and technical measures intended to protect information submitted through the website.",
          "These measures include server-side validation, CAPTCHA verification, rate limiting, duplicate-submission protection, restricted service credentials, and secure transport.",
          "No online system can be guaranteed to be completely secure, but we take reasonable steps to reduce unnecessary exposure of personal information.",
        ],
      },
      {
        heading: "Third-Party Services and Links",
        paragraphs: [
          "Our website may link to or rely on third-party services.",
          "Those services operate under their own terms and privacy practices. Kamanda performs reasonable due diligence when selecting service providers but does not control their independent systems or policies.",
        ],
      },
      {
        heading: "Your Rights and Choices",
        paragraphs: [
          "Depending on the law applicable to you, you may have rights relating to your personal information, including rights to request access, correction, or deletion.",
          "You may contact Kamanda to make a privacy-related request.",
        ],
      },
      {
        heading: "International Processing",
        paragraphs: [
          "Some service providers used by Kamanda may process information in jurisdictions outside the United Arab Emirates.",
          "Where third-party services are used, Kamanda aims to limit the information shared to what is necessary for the relevant service.",
        ],
      },
      {
        heading: "Changes to This Privacy Policy",
        paragraphs: [
          "Kamanda may update this Privacy Policy from time to time.",
          "The current version will always be published on the main Privacy Policy page with its effective date.",
        ],
      },
      contactSection,
    ],
  },
  "terms-of-service": {
    slug: "terms-of-service",
    title: "Terms of Service",
    effectiveDate: "September 29, 2026",
    filename: "Kamanda-Terms-of-Service.pdf",
    intro:
      'These Terms of Service ("Terms") govern the use of kamandagroup.com and the general business interactions and services provided by Kamanda Management LLC ("Kamanda," "we," "us," or "our").\n\nBy using this website, submitting an enquiry, or engaging with Kamanda, you agree to these Terms to the extent applicable to that interaction.',
    sections: [
      {
        heading: "Our Approach",
        paragraphs: [
          "Kamanda aims to work collaboratively with clients and business partners and to provide practical, professional support intended to contribute to successful outcomes.",
          "We will use reasonable efforts to understand client requirements, coordinate agreed activities, communicate clearly, and support the successful delivery of the services we undertake.",
          "Success often depends on information, approvals, decisions, actions, market conditions, third parties, and other circumstances outside Kamanda's control.",
        ],
      },
      {
        heading: "Services",
        paragraphs: ["Kamanda may provide services including:"],
        bullets: [
          "Technology and AI adoption support",
          "Construction support",
          "Project management",
          "Business solutions",
          "Business coordination",
          "Partner sourcing",
          "Introductions to specialist providers",
          "Project planning",
          "Implementation oversight",
          "Advisory and coordination services",
          "The exact scope, deliverables, responsibilities, fees, and timelines for a client engagement may be defined separately in a proposal, quotation, statement of work, agreement, purchase order, or other written confirmation.",
          "Where a separate written agreement conflicts with these general Terms, the separately agreed terms will govern that engagement.",
        ],
      },
      {
        heading: "Client Responsibilities and Final Decisions",
        paragraphs: [
          "Kamanda may provide advice, analysis, recommendations, coordination, information, introductions, or support.",
          "Final commercial, financial, operational, technical, investment, procurement, contractual, or project decisions remain the responsibility of the client and the relevant parties involved.",
          "Clients are responsible for reviewing information provided, carrying out their own due diligence, obtaining any specialist professional advice they require, and deciding whether to proceed with a recommendation, vendor, opportunity, transaction, project, or course of action.",
        ],
      },
      {
        heading: "Mutual Cooperation",
        paragraphs: [
          "Successful delivery depends on reasonable cooperation between Kamanda and the client.",
          "Clients should provide accurate information, timely approvals, access to relevant stakeholders, and other materials reasonably required to perform the agreed services.",
          "Kamanda will make reasonable efforts to communicate issues, dependencies, risks, or delays that become known during an engagement.",
        ],
      },
      {
        heading: "No Guarantee of Outcome",
        paragraphs: [
          "Kamanda will make reasonable efforts to support successful outcomes, but cannot guarantee:",
        ],
        bullets: [
          "project completion by a particular date unless expressly agreed",
          "cost savings",
          "revenue or profit",
          "investment returns",
          "regulatory approvals",
          "third-party performance",
          "successful negotiations",
          "business partnerships",
          "technology performance",
          "project or construction outcomes",
          "commercial opportunities",
          "market results",
        ],
        afterBullets: [
          "Forecasts, estimates, timelines, recommendations, and projections are provided based on the information reasonably available at the time.",
        ],
      },
      {
        heading: "Business Introductions and Third Parties",
        paragraphs: [
          "Kamanda may introduce clients to vendors, contractors, consultants, technology providers, investors, business partners, or other third parties.",
          "Kamanda may assist with evaluating opportunities and coordinating collaboration.",
          "Unless expressly agreed otherwise in writing, Kamanda is not a party to contracts entered into between a client and a third party.",
          "Final selection, negotiation, contracting, payment, and performance decisions remain with the relevant parties.",
          "Kamanda is not responsible for the acts, omissions, performance, financial condition, or representations of independent third parties.",
        ],
      },
      {
        heading: "Technology and Specialist Partners",
        paragraphs: [
          "Where specialist implementation is required, Kamanda may coordinate delivery through trusted specialist partners.",
          "Those providers may operate under their own contractual terms, responsibilities, warranties, and limitations.",
          "Kamanda will make reasonable efforts to coordinate such work where this forms part of the agreed scope, but independent providers remain responsible for their own services unless expressly agreed otherwise.",
        ],
      },
      {
        heading: "Information and Professional Advice",
        paragraphs: [
          "Information provided by Kamanda is intended to support business and project decision-making.",
          "Unless expressly included in an agreed engagement, Kamanda does not provide legal, accounting, tax, investment, insurance, engineering certification, or other regulated professional advice.",
          "Clients should obtain specialist advice where appropriate.",
        ],
      },
      {
        heading: "Fees and Payment",
        paragraphs: [
          "Fees, payment schedules, reimbursable expenses, taxes, and other commercial terms will be set out in the applicable quotation, proposal, agreement, invoice, or other written confirmation.",
          "Clients are responsible for paying agreed amounts in accordance with those terms.",
        ],
      },
      {
        heading: "Confidential Information",
        paragraphs: [
          "Where Kamanda receives confidential business information in connection with an engagement, it will use reasonable care to handle that information appropriately and for legitimate business purposes related to the engagement.",
          "Separate confidentiality or non-disclosure agreements may apply where agreed.",
        ],
      },
      {
        heading: "Intellectual Property",
        paragraphs: [
          "Unless otherwise agreed in writing, Kamanda retains its rights in its pre-existing materials, methods, templates, know-how, branding, and intellectual property.",
          "Website content, branding, text, graphics, layouts, and other original materials are owned by or licensed to Kamanda Management LLC unless otherwise stated.",
          "Third-party trademarks, photographs, logos, software, and other materials remain the property of their respective owners.",
          "If you wish to reproduce, distribute, publish, modify, or commercially use Kamanda-owned material, you may request permission by contacting:\ninfo@kamandagroup.com",
          "Permission must be obtained before such use unless applicable law permits the use without permission.",
        ],
      },
      {
        heading: "Website Use",
        paragraphs: ["Users must not:"],
        bullets: [
          "use the website unlawfully",
          "submit fraudulent, abusive, or misleading information",
          "interfere with website security or operation",
          "attempt unauthorized access",
          "introduce malicious software",
          "send automated spam",
          "circumvent CAPTCHA or rate limits",
          "misuse Kamanda content or systems",
        ],
        afterBullets: [
          "Kamanda may restrict access or reject submissions where reasonably necessary to protect its systems or users.",
        ],
      },
      {
        heading: "Website and Service Availability",
        paragraphs: [
          "Kamanda may update, modify, suspend, or discontinue website features or general service offerings.",
          "Temporary interruptions may occur due to maintenance, third-party services, infrastructure issues, or other circumstances outside Kamanda's control.",
        ],
      },
      {
        heading: "Limitation of Liability",
        paragraphs: [
          "Kamanda will use reasonable efforts to perform agreed services professionally and support the mutual success of an engagement.",
          "However, to the maximum extent permitted by applicable law, Kamanda is not responsible for losses arising from decisions made by a client or third party based on recommendations, information, opportunities, introductions, projections, estimates, or other support provided by Kamanda.",
          "To the maximum extent permitted by applicable law, Kamanda is not liable for indirect, incidental, special, consequential, punitive, loss-of-profit, loss-of-revenue, loss-of-opportunity, loss-of-business, or similar losses arising from use of the website or Kamanda's services.",
          "Kamanda is also not responsible for losses caused by:",
        ],
        bullets: [
          "inaccurate or incomplete information supplied by a client or third party",
          "decisions made by the client",
          "market conditions",
          "actions or failures of independent third parties",
          "circumstances beyond Kamanda's reasonable control",
        ],
        afterBullets: [
          "Nothing in these Terms excludes or limits liability where such exclusion or limitation is prohibited by applicable law.",
          "Any specific written client agreement may contain additional or different liability provisions and will govern that engagement where applicable.",
        ],
      },
      {
        heading: "Indemnity",
        paragraphs: [
          "To the extent permitted by applicable law, a user or client may be responsible for losses, claims, or costs resulting from their unlawful use of the website, infringement of third-party rights, fraudulent information, or breach of applicable agreed terms.",
        ],
      },
      {
        heading: "Privacy",
        paragraphs: [
          "Personal information submitted through the website is handled in accordance with Kamanda's Privacy Policy.",
        ],
      },
      {
        heading: "Changes to These Terms",
        paragraphs: [
          "Kamanda may update these Terms from time to time.",
          "The current version will be published on this page with its effective date.",
        ],
      },
      {
        heading: "Governing Law",
        paragraphs: [
          "These Terms are governed by the applicable laws of the United Arab Emirates.",
          "Any mandatory rights or legal requirements that apply under applicable law remain unaffected.",
        ],
      },
      contactSection,
    ],
  },
};

export function getLegalDocument(slug: string): LegalDocument | undefined {
  if (slug === "privacy-policy" || slug === "terms-of-service") {
    return legalDocuments[slug];
  }
  return undefined;
}
