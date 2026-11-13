import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Menu, X, Sparkles, KeyRound, ExternalLink, HelpCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { hasActiveLicense } from '../services/licenseService';

interface NavbarProps {
  onOpenSettings: () => void;
  onOpenHistory: () => void;
  onOpenPricing: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenSettings,
  onOpenHistory,
  onOpenPricing,
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isPro, setIsPro] = useState(false);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    setIsPro(hasActiveLicense());
  }, []);

  const navContent = (
    <>
      <Link to="/" className="flex items-center gap-2 cursor-pointer">
        <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-900/50">
          <ShieldCheck className="w-5 h-5" />
        </span>
        <div className="flex flex-col leading-tight">
          <span className="text-lg font-bold tracking-tight text-white">
            MicroToolSuite
          </span>
          <span className="text-[10px] font-semibold tracking-widest text-blue-400 uppercase">
            FedRefine
          </span>
        </div>
      </Link>

      <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
        <button
          type="button"
          onClick={() => scrollToSection('refine-section')}
          className="text-white hover:text-blue-300 transition-colors"
        >
          Refine
        </button>
        <button
          type="button"
          onClick={() => scrollToSection('history-section')}
          className="text-slate-300 hover:text-blue-300 transition-colors flex items-center gap-1.5"
        >
          History
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
        </button>
        <button
          type="button"
          onClick={onOpenSettings}
          className="text-slate-300 hover:text-blue-300 transition-colors flex items-center gap-1.5"
        >
          Engine
          <Badge className="ml-1 bg-blue-600/20 text-blue-300 border border-blue-500/40 font-mono text-[10px]">
            BETA
          </Badge>
        </button>
        <button
          type="button"
          onClick={() => scrollToSection('faq-section')}
          className="text-slate-300 hover:text-blue-300 transition-colors flex items-center gap-1.5"
        >
          FAQ
          <HelpCircle className="w-3.5 h-3.5" />
        </button>
      </nav>
    </>
  );

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between">
        {navContent}

        <div className="hidden md:flex items-center gap-2">
          {/* Upgrade Pro CTA button */}
          <Button
            variant="outline"
            size="sm"
            onClick={onOpenPricing}
            className={`border-blue-500/40 text-blue-300 hover:text-white hover:bg-blue-950/50 transition-all ${
              isPro ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300' : 'bg-blue-950/30'
            }`}
          >
            {isPro ? (
              <>
                <KeyRound className="w-3.5 h-3.5 mr-1.5 text-emerald-400" />
                Pro Active
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5 mr-1.5 text-blue-400" />
                Upgrade Pro
              </>
            )}
          </Button>

          {/* Explore Suite external link */}
                    <Button asChild size="sm" className="ml-2 bg-blue-600 hover:bg-blue-500 text-white">
                      <a href="https://microtoolsuite.com" target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-3.5 h-3.5 mr-1.5" />
                        Explore Suite
                      </a>
                    </Button>
        </div>

        <div className="flex md:hidden items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onOpenPricing}
            className="border-blue-500/40 text-blue-300 bg-blue-950/40 text-xs px-2.5 h-8"
          >
            <Sparkles className="w-3.5 h-3.5 mr-1 text-blue-400" />
            {isPro ? 'Pro' : 'Upgrade Pro'}
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setMobileOpen(!mobileOpen)} className="text-slate-300 px-2">
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-slate-800/80 bg-slate-950/95 backdrop-blur-xl px-4 py-4 space-y-3">

          <button
            type="button"
            onClick={() => {
              setMobileOpen(false);
              scrollToSection('refine-section');
            }}
            className="w-full text-left text-slate-200 hover:text-blue-300 transition-colors py-2"
          >
            Refine
          </button>
          <button
            type="button"
            onClick={() => {
              setMobileOpen(false);
              scrollToSection('history-section');
            }}
            className="w-full text-left text-slate-200 hover:text-blue-300 transition-colors py-2 flex items-center justify-between"
          >
            <span>History</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setMobileOpen(false);
              onOpenSettings();
            }}
            className="w-full text-left text-slate-200 hover:text-blue-300 transition-colors py-2 flex items-center justify-between"
          >
            <span>Engine (BETA)</span>
            <Badge className="bg-blue-600/30 text-blue-300 border border-blue-500/40 text-[10px]">
              BETA
            </Badge>
          </button>
          <button
            type="button"
            onClick={() => {
              setMobileOpen(false);
              scrollToSection('faq-section');
            }}
            className="w-full text-left text-slate-200 hover:text-blue-300 transition-colors py-2 flex items-center justify-between"
          >
            <span>FAQ</span>
            <HelpCircle className="w-4 h-4" />
          </button>
          <a
            href="https://microtoolsuite.com"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-slate-200 hover:text-blue-300 transition-colors py-2 flex items-center gap-2"
          >
            <ExternalLink className="w-4 h-4" />
            Explore Suite
          </a>
          <Separator className="bg-slate-800" />
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setMobileOpen(false);
              onOpenPricing();
            }}
            className="w-full border-blue-500/50 bg-blue-950/40 text-blue-300 hover:bg-blue-900/40 mb-2"
          >
            <Sparkles className="w-4 h-4 mr-2 text-blue-400" />
            {isPro ? 'Manage Pro License' : 'Upgrade to Pro'}
          </Button>
        </div>
      )}
    </header>
  );
};

export default Navbar;
