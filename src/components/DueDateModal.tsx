import React, { useState } from 'react';
import { Calendar, X, Sparkles, Clock, Check } from 'lucide-react';
import { TrimesterPieChart } from './TrimesterPieChart';

interface DueDateModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentDueDate: string;
  onSaveDueDate: (newDate: string) => void;
  accentColor: string;
}

export const DueDateModal: React.FC<DueDateModalProps> = ({
  isOpen,
  onClose,
  currentDueDate,
  onSaveDueDate,
  accentColor,
}) => {
  const [selectedDate, setSelectedDate] = useState(currentDueDate);

  if (!isOpen) return null;

  // Calculate stats for selected date
  const calculatePreview = (dateStr: string) => {
    try {
      const [year, month, day] = dateStr.split('-').map(Number);
      const targetDate = new Date(year, month - 1, day);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const diffMs = targetDate.getTime() - today.getTime();
      const daysUntil = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
      const gestationalDays = Math.max(28, Math.min(280, 280 - daysUntil));
      const week = Math.floor(gestationalDays / 7);
      const daysInWeek = gestationalDays % 7;
      const trimester: 1 | 2 | 3 = week <= 13 ? 1 : week <= 27 ? 2 : 3;
      return { daysUntil, gestationalDays, week, daysInWeek, trimester };
    } catch {
      return { daysUntil: 112, gestationalDays: 168, week: 24, daysInWeek: 0, trimester: 2 as const };
    }
  };

  const preview = calculatePreview(selectedDate);

  // Preset generator helper
  const setPresetByWeeksRemaining = (weeksRemaining: number) => {
    const today = new Date();
    const futureDate = new Date(today.getTime() + weeksRemaining * 7 * 24 * 60 * 60 * 1000);
    const dateStr = `${futureDate.getFullYear()}-${(futureDate.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${futureDate.getDate().toString().padStart(2, '0')}`;
    setSelectedDate(dateStr);
  };

  const handleSave = () => {
    onSaveDueDate(selectedDate);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/75 backdrop-blur-sm animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="due-date-modal-title"
    >
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden text-slate-100 flex flex-col max-h-[92vh]">
        {/* Mobile drag handle */}
        <div className="sm:hidden w-10 h-1 bg-slate-700 rounded-full mx-auto my-3" />

        {/* Modal Header */}
        <div className="p-5 sm:p-6 pb-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-300">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h2 id="due-date-modal-title" className="text-base sm:text-lg font-bold text-white">
                Set Baby's Due Date
              </h2>
              <p className="text-xs text-slate-400">
                Calculates baby's exact gestational age and milestones
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-xl bg-slate-800/80 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5">
          {/* Date Picker Input */}
          <div className="space-y-2">
            <label htmlFor="dueDateInput" className="text-xs font-semibold text-slate-300 block">
              Estimated Due Date (EDD)
            </label>
            <div className="relative">
              <input
                id="dueDateInput"
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full h-12 px-4 rounded-xl bg-slate-950 border border-slate-700 text-white font-medium text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-400 transition-all cursor-pointer"
              />
            </div>
            <p className="text-[11px] text-slate-400">
              Typical full-term pregnancy is 40 weeks (280 days) from your last menstrual cycle.
            </p>
          </div>

          {/* Quick Presets */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-300 block">Quick Stage Presets</span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setPresetByWeeksRemaining(30)}
                className="px-3 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 text-left text-xs transition-colors"
              >
                <div className="font-semibold text-white">1st Trimester (~Week 10)</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Due in ~7 months</div>
              </button>
              <button
                type="button"
                onClick={() => setPresetByWeeksRemaining(20)}
                className="px-3 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 text-left text-xs transition-colors"
              >
                <div className="font-semibold text-white">Mid Pregnancy (~Week 20)</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Due in ~4.5 months</div>
              </button>
              <button
                type="button"
                onClick={() => setPresetByWeeksRemaining(12)}
                className="px-3 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 text-left text-xs transition-colors"
              >
                <div className="font-semibold text-white">3rd Trimester (~Week 28)</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Due in ~3 months</div>
              </button>
              <button
                type="button"
                onClick={() => setPresetByWeeksRemaining(4)}
                className="px-3 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 text-left text-xs transition-colors"
              >
                <div className="font-semibold text-white">Full Term (~Week 36)</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Due in ~1 month</div>
              </button>
            </div>
          </div>

          {/* Calculated Preview Card */}
          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1.5 font-medium">
                <Clock className="w-3.5 h-3.5 text-purple-400" /> Current Calculation (Today)
              </span>
              <div className="flex items-center gap-1.5 text-slate-300">
                <TrimesterPieChart trimester={preview.trimester} accentColor={accentColor} size={18} />
                <span>Trimester {preview.trimester}</span>
              </div>
            </div>

            <div className="flex items-baseline justify-between pt-1 border-t border-slate-800/80">
              <div>
                <span className="text-2xl font-bold text-white tabular-nums">
                  Week {preview.week}
                </span>
                <span className="text-xs text-slate-400 ml-1.5 font-medium tabular-nums">
                  + {preview.daysInWeek} days
                </span>
              </div>
              <div className="text-right">
                <span className="text-sm font-semibold text-purple-300 tabular-nums">
                  {preview.daysUntil > 0 ? `${preview.daysUntil} days left` : 'Due now!'}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400">
              Day {preview.gestationalDays} of 280 total gestational days.
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 bg-slate-950 border-t border-slate-800 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-5 py-2.5 rounded-xl text-xs font-bold text-white shadow-lg transition-transform active:scale-95 flex items-center gap-2"
            style={{ backgroundColor: accentColor }}
          >
            <Check className="w-4 h-4" />
            <span>Apply Due Date</span>
          </button>
        </div>
      </div>
    </div>
  );
};
