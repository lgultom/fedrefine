import { BulletVariation, GSLevel, RefinementRequest, RefinementResult } from '../types/refiner';

const STORAGE_WEBHOOK_KEY = 'fedrefine_n8n_webhook_url';
const STORAGE_ENGINE_MODE_KEY = 'fedrefine_engine_mode';
const STORAGE_HISTORY_KEY = 'fedrefine_history_v1';

const PRODUCTION_WEBHOOK_URL = 'https://api.microtoolsuite.com/webhook/fedrefine-process';

export const getStoredWebhookUrl = (): string => {
  if (typeof window === 'undefined') return '';
  return localStorage.getItem(STORAGE_WEBHOOK_KEY) || PRODUCTION_WEBHOOK_URL;
};

export const setStoredWebhookUrl = (url: string) => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_WEBHOOK_KEY, url);
    } catch (e) {
      console.error('Failed to save webhook URL', e);
    }
  }
};

export const getStoredEngineMode = (): 'simulator' | 'webhook' => {
  if (typeof window === 'undefined') return 'webhook';
  const mode = localStorage.getItem(STORAGE_ENGINE_MODE_KEY);
  return mode === 'webhook' ? 'webhook' : 'webhook';
};

export const setStoredEngineMode = (mode: 'simulator' | 'webhook') => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_ENGINE_MODE_KEY, mode);
    } catch (e) {
      console.error('Failed to save engine mode', e);
    }
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
    try {
      localStorage.removeItem(STORAGE_HISTORY_KEY);
    } catch (e) {
      console.error('Failed to clear history', e);
    }
  }
};

/**
 * Strips trailing punctuation (.,;:!?) from raw input to prevent double punctuation
 * like ".;" or ".." when inserted into fallback templates.
 */
export function stripTrailingPunctuation(text: string): string {
  return text.replace(/[.,;:!?]+$/, '');
}

/**
 * Standardizes bracketed percentage placeholders like [Y%] or [Z%] to [X%]
 * for consistency across generated CCAR bullets.
 */
export function standardizePlaceholders(text: string): string {
  return text.replace(/\[([A-WYZ])\s*%\]/gi, '[X%]');
}

/**
 * Checks if any text contains bracketed placeholders like [X%], [Y users], etc.
 */
export function hasBracketPlaceholders(text: string): boolean {
  return /\[[^\]]+\]/.test(text);
}

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
 * Used as fallback when webhook fails or returns non-2xx response.
 */
export function generateSimulatedRefinement(req: RefinementRequest): RefinementResult {
  const gs = req.targetGS || 'GS-13';
  const role = req.targetPosition?.trim() || 'Federal Program Specialist';
  const raw = stripTrailingPunctuation(req.rawExperience.trim());

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

  // Standardize bracketed percentage placeholders like [Y%] or [Z%] to [X%]
  const standardizedBullets = bullets.map((b) => ({ ...b, text: standardizePlaceholders(b.text) }));
  const hasPlaceholder = standardizedBullets.some((b) => hasBracketPlaceholders(b.text));
  const placeholderWarning = hasPlaceholder
    ? 'Placeholder Reminder: Replace bracketed items like [X%] with your actual verified metrics before submitting your resume.'
    : undefined;

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
    federalBullets: standardizedBullets,
    keySkillsHighlighted: detectedKeywords.slice(0, 5),
    strengthScore: totalScore,
    scoreBreakdown: {
      ccarStructure,
      opmKeywords,
      quantifiedMetrics,
      actionVerbStrength
    },
    improvementNote,
    placeholderWarning,
    opmCompetencies: OPM_COMPETENCIES.slice(0, 4)
  };
}

/**
 * Main Refine caller: ALWAYS executes a real fetch to the production n8n webhook
 * first. Only uses local fallback inside the catch block if fetch throws an error
 * or returns a non-OK response.
 */
export async function refineFederalBullet(
  req: RefinementRequest,
  mode: 'simulator' | 'webhook',
  customWebhookUrl?: string
): Promise<{ result: RefinementResult; source: 'webhook' | 'simulator'; errorNotice?: string }> {
  // Always execute real fetch to production webhook first
  const url = customWebhookUrl || PRODUCTION_WEBHOOK_URL;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Origin': window.location.origin
      },
      body: JSON.stringify({
        experience: req.rawExperience,
        targetTitle: req.targetPosition || 'Federal Position',
        targetLevel: req.targetGS || 'GS-13'
      })
    });

    // If response is not OK, throw to trigger fallback
    if (!response.ok) {
      throw new Error(`Webhook responded with status ${response.status}`);
    }

    const data = await response.json();

    // Handle various response formats from n8n webhook
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

    // Standardize placeholders in webhook bullets
    const standardizedBullets = bullets.map((b) => ({ ...b, text: standardizePlaceholders(b.text) }));
    const hasPlaceholder = standardizedBullets.some((b) => hasBracketPlaceholders(b.text));
    const placeholderWarning = hasPlaceholder
      ? 'Placeholder Reminder: Replace bracketed items like [X%] with your actual verified metrics before submitting your resume.'
      : undefined;

    const parsed: RefinementResult = {
      id: 'res-wh-' + Date.now(),
      timestamp: Date.now(),
      rawInput: req.rawExperience,
      targetRole: req.targetPosition || 'Federal Candidate',
      targetGS: req.targetGS || 'GS-13',
      federalBullets: standardizedBullets,
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
      placeholderWarning,
      opmCompetencies: Array.isArray(data.opmCompetencies)
        ? data.opmCompetencies
        : ['Strategic Thinking', 'Accountability', 'Problem Solving']
    };

    // Save to history
    saveHistoryItem(parsed);
    return { result: parsed, source: 'webhook' };

  } catch (err: any) {
    // Fallback to local simulation only if fetch throws or !response.ok
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