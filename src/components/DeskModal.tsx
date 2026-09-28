import React, { useState } from 'react';
import { X, Volume2, CheckCircle2, AlertCircle, HelpCircle, ChevronUp, ChevronDown, Sparkles } from 'lucide-react';
import deskImg from '../assets/images/ling_tung_desk_investigation_1790153221718.jpg';
import { soundManager } from '../utils/audio';

interface DeskModalProps {
  isOpen: boolean;
  onClose: () => void;
  isSolved: boolean;
  onSolve: () => void;
  onOpenHint: () => void;
  showBilingual: boolean;
}

export const DeskModal: React.FC<DeskModalProps> = ({
  isOpen,
  onClose,
  isSolved,
  onSolve,
  onOpenHint,
  showBilingual,
}) => {
  const [digits, setDigits] = useState<number[]>([0, 0, 0, 0]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

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
    if (code === '6928') {
      soundManager.playUnlock();
      soundManager.playSuccess();
      onSolve();
    } else {
      soundManager.playError();
      setErrorMsg('密碼不正確！請仔細觀察考卷上的四道單字邏輯線索進行推理。');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[95vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-800 bg-slate-900/90">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <h3 className="font-bold text-base text-slate-100 font-['Outfit']">
              調查課桌：橘色密碼盒 (The Orange Lockbox)
            </h3>
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
            {/* Left: Desk visual with the torn English quiz paper */}
            <div className="space-y-3">
              <div className="relative rounded-xl overflow-hidden border border-slate-700/80 shadow-md bg-slate-950 aspect-[4/3]">
                <img
                  src={deskImg}
                  alt="嶺東中學課桌調查"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-2 left-3 right-3 text-xs text-slate-300 font-medium">
                  嶺東中學國中部 802 班課桌 · 散落的隨堂英文考卷
                </div>
              </div>

              {/* Clue Note Sheet */}
              <div className="p-4 rounded-xl bg-amber-50/95 text-slate-900 border border-amber-200 shadow-sm relative rotate-[-0.5deg]">
                <div className="absolute top-2 right-3 text-[10px] font-mono font-bold text-amber-700 tracking-wider">
                  GRADE 8 ENGLISH QUIZ
                </div>
                <h4 className="text-xs font-bold text-amber-900 mb-2 border-b border-amber-200 pb-1 flex items-center justify-between">
                  <span>嶺東中學 國二隨堂邏輯與單字解謎卷 (殘卷)</span>
                  <button
                    onClick={() => soundManager.speak('Grade 8 English logic puzzle. Clue one: You write with graphite. Clue two: Where we have English classes. Clue three: Furniture with drawers minus two. Clue four: A book for writing notes.')}
                    className="text-amber-800 hover:text-amber-950 cursor-pointer"
                    title="朗讀英文線索"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </h4>
                <p className="text-xs text-slate-700 mb-2.5">
                  「這張殘缺的考卷隱藏著密碼盒的 4 位數。請先依英文謎題推理出單字，再依指示計算字母數量：」
                </p>
                <div className="grid grid-cols-2 gap-2 text-xs font-mono font-semibold">
                  <div className="p-2.5 bg-white/90 rounded border border-amber-200/80">
                    <span className="text-amber-700 block text-[10px] font-bold">Digit 1 [Riddle]</span>
                    <span className="text-slate-800 text-xs block font-sans">
                      "I write with graphite, not ink. P _ _ _ _ L."
                    </span>
                    <span className="text-[10px] text-amber-900/80 font-mono mt-0.5 block">
                      ➔ [Letter count of this word]
                    </span>
                  </div>
                  <div className="p-2.5 bg-white/90 rounded border border-amber-200/80">
                    <span className="text-amber-700 block text-[10px] font-bold">Digit 2 [Riddle]</span>
                    <span className="text-slate-800 text-xs block font-sans">
                      "Where 802 students have class: C _ _ _ _ _ _ _ M."
                    </span>
                    <span className="text-[10px] text-amber-900/80 font-mono mt-0.5 block">
                      ➔ [Total letters in this place name]
                    </span>
                  </div>
                  <div className="p-2.5 bg-white/90 rounded border border-amber-200/80">
                    <span className="text-amber-700 block text-[10px] font-bold">Digit 3 [Logic]</span>
                    <span className="text-slate-800 text-xs block font-sans">
                      "Letters in 'DESK' minus (Vowels in 'NOTEBOOK')"
                    </span>
                    <span className="text-[10px] text-amber-900/80 font-mono mt-0.5 block">
                      ➔ [4 letters - 2 vowels (O, E)]
                    </span>
                  </div>
                  <div className="p-2.5 bg-white/90 rounded border border-amber-200/80">
                    <span className="text-amber-700 block text-[10px] font-bold">Digit 4 [Riddle]</span>
                    <span className="text-slate-800 text-xs block font-sans">
                      "Compound word: NOTE + BOOK = ?"
                    </span>
                    <span className="text-[10px] text-amber-900/80 font-mono mt-0.5 block">
                      ➔ [Total number of letters]
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: The Tumbler Lock UI */}
            <div className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-col justify-between space-y-5">
              <div>
                <h4 className="font-bold text-base text-slate-100 flex items-center gap-2">
                  <span>橘色密碼盒 (4-Digit Combination Lock)</span>
                </h4>
                <p className="text-xs text-slate-400 mt-1">
                  轉動 4 個滾輪輸入推理出的密碼，解鎖取得暗藏的道具與碎片。
                </p>
              </div>

              {isSolved ? (
                <div className="p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                  <h4 className="text-base font-bold text-emerald-300">
                    橘色密碼盒已開啟！(Unlocked: 6928)
                  </h4>
                  <p className="text-xs text-slate-300">
                    箱子彈開了！你在裡面發現了：
                  </p>
                  <div className="flex items-center justify-center gap-2 text-xs font-semibold text-amber-300 bg-slate-900/80 py-2 px-3 rounded-lg border border-amber-500/30">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>黃金鑰匙碎片 (1/4) + 紫外線黑色素手電筒</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    單字「pencil, classroom, desk, notebook」已自動存入你的單字筆記本中！
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
                          className="p-1.5 rounded text-slate-400 hover:text-amber-400 hover:bg-slate-800 transition-colors cursor-pointer"
                          aria-label={`增加第 ${idx + 1} 位數字`}
                        >
                          <ChevronUp className="w-5 h-5" />
                        </button>
                        <div className="w-12 h-16 sm:w-14 sm:h-18 rounded-lg bg-gradient-to-b from-amber-600 to-amber-800 border-2 border-amber-400/80 flex items-center justify-center shadow-lg">
                          <span className="font-mono text-2xl sm:text-3xl font-bold text-white tabular-nums drop-shadow">
                            {digit}
                          </span>
                        </div>
                        <button
                          onClick={() => handleDigitChange(idx, -1)}
                          className="p-1.5 rounded text-slate-400 hover:text-amber-400 hover:bg-slate-800 transition-colors cursor-pointer"
                          aria-label={`減少第 ${idx + 1} 位數字`}
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
                    className="w-full py-3 bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-slate-950 font-bold text-sm rounded-lg transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>解鎖橘色密碼盒</span>
                  </button>
                </div>
              )}

              <div className="text-[11px] text-slate-400 border-t border-slate-850 pt-3 flex items-center justify-between">
                <span>嶺東校訓：學以致用、誠以待人</span>
                <span>CEFR A1 字母計數謎題</span>
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
    </div>
  );
};
