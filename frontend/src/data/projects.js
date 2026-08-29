export const projects = [
  {
    id: 'ecommerce-sales-analytics',
    title: 'E-Commerce Sales & Customer Analytics',
    subtitle: 'End-to-End Revenue Drivers, Customer Segmentation & Margin Optimization',
    category: 'Data Analytics & BI',
    year: '2025',
    status: 'Completed',
    featured: true,
    shortDescription:
      'Enterprise-level analytics analyzing 31,855+ transactions ($8.35M GMV) across 8,500 customers using Python, PostgreSQL, and Power BI; optimized promotional discounting and identified repeat buyer profit drivers.',
    overview:
      'Engineered a complete analytics pipeline to analyze an e-commerce enterprise\'s sales, customer lifetime value (LTV), product margins, payment methods, and fulfillment lead times across 31,855 transaction line items. The project connects raw data ingestion to PostgreSQL DDL schemas, 20+ analytical window queries, and a Power BI Star Schema data model with 25+ DAX measures.',
    problem:
      'The company faced margin erosion despite rapid top-line GMV expansion. Leadership needed visibility into whether promotional discounting was cannibalizing margins, which customer cohorts drove sustained profit, and where supply chain fulfillment delays caused return spikes.',
    features: [
      'Comprehensive Python ETL pipeline cleaning raw transaction records, handling outliers, and creating derived margin metrics',
      'Advanced PostgreSQL Relational Schema with primary/foreign keys, B-tree indexes, and 20+ production-grade business queries',
      'Complex SQL Window Functions: DENSE_RANK for category bestsellers, LAG/LEAD for MoM growth, and running cumulative totals',
      'Power BI Star Schema architecture separating FactSales/FactOrderItems from DimCustomers, DimProducts, and DimDate',
      '25+ Custom DAX measures covering Time Intelligence (YTD, MTD, MoM %), Repeat Customer %, and Customer Lifetime Value',
      'Discount Elasticity analysis proving that discounts >15% severely degrade gross margin without proportional volume gains',
      '8 Actionable Business Insights following the Observation -> Business Impact -> Recommendation framework',
      '15 Technical Interview Questions & Answers with 3 verifiable, ATS-friendly resume bullets'
    ],
    technologies: ['Python', 'Pandas', 'NumPy', 'PostgreSQL', 'SQL', 'Power BI', 'DAX', 'Matplotlib', 'Seaborn', 'Git'],
    role: 'Lead Data Analyst & Analytics Engineer',
    challenges:
      'Reconciling multi-item order line transactions with header-level shipping logs and isolating non-linear price elasticity across diverse product categories (Tech hardware vs Beauty/Fashion).',
    solution:
      'Designed a normalized relational model and built dual aggregation layers in SQL and DAX. Implemented discount tier binning to empirically prove margin degradation beyond 15% discount thresholds.',
    learnings:
      'Mastered advanced SQL window ranking, VertiPaq data modeling principles in Power BI, DAX filter context modifiers (CALCULATE, ALL, ALLEXCEPT), and commercial pricing strategy formulation.',
    githubUrl: 'https://github.com/GauravChauhan00/ecommerce-sales-analytics',
    liveUrl: '',
    screenshots: [
      '/images/projects/ecommerce/dashboard_overview.png',
      '/images/projects/ecommerce/product_analytics.png',
      '/images/projects/ecommerce/customer_segments.png'
    ],
    tags: ['Data Analytics', 'Power BI', 'PostgreSQL', 'Python', 'DAX', 'SQL', 'E-Commerce']
  },
  {
    id: 'manufacturing-quality-analytics',
    title: 'Manufacturing Quality & Operations Analytics',
    subtitle: 'OEE Optimization, Predictive Quality & Industrial IoT Telemetry Analytics',
    category: 'Industrial Analytics & BI',
    year: '2025',
    status: 'Completed',
    featured: true,
    shortDescription:
      'Analyzed 8,784 production shift records (3.29M units) across 8 machine lines using Python and PostgreSQL; identified spindle vibration anomalies to reduce downtime by 18.5% and save $145K in scrap loss.',
    overview:
      'Built an end-to-end industrial data analytics system evaluating factory production shifts, equipment downtime root causes, defect classifications, and IoT sensor telemetry (temperature, pressure, vibration). Designed to help plant operations managers optimize Overall Equipment Effectiveness (OEE) and shift yield.',
    problem:
      'Unplanned machine stoppages and scrap defect spikes were reducing plant profitability. Engineering teams lacked statistical telemetry correlation to determine whether thermal stress or mechanical vibration were the root causes of dimensional defects.',
    features: [
      'Industrial data cleaning pipeline distinguishing between sensor electrical glitches, human logging errors, and legitimate operational anomalies',
      'Statistical Correlation & Hypothesis testing proving strong association between vibration levels >3.0 mm/s and machining defect spikes (r = 0.58)',
      'PostgreSQL database with 20+ operational queries computing OEE, rolling 7-day yields, and pre/post-maintenance performance lifts',
      'Pareto Downtime Analysis isolating Tool Wear and Mechanical Jams as 65.8% of all stoppage hours',
      'Power BI Plant Operations Star Schema with DAX measures for Machine Utilization %, Target Achievement %, and Energy per Unit (kWh/unit)',
      'Shift-wise comparative analysis identifying night shift efficiency gaps and standardizing changeover procedures',
      '40 Comprehensive technical interview mastery questions covering data cleaning, SQL, Power BI, and engineering statistics',
      '3 ATS-optimized resume bullet points validated against actual executed calculations'
    ],
    technologies: ['Python', 'Pandas', 'NumPy', 'Scipy', 'PostgreSQL', 'SQL', 'Power BI', 'DAX', 'Seaborn', 'Industrial IoT'],
    role: 'Senior Manufacturing & Data Quality Analyst',
    challenges:
      'Differentiating sensor transmission glitches (instantaneous single-point spikes) from true mechanical degradation curves over time without skewing variance calculations.',
    solution:
      'Implemented machine-specific median imputation and rolling window moving-average filters in Pandas to isolate true continuous mechanical degradation trends.',
    learnings:
      'Gained deep domain expertise in Six Sigma process variation, OEE metrics, condition-based predictive maintenance triggers, and advanced multi-fact relational SQL modeling.',
    githubUrl: 'https://github.com/GauravChauhan00/manufacturing-quality-analytics',
    liveUrl: '',
    screenshots: [
      '/images/projects/manufacturing/plant_overview.png',
      '/images/projects/manufacturing/downtime_pareto.png',
      '/images/projects/manufacturing/sensor_correlation.png'
    ],
    tags: ['Manufacturing', 'OEE', 'Power BI', 'SQL', 'Python', 'Statistics', 'IoT']
  },
  {
    id: 'customer-churn-analytics',
    title: 'Customer Churn & Retention Analytics',
    subtitle: 'SaaS Subscriber Lifecycle, Cohort Heatmaps & Revenue-at-Risk Analytics',
    category: 'Subscription Analytics & ML',
    year: '2025',
    status: 'Completed',
    featured: true,
    shortDescription:
      'Analyzed 25,000 SaaS subscribers ($23.37M LTV) using Python, PostgreSQL, and Power BI; created dynamic Cohort Retention matrices and quantified $8.14M in Annualized Revenue at Risk (ARR).',
    overview:
      'Engineered an enterprise subscription analytics platform examining customer churn drivers, contract commitment effects, support ticket friction thresholds, and cohort retention decay over a 24-month horizon. Integrated with a baseline Scikit-Learn Logistic Regression churn scoring model.',
    problem:
      'A subscription software business suffered from a 32.35% annualized churn rate, threatening growth sustainability. Executive leadership needed to quantify revenue exposure and identify leading behavioral indicators of cancellation before subscribers left.',
    features: [
      'Customer lifecycle feature engineering: tenure grouping, usage frequency buckets, and support friction escalation indicators',
      'Monthly Cohort Retention Heatmap matrix tracking subscriber survival curves across 12+ months of customer tenure',
      'Statistical Chi-Square hypothesis testing demonstrating that Month-to-Month contracts carry a 42.1% churn rate vs 4.6% for 2-Year contracts (p < 0.001)',
      'Critical Friction Threshold Discovery: Subscribers filing >= 4 support tickets experience a dramatic 64.7% churn rate',
      '20+ Strategic PostgreSQL queries tracking MoM churn rates, identifying high-ARR accounts for rescue, and analyzing payment friction',
      'Power BI Retention Star Schema with DAX measures for Revenue at Risk, Active Subscriber ARR, and Month 1 Retention %',
      'Baseline Logistic Regression churn classification model achieving 0.84 ROC-AUC for early customer risk scoring',
      '15+ In-depth technical interview Q&As covering cohort interpretation, survival analysis, and customer success intervention strategies'
    ],
    technologies: ['Python', 'Pandas', 'NumPy', 'Scikit-Learn', 'PostgreSQL', 'SQL', 'Power BI', 'DAX', 'Seaborn', 'Statistics'],
    role: 'Lead Customer & Business Data Analyst',
    challenges:
      'Accurately modeling right-censored subscriber tenures and calculating annualized revenue run rate at risk across dynamic pricing tiers.',
    solution:
      'Created standardized tenure decay matrices and implemented subscription-weighted ARR risk formulas in SQL and DAX.',
    learnings:
      'Mastered cohort retention analytics, survival curves, customer lifetime value modeling, statistical hypothesis testing (Chi-Square/t-tests), and executive churn reporting.',
    githubUrl: 'https://github.com/GauravChauhan00/customer-churn-analytics',
    liveUrl: '',
    screenshots: [
      '/images/projects/churn/executive_retention.png',
      '/images/projects/churn/cohort_matrix.png',
      '/images/projects/churn/revenue_risk.png'
    ],
    tags: ['Customer Churn', 'Cohort Analysis', 'SaaS', 'Power BI', 'SQL', 'Python', 'Machine Learning']
  },
  {
    id: 'customer-support-analysis',
    title: 'Customer Support SLA Analysis',
    subtitle: 'End-to-End Support Performance & Resolution SLA Analytics',
    category: 'Data Analytics',
    year: '2025',
    status: 'Completed',
    featured: false,
    shortDescription:
      'A complete data analytics pipeline — from raw CSV cleaning to SLA metrics, KPI tracking, SQL analysis, and Power BI dashboards — built in Python and Jupyter Notebook.',
    overview:
      'Analyzed customer support ticket logs to measure resolution times, first-contact resolution rates (FCR), and agent SLA compliance.',
    problem:
      'Support teams lacked visibility into ticket backlog drivers and agent-level resolution bottlenecks.',
    features: [
      'Python data cleaning pipeline handling missing fields and timestamp conversions',
      'SLA breach rate tracking across ticket priority tiers',
      'Agent performance benchmarking and CSAT distribution analysis',
      'Power BI operational dashboards with dynamic filters'
    ],
    technologies: ['Python', 'Pandas', 'SQL', 'Power BI', 'Excel'],
    role: 'Data Analyst',
    challenges: 'Handling disparate timezone formats across global support queues.',
    solution: 'Standardized all ticket timestamps to UTC before computing resolution hours.',
    learnings: 'Customer support KPI benchmarking, SLA modeling, and operational BI reporting.',
    githubUrl: 'https://github.com/GauravChauhan00/Customer-Support-SLA-Analysis',
    liveUrl: '',
    screenshots: [],
    tags: ['Data Analytics', 'Support SLAs', 'Python', 'Power BI']
  }
];

export function getProjectById(id) {
  return projects.find((p) => p.id === id);
}
