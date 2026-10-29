import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';
import { Badge } from './ui/badge';
import {
  ArrowRight,
  ClipboardList,
  Layers,
  ShieldCheck,
  Sparkles,
  Target,
  Zap,
  KeyRound,
  Copy,
  CheckCircle2,
  Clock,
  Check,
  Infinity,
} from 'lucide-react';

export const HowItWorks: React.FC = () => {
  return (
    <section id="faq-section" className="container py-12 md:py-16 scroll-mt-20">
      <div className="text-center mb-8">
        <span className="text-xs font-semibold tracking-widest text-blue-400 uppercase px-3 py-1 inline-flex items-center gap-2 bg-blue-950/40 border border-blue-500/30 rounded-full">
          <Layers className="w-3 h-3" />
          How It Works & Quick FAQ
        </span>
        <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          Everything You Need to Know
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-slate-400 leading-relaxed">
          From your first bullet point to polished OPM CCAR output — we guide you
          every step of the way.
        </p>
      </div>

      <Accordion type="single" defaultValue="how-it-works" className="w-full max-w-3xl mx-auto space-y-3">
        {/* Step 1 */}
        <AccordionItem value="how-it-works" className="border-slate-700/60">
          <AccordionTrigger className="hover:bg-slate-800/60 rounded-lg px-4 py-3 text-left transition-colors">
            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-sm font-bold text-white shadow-md shadow-blue-900/30">
                1
              </span>
              <span className="font-semibold text-white">Paste Your Experience</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4 pt-0">
            <div className="space-y-3 text-sm text-slate-300">
              <p>
                Paste your plain work history into the input box on the left. Our
                OPM engine instantly parses your raw text, extracts key skills,
                and scores OPM strength.
              </p>
              <p className="flex items-start gap-2 text-slate-400">
                <Copy className="w-4 h-4 mt-0.5 shrink-0 text-blue-400" />
                Minimum 10 characters recommended for meaningful CCAR structuring.
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Step 2 */}
        <AccordionItem value="step-2" className="border-slate-700/60">
          <AccordionTrigger className="hover:bg-slate-800/60 rounded-lg px-4 py-3 text-left transition-colors">
            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-sm font-bold text-white shadow-md shadow-blue-900/30">
                2
              </span>
              <span className="font-semibold text-white">Refine with OPM Engine</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4 pt-0">
            <div className="space-y-3 text-sm text-slate-300">
              <p>
                Set your target GS level (e.g., GS-13 Senior Specialist) and hit
                Refine. The engine generates three tailored CCAR variations with
                strength analysis, keyword extraction, and action verb scoring.
              </p>
              <p className="flex items-start gap-2 text-slate-400">
                <Zap className="w-4 h-4 mt-0.5 shrink-0 text-amber-400" />
                OPM Strength Score updates in real time as you refine.
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Step 3 */}
        <AccordionItem value="step-3" className="border-slate-700/60">
          <AccordionTrigger className="hover:bg-slate-800/60 rounded-lg px-4 py-3 text-left transition-colors">
            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-sm font-bold text-white shadow-md shadow-blue-900/30">
                3
              </span>
              <span className="font-semibold text-white">Export & Apply</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4 pt-0">
            <div className="space-y-3 text-sm text-slate-300">
              <p>
                Copy your refined federal bullets, export to TXT or JSON, or
                directly paste them into your USAJOBS application. Each bullet is
                structured with Context, Challenge, Action, and Result breakdown.
              </p>
              <p className="flex items-start gap-2 text-slate-400">
                <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-emerald-400" />
                OPM CCAR compliant — USAJOBS ready out of the box.
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* What is CCAR Format? */}
        <AccordionItem value="what-is-ccar" className="border-slate-700/60">
          <AccordionTrigger className="hover:bg-slate-800/60 rounded-lg px-4 py-3 text-left transition-colors">
            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-sm font-bold text-white shadow-md shadow-indigo-900/30">
                ?
              </span>
              <span className="font-semibold text-white">What is CCAR Format?</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4 pt-0">
            <div className="space-y-3 text-sm text-slate-300">
              <p className="font-medium text-white">CCAR = Context, Challenge, Action, Result</p>
              <p>
                CCAR is the OPM-standard framework for writing federal resume
                bullets. Every bullet must answer four questions in order:
              </p>
              <ul className="space-y-2 ml-4">
                {[
                  { label: 'Context', desc: 'The mission environment and GS scope.' },
                  { label: 'Challenge', desc: 'The statutory or operational constraints.' },
                  { label: 'Action', desc: 'Authoritative federal power verbs.' },
                  { label: 'Result', desc: 'Quantified mission impact.' },
                ].map((row) => (
                  <li key={row.label} className="flex items-start gap-2">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-950/40 text-[10px] font-bold text-blue-300">
                      {row.label[0]}
                    </span>
                    <span>
                      <span className="font-semibold text-white">{row.label}</span>{' '}
                      <span className="text-slate-400">{row.desc}</span>
                    </span>
                  </li>
                ))}
              </ul>
              <p className="flex items-start gap-2 text-slate-400">
                <ShieldCheck className="w-4 h-4 mt-0.5 shrink-0 text-blue-400" />
                This is the same framework used by USAJOBS reviewers to score
                federal job applications.
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* How to Activate License? */}
        <AccordionItem value="activate-license" className="border-slate-700/60">
          <AccordionTrigger className="hover:bg-slate-800/60 rounded-lg px-4 py-3 text-left transition-colors">
            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-orange-600 text-sm font-bold text-white shadow-md shadow-amber-900/30">
                &gt;
              </span>
              <span className="font-semibold text-white">How to Activate License?</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4 pt-0">
            <div className="space-y-3 text-sm text-slate-300">
              <p className="font-medium text-white">Follow these 3 steps to activate your Pro license:</p>
              <ol className="space-y-2 ml-4">
                {[
                  'Purchase your plan on Gumroad (7-Day Pass or Pro Monthly).',
                  'Find your License Key in the Gumroad receipt email or library.',
                  'Open the Pricing modal, paste the key into the input field, and click Save.',
                ].map((step, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-950/40 text-[10px] font-bold text-amber-300">
                      {i + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
              <p className="flex items-start gap-2 text-slate-400">
                <KeyRound className="w-4 h-4 mt-0.5 shrink-0 text-amber-400" />
                Your license key is stored securely in browser localStorage. You
                can also find it in your Gumroad receipt or library.
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Pricing Plans */}
        <AccordionItem value="pricing-plans" className="border-slate-700/60">
          <AccordionTrigger className="hover:bg-slate-800/60 rounded-lg px-4 py-3 text-left transition-colors">
            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 text-sm font-bold text-white shadow-md shadow-emerald-900/30">
                $
              </span>
              <span className="font-semibold text-white">What are the pricing plans and investment?</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4 pt-0">
            <div className="space-y-3 text-sm text-slate-300">
              <p className="font-medium text-white">Choose the plan that fits your federal job search:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Card 1: 7-Day Pass */}
                <div className="rounded-2xl border border-slate-700/80 bg-slate-800/60 p-5 flex flex-col justify-between hover:border-slate-600 transition-all">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <Badge variant="outline" className="border-slate-600 text-slate-300 bg-slate-900/60 font-mono text-xs">
                        <Clock className="w-3 h-3 mr-1" /> 7-DAY ACCESS
                      </Badge>
                      <span className="text-xs text-slate-400">One-time pass</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-1">7-Day Unlimited Pass</h3>
                    <p className="text-xs text-slate-400 mb-4">
                      Ideal for polishing a single federal resume before a deadline.
                    </p>
                    <div className="flex items-baseline gap-1.5 mb-5">
                      <span className="text-3xl font-extrabold text-white">$9.99</span>
                      <span className="text-xs text-slate-400">/ 7 days</span>
                    </div>
                    <ul className="space-y-2 text-xs text-slate-300 mb-6">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>Unlimited CCAR bullet generations for 7 days</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>All GS Grade levels (GS-07 through SES)</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>OPM Strength Scoring & keyword analysis</span>
                      </li>
                    </ul>
                  </div>
                  <a
                    className="gumroad-button w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm bg-slate-700 hover:bg-slate-600 text-white shadow-md transition-all text-center"
                    href="https://leontomz.gumroad.com/l/fedrefine-7day-pass?wanted=true"
                    data-gumroad-single-product="true"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Zap className="w-4 h-4 text-amber-400" />
                    Get 7-Day Pass ($9.99)
                  </a>
                </div>

                {/* Card 2: Pro Monthly */}
                <div className="rounded-2xl border-2 border-emerald-500/80 bg-gradient-to-b from-emerald-950/40 via-slate-800/80 to-slate-900/90 p-5 flex flex-col justify-between shadow-xl shadow-emerald-950/50">
                  <div className="absolute -top-3 right-5">
                    <Badge className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold text-[11px] px-2.5 py-0.5 shadow-md">
                      BEST VALUE
                    </Badge>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <Badge variant="outline" className="border-emerald-400/40 text-emerald-300 bg-emerald-950/60 font-mono text-xs">
                        <Infinity className="w-3 h-3 mr-1" /> UNLIMITED PRO
                      </Badge>
                      <span className="text-xs text-emerald-300 font-medium">Billed monthly</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-1">Pro Monthly Membership</h3>
                    <p className="text-xs text-emerald-300 mb-4">
                      Unlimited continuous access for active job hunters applying to multiple GS series.
                    </p>
                    <div className="flex items-baseline gap-1.5 mb-5">
                      <span className="text-3xl font-extrabold text-white">$19.99</span>
                      <span className="text-xs text-slate-400">/ month</span>
                    </div>
                    <ul className="space-y-2 text-xs text-slate-200 mb-6">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span className="font-medium text-white">Continuous unlimited refinements</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>Custom n8n Webhook server processing option</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>Executive SES & Director level tailoring</span>
                      </li>
                    </ul>
                  </div>
                  <a
                    className="gumroad-button w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-lg shadow-emerald-900/40 transition-all text-center"
                    href="https://leontomz.gumroad.com/l/fedrefine-pro-monthly?wanted=true"
                    data-gumroad-single-product="true"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Sparkles className="w-4 h-4 text-white" />
                    Subscribe Pro ($19.99/mo)
                  </a>
                </div>
              </div>
              <p className="flex items-start gap-2 text-slate-400 text-xs mt-2">
                <KeyRound className="w-3.5 h-3.5 mt-0.5 shrink-0 text-amber-400" />
                Every purchase includes an <strong className="text-white">instant Gumroad License Key</strong> delivered to your email.
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
};

