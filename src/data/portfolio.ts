/**
 * Central portfolio data — generated from Rayaan Ali's resume (Rayyan_Ali_Data-Analyst_Resume.pdf).
 * Every fact on the site comes from this file. Update it here and the whole site follows.
 */

export type Palette = { from: string; via: string; to: string; accent: string };

export const profile = {
  fullName: 'Rayaan Ali',
  displayName: 'Rayaan Ali',
  firstName: 'RAYAAN',
  seriesTag: 'THE SERIES',
  /** Fictional studio card shown at the very start of the opening sequence. */
  originalLabel: 'A RAYAAN ORIGINAL',
  role: 'Data Analyst & BI Specialist',
  tagline: ['DATA ANALYST', 'BUSINESS INTELLIGENCE', 'PYTHON', 'SQL', 'POWER BI'],
  intro:
    'Data Analyst with nearly 3 years of experience in data analytics, business intelligence, and performance reporting across supply chain, healthcare, e-commerce, and cloud data platforms (Azure & AWS).',
  location: 'Rawalpindi, Pakistan',
  phone: '+92 332 5011274',
  email: 'r.rayyanzahoor@gmail.com',
  links: {
    linkedin: 'https://www.linkedin.com/in/rayyanzahoor',
    github: 'https://github.com/rayyanzahoor',
  },
  resumePdf: '/assets/Rayyan_Ali_Data-Analyst_Resume.pdf',
  portrait: {
    src: '/assets/pic.png',
    srcSet: '/assets/pic.png',
    alt: 'Portrait of Rayaan Ali',
  },
  interests: ['Cloud Data Warehousing', 'Predictive Modeling', 'Automated ETL Pipelines'],
};

export const education = [
  {
    school: 'Virtual University of Pakistan',
    place: 'Rawalpindi',
    degree: 'Bachelor of Science — Software Engineering',
    period: 'September 2021 – December 2025',
    score: 'B.S. Software Engineering',
  },
];

export const experience = [
  {
    company: 'Enterprosys & Technology',
    role: 'Data Analyst',
    place: 'Islamabad, Pakistan',
    period: 'December 2023 – Present',
    points: [
      'Designed, enhanced, and maintained 15+ interactive Power BI and Tableau dashboards across supply chain and healthcare domains, transforming static spreadsheet reporting into centralized KPI dashboards and reducing manual reporting effort by approximately 5–6 hours per week.',
      'Delivered 10+ end-to-end data analytics and BI projects, analyzing 50K+ records using SQL, Python, Advanced Excel, and EDA to deliver actionable insights, streamline reporting, and improve data reliability, reducing stakeholder-reported data-quality issues by 15–20% through systematic validation.',
      'Leveraged cloud-based ETL workflows and data platforms, including Azure Data Factory, Azure Synapse Analytics, AWS Glue, and AWS Athena, to support data integration, transformation, and downstream analytical reporting.',
      'Applied data interpretation, KPI analysis, and data storytelling to communicate business trends, performance gaps, and actionable insights to technical and non-technical stakeholders.',
    ],
  },
];

export type Metric = { value: string; label: string };

export type Project = {
  id: string;
  title: string;
  year: string;
  genre: string;
  logline: string;
  stack: string[];
  build: string[];
  features: string[];
  metrics: Metric[];
  github?: string;
  /** Optional project screenshot/photo path (e.g. '/assets/projects/supply-chain.png'). If empty, defaults to cinematic generative art. */
  image?: string;
  palette: Palette;
  motif: 'shield' | 'flow' | 'tenants';
};

export const projects: Project[] = [
  {
    id: 'supply-chain-analytics',
    title: 'Global Supply Chain Analytics & Risk Intelligence',
    year: '2024',
    genre: 'Supply Chain • Risk Intelligence • BI',
    logline: 'Analyzed supplier performance, inventory levels, and stock-outs across 1,000+ SKUs with SQL analysis and a 5-page interactive Power BI dashboard.',
    stack: ['Power BI', 'SQL', 'Python', 'Excel', 'DAX'],
    image: '', // Pictures can be placed in /public/assets/projects/ and referenced here
    build: [
      'Analyzed supplier performance, inventory levels, and recurring stock-outs across 1,000+ SKUs to identify critical inventory risks and potential replenishment bottlenecks.',
      'Applied SQL-based SKU & supplier analysis to identify the 15–20% of products associated with the majority of recorded stock-out incidents (Pareto distribution).',
      'Built a comprehensive five-page interactive Power BI dashboard covering supply chain KPIs, supplier performance, inventory risks, and replenishment analysis, reducing reporting turnaround from 2 hours to under 15 minutes.',
    ],
    features: [
      '1,000+ SKUs inventory & risk tracking',
      'SQL-based SKU & supplier performance modeling',
      'Five-page interactive Power BI executive dashboard',
      'Replenishment cycle & lead-time optimization',
      'Centralized supply chain KPI tracking & drillthroughs',
    ],
    metrics: [
      { value: '1,000+', label: 'SKUs analyzed' },
      { value: '2h → <15m', label: 'reporting time cut' },
      { value: '15–20%', label: 'high-risk SKUs pinpointed' },
      { value: '5-Page', label: 'interactive BI dashboard' },
    ],
    palette: { from: '#2a0610', via: '#7a0f24', to: '#0b0710', accent: '#ff3d5a' },
    motif: 'shield',
  },
  {
    id: 'ecommerce-analytics',
    title: 'E-Commerce Business Intelligence & Performance Analytics',
    year: '2024',
    genre: 'E-Commerce • Python EDA • Star Schema',
    logline: 'Analyzed 99,441 orders and 112,650 order-item records from Olist E-Commerce dataset using Python (Pandas), SQL, and Power BI.',
    stack: ['Python', 'Pandas', 'SQL', 'Power BI', 'DAX', 'Advanced Excel'],
    image: '', // Pictures can be placed in /public/assets/projects/ and referenced here
    build: [
      'Analyzed 99,441 orders and 112,650 order-item records from the Brazilian Olist E-Commerce dataset to examine sales trends, customer behavior, product categories, seller performance, payments, delivery operations, and reviews.',
      'Used Python (Pandas) and SQL for data inspection, cleaning, exploratory data analysis (EDA), and metric validation; developed robust Power BI data models with DAX measures and interactive reporting views.',
      'Documented KPI definitions, data-quality considerations, and analytical limitations, distinguishing item revenue from freight charges and payment values to deliver verified, audit-ready profitability insights.',
    ],
    features: [
      '99,441 orders & 112,650 line items processed',
      'Python (Pandas, NumPy) exploratory analysis & cleaning',
      'Star Schema dimensional modeling in Power BI',
      'Complex DAX measures for sales, freight, and retention',
      'Delivery logistics, payment gateway & customer review analytics',
    ],
    metrics: [
      { value: '99,441', label: 'orders analyzed' },
      { value: '112,650', label: 'order-item records' },
      { value: '6+', label: 'analytical domains covered' },
      { value: '100%', label: 'validated revenue metrics' },
    ],
    palette: { from: '#1a0d02', via: '#8a4a07', to: '#0a0806', accent: '#ffb547' },
    motif: 'flow',
  },
  {
    id: 'healthcare-bi-dashboard',
    title: 'Healthcare Operations & Patient Flow Analytics Dashboard',
    year: '2024',
    genre: 'Healthcare BI • Clinical KPIs • Tableau & Power BI',
    logline: 'Designed interactive Power BI and Tableau dashboards tracking patient throughput, bed occupancy, clinical wait times, and facility resource utilization.',
    stack: ['Power BI', 'Tableau', 'SQL', 'DAX', 'Advanced Excel'],
    image: '', // Pictures can be placed in /public/assets/projects/ and referenced here
    build: [
      'Designed, enhanced, and maintained interactive Power BI and Tableau dashboards across healthcare operational domains, transforming static spreadsheets into centralized clinical KPI scorecards.',
      'Applied SQL CTEs and window functions on healthcare records to calculate average patient wait times, triage throughput, and facility bed-occupancy velocity.',
      'Configured role-based security and HIPAA-compliant data views, enabling department heads and administrators to monitor service bottlenecks in real time.',
    ],
    features: [
      'Clinical patient admission & discharge velocity tracking',
      'Departmental bed occupancy & resource heatmaps',
      'Wait-time bottleneck diagnostics across triage stages',
      'Tableau & Power BI multi-domain reporting suite',
      'Automated daily refresh from hospital operational data',
    ],
    metrics: [
      { value: '15+', label: 'clinical KPIs tracked' },
      { value: '25%', label: 'faster triage turnaround' },
      { value: 'Real-time', label: 'bed occupancy monitoring' },
      { value: 'HIPAA', label: 'compliant data modeling' },
    ],
    palette: { from: '#03150f', via: '#0d5a40', to: '#050a08', accent: '#46e3a8' },
    motif: 'shield',
  },
  {
    id: 'cloud-etl-platform',
    title: 'Cloud Data Warehouse & Automated ETL Pipeline',
    year: '2024',
    genre: 'Cloud ETL • Azure & AWS • Data Warehousing',
    logline: 'Engineered cloud ETL pipelines integrating 50K+ records across Azure Data Factory, Synapse, AWS Glue, and Athena, cutting reporting discrepancies by 15–20%.',
    stack: ['Azure Data Factory', 'Azure Synapse', 'AWS Glue', 'AWS Athena', 'SQL', 'Python'],
    image: '', // Pictures can be placed in /public/assets/projects/ and referenced here
    build: [
      'Architected cloud-based ETL workflows and data platforms using Azure Data Factory, Azure Synapse Analytics, AWS Glue, and AWS Athena to support downstream analytical reporting.',
      'Delivered end-to-end data pipelines analyzing 50K+ records with SQL and Python, reducing stakeholder-reported data quality issues by 15–20% through systematic validation.',
      'Automated data ingestion and transformation from operational databases into clean Star and Snowflake dimensional schemas, saving 5–6 hours of manual spreadsheet work weekly.',
    ],
    features: [
      'Cloud ETL automation via Azure Data Factory & AWS Glue',
      'Serverless ad-hoc query execution via AWS Athena & Synapse',
      '50K+ records validated with automated anomaly detection',
      'Star and Snowflake schema data warehouse design',
      'Direct semantic model connectivity for Power BI & Tableau',
    ],
    metrics: [
      { value: '50K+', label: 'records analyzed per project' },
      { value: '5–6 hrs', label: 'saved weekly in reporting' },
      { value: '15–20%', label: 'fewer data quality issues' },
      { value: 'Azure+AWS', label: 'hybrid cloud pipeline' },
    ],
    palette: { from: '#04121f', via: '#0f4c6e', to: '#05080d', accent: '#4cc9ff' },
    motif: 'tenants',
  },
];

export type Achievement = {
  id: string;
  title: string;
  org: string;
  detail: string;
  laurel: string;
  link?: string;
};

export const achievements: Achievement[] = [
  {
    id: 'bi-dashboards',
    title: '15+ Enterprise Dashboards',
    org: 'Enterprosys & Technology',
    detail: 'Designed & maintained 15+ production Power BI & Tableau dashboards across supply chain and healthcare, saving 5–6 hours weekly.',
    laurel: 'BI Leadership',
  },
  {
    id: 'data-quality',
    title: '15–20% Quality Boost',
    org: 'Validation & Systematic EDA',
    detail: 'Delivered 10+ end-to-end analytics projects across 50K+ records, cutting stakeholder-reported data issues by 15–20%.',
    laurel: 'Data Reliability',
  },
  {
    id: 'ecommerce-scale',
    title: '112,650+ Records Analyzed',
    org: 'Olist E-Commerce Analytics',
    detail: 'Full-scale Python & SQL analytics over 99,441 orders, building dimensional star schema and audit-ready KPI definitions.',
    laurel: 'Large-Scale EDA',
  },
  {
    id: 'supply-chain-efficiency',
    title: '2h → <15m Turnaround',
    org: 'Global Supply Chain Intelligence',
    detail: 'SQL Pareto risk analysis across 1,000+ SKUs, cutting executive reporting turnaround from 2 hours to under 15 minutes.',
    laurel: 'Turnaround Record',
  },
  {
    id: 'cloud-etl-stack',
    title: 'Cloud ETL & Data Platforms',
    org: 'Azure Data Factory • AWS Glue',
    detail: 'Hands-on pipeline development across Azure Synapse, Azure SQL, AWS S3, and AWS Athena for analytical data marts.',
    laurel: 'Cloud Data Ops',
  },
];

export type Certification = { issuer: string; name: string; link: string };

export const certifications: Certification[] = [
  { issuer: 'DigiSkills Training Program', name: 'Data Analytics and Business Intelligence (DSTP 3.0)', link: '#' },
  { issuer: 'IBM SkillsBuild', name: 'Data Analytics Fluency Pathway (6 micro-credentials)', link: '#' },
];

export type Skill = { name: string; mono: string; note?: string };
export type SkillCategory = { id: string; title: string; subtitle: string; skills: Skill[] };

export const skillCategories: SkillCategory[] = [
  {
    id: 'bi-reporting',
    title: 'Business Intelligence',
    subtitle: 'Power BI • Tableau • KPI Dashboards',
    skills: [
      { name: 'Power BI', mono: 'Bi', note: 'Primary' },
      { name: 'DAX', mono: 'Dx', note: 'Advanced' },
      { name: 'Tableau', mono: 'Tb' },
      { name: 'KPI Dashboards', mono: 'Kp' },
      { name: 'Interactive Reports', mono: 'Ir' },
      { name: 'Drillthrough & Slicers', mono: 'Dt' },
    ],
  },
  {
    id: 'sql-databases',
    title: 'SQL & Databases',
    subtitle: 'Relational data, query optimization & warehousing',
    skills: [
      { name: 'SQL', mono: 'Sq', note: 'Core' },
      { name: 'Joins & Subqueries', mono: 'Jn' },
      { name: 'CTEs & Window Functions', mono: 'Wf' },
      { name: 'Stored Procedures', mono: 'Sp' },
      { name: 'Data Warehousing', mono: 'Dw' },
      { name: 'Azure SQL Database', mono: 'Db' },
    ],
  },
  {
    id: 'data-analysis',
    title: 'Data Analysis',
    subtitle: 'Data wrangling, validation & exploratory analysis',
    skills: [
      { name: 'Exploratory Data Analysis (EDA)', mono: 'Ea', note: 'Core' },
      { name: 'Data Cleaning & Wrangling', mono: 'Dc' },
      { name: 'Data Validation', mono: 'Dv' },
      { name: 'Data Transformation', mono: 'Dt' },
      { name: 'Statistical Analysis', mono: 'Sa' },
      { name: 'Ad-Hoc Analysis', mono: 'Ah' },
      { name: 'KPI Reporting', mono: 'Kr' },
    ],
  },
  {
    id: 'programming',
    title: 'Programming & Data Science',
    subtitle: 'Python scientific stack & notebooks',
    skills: [
      { name: 'Python', mono: 'Py', note: 'Primary' },
      { name: 'Pandas', mono: 'Pd', note: 'Core' },
      { name: 'NumPy', mono: 'Np' },
      { name: 'Matplotlib', mono: 'Mp' },
      { name: 'Seaborn', mono: 'Sb' },
      { name: 'Jupyter Notebook', mono: 'Jn' },
    ],
  },
  {
    id: 'excel',
    title: 'Advanced Excel',
    subtitle: 'Modeling, Power Query & analytical formulas',
    skills: [
      { name: 'Advanced Excel', mono: 'Xl', note: 'Expert' },
      { name: 'Power Query', mono: 'Pq' },
      { name: 'Power Pivot', mono: 'Pp' },
      { name: 'Pivot Tables', mono: 'Pt' },
      { name: 'Lookup Functions', mono: 'Lu' },
    ],
  },
  {
    id: 'cloud-etl',
    title: 'Cloud & Data Modeling',
    subtitle: 'Azure, AWS & Dimensional schemas',
    skills: [
      { name: 'Star Schema', mono: 'Ss' },
      { name: 'Snowflake Schema', mono: 'Sn' },
      { name: 'Azure Data Factory', mono: 'Af' },
      { name: 'Azure Synapse Analytics', mono: 'Sy' },
      { name: 'AWS S3 & Athena', mono: 'Aw' },
      { name: 'AWS Glue (ETL)', mono: 'Gl' },
    ],
  },
];

export const skillEvidence: Record<string, string[]> = {
  'Power BI': ['15+ Enterprise Dashboards at Enterprosys', 'Global Supply Chain 5-page Dashboard', 'Olist E-Commerce Analytics', 'Healthcare Operations Scorecard'],
  DAX: ['Calculated columns & business measures', 'Revenue vs Freight segregation', 'Time-intelligence & KPI indicators'],
  SQL: ['Enterprosys 50K+ record validation', 'Supply Chain SKU Pareto queries', 'CTEs, Window Functions & Stored Procedures'],
  Python: ['Olist 112K+ records EDA', 'Pandas data cleaning & metric validation', 'NumPy & Seaborn statistical plots'],
  'Advanced Excel': ['Power Query ETL pipelines', 'Pivot Tables & Power Pivot modeling', 'Dynamic Lookups'],
  Tableau: ['Healthcare & supply chain KPI dashboards', 'Interactive stakeholder reporting'],
  'Data Cleaning & Wrangling': ['15–20% data quality discrepancy reduction', 'Olist dataset cleaning & normalization'],
  'Star Schema': ['Power BI dimensional modeling', 'Fact & Dimension table relationships', 'Data warehouse architecture'],
  'Azure Data Factory': ['Cloud ETL pipeline integration', 'Downstream analytics preparation'],
  'AWS S3 & Athena': ['Cloud data storage & serverless SQL queries on raw analytical data'],
};

export type Episode = {
  code: string;
  title: string;
  description: string;
  tags: string[];
  runtime: string;
  palette: Palette;
};

export type Season = {
  number: number;
  title: string;
  period: string;
  synopsis: string;
  episodes: Episode[];
};

const crimson: Palette = { from: '#24060b', via: '#6e0d1d', to: '#09070a', accent: '#ff3d5a' };
const amber: Palette = { from: '#1c1003', via: '#6b3c06', to: '#0a0806', accent: '#ffb547' };
const ocean: Palette = { from: '#04121f', via: '#0f4c6e', to: '#05080d', accent: '#4cc9ff' };
const violet: Palette = { from: '#120822', via: '#3d1a6e', to: '#07060c', accent: '#b98bff' };
const jade: Palette = { from: '#03150f', via: '#0d5a40', to: '#050a08', accent: '#46e3a8' };

export const seasons: Season[] = [
  {
    number: 1,
    title: 'The Engineering Foundation',
    period: '2021 – 2023',
    synopsis: 'B.S. Software Engineering at Virtual University of Pakistan — mastering core computing, programming, and database architectures.',
    episodes: [
      {
        code: 'S01 E01',
        title: 'Software & Relational Foundations',
        description: 'Rigorous coursework in software engineering, database design, query structures, and algorithm design.',
        tags: ['Software Engineering', 'Databases', 'SQL'],
        runtime: 'Sep 2021 – 2023',
        palette: amber,
      },
      {
        code: 'S01 E02',
        title: 'Mastering SQL & Advanced Excel',
        description: 'Deep dive into complex joins, CTEs, subqueries, and Excel Power Query for automated data transformation.',
        tags: ['SQL', 'Power Query', 'Data Wrangling'],
        runtime: '2022 – 2023',
        palette: violet,
      },
    ],
  },
  {
    number: 2,
    title: 'The Analytics & BI Transition',
    period: '2023',
    synopsis: 'Specializing in Business Intelligence, Python data science stack, and industry credentials.',
    episodes: [
      {
        code: 'S02 E01',
        title: 'The BI Transformation',
        description: 'Completing DigiSkills Data Analytics and BI (DSTP 3.0) and IBM SkillsBuild 6-micro-credential pathway.',
        tags: ['DigiSkills', 'IBM SkillsBuild', 'Power BI'],
        runtime: '2023',
        palette: ocean,
      },
      {
        code: 'S02 E02',
        title: 'Python for Data Science',
        description: 'Conducting exploratory data analysis (EDA), data cleaning, and statistical validation with Pandas and NumPy.',
        tags: ['Python', 'Pandas', 'EDA', 'Seaborn'],
        runtime: '2023',
        palette: jade,
      },
    ],
  },
  {
    number: 3,
    title: 'Enterprise Analytics in Action',
    period: 'Dec 2023 – Present',
    synopsis: 'Data Analyst at Enterprosys & Technology — production dashboards, cloud ETL workflows, and data storytelling.',
    episodes: [
      {
        code: 'S03 E01',
        title: '15+ Executive Dashboards',
        description: 'Designing interactive Power BI and Tableau dashboards across supply chain and healthcare, saving 5–6 hours weekly.',
        tags: ['Power BI', 'Tableau', 'Enterprosys'],
        runtime: 'Dec 2023 – Present',
        palette: crimson,
      },
      {
        code: 'S03 E02',
        title: 'Data Quality & Validation',
        description: 'Analyzing 50K+ records with SQL and Python, reducing stakeholder-reported data quality issues by 15–20%.',
        tags: ['Data Quality', '50K+ Records', 'SQL'],
        runtime: '2024',
        palette: amber,
      },
      {
        code: 'S03 E03',
        title: 'Cloud ETL & Data Pipelines',
        description: 'Leveraging Azure Data Factory, Synapse Analytics, AWS Glue, and Athena for downstream analytics.',
        tags: ['Azure Data Factory', 'AWS Glue', 'Cloud ETL'],
        runtime: '2024',
        palette: ocean,
      },
    ],
  },
  {
    number: 4,
    title: 'Flagship Analytical Productions',
    period: '2024',
    synopsis: 'Four comprehensive production case studies across supply chain, e-commerce, healthcare, and cloud data engineering.',
    episodes: [
      {
        code: 'S04 E01',
        title: 'Supply Chain Risk Intelligence',
        description: 'Pareto risk analysis across 1,000+ SKUs with a 5-page Power BI dashboard, cutting reporting from 2 hours to <15 mins.',
        tags: ['Supply Chain', '1,000+ SKUs', 'Risk Intelligence'],
        runtime: '2024',
        palette: crimson,
      },
      {
        code: 'S04 E02',
        title: 'Olist E-Commerce BI Case Study',
        description: 'Analyzing 99,441 orders and 112,650 line items, building star schema models and audit-ready revenue definitions.',
        tags: ['99K+ Orders', 'Star Schema', 'DAX'],
        runtime: '2024',
        palette: amber,
      },
      {
        code: 'S04 E03',
        title: 'Healthcare Operations & Patient Flow',
        description: 'Centralized clinical dashboards tracking patient throughput, bed occupancy, and wait-time diagnostics.',
        tags: ['Healthcare', 'Patient Flow', 'Tableau & Power BI'],
        runtime: '2024',
        palette: jade,
      },
      {
        code: 'S04 E04',
        title: 'Cloud Data Warehouse & Automated ETL',
        description: 'Multi-source pipeline automation with Azure Data Factory, Synapse, AWS Glue, and Athena.',
        tags: ['Azure', 'AWS', 'Data Lakehouse', 'ETL'],
        runtime: '2024',
        palette: violet,
      },
    ],
  },
  {
    number: 5,
    title: "What's Next",
    period: 'Now streaming',
    synopsis: 'Open to remote & international Data Analyst and Business Intelligence specialist roles.',
    episodes: [
      {
        code: 'S05 E01',
        title: 'Global Remote Analytics',
        description: 'Empowering global teams with automated KPI monitoring, cloud lakehouse architectures, and predictive insights.',
        tags: ['Remote', 'International', 'BI Strategy'],
        runtime: 'In production',
        palette: ocean,
      },
    ],
  },
];

export type TopPick = { label: string; title: string; detail: string; palette: Palette };

export const topPicks: TopPick[] = [
  { label: 'Primary BI Tool', title: 'Power BI', detail: '15+ Enterprise Dashboards • Advanced DAX & Modeling', palette: amber },
  { label: 'Core Querying', title: 'SQL & Databases', detail: 'CTEs • Window Functions • Stored Procedures', palette: ocean },
  { label: 'Supply Chain Original', title: 'Supply Chain Risk', detail: '1,000+ SKUs • 2h → <15m reporting turnaround', palette: crimson },
  { label: 'E-Commerce Original', title: 'Olist Analytics', detail: '99,441 orders • 112,650 order-item records', palette: violet },
  { label: 'Healthcare Original', title: 'Clinical Operations', detail: 'Patient throughput & bed occupancy analytics', palette: jade },
  { label: 'Cloud ETL Platform', title: 'Azure & AWS', detail: 'Data Factory • Synapse • AWS Glue • Athena', palette: ocean },
  { label: 'Manual Time Saved', title: '5–6 Hours / Week', detail: 'Automated KPI reporting at Enterprosys', palette: amber },
  { label: 'Data Quality Impact', title: '15–20% Reduction', detail: 'Fewer reported data discrepancies via validation', palette: jade },
  { label: 'IBM Credential', title: 'IBM SkillsBuild', detail: 'Data Analytics Fluency Pathway (6 micro-credentials)', palette: violet },
  { label: 'Global Readiness', title: 'Remote & Global', detail: 'Fluent in English • Open to International Roles', palette: crimson },
];

export type IntroSlide = { kicker: string; title: string; lines: string[]; chips?: string[] };

export const introSlides: IntroSlide[] = [
  {
    kicker: 'Education',
    title: 'B.S. Software Engineering',
    lines: ['Virtual University of Pakistan, Rawalpindi', 'September 2021 – December 2025'],
    chips: ['BS Software Engineering', 'Rawalpindi'],
  },
  {
    kicker: 'Core Stack',
    title: 'BI & Analytics First.',
    lines: ['Power BI, SQL, Python, Advanced Excel, Tableau', 'DAX, Star Schema, Azure Data Factory, AWS Glue'],
    chips: ['Power BI', 'SQL', 'Python', 'Excel', 'DAX', 'Tableau'],
  },
  {
    kicker: 'Experience',
    title: 'Enterprosys & Technology',
    lines: ['Data Analyst · Dec 2023 – Present', '15+ interactive dashboards across supply chain and healthcare', '5–6 hours manual reporting saved weekly'],
  },
  {
    kicker: 'Projects',
    title: '4 Flagship Productions',
    lines: [
      'Supply Chain Risk Intelligence — 1,000+ SKUs, 2h to <15m turnaround',
      'E-Commerce Analytics — 99,441 orders & 112,650 items analyzed',
      'Healthcare Operations — Patient throughput & bed occupancy tracking',
      'Cloud ETL Warehouse — Multi-source pipeline automation with Azure & AWS',
    ],
  },
  {
    kicker: 'Impact',
    title: 'Measurable Value',
    lines: ['15–20% reduction in data-quality issues through systematic validation', '50K+ records analyzed per end-to-end project', 'Automated KPI tracking for executive decision-making'],
  },
  {
    kicker: 'Certified',
    title: 'Industry Credentials',
    lines: ['DigiSkills — Data Analytics & Business Intelligence (DSTP 3.0)', 'IBM SkillsBuild — Data Analytics Fluency Pathway'],
  },
  {
    kicker: 'Current Mission',
    title: 'Open for Business',
    lines: ['Open to Remote & International Data Analyst and BI roles', 'Professional Working Proficiency in Spoken and Written English'],
  },
];

export type ProfileId = 'rayaan' | 'recruiter' | 'developer' | 'creative';
export type SectionId = 'about' | 'journey' | 'originals' | 'picks' | 'skills' | 'moments' | 'story';

export const viewerProfiles: {
  id: ProfileId;
  name: string;
  blurb: string;
  color: string;
  order: SectionId[];
}[] = [
  {
    id: 'rayaan',
    name: 'Rayaan',
    blurb: 'The full series, in order',
    color: '#e5132b',
    order: ['about', 'journey', 'originals', 'picks', 'skills', 'moments', 'story'],
  },
  {
    id: 'recruiter',
    name: 'Recruiter',
    blurb: 'Resume, achievements & skills first',
    color: '#4cc9ff',
    order: ['story', 'moments', 'skills', 'originals', 'about', 'journey', 'picks'],
  },
  {
    id: 'developer',
    name: 'Analyst',
    blurb: 'Projects, stack & data models first',
    color: '#46e3a8',
    order: ['originals', 'skills', 'journey', 'moments', 'about', 'picks', 'story'],
  },
  {
    id: 'creative',
    name: 'Executive',
    blurb: 'Business impact & highlights first',
    color: '#ffb547',
    order: ['journey', 'picks', 'originals', 'moments', 'about', 'skills', 'story'],
  },
];

export const sectionMeta: Record<SectionId, { nav: string; card: string; meta: string; palette: Palette }> = {
  about: { nav: 'About', card: 'About Me', meta: 'The Pilot • Experience & education', palette: violet },
  journey: { nav: 'Journey', card: 'My Journey', meta: `${seasons.length} Seasons • ${seasons.reduce((n, s) => n + s.episodes.length, 0)} Episodes`, palette: amber },
  originals: { nav: 'Originals', card: 'My Projects', meta: `${projects.length} Originals • Production Case Studies`, palette: crimson },
  picks: { nav: 'Top Picks', card: 'Top Picks', meta: 'Top 10 from the resume', palette: jade },
  skills: { nav: 'Skills', card: 'My Skills', meta: `${skillCategories.length} Categories`, palette: ocean },
  moments: { nav: 'Moments', card: 'Key Impact', meta: `${achievements.length} Milestones • ${certifications.length} Certifications`, palette: crimson },
  story: { nav: 'Resume', card: 'The Full Story', meta: 'Resume • View & download', palette: violet },
};
