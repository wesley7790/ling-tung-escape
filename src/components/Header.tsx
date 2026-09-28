import React from 'react';
import { Volume2, VolumeX, BookOpen, HelpCircle, RotateCcw, Backpack } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface HeaderProps {
  onOpenVocabulary: () => void;
  onOpenInventory: () => void;
  onOpenHint: () => void;
  onResetGame: () => void;
  inventoryCount: number;
  isMuted: boolean;
  onToggleMute: () => void;
  elapsedSeconds: number;
  solvedCount: number;
  totalPuzzles: number;
  showBilingual: boolean;
  onToggleBilingual: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenVocabulary,
  onOpenInventory,
  onOpenHint,
  onResetGame,
  inventoryCount,
  isMuted,
  onToggleMute,
  elapsedSeconds,
  solvedCount,
  totalPuzzles,
  showBilingual,
  onToggleBilingual,
}) => {
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Zone 1: Single text element Brand Title */}
        <div className="flex items-center gap-3">
          <span className="text-base sm:text-lg font-bold tracking-tight text-amber-400 font-['Outfit']">
            嶺東中學國中部 802 密室逃脫
          </span>
          <span className="hidden md:inline-block text-xs text-slate-400 font-medium">
            國二英文實境解謎 (A1-A2)
          </span>
        </div>

        {/* Zone 2: Navigation / Stats / Language */}
        <nav className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm font-medium text-slate-300">
          <div className="flex items-center gap-2 text-slate-400">
            <span>時間</span>
            <span className="font-mono text-amber-400 font-bold tabular-nums">
              {formatTime(elapsedSeconds)}
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-slate-400">
            <span>進度</span>
            <span className="font-mono text-emerald-400 font-bold tabular-nums">
              {solvedCount}/{totalPuzzles}
            </span>
          </div>

          <button
            onClick={() => {
              soundManager.playClick();
              onToggleBilingual();
            }}
            className="hover:text-amber-400 transition-colors cursor-pointer text-xs"
            title="切換中英雙語/純英模式"
          >
            {showBilingual ? '中英雙語' : 'English Only'}
          </button>
        </nav>

        {/* Zone 3: Primary Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Inventory Button */}
          <button
            onClick={() => {
              soundManager.playClick();
              onOpenInventory();
            }}
            className="relative p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            title="打開書包道具欄"
            aria-label="打開道具欄"
          >
            <Backpack className="w-5 h-5 text-amber-400" />
            {inventoryCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-amber-500 text-slate-950 font-mono text-[10px] font-bold rounded-full flex items-center justify-center">
                {inventoryCount}
              </span>
            )}
          </button>

          {/* Vocabulary Notebook */}
          <button
            onClick={() => {
              soundManager.playClick();
              onOpenVocabulary();
            }}
            className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            title="國二英文單字筆記"
            aria-label="單字筆記本"
          >
            <BookOpen className="w-5 h-5 text-sky-400" />
          </button>

          {/* Progressive Hint (Wesley Friendly) */}
          <button
            onClick={() => {
              soundManager.playClick();
              onOpenHint();
            }}
            className="px-2.5 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
            title="三段式提示 (不卡關)"
          >
            <HelpCircle className="w-4 h-4 text-amber-400" />
            <span className="hidden sm:inline">求助提示</span>
          </button>

          {/* Audio toggle */}
          <button
            onClick={onToggleMute}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            title={isMuted ? '開啟音效' : '靜音'}
            aria-label={isMuted ? '開啟音效' : '靜音'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* Reset button */}
          <button
            onClick={onResetGame}
            className="p-2 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors cursor-pointer"
            title="重置密室"
            aria-label="重置密室"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
