import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { RefinementWorkspace } from '../components/RefinementWorkspace';
import { CCARGuideModal } from '../components/CCARGuideModal';
import { WebhookSettings } from '../components/WebhookSettings';
import { HistoryPanel } from '../components/HistoryPanel';
import { PricingModal } from '../components/PricingModal';
import { refineFederalBullet } from '../services/refinerService';
import type { GSLevel, RefinementResult } from '../types/refiner';

const Index: React.FC = () => {
  const [rawExperience, setRawExperience] = React.useState('');
  const [targetPosition, setTargetPosition] = React.useState('');
  const [targetGS, setTargetGS] = React.useState<GSLevel>('GS-13');
  const [isLoading, setIsLoading] = React.useState(false);
  const [result, setResult] = React.useState<RefinementResult | null>(null);
  const [errorNotice, setErrorNotice] = React.useState<string | null>(null);

  // Modals
  const [ccarOpen, setCCarOpen] = React.useState(false);
  const [settingsOpen, setSettingsOpen] = React.useState(false);
  const [historyOpen, setHistoryOpen] = React.useState(false);
  const [pricingOpen, setPricingOpen] = React.useState(false);

  const handleRefine = async () => {
    if (rawExperience.trim().length < 10) return;
    setIsLoading(true);
    setErrorNotice(null);
    try {
      const response = await refineFederalBullet(
        {
          rawExperience: rawExperience.trim(),
          targetPosition: targetPosition.trim() || undefined,
          targetGS: targetGS,
        },
        'simulator'
      );
      setResult(response.result);
      if (response.errorNotice) {
        setErrorNotice(response.errorNotice);
      }
    } catch (err: any) {
      setErrorNotice(err.message || 'Refinement failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text).catch(() => {});
  };

  const handleHistorySelect = (item: RefinementResult) => {
    setRawExperience(item.rawInput);
    setTargetPosition(item.targetRole);
    setTargetGS(item.targetGS);
    setResult(item);
    setHistoryOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Navbar
        onOpenSettings={() => setSettingsOpen(true)}
        onOpenHistory={() => setHistoryOpen(true)}
        onOpenPricing={() => setPricingOpen(true)}
      />

      <main className="flex-1">
        <Hero
          onPresetSelect={(rawText, positionTitle, gsLevel) => {
            setRawExperience(rawText);
            setTargetPosition(positionTitle);
            setTargetGS(gsLevel);
          }}
        />

        <section className="container py-12 md:py-16">
          <RefinementWorkspace
            rawExperience={rawExperience}
            setRawExperience={setRawExperience}
            targetPosition={targetPosition}
            setTargetPosition={setTargetPosition}
            targetGS={targetGS}
            setTargetGS={setTargetGS}
            isLoading={isLoading}
            result={result}
            errorNotice={errorNotice}
            onRefine={handleRefine}
            onCopy={handleCopy}
          />
        </section>
      </main>

      <footer className="border-t border-slate-800/80 bg-slate-950/80">
        <div className="container py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <ShieldCheck className="w-4 h-4 text-blue-400" />
            <span>© {new Date().getFullYear()} MicroToolSuite — FedRefine. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-4 text-sm text-slate-400">
            <a
              href="https://microtoolsuite.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-300 transition-colors"
            >
              Main Domain
            </a>
            <a
              href="mailto:support@microtoolsuite.com"
              className="hover:text-blue-300 transition-colors"
            >
              Support
            </a>
            <button
              type="button"
              onClick={() => setCCarOpen(true)}
              className="text-slate-300 hover:text-white hover:bg-slate-800/60 px-3 py-1.5 rounded-md text-sm font-medium transition-colors"
            >
              CCAR Guide
            </button>
          </div>
        </div>
      </footer>

      <PricingModal open={pricingOpen} onOpenChange={setPricingOpen} />
      <CCARGuideModal open={ccarOpen} onOpenChange={setCCarOpen} />
      <WebhookSettings open={settingsOpen} onOpenChange={setSettingsOpen} />
      <HistoryPanel
        open={historyOpen}
        onOpenChange={setHistoryOpen}
        onSelect={handleHistorySelect}
      />
    </div>
  );
};

export default Index;