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
        heading: "Who We Are and Scope",
        paragraphs: [
          "Kamanda Management LLC, at the address in the Contact section below, is responsible for deciding how personal information covered by this policy is used (the data controller). This policy covers our website, enquiries, and related business communications, including information provided by email or by a business representative.",
          "If an engagement involves processing personal information on a client’s instructions, the agreed data-processing terms and the client’s own privacy notice will also apply. This policy does not replace those arrangements."
        ]
      },
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
          "Please provide only information relevant to your enquiry. Do not include passwords, payment-card details, identity documents, health information, or other sensitive information in the general contact form. If you provide someone else’s details, you must have a lawful basis to do so and make this policy available to them.",
          "Fields identified as required are needed to process the form. Other details are optional. Without sufficient contact or enquiry information, we may be unable to respond; you may instead contact us by email.",
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
        heading: "Grounds for Processing",
        paragraphs: [
          "We process personal information only on grounds available under the law that applies to the particular activity. These include taking steps you request before entering a contract or performing a contract with you, complying with legal obligations, and establishing, exercising, or defending legal claims where permitted.",
          "Where consent is required, we will seek it for the relevant purpose. You may withdraw consent by contacting us; withdrawal does not affect earlier lawful processing. Reading this policy or browsing the website does not by itself give consent to unrelated processing or marketing.",
          "For security and ordinary business communications, we rely on legitimate interests only where the applicable law permits that ground and the necessary assessment supports its use without overriding your rights. Otherwise, we must use another available ground, including consent where required."
        ]
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
          "Google for Kamanda’s business email storage and handling of enquiry correspondence",
        ],
        afterBullets: [
          "We make reasonable efforts to limit the information shared with external service providers to what is necessary for each service to perform its role.",
          "We do not share your personal information with third-party advertising networks or tracking services.",
        ],
      },
      {
        heading: "Brevo Email Processing",
        paragraphs: [
          "Brevo delivers enquiry emails to Kamanda and acknowledgement emails to the sender. This involves processing the contact details and message needed for delivery, together with delivery and diagnostic records.",
          "Our use of Brevo is subject to the applicable service and data-processing arrangements. Submitting an enquiry does not subscribe you to marketing. Any marketing requiring consent will be handled separately, with a way to withdraw that consent."
        ]
      },
      {
        heading: "Google reCAPTCHA Enterprise",
        paragraphs: [
          "Google reCAPTCHA Enterprise helps protect the website against fraud, bots, and abuse. It processes technical and interaction signals, which may include IP address, browser and device information, cookies, and activity associated with the security check. We do not intentionally send the enquiry message itself for CAPTCHA verification.",
          "For reCAPTCHA customer data, Kamanda acts as controller and Google acts as processor under the applicable Google Cloud terms and Cloud Data Processing Addendum. Google processes that data to provide and maintain the security service.",
          "Security checks may block or challenge a submission. If you cannot submit the form or believe a security decision is mistaken, contact info@kamandagroup.com so that a person can assist with your enquiry."
        ]
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
        heading: "Cookies and Similar Technologies",
        paragraphs: [
          "Website hosting and security services may use cookies or similar browser technologies to operate and protect the website. reCAPTCHA uses a security cookie called _grecaptcha. Blocking these technologies in your browser may affect the contact form or security checks; email remains an alternative.",
          "Where a technology requires consent under applicable law, consent must be obtained before it is used. This privacy notice is not a substitute for that consent."
        ]
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
          "We do not sell or rent personal information. We limit disclosure to information needed for a defined purpose and a lawful basis."
        ],
        bullets: [
          "Service providers supporting hosting, email delivery, security, and business administration, acting under applicable confidentiality and data-processing arrangements.",
          "Business or specialist partners when needed for a requested introduction or engagement. We will explain a proposed disclosure and obtain consent where required before sharing identifiable enquiry details. An independent partner is responsible for its own processing and privacy notice.",
          "Professional advisers where needed for advice, compliance, or legal claims, subject to confidentiality obligations.",
          "Courts, regulators, or other authorities where disclosure is legally required or otherwise permitted and necessary under applicable law."
        ]
      },
      {
        heading: "Data Retention",
        paragraphs: [
          "We keep identifiable information only while needed for its stated purpose or a lawful retention requirement. For enquiries, the relevant criteria are whether follow-up is still active, whether an engagement results, and whether records are needed to resolve an outstanding issue. For client records, relevant criteria include the engagement duration, applicable accounting and tax requirements, and legal claim periods.",
          "Enquiries are delivered by email and retained in Kamanda’s Google email account; we do not maintain a separate database of contact-form responses. The account currently uses its default retention settings. Those settings do not establish a fixed deletion deadline for every message. Retention of enquiry correspondence remains subject to the purpose and legal criteria above. Security identifiers and delivery logs are retained according to their operational purpose and the relevant service configuration.",
          "When information is no longer needed, it must be securely deleted or irreversibly anonymised. Any retained backup copies must remain protected and be removed through the applicable backup cycle. A legal hold may delay deletion of relevant records; it does not permit unrelated use.",
          "You may ask us about the retention criteria applicable to your information using the contact details below."
        ]
      },
      {
        heading: "Security",
        paragraphs: [
          "Kamanda uses reasonable administrative and technical measures intended to protect information submitted through the website.",
          "These measures include server-side validation, CAPTCHA verification, rate limiting, duplicate-submission protection, restricted service credentials, and secure transport.",
          "No online system can be guaranteed to be completely secure, but we take reasonable steps to reduce unnecessary exposure of personal information. We will assess suspected personal-data breaches and notify affected people and competent authorities when required by applicable law.",
        ],
      },
      {
        heading: "Third-Party Services and Links",
        paragraphs: [
          "Links to independently operated websites are provided for convenience. Their operators are responsible for their own collection and use of information, and you should review their privacy notices before providing details.",
          "Using a service provider does not remove Kamanda’s responsibilities for processing under its control. The provider’s role and the applicable law determine the responsibilities of each party."
        ]
      },
      {
        heading: "Your Rights and Choices",
        paragraphs: [
          "Subject to the applicable law and its exceptions, you may request information about processing, access and a copy of your data, correction, deletion or destruction, restriction or cessation of processing, and portability where available. You may also withdraw consent and object to processing where the law provides that right.",
          "Email info@kamandagroup.com with your request and enough detail to identify the relevant interaction. We may seek proportionate information to verify your identity or an authorised representative’s authority; please do not send identity documents unless requested through an appropriate channel.",
          "We will respond within the applicable statutory period. If an extension, refusal, or lawful retention exception applies, we will explain it and the available challenge or complaint options. Requests are free unless the applicable law expressly permits a charge.",
          "You may raise concerns with us or complain directly to the competent data-protection authority. This includes the UAE Data Office where the UAE federal data-protection law applies, and the Saudi Data and Artificial Intelligence Authority (SDAIA) where the Saudi Personal Data Protection Law applies. Contacting us first is not a condition of exercising those rights."
        ]
      },
      {
        heading: "International Processing",
        paragraphs: [
          "Kamanda is based in the United Arab Emirates. Sending an enquiry from Saudi Arabia or another country involves processing in the UAE. Our hosting, email, and security providers may also process information in other countries through their infrastructure and support operations.",
          "Any restricted international transfer must meet the applicable legal requirements, including any necessary adequacy determination, approved contractual safeguards, assessment, or other legally available transfer mechanism. We do not treat use of the website as blanket consent to international transfers.",
          "Contact us for information about the destinations and safeguards relevant to your enquiry. Specific service arrangements may require additional disclosures or protections before information is transferred."
        ]
      },
      {
        heading: "Children’s Information",
        paragraphs: [
          "Our website and services are directed to business users and are not intended to solicit personal information from children. If you believe a child has provided information without appropriate authority, contact us so we can assess and address it under applicable law."
        ]
      },
      {
        heading: "Changes to This Privacy Policy",
        paragraphs: [
          "Kamanda may update this Privacy Policy from time to time.",
          "The current version will be published on this page with its effective date. For material changes, we will provide appropriate notice and obtain fresh consent where required before using information for a new purpose.",
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
      'These Terms of Service ("Terms") govern the use of kamandagroup.com and the general business interactions and services provided by Kamanda Management LLC ("Kamanda," "we," "us," or "our").\n\nThese Terms explain the conditions for using this website. They apply to paid services only when incorporated into an agreement accepted by you and Kamanda. Browsing the website or submitting an enquiry does not by itself create a paid engagement or an obligation to purchase services.',
    sections: [
      {
        heading: "Our Approach",
        paragraphs: [
          "Kamanda aims to work collaboratively with clients and business partners and to provide practical, professional support intended to contribute to successful outcomes.",
          "We will perform agreed services with reasonable skill, care, and diligence, act in good faith, and communicate material issues affecting delivery. We will disclose material conflicts of interest and any referral remuneration relevant to a proposed recommendation before the client decides whether to proceed.",
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
        ],
        afterBullets: [
          "Before paid work begins, the parties should accept a written scope identifying deliverables, responsibilities, charges and taxes, payment milestones, timing, and any relevant acceptance criteria. Changes affecting scope, fees, or timing require mutual agreement. An invoice alone does not introduce new terms that were not agreed.",
          "A separately accepted engagement agreement takes priority over conflicting general Terms, subject always to mandatory law. A person entering an agreement for an organisation must have authority to do so.",
        ],
      },
      {
        heading: "Client Responsibilities and Final Decisions",
        paragraphs: [
          "Kamanda may provide advice, analysis, recommendations, coordination, information, introductions, or support.",
          "Clients retain final decision-making authority unless a specific mandate is agreed. This does not reduce Kamanda’s responsibility for the quality of its agreed work, its own advice, or duties imposed by law.",
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
          "Forecasts and estimates depend on stated assumptions and available information and are not promises of a particular result. This does not override an express contractual commitment, agreed delivery standard, or statutory remedy.",
        ],
      },
      {
        heading: "Business Introductions and Third Parties",
        paragraphs: [
          "Kamanda may introduce clients to vendors, contractors, consultants, technology providers, investors, business partners, or other third parties.",
          "Kamanda may assist with evaluating opportunities and coordinating collaboration.",
          "Unless expressly agreed otherwise in writing, Kamanda is not a party to contracts entered into between a client and a third party.",
          "Final selection, negotiation, contracting, payment, and performance decisions remain with the relevant parties.",
          "An introduction alone does not make Kamanda a guarantor of an independent third party’s performance. Kamanda remains responsible for its own selection, representations, advice, and coordination to the extent required by its agreement and applicable law.",
        ],
      },
      {
        heading: "Technology and Specialist Partners",
        paragraphs: [
          "Where specialist implementation is required, Kamanda may coordinate delivery through trusted specialist partners.",
          "Those providers may operate under their own contractual terms, responsibilities, warranties, and limitations.",
          "We will clarify whether a specialist is contracted directly by the client or engaged by Kamanda as a subcontractor. Appointing a subcontractor does not, by itself, release Kamanda from its agreed delivery obligations. Directly appointed specialists remain responsible for their contracts, without excluding Kamanda’s own responsibilities.",
        ],
      },
      {
        heading: "Information and Professional Advice",
        paragraphs: [
          "Information provided by Kamanda is intended to support business and project decision-making.",
          "General business support is not a substitute for legal, tax, investment, engineering certification, or other regulated professional advice. Regulated work may be undertaken only through appropriately authorised professionals under an expressly agreed scope; these Terms do not represent that Kamanda holds any particular professional authorisation.",
          "Clients should obtain specialist advice where appropriate.",
        ],
      },
      {
        heading: "Fees and Payment",
        paragraphs: [
          "Fees, currency, applicable taxes, payment dates, and reimbursable expenses must be agreed for the engagement. Additional work and material third-party expenses require client approval before they are incurred, unless already authorised in the agreed scope.",
          "Clients must pay undisputed amounts when due. If an invoice is disputed in good faith, the client should promptly explain the issue and pay the undisputed portion; both parties will cooperate to resolve the balance. Raising a genuine dispute does not waive either party’s rights.",
          "Any late charge or suspension right must be expressly agreed and lawful. Before suspending work for non-payment, Kamanda will provide written notice and a reasonable opportunity to resolve the issue, except where immediate action is required by law."
        ]
      },
      {
        heading: "Service Concerns, Cancellation, and Termination",
        paragraphs: [
          "Please report a service concern promptly with sufficient detail for us to investigate. Where our work fails to meet agreed requirements, we will discuss an appropriate remedy, which may include correction, repeat performance, a proportionate price reduction, or a refund as required by the agreement or law. This process does not restrict statutory remedies.",
          "An engagement should specify its duration, cancellation rights, notice periods, and any agreed charges. Neither party may impose a new cancellation fee retrospectively. Any charge must reflect the agreement and applicable law, including consumer cancellation rights where relevant.",
          "Where these Terms form part of an engagement and the engagement does not provide otherwise, either party may terminate for a material breach that remains unremedied after written notice and a reasonable opportunity to remedy it. Immediate termination is permitted where required by law or where a serious breach cannot reasonably be remedied.",
          "On termination, the parties will account fairly for work properly performed and approved, unavoidable commitments. Unearned advance payments will be refunded after deducting amounts lawfully due, without double recovery. We will cooperate in a reasonable handover and return of client materials, subject to lawful retention and agreed rights."
        ]
      },
      {
        heading: "Confidential Information",
        paragraphs: [
          "Each party must use the other’s confidential information only for the engagement, protect it with reasonable care, and disclose it only to people who need it and are subject to appropriate confidentiality obligations.",
          "This does not cover information lawfully public, already known without restriction, independently developed, or lawfully obtained from another source. Legally required disclosure is permitted; where lawful, the receiving party will give advance notice and limit disclosure to what is required.",
          "Confidentiality continues for as long as the information remains confidential. Separate confidentiality agreements take priority where applicable. Personal information remains subject to applicable data-protection law."
        ]
      },
      {
        heading: "Intellectual Property",
        paragraphs: [
          "Each party retains its pre-existing intellectual property. Clients retain ownership of materials they provide and permit Kamanda to use them only as needed for the engagement. Each party must have the rights needed for materials it supplies.",
          "Ownership and permitted use of commissioned deliverables should be specified in the engagement. Unless otherwise agreed, after payment of amounts properly due for a deliverable, the client has a non-exclusive right to use it for the agreed purpose, including any embedded Kamanda materials needed for that use. Third-party licence restrictions must be disclosed before acceptance. This does not transfer ownership of Kamanda’s reusable methods or templates.",
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
          "Kamanda may update or discontinue website features, but website changes do not cancel existing service commitments. Where reasonably practicable, we will give notice of changes materially affecting an active engagement.",
          "Temporary interruptions may occur due to maintenance, third-party services, infrastructure issues, or other circumstances outside Kamanda's control.",
        ],
      },
      {
        heading: "Limitation of Liability",
        paragraphs: [
          "Each party is responsible, in accordance with applicable law, for loss caused by its breach of contract, negligence, or other wrongful conduct. Responsibility should reflect each party’s contribution to the loss; neither party is made responsible merely because a commercial outcome differs from a forecast.",
          "For business-to-business engagements only, and to the extent lawful, neither party is liable to the other for indirect or consequential loss. This does not exclude direct losses merely because they involve lost revenue or profit. Any financial liability cap must be expressly agreed in the engagement; these website Terms do not impose one.",
          "No exclusion or limitation applies to fraud, deliberate misconduct, gross negligence, death or personal injury caused by negligence, or any liability that cannot lawfully be excluded or limited. Nothing limits mandatory consumer rights, data-protection rights, or remedies for defective services.",
          "Both parties must take reasonable steps to reduce avoidable loss. Independent third-party conduct, inaccurate inputs, or external events affect responsibility only to the extent they actually caused the loss and do not excuse a party’s own breach."
        ]
      },
      {
        heading: "Indemnity",
        paragraphs: [
          "These general Terms do not impose an automatic obligation on a client to indemnify Kamanda against all claims. A party seeking compensation must establish its entitlement under the agreement and applicable law.",
          "Any specific indemnity for an engagement must be expressly agreed, identify the covered risk, and provide a fair process for notice, defence, and settlement. It must not shift responsibility for the protected party’s own wrongful conduct or override mandatory rights."
        ]
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
          "We may update these Terms prospectively and publish the revised effective date. Material changes affecting an existing engagement require the agreement or notice process specified in that engagement and any consent required by law.",
          "Publishing revised website Terms does not retrospectively change an accepted engagement, impose additional charges, or remove accrued rights."
        ]
      },
      {
        heading: "General Provisions",
        paragraphs: [
          "If a provision is unlawful or unenforceable, it will apply only to the extent permitted or be severed if necessary; the remaining provisions continue where legally possible. Failure to enforce a right immediately does not by itself waive that right.",
          "Neither party may transfer an engagement in a way that materially reduces the other’s rights or increases its obligations without consent, except as permitted by law. Provisions intended to continue after termination, including accrued payment rights, confidentiality, intellectual property, and dispute provisions, continue to the extent applicable."
        ]
      },
      {
        heading: "Governing Law",
        paragraphs: [
          "These Terms are governed by the laws applicable in Ras Al Khaimah and the federal laws of the United Arab Emirates, unless a separately accepted engagement lawfully provides otherwise.",
          "Please contact info@kamandagroup.com with a complaint or dispute so we can seek a good-faith resolution. Either party may seek urgent relief, use an available regulator or consumer complaint process, or bring a claim without being required to complete an informal process first.",
          "Subject to mandatory jurisdiction rules and any separately accepted dispute agreement, the competent courts of Ras Al Khaimah have non-exclusive jurisdiction. This does not remove a consumer’s right to use courts or protections available under mandatory law in their country, including Saudi Arabia where applicable."
        ]
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
