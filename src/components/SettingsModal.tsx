import React from 'react';
import { Settings, X, Palette, Zap, Eye, Calendar, Check } from 'lucide-react';
import { ThemePreset, ThemeColors } from '../types';
import { THEMES } from '../data/themes';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedThemeId: ThemePreset;
  onSelectTheme: (themeId: ThemePreset) => void;
  animationMode: 'to-today' | 'full-term';
  onSetAnimationMode: (mode: 'to-today' | 'full-term') => void;
  playbackSpeed: number;
  onSetPlaybackSpeed: (speed: number) => void;
  showSac: boolean;
  onToggleSac: () => void;
  dueDate: string;
  onOpenDueDateModal: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  selectedThemeId,
  onSelectTheme,
  animationMode,
  onSetAnimationMode,
  playbackSpeed,
  onSetPlaybackSpeed,
  showSac,
  onToggleSac,
  dueDate,
  onOpenDueDateModal,
}) => {
  if (!isOpen) return null;

  const currentTheme = THEMES[selectedThemeId] || THEMES['classic-purple'];

  const themeList: ThemePreset[] = [
    'classic-purple',
    'material-lavender',
    'material-peach',
    'material-sage',
    'material-blue',
    'oled-dark',
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-sm animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="settings-modal-title"
    >
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden text-slate-100 flex flex-col max-h-[90vh]">
        {/* Mobile drag handle */}
        <div className="sm:hidden w-10 h-1 bg-slate-700 rounded-full mx-auto my-3" />

        {/* Modal Header */}
        <div className="p-5 pb-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-300">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h2 id="settings-modal-title" className="text-base sm:text-lg font-bold text-white">
                App Settings
              </h2>
              <p className="text-xs text-slate-400">
                Personalize theme colors and growth animation options
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-xl bg-slate-800/80 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
            aria-label="Close settings"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-6 overflow-y-auto">
          {/* Section 1: Color Palette Selection */}
          <div className="space-y-2.5">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
              <Palette className="w-4 h-4 text-purple-400" />
              <span>Color Theme Palette</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {themeList.map((preset) => {
                const item = THEMES[preset];
                const isSelected = selectedThemeId === preset;
                return (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => onSelectTheme(preset)}
                    className={`p-2.5 rounded-xl border flex items-center gap-2.5 text-left transition-all active:scale-95 ${
                      isSelected
                        ? 'bg-slate-800 border-white ring-1 ring-purple-500/50 shadow-md'
                        : 'bg-slate-950/70 border-slate-800 hover:border-slate-700 text-slate-300'
                    }`}
                  >
                    <span
                      className="w-5 h-5 rounded-full shrink-0 border border-white/20 shadow-sm"
                      style={{ backgroundColor: item.accent }}
                    />
                    <span className="text-xs font-medium text-white truncate flex-1">
                      {item.name}
                    </span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-purple-400 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 2: Animation Playback Options */}
          <div className="space-y-3 pt-4 border-t border-slate-800">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Animation Options</span>
            </div>

            {/* Animation Target Mode */}
            <div className="space-y-1.5">
              <span className="text-[11px] text-slate-400 block">Animation Target</span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => onSetAnimationMode('to-today')}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all text-left ${
                    animationMode === 'to-today'
                      ? 'bg-purple-900/50 border border-purple-500/50 text-purple-200'
                      : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <div>To Current Stage</div>
                  <div className="text-[10px] text-slate-400 font-normal">Stops at today's age</div>
                </button>
                <button
                  type="button"
                  onClick={() => onSetAnimationMode('full-term')}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all text-left ${
                    animationMode === 'full-term'
                      ? 'bg-purple-900/50 border border-purple-500/50 text-purple-200'
                      : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <div>Full 40 Weeks</div>
                  <div className="text-[10px] text-slate-400 font-normal">Full pregnancy span</div>
                </button>
              </div>
            </div>

            {/* Playback Speed */}
            <div className="space-y-1.5">
              <span className="text-[11px] text-slate-400 block">Growth Speed</span>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { speed: 1, label: '1x (Smooth)' },
                  { speed: 2, label: '2x (Brisk)' },
                  { speed: 4, label: '4x (Rapid)' },
                ].map(({ speed, label }) => (
                  <button
                    key={speed}
                    type="button"
                    onClick={() => onSetPlaybackSpeed(speed)}
                    className={`py-2 px-2 rounded-xl text-xs font-semibold transition-all ${
                      playbackSpeed === speed
                        ? 'bg-purple-900/60 border border-purple-500/50 text-white'
                        : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Section 3: Anatomical Display */}
          <div className="space-y-2 pt-4 border-t border-slate-800">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
              <Eye className="w-4 h-4 text-cyan-400" />
              <span>Anatomy Display</span>
            </div>
            <button
              type="button"
              onClick={onToggleSac}
              className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs transition-colors hover:border-slate-700"
            >
              <div className="text-left">
                <div className="font-semibold text-white">Gestational Sac Outline</div>
                <div className="text-[11px] text-slate-400">Shows maternal womb and sac boundary</div>
              </div>
              <div
                className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-1 ${
                  showSac ? 'bg-purple-600' : 'bg-slate-700'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white transition-transform ${
                    showSac ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </div>
            </button>
          </div>

          {/* Section 4: Due Date */}
          <div className="pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenDueDateModal();
              }}
              className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 flex items-center justify-between text-xs transition-colors text-left"
            >
              <div className="flex items-center gap-2.5">
                <Calendar className="w-4 h-4 text-purple-400" />
                <div>
                  <div className="font-semibold text-white">Estimated Due Date</div>
                  <div className="text-[11px] text-slate-400 font-mono">{dueDate}</div>
                </div>
              </div>
              <span className="text-purple-400 font-semibold">Change</span>
            </button>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
          <a
            href="https://ko-fi.com/leimapapa"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
          >
            Support me
          </a>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl text-xs font-bold text-white shadow-md active:scale-95 transition-transform"
            style={{ backgroundColor: currentTheme.accent }}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
