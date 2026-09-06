export const projects = [
  {
    slug: 'constructai-os',
    name: 'ConstructAI OS',
    category: 'Enterprise Intelligence Platform',
    featured: true,
    liveUrl: 'https://constructai-os-wheat.vercel.app/',
    githubUrl: 'https://github.com/code-with-shahid/ConstructAI-OS',
    image: '/projects/constructai-os/workspace.png',
    gallery: [
      {
        src: '/projects/constructai-os/workspace.png',
        alt: 'ConstructAI OS project dashboard with health, risk and procurement metrics',
      },
      {
        src: '/projects/constructai-os/cover.png',
        alt: 'ConstructAI OS landing page introducing the enterprise project intelligence platform',
      },
      {
        src: '/projects/constructai-os/dashboard.png',
        alt: 'ConstructAI OS module previews for dashboard, documents, reports and specification comparison',
      },
    ],
    shortDescription:
      'An enterprise intelligence platform focused on extracting, organizing and working with information from business documents and data.',
    overview:
      'ConstructAI OS is a full-stack project intelligence platform built for document-heavy EPC delivery. It brings document analysis, specification comparison, procurement tracking, schedule awareness and an AI project assistant into one web application.',
    problem:
      'Data-centre and EPC projects generate a large volume of specifications, purchase orders, RFIs and meeting records. Teams often review those documents in isolation, which makes spec mismatches, delayed equipment and open issues harder to catch early.',
    solution:
      'The application ingests project documents and operational records, extracts structured information, compares specifications, and surfaces risks and schedule impact in a single dashboard. An AI project manager can answer questions using retrieved project context.',
    features: [
      'Executive dashboard with project health, risks, delayed deliveries and compliance',
      'Document intelligence for upload, extraction and categorized project files',
      'Specification comparison between client and vendor documents',
      'Procurement tracking for vendors, purchase orders and delay risk',
      'Schedule views with delay and cascade awareness',
      'AI project manager chat and executive report generation',
    ],
    technologies: [
      'React',
      'JavaScript',
      'Tailwind CSS',
      'Node.js',
      'Express.js',
      'REST APIs',
      'AI/LLM integration',
    ],
    highlights: [
      'Document extraction and intelligence are the core of the product: specs, RFIs, minutes and related files are organized so teams can search and compare them in one place.',
      'The frontend is a React application with Tailwind CSS; the API is Node.js and Express with MongoDB persistence.',
      'Google Gemini is used for AI answers and reports, with a structured live-data fallback when the model is unavailable.',
      'LangChain.js is used in the application architecture for retrieval-augmented prompting over document chunks — not as a hosted third-party service.',
    ],
  },
  {
    slug: 'interviewiq',
    name: 'InterviewIQ',
    category: 'Web Application',
    featured: true,
    liveUrl: 'https://interviewiq-ai-nu.vercel.app/',
    githubUrl: 'https://github.com/code-with-shahid/interviewiq-ai',
    image: '/projects/interviewiq/live.png',
    gallery: [
      {
        src: '/projects/interviewiq/live.png',
        alt: 'InterviewIQ live application homepage',
      },
    ],
    shortDescription:
      'An AI-powered mock interview platform with voice practice, company-specific prep, resume-based questions and performance analytics.',
    overview:
      'InterviewIQ is a full-stack interview preparation application. Candidates can run role-based mock interviews, upload a resume for project-specific questions, practice with voice, and review scores and PDF reports over time.',
    problem:
      'Interview preparation needs realistic practice, structured feedback and questions that match a role or company. The product is built around those workflows rather than generic quiz content.',
    solution:
      'Users start an interview session, receive adaptive AI-generated questions, speak or type answers, and get feedback on communication, confidence and technical depth. History and analytics keep previous sessions available for review.',
    features: [
      'Role-based AI mock interviews with follow-up questions',
      'Resume upload for project-specific interview questions',
      'Company-specific interview practice',
      'Voice interview simulation',
      'Performance analytics and interview history',
      'PDF session reports and credit-based usage',
    ],
    technologies: [
      'React',
      'JavaScript',
      'Tailwind CSS',
      'Node.js',
      'Express.js',
      'MongoDB',
      'Firebase',
      'Gemini API',
    ],
    highlights: [
      'React and Vite frontend deployed on Vercel, with an Express API on Render.',
      'Firebase handles authentication; MongoDB stores interview and user data.',
      'Gemini is used to generate questions and feedback.',
      'Razorpay is used for interview credits; session reports can be exported as PDFs.',
    ],
  },
  {
    slug: 'mindovio',
    name: 'Mindovio',
    category: 'Web Application',
    featured: true,
    liveUrl: 'https://authexamnotes-f0c26.web.app/',
    githubUrl: 'https://github.com/code-with-shahid/Mindovio',
    image: '/projects/mindovio/cover.png',
    gallery: [
      {
        src: '/projects/mindovio/cover.png',
        alt: 'Mindovio study assistant homepage with notes generation and feature cards',
      },
    ],
    shortDescription:
      'An AI study assistant that turns a topic into exam-focused notes, revision sheets, diagrams, charts and practice questions.',
    overview:
      'Mindovio is a full-stack study assistant. A student enters a topic, class level and exam type; the application generates structured notes, revision points, diagrams, charts and practice questions, then saves them to a dashboard for later review and PDF export.',
    problem:
      'Exam preparation often requires turning a syllabus topic into structured notes, diagrams and questions quickly. Doing that by hand is slow, and generic summaries are rarely formatted for revision.',
    solution:
      'Mindovio generates exam-focused study material from a topic using Gemini, stores each generation in the user’s history, and offers revision mode plus PDF download for offline study.',
    features: [
      'Exam-focused notes with structured, syllabus-oriented formatting',
      'Auto-generated diagrams and charts',
      'Revision mode for concise cheat-sheet output',
      'Practice questions generated with each note set',
      'PDF export for offline study',
      'Saved note history in the dashboard',
    ],
    technologies: [
      'React',
      'JavaScript',
      'Tailwind CSS',
      'Node.js',
      'Express.js',
      'MongoDB',
      'Firebase',
      'Gemini API',
    ],
    highlights: [
      'React frontend hosted on Firebase; Express and MongoDB power the API.',
      'Google Gemini generates notes, diagrams, revision points and questions.',
      'Notes can include Mermaid diagrams and chart output, then export to PDF.',
      'Stripe is used for credits; authentication is handled with JWT and Firebase-related client config.',
    ],
  },
]

export function getProjectBySlug(slug) {
  return projects.find((project) => project.slug === slug)
}

export function getFeaturedProjects() {
  return projects.filter((project) => project.featured)
}
