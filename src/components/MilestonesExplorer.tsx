import React, { useState } from 'react';
import { FRUIT_DATA } from '../data/fruitData';
import { FruitIcon } from './FruitIcon';
import { TrimesterPieChart } from './TrimesterPieChart';
import { WeekDetail, ThemeColors } from '../types';
import { Ruler, Weight, Check, ArrowRight, Heart } from 'lucide-react';

interface MilestonesExplorerProps {
  currentWeek: number; // currently viewed week
  todayWeek: number; // actual baby week today
  theme: ThemeColors;
  onSelectWeek: (week: number) => void;
}

export const MilestonesExplorer: React.FC<MilestonesExplorerProps> = ({
  currentWeek,
  todayWeek,
  theme,
  onSelectWeek,
}) => {
  const [selectedTrimester, setSelectedTrimester] = useState<'all' | 1 | 2 | 3>('all');

  const allWeeks = Object.values(FRUIT_DATA).sort((a, b) => a.week - b.week);

  const filteredWeeks = allWeeks.filter((item) => {
    if (selectedTrimester === 'all') return true;
    return item.trimester === selectedTrimester;
  });

  return (
    <div className="w-full space-y-5">
      {/* Header and Filter Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            Week-by-Week Developmental Encyclopedia
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Tap any week to inspect baby's anatomy, size comparisons, and milestones
          </p>
        </div>

        {/* Trimester Filter Tabs - 4-column responsive grid with zero horizontal scroll */}
        <div className="grid grid-cols-4 gap-1 p-1 bg-slate-900/90 rounded-2xl border border-slate-800 w-full sm:w-auto shrink-0">
          <button
            type="button"
            onClick={() => setSelectedTrimester('all')}
            className={`min-h-[42px] px-2 py-1.5 rounded-xl text-xs font-semibold text-center transition-all ${
              selectedTrimester === 'all'
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <span className="block truncate">All</span>
            <span className="block text-[10px] text-slate-300/80 font-normal">4–40w</span>
          </button>
          <button
            type="button"
            onClick={() => setSelectedTrimester(1)}
            className={`min-h-[42px] px-2 py-1.5 rounded-xl text-xs font-semibold text-center transition-all ${
              selectedTrimester === 1
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <span className="block truncate">1st Tri</span>
            <span className="block text-[10px] text-slate-300/80 font-normal">4–13w</span>
          </button>
          <button
            type="button"
            onClick={() => setSelectedTrimester(2)}
            className={`min-h-[42px] px-2 py-1.5 rounded-xl text-xs font-semibold text-center transition-all ${
              selectedTrimester === 2
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <span className="block truncate">2nd Tri</span>
            <span className="block text-[10px] text-slate-300/80 font-normal">14–27w</span>
          </button>
          <button
            type="button"
            onClick={() => setSelectedTrimester(3)}
            className={`min-h-[42px] px-2 py-1.5 rounded-xl text-xs font-semibold text-center transition-all ${
              selectedTrimester === 3
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <span className="block truncate">3rd Tri</span>
            <span className="block text-[10px] text-slate-300/80 font-normal">28–40w</span>
          </button>
        </div>
      </div>

      {/* Grid of Week Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {filteredWeeks.map((weekItem) => {
          const isSelected = currentWeek === weekItem.week;
          const isToday = todayWeek === weekItem.week;

          return (
            <div
              key={weekItem.week}
              onClick={() => onSelectWeek(weekItem.week)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  onSelectWeek(weekItem.week);
                }
              }}
              className={`group relative p-4 rounded-2xl border transition-all text-left cursor-pointer flex flex-col justify-between gap-3 ${
                isSelected
                  ? 'bg-slate-900 border-purple-500/60 shadow-lg ring-1 ring-purple-500/30'
                  : 'bg-slate-900/60 hover:bg-slate-900/90 border-slate-800 hover:border-slate-700'
              }`}
            >
              {/* Card Header: Week number, fruit name, today badge */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 group-hover:border-slate-700 flex items-center justify-center shrink-0 shadow-inner">
                    <FruitIcon week={weekItem.week} size={30} className="w-7 h-7" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-base font-bold text-white tabular-nums">
                        Week {weekItem.week}
                      </span>
                      {isToday && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          Today
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-purple-300 font-medium">
                      Size of {weekItem.fruitName}
                    </div>
                  </div>
                </div>

                <div className="shrink-0 pt-0.5">
                  <TrimesterPieChart
                    trimester={weekItem.trimester}
                    accentColor={theme.accent}
                    size={18}
                  />
                </div>
              </div>

              {/* Milestone Highlight */}
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-200">
                  <Heart className="w-3 h-3 text-rose-400 shrink-0" />
                  <span className="truncate">{weekItem.milestoneTitle}</span>
                </div>
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {weekItem.milestoneDesc}
                </p>
              </div>

              {/* Measurements Row */}
              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                <div className="flex items-center gap-3">
                  <span className="tabular-nums">📏 {weekItem.lengthCm}</span>
                  <span className="tabular-nums">⚖️ {weekItem.weightG}</span>
                </div>

                <span className="text-[11px] font-semibold text-purple-400 group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                  View <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
