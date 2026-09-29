import React, { useState } from 'react';
import { X, Volume2, CheckCircle2, AlertCircle, HelpCircle, Delete, Sparkles } from 'lucide-react';
import blackboardImg from '../assets/images/blackboard_wall_safe_1790650945915.jpg';
import { soundManager } from '../utils/audio';

interface BlackboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  isSolved: boolean;
  onSolve: () => void;
  onOpenHint: () => void;
  showBilingual: boolean;
}

export const BlackboardModal: React.FC<BlackboardModalProps> = ({
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
    if (pinInput === '3742') {
      soundManager.playUnlock();
      soundManager.playSuccess();
      onSolve();
    } else {
      soundManager.playError();
      setErrorMsg('密碼錯誤！請查看黑板便利貼上的四個自然與生活常識問題。');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[95vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-800 bg-slate-900/90">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <h3 className="font-bold text-base text-slate-100 font-['Outfit']">
              調查黑板與行事曆：暗格保險箱 (The Wall Safe)
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
            {/* Left: Blackboard & Sticky Note */}
            <div className="space-y-3">
              {/* Blackboard Image */}
              <div className="relative rounded-xl overflow-hidden border border-slate-700/80 shadow-md bg-slate-950 aspect-[4/3]">
                <img
                  src={blackboardImg}
                  alt="嶺東中學教室黑板與保險箱"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-2 left-3 right-3 text-xs text-slate-300 font-medium">
                  嶺東中學 802 班講台黑板 · 牆角暗格電子保險箱
                </div>
              </div>

              {/* Blackboard container */}
              <div className="p-4 rounded-xl bg-emerald-950 border-4 border-amber-900/80 shadow-inner text-emerald-100 font-mono">
                <div className="border-b border-emerald-800/80 pb-2 mb-3 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-amber-400 font-bold block">
                      嶺東高級中學 附設國中部
                    </span>
                    <span className="text-[11px] text-emerald-300">
                      校訓：學以致用、誠以待人
                    </span>
                  </div>
                  <button
                    onClick={() => soundManager.speak('Apply what you learn and treat others with sincerity. Class 802 timetable.')}
                    className="text-emerald-400 hover:text-white cursor-pointer"
                    title="朗讀校訓英文"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                {/* September Calendar / Timetable excerpt */}
                <div className="text-xs space-y-1.5">
                  <div className="text-amber-300 font-bold text-[11px] flex justify-between">
                    <span>SEPTEMBER SCHEDULE</span>
                    <span>CLASS 802</span>
                  </div>
                  <div className="grid grid-cols-5 gap-1 text-center text-[10px] bg-emerald-900/50 p-2 rounded">
                    <div><span className="font-bold text-amber-200">MON</span><div className="mt-1">Math</div></div>
                    <div><span className="font-bold text-amber-200">TUE</span><div className="mt-1">English</div></div>
                    <div><span className="font-bold text-amber-200">WED</span><div className="mt-1">Science</div></div>
                    <div><span className="font-bold text-amber-200">THU</span><div className="mt-1">PE</div></div>
                    <div><span className="font-bold text-amber-200">FRI</span><div className="mt-1 text-emerald-300 font-bold">Home!</div></div>
                  </div>
                </div>
              </div>

              {/* Yellow Sticky Note Clue */}
              <div className="p-4 rounded-xl bg-yellow-100 text-slate-900 border border-yellow-300 shadow-md rotate-[1deg] relative">
                <div className="flex items-center justify-between border-b border-yellow-200 pb-1 mb-2">
                  <span className="text-xs font-bold text-amber-900">
                    國二生活英語與自然邏輯推理題
                  </span>
                  <button
                    onClick={() => soundManager.speak('English logic riddles. Clue one: Letters in the yellow star at daytime. Clue two: How many days in one full week. Clue three: Four periods of the year: Spring, Summer, Fall, and Winter. Clue four: How many eyes can see the blackboard.')}
                    className="text-amber-800 hover:text-amber-950 cursor-pointer"
                    title="朗讀英文題目"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="space-y-2 text-xs text-slate-800">
                  <div className="bg-white/80 p-2 rounded border border-yellow-200">
                    <span className="text-amber-900 font-bold block text-[11px]">Pin 1: Science & English</span>
                    <p className="text-slate-700">
                      "I shine bright during the day and warm the Earth. Letters in this 3-letter star name: <span className="font-semibold text-amber-800">S _ N</span>."
                    </p>
                  </div>
                  <div className="bg-white/80 p-2 rounded border border-yellow-200">
                    <span className="text-amber-900 font-bold block text-[11px]">Pin 2: Time & Calendar Logic</span>
                    <p className="text-slate-700">
                      "From Monday to Sunday, how many total days make up <span className="font-semibold text-amber-800">one whole week</span>?"
                    </p>
                  </div>
                  <div className="bg-white/80 p-2 rounded border border-yellow-200">
                    <span className="text-amber-900 font-bold block text-[11px]">Pin 3: Seasons of the Year</span>
                    <p className="text-slate-700">
                      "Spring brings flowers, Summer is hot, Autumn is cool, Winter is cold. Count the <span className="font-semibold text-amber-800">seasons in a year</span>."
                    </p>
                  </div>
                  <div className="bg-white/80 p-2 rounded border border-yellow-200">
                    <span className="text-amber-900 font-bold block text-[11px]">Pin 4: Human Anatomy & Logic</span>
                    <p className="text-slate-700">
                      "You have one nose and one mouth, but how many <span className="font-semibold text-amber-800">eyes</span> do you use to read English?"
                    </p>
                  </div>
                </div>

                <p className="text-[10px] text-amber-800 mt-2 text-right">
                  依 1~4 題推理所得之數值依序輸入保險箱密碼！
                </p>
              </div>
            </div>

            {/* Right: Wall Safe Keypad */}
            <div className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-col justify-between space-y-4">
              <div>
                <h4 className="font-bold text-base text-slate-100">
                  暗格電子保險箱 (Digital Wall Safe)
                </h4>
                <p className="text-xs text-slate-400 mt-1">
                  請依四道英文邏輯推理題目，在鍵盤上輸入 4 位數 PIN 碼。
                </p>
              </div>

              {isSolved ? (
                <div className="p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                  <h4 className="text-base font-bold text-emerald-300">
                    保險箱已解鎖！(Code: 3742)
                  </h4>
                  <p className="text-xs text-slate-300">
                    厚重的鋼門喀噠一聲彈開了！
                  </p>
                  <div className="flex items-center justify-center gap-2 text-xs font-semibold text-amber-300 bg-slate-900/80 py-2 px-3 rounded-lg border border-amber-500/30">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>黃金鑰匙碎片 (2/4) + 高倍率放大鏡</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    單字「schedule, calendar, safe, season」已收錄至單字筆記本中！
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
                          className="w-10 h-12 rounded bg-slate-950 border border-slate-800 flex items-center justify-center font-mono text-2xl font-bold text-emerald-400"
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
                        ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-md cursor-pointer'
                        : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                    }`}
                  >
                    <span>確認送出密碼</span>
                  </button>
                </div>
              )}

              <div className="text-[11px] text-slate-400 border-t border-slate-850 pt-3 flex items-center justify-between">
                <span>嶺東中學國中部 802 班</span>
                <span>CEFR A1~A2 自然常識題</span>
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
