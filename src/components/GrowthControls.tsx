import React from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { ThemeColors } from '../types';

interface GrowthControlsProps {
  progressValue: number; // 0 to 252
  todayProgressValue: number; // 0 to 252
  currentWeek: number; // 4 to 40
  todayWeek: number;
  isPlaying: boolean;
  theme: ThemeColors;
  onStartAnimateToToday: () => void;
  onTogglePlay: () => void;
  onProgressChange: (val: number) => void;
  onPrevWeek: () => void;
  onNextWeek: () => void;
}

export const GrowthControls: React.FC<GrowthControlsProps> = ({
  progressValue,
  todayProgressValue,
  currentWeek,
  todayWeek,
  isPlaying,
  theme,
  onStartAnimateToToday,
  onTogglePlay,
  onProgressChange,
  onPrevWeek,
  onNextWeek,
}) => {
  // Percentage position of "Today" on the slider
  const todayMarkerPercent = Math.min(100, Math.max(0, (todayProgressValue / 252) * 100));

  return (
    <div className="w-full max-w-full overflow-hidden bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-4 sm:p-5 shadow-xl space-y-3.5">
      {/* Primary Animation Action Row */}
      <div className="flex items-center gap-2 w-full">
        {/* Main "Animate Growth to Today" Button */}
        <button
          type="button"
          onClick={onStartAnimateToToday}
          className="flex-1 min-w-0 min-h-[48px] px-3 sm:px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold text-white shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2 group border border-white/20 truncate"
          style={{ backgroundColor: theme.accent }}
          title={`Animate growth from conception to Week ${todayWeek}`}
        >
          <Sparkles className="w-4 h-4 text-white shrink-0 group-hover:rotate-12 transition-transform" />
          <span className="truncate">
            {isPlaying
              ? `Growing to Week ${todayWeek}...`
              : `Animate Growth to Today (Week ${todayWeek})`}
          </span>
        </button>

        {/* Play / Pause toggle */}
        <button
          type="button"
          onClick={onTogglePlay}
          className="min-h-[48px] min-w-[48px] rounded-2xl bg-slate-800 hover:bg-slate-700 border border-slate-700 flex items-center justify-center text-white transition-all active:scale-95 shadow-sm shrink-0"
          aria-label={isPlaying ? 'Pause animation' : 'Resume animation'}
          title={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? (
            <Pause className="w-4 h-4 fill-current" />
          ) : (
            <Play className="w-4 h-4 fill-current ml-0.5" />
          )}
        </button>

        {/* Replay button */}
        <button
          type="button"
          onClick={onStartAnimateToToday}
          className="min-h-[48px] min-w-[48px] rounded-2xl bg-slate-800 hover:bg-slate-700 border border-slate-700 flex items-center justify-center text-slate-300 hover:text-white transition-all active:scale-95 shrink-0"
          aria-label="Replay growth from week 4"
          title="Replay from Week 4"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Week Scrubber Slider with Steppers */}
      <div className="space-y-1.5 w-full max-w-full">
        <div className="flex items-center justify-between text-xs text-slate-400 px-0.5">
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400">Scrubbing:</span>
            <span className="text-white font-bold tabular-nums">Week {currentWeek}</span>
          </div>

          <div className="flex items-center gap-1.5 text-[11px]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-slate-300">Today: Week {todayWeek}</span>
          </div>
        </div>

        {/* Stepper + Slider Row */}
        <div className="flex items-center gap-2 w-full max-w-full">
          {/* Previous Week Stepper */}
          <button
            type="button"
            onClick={onPrevWeek}
            disabled={currentWeek <= 4}
            className="min-h-[44px] min-w-[44px] rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:hover:bg-slate-800 border border-slate-700/80 flex items-center justify-center text-slate-200 transition-colors shrink-0"
            aria-label="Previous week"
            title="Step back 1 week"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Continuous Range Scrubber */}
          <div className="relative flex-1 py-1 flex items-center min-w-0">
            <div className="w-full relative">
              <input
                type="range"
                min={0}
                max={252}
                step={1}
                value={progressValue}
                onChange={(e) => onProgressChange(Number(e.target.value))}
                className="w-full h-2.5 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-purple-500 focus:outline-none"
                aria-label="Gestational progress scrubber (Week 4 to Week 40)"
              />

              {/* Today's marker tick indicator on the timeline */}
              <div
                className="absolute top-0 bottom-0 pointer-events-none flex flex-col items-center -translate-x-1/2"
                style={{ left: `${todayMarkerPercent}%` }}
                title={`Today's Stage: Week ${todayWeek}`}
              >
                <div className="w-1.5 h-3 bg-emerald-400 rounded-full shadow-md -mt-0.5" />
              </div>
            </div>
          </div>

          {/* Next Week Stepper */}
          <button
            type="button"
            onClick={onNextWeek}
            disabled={currentWeek >= 40}
            className="min-h-[44px] min-w-[44px] rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:hover:bg-slate-800 border border-slate-700/80 flex items-center justify-center text-slate-200 transition-colors shrink-0"
            aria-label="Next week"
            title="Step forward 1 week"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Compact Timeline Landmarks */}
        <div className="flex justify-between items-center text-[10px] text-slate-500 px-1 font-mono">
          <span>W4 Conception</span>
          <span>W20 Midpoint</span>
          <span>W40 Full Term</span>
        </div>
      </div>
    </div>
  );
};
