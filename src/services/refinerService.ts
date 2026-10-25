import { BulletVariation, GSLevel, RefinementRequest, RefinementResult } from '../types/refiner';

const STORAGE_WEBHOOK_KEY = 'fedrefine_n8n_webhook_url';
const STORAGE_ENGINE_MODE_KEY = 'fedrefine_engine_mode'; // 'simulator' | 'webhook'
const STORAGE_HISTORY_KEY = 'fedrefine_history_v1';

export const getStoredWebhookUrl = (): string => {
  if (typeof window === 'undefined') return '';
  return localStorage.getItem(STORAGE_WEBHOOK_KEY) || 'http://localhost:5678/webhook/fedrefine-process';
};

export const setStoredWebhookUrl = (url: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_WEBHOOK_KEY, url);
  }
};

export const getStoredEngineMode = (): 'simulator' | 'webhook' => {
  if (typeof window === 'undefined') return 'simulator';
  const mode = localStorage.getItem(STORAGE_ENGINE_MODE_KEY);
  return mode === 'webhook' ? 'webhook' : 'simulator';
};

export const setStoredEngineMode = (mode: 'simulator' | 'webhook') => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_ENGINE_MODE_KEY, mode);
  }
};

export const getHistory = (): RefinementResult[] => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Failed to load history', e);
    return [];
  }
};

export const saveHistoryItem = (item: RefinementResult) => {
  if (typeof window === 'undefined') return;
  try {
    const current = getHistory();
    const updated = [item, ...current.filter((x) => x.id !== item.id)].slice(0, 20);
    localStorage.setItem(STORAGE_HISTORY_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save history item', e);
  }
};

export const clearHistory = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_HISTORY_KEY);
  }
};

// Power action verbs recommended by OPM and Federal HR specialists
const POWER_VERBS = [
  'Spearheaded',
  'Orchestrated',
  'Architected',
  'Standardized',
  'Administered',
  'Formulated',
  'Modernized',
  'Instituted',
  'Synchronized',
  'Negotiated',
  'Overhauled',
  'Directed',
  'Optimized',
  'Pioneered',
  'Streamlined',
  'Synthesized'
];

// OPM Competencies database
const OPM_COMPETENCIES = [
  'Strategic Thinking',
  'Accountability',
  'Financial Management',
  'Customer Service',
  'Problem Solving',
  'Technical Competence',
  'Partnering & Interagency Liaison',
  'Written & Oral Communication',
  'Decisiveness',
  'Integrity/Honesty'
];

/**
 * Intelligent OPM CCAR Generator (Built-in AI Simulation Engine)
 */
export function generateSimulatedRefinement(req: RefinementRequest): RefinementResult {
  const gs = req.targetGS || 'GS-13';
  const role = req.targetPosition?.trim() || 'Federal Program Specialist';
  const raw = req.rawExperience.trim();

  // Extract core concepts
  const hasNumbers = /\d+/.test(raw);
  const words = raw.split(/\s+/);
  const detectedKeywords: string[] = [];

  const candidateKeywords = [
    'compliance',
    'cloud',
    'audit',
    'security',
    'procurement',
    'stakeholder',
    'budget',
    'contract',
    'sop',
    'policy',
    'governance',
    'training',
    'operations',
    'workflow',
    'performance',
    'reporting',
    'acquisition',
    'migration',
    'quality',
    'risk management'
  ];

  candidateKeywords.forEach((kw) => {
    if (new RegExp(`\\b${kw}\\b`, 'i').test(raw)) {
      detectedKeywords.push(kw.toUpperCase());
    }
  });

  if (detectedKeywords.length < 3) {
    detectedKeywords.push('OPM COMPLIANCE', 'CROSS-FUNCTIONAL ALIGNMENT', 'CONTINUOUS IMPROVEMENT');
  }

  // Derive CCAR components
  const context = `Serving as ${role} (${gs}) within a high-tempo operational environment`;
  const challenge = raw.length > 30
    ? `Tasked with addressing operational bottlenecks and bridging compliance gaps in legacy workflows`
    : `Facing fragmented procedures, resource constraints, and rigorous statutory oversight deadlines`;

  const actionPrefix = POWER_VERBS[Math.floor(Math.random() * POWER_VERBS.length)];
  const actionText = raw.replace(/^(i helped|i worked on|i managed|i was responsible for|helped|worked|did)\s+/i, '');

  const cleanedAction = actionText.charAt(0).toLowerCase() + actionText.slice(1);

  // CCAR Variations
  const var1Text = `${actionPrefix} cross-functional initiatives to ${cleanedAction}; instituted standard operating controls, enforced OPM/NIST regulatory adherence, and synchronized stakeholders across multiple directorates, resulting in zero non-compliance findings and a measurable 28% gain in cycle efficiency.`;

  const var2Text = `Architected and executed enterprise-grade milestones targeting: "${cleanedAction}"; established structured internal controls and quantitative benchmarks that eliminated operational backlog by 35% and conserved approximately $140K in annual administrative expenditures.`;

  const var3Text = `Directed comprehensive end-to-end resolution of critical requirements by leading efforts to ${cleanedAction}; briefed senior leadership on technical risk matrices, conducted tailored workforce enablement, and achieved 100% audit readiness ahead of statutory fiscal deadlines.`;

  const bullets: BulletVariation[] = [
    {
      id: 'bullet-1',
      style: 'OPM Leadership & CCAR',
      text: var1Text,
      ccarBreakdown: {
        context: `Operating at the ${gs} specialized experience benchmark for ${role}.`,
        challenge: 'Navigating statutory governance guidelines, multi-party dependencies, and mission-critical milestones.',
        action: `${actionPrefix} standardized workflows and instituted rigorous compliance controls while executing: ${cleanedAction}.`,
        result: 'Achieved zero audit discrepancies, 28% efficiency boost, and full agency alignment.'
      }
    },
    {
      id: 'bullet-2',
      style: 'Quantified Impact (Executive)',
      text: var2Text,
      ccarBreakdown: {
        context: 'Division-level portfolio oversight with fiscal and operational accountability.',
        challenge: 'Overcoming legacy system friction, resource waste, and manual processing bottlenecks.',
        action: `Pioneered systematic redesign targeting: ${cleanedAction}.`,
        result: 'Curtailed backlog by 35% and captured $140K in cost avoidance with auditable documentation.'
      }
    },
    {
      id: 'bullet-3',
      style: 'Technical & Execution',
      text: var3Text,
      ccarBreakdown: {
        context: 'Subject matter advisory across mission systems and stakeholder governance.',
        challenge: 'Tight delivery window with strict federal standards and zero margin for error.',
        action: `Mobilized cross-functional personnel to deliver: ${cleanedAction}.`,
        result: 'Passed inspection with 100% audit readiness and recognized by executive leadership.'
      }
    }
  ];

  // Calculate score breakdown
  const ccarStructure = Math.min(25, 20 + (raw.length > 50 ? 5 : 2));
  const opmKeywords = Math.min(25, 18 + Math.min(detectedKeywords.length * 2, 7));
  const quantifiedMetrics = hasNumbers ? 24 : 19;
  const actionVerbStrength = 24;
  const totalScore = Math.min(98, ccarStructure + opmKeywords + quantifiedMetrics + actionVerbStrength);

  // Recommendations tailored to GS level
  let gsAdvice = '';
  if (gs.includes('14') || gs.includes('15') || gs.includes('SES')) {
    gsAdvice = `For ${gs} ratings, USAJOBS HR specialists look for enterprise-wide policy influence, budget accountability ($M+), and executive-level briefings rather than solely individual contributor tasks.`;
  } else if (gs.includes('12') || gs.includes('13')) {
    gsAdvice = `For ${gs} positions, highlight independent project ownership, cross-branch stakeholder consensus, and measurable before-and-after percentage gains.`;
  } else {
    gsAdvice = `For ${gs} grades, emphasize adherence to guidelines, rapid skill mastery, team support, and error-free task execution.`;
  }

  const improvementNote = `${gsAdvice} Tip: Ensure every bullet in your USAJOBS builder explicitly answers: "What was the mission impact if this was NOT done?"`;

  return {
    id: 'res-' + Date.now(),
    timestamp: Date.now(),
    rawInput: req.rawExperience,
    targetRole: role,
    targetGS: gs,
    federalBullets: bullets,
    keySkillsHighlighted: detectedKeywords.slice(0, 5),
    strengthScore: totalScore,
    scoreBreakdown: {
      ccarStructure,
      opmKeywords,
      quantifiedMetrics,
      actionVerbStrength
    },
    improvementNote,
    opmCompetencies: OPM_COMPETENCIES.slice(0, 4)
  };
}

/**
 * Main Refine caller: attempts n8n Webhook if configured / enabled,
 * or gracefully runs the local simulated OPM engine.
 */
export async function refineFederalBullet(
  req: RefinementRequest,
  mode: 'simulator' | 'webhook',
  customWebhookUrl?: string
): Promise<{ result: RefinementResult; source: 'webhook' | 'simulator'; errorNotice?: string }> {
  // If webhook mode is chosen:
  if (mode === 'webhook') {
    const url = customWebhookUrl || getStoredWebhookUrl();
    if (!url || !url.startsWith('http')) {
      // Fallback with notice
      const fallback = generateSimulatedRefinement(req);
      saveHistoryItem(fallback);
      return {
        result: fallback,
        source: 'simulator',
        errorNotice: 'Webhook URL was invalid. Used simulated OPM engine instead.'
      };
    }

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          jobTitle: req.targetPosition || 'Federal Position',
          draftText: req.rawExperience
        })
      });

      if (!response.ok) {
        throw new Error(`Webhook responded with status ${response.status}`);
      }

      const data = await response.json();

      // Handle various response formats from n8n webhook
      // Expected format: { federalBullets: string[] | BulletVariation[], keySkillsHighlighted?: string[], strengthScore?: number, improvementNote?: string, opmCompetencies?: string[], scoreBreakdown?: {...} }
      let bullets: BulletVariation[] = [];

      // Support multiple response formats
      if (Array.isArray(data.federalBullets)) {
        bullets = data.federalBullets.map((b: any, idx: number) => {
          if (typeof b === 'string') {
            return {
              id: `webhook-bullet-${idx}`,
              style: (idx === 0 ? 'OPM Leadership & CCAR' : idx === 1 ? 'Quantified Impact (Executive)' : 'Technical & Execution') as any,
              text: b
            };
          }
          return {
            id: b.id || `webhook-bullet-${idx}`,
            style: b.style || 'OPM Leadership & CCAR',
            text: b.text || String(b),
            ccarBreakdown: b.ccarBreakdown
          };
        });
      } else if (Array.isArray(data.bullets)) {
        // Alternative format: { bullets: [...] }
        bullets = data.bullets.map((b: any, idx: number) => {
          if (typeof b === 'string') {
            return {
              id: `webhook-bullet-${idx}`,
              style: (idx === 0 ? 'OPM Leadership & CCAR' : idx === 1 ? 'Quantified Impact (Executive)' : 'Technical & Execution') as any,
              text: b
            };
          }
          return {
            id: b.id || `webhook-bullet-${idx}`,
            style: b.style || 'OPM Leadership & CCAR',
            text: b.text || String(b),
            ccarBreakdown: b.ccarBreakdown
          };
        });
      } else if (typeof data === 'string') {
        // Single string response
        bullets = [{
          id: 'webhook-bullet-0',
          style: 'OPM Leadership & CCAR',
          text: data
        }];
      }

      if (bullets.length === 0) {
        throw new Error('Webhook response missing "federalBullets" or "bullets" array');
      }

      const parsed: RefinementResult = {
        id: 'res-wh-' + Date.now(),
        timestamp: Date.now(),
        rawInput: req.rawExperience,
        targetRole: req.targetPosition || 'Federal Candidate',
        targetGS: req.targetGS || 'GS-13',
        federalBullets: bullets,
        keySkillsHighlighted: Array.isArray(data.keySkillsHighlighted)
          ? data.keySkillsHighlighted
          : ['OPM COMPLIANCE', 'FEDERAL EXECUTION'],
        strengthScore: typeof data.strengthScore === 'number' ? data.strengthScore : 92,
        scoreBreakdown: data.scoreBreakdown || {
          ccarStructure: 24,
          opmKeywords: 23,
          quantifiedMetrics: 23,
          actionVerbStrength: 22
        },
        improvementNote: data.improvementNote || 'Generated via active n8n federal automation pipeline.',
        opmCompetencies: Array.isArray(data.opmCompetencies)
          ? data.opmCompetencies
          : ['Strategic Thinking', 'Accountability', 'Problem Solving']
      };

      saveHistoryItem(parsed);
      return { result: parsed, source: 'webhook' };
    } catch (err: any) {
      console.warn('Webhook dispatch failed, falling back to local simulation:', err);
      const simulated = generateSimulatedRefinement(req);
      saveHistoryItem(simulated);
      return {
        result: simulated,
        source: 'simulator',
        errorNotice: `Webhook call failed (${err.message || 'Network error'}). Rendered via built-in OPM AI engine.`
      };
    }
  }

  // Pure Simulator mode (simulate slight realistic 700ms latency for smooth UX feel)
  await new Promise((resolve) => setTimeout(resolve, 600));
  const sim = generateSimulatedRefinement(req);
  saveHistoryItem(sim);
  return { result: sim, source: 'simulator' };
}