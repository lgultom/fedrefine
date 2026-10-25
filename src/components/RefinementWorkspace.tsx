import React from 'react';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Separator } from './ui/separator';
import { Skeleton } from './ui/skeleton';
import { Copy, Check, Loader2, Target, Lightbulb, ShieldCheck, Sparkles, AlertTriangle } from 'lucide-react';
import type { BulletVariation, GSLevel, RefinementResult } from '../types/refiner';

interface RefinementWorkspaceProps {
  rawExperience: string;
  setRawExperience: (value: string) => void;
  targetPosition: string;
  setTargetPosition: (value: string) => void;
  targetGS: GSLevel;
  setTargetGS: (value: GSLevel) => void;
  isLoading: boolean;
  result: RefinementResult | null;
  errorNotice: string | null;
  onRefine: () => void;
  onCopy: (text: string) => void;
}

const BULLET_STYLE_STYLES: Record<string, string> = {
  'OPM Leadership & CCAR': 'border-l-4 border-l-blue-500 bg-blue-950/20',
  'Quantified Impact (Executive)': 'border-l-4 border-l-indigo-500 bg-indigo-950/20',
  'Technical & Execution': 'border-l-4 border-l-sky-500 bg-sky-950/20',
};

const StrengthGauge: React.FC<{ score: number }> = ({ score }) => {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const color = score >= 85 ? 'text-emerald-400' : score >= 70 ? 'text-blue-400' : 'text-amber-400';

  return (
    <div className="relative w-36 h-36">
      <svg className="w-36 h-36 -rotate-none" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r={radius} fill="none" strokeWidth="10" className="stroke-slate-800" />
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className={`${color} transition-all duration-1000 ease-out`}
          style={{ transform: 'rotate(-90deg)', transformOrigin: 'center' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`text-3xl font-extrabold ${color}`}>{score}</span>
        <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">OPM Score</span>
      </div>
    </div>
  );
};

const ScoreBreakdownBar: React.FC<{ breakdown: RefinementResult['scoreBreakdown'] }> = ({ breakdown }) => {
  const entries = [
    { label: 'CCAR Structure', value: breakdown.ccarStructure, color: 'bg-blue-500' },
    { label: 'OPM Keywords', value: breakdown.opmKeywords, color: 'bg-indigo-500' },
    { label: 'Quantified Metrics', value: breakdown.quantifiedMetrics, color: 'bg-sky-500' },
    { label: 'Action Verbs', value: breakdown.actionVerbStrength, color: 'bg-emerald-500' },
  ];
  const max = 25;
  return (
    <div className="space-y-2">
      {entries.map((e) => (
        <div key={e.label} className="flex items-center gap-2">
          <span className="text-[10px] font-medium text-slate-400 w-28">{e.label}</span>
          <div className="flex-1 h-1.5 rounded-full bg-slate-800 overflow-hidden">
            <div className={`h-full ${e.color} rounded-full transition-all duration-700`} style={{ width: `${(e.value / max) * 100}%` }} />
          </div>
          <span className="text-[10px] font-mono text-slate-300 w-6 text-right">{e.value}</span>
        </div>
      ))}
    </div>
  );
};

export const RefinementWorkspace: React.FC<RefinementWorkspaceProps> = ({
  rawExperience,
  setRawExperience,
  targetPosition,
  setTargetPosition,
  targetGS,
  setTargetGS,
  isLoading,
  result,
  errorNotice,
  onRefine,
  onCopy,
}) => {
  const [copiedId, setCopiedId] = React.useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    onCopy(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div id="refine" className="grid lg:grid-cols-2 gap-6 scroll-mt-24">
      {/* LEFT: INPUT */}
      <Card className="border-slate-700/80 bg-slate-900/60 backdrop-blur-xl">
        <CardHeader>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-lg bg-blue-600/20 text-blue-400 border border-blue-500/30">
              <Target className="w-5 h-5" />
            </span>
            <div>
              <CardTitle className="text-lg font-bold text-white">Refine Your Experience</CardTitle>
              <CardDescription className="text-xs text-slate-400">
                Paste plain work history below. Our OPM engine will structure it into CCAR bullets.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-200">
              Raw Experience Bullet <span className="text-red-400">*</span>
            </label>
            <Textarea
              placeholder="e.g. I helped move our internal servers to AWS cloud, configured security groups according to government rules, fixed several audit findings, and trained 15 teammates on cloud access."
              value={rawExperience}
              onChange={(e) => setRawExperience(e.target.value)}
              className="min-h-[140px] bg-slate-800/70 border-slate-700 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-y"
            />
            <p className="text-xs text-slate-500">Minimum 10 characters recommended for meaningful CCAR structuring.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-200">Target GS Position / Title</label>
              <Input
                placeholder="e.g. IT Specialist (Cloud)"
                value={targetPosition}
                onChange={(e) => setTargetPosition(e.target.value)}
                className="bg-slate-800/70 border-slate-700 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-200">Target GS Level</label>
              <select
                value={targetGS}
                onChange={(e) => setTargetGS(e.target.value as GSLevel)}
                className="flex h-10 w-full rounded-md border border-slate-700 bg-slate-800/70 px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              >
                <option value="GS-07/09">GS-07 / GS-09 (Entry)</option>
                <option value="GS-11">GS-11 (Journey)</option>
                <option value="GS-12">GS-12 (Advanced)</option>
                <option value="GS-13">GS-13 (Senior Specialist)</option>
                <option value="GS-14">GS-14 (Senior Expert)</option>
                <option value="GS-15">GS-15 (Executive Director)</option>
                <option value="SES/Senior">SES / Senior Executive</option>
              </select>
            </div>
          </div>

          <Button
            onClick={onRefine}
            disabled={isLoading || rawExperience.trim().length < 10}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold shadow-lg shadow-blue-900/30 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Refining with OPM Engine...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Refine Bullet Point
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* RIGHT: OUTPUT */}
      <Card className="border-slate-700/80 bg-slate-900/60 backdrop-blur-xl">
        <CardHeader>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-lg bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
              <ShieldCheck className="w-5 h-5" />
            </span>
            <div>
              <CardTitle className="text-lg font-bold text-white">OPM Refinement Output</CardTitle>
              <CardDescription className="text-xs text-slate-400">
                Three tailored CCAR variations with strength analysis.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-4">
              <div className="flex items-center justify-center py-16">
                <div className="w-full max-w-xs space-y-3">
                  <Skeleton className="h-6 w-3/4 mx-auto" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6 mx-auto" />
                  <Skeleton className="h-4 w-2/3 mx-auto" />
                </div>
              </div>
              <div className="flex items-center justify-center gap-2 text-sm text-slate-400">
                <Loader2 className="w-4 h-4 animate-spin text-blue-400" />
                Analyzing OPM compliance, metrics, and GS-level fit...
              </div>
            </div>
          ) : !result ? (
            <div className="py-16 text-center space-y-3">
              <div className="mx-auto w-16 h-16 rounded-2xl bg-slate-800/80 border border-slate-700 flex items-center justify-center">
                <ShieldCheck className="w-8 h-8 text-slate-600" />
              </div>
              <p className="text-sm text-slate-400">
                Your refined federal bullets will appear here. Paste an experience and hit refine.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Strength Meter */}
              <div className="flex flex-col md:flex-row items-center gap-6 p-4 rounded-xl bg-slate-800/60 border border-slate-700/60">
                <StrengthGauge score={result.strengthScore} />
                <div className="flex-1 w-full space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-slate-200">OPM Strength Score</span>
                    <Badge variant="outline" className="border-blue-500/40 text-blue-300 bg-blue-950/40 font-mono text-xs">
                      {result.strengthScore >= 85 ? 'Excellent' : result.strengthScore >= 70 ? 'Good' : 'Needs Work'}
                    </Badge>
                  </div>
                  <ScoreBreakdownBar breakdown={result.scoreBreakdown} />
                </div>
              </div>

              {/* Error notice */}
              {errorNotice && (
                <div className="flex items-start gap-2 p-3 rounded-lg bg-amber-950/30 border border-amber-500/30 text-xs text-amber-300">
                  <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
                  <span>{errorNotice}</span>
                </div>
              )}

              {/* Refined Bullets */}
              <div className="space-y-3">
                {result.federalBullets.map((bullet) => (
                  <div key={bullet.id} className={`rounded-xl border p-4 ${BULLET_STYLE_STYLES[bullet.style] || BULLET_STYLE_STYLES['OPM Leadership & CCAR']}`}>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline" className="border-slate-600 text-slate-300 bg-slate-900/60 text-[10px] font-semibold uppercase tracking-wide">
                        {bullet.style}
                      </Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleCopy(bullet.text, bullet.id)}
                        className="h-8 px-2 text-xs text-slate-300 hover:text-white hover:bg-slate-700/60"
                      >
                        {copiedId === bullet.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        {copiedId === bullet.id ? 'Copied' : 'Copy'}
                      </Button>
                    </div>
                    <p className="text-sm text-slate-100 leading-relaxed">{bullet.text}</p>
                    {bullet.ccarBreakdown && (
                      <div className="mt-3 pt-3 border-t border-slate-700/60 grid grid-cols-2 gap-2">
                        <div>
                          <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Context</p>
                          <p className="text-xs text-slate-300">{bullet.ccarBreakdown.context}</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Challenge</p>
                          <p className="text-xs text-slate-300">{bullet.ccarBreakdown.challenge}</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Action</p>
                          <p className="text-xs text-slate-300">{bullet.ccarBreakdown.action}</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Result</p>
                          <p className="text-xs text-slate-300">{bullet.ccarBreakdown.result}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Skills */}
              <div className="space-y-2">
                <p className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Highlighted OPM Skills</p>
                <div className="flex flex-wrap gap-2">
                  {result.keySkillsHighlighted.map((skill) => (
                    <Badge key={skill} variant="secondary" className="bg-blue-950/50 text-blue-300 border border-blue-500/30 px-3 py-1 font-mono text-[11px]">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Improvement Note */}
              <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30">
                <div className="flex items-start gap-2">
                  <Lightbulb className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-amber-300 mb-1">Improvement Tip</p>
                    <p className="text-xs text-slate-300 leading-relaxed">{result.improvementNote}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default RefinementWorkspace;
