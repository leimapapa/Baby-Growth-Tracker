import React from 'react';
import { WeekDetail, ThemeColors } from '../types';
import { BabySvg } from './BabySvg';
import { FruitIcon } from './FruitIcon';
import { TrimesterPieChart } from './TrimesterPieChart';
import { Ruler, Weight, Calendar, Heart, RotateCcw } from 'lucide-react';

interface BabyStageHeroProps {
  progressValue: number; // 0 to 252 (viewed progress)
  todayProgressValue: number; // 0 to 252 (actual progress today)
  currentWeek: number; // 4 to 40 (viewed week)
  todayWeek: number; // 4 to 40 (actual week today)
  daysInCurrentWeek: number;
  totalGestationalDays: number;
  dueDate: string;
  daysRemaining: number;
  weekDetail: WeekDetail;
  theme: ThemeColors;
  showSac: boolean;
  onReturnToToday: () => void;
  onOpenDueDateModal: () => void;
  onOpenMilestoneModal: () => void;
}

export const BabyStageHero: React.FC<BabyStageHeroProps> = ({
  progressValue,
  todayProgressValue,
  currentWeek,
  todayWeek,
  daysInCurrentWeek,
  totalGestationalDays,
  dueDate,
  daysRemaining,
  weekDetail,
  theme,
  showSac,
  onReturnToToday,
  onOpenDueDateModal,
  onOpenMilestoneModal,
}) => {
  const isViewingToday = Math.abs(progressValue - todayProgressValue) < 1;
  const progressPercent = Math.min(100, Math.max(0, (progressValue / 252) * 100));

  return (
    <div className="w-full max-w-full overflow-hidden flex flex-col gap-3.5">
      {/* Stage Status Kicker & Return-to-Today Notice */}
      <div className="flex items-center justify-between gap-2 px-0.5 text-xs text-slate-400 flex-wrap">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="font-semibold text-slate-300">
            Trimester {weekDetail.trimester}
          </span>
          <span aria-hidden="true">·</span>
          <span>Day {totalGestationalDays} of 280</span>
          <span aria-hidden="true" className="hidden sm:inline">·</span>
          <span className="hidden sm:inline text-slate-400">
            {daysRemaining > 0 ? `${daysRemaining} days left` : 'Full Term'}
          </span>
        </div>

        {/* If user scrubbed to a different week, show Return-to-Today badge button */}
        {!isViewingToday && (
          <button
            type="button"
            onClick={onReturnToToday}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-semibold bg-purple-950/80 border border-purple-500/40 text-purple-200 hover:bg-purple-900 transition-colors shadow-sm active:scale-95 shrink-0"
          >
            <RotateCcw className="w-3 h-3 text-purple-300" />
            <span>Jump to Today (W{todayWeek})</span>
          </button>
        )}
      </div>

      {/* Main Showcase Hero Card with Focus on the Baby */}
      <div
        className={`relative w-full max-w-full rounded-3xl overflow-hidden border p-4 sm:p-6 md:p-8 flex flex-col justify-between shadow-2xl transition-colors duration-500 bg-gradient-to-b ${theme.bgGradient} ${theme.cardBorder}`}
      >
        {/* Subtle Ambient Background Light */}
        <div
          className="absolute -top-20 -right-20 w-80 h-80 rounded-full blur-3xl opacity-25 pointer-events-none transition-colors duration-700"
          style={{ backgroundColor: theme.accent }}
        />

        {/* Top Header of Stage Card: Week Display & Trimester Badge */}
        <div className="relative z-10 flex items-start justify-between gap-3 pb-3 border-b border-white/10 w-full max-w-full">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight tabular-nums">
                Week {currentWeek}
              </span>
              <span className="text-sm sm:text-base font-medium text-white/70 tabular-nums">
                + {daysInCurrentWeek}d
              </span>

              {isViewingToday && (
                <span className="text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-md bg-emerald-500/25 border border-emerald-400/40 text-emerald-200 shrink-0">
                  Current Stage
                </span>
              )}
            </div>

            <p className="text-xs sm:text-sm text-white/80 mt-0.5 font-medium truncate">
              Baby is the size of{' '}
              <strong className="text-white underline decoration-white/30 underline-offset-2">
                {weekDetail.fruitName}
              </strong>
            </p>
          </div>

          {/* Trimester chart & due date trigger */}
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={onOpenDueDateModal}
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-black/30 hover:bg-black/50 border border-white/15 text-xs text-white/90 backdrop-blur-md transition-colors"
              title="Click to change due date"
            >
              <Calendar className="w-3.5 h-3.5 text-purple-300" />
              <span>Due: {dueDate}</span>
            </button>

            <div
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-black/30 border border-white/15 flex items-center justify-center backdrop-blur-md shadow-sm shrink-0"
              title={`Trimester ${weekDetail.trimester} of 3`}
            >
              <TrimesterPieChart
                trimester={weekDetail.trimester}
                accentColor={theme.accent}
                size={20}
              />
            </div>
          </div>
        </div>

        {/* Center Stage: The Baby is the Star */}
        <div className="relative z-10 py-5 sm:py-6 md:py-8 flex flex-col md:flex-row items-center justify-center md:justify-around gap-5 sm:gap-6 w-full max-w-full">
          {/* Baby SVG Graphic Container */}
          <div className="relative w-56 h-56 sm:w-68 sm:h-68 md:w-80 md:h-80 max-w-full flex items-center justify-center shrink-0">
            {/* Soft Ambient Radiance */}
            <div
              className="absolute inset-0 rounded-full blur-3xl opacity-25 pointer-events-none transition-colors duration-500"
              style={{ backgroundColor: theme.babyFill }}
            />

            <BabySvg
              progressValue={progressValue}
              week={currentWeek}
              daysInWeek={daysInCurrentWeek}
              babyColor={theme.babyFill}
              sacColor={theme.sacFill}
              showSac={showSac}
              glow={true}
              className="w-full h-full max-w-full"
            />
          </div>

          {/* Fruit Size and Measurements Card */}
          <div className="w-full md:w-72 max-w-full flex flex-col gap-2.5">
            {/* Fruit Size Card */}
            <div className="p-3.5 rounded-2xl bg-black/35 backdrop-blur-md border border-white/15 flex items-center gap-3 shadow-lg">
              <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0 shadow-inner">
                <FruitIcon week={currentWeek} size={32} className="w-8 h-8" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[10px] uppercase tracking-wider text-white/60 font-semibold">
                  Fruit Comparison
                </div>
                <div className="text-sm sm:text-base font-bold text-white truncate mt-0.5">
                  {weekDetail.fruitName}
                </div>
                <div className="text-xs text-white/70 mt-0.5">
                  Week {currentWeek} Milestone
                </div>
              </div>
            </div>

            {/* Measurements Grid */}
            <div className="grid grid-cols-2 gap-2">
              <div className="p-3 rounded-2xl bg-black/30 backdrop-blur-md border border-white/10">
                <div className="flex items-center gap-1.5 text-xs text-white/70">
                  <Ruler className="w-3.5 h-3.5 text-cyan-300" />
                  <span>Length</span>
                </div>
                <div className="text-sm sm:text-base font-bold text-white mt-0.5 tabular-nums">
                  {weekDetail.lengthCm}
                </div>
                <div className="text-[10px] text-white/60 tabular-nums">
                  {weekDetail.lengthIn}
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-black/30 backdrop-blur-md border border-white/10">
                <div className="flex items-center gap-1.5 text-xs text-white/70">
                  <Weight className="w-3.5 h-3.5 text-amber-300" />
                  <span>Weight</span>
                </div>
                <div className="text-sm sm:text-base font-bold text-white mt-0.5 tabular-nums">
                  {weekDetail.weightG}
                </div>
                <div className="text-[10px] text-white/60 tabular-nums">
                  {weekDetail.weightOz}
                </div>
              </div>
            </div>

            {/* Weekly Milestone Teaser */}
            <div
              onClick={onOpenMilestoneModal}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  onOpenMilestoneModal();
                }
              }}
              className="p-3 rounded-2xl bg-black/30 backdrop-blur-md border border-white/10 hover:border-white/30 transition-all cursor-pointer group text-left"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-bold text-white truncate">
                  <Heart className="w-3.5 h-3.5 text-rose-400 group-hover:scale-110 transition-transform shrink-0" />
                  <span className="truncate">{weekDetail.milestoneTitle}</span>
                </div>
                <span className="text-[10px] text-purple-300 font-semibold group-hover:underline shrink-0 ml-1">
                  Details
                </span>
              </div>
              <p className="text-xs text-white/80 line-clamp-2 mt-1 leading-relaxed">
                {weekDetail.milestoneDesc}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Progress Bar inside Hero Card */}
        <div className="relative z-10 pt-2.5 border-t border-white/10 w-full max-w-full">
          <div className="flex items-center justify-between text-xs text-white/70 mb-1">
            <span>Overall Progress</span>
            <span className="font-bold text-white tabular-nums">
              {Math.round(progressPercent)}%
            </span>
          </div>
          <div className="w-full h-2 rounded-full bg-black/40 border border-white/15 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-300"
              style={{
                width: `${progressPercent}%`,
                backgroundColor: theme.accent,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
