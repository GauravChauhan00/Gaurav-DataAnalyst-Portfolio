export const projects = [
  {
    id: 'grocery-management-store',
    title: 'Grocery Management Store',
    subtitle: 'Full-Stack Inventory & Sales Management System',
    category: 'Full Stack Web App',
    year: '2025',
    status: 'Completed',
    featured: true,
    shortDescription:
      'A full-stack grocery store management app with admin dashboard, product inventory, sales processing, automated stock updates, and CSV-exportable reports — built with React, FastAPI, and SQLite.',
    overview:
      'Built a complete admin system for a grocery store that handles everything from adding products to recording sales and generating reports. The idea was to replace the typical manual tracking (pen-paper or basic Excel) with a proper digital solution. Any store owner can plug in their own data and manage their inventory from a clean dashboard.',
    problem:
      'Small grocery stores often track inventory and sales manually, which leads to stock discrepancies, missed low-stock alerts, and no clear picture of what\'s selling. This project addresses those day-to-day operational problems with a structured, automated system.',
    features: [
      'Admin dashboard with KPI cards — total products, inventory value, low-stock alerts, sales summary',
      'Product and category management with search, filter by category, and stock status (In Stock / Low Stock / Out of Stock)',
      'Sales recording that auto-calculates total amount and deducts stock in the same transaction',
      'Overselling prevention — validation blocks quantity greater than available stock',
      'Daily, weekly, monthly sales reports with date range filter and CSV export',
      'Charts for recent sales trends and stock distribution',
      'Auto database setup on first run with sample data — beginner-friendly setup',
      'REST API-driven architecture — React frontend talks to FastAPI backend cleanly'
    ],
    technologies: ['React.js', 'Vite', 'JavaScript', 'Python', 'FastAPI', 'SQLite', 'REST API', 'CSS3'],
    role: 'Full-Stack Developer',
    challenges:
      'Making sure stock deduction and sale recording happen atomically — if one fails, the other should not go through. Also designing a clean UI that a non-technical store owner could actually use without training.',
    solution:
      'Used SQLite transactions to wrap sale insertion and stock deduction together, so data stays consistent. Kept the UI simple — card-based dashboard, clear status badges on products, and one-click report export without any complex steps.',
    learnings:
      'Got hands-on with FastAPI REST API design, SQLite transactions, React state management across multiple pages, and how to build a product that\'s actually usable by someone who\'s not a developer.',
    githubUrl: 'https://github.com/GauravChauhan00/Grainex-Grocery-Management-System',
    liveUrl: '',
    screenshots: [
      '/images/projects/grocery-management-store/1.png',
      '/images/projects/grocery-management-store/2.png',
      '/images/projects/grocery-management-store/3.png',
      '/images/projects/grocery-management-store/4.png',
      '/images/projects/grocery-management-store/5.png',
      '/images/projects/grocery-management-store/6.png',
      '/images/projects/grocery-management-store/7.png',
      '/images/projects/grocery-management-store/8.png',
      '/images/projects/grocery-management-store/9.png',
      '/images/projects/grocery-management-store/10.png'
    ],
    tags: ['Full Stack', 'Inventory', 'FastAPI', 'React', 'SQLite', 'Dashboard']
  },
  {
    id: 'customer-support-analysis',
    title: 'Customer Support SLA Analysis',
    subtitle: 'End-to-End Data Analytics & Business Intelligence Project',
    category: 'Data Analytics',
    year: '2025',
    status: 'Completed',
    featured: true,
    shortDescription:
      'A complete data analytics pipeline — from raw CSV cleaning to SLA metrics, KPI tracking, SQL analysis, and Power BI-ready outputs — built in Python and Jupyter Notebook.',
    overview:
      'This project takes a messy synthetic customer support dataset and turns it into actionable business insights. The entire workflow runs in Jupyter Notebook — data cleaning, SLA calculation, EDA, SQL queries, chart generation, and finally a set of dashboard-ready outputs for Power BI. The goal was to find which teams and issue categories breach SLA the most, where resolution is slowest, and what\'s impacting customer satisfaction.',
    problem:
      'Support teams generate massive amounts of ticket data, but raw CSVs with missing values, duplicates, and inconsistencies are practically useless for reporting. Without a proper pipeline, managers can\'t tell which teams are struggling, what\'s causing SLA misses, or where CSAT is dropping.',
    features: [
      'Data cleaning pipeline — handles missing values, invalid rows, duplicates, and data type issues using Pandas',
      'Rejected records saved separately with reasons — for data quality audit trail',
      'SLA compliance metrics — first response time, resolution time, SLA breach % per team and category',
      'Team-wise and issue-category-wise performance breakdown',
      'Weekly ticket volume trends and reopening rate analysis',
      'Average CSAT score analysis across priority levels and issue types',
      'SQL queries (SQLite) for aggregation, grouping, CASE-based logic — interview-ready demonstrations',
      'Auto-generated charts (matplotlib/seaborn) ready for Power BI or presentation use',
      'CSV export of cleaned dataset and Power BI connection guide included'
    ],
    technologies: ['Python', 'Pandas', 'SQL', 'SQLite', 'Jupyter Notebook', 'Power BI', 'Matplotlib', 'Seaborn', 'Excel'],
    role: 'Data Analyst',
    challenges:
      'Designing a cleaning pipeline that could handle different types of dirty data (nulls, wrong formats, out-of-range values) while keeping a clear record of what was dropped and why. Also making the outputs usable directly in Power BI without further manual prep.',
    solution:
      'Built a modular cleaning script with validation rules for each field, exported rejected rows with reason codes, and structured the final output in a format that Power BI can connect to directly. SQL queries were written to mirror what a real analyst would run in a business setting.',
    learnings:
      'Understood how real data pipelines work beyond just running a few Pandas commands — specifically around data quality, audit trails, business KPI logic, and making analysis actually consumable by non-technical stakeholders.',
    githubUrl: 'https://github.com/GauravChauhan00/Customer-Support-SLA-Analysis',
    liveUrl: '',
    screenshots: [
      '/images/projects/customer-support-analysis/sla_compliance_by_team.png',
      '/images/projects/customer-support-analysis/top_support_categories.png',
      '/images/projects/customer-support-analysis/weekly_ticket_volume.png',
      '/images/projects/customer-support-analysis/kpi_summary_table.png',
      '/images/projects/customer-support-analysis/team_performance_table.png'
    ],
    tags: ['Data Analytics', 'Python', 'SLA', 'Power BI', 'SQL', 'EDA', 'KPI']
  },
  {
    id: 'noctra-grid-relay',
    title: 'NoctraGrid Relay',
    subtitle: 'Spreadsheet Automation & Report Delivery Platform',
    category: 'Full Stack Web App',
    year: '2026',
    status: 'Completed',
    featured: true,
    shortDescription:
      'A full-stack automation platform where users upload Excel/CSV files, the system cleans the data, generates a professional PDF report, and emails it automatically — built with React, FastAPI, and Python.',
    overview:
      'NoctraGrid Relay is built around one core idea — upload a spreadsheet, get a clean PDF report in your inbox, no manual work needed. The platform handles the full pipeline: file upload, data cleaning with Pandas, PDF generation with ReportLab, and automated email delivery via SMTP. It also includes JWT-based authentication, a report history dashboard, and an analytics module to track system usage.',
    problem:
      'Teams that work with Excel and CSV data regularly spend hours cleaning files, building summary reports, and then manually emailing them to stakeholders. This is repetitive, error-prone, and scales poorly. NoctraGrid Relay eliminates that entire manual loop.',
    features: [
      'Excel and CSV file upload with server-side storage and processing',
      'Automated data cleaning — missing values, duplicates, formatting issues handled via Pandas + OpenPyXL',
      'Cleaned data exportable back to Excel or CSV for download',
      'Professional PDF report generation using ReportLab — cleaned data, summary stats, and analysis in one document',
      'Automatic email delivery — PDF report sent to registered email via SMTP right after generation',
      'JWT-based authentication — secure registration, login, and protected API endpoints',
      'Report history dashboard — all previously generated reports accessible and re-downloadable',
      'Analytics dashboard — tracks total uploads, reports generated, and user activity',
      'SQLAlchemy ORM for database management — users, files, reports, and activity logs all tracked'
    ],
    technologies: ['React.js', 'Vite', 'FastAPI', 'Python', 'SQLAlchemy', 'JWT', 'Pandas', 'OpenPyXL', 'ReportLab', 'SMTP', 'SQLite'],
    role: 'Full-Stack Developer',
    challenges:
      'Coordinating the multi-step backend pipeline — file upload → cleaning → PDF generation → email — so that each step handles failures gracefully without leaving the user stuck with an incomplete state. Also making JWT auth work cleanly across the React frontend and FastAPI backend.',
    solution:
      'Structured the backend as a proper pipeline with status tracking at each stage, so if email delivery fails, the report is still saved and accessible from history. Used FastAPI\'s dependency injection for auth middleware, keeping endpoint protection consistent throughout the app.',
    learnings:
      'Learned how to build end-to-end automation pipelines — async file handling, token-based auth flows, PDF generation from processed data, and SMTP integration. This project brought together frontend, backend, and data processing in a way that felt like building a real product.',
    githubUrl: 'https://github.com/GauravChauhan00/Noctra-Grid-Relay',
    liveUrl: '',
    screenshots: [
      '/images/projects/noctra-grid-relay/1.png',
      '/images/projects/noctra-grid-relay/2.png',
      '/images/projects/noctra-grid-relay/3.png',
      '/images/projects/noctra-grid-relay/4.png',
      '/images/projects/noctra-grid-relay/5.png',
      '/images/projects/noctra-grid-relay/6.png',
      '/images/projects/noctra-grid-relay/7.png',
      '/images/projects/noctra-grid-relay/8.png',
      '/images/projects/noctra-grid-relay/9.png',
      '/images/projects/noctra-grid-relay/10.png',
      '/images/projects/noctra-grid-relay/11.png'
    ],
    tags: ['Automation', 'FastAPI', 'React', 'PDF Generation', 'Email', 'Full Stack', 'Python']
  },
  {
    id: 'magic-proposal-website',
    title: 'Cinematic Interactive Proposal',
    subtitle: '3D WebGL Narrative & Motion Experience',
    category: 'Creative Web Experience',
    year: '2026',
    status: 'Ongoing',
    featured: true,
    shortDescription:
      'A premium, highly interactive full-stack web application designed to demonstrate advanced frontend engineering, WebGL 3D graphics, and complex motion design—built with Next.js, React Three Fiber, GSAP, and Tailwind CSS.',
    overview:
      'This project integrates dynamic 3D elements, smooth momentum scrolling, serverless APIs, and vector animations into a seamless, high-performance narrative. It serves as a technical showcase for modern creative development, showing how custom animation libraries and WebGL canvases can be integrated into Next.js Server-Side Rendered (SSR) architectures while maintaining a consistent 60 FPS.',
    problem:
      'Animation-heavy websites often suffer from performance bottlenecks, high interaction latency, and layout shifts. This project solves these performance challenges through dynamic lazy loading, scroll normalization, and state synchronization.',
    features: [
      'Interactive 3D crystals and particles rendered in real-time using React Three Fiber and Three.js',
      'Normalized smooth scrolling across touchpads, mice, and mobile screens via Lenis Scroll integration',
      'Dynamic travel route path animations built with SVG Bezier curves synchronized with Framer Motion scroll hooks',
      'Next.js Serverless Route Handlers to securely log user responses and persist client state',
      'SSR-compatible date calculations and timelines configured to prevent React hydration mismatch errors'
    ],
    technologies: ['Next.js', 'React.js', 'TypeScript', 'Three.js', 'React Three Fiber', 'GSAP', 'Framer Motion', 'Lenis Scroll', 'Tailwind CSS'],
    role: 'Creative Web Engineer',
    challenges:
      'Ensuring heavy 3D canvases and complex scroll-triggered vector paths render at a stable 60 FPS across standard mobile devices, alongside handling Next.js server-side hydration mismatches.',
    solution:
      'Lazy-loaded the canvas components, throttled frame-loop listeners, and implemented clean mounting hooks to defer dynamic calculations until client-side hydration completed.',
    learnings:
      'Gained deep experience in 3D graphic rendering loops, motion path math, serverless route handling, scroll normalization, and optimizing resource-intensive websites for production.',
    githubUrl: '',
    liveUrl: '',
    screenshots: [
      '/images/projects/magic-proposal-website/cover.jpg',
      '/images/projects/magic-proposal-website/screenshot-1.jpg',
      '/images/projects/magic-proposal-website/screenshot-2.jpg',
      '/images/projects/magic-proposal-website/screenshot-3.jpg',
      '/images/projects/magic-proposal-website/screenshot-4.jpg',
      '/images/projects/magic-proposal-website/screenshot-5.jpg'
    ],
    tags: ['WebGL', 'Next.js', 'Three.js', 'GSAP', 'Framer Motion', 'Tailwind CSS', 'TypeScript']
  }
];

export const getProjectById = (id) => projects.find((project) => project.id === id);
