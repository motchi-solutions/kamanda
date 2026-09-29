export const serviceImages = {
  technologyAi: {
    src: "/services/technology-ai.jpg",
    alt: "Professional reviewing analytics charts on a laptop",
    position: "object-center",
  },
  constructionSupport: {
    src: "/services/construction-support.jpg",
    alt: "Construction professionals inspecting a building site",
    position: "object-[center_70%]",
  },
  projectManagement: {
    src: "/services/project-management.png",
    alt: "Business team discussing a project around a meeting table",
    position: "object-center",
  },
  businessSolutions: {
    src: "/services/business-solutions.jpg",
    alt: "Business professional reviewing charts on a tablet alongside planning documents",
    position: "object-center",
  },
};

export const services = [
  {
    id: "technology-ai",
    image: serviceImages.technologyAi,
    title: "Technology & AI Adoption",
    eyebrow: "Requirements, Partners, and Adoption",
    description:
      "Identify where technology can improve your operations and turn those opportunities into a practical adoption plan.",
    approach:
      "Kamanda helps assess business needs, define requirements, select specialist partners, and oversee implementation. We coordinate the work and support your team through the change.",
    capabilities: [
      {
        title: "Strategy and Requirements",
        description:
          "Technology roadmaps, AI opportunity assessments, and business process analysis.",
      },
      {
        title: "Data and Organizational Knowledge",
        description:
          "Planning for analytics, dashboards, documentation, knowledge bases, and information prepared for AI use.",
      },
      {
        title: "Digital Platforms and AI Assistants",
        description:
          "Requirements and delivery coordination for websites, digital platforms, AI assistants, and agents.",
      },
      {
        title: "Automation and Infrastructure",
        description:
          "Adoption planning for workflow automation, cloud modernization, and DevOps practices.",
      },
      {
        title: "Delivery Oversight and Adoption",
        description:
          "Specialist partner coordination, implementation governance, and change management.",
      },
    ],
    note: "Specialist implementation can be coordinated through trusted technology partners, including Motchi Solutions.",
  },
  {
    id: "construction-support",
    image: serviceImages.constructionSupport,
    title: "Construction Support",
    eyebrow: "Site Teams and Project Information",
    description:
      "Support the day-to-day coordination, documentation, and reporting needed across a construction project.",
    approach:
      "Kamanda works alongside owners, consultants, contractors, and suppliers to keep responsibilities clear and project information current. We help teams track progress and bring issues to the right decision-makers.",
    capabilities: [
      {
        title: "Team and Stakeholder Coordination",
        description:
          "Communication between owners, consultants, contractors, vendors, and other project stakeholders.",
      },
      {
        title: "Project Administration",
        description:
          "Documentation, reporting, and support for day-to-day project processes.",
      },
      {
        title: "Progress and Project Controls",
        description:
          "Schedule updates, milestone tracking, and progress monitoring.",
      },
      {
        title: "Risks and Issues",
        description:
          "Tracking delivery concerns, coordinating follow-up, and escalating decisions.",
      },
      {
        title: "Procurement Support",
        description:
          "Coordination of supplier requirements and procurement activities with the project team.",
      },
    ],
    note: "Support is defined around the project scope and the responsibilities of the existing delivery team.",
  },
  {
    id: "project-management",
    image: serviceImages.projectManagement,
    title: "Project Management",
    eyebrow: "Planning through Closeout",
    description:
      "Give your project a clear scope, an agreed plan, and a consistent way to manage delivery.",
    approach:
      "Kamanda coordinates teams, tracks commitments, and keeps stakeholders informed. We support decisions throughout the project by making progress, dependencies, risks, and changes clear.",
    capabilities: [
      {
        title: "Planning and Scope",
        description:
          "Project objectives, work plans, schedules, milestones, and dependencies.",
      },
      {
        title: "Governance and Responsibilities",
        description:
          "Decision-making processes, stakeholder coordination, and project management office support.",
      },
      {
        title: "Cost and Procurement Coordination",
        description:
          "Budget tracking, cost reporting, and coordination of procurement requirements.",
      },
      {
        title: "Delivery Oversight",
        description:
          "Progress reporting, risk and issue management, change control, and escalation.",
      },
      {
        title: "Handover and Closeout",
        description:
          "Completion tracking, handover coordination, and lessons learned.",
      },
    ],
    note: "Our approach draws on 30+ years of project management experience.",
  },
  {
    id: "business-solutions",
    image: serviceImages.businessSolutions,
    title: "Business Solutions",
    eyebrow: "Partner Sourcing and Introductions",
    description:
      "Find relevant specialist support, explore potential partnerships, and address practical business challenges.",
    approach:
      "Kamanda clarifies the requirement, identifies suitable providers, and facilitates business-to-business introductions. We coordinate discussions so your organization can assess options and decide how to proceed.",
    capabilities: [
      {
        title: "Business Needs Assessment",
        description:
          "Clarifying priorities, operational challenges, and the expertise required.",
      },
      {
        title: "Specialist and Partner Sourcing",
        description:
          "Identifying relevant vendors, service providers, and potential business partners.",
      },
      {
        title: "Business Introductions",
        description:
          "Facilitating B2B connections and coordinating initial discussions.",
      },
      {
        title: "Opportunity Coordination",
        description:
          "Supporting information exchange, follow-up, and collaboration between organizations.",
      },
      {
        title: "Operational Advisory",
        description:
          "Reviewing business processes and coordinating support for specific operational needs.",
      },
    ],
    note: "We help organizations evaluate opportunities and coordinate collaboration, while final business decisions remain with the parties involved.",
  },
];
