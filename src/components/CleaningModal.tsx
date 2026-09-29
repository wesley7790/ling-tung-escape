import React, { useState } from 'react';
import { X, Volume2, CheckCircle2, AlertCircle, HelpCircle, ChevronUp, ChevronDown, Sparkles, Scale, Maximize2, Image as ImageIcon } from 'lucide-react';
import cleaningPuzzleImg from '../assets/images/puzzle_cleaning_scales_v2_1790657440307.jpg';
import { soundManager } from '../utils/audio';

interface CleaningModalProps {
  isOpen: boolean;
  onClose: () => void;
  isSolved: boolean;
  onSolve: () => void;
  onOpenHint: () => void;
  showBilingual: boolean;
}

export const CleaningModal: React.FC<CleaningModalProps> = ({
  isOpen,
  onClose,
  isSolved,
  onSolve,
  onOpenHint,
  showBilingual,
}) => {
  const [digits, setDigits] = useState<number[]>([0, 0, 0]);
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
    if (code === '369') {
      soundManager.playUnlock();
      soundManager.playSuccess();
      onSolve();
    } else {
      soundManager.playError();
      setErrorMsg('天平密碼不正確！請依據圖片中的天平等量關係（水杯、水桶、水箱）重新推算。');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[95vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-800 bg-slate-900/90">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-400" />
            <h3 className="font-bold text-base text-slate-100 font-['Outfit'] flex items-center gap-2">
              <Scale className="w-4 h-4 text-blue-400" />
              <span>調查衛生清潔角：天平容積圖像推理 (The Cleaning Scale Visual Riddle)</span>
            </h3>
            <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
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
            {/* Left: Pure Visual Image Puzzle */}
            <div className="space-y-3">
              {/* Highlight Badge */}
              <div className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-cyan-950/60 border border-cyan-500/40 text-cyan-200 text-xs font-medium">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  <strong>【純圖片題目 · 無文字題幹】</strong> 請直接由圖像推理
                </span>
                <button
                  onClick={() =>
                    soundManager.speak(
                      'Visual deduction puzzle. Look closely at the balance scales image. Deduce the numbers for the cup, the bucket, and the water tank to unlock the box.'
                    )
                  }
                  className="text-cyan-300 hover:text-white cursor-pointer"
                  title="朗讀提示"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Cleaning Puzzle Image */}
              <div className="relative rounded-xl overflow-hidden border-2 border-cyan-500/50 shadow-xl bg-slate-950 group">
                <img
                  src={cleaningPuzzleImg}
                  alt="天平容積圖像推理題目"
                  referrerPolicy="no-referrer"
                  className="w-full h-auto object-cover aspect-[4/3] group-hover:scale-102 transition-transform duration-300"
                />
                <button
                  onClick={() => setIsZoomOpen(true)}
                  className="absolute bottom-3 right-3 px-2.5 py-1.5 rounded-lg bg-slate-900/85 hover:bg-slate-800 text-cyan-300 border border-cyan-500/40 text-xs font-medium flex items-center gap-1.5 backdrop-blur-sm cursor-pointer shadow-lg transition-colors"
                >
                  <Maximize2 className="w-3.5 h-3.5" /> 點擊放大查看圖片
                </button>
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-slate-950/80 text-[10px] font-mono text-cyan-300 border border-cyan-500/30">
                  VISUAL PUZZLE #8
                </div>
              </div>

              {/* Visual Deduction Legend (NO text questions, purely mapping image items to digits) */}
              <div className="p-3.5 rounded-xl bg-blue-950/40 border border-blue-800/60 shadow-inner text-blue-100 space-y-2.5">
                <div className="flex items-center justify-between border-b border-blue-800/60 pb-1.5">
                  <span className="text-xs font-bold text-blue-300 flex items-center gap-1.5">
                    <Scale className="w-3.5 h-3.5" /> 密碼欄位對應圖示 (Image Symbol Legend)
                  </span>
                  <span className="text-[10px] text-cyan-400">由圖中天平推算</span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-2 rounded-lg bg-slate-900/90 border border-blue-700/50">
                    <div className="text-[10px] text-blue-400 font-bold">第 1 位數</div>
                    <div className="text-xl my-0.5">🥛</div>
                    <div className="text-[11px] font-semibold text-slate-200">水杯 (Cup)</div>
                    <div className="text-[10px] text-cyan-300/90 mt-0.5">圖中對應幾匙？</div>
                  </div>

                  <div className="p-2 rounded-lg bg-slate-900/90 border border-blue-700/50">
                    <div className="text-[10px] text-blue-400 font-bold">第 2 位數</div>
                    <div className="text-xl my-0.5">🪣</div>
                    <div className="text-[11px] font-semibold text-slate-200">水桶 (Bucket)</div>
                    <div className="text-[10px] text-cyan-300/90 mt-0.5">圖中等同幾匙？</div>
                  </div>

                  <div className="p-2 rounded-lg bg-slate-900/90 border border-blue-700/50">
                    <div className="text-[10px] text-blue-400 font-bold">第 3 位數</div>
                    <div className="text-xl my-0.5">🛢️</div>
                    <div className="text-[11px] font-semibold text-slate-200">水箱 (Tank)</div>
                    <div className="text-[10px] text-cyan-300/90 mt-0.5">圖中等同幾匙？</div>
                  </div>
                </div>

                <p className="text-[11px] text-slate-400 text-center pt-1">
                  💡 無文字題幹：請直接看圖中天平天秤兩端的數量關係，依序輸入三位數密碼。
                </p>
              </div>
            </div>

            {/* Right: 3-Digit Tumbler Lock */}
            <div className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-col justify-between space-y-5">
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-base text-slate-100">
                    清潔工具箱鎖 (3-Digit Tool Lock)
                  </h4>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                    圖像推導
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  請將由天平圖像推理出的 3 位數字轉動至中央刻度。
                </p>
              </div>

              {isSolved ? (
                <div className="p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                  <h4 className="text-base font-bold text-emerald-300">
                    工具箱已開啟！(Code: 369)
                  </h4>
                  <p className="text-xs text-slate-300">
                    工具箱滑開，你獲得了最後一塊鑰匙構件：
                  </p>
                  <div className="flex items-center justify-center gap-2 text-xs font-semibold text-amber-300 bg-slate-900/80 py-2 px-3 rounded-lg border border-amber-500/30">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>黃金鑰匙碎片 (8/8) ➔ 完整金鑰匙拼裝完成！</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    單字「balance」已收錄至單字筆記本中！
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* 3 Tumbler dials */}
                  <div className="flex justify-center items-center gap-3 py-4">
                    {digits.map((digit, idx) => (
                      <div key={idx} className="flex flex-col items-center">
                        <button
                          onClick={() => handleDigitChange(idx, 1)}
                          className="p-1.5 rounded text-slate-400 hover:text-blue-400 hover:bg-slate-800 transition-colors cursor-pointer"
                        >
                          <ChevronUp className="w-5 h-5" />
                        </button>
                        <div className="w-14 h-20 rounded-lg bg-gradient-to-b from-blue-700 to-blue-900 border-2 border-blue-400/80 flex items-center justify-center shadow-lg">
                          <span className="font-mono text-3xl font-bold text-white tabular-nums drop-shadow">
                            {digit}
                          </span>
                        </div>
                        <button
                          onClick={() => handleDigitChange(idx, -1)}
                          className="p-1.5 rounded text-slate-400 hover:text-blue-400 hover:bg-slate-800 transition-colors cursor-pointer"
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
                    className="w-full py-3 bg-blue-500 hover:bg-blue-400 active:bg-blue-600 text-slate-950 font-bold text-sm rounded-lg transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>解鎖清潔工具箱</span>
                  </button>
                </div>
              )}

              <div className="text-[11px] text-slate-400 border-t border-slate-850 pt-3 flex items-center justify-between">
                <span>嶺東中學國中部 802 衛生角</span>
                <span>圖像等式邏輯推理 (Visual Logic)</span>
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
          <div className="relative max-w-4xl w-full bg-slate-900 rounded-xl overflow-hidden border border-cyan-500/50 shadow-2xl p-2">
            <div className="flex items-center justify-between px-3 py-2 border-b border-slate-800">
              <span className="text-xs font-bold text-cyan-300">
                🔍 放大觀察：天平容積圖像題目 (Visual Deduction Puzzle)
              </span>
              <button
                onClick={() => setIsZoomOpen(false)}
                className="p-1 rounded bg-slate-800 text-slate-300 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <img
              src={cleaningPuzzleImg}
              alt="天平容積圖像題目大圖"
              className="w-full max-h-[75vh] object-contain rounded mt-2"
            />
          </div>
        </div>
      )}
    </div>
  );
};
