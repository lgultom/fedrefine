import { PresetSample } from '../types/refiner';

export const SAMPLE_PRESETS: PresetSample[] = [
  {
    id: 'preset-2210-gs13',
    title: 'Cloud Migration & NIST Compliance',
    gsLevel: 'GS-13',
    series: 'Series 2210: IT Specialist (INFOSEC/Cloud)',
    positionTitle: 'IT Specialist (INFOSEC / Cloud Architecture)',
    rawText: 'I helped move our internal servers to AWS cloud, configured security groups according to government rules, fixed several audit findings, and trained 15 teammates on cloud access.'
  },
  {
    id: 'preset-0343-gs12',
    title: 'Process Optimization & SOP Overhaul',
    gsLevel: 'GS-12',
    series: 'Series 0343: Management & Program Analyst',
    positionTitle: 'Management and Program Analyst',
    rawText: 'Reviewed branch quarterly performance data, found bottlenecks in our procurement approvals, rewrote 4 standard operating procedures, and reduced approval turnaround times significantly.'
  },
  {
    id: 'preset-1102-gs13',
    title: 'Federal Acquisition & Contract Closeouts',
    gsLevel: 'GS-13',
    series: 'Series 1102: Contracting Specialist',
    positionTitle: 'Contract Specialist (FAR / Acquisitions)',
    rawText: 'Managed a portfolio of vendor service contracts worth around $8M under FAR Part 12 and 15, conducted market research, resolved vendor disputes, and closed out 22 expired task orders before fiscal year-end.'
  },
  {
    id: 'preset-0201-gs11',
    title: 'Talent Acquisition & DEIA Hiring',
    gsLevel: 'GS-11',
    series: 'Series 0201: Human Resources Specialist',
    positionTitle: 'Human Resources Specialist (Staffing & Classification)',
    rawText: 'Coordinated hiring panels for 18 vacancies, screened resumes, scheduled candidate interviews, ensured merit promotion rules were followed, and reduced time-to-hire by three weeks.'
  },
  {
    id: 'preset-mil-gs14',
    title: 'Military Transition / Operational Command',
    gsLevel: 'GS-14',
    series: 'Series 0301: Miscellaneous Administration & Program',
    positionTitle: 'Supervisory Operations Officer',
    rawText: 'Led a 45-person logistics unit responsible for $35M in property, conducted readiness inspections, synchronized multi-agency disaster drills, and achieved 100% accountability during audit.'
  }
];

export const GS_LEVELS: { level: import('../types/refiner').GSLevel; description: string }[] = [
  { level: 'GS-07/09', description: 'Entry to Developmental Level (Demonstrated aptitude & fundamental execution)' },
  { level: 'GS-11', description: 'Full Performance Journey Level (Independent analysis & operational execution)' },
  { level: 'GS-12', description: 'Advanced Journey Level (Subject matter expertise & cross-functional liaison)' },
  { level: 'GS-13', description: 'Senior Specialist / Lead (Policy guidance, complex programs & strategic decisions)' },
  { level: 'GS-14', description: 'Senior Expert / Division Chief (Agency-wide impact, executive briefs & oversight)' },
  { level: 'GS-15', description: 'Executive Director / Senior Advisory (Enterprise strategy, national policy)' },
  { level: 'SES/Senior', description: 'Senior Executive Service (Government-wide strategic leadership)' }
];
