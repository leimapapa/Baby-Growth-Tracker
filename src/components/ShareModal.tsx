import React, { useState } from 'react';
import { Share2, Copy, Check, X, Calendar } from 'lucide-react';
import { WeekDetail, ThemeColors } from '../types';
import { BabySvg } from './BabySvg';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  dueDate: string;
  currentWeek: number;
  remainingDaysInWeek: number;
  progressValue: number;
  weekDetail: WeekDetail;
  theme: ThemeColors;
  onShowToast: (msg: string) => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  dueDate,
  currentWeek,
  remainingDaysInWeek,
  progressValue,
  weekDetail,
  theme,
  onShowToast,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  // Build the shareable URL with the due date query parameter
  const getShareUrl = () => {
    try {
      const url = new URL(window.location.href);
      url.search = '';
      url.hash = '';
      url.searchParams.set('dueDate', dueDate);
      return url.toString();
    } catch {
      return window.location.href;
    }
  };

  const shareUrl = getShareUrl();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      onShowToast('Shareable link copied to clipboard!');
      setTimeout(() => setCopied(false), 2500);
    } catch {
      onShowToast('Failed to copy. Please copy manually from the input.');
    }
  };

  const handleNativeShare = async () => {
    const shareData = {
      title: 'Baby Growth Tracker',
      text: `Our baby is currently at Week ${currentWeek} (+${remainingDaysInWeek}d) — size of ${weekDetail.fruitName}! Watch our baby's growth animation:`,
      url: shareUrl,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        onShowToast('Shared successfully!');
        onClose();
      } catch (err: unknown) {
        if (err instanceof Error && err.name !== 'AbortError') {
          handleCopy();
        }
      }
    } else {
      handleCopy();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-sm animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="share-modal-title"
    >
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden text-slate-100 flex flex-col max-h-[92vh]">
        {/* Mobile drag handle */}
        <div className="sm:hidden w-10 h-1 bg-slate-700 rounded-full mx-auto my-3" />

        {/* Modal Header */}
        <div className="p-5 sm:p-6 pb-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-300">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <h2 id="share-modal-title" className="text-base sm:text-lg font-bold text-white">
                Share Baby's Growth
              </h2>
              <p className="text-xs text-slate-400">
                Recipients will see baby's current stage and growth animation
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
        <div className="p-5 sm:p-6 space-y-5 overflow-y-auto">
          {/* Share Preview Card showing the Baby at this point */}
          <div className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-2.5">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              Recipient Preview
            </span>
            <div className="flex items-center gap-4">
              {/* Baby illustration spotlight */}
              <div className="w-20 h-20 rounded-2xl bg-black/40 border border-purple-500/30 flex items-center justify-center shrink-0 overflow-hidden relative p-1 shadow-inner">
                <BabySvg
                  progressValue={progressValue}
                  week={currentWeek}
                  daysInWeek={remainingDaysInWeek}
                  babyColor={theme.babyFill}
                  sacColor={theme.sacFill}
                  showSac={true}
                  glow={true}
                  className="w-full h-full"
                />
              </div>

              <div className="min-w-0 flex-1">
                <div className="text-base font-bold text-white truncate">
                  Week {currentWeek} + {remainingDaysInWeek} Days
                </div>
                <div className="text-xs text-purple-300 truncate mt-0.5">
                  Size of {weekDetail.fruitName} · {weekDetail.lengthCm}
                </div>
                <div className="text-[11px] text-slate-400 flex items-center gap-1.5 mt-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-500" />
                  <span>Due Date: {dueDate}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Share URL input and copy button */}
          <div className="space-y-2">
            <label htmlFor="shareUrlInput" className="text-xs font-semibold text-slate-300 block">
              Shareable Web Link (includes due date)
            </label>
            <div className="flex items-center gap-2">
              <input
                id="shareUrlInput"
                type="text"
                readOnly
                value={shareUrl}
                className="flex-1 h-11 px-3.5 rounded-xl bg-slate-950 border border-slate-700/80 text-xs text-slate-300 font-mono select-all focus:outline-none focus:border-purple-400 truncate"
              />
              <button
                type="button"
                onClick={handleCopy}
                className={`h-11 px-4 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shrink-0 active:scale-95 ${
                  copied
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
                }`}
              >
                {copied ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <p className="text-[11px] text-slate-400">
              When opened, the app automatically loads your due date and stage so friends and family can watch the baby grow!
            </p>
          </div>
        </div>

        {/* Modal Footer with Primary Share Actions */}
        <div className="p-4 sm:p-5 bg-slate-950 border-t border-slate-800 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white transition-colors"
          >
            Close
          </button>

          <button
            type="button"
            onClick={handleNativeShare}
            className="flex-1 sm:flex-initial h-11 px-6 rounded-xl text-xs font-bold text-white shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2"
            style={{ backgroundColor: theme.accent }}
          >
            <Share2 className="w-4 h-4" />
            <span>Share Link</span>
          </button>
        </div>
      </div>
    </div>
  );
};
