import React, { useState } from 'react';
import { X, Volume2, CheckCircle2, AlertCircle, HelpCircle, ChevronUp, ChevronDown, Sparkles, ClipboardList } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface BulletinModalProps {
  isOpen: boolean;
  onClose: () => void;
  isSolved: boolean;
  onSolve: () => void;
  onOpenHint: () => void;
  showBilingual: boolean;
}

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export const BulletinModal: React.FC<BulletinModalProps> = ({
  isOpen,
  onClose,
  isSolved,
  onSolve,
  onOpenHint,
  showBilingual,
}) => {
  const [letters, setLetters] = useState<string[]>(['A', 'A', 'A', 'A']);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleLetterChange = (index: number, delta: number) => {
    soundManager.playClick();
    setErrorMsg(null);
    setLetters((prev) => {
      const next = [...prev];
      const currentIdx = ALPHABET.indexOf(next[index]);
      const nextIdx = (currentIdx + delta + ALPHABET.length) % ALPHABET.length;
      next[index] = ALPHABET[nextIdx];
      return next;
    });
  };

  const handleUnlock = () => {
    const word = letters.join('');
    if (word === 'DUTY') {
      soundManager.playUnlock();
      soundManager.playSuccess();
      onSolve();
    } else {
      soundManager.playError();
      setErrorMsg('單字密碼不正確！請依據公佈欄四道首字母與學校責任謎語推理。');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[95vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-800 bg-slate-900/90">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-400" />
            <h3 className="font-bold text-base text-slate-100 font-['Outfit'] flex items-center gap-2">
              <ClipboardList className="w-4 h-4 text-indigo-400" />
              <span>調查後方公佈欄：值日與責任箱 (The Bulletin Board Mystery)</span>
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
            {/* Left: Bulletin Board Clues */}
            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-amber-950/30 border-2 border-amber-800/60 shadow-inner text-amber-100 space-y-3">
                <div className="flex items-center justify-between border-b border-amber-800/60 pb-2">
                  <span className="text-xs font-bold text-amber-300">
                    嶺東 802 班每週職責與榮譽排班表
                  </span>
                  <button
                    onClick={() =>
                      soundManager.speak(
                        'School responsibility puzzle. Every student has tasks to keep our classroom clean. Clue 1: Starts like Desk. Clue 2: Starts like Umbrella. Clue 3: Starts like Tuesday. Clue 4: Starts like Yellow.'
                      )
                    }
                    className="text-amber-400 hover:text-white cursor-pointer"
                    title="朗讀英文線索"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  「每位嶺東學生在校園中都有自己的職責與任務。這個 <strong className="text-amber-300 font-bold">4 個字母的英文單字</strong> 代表『值日、職責』：」
                </p>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded bg-slate-900/80 border border-amber-700/40">
                    <span className="text-[10px] text-amber-400 font-bold block">Letter 1:</span>
                    <p className="text-slate-200 mt-0.5">
                      First letter of <strong className="text-amber-300">"Desk"</strong> (課桌首字母)
                    </p>
                  </div>

                  <div className="p-2.5 rounded bg-slate-900/80 border border-amber-700/40">
                    <span className="text-[10px] text-amber-400 font-bold block">Letter 2:</span>
                    <p className="text-slate-200 mt-0.5">
                      First letter of <strong className="text-amber-300">"Umbrella"</strong> (雨傘首字母)
                    </p>
                  </div>

                  <div className="p-2.5 rounded bg-slate-900/80 border border-amber-700/40">
                    <span className="text-[10px] text-amber-400 font-bold block">Letter 3:</span>
                    <p className="text-slate-200 mt-0.5">
                      First letter of <strong className="text-amber-300">"Tuesday"</strong> (週二首字母)
                    </p>
                  </div>

                  <div className="p-2.5 rounded bg-slate-900/80 border border-amber-700/40">
                    <span className="text-[10px] text-amber-400 font-bold block">Letter 4:</span>
                    <p className="text-slate-200 mt-0.5">
                      First letter of <strong className="text-amber-300">"Yellow"</strong> (黃色首字母)
                    </p>
                  </div>
                </div>

                <p className="text-[10px] text-amber-400/80 italic text-right">
                  * 拼合為四字母英文單字解鎖輪盤
                </p>
              </div>

              {/* Note */}
              <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700 text-xs text-slate-300 space-y-1">
                <span className="font-semibold text-indigo-300">國中生活英文補充：</span>
                <p>
                  <strong>Duty</strong> = 值日；職責 (例如：Cleaning duty = 打掃值日)。
                </p>
              </div>
            </div>

            {/* Right: 4-Letter Word Lock */}
            <div className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-col justify-between space-y-5">
              <div>
                <h4 className="font-bold text-base text-slate-100">
                  英文字母輪盤鎖 (4-Letter Alphabet Lock)
                </h4>
                <p className="text-xs text-slate-400 mt-1">
                  請撥動四個字母滾輪，拼出代表學校職責的英文單字。
                </p>
              </div>

              {isSolved ? (
                <div className="p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                  <h4 className="text-base font-bold text-emerald-300">
                    字母鎖已解開！(Word: DUTY)
                  </h4>
                  <p className="text-xs text-slate-300">
                    值日箱喀噠一聲打開了，你找到了關鍵線索：
                  </p>
                  <div className="flex items-center justify-center gap-2 text-xs font-semibold text-amber-300 bg-slate-900/80 py-2 px-3 rounded-lg border border-amber-500/30">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>黃金鑰匙碎片 (6/8) + 802 班榮譽徽章</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    單字「bulletin, duty」已收錄至單字筆記本中！
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* 4 Alphabet Tumblers */}
                  <div className="flex justify-center items-center gap-2 sm:gap-3 py-4">
                    {letters.map((letter, idx) => (
                      <div key={idx} className="flex flex-col items-center">
                        <button
                          onClick={() => handleLetterChange(idx, 1)}
                          className="p-1.5 rounded text-slate-400 hover:text-indigo-400 hover:bg-slate-800 transition-colors cursor-pointer"
                        >
                          <ChevronUp className="w-5 h-5" />
                        </button>
                        <div className="w-12 h-16 sm:w-14 sm:h-18 rounded-lg bg-gradient-to-b from-indigo-700 to-indigo-900 border-2 border-indigo-400/80 flex items-center justify-center shadow-lg">
                          <span className="font-mono text-2xl sm:text-3xl font-bold text-white tabular-nums drop-shadow">
                            {letter}
                          </span>
                        </div>
                        <button
                          onClick={() => handleLetterChange(idx, -1)}
                          className="p-1.5 rounded text-slate-400 hover:text-indigo-400 hover:bg-slate-800 transition-colors cursor-pointer"
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
                    className="w-full py-3 bg-indigo-500 hover:bg-indigo-400 text-slate-950 font-bold text-sm rounded-lg transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>確認解鎖單字</span>
                  </button>
                </div>
              )}

              <div className="text-[11px] text-slate-400 border-t border-slate-850 pt-3 flex items-center justify-between">
                <span>嶺東中學國中部 802 班公佈欄</span>
                <span>CEFR A2 學校字彙與首字母推理</span>
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
