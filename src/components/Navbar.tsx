import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Settings, History, Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';

interface NavbarProps {
  onOpenSettings: () => void;
  onOpenHistory: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSettings, onOpenHistory }) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const navContent = (
    <>
      <div className="flex items-center gap-2">
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
      </div>

      <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
        <Link to="/" className="text-white hover:text-blue-300 transition-colors">
          Refine
        </Link>
        <a
          href="https://microtoolsuite.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-slate-300 hover:text-blue-300 transition-colors"
        >
          MicroToolSuite
        </a>
      </nav>
    </>
  );

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between">
        {navContent}

        <div className="hidden md:flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onOpenHistory}
            className="text-slate-300 hover:text-white hover:bg-slate-800/60"
          >
            <History className="w-4 h-4 mr-2" />
            History
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onOpenSettings}
            className="text-slate-300 hover:text-white hover:bg-slate-800/60"
          >
            <Settings className="w-4 h-4 mr-2" />
            Engine
          </Button>
          <Badge className="ml-2 bg-blue-600/20 text-blue-300 border border-blue-500/40 font-mono text-[10px]">
            BETA
          </Badge>
          <Button asChild size="sm" className="ml-2 bg-blue-600 hover:bg-blue-500 text-white">
            <a href="https://microtoolsuite.com" target="_blank" rel="noopener noreferrer">
              Main Domain
            </a>
          </Button>
        </div>

        <div className="flex md:hidden items-center gap-2">
          <Button variant="ghost" size="sm" onClick={onOpenHistory} className="text-slate-300">
            <History className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={onOpenSettings} className="text-slate-300">
            <Settings className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setMobileOpen(!mobileOpen)} className="text-slate-300">
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-slate-800/80 bg-slate-950/95 backdrop-blur-xl px-4 py-4 space-y-3">
          <Link to="/" className="block text-slate-200 hover:text-blue-300 transition-colors py-2">
            Refine
          </Link>
          <a
            href="https://microtoolsuite.com"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-slate-200 hover:text-blue-300 transition-colors py-2"
          >
            MicroToolSuite
          </a>
          <Separator className="bg-slate-800" />
          <Button variant="outline" size="sm" className="w-full border-slate-700 text-slate-200 hover:bg-slate-800/60">
            <History className="w-4 h-4 mr-2" />
            History
          </Button>
          <Button variant="outline" size="sm" className="w-full border-slate-700 text-slate-200 hover:bg-slate-800/60">
            <Settings className="w-4 h-4 mr-2" />
            Engine Settings
          </Button>
        </div>
      )}
    </header>
  );
};

export default Navbar;
