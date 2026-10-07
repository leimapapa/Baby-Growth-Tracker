import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { ThemePreset, ThemeColors, WeekDetail } from './types';
import { FRUIT_DATA } from './data/fruitData';
import { THEMES } from './data/themes';
import { BabyStageHero } from './components/BabyStageHero';
import { GrowthControls } from './components/GrowthControls';
import { MilestonesExplorer } from './components/MilestonesExplorer';
import { MilestoneCard } from './components/MilestoneCard';
import { DueDateModal } from './components/DueDateModal';
import { ShareModal } from './components/ShareModal';
import { SettingsModal } from './components/SettingsModal';
import {
  Calendar,
  Share2,
  Sparkles,
  BookOpen,
  Settings,
  Check,
  Baby,
} from 'lucide-react';

export default function App() {
  // Navigation: 'stage' (Main Baby Stage) | 'timeline' (40-Week Encyclopedia)
  const [activeTab, setActiveTab] = useState<'stage' | 'timeline'>('stage');
  const [selectedThemeId, setSelectedThemeId] = useState<ThemePreset>('classic-purple');
  const [showSac, setShowSac] = useState<boolean>(true);

  // Due Date state
  const [dueDate, setDueDate] = useState<string>('2025-06-15');

  // Animation & Playback state (options configured in Settings modal)
  const [viewProgressValue, setViewProgressValue] = useState<number>(140);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [animationMode, setAnimationMode] = useState<'to-today' | 'full-term'>('to-today');
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);

  // Modals
  const [isDueDateModalOpen, setIsDueDateModalOpen] = useState<boolean>(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState<boolean>(false);
  const [isMilestoneModalOpen, setIsMilestoneModalOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const toastTimerRef = useRef<NodeJS.Timeout | null>(null);

  const showToast = useCallback((msg: string) => {
    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
    }
    setToastMessage(msg);
    toastTimerRef.current = setTimeout(() => setToastMessage(null), 3000);
  }, []);

  // Calculate days until due date from today
  const calculateDaysUntil = useCallback((dateStr: string): number => {
    try {
      const [year, month, day] = dateStr.split('-').map(Number);
      const targetDate = new Date(year, month - 1, day);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const diff = targetDate.getTime() - today.getTime();
      return Math.ceil(diff / (1000 * 60 * 60 * 24));
    } catch {
      return 112;
    }
  }, []);

  // Calculate actual current baby progress based on due date
  const todayStats = useMemo(() => {
    const daysUntil = calculateDaysUntil(dueDate);
    const gestationalDays = Math.max(28, Math.min(280, 280 - daysUntil));
    const progressVal = Math.max(0, Math.min(252, gestationalDays - 28));
    const week = Math.max(4, Math.min(40, Math.floor(gestationalDays / 7)));
    const daysInWeek = gestationalDays % 7;
    return {
      daysUntil,
      gestationalDays,
      progressVal,
      week,
      daysInWeek,
    };
  }, [dueDate, calculateDaysUntil]);

  // Initial load: parse URL parameter `?dueDate=...` or retrieve from localStorage
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const dueDateFromUrl = urlParams.get('dueDate');
    const now = new Date();
    let initialDate = `${now.getFullYear()}-${(now.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}`;

    if (dueDateFromUrl && /^\d{4}-\d{2}-\d{2}$/.test(dueDateFromUrl)) {
      initialDate = dueDateFromUrl;
    }

    setDueDate(initialDate);

    // Compute progress value for today and initialize view at current stage
    const daysUntil = calculateDaysUntil(initialDate);
    const gestationalDays = Math.max(28, Math.min(280, 280 - daysUntil));
    const computedVal = Math.max(0, Math.min(252, gestationalDays - 28));
    setViewProgressValue(computedVal);
  }, [calculateDaysUntil]);

  // Handle Due Date update: sync URL and localStorage
  const handleDueDateChange = useCallback(
    (newDate: string) => {
      setDueDate(newDate);

      // Append due date query parameter to URL for instant sharing
      try {
        const url = new URL(window.location.href);
        url.searchParams.set('dueDate', newDate);
        window.history.replaceState({}, '', url.toString());
      } catch {
        // Fallback if URL API unavailable
      }

      const daysUntil = calculateDaysUntil(newDate);
      const gestationalDays = Math.max(28, Math.min(280, 280 - daysUntil));
      const computedVal = Math.max(0, Math.min(252, gestationalDays - 28));
      setViewProgressValue(computedVal);
      showToast(`Due date updated to ${newDate}`);
    },
    [calculateDaysUntil, showToast]
  );

  // Return to today's baby stage
  const handleReturnToToday = useCallback(() => {
    setViewProgressValue(todayStats.progressVal);
    showToast(`Jumped to Baby's Current Stage (Week ${todayStats.week})`);
  }, [todayStats.progressVal, todayStats.week, showToast]);

  // Animate Growth to Today
  const handleStartAnimateToToday = useCallback(() => {
    setViewProgressValue(0); // Start from Week 4 conception
    setIsPlaying(true);
    setActiveTab('stage');
    showToast(
      animationMode === 'to-today'
        ? `Animating growth to current stage (Week ${todayStats.week})...`
        : 'Animating all 40 weeks of development...'
    );
  }, [animationMode, todayStats.week, showToast]);

  // Toggle play/pause
  const handleTogglePlay = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  // Growth animation loop
  useEffect(() => {
    if (!isPlaying) return;

    const targetVal = animationMode === 'to-today' ? todayStats.progressVal : 252;
    const intervalTime = Math.max(20, Math.floor(60 / playbackSpeed));

    const timer = setInterval(() => {
      setViewProgressValue((prev) => {
        const increment = 1;
        const next = prev + increment;

        if (next >= targetVal) {
          setIsPlaying(false);
          showToast(
            animationMode === 'to-today'
              ? `Reached Baby's Current Stage (Week ${todayStats.week} + ${todayStats.daysInWeek}d)!`
              : 'Full term development reached (Week 40)!'
          );
          return targetVal;
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isPlaying, animationMode, todayStats, playbackSpeed, showToast]);

  // Calculated displayed stage values
  const totalGestationalDays = useMemo(() => viewProgressValue + 28, [viewProgressValue]);
  const currentWeek = useMemo(() => {
    const w = Math.floor(totalGestationalDays / 7);
    return Math.max(4, Math.min(40, w));
  }, [totalGestationalDays]);

  const daysInCurrentWeek = useMemo(() => totalGestationalDays % 7, [totalGestationalDays]);
  const daysRemaining = useMemo(
    () => Math.max(0, 280 - totalGestationalDays),
    [totalGestationalDays]
  );

  const currentWeekDetail: WeekDetail = useMemo(() => {
    return FRUIT_DATA[currentWeek] || FRUIT_DATA[24];
  }, [currentWeek]);

  const currentTheme: ThemeColors = useMemo(() => {
    return THEMES[selectedThemeId] || THEMES['classic-purple'];
  }, [selectedThemeId]);

  // Steppers
  const handlePrevWeek = useCallback(() => {
    setViewProgressValue((prev) => Math.max(0, prev - 7));
  }, []);

  const handleNextWeek = useCallback(() => {
    setViewProgressValue((prev) => Math.min(252, prev + 7));
  }, []);

  const handleSelectWeekFromExplorer = useCallback((week: number) => {
    const targetProgress = Math.max(0, Math.min(252, (week - 4) * 7));
    setViewProgressValue(targetProgress);
    setActiveTab('stage');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-slate-950 text-slate-100 flex flex-col font-sans pb-20 md:pb-8">
      {/* Toast Notification */}
      {toastMessage && (
        <div
          role="status"
          className="fixed bottom-20 md:bottom-8 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-2xl bg-purple-950/95 text-purple-100 border border-purple-500/50 shadow-2xl backdrop-blur-md text-xs font-semibold flex items-center gap-2 animate-bounce max-w-[90vw] truncate"
        >
          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="truncate">{toastMessage}</span>
        </div>
      )}

      {/* Clean, Spacious Header without redundant title */}
      <header className="sticky top-0 z-40 w-full bg-slate-900/90 backdrop-blur-xl border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-3 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-2">
          {/* Left: View Mode Switcher */}
          <div className="flex items-center bg-slate-950/90 p-1 rounded-2xl border border-slate-800 shrink-0">
            <button
              type="button"
              onClick={() => setActiveTab('stage')}
              aria-label="Baby Stage"
              className={`justify-center px-2 sm:px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all min-h-[36px] ${
                activeTab === 'stage'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Baby className="w-4 h-4" />
              <span className="hidden sm:inline">Baby Stage</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('timeline')}
              aria-label="Milestones"
              className={`justify-center px-2 sm:px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all min-h-[36px] ${
                activeTab === 'timeline'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span className="hidden sm:inline">Milestones</span>
            </button>
          </div>

          {/* Right: Due Date Pill, Settings & Share Actions */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Quick Due Date button */}
            <button
              type="button"
              onClick={() => setIsDueDateModalOpen(true)}
              aria-label="Change due date"
              className="min-h-[38px] px-2.5 sm:px-3 py-1.5 rounded-xl bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700/80 text-white text-xs font-semibold shadow-sm flex items-center gap-1.5 transition-colors"
              title="Change Due Date"
            >
              <Calendar className="w-3.5 h-3.5 text-purple-400 shrink-0" />
              <span className="hidden sm:inline text-slate-300">Due:</span>
              <span className="sm:hidden font-mono tabular-nums text-slate-200">
                {new Date(`${dueDate}T00:00:00`).toLocaleDateString(undefined, {
                  month: 'numeric',
                  day: 'numeric',
                  year: '2-digit',
                })}
              </span>
              <span className="hidden sm:inline font-mono tabular-nums text-slate-200">{dueDate}</span>
            </button>

            {/* Settings Trigger (Theme Palette & Animation Options) */}
            <button
              type="button"
              onClick={() => setIsSettingsModalOpen(true)}
              className="min-h-[38px] min-w-[38px] rounded-xl bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700/80 text-slate-300 hover:text-white flex items-center justify-center transition-colors shadow-sm"
              aria-label="App settings (theme colors, animation options)"
              title="Settings (Theme & Animation)"
            >
              <Settings className="w-4 h-4" />
            </button>

            {/* Share Trigger */}
            <button
              type="button"
              onClick={() => setIsShareModalOpen(true)}
              className="min-h-[38px] px-2.5 sm:px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-md flex items-center gap-1.5 transition-all active:scale-95 border border-purple-400/30 whitespace-nowrap"
              title="Share baby growth URL with due date"
            >
              <Share2 className="w-3.5 h-3.5 shrink-0" />
              <span>Share</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area - Baby is the Focal Centerpiece */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-3 sm:px-6 py-4 sm:py-6 space-y-4">
        {activeTab === 'stage' ? (
          <>
            {/* The Baby Stage Hero */}
            <BabyStageHero
              progressValue={viewProgressValue}
              todayProgressValue={todayStats.progressVal}
              currentWeek={currentWeek}
              todayWeek={todayStats.week}
              daysInCurrentWeek={daysInCurrentWeek}
              totalGestationalDays={totalGestationalDays}
              dueDate={dueDate}
              daysRemaining={daysRemaining}
              weekDetail={currentWeekDetail}
              theme={currentTheme}
              showSac={showSac}
              onReturnToToday={handleReturnToToday}
              onOpenDueDateModal={() => setIsDueDateModalOpen(true)}
              onOpenMilestoneModal={() => setIsMilestoneModalOpen(true)}
            />

            {/* Growth Controls: Animate to Today & Timeline Scrubber */}
            <GrowthControls
              progressValue={viewProgressValue}
              todayProgressValue={todayStats.progressVal}
              currentWeek={currentWeek}
              todayWeek={todayStats.week}
              isPlaying={isPlaying}
              theme={currentTheme}
              onStartAnimateToToday={handleStartAnimateToToday}
              onTogglePlay={handleTogglePlay}
              onProgressChange={(val) => {
                setIsPlaying(false);
                setViewProgressValue(val);
              }}
              onPrevWeek={handlePrevWeek}
              onNextWeek={handleNextWeek}
            />
          </>
        ) : (
          /* 40-Week Encyclopedia */
          <MilestonesExplorer
            currentWeek={currentWeek}
            todayWeek={todayStats.week}
            theme={currentTheme}
            onSelectWeek={handleSelectWeekFromExplorer}
          />
        )}
      </main>

      {/* Mobile Bottom Navigation Bar (Pattern 1 from Mobile Guidelines) */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-md border-t border-slate-800 px-3 py-1.5 flex items-center justify-around shadow-2xl max-w-full overflow-hidden"
        aria-label="Mobile Navigation"
      >
        <button
          type="button"
          onClick={() => setActiveTab('stage')}
          className={`min-h-[44px] flex flex-col items-center justify-center px-2 py-1 rounded-xl transition-colors ${
            activeTab === 'stage' ? 'text-purple-400 font-bold' : 'text-slate-400'
          }`}
        >
          <Baby className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Stage</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('timeline')}
          className={`min-h-[44px] flex flex-col items-center justify-center px-2 py-1 rounded-xl transition-colors ${
            activeTab === 'timeline' ? 'text-purple-400 font-bold' : 'text-slate-400'
          }`}
        >
          <BookOpen className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Milestones</span>
        </button>

        <button
          type="button"
          onClick={handleStartAnimateToToday}
          className="min-h-[44px] flex flex-col items-center justify-center px-2 py-1 rounded-xl text-purple-300 active:scale-95 transition-transform"
        >
          <div className="w-7 h-7 rounded-full bg-purple-600 flex items-center justify-center text-white shadow-md">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <span className="text-[10px] mt-0.5 font-bold">Animate</span>
        </button>

        <button
          type="button"
          onClick={() => setIsSettingsModalOpen(true)}
          className="min-h-[44px] flex flex-col items-center justify-center px-2 py-1 rounded-xl text-slate-400 hover:text-white transition-colors"
        >
          <Settings className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Settings</span>
        </button>

        <button
          type="button"
          onClick={() => setIsShareModalOpen(true)}
          className="min-h-[44px] flex flex-col items-center justify-center px-2 py-1 rounded-xl text-slate-400 hover:text-white transition-colors"
        >
          <Share2 className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Share</span>
        </button>
      </nav>

      {/* Due Date Modal */}
      <DueDateModal
        isOpen={isDueDateModalOpen}
        onClose={() => setIsDueDateModalOpen(false)}
        currentDueDate={dueDate}
        onSaveDueDate={handleDueDateChange}
        accentColor={currentTheme.accent}
      />

      {/* Settings Modal (Theme Color & Animation Options) */}
      <SettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        selectedThemeId={selectedThemeId}
        onSelectTheme={setSelectedThemeId}
        animationMode={animationMode}
        onSetAnimationMode={setAnimationMode}
        playbackSpeed={playbackSpeed}
        onSetPlaybackSpeed={setPlaybackSpeed}
        showSac={showSac}
        onToggleSac={() => setShowSac((prev) => !prev)}
        dueDate={dueDate}
        onOpenDueDateModal={() => setIsDueDateModalOpen(true)}
      />

      {/* Share Modal with Baby Preview */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        dueDate={dueDate}
        currentWeek={todayStats.week}
        remainingDaysInWeek={todayStats.daysInWeek}
        progressValue={todayStats.progressVal}
        weekDetail={FRUIT_DATA[todayStats.week] || FRUIT_DATA[24]}
        theme={currentTheme}
        onShowToast={showToast}
      />

      {/* Milestone Details Card Modal */}
      <MilestoneCard
        isOpen={isMilestoneModalOpen}
        onClose={() => setIsMilestoneModalOpen(false)}
        weekDetail={currentWeekDetail}
        daysRemaining={daysRemaining}
        totalGestationalDays={totalGestationalDays}
        dueDate={dueDate}
        theme={currentTheme}
      />
    </div>
  );
}
