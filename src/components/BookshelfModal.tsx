import React, { useState } from 'react';
import { X, Volume2, CheckCircle2, AlertCircle, HelpCircle, ChevronUp, ChevronDown, Sparkles } from 'lucide-react';
import bookshelfImg from '../assets/images/ling_tung_bookshelf_corner_1790153287466.jpg';
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
      setErrorMsg('密碼不正確！請按照 RED、BLUE、GREEN、YELLOW 順序填入數量。');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[95vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-800 bg-slate-900/90">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
            <h3 className="font-bold text-base text-slate-100 font-['Outfit']">
              調查班級圖書角：色彩文具櫃 (The Colored Stationery Cabinet)
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
            {/* Left: Bookshelf Image & Colored Stationery Counting */}
            <div className="space-y-3">
              <div className="relative rounded-xl overflow-hidden border border-slate-700/80 shadow-md bg-slate-950 aspect-[4/3]">
                <img
                  src={bookshelfImg}
                  alt="嶺東中學班級圖書角"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-2 left-3 right-3 text-xs text-slate-300 font-medium">
                  嶺東 802 班圖書角 · 散落的四色文具
                </div>
              </div>

              {/* Stationery Counting Box */}
              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2.5">
                <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
                  <span className="text-xs font-bold text-slate-200">
                    國二顏色與數量清點 (Count the Stationery)
                  </span>
                  <button
                    onClick={() => soundManager.speak('Count the stationery items: Four red markers, seven blue clips, six green crayons, and five yellow highlighters.')}
                    className="text-slate-400 hover:text-sky-300 cursor-pointer"
                    title="朗讀英文文具"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  {/* RED */}
                  <div className="p-2.5 rounded-lg bg-rose-500/15 border border-rose-500/30 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-rose-400 block">1. RED</span>
                      <span className="text-[11px] text-slate-300">Markers (彩色筆)</span>
                    </div>
                    <span className="font-mono font-bold text-lg text-rose-300">4</span>
                  </div>

                  {/* BLUE */}
                  <div className="p-2.5 rounded-lg bg-blue-500/15 border border-blue-500/30 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-blue-400 block">2. BLUE</span>
                      <span className="text-[11px] text-slate-300">Clips (迴紋針)</span>
                    </div>
                    <span className="font-mono font-bold text-lg text-blue-300">7</span>
                  </div>

                  {/* GREEN */}
                  <div className="p-2.5 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-emerald-400 block">3. GREEN</span>
                      <span className="text-[11px] text-slate-300">Crayons (粉蠟筆)</span>
                    </div>
                    <span className="font-mono font-bold text-lg text-emerald-300">6</span>
                  </div>

                  {/* YELLOW */}
                  <div className="p-2.5 rounded-lg bg-amber-500/15 border border-amber-500/30 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-amber-400 block">4. YELLOW</span>
                      <span className="text-[11px] text-slate-300">Highlighters (螢光筆)</span>
                    </div>
                    <span className="font-mono font-bold text-lg text-amber-300">5</span>
                  </div>
                </div>

                <p className="text-[11px] text-slate-400">
                  按色彩順序排列密碼：<strong className="text-amber-400">RED → BLUE → GREEN → YELLOW</strong>
                </p>
              </div>
            </div>

            {/* Right: Cabinet 4-dial lock */}
            <div className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-col justify-between space-y-5">
              <div>
                <h4 className="font-bold text-base text-slate-100">
                  文具櫃抽屜密碼鎖 (Cabinet Lock)
                </h4>
                <p className="text-xs text-slate-400 mt-1">
                  請按照紅、藍、綠、黃數量輸入密碼（提示：原版經典密碼為 4765）。
                </p>
              </div>

              {isSolved ? (
                <div className="p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                  <h4 className="text-base font-bold text-emerald-300">
                    文具櫃已解開！(Code: 4765)
                  </h4>
                  <p className="text-xs text-slate-300">
                    抽屜滑開了，裡面靜靜躺著最重要的通關道具：
                  </p>
                  <div className="flex items-center justify-center gap-2 text-xs font-semibold text-amber-300 bg-slate-900/80 py-2 px-3 rounded-lg border border-amber-500/30">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>黃金鑰匙碎片 (4/4) + 教室大門 RFID 磁卡！</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    四枚碎片已經可以拼成完整的大門黃金鑰匙！
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
                <span>CEFR A1 顏色與生活物品</span>
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
