import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Badge } from './ui/badge';
import { CheckCircle2, XCircle, ShieldCheck, Zap, Sparkles, BookOpen } from 'lucide-react';

interface CCARGuideModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CCARGuideModal: React.FC<CCARGuideModalProps> = ({ open, onOpenChange }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-slate-900 border-slate-700/80 text-slate-100 shadow-2xl p-6">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-2 rounded-lg bg-blue-600/20 text-blue-400 border border-blue-500/30">
              <ShieldCheck className="w-5 h-5" />
            </span>
            <Badge variant="outline" className="border-blue-500/40 text-blue-300 bg-blue-950/40 font-mono text-xs">
              OPM STANDARD
            </Badge>
          </div>
          <DialogTitle className="text-2xl font-bold text-white tracking-tight">
            The Federal CCAR Resume Formula
          </DialogTitle>
          <DialogDescription className="text-slate-400 text-sm">
            Federal HR Specialists and hiring panels spend less than 30 seconds scanning your resume against the specialized experience requirements in the USAJOBS job announcement.
          </DialogDescription>
        </DialogHeader>

        {/* 4 Pillars of CCAR */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-4">
          <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60">
            <div className="flex items-center gap-2 text-blue-400 font-semibold mb-1">
              <span className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-300 flex items-center justify-center text-xs font-mono">
                C
              </span>
              Context (The Setting)
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Describe the scope, organizational level (GS grade, division, multi-agency), and mission environment where the assignment took place.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60">
            <div className="flex items-center gap-2 text-indigo-400 font-semibold mb-1">
              <span className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-300 flex items-center justify-center text-xs font-mono">
                C
              </span>
              Challenge (The Problem)
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Specify the impediment, statutory deadline, high-risk audit, obsolete technology, or resource shortage that required intervention.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60">
            <div className="flex items-center gap-2 text-sky-400 font-semibold mb-1">
              <span className="w-6 h-6 rounded-full bg-sky-500/20 text-sky-300 flex items-center justify-center text-xs font-mono">
                A
              </span>
              Action (What YOU Did)
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Use authoritative federal power verbs (Spearheaded, Formulated, Orchestrated). Avoid passive "assisted" or vague "responsible for".
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60">
            <div className="flex items-center gap-2 text-emerald-400 font-semibold mb-1">
              <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center text-xs font-mono">
                R
              </span>
              Result (Quantified Mission Value)
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Federal resumes MUST include numbers: $ saved/managed, % efficiency gained, error reductions, people led, or zero audit findings.
            </p>
          </div>
        </div>

        {/* Comparison: Civilian vs Federal */}
        <div className="my-2 space-y-3">
          <h4 className="text-sm font-semibold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-400" />
            Civilian Bullet vs. OPM CCAR Bullet
          </h4>

          <div className="p-3.5 rounded-lg bg-red-950/20 border border-red-500/30 text-xs">
            <div className="flex items-center gap-2 text-red-400 font-medium mb-1">
              <XCircle className="w-4 h-4" /> Weak Civilian Bullet (Rated "Ineligible" by HR)
            </div>
            <p className="text-slate-300 italic">
              "Helped with internal database upgrades and worked with team members to resolve bugs."
            </p>
            <p className="text-red-400/90 text-[11px] mt-1.5">
              ⚠️ Flaw: Lacks GS grade level scope, specific technical authority, quantifiable outcomes, and agency compliance context.
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-emerald-950/20 border border-emerald-500/30 text-xs">
            <div className="flex items-center gap-2 text-emerald-400 font-medium mb-1">
              <CheckCircle2 className="w-4 h-4" /> OPM-Standard CCAR Bullet (Referred to Hiring Manager)
            </div>
            <p className="text-slate-200">
              <span className="text-blue-300 font-semibold">Orchestrated</span> migration of 14 mission-critical legacy databases to an enterprise hybrid cloud; <span className="text-sky-300 font-semibold">enforced NIST 800-53 security baselines</span>, resolved 42 high-severity vulnerability vulnerabilities, and authored standardized runbooks, <span className="text-emerald-300 font-semibold">reducing system downtime by 43% and conserving $180K in annual contractor licensing costs</span>.
            </p>
            <p className="text-emerald-400/90 text-[11px] mt-1.5">
              ✓ Strength: Directly demonstrates specialized experience, quantified cost savings, and governance credentials.
            </p>
          </div>
        </div>

        {/* Tip box */}
        <div className="p-3.5 rounded-xl bg-blue-950/30 border border-blue-500/30 text-xs text-slate-300 flex items-start gap-3 mt-3">
          <Zap className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
          <div>
            <span className="font-semibold text-blue-200">Pro-Tip for USAJOBS: </span>
            In the USAJOBS Resume Builder, include 3 to 5 comprehensive CCAR bullets under each qualifying position rather than 10 shallow 1-liners. Federal resumes should be 3-5 pages long!
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
