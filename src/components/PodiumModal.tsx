import React, { useState } from 'react';
import { X, Volume2, CheckCircle2, AlertCircle, HelpCircle, Delete, Tablet, Sparkles } from 'lucide-react';
import podiumImg from '../assets/images/podium_smart_tablet_1790650960248.jpg';
import { soundManager } from '../utils/audio';

interface PodiumModalProps {
  isOpen: boolean;
  onClose: () => void;
  isSolved: boolean;
  onSolve: () => void;
  onOpenHint: () => void;
  showBilingual: boolean;
}

export const PodiumModal: React.FC<PodiumModalProps> = ({
  isOpen,
  onClose,
  isSolved,
  onSolve,
  onOpenHint,
  showBilingual,
}) => {
  const [pinInput, setPinInput] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleKeyClick = (num: string) => {
    soundManager.playClick();
    setErrorMsg(null);
    if (pinInput.length < 4) {
      setPinInput((prev) => prev + num);
    }
  };

  const handleDelete = () => {
    soundManager.playClick();
    setErrorMsg(null);
    setPinInput((prev) => prev.slice(0, -1));
  };

  const handleClear = () => {
    soundManager.playClick();
    setErrorMsg(null);
    setPinInput('');
  };

  const handleUnlock = () => {
    if (pinInput === '8132') {
      soundManager.playUnlock();
      soundManager.playSuccess();
      onSolve();
    } else {
      soundManager.playError();
      setErrorMsg('平板密碼不正確！請仔細推導螢幕上的四道數列與常識邏輯。');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[95vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-800 bg-slate-900/90">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
            <h3 className="font-bold text-base text-slate-100 font-['Outfit'] flex items-center gap-2">
              <Tablet className="w-4 h-4 text-cyan-400" />
              <span>調查講台：智慧教學平板 (Teacher's Podium Tablet)</span>
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
            {/* Left: Tablet Screen UI with 4 logical clues */}
            <div className="space-y-3">
              {/* Tablet Photo */}
              <div className="relative rounded-xl overflow-hidden border border-slate-700/80 shadow-md bg-slate-950 aspect-[4/3]">
                <img
                  src={podiumImg}
                  alt="嶺東中學講台智慧平板"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-2 left-3 right-3 text-xs text-slate-300 font-medium">
                  嶺東 802 班講台 · 教師專用智慧平板電腦
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border-2 border-cyan-500/40 shadow-inner text-cyan-100 font-mono space-y-3">
                <div className="flex items-center justify-between border-b border-cyan-900/60 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                    <span className="text-xs font-bold text-cyan-300">
                      LING TUNG CLASS 802 · SMART TABLET OS
                    </span>
                  </div>
                  <button
                    onClick={() =>
                      soundManager.speak(
                        'English math sequence riddles. Number 1: 2, 4, 6, what comes next? Number 2: Smallest positive odd integer O-N-E. Number 3: Primary colors in art. Number 4: Items in a pair.'
                      )
                    }
                    className="text-cyan-400 hover:text-white cursor-pointer"
                    title="朗讀英文題目"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="p-2.5 rounded bg-cyan-950/40 border border-cyan-800/50 space-y-0.5">
                    <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider block">
                      [ Digit 1 ] Sequence Logic
                    </span>
                    <p className="text-slate-200 font-sans">
                      "Arithmetic pattern: <strong className="text-cyan-300 font-mono">2, 4, 6, [ ? ]</strong>. What is the next even number?"
                    </p>
                  </div>

                  <div className="p-2.5 rounded bg-cyan-950/40 border border-cyan-800/50 space-y-0.5">
                    <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider block">
                      [ Digit 2 ] Number Logic
                    </span>
                    <p className="text-slate-200 font-sans">
                      "Smallest positive odd integer: Spelled <strong className="text-cyan-300">O - N - E</strong>."
                    </p>
                  </div>

                  <div className="p-2.5 rounded bg-cyan-950/40 border border-cyan-800/50 space-y-0.5">
                    <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider block">
                      [ Digit 3 ] Art & Science
                    </span>
                    <p className="text-slate-200 font-sans">
                      "Count the primary colors in fine art: <strong className="text-cyan-300">Red, Yellow, Blue</strong>."
                    </p>
                  </div>

                  <div className="p-2.5 rounded bg-cyan-950/40 border border-cyan-800/50 space-y-0.5">
                    <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider block">
                      [ Digit 4 ] Unit Vocabulary
                    </span>
                    <p className="text-slate-200 font-sans">
                      "A single <strong className="text-cyan-300">pair</strong> of shoes or socks equals how many items?"
                    </p>
                  </div>
                </div>

                <p className="text-[10px] text-cyan-400/80 italic text-right">
                  * 依序組合四題答案數字解鎖平板
                </p>
              </div>

              {/* Note */}
              <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700 text-xs text-slate-300 space-y-1">
                <span className="font-semibold text-cyan-300">國中生活英文補充：</span>
                <p>
                  <strong>Pattern</strong> = 規律/數列；<strong>A pair of</strong> = 一雙/一對 (共 2 隻)。
                </p>
              </div>
            </div>

            {/* Right: Keypad */}
            <div className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-col justify-between space-y-4">
              <div>
                <h4 className="font-bold text-base text-slate-100">
                  平板鎖定畫面 (Enter Passcode)
                </h4>
                <p className="text-xs text-slate-400 mt-1">
                  請依據平板題目推理出的 4 位數 PIN 碼解鎖系統。
                </p>
              </div>

              {isSolved ? (
                <div className="p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                  <h4 className="text-base font-bold text-emerald-300">
                    平板已解鎖！(Code: 8132)
                  </h4>
                  <p className="text-xs text-slate-300">
                    平板螢幕亮起，顯示教學備份檔案與暗格開關！
                  </p>
                  <div className="flex items-center justify-center gap-2 text-xs font-semibold text-amber-300 bg-slate-900/80 py-2 px-3 rounded-lg border border-amber-500/30">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>黃金鑰匙碎片 (5/8) + 英文重點投影片</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    單字「tablet, pattern」已收錄至單字筆記本中！
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Digital PIN Display */}
                  <div className="p-3 bg-slate-900 border-2 border-slate-700 rounded-lg flex items-center justify-center gap-2">
                    {[0, 1, 2, 3].map((idx) => {
                      const char = pinInput[idx];
                      return (
                        <div
                          key={idx}
                          className="w-10 h-12 rounded bg-slate-950 border border-slate-800 flex items-center justify-center font-mono text-2xl font-bold text-cyan-400"
                        >
                          {char || '·'}
                        </div>
                      );
                    })}
                  </div>

                  {errorMsg && (
                    <div className="p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  {/* 0-9 Keypad */}
                  <div className="grid grid-cols-3 gap-2 max-w-[240px] mx-auto">
                    {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((num) => (
                      <button
                        key={num}
                        onClick={() => handleKeyClick(num)}
                        className="h-11 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-100 font-mono text-lg font-bold border border-slate-700 transition-colors active:scale-95 cursor-pointer"
                      >
                        {num}
                      </button>
                    ))}
                    <button
                      onClick={handleClear}
                      className="h-11 rounded-lg bg-slate-850 hover:bg-slate-800 text-slate-400 text-xs font-medium border border-slate-800 transition-colors cursor-pointer"
                    >
                      CLEAR
                    </button>
                    <button
                      onClick={() => handleKeyClick('0')}
                      className="h-11 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-100 font-mono text-lg font-bold border border-slate-700 transition-colors active:scale-95 cursor-pointer"
                    >
                      0
                    </button>
                    <button
                      onClick={handleDelete}
                      className="h-11 rounded-lg bg-slate-850 hover:bg-slate-800 text-slate-400 flex items-center justify-center border border-slate-800 transition-colors cursor-pointer"
                      aria-label="退格"
                    >
                      <Delete className="w-5 h-5" />
                    </button>
                  </div>

                  <button
                    onClick={handleUnlock}
                    disabled={pinInput.length !== 4}
                    className={`w-full py-2.5 rounded-lg font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                      pinInput.length === 4
                        ? 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-md cursor-pointer'
                        : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                    }`}
                  >
                    <span>確認送出 PIN 碼</span>
                  </button>
                </div>
              )}

              <div className="text-[11px] text-slate-400 border-t border-slate-850 pt-3 flex items-center justify-between">
                <span>嶺東中學國中部 802 講台</span>
                <span>CEFR A2 數列推理題目</span>
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
