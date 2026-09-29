import React, { useState } from 'react';
import { X, Lightbulb, Volume2, ShieldCheck, ChevronRight } from 'lucide-react';
import { PUZZLES } from '../data/puzzles';
import { soundManager } from '../utils/audio';

interface HintModalProps {
  isOpen: boolean;
  onClose: () => void;
  activePuzzleId?: string;
  onHintUsed: () => void;
  showBilingual: boolean;
}

export const HintModal: React.FC<HintModalProps> = ({
  isOpen,
  onClose,
  activePuzzleId = 'desk_box',
  onHintUsed,
  showBilingual,
}) => {
  const [selectedPuzzleKey, setSelectedPuzzleKey] = useState<string>(activePuzzleId);
  const [unlockedLevels, setUnlockedLevels] = useState<Record<string, number>>({});

  if (!isOpen) return null;

  const currentPuzzle = PUZZLES[selectedPuzzleKey] || PUZZLES.desk_box;
  const currentUnlocked = unlockedLevels[selectedPuzzleKey] || 1;

  const handleUnlockNext = () => {
    soundManager.playClick();
    const nextLevel = Math.min(3, currentUnlocked + 1);
    setUnlockedLevels((prev) => ({
      ...prev,
      [selectedPuzzleKey]: nextLevel,
    }));
    onHintUsed();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800 bg-slate-900/90">
          <div className="flex items-center gap-2 text-amber-400">
            <Lightbulb className="w-5 h-5" />
            <h3 className="font-bold text-base text-slate-100 font-['Outfit']">
              Wesley 友善求助指南 · 三段式分級提示
            </h3>
          </div>
          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Puzzle Selector Bar */}
        <div className="px-5 py-3 border-b border-slate-800 bg-slate-950/60 overflow-x-auto flex gap-2">
          {Object.entries(PUZZLES).map(([key, puzzle], index) => {
            const shortTitles: Record<string, string> = {
              desk_box: '1. 課桌字謎',
              blackboard_safe: '2. 黑板保險箱',
              podium_tablet: '3. 講台平板',
              window_view: '4. 鐘樓窗台',
              bookshelf_stationery: '5. 圖書文具櫃',
              bulletin_board: '6. 公佈欄值日',
              lockers_mystery: '7. 置物櫃方位',
              cleaning_corner: '8. 清潔角天平',
              science_corner: '9. 生態觀察箱',
              exit_door: '10. 教室大門',
            };
            const label = shortTitles[key] || `${index + 1}. ${puzzle.title.split(' ')[0]}`;
            return (
              <button
                key={key}
                onClick={() => {
                  soundManager.playClick();
                  setSelectedPuzzleKey(key);
                }}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                  selectedPuzzleKey === key
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    : 'bg-slate-800/60 text-slate-400 hover:text-slate-200'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Hints Content */}
        <div className="p-5 overflow-y-auto space-y-4 flex-1">
          <div className="mb-2">
            <div className="flex items-center justify-between">
              <h4 className="text-base font-semibold text-slate-100">
                {currentPuzzle.title}
              </h4>
              <button
                onClick={() => soundManager.speak(currentPuzzle.titleEn)}
                className="p-1 text-slate-400 hover:text-sky-400 transition-colors cursor-pointer"
                title="聆聽英文發音"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-slate-400">{currentPuzzle.titleEn}</p>
          </div>

          {/* Tier 1 Hint */}
          <div className="p-4 rounded-lg bg-slate-800/60 border border-slate-700/70">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-sky-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-sky-400 inline-block" />
                第一層：觀察線索 (Observation)
              </span>
              <button
                onClick={() => soundManager.speak(currentPuzzle.hints[0].contentEn)}
                className="text-slate-400 hover:text-sky-300 cursor-pointer"
                title="發音"
              >
                <Volume2 className="w-3.5 h-3.5" />
              </button>
            </div>
            <p className="text-sm text-slate-200 leading-relaxed">
              {showBilingual ? currentPuzzle.hints[0].contentZh : currentPuzzle.hints[0].contentEn}
            </p>
            {showBilingual && (
              <p className="text-xs text-slate-400 mt-1 italic">
                {currentPuzzle.hints[0].contentEn}
              </p>
            )}
          </div>

          {/* Tier 2 Hint */}
          {currentUnlocked >= 2 ? (
            <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />
                  第二層：國二生活英文與邏輯解讀
                </span>
                <button
                  onClick={() => soundManager.speak(currentPuzzle.hints[1].contentEn)}
                  className="text-slate-400 hover:text-amber-300 cursor-pointer"
                  title="發音"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-sm text-slate-200 leading-relaxed whitespace-pre-line">
                {showBilingual ? currentPuzzle.hints[1].contentZh : currentPuzzle.hints[1].contentEn}
              </p>
              {showBilingual && (
                <p className="text-xs text-slate-400 mt-1.5 italic whitespace-pre-line">
                  {currentPuzzle.hints[1].contentEn}
                </p>
              )}
            </div>
          ) : (
            <div className="p-4 rounded-lg bg-slate-800/30 border border-dashed border-slate-700 text-center">
              <p className="text-xs text-slate-400 mb-2">卡關了嗎？點擊解鎖第二層英文詞彙與關鍵邏輯提示</p>
              <button
                onClick={handleUnlockNext}
                className="px-3 py-1.5 text-xs font-medium rounded-md bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 border border-amber-500/40 inline-flex items-center gap-1 cursor-pointer transition-colors"
              >
                解鎖第二層英文指引 <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Tier 3 Hint: Direct Solution */}
          {currentUnlocked >= 3 ? (
            <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" />
                  第三層：直接解答密技 (保證能通關！)
                </span>
              </div>
              <p className="text-sm text-slate-200 leading-relaxed whitespace-pre-line">
                {showBilingual ? currentPuzzle.hints[2].contentZh : currentPuzzle.hints[2].contentEn}
              </p>
            </div>
          ) : currentUnlocked === 2 ? (
            <div className="p-4 rounded-lg bg-slate-800/30 border border-dashed border-slate-700 text-center">
              <p className="text-xs text-slate-400 mb-2">想要直接看密碼與解法嗎？（放心看，學習最重要！）</p>
              <button
                onClick={handleUnlockNext}
                className="px-3 py-1.5 text-xs font-medium rounded-md bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 border border-emerald-500/40 inline-flex items-center gap-1 cursor-pointer transition-colors"
              >
                查看直接解答與詳解 <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : null}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-slate-800 bg-slate-900 flex justify-between items-center text-xs text-slate-400">
          <span>嶺東中學國中部 · 學以致用、誠以待人</span>
          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium rounded-lg transition-colors cursor-pointer"
          >
            返回密室
          </button>
        </div>
      </div>
    </div>
  );
};
