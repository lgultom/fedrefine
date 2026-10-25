import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, FileCheck2, Award, BookOpen, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { SAMPLE_PRESETS } from '../data/presets';
import type { GSLevel } from '../types/refiner';

interface HeroProps {
  onPresetSelect: (rawText: string, positionTitle: string, gsLevel: GSLevel) => void;
}

export const Hero: React.FC<HeroProps> = ({ onPresetSelect }) => {
  const [selectedPreset, setSelectedPreset] = React.useState<string>('');

  const handlePreset = (id: string) => {
    const preset = SAMPLE_PRESETS.find((p) => p.id === id);
    if (!preset) return;
    setSelectedPreset(id);
    onPresetSelect(preset.rawText, preset.positionTitle, preset.gsLevel);
  };

  return (
    <section className="relative overflow-hidden border-b border-slate-800/80 bg-slate-950">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(37,99,235,0.15),transparent_60%)] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.08),transparent_70%)] blur-3xl pointer-events-none" />

      <div className="container relative py-16 md:py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Copy */}
          <div className="space-y-8 text-center lg:text-left">
            <Badge variant="outline" className="border-blue-500/40 text-blue-300 bg-blue-950/40 font-mono text-[10px] tracking-widest px-3 py-1">
              USAJOBS.GOV COMPLIANT · OPM CCAR
            </Badge>

            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Transform Plain Experience into{' '}
              <span className="bg-gradient-to-r from-blue-400 via-blue-300 to-indigo-400 bg-clip-text text-transparent">
                GS-Standard Federal Resume Bullets
              </span>
            </h1>

            <p className="text-lg text-slate-400 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Convert civilian or military work history into high-impact, OPM-compliant
              (CCAR format) bullets tailored for USAJOBS.gov applications — with automated
              strength scoring and skill extraction.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <Button size="lg" asChild className="bg-blue-600 hover:bg-blue-500 text-white shadow-xl shadow-blue-900/40">
                <Link to="/#refine">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Refine Your Bullet
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => handlePreset('preset-2210-gs13')}
                className="border-slate-700 bg-slate-900/60 text-slate-200 hover:bg-slate-800/60 hover:text-white"
              >
                Try a Sample
              </Button>
            </div>

            {/* Compliance badges */}
            <div className="flex flex-wrap gap-2 justify-center lg:justify-start pt-2">
              <Badge variant="secondary" className="bg-slate-800/80 text-slate-300 border border-slate-700/60 px-3 py-1 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                OPM CCAR Format
              </Badge>
              <Badge variant="secondary" className="bg-slate-800/80 text-slate-300 border border-slate-700/60 px-3 py-1 flex items-center gap-1.5">
                <FileCheck2 className="w-3.5 h-3.5 text-blue-400" />
                USAJOBS Ready
              </Badge>
              <Badge variant="secondary" className="bg-slate-800/80 text-slate-300 border border-slate-700/60 px-3 py-1 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-blue-400" />
                GS-Level Tailored
              </Badge>
              <Badge variant="secondary" className="bg-slate-800/80 text-slate-300 border border-slate-700/60 px-3 py-1 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-blue-400" />
                CCAR Guide
              </Badge>
            </div>
          </div>

          {/* Right: Decorative visual */}
          <div className="relative hidden lg:block">
            <div className="relative rounded-2xl border border-slate-700/60 bg-slate-900/60 backdrop-blur-xl p-6 shadow-2xl shadow-blue-950/50 overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(37,99,235,0.12),transparent_60%)]" />
              <div className="relative space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">OPM Strength</span>
                  <span className="text-2xl font-bold text-white">94</span>
                </div>
                <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div className="h-full w-[94%] rounded-full bg-gradient-to-r from-blue-500 to-indigo-400" />
                </div>
                <div className="space-y-2">
                  {[
                    { label: 'Context', value: 'Mission environment & GS scope', pct: 92 },
                    { label: 'Challenge', value: 'Statutory & operational constraints', pct: 88 },
                    { label: 'Action', value: 'Authoritative federal power verbs', pct: 95 },
                    { label: 'Result', value: 'Quantified mission impact', pct: 90 },
                  ].map((row) => (
                    <div key={row.label} className="flex items-center justify-between text-xs">
                      <span className="text-slate-300">{row.label}</span>
                      <span className="text-slate-400">{row.value}</span>
                      <span className="text-blue-300 font-mono">{row.pct}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Preset selector */}
        <div className="mt-16 max-w-4xl mx-auto">
          <h3 className="text-center text-sm font-semibold text-slate-300 uppercase tracking-widest mb-4">
            Try a Federal Series Sample
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {SAMPLE_PRESETS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => handlePreset(preset.id)}
                className={`group rounded-xl border p-4 text-left transition-all ${
                  selectedPreset === preset.id
                    ? 'border-blue-500/60 bg-blue-950/30 shadow-lg shadow-blue-900/20'
                    : 'border-slate-700/60 bg-slate-900/60 hover:border-blue-500/40 hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline" className="border-slate-600 text-slate-300 bg-slate-800/60 font-mono text-[10px]">
                    {preset.gsLevel}
                  </Badge>
                </div>
                <p className="text-sm font-semibold text-white group-hover:text-blue-300 transition-colors">
                  {preset.title}
                </p>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                  {preset.series}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
