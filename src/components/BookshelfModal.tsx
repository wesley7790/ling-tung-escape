import React, { useState } from 'react';
import { X, Volume2, CheckCircle2, AlertCircle, HelpCircle, ChevronUp, ChevronDown, Sparkles, Maximize2, Image as ImageIcon } from 'lucide-react';
import stationeryImg from '../assets/images/puzzle_stationery_count_1790657469655.jpg';
import { soundManager } from '../utils/audio';

interface BookshelfModalProps {
  isOpen: boolean;
  onClose: () => void;
  isSolved: boolean;
  onSolve: () => void;
  onOpenHint: () => void;
  showBilingual: boolean;
}

export const BookshelfModal: React.FC<BookshelfModalProps> = ({
  isOpen,
  onClose,
  isSolved,
  onSolve,
  onOpenHint,
  showBilingual,
}) => {
  const [digits, setDigits] = useState<number[]>([0, 0, 0, 0]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isZoomOpen, setIsZoomOpen] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleDigitChange = (index: number, delta: number) => {
    soundManager.playClick();
    setErrorMsg(null);
    setDigits((prev) => {
      const next = [...prev];
      next[index] = (next[index] + delta + 10) % 10;
      return next;
    });
  };

  const handleUnlock = () => {
    const code = digits.join('');
    if (code === '4765') {
      soundManager.playUnlock();
      soundManager.playSuccess();
      onSolve();
    } else {
      soundManager.playError();
      setErrorMsg('文具密碼不正確！請直接觀察圖片中紅、藍、綠、黃四格文具的真實數量。');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[95vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-800 bg-slate-900/90">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
            <h3 className="font-bold text-base text-slate-100 font-['Outfit']">
              調查班級圖書角：四色文具圖像推理 (The Stationery Image Riddle)
            </h3>
            <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40">
              <ImageIcon className="w-3 h-3" /> 純圖片推理題
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                soundManager.playClick();
                onOpenHint();
              }}
              className="px-2.5 py-1 text-xs font-medium rounded-md bg-amber-500/10 text-amber-300 border border-amber-500/30 hover:bg-amber-500/20 flex items-center gap-1 cursor-pointer transition-colors"
            >
              <HelpCircle className="w-3.5 h-3.5" /> 提示指引
            </button>
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
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
            {/* Left: Pure Visual Stationery Counting */}
            <div className="space-y-3">
              {/* Highlight Badge */}
              <div className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-purple-950/60 border border-purple-500/40 text-purple-200 text-xs font-medium">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
                  <strong>【純圖片題目 · 無文字題幹】</strong> 請直接由圖像數出數量
                </span>
                <button
                  onClick={() =>
                    soundManager.speak(
                      'Visual deduction puzzle. Look at the stationery organizer image. Count the red markers, blue clips, green crayons, and yellow highlighters to unlock the drawer.'
                    )
                  }
                  className="text-purple-300 hover:text-white cursor-pointer"
                  title="朗讀提示"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Stationery Puzzle Image */}
              <div className="relative rounded-xl overflow-hidden border-2 border-purple-500/50 shadow-xl bg-slate-950 group">
                <img
                  src={stationeryImg}
                  alt="四色文具收納圖像推理題目"
                  referrerPolicy="no-referrer"
                  className="w-full h-auto object-cover aspect-[4/3] group-hover:scale-102 transition-transform duration-300"
                />
                <button
                  onClick={() => setIsZoomOpen(true)}
                  className="absolute bottom-3 right-3 px-2.5 py-1.5 rounded-lg bg-slate-900/85 hover:bg-slate-800 text-purple-300 border border-purple-500/40 text-xs font-medium flex items-center gap-1.5 backdrop-blur-sm cursor-pointer shadow-lg transition-colors"
                >
                  <Maximize2 className="w-3.5 h-3.5" /> 放大查看文具圖片
                </button>
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-slate-950/80 text-[10px] font-mono text-purple-300 border border-purple-500/30">
                  VISUAL PUZZLE #5
                </div>
              </div>

              {/* Visual Deduction Legend (NO text questions, purely mapping color compartments) */}
              <div className="p-3.5 rounded-xl bg-purple-950/30 border border-purple-800/50 shadow-inner text-purple-100 space-y-2.5">
                <div className="flex items-center justify-between border-b border-purple-800/50 pb-1.5">
                  <span className="text-xs font-bold text-purple-300">
                    四色文具格欄對應索引 (Color Compartments Index)
                  </span>
                  <span className="text-[10px] text-purple-400">觀察各色文具件數</span>
                </div>

                <div className="grid grid-cols-4 gap-2 text-center text-xs">
                  <div className="p-2 rounded-lg bg-slate-900/90 border border-rose-600/50">
                    <div className="text-[10px] text-rose-400 font-bold">1. 紅色格</div>
                    <div className="text-xs font-bold text-rose-300 mt-1">Markers</div>
                    <div className="text-[10px] text-slate-300 mt-0.5">紅筆有幾支？</div>
                  </div>

                  <div className="p-2 rounded-lg bg-slate-900/90 border border-blue-600/50">
                    <div className="text-[10px] text-blue-400 font-bold">2. 藍色格</div>
                    <div className="text-xs font-bold text-blue-300 mt-1">Clips</div>
                    <div className="text-[10px] text-slate-300 mt-0.5">藍夾有幾個？</div>
                  </div>

                  <div className="p-2 rounded-lg bg-slate-900/90 border border-emerald-600/50">
                    <div className="text-[10px] text-emerald-400 font-bold">3. 綠色格</div>
                    <div className="text-xs font-bold text-emerald-300 mt-1">Crayons</div>
                    <div className="text-[10px] text-slate-300 mt-0.5">蠟筆有幾支？</div>
                  </div>

                  <div className="p-2 rounded-lg bg-slate-900/90 border border-amber-600/50">
                    <div className="text-[10px] text-amber-400 font-bold">4. 黃色格</div>
                    <div className="text-xs font-bold text-amber-300 mt-1">Highlighters</div>
                    <div className="text-[10px] text-slate-300 mt-0.5">螢光筆幾支？</div>
                  </div>
                </div>

                <p className="text-[11px] text-slate-400 text-center pt-1">
                  💡 無文字題幹：請直接由圖片中四個彩色收納格計算數量，依序 RED → BLUE → GREEN → YELLOW 撥動滾輪。
                </p>
              </div>
            </div>

            {/* Right: Cabinet 4-dial lock */}
            <div className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-col justify-between space-y-5">
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-base text-slate-100">
                    文具櫃抽屜密碼鎖 (Cabinet Lock)
                  </h4>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/30">
                    圖像推導
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  請按照紅、藍、綠、黃四色文具格中數出的數字撥動滾輪。
                </p>
              </div>

              {isSolved ? (
                <div className="p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                  <h4 className="text-base font-bold text-emerald-300">
                    文具櫃已解開！(Code: 4765)
                  </h4>
                  <p className="text-xs text-slate-300">
                    抽屜滑開了，裡面靜靜躺著通關道具：
                  </p>
                  <div className="flex items-center justify-center gap-2 text-xs font-semibold text-amber-300 bg-slate-900/80 py-2 px-3 rounded-lg border border-amber-500/30">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>黃金鑰匙碎片 (5/8) + 大門磁卡升級！</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    單字「stationery」已收錄至單字筆記本中！
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* 4 Dials with matching color rings */}
                  <div className="flex justify-center items-center gap-2 sm:gap-3 py-4">
                    {digits.map((digit, idx) => {
                      const ringColor =
                        idx === 0
                          ? 'border-rose-500 from-rose-700 to-rose-900'
                          : idx === 1
                          ? 'border-blue-500 from-blue-700 to-blue-900'
                          : idx === 2
                          ? 'border-emerald-500 from-emerald-700 to-emerald-900'
                          : 'border-amber-500 from-amber-700 to-amber-900';
                      return (
                        <div key={idx} className="flex flex-col items-center">
                          <button
                            onClick={() => handleDigitChange(idx, 1)}
                            className="p-1.5 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                          >
                            <ChevronUp className="w-5 h-5" />
                          </button>
                          <div className={`w-12 h-16 sm:w-14 sm:h-18 rounded-lg bg-gradient-to-b ${ringColor} border-2 flex items-center justify-center shadow-lg`}>
                            <span className="font-mono text-2xl sm:text-3xl font-bold text-white tabular-nums drop-shadow">
                              {digit}
                            </span>
                          </div>
                          <button
                            onClick={() => handleDigitChange(idx, -1)}
                            className="p-1.5 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                          >
                            <ChevronDown className="w-5 h-5" />
                          </button>
                        </div>
                      );
                    })}
                  </div>

                  {errorMsg && (
                    <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <button
                    onClick={handleUnlock}
                    className="w-full py-3 bg-purple-500 hover:bg-purple-400 active:bg-purple-600 text-slate-950 font-bold text-sm rounded-lg transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>解鎖文具櫃抽屜</span>
                  </button>
                </div>
              )}

              <div className="text-[11px] text-slate-400 border-t border-slate-850 pt-3 flex items-center justify-between">
                <span>嶺東中學國中部 802 班圖書角</span>
                <span>生活圖像觀察與數量推理 (Visual Count)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-slate-800 bg-slate-900 flex justify-end">
          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium rounded-lg text-xs transition-colors cursor-pointer"
          >
            返回教室全景
          </button>
        </div>
      </div>

      {/* Image Lightbox Zoom Modal */}
      {isZoomOpen && (
        <div className="fixed inset-0 z-60 bg-black/90 flex flex-col items-center justify-center p-4">
          <div className="relative max-w-4xl w-full bg-slate-900 rounded-xl overflow-hidden border border-purple-500/50 shadow-2xl p-2">
            <div className="flex items-center justify-between px-3 py-2 border-b border-slate-800">
              <span className="text-xs font-bold text-purple-300">
                🔍 放大觀察：四色文具格圖像題目 (Visual Stationery Riddle)
              </span>
              <button
                onClick={() => setIsZoomOpen(false)}
                className="p-1 rounded bg-slate-800 text-slate-300 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <img
              src={stationeryImg}
              alt="四色文具格圖像題目大圖"
              className="w-full max-h-[75vh] object-contain rounded mt-2"
            />
          </div>
        </div>
      )}
    </div>
  );
};
