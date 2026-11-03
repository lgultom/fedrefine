import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import {
  History,
  Download,
  Trash2,
  Copy,
  ChevronRight,
  Clock,
  ShieldCheck,
} from 'lucide-react';
import { getHistory, clearHistory } from '../services/refinerService';
import type { RefinementResult } from '../types/refiner';

interface HistoryPanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect?: (item: RefinementResult) => void;
}

export const HistoryPanel: React.FC<HistoryPanelProps> = ({ open, onOpenChange, onSelect }) => {
  const [items, setItems] = React.useState<RefinementResult[]>([]);

  // Load history on mount and when open changes
  React.useEffect(() => {
    setItems(getHistory());
  }, []);

  // Listen for storage changes from other tabs/windows
  React.useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'fedrefine_history_v1') {
        setItems(getHistory());
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleClear = () => {
    clearHistory();
    setItems([]);
  };

  const handleExport = (format: 'txt' | 'json') => {
    if (items.length === 0) return;
    const payload = format === 'txt'
      ? items.map((i) => `[${new Date(i.timestamp).toLocaleString()}] ${i.rawInput}\n→ ${i.federalBullets.map((b) => b.text).join('\n\n')}`).join('\n\n---\n\n')
      : JSON.stringify(items, null, 2);
    const blob = new Blob([payload], { type: format === 'txt' ? 'text/plain' : 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fedrefine-history-${Date.now()}.${format}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const copyAll = () => {
    navigator.clipboard.writeText(items.map((i) => i.rawInput).join('\n\n---\n\n'));
  };

  return (
    <div id="history-section" className="scroll-mt-20">
      <Card className="w-full max-w-2xl mx-auto border-slate-700/80 bg-slate-900/80 backdrop-blur-xl">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <History className="w-5 h-5 text-blue-400" />
              <div>
                <CardTitle className="text-lg font-bold text-white flex items-center gap-2">
                  <History className="w-4 h-4" />
                  Refinement History
                </CardTitle>
                <CardDescription className="text-xs text-slate-400">
                  Last 20 generated bullets (stored locally in your browser)
                </CardDescription>
              </div>
            </div>
            <div className="flex gap-1.5">
              <Button variant="ghost" size="sm" onClick={copyAll} title="Copy raw inputs">
                <Copy className="w-3.5 h-3.5" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => handleExport('txt')} title="Export TXT">
                <Download className="w-3.5 h-3.5" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => handleExport('json')} title="Export JSON">
                <Download className="w-3.5 h-3.5" />
              </Button>
              <Button variant="ghost" size="sm" onClick={handleClear} title="Clear history">
                <Trash2 className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          {items.length === 0 ? (
            <div className="py-10 text-center text-slate-500 text-sm">
              No refinements yet. Generate your first federal bullet point!
            </div>
          ) : (
            <div className="space-y-2 max-h-[520px] overflow-y-auto pr-1">
              {items.map((item) => (
                <div key={item.id} className="group rounded-lg border border-slate-700/60 bg-slate-800/60 hover:border-blue-500/40 transition-colors p-3">
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-2 min-w-[180px]">
                      <Badge variant="outline" className="border-blue-500/40 text-blue-300 bg-blue-950/40 font-mono text-[10px]">
                        {item.targetGS}
                      </Badge>
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {new Date(item.timestamp).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <span className="text-lg font-bold text-white">{item.strengthScore}</span>
                      <Badge variant="default" className="bg-blue-600 text-white text-[10px]">
                        <ShieldCheck className="w-3 h-3 mr-1" />
                        OPM
                      </Badge>
                    </div>
                  </div>
                  <p className="text-xs text-slate-300 line-clamp-2 mb-2 min-w-[220px]">
                    {item.rawInput}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {item.keySkillsHighlighted.slice(0, 3).map((s) => (
                        <Badge key={s} variant="secondary" className="bg-slate-700/60 text-slate-300 text-[10px]">
                          {s}
                        </Badge>
                      ))}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 px-2 text-xs text-slate-400 hover:text-white hover:bg-slate-700/60"
                      onClick={() => onSelect?.(item)}
                    >
                      <ChevronRight className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
