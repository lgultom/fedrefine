import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import {
  Check,
  Zap,
  KeyRound,
  ShieldCheck,
  Sparkles,
  Clock,
  Infinity,
  CheckCircle2,
  Trash2,
  ExternalLink,
} from 'lucide-react';
import {
  getStoredLicenseKey,
  saveLicenseKey,
  clearStoredLicenseKey,
  hasActiveLicense,
} from '../services/licenseService';

interface PricingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onLicenseUpdated?: (hasLicense: boolean) => void;
}

export const PricingModal: React.FC<PricingModalProps> = ({
  open,
  onOpenChange,
  onLicenseUpdated,
}) => {
  const [licenseInput, setLicenseInput] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const [activeLicense, setActiveLicense] = useState<string>('');

  useEffect(() => {
    if (open) {
      const stored = getStoredLicenseKey();
      setActiveLicense(stored);
      setLicenseInput(stored);
      setIsSaved(false);

      // Trigger Gumroad iframe overlay re-initialization if available
      if (typeof window !== 'undefined' && (window as any).GumroadOverlay) {
        try {
          (window as any).GumroadOverlay.init();
        } catch {
          // ignore
        }
      }
    }
  }, [open]);

  const handleSaveLicense = (e: React.FormEvent) => {
    e.preventDefault();
    const success = saveLicenseKey(licenseInput);
    if (success) {
      setActiveLicense(licenseInput.trim());
      setIsSaved(true);
      onLicenseUpdated?.(true);
      setTimeout(() => setIsSaved(false), 3000);
    }
  };

  const handleClearLicense = () => {
    clearStoredLicenseKey();
    setActiveLicense('');
    setLicenseInput('');
    setIsSaved(false);
    onLicenseUpdated?.(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[92vh] overflow-y-auto bg-slate-900 border-slate-700/80 text-slate-100 shadow-2xl p-6 sm:p-8">
        <DialogHeader className="text-center sm:text-center space-y-2">
          <div className="flex justify-center">
            <span className="p-2.5 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30 inline-flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-400" />
              <Badge variant="outline" className="border-blue-500/40 text-blue-300 bg-blue-950/40 font-mono text-[11px]">
                UPGRADE TO PRO
              </Badge>
            </span>
          </div>
          <DialogTitle className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Supercharge Your Federal Resume
          </DialogTitle>
          <DialogDescription className="text-slate-400 text-sm max-w-lg mx-auto">
            Get unlimited OPM CCAR refinements, priority n8n pipeline compute, executive GS-14/15 styling, and direct exports.
          </DialogDescription>
        </DialogHeader>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
          {/* Plan 1: 7-Day Pass */}
          <div className="relative rounded-2xl border border-slate-700/80 bg-slate-800/60 p-5 flex flex-col justify-between hover:border-slate-600 transition-all">
            <div>
              <div className="flex items-center justify-between mb-3">
                <Badge variant="outline" className="border-slate-600 text-slate-300 bg-slate-900/60 font-mono text-xs">
                  <Clock className="w-3 h-3 mr-1" /> 7-DAY ACCESS
                </Badge>
                <span className="text-xs text-slate-400">One-time pass</span>
              </div>

              <h3 className="text-xl font-bold text-white mb-1">7-Day Pass</h3>
              <p className="text-xs text-slate-400 mb-4">
                Perfect for targeted USAJOBS application deadlines and quick polish.
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
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>TXT & JSON history bulk export</span>
                </li>
              </ul>
            </div>

            {/* Gumroad Overlay Button 1 */}
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

          {/* Plan 2: Pro Monthly */}
          <div className="relative rounded-2xl border-2 border-blue-500/80 bg-gradient-to-b from-blue-950/40 via-slate-800/80 to-slate-900/90 p-5 flex flex-col justify-between shadow-xl shadow-blue-950/50">
            <div className="absolute -top-3 right-5">
              <Badge className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold text-[11px] px-2.5 py-0.5 shadow-md">
                MOST POPULAR
              </Badge>
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <Badge variant="outline" className="border-blue-400/40 text-blue-300 bg-blue-950/60 font-mono text-xs">
                  <Infinity className="w-3 h-3 mr-1" /> UNLIMITED PRO
                </Badge>
                <span className="text-xs text-blue-300 font-medium">Billed monthly</span>
              </div>

              <h3 className="text-xl font-bold text-white mb-1">Pro Monthly</h3>
              <p className="text-xs text-slate-300 mb-4">
                Full continuous access for active federal job seekers & military transitions.
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
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>CCAR Framework guide modal & audit rubrics</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Priority email support & feature updates</span>
                </li>
              </ul>
            </div>

            {/* Gumroad Overlay Button 2 */}
            <a
              className="gumroad-button w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-blue-900/40 transition-all text-center"
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

        <Separator className="bg-slate-800" />

        {/* License Key Section */}
        <div className="mt-6 rounded-2xl bg-slate-800/40 border border-slate-700/60 p-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-blue-500/20 text-blue-300">
                <KeyRound className="w-4 h-4" />
              </span>
              <div>
                <h4 className="text-sm font-semibold text-white">Have a Gumroad License Key?</h4>
                <p className="text-xs text-slate-400">
                  Enter your key received via email after purchase to activate Pro status.
                </p>
              </div>
            </div>

            {activeLicense && (
              <Badge className="self-start sm:self-center bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 text-[11px]">
                <CheckCircle2 className="w-3 h-3 mr-1" />
                License Active
              </Badge>
            )}
          </div>

          <form onSubmit={handleSaveLicense} className="flex flex-col sm:flex-row gap-2 mt-3">
            <Input
              type="text"
              placeholder="e.g. 8C6B148F-72DF44C0-8B237C51-XXXXXXXX"
              value={licenseInput}
              onChange={(e) => setLicenseInput(e.target.value)}
              className="flex-1 bg-slate-900/80 border-slate-700 text-slate-100 placeholder:text-slate-500 font-mono text-xs focus:ring-blue-500/50"
            />
            <div className="flex gap-2">
              <Button
                type="submit"
                disabled={!licenseInput.trim()}
                className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-4"
              >
                Save License
              </Button>
              {activeLicense && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClearLicense}
                  className="border-slate-700 text-slate-400 hover:text-red-400 hover:bg-red-950/20 text-xs px-3"
                  title="Remove saved license"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              )}
            </div>
          </form>

          {isSaved && (
            <div className="flex items-center gap-2 mt-2 text-xs text-emerald-400 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5" />
              License Key successfully saved to your browser!
            </div>
          )}

          <p className="text-[11px] text-slate-500 mt-2">
            Your key is safely stored in your browser's localStorage. You can find it in your Gumroad receipt or library.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PricingModal;
