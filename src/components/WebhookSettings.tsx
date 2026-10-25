import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import {
  Settings,
  Webhook,
  Save,
  CheckCircle2,
  Loader2,
} from 'lucide-react';
import {
  getStoredEngineMode,
  setStoredEngineMode,
  getStoredWebhookUrl,
  setStoredWebhookUrl,
} from '../services/refinerService';

interface WebhookSettingsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const WebhookSettings: React.FC<WebhookSettingsProps> = ({ open, onOpenChange }) => {
  const [url, setUrl] = React.useState(getStoredWebhookUrl());
  const [mode, setMode] = React.useState<'simulator' | 'webhook'>(getStoredEngineMode());
  const [saving, setSaving] = React.useState(false);
  const [savedNotice, setSavedNotice] = React.useState(false);

  React.useEffect(() => {
    if (!open) return;
    setUrl(getStoredWebhookUrl());
    setMode(getStoredEngineMode());
    setSavedNotice(false);
  }, [open]);

  const handleSave = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 350));
    setStoredWebhookUrl(url.trim());
    setStoredEngineMode(mode);
    setSaving(false);
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2500);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-slate-900 border-slate-700/80 text-slate-100 shadow-2xl p-6">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-2 rounded-lg bg-blue-600/20 text-blue-400 border border-blue-500/30">
              <Settings className="w-5 h-5" />
            </span>
            <DialogTitle className="text-2xl font-bold tracking-tight">
              Refinement Engine Settings
            </DialogTitle>
          </div>
          <DialogDescription className="text-sm text-slate-400">
            Choose how FedRefine generates federal resume bullets. The built-in OPM CCAR engine is always available as a fallback.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 my-4">
          <Label className="text-sm font-semibold flex items-center gap-2">
            <Webhook className="w-4 h-4" />
            Generation Mode
          </Label>
          <div className="flex gap-2 p-3 rounded-lg bg-slate-800/60 border border-slate-700/60">
            <button
              type="button"
              onClick={() => setMode('simulator')}
              className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                mode === 'simulator'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40'
                  : 'bg-slate-700/60 text-slate-300 hover:bg-slate-600/60'
              }`}
            >
              Built-in OPM AI
            </button>
            <button
              type="button"
              onClick={() => setMode('webhook')}
              className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                mode === 'webhook'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40'
                  : 'bg-slate-700/60 text-slate-300 hover:bg-slate-600/60'
              }`}
            >
              n8n Webhook
            </button>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            The built-in engine simulates realistic OPM CCAR generation instantly. The webhook mode forwards your raw experience to an external n8n workflow for server-side processing — useful when you want to route refinement through your own automation pipeline.
          </p>
        </div>

        <Separator className="my-4" />

        <div className="space-y-2 my-4">
          <Label className="text-sm font-semibold flex items-center gap-2">
            <Webhook className="w-4 h-4" />
            n8n Webhook URL (optional)
          </Label>
          <Input
                      placeholder="http://localhost:5678/webhook/fedrefine-process"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      className="bg-slate-800/70 border-slate-700 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    />
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Leave empty to use the default n8n production webhook. Your URL is saved locally so it persists across sessions.
                    </p>
        </div>

        <Separator className="my-4" />

        <Button onClick={handleSave} disabled={saving} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold shadow-lg shadow-blue-900/30">
          {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <><Save className="w-4 h-4 mr-2" /> Save Settings</>}
        </Button>

        {savedNotice && (
          <div className="mt-3 flex items-start gap-2 p-3 rounded-lg bg-emerald-950/30 border border-emerald-500/30 text-xs text-emerald-300">
            <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" />
            <span>Settings saved to local storage.</span>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};