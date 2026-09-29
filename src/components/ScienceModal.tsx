import React, { useState } from 'react';
import { X, Volume2, CheckCircle2, AlertCircle, HelpCircle, ChevronUp, ChevronDown, Sparkles, Bug, Maximize2, Image as ImageIcon } from 'lucide-react';
import sciencePuzzleImg from '../assets/images/puzzle_science_creatures_1790657455875.jpg';
import { soundManager } from '../utils/audio';

interface ScienceModalProps {
  isOpen: boolean;
  onClose: () => void;
  isSolved: boolean;
  onSolve: () => void;
  onOpenHint: () => void;
  showBilingual: boolean;
}

export const ScienceModal: React.FC<ScienceModalProps> = ({
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
    if (code === '6804') {
      soundManager.playUnlock();
      soundManager.playSuccess();
      onSolve();
    } else {
      soundManager.playError();
      setErrorMsg('生態密碼不正確！請依據圖片中四種生物標本的腿部數量（螞蟻、蜘蛛、蛇、犬）重新觀察。');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[95vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-800 bg-slate-900/90">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-lime-400" />
            <h3 className="font-bold text-base text-slate-100 font-['Outfit'] flex items-center gap-2">
              <Bug className="w-4 h-4 text-lime-400" />
              <span>調查自然生態角：生物足數圖像推理 (The Vivarium Specimen Visual Riddle)</span>
            </h3>
            <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-lime-500/20 text-lime-300 border border-lime-500/40">
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
            {/* Left: Pure Visual Specimen Riddle */}
            <div className="space-y-3">
              {/* Highlight Badge */}
              <div className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-lime-950/60 border border-lime-500/40 text-lime-200 text-xs font-medium">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-lime-400 animate-pulse" />
                  <strong>【純圖片題目 · 無文字題幹】</strong> 請直接觀察標本圖
                </span>
                <button
                  onClick={() =>
                    soundManager.speak(
                      'Visual deduction puzzle. Look at the four animal specimens in the picture. Count the legs of each creature from box 1 to 4 to find the four-digit passcode.'
                    )
                  }
                  className="text-lime-300 hover:text-white cursor-pointer"
                  title="朗讀提示"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Science Puzzle Image */}
              <div className="relative rounded-xl overflow-hidden border-2 border-lime-500/50 shadow-xl bg-slate-950 group">
                <img
                  src={sciencePuzzleImg}
                  alt="生物足數圖像推理標本"
                  referrerPolicy="no-referrer"
                  className="w-full h-auto object-cover aspect-[4/3] group-hover:scale-102 transition-transform duration-300"
                />
                <button
                  onClick={() => setIsZoomOpen(true)}
                  className="absolute bottom-3 right-3 px-2.5 py-1.5 rounded-lg bg-slate-900/85 hover:bg-slate-800 text-lime-300 border border-lime-500/40 text-xs font-medium flex items-center gap-1.5 backdrop-blur-sm cursor-pointer shadow-lg transition-colors"
                >
                  <Maximize2 className="w-3.5 h-3.5" /> 放大觀察生物標本圖
                </button>
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-slate-950/80 text-[10px] font-mono text-lime-300 border border-lime-500/30">
                  VISUAL PUZZLE #9
                </div>
              </div>

              {/* Visual Deduction Legend (NO text questions, purely mapping image items to digits) */}
              <div className="p-3.5 rounded-xl bg-lime-950/40 border border-lime-800/60 shadow-inner text-lime-100 space-y-2.5">
                <div className="flex items-center justify-between border-b border-lime-800/60 pb-1.5">
                  <span className="text-xs font-bold text-lime-300 flex items-center gap-1.5">
                    <Bug className="w-3.5 h-3.5" /> 觀察箱標本欄位索引 (Creature Specimen Index)
                  </span>
                  <span className="text-[10px] text-lime-400">數數看圖中各生物的腿 (Legs)</span>
                </div>

                <div className="grid grid-cols-4 gap-2 text-center text-xs">
                  <div className="p-2 rounded-lg bg-slate-900/90 border border-lime-700/50">
                    <div className="text-[10px] text-lime-400 font-bold">#1 標本</div>
                    <div className="text-xl my-0.5">🐜</div>
                    <div className="text-[11px] font-semibold text-slate-200">Ant (昆蟲)</div>
                    <div className="text-[10px] text-lime-300/90 mt-0.5">幾隻腳？</div>
                  </div>

                  <div className="p-2 rounded-lg bg-slate-900/90 border border-lime-700/50">
                    <div className="text-[10px] text-lime-400 font-bold">#2 標本</div>
                    <div className="text-xl my-0.5">🕷️</div>
                    <div className="text-[11px] font-semibold text-slate-200">Spider (蜘蛛)</div>
                    <div className="text-[10px] text-lime-300/90 mt-0.5">幾隻腳？</div>
                  </div>

                  <div className="p-2 rounded-lg bg-slate-900/90 border border-lime-700/50">
                    <div className="text-[10px] text-lime-400 font-bold">#3 標本</div>
                    <div className="text-xl my-0.5">🐍</div>
                    <div className="text-[11px] font-semibold text-slate-200">Snake (蛇)</div>
                    <div className="text-[10px] text-lime-300/90 mt-0.5">幾隻腳？</div>
                  </div>

                  <div className="p-2 rounded-lg bg-slate-900/90 border border-lime-700/50">
                    <div className="text-[10px] text-lime-400 font-bold">#4 標本</div>
                    <div className="text-xl my-0.5">🐕</div>
                    <div className="text-[11px] font-semibold text-slate-200">Dog (犬)</div>
                    <div className="text-[10px] text-lime-300/90 mt-0.5">幾隻腳？</div>
                  </div>
                </div>

                <p className="text-[11px] text-slate-400 text-center pt-1">
                  💡 無文字題幹：請直接由上方標本圖像計算腿部數量，依序 1 ➔ 2 ➔ 3 ➔ 4 輸入密碼。
                </p>
              </div>
            </div>

            {/* Right: 4-Digit Tumbler Lock */}
            <div className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-col justify-between space-y-5">
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-base text-slate-100">
                    生物箱密碼滾輪 (4-Digit Vivarium Lock)
                  </h4>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-lime-500/10 text-lime-400 border border-lime-500/30">
                    圖像推導
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  請將由標本圖片觀察出的 4 位數轉動至中央。
                </p>
              </div>

              {isSolved ? (
                <div className="p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                  <h4 className="text-base font-bold text-emerald-300">
                    觀察箱已開啟！(Code: 6804)
                  </h4>
                  <p className="text-xs text-slate-300">
                    箱子開啟，你獲得了磁卡解碼晶片與自然獎章：
                  </p>
                  <div className="flex items-center justify-center gap-2 text-xs font-semibold text-amber-300 bg-slate-900/80 py-2 px-3 rounded-lg border border-amber-500/30">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>大門 RFID 磁卡晶片升級 ➔ 門禁授權完整生效！</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    單字「insect」已收錄至單字筆記本中！
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* 4 Tumbler dials */}
                  <div className="flex justify-center items-center gap-2 sm:gap-3 py-4">
                    {digits.map((digit, idx) => (
                      <div key={idx} className="flex flex-col items-center">
                        <button
                          onClick={() => handleDigitChange(idx, 1)}
                          className="p-1.5 rounded text-slate-400 hover:text-lime-400 hover:bg-slate-800 transition-colors cursor-pointer"
                        >
                          <ChevronUp className="w-5 h-5" />
                        </button>
                        <div className="w-12 sm:w-14 h-20 rounded-lg bg-gradient-to-b from-lime-800 to-slate-900 border-2 border-lime-400/80 flex items-center justify-center shadow-lg">
                          <span className="font-mono text-3xl font-bold text-white tabular-nums drop-shadow">
                            {digit}
                          </span>
                        </div>
                        <button
                          onClick={() => handleDigitChange(idx, -1)}
                          className="p-1.5 rounded text-slate-400 hover:text-lime-400 hover:bg-slate-800 transition-colors cursor-pointer"
                        >
                          <ChevronDown className="w-5 h-5" />
                        </button>
                      </div>
                    ))}
                  </div>

                  {errorMsg && (
                    <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <button
                    onClick={handleUnlock}
                    className="w-full py-3 bg-lime-500 hover:bg-lime-400 active:bg-lime-600 text-slate-950 font-bold text-sm rounded-lg transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>解鎖生態觀察箱</span>
                  </button>
                </div>
              )}

              <div className="text-[11px] text-slate-400 border-t border-slate-850 pt-3 flex items-center justify-between">
                <span>嶺東中學國中部 802 自然角</span>
                <span>生物圖像特徵推理 (Visual Biology)</span>
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
          <div className="relative max-w-4xl w-full bg-slate-900 rounded-xl overflow-hidden border border-lime-500/50 shadow-2xl p-2">
            <div className="flex items-center justify-between px-3 py-2 border-b border-slate-800">
              <span className="text-xs font-bold text-lime-300">
                🔍 放大觀察：自然生態標本圖像題目 (Visual Specimen Riddle)
              </span>
              <button
                onClick={() => setIsZoomOpen(false)}
                className="p-1 rounded bg-slate-800 text-slate-300 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <img
              src={sciencePuzzleImg}
              alt="生物足數圖像題目大圖"
              className="w-full max-h-[75vh] object-contain rounded mt-2"
            />
          </div>
        </div>
      )}
    </div>
  );
};
