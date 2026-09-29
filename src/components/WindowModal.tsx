import React, { useState } from 'react';
import { X, Volume2, CheckCircle2, AlertCircle, HelpCircle, ChevronUp, ChevronDown, Sparkles } from 'lucide-react';
import windowImg from '../assets/images/clock_tower_window_1790650975415.jpg';
import { soundManager } from '../utils/audio';

interface WindowModalProps {
  isOpen: boolean;
  onClose: () => void;
  isSolved: boolean;
  onSolve: () => void;
  onOpenHint: () => void;
  showBilingual: boolean;
}

export const WindowModal: React.FC<WindowModalProps> = ({
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
    if (code === '705') {
      soundManager.playUnlock();
      soundManager.playSuccess();
      onSolve();
    } else {
      soundManager.playError();
      setErrorMsg('密碼不正確！請觀察窗外嶺東鐘樓時間與窗台吊飾順序。');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[95vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-800 bg-slate-900/90">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-500" />
            <h3 className="font-bold text-base text-slate-100 font-['Outfit']">
              調查教室窗台：嶺東鐘樓與風景 (The Clock Tower Window)
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
            {/* Left: Window View & Ornament Clue */}
            <div className="space-y-3">
              {/* Window Photo */}
              <div className="relative rounded-xl overflow-hidden border border-slate-700/80 shadow-md bg-slate-950 aspect-[4/3]">
                <img
                  src={windowImg}
                  alt="嶺東中學校園鐘樓窗景"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-2 left-3 right-3 text-xs text-slate-300 font-medium">
                  由 802 班窗台遠眺校園指標性「嶺東鐘樓」
                </div>
              </div>

              {/* Campus window scenery container */}
              <div className="p-4 rounded-xl bg-gradient-to-b from-sky-900 via-amber-950/40 to-slate-900 border-2 border-slate-700 shadow-md relative overflow-hidden">
                <div className="flex items-center justify-between border-b border-sky-750/60 pb-2 mb-3">
                  <div>
                    <span className="text-xs font-bold text-amber-300">
                      嶺東中學校園風景 (Ling Tung Campus)
                    </span>
                    <p className="text-[11px] text-slate-300">
                      由 802 班窗台遠眺指標性「嶺東鐘樓」
                    </p>
                  </div>
                  <button
                    onClick={() => soundManager.speak('Look through the window. The bell in the clock tower rings for morning assembly and dismissal.')}
                    className="text-sky-300 hover:text-white cursor-pointer"
                    title="朗讀英文風景"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Illustrated window elements */}
                <div className="py-2 px-3 bg-slate-950/70 rounded-lg border border-slate-800 space-y-2.5">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-full bg-amber-500/20 border border-amber-400 flex items-center justify-center font-bold text-amber-300 font-mono text-xs shrink-0 mt-0.5">
                      #1
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-200">早自習時間 (Morning Assembly Hour)</span>
                      <p className="text-[11px] text-slate-300">
                        「學校規定早上七點半 (7:30 AM) 開始早讀。取其<span className="text-amber-300 font-semibold">鐘面小時數 (Hour)</span>。」
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-full bg-sky-500/20 border border-sky-400 flex items-center justify-center font-bold text-sky-300 font-mono text-xs shrink-0 mt-0.5">
                      #2
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-200">掛飾幾何符號 (The Geometric Ornament)</span>
                      <p className="text-[11px] text-slate-300">
                        「窗台正中央掛著空心圓形飾品 (Circle / Round shape)，外形在阿拉伯數字中代表什麼數？」
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center font-bold text-emerald-300 font-mono text-xs shrink-0 mt-0.5">
                      #3
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-200">放學鐘聲時刻 (Dismissal Bell Hour)</span>
                      <p className="text-[11px] text-slate-300">
                        「嶺東國二週五放學時間為下午 5:00 PM。取其<span className="text-emerald-300 font-semibold">12 小時制之時針指向數字</span>。」
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-3 text-[11px] text-slate-400 italic">
                  * 窗台百葉窗拉繩掛飾由上而下串連：#1 早自習 ➔ #2 幾何圓 ➔ #3 放學鐘
                </div>
              </div>

              {/* Note */}
              <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700 text-xs text-slate-300 space-y-1">
                <span className="font-semibold text-amber-300">國中生活英文補充：</span>
                <p>
                  <strong>Morning assembly</strong> = 朝會早自習；<strong>Dismissal</strong> = 放學。
                  注意時鐘小時（Hour）與幾何形狀（Circle）的對應邏輯。
                </p>
              </div>
            </div>

            {/* Right: Window Storage Box with 3-digit lock */}
            <div className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-col justify-between space-y-5">
              <div>
                <h4 className="font-bold text-base text-slate-100">
                  窗台收納盒 (3-Digit Window Lockbox)
                </h4>
                <p className="text-xs text-slate-400 mt-1">
                  請將鐘樓時間與掛飾邏輯推理出的 3 位數字轉動至中央基準線。
                </p>
              </div>

              {isSolved ? (
                <div className="p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                  <h4 className="text-base font-bold text-emerald-300">
                    窗台收納盒開啟！(Code: 705)
                  </h4>
                  <p className="text-xs text-slate-300">
                    你在收納盒底層發現了珍貴物品：
                  </p>
                  <div className="flex items-center justify-center gap-2 text-xs font-semibold text-amber-300 bg-slate-900/80 py-2 px-3 rounded-lg border border-amber-500/30">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>黃金鑰匙碎片 (3/4) + 嶺東中學學生證</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    單字「clock, window」已收錄至單字筆記本中！
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
                          className="p-1.5 rounded text-slate-400 hover:text-sky-400 hover:bg-slate-800 transition-colors cursor-pointer"
                        >
                          <ChevronUp className="w-5 h-5" />
                        </button>
                        <div className="w-14 h-20 rounded-lg bg-gradient-to-b from-sky-700 to-sky-900 border-2 border-sky-400/80 flex items-center justify-center shadow-lg">
                          <span className="font-mono text-3xl font-bold text-white tabular-nums drop-shadow">
                            {digit}
                          </span>
                        </div>
                        <button
                          onClick={() => handleDigitChange(idx, -1)}
                          className="p-1.5 rounded text-slate-400 hover:text-sky-400 hover:bg-slate-800 transition-colors cursor-pointer"
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
                    className="w-full py-3 bg-sky-500 hover:bg-sky-400 active:bg-sky-600 text-slate-950 font-bold text-sm rounded-lg transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>解鎖窗台收納盒</span>
                  </button>
                </div>
              )}

              <div className="text-[11px] text-slate-400 border-t border-slate-850 pt-3 flex items-center justify-between">
                <span>台中市南屯區嶺東中學</span>
                <span>CEFR A1 校園時刻與幾何</span>
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
