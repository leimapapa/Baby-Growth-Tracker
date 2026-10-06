import React from 'react';
import { WeekDetail, ThemeColors } from '../types';
import { BabySvg } from './BabySvg';
import { FruitIcon } from './FruitIcon';
import { TrimesterPieChart } from './TrimesterPieChart';
import { X, Sparkles, Ruler, Weight, Calendar, Heart } from 'lucide-react';

interface MilestoneCardProps {
  isOpen: boolean;
  onClose: () => void;
  weekDetail: WeekDetail;
  daysRemaining: number;
  totalGestationalDays: number;
  dueDate: string;
  theme: ThemeColors;
}

export const MilestoneCard: React.FC<MilestoneCardProps> = ({
  isOpen,
  onClose,
  weekDetail,
  daysRemaining,
  totalGestationalDays,
  dueDate,
  theme,
}) => {
  if (!isOpen) return null;

  const currentWeek = weekDetail.week;
  const daysInCurrentWeek = totalGestationalDays % 7;
  const progressPercent = Math.min(100, Math.max(0, ((totalGestationalDays - 28) / 252) * 100));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden text-slate-100 flex flex-col max-h-[90vh]">
        {/* Header with background glow */}
        <div className="relative p-6 pb-4 border-b border-slate-800 flex items-start justify-between">
          <div
            className="absolute top-0 left-0 w-32 h-32 rounded-full blur-3xl pointer-events-none opacity-40"
            style={{ backgroundColor: theme.accent }}
          />

          <div className="relative z-10 flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/20 border border-purple-400/30 flex items-center justify-center text-purple-300">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-white">
                  Week {currentWeek} Development
                </h3>
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center border border-white/20 bg-white/10 backdrop-blur-md shadow-sm shrink-0"
                  title={`Trimester ${weekDetail.trimester}`}
                >
                  <TrimesterPieChart
                    trimester={weekDetail.trimester}
                    accentColor={theme.accent}
                    size={22}
                  />
                </div>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Day {totalGestationalDays} of 280 (Week {currentWeek}, Day {daysInCurrentWeek})
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="relative z-10 w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          {/* Fetal SVG Illustration Showcase */}
          <div className="relative w-full rounded-2xl bg-black/40 border border-slate-800 p-4 flex items-center justify-center">
            <div className="w-48 h-48">
              <BabySvg
                progressValue={totalGestationalDays - 28}
                week={currentWeek}
                babyColor={theme.babyFill}
                sacColor={theme.sacFill}
                glow={true}
              />
            </div>
          </div>

          {/* Fruit Size Comparison Banner */}
          <div className="p-4 rounded-2xl bg-purple-950/40 border border-purple-800/40 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-purple-600/30 border border-purple-500/30 flex items-center justify-center shrink-0 shadow-inner">
              <FruitIcon week={currentWeek} size={30} className="w-7.5 h-7.5" />
            </div>
            <div>
              <div className="text-xs uppercase font-bold tracking-wider text-purple-300">
                Fruit Size Comparison
              </div>
              <div className="text-base font-bold text-white mt-0.5">
                Size of {weekDetail.fruitName}
              </div>
            </div>
          </div>

          {/* Key Measurements Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60">
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <Ruler className="w-3.5 h-3.5 text-blue-400" />
                <span>Estimated Length</span>
              </div>
              <div className="text-base font-bold text-white mt-1 tabular-nums">
                {weekDetail.lengthCm}{' '}
                <span className="text-xs font-normal text-slate-400">({weekDetail.lengthIn})</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60">
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <Weight className="w-3.5 h-3.5 text-amber-400" />
                <span>Estimated Weight</span>
              </div>
              <div className="text-base font-bold text-white mt-1 tabular-nums">
                {weekDetail.weightG}{' '}
                <span className="text-xs font-normal text-slate-400">({weekDetail.weightOz})</span>
              </div>
            </div>
          </div>

          {/* Milestone Details */}
          <div className="p-4 rounded-2xl bg-slate-800/40 border border-slate-700/60 space-y-2">
            <div className="flex items-center gap-2 text-sm font-bold text-white">
              <Heart className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{weekDetail.milestoneTitle}</span>
            </div>
            <p className="text-xs leading-relaxed text-slate-300">
              {weekDetail.milestoneDesc}
            </p>
          </div>

          {/* Countdown & Due Date */}
          <div className="p-3.5 rounded-2xl bg-slate-800/30 border border-slate-700/40 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-slate-400">
              <Calendar className="w-4 h-4 text-purple-400" />
              <span>Due Date: <strong className="text-white">{dueDate}</strong></span>
            </div>
            <div className="font-semibold text-purple-300">
              {daysRemaining > 0 ? `${daysRemaining} days remaining` : 'Full Term!'}
            </div>
          </div>

          {/* Progress Bar */}
          <div>
            <div className="flex justify-between items-center text-xs text-slate-400 mb-1.5">
              <span>Overall Pregnancy Progress</span>
              <span className="font-bold text-white tabular-nums">{Math.round(progressPercent)}%</span>
            </div>
            <div className="w-full h-2.5 rounded-full bg-slate-800 border border-slate-700 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${progressPercent}%`,
                  backgroundColor: theme.accent,
                }}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow-md transition-all active:scale-95"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
};
