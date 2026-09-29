import React, { useState } from 'react';
import { X, Volume2, CheckCircle2, AlertCircle, HelpCircle, ChevronUp, ChevronDown, Sparkles, Scale, Sparkle } from 'lucide-react';
import cleaningImg from '../assets/images/cleaning_corner_scale_1790651015323.jpg';
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
      setErrorMsg('天平密碼不正確！請依據水杯、水桶與水箱的等量倍數重新推算。');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[95vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-800 bg-slate-900/90">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-400" />
            <h3 className="font-bold text-base text-slate-100 font-['Outfit'] flex items-center gap-2">
              <Scale className="w-4 h-4 text-blue-400" />
              <span>調查衛生清潔角：天平容積推理 (The Cleaning Tool Scale)</span>
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
            {/* Left: Balance scale math clues */}
            <div className="space-y-3">
              {/* Cleaning Photo */}
              <div className="relative rounded-xl overflow-hidden border border-slate-700/80 shadow-md bg-slate-950 aspect-[4/3]">
                <img
                  src={cleaningImg}
                  alt="嶺東中學教室衛生清潔角"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-2 left-3 right-3 text-xs text-slate-300 font-medium">
                  嶺東 802 班衛生打掃角 · 容積天平與工具箱
                </div>
              </div>

              <div className="p-4 rounded-xl bg-blue-950/40 border-2 border-blue-800/60 shadow-inner text-blue-100 space-y-3">
                <div className="flex items-center justify-between border-b border-blue-800/60 pb-2">
                  <div className="flex items-center gap-2">
                    <Scale className="w-4 h-4 text-blue-300" />
                    <span className="text-xs font-bold text-blue-300">
                      天平與容積等式 (Mass & Volume Balance Clues)
                    </span>
                  </div>
                  <button
                    onClick={() =>
                      soundManager.speak(
                        'Cleaning balance clues. Clue 1: One cup equals three spoons of water. Clue 2: One bucket equals two cups. Clue 3: One big tank equals one bucket plus one cup.'
                      )
                    }
                    className="text-blue-400 hover:text-white cursor-pointer"
                    title="朗讀英文題目"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  「清潔工具車上的工具箱鎖需依據三個容器的容積等式推導 3 位數密碼：」
                </p>

                <div className="space-y-2 text-xs">
                  <div className="p-2.5 rounded bg-slate-900/80 border border-blue-700/40">
                    <span className="text-[10px] text-blue-400 font-bold block">Digit 1 [The Cup]:</span>
                    <p className="text-slate-200 mt-0.5">
                      "1 Cleaning Cup contains exactly <strong className="text-blue-300">3</strong> spoons of liquid cleaner."
                    </p>
                  </div>

                  <div className="p-2.5 rounded bg-slate-900/80 border border-blue-700/40">
                    <span className="text-[10px] text-blue-400 font-bold block">Digit 2 [The Bucket]:</span>
                    <p className="text-slate-200 mt-0.5">
                      "1 Mop Bucket equals the volume of <strong className="text-blue-300">2 Cups</strong> (3 × 2 = ?)"
                    </p>
                  </div>

                  <div className="p-2.5 rounded bg-slate-900/80 border border-blue-700/40">
                    <span className="text-[10px] text-blue-400 font-bold block">Digit 3 [The Big Tank]:</span>
                    <p className="text-slate-200 mt-0.5">
                      "1 Water Tank equals <strong className="text-blue-300">1 Bucket + 1 Cup</strong> (6 + 3 = ?)"
                    </p>
                  </div>
                </div>

                <p className="text-[10px] text-blue-400/80 italic text-right">
                  * 依序組合：Cup ➔ Bucket ➔ Tank
                </p>
              </div>

              {/* Note */}
              <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700 text-xs text-slate-300 space-y-1">
                <span className="font-semibold text-blue-300">國中生活英文補充：</span>
                <p>
                  <strong>Cup</strong> = 水杯；<strong>Bucket</strong> = 水桶；<strong>Tank</strong> = 大水箱。
                </p>
              </div>
            </div>

            {/* Right: 3-Digit Tumbler Lock */}
            <div className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-col justify-between space-y-5">
              <div>
                <h4 className="font-bold text-base text-slate-100">
                  清潔工具箱鎖 (3-Digit Tool Lock)
                </h4>
                <p className="text-xs text-slate-400 mt-1">
                  請將容積推理出的 3 位數字轉動至中央刻度。
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
                <span>CEFR A2 容積等式與生活數學</span>
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
