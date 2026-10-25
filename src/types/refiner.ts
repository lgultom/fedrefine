export type GSLevel = 'GS-07/09' | 'GS-11' | 'GS-12' | 'GS-13' | 'GS-14' | 'GS-15' | 'SES/Senior';

export interface BulletVariation {
  id: string;
  style: 'Quantified Impact (Executive)' | 'Technical & Execution' | 'OPM Leadership & CCAR';
  text: string;
  ccarBreakdown?: {
    context: string;
    challenge: string;
    action: string;
    result: string;
  };
}

export interface RefinementResult {
  id: string;
  timestamp: number;
  rawInput: string;
  targetRole: string;
  targetGS: GSLevel;
  federalBullets: BulletVariation[];
  keySkillsHighlighted: string[];
  strengthScore: number; // 0-100
  scoreBreakdown: {
    ccarStructure: number; // 0-25
    opmKeywords: number; // 0-25
    quantifiedMetrics: number; // 0-25
    actionVerbStrength: number; // 0-25
  };
  improvementNote: string;
  opmCompetencies: string[];
}

export interface RefinementRequest {
  rawExperience: string;
  targetPosition?: string;
  targetGS?: GSLevel;
  agencyOrSeries?: string;
}

export interface PresetSample {
  id: string;
  title: string;
  gsLevel: GSLevel;
  series: string; // e.g. "2210 - IT Specialist"
  rawText: string;
  positionTitle: string;
}
