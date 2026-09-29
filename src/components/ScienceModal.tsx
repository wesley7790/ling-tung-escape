import React, { useState } from 'react';
import { X, Volume2, CheckCircle2, AlertCircle, HelpCircle, ChevronUp, ChevronDown, Sparkles, Bug, Leaf } from 'lucide-react';
import scienceImg from '../assets/images/science_corner_vivarium_1790651029926.jpg';
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
      setErrorMsg('生態密碼不正確！請依據四種生物的腿部數量（昆蟲、蜘蛛、蛇、犬）重新推理。');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[95vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-800 bg-slate-900/90">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-lime-400" />
            <h3 className="font-bold text-base text-slate-100 font-['Outfit'] flex items-center gap-2">
              <Bug className="w-4 h-4 text-lime-400" />
              <span>調查自然生態角：生物足數推理 (The Science Vivarium Lock)</span>
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
            {/* Left: Vivarium Biology Clues */}
            <div className="space-y-3">
              {/* Science Photo */}
              <div className="relative rounded-xl overflow-hidden border border-slate-700/80 shadow-md bg-slate-950 aspect-[4/3]">
                <img
                  src={scienceImg}
                  alt="嶺東中學自然生態角"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-2 left-3 right-3 text-xs text-slate-300 font-medium">
                  嶺東 802 班自然生態角 · 昆蟲生態箱與標本鎖盒
                </div>
              </div>

              <div className="p-4 rounded-xl bg-lime-950/40 border-2 border-lime-800/60 shadow-inner text-lime-100 space-y-3">
                <div className="flex items-center justify-between border-b border-lime-800/60 pb-2">
                  <div className="flex items-center gap-2">
                    <Leaf className="w-4 h-4 text-lime-300" />
                    <span className="text-xs font-bold text-lime-300">
                      自然科學角生物足數觀察表 (Creature Legs Clues)
                    </span>
                  </div>
                  <button
                    onClick={() =>
                      soundManager.speak(
                        'Animal biology logic riddles. Digit 1: How many legs does an ant have? Digit 2: How many legs does a spider have? Digit 3: How many legs does a snake have? Digit 4: How many legs does a dog have?'
                      )
                    }
                    className="text-lime-400 hover:text-white cursor-pointer"
                    title="朗讀英文題目"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  「觀察箱上的生物安全鎖由四種不同動物的 <strong className="text-lime-300 font-bold">腿（Legs）的數量</strong> 構成：」
                </p>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded bg-slate-900/80 border border-lime-700/40">
                    <span className="text-[10px] text-lime-400 font-bold block">Digit 1 [Insect]:</span>
                    <p className="text-slate-200 mt-0.5">
                      "How many legs does an <strong className="text-lime-300">Ant</strong> (insect) have?" (昆蟲共有幾隻腳？)
                    </p>
                  </div>

                  <div className="p-2.5 rounded bg-slate-900/80 border border-lime-700/40">
                    <span className="text-[10px] text-lime-400 font-bold block">Digit 2 [Arachnid]:</span>
                    <p className="text-slate-200 mt-0.5">
                      "How many legs does a <strong className="text-lime-300">Spider</strong> have?" (蜘蛛共有幾隻腳？)
                    </p>
                  </div>

                  <div className="p-2.5 rounded bg-slate-900/80 border border-lime-700/40">
                    <span className="text-[10px] text-lime-400 font-bold block">Digit 3 [Reptile]:</span>
                    <p className="text-slate-200 mt-0.5">
                      "How many legs does a <strong className="text-lime-300">Snake</strong> have?" (蛇有幾隻腳？)
                    </p>
                  </div>

                  <div className="p-2.5 rounded bg-slate-900/80 border border-lime-700/40">
                    <span className="text-[10px] text-lime-400 font-bold block">Digit 4 [Mammal]:</span>
                    <p className="text-slate-200 mt-0.5">
                      "How many legs does a <strong className="text-lime-300">Dog or Cat</strong> walk on?" (狗或貓有幾隻腳？)
                    </p>
                  </div>
                </div>

                <p className="text-[10px] text-lime-400/80 italic text-right">
                  * 依序組合：Ant ➔ Spider ➔ Snake ➔ Dog
                </p>
              </div>

              {/* Note */}
              <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700 text-xs text-slate-300 space-y-1">
                <span className="font-semibold text-lime-300">國中自然生活英文補充：</span>
                <p>
                  <strong>Insect (昆蟲)</strong> = 6 legs；<strong>Arachnid (蜘蛛)</strong> = 8 legs；<strong>Snake (蛇)</strong> = 0 legs。
                </p>
              </div>
            </div>

            {/* Right: 4-Digit Tumbler Lock */}
            <div className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-col justify-between space-y-5">
              <div>
                <h4 className="font-bold text-base text-slate-100">
                  生物箱密碼滾輪 (4-Digit Vivarium Lock)
                </h4>
                <p className="text-xs text-slate-400 mt-1">
                  請將四種動物足數推理出的 4 位數轉動至中央。
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
                        <div className="w-12 h-16 sm:w-14 sm:h-18 rounded-lg bg-gradient-to-b from-lime-700 to-lime-900 border-2 border-lime-400/80 flex items-center justify-center shadow-lg">
                          <span className="font-mono text-2xl sm:text-3xl font-bold text-white tabular-nums drop-shadow">
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
                <span>CEFR A1~A2 生物常識與數字推理</span>
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
