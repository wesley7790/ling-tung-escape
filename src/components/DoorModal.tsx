import React, { useState } from 'react';
import { X, Volume2, Key, CreditCard, Sparkles, HelpCircle, CheckCircle2, Lock, Unlock } from 'lucide-react';
import doorImg from '../assets/images/ling_tung_exit_door_1790153240536.jpg';
import { soundManager } from '../utils/audio';

interface DoorModalProps {
  isOpen: boolean;
  onClose: () => void;
  keyFragmentsCount: number;
  hasKeycard: boolean;
  onEscapeSuccess: () => void;
  onOpenHint: () => void;
  showBilingual: boolean;
}

export const DoorModal: React.FC<DoorModalProps> = ({
  isOpen,
  onClose,
  keyFragmentsCount,
  hasKeycard,
  onEscapeSuccess,
  onOpenHint,
  showBilingual,
}) => {
  const [q1Answer, setQ1Answer] = useState<string | null>(null);
  const [q2Answer, setQ2Answer] = useState<string | null>(null);
  const [q3Answer, setQ3Answer] = useState<string | null>(null);
  const [isKeyInserted, setIsKeyInserted] = useState<boolean>(false);
  const [isCardSwiped, setIsCardSwiped] = useState<boolean>(false);
  const [quizError, setQuizError] = useState<string | null>(null);

  if (!isOpen) return null;

  const isKeyComplete = keyFragmentsCount >= 4;

  const handleInsertKey = () => {
    if (!isKeyComplete) return;
    soundManager.playUnlock();
    setIsKeyInserted(true);
  };

  const handleSwipeCard = () => {
    if (!hasKeycard) return;
    soundManager.playClick();
    setIsCardSwiped(true);
  };

  const handleFinalOpen = () => {
    if (q1Answer !== 'A' || q2Answer !== 'B' || q3Answer !== 'C') {
      soundManager.playError();
      setQuizError('英文邏輯考核尚未全對喔！請再仔細推理校訓、情境對話與邏輯關係。');
      return;
    }

    if (!isKeyInserted || !isCardSwiped) {
      soundManager.playError();
      setQuizError('請先將拼裝好的黃金鑰匙插入鎖孔，並感應 RFID 磁卡！');
      return;
    }

    // Success! Escape!
    soundManager.playSchoolBell();
    soundManager.playSuccess();
    onEscapeSuccess();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[95vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-800 bg-slate-900/90">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
            <h3 className="font-bold text-base text-slate-100 font-['Outfit']">
              802 班教室大門門禁 (The Classroom Exit Gate)
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
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
            {/* Left: Door View & Key Requirements */}
            <div className="space-y-3">
              <div className="relative rounded-xl overflow-hidden border border-slate-700/80 shadow-md bg-slate-950 aspect-[4/3]">
                <img
                  src={doorImg}
                  alt="嶺東中學 802 班大門"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-2 left-3 right-3 text-xs text-amber-300 font-medium flex items-center justify-between">
                  <span>國中部 802 教室正門 · 通往校門與回家之路</span>
                  <Lock className="w-4 h-4 text-amber-400" />
                </div>
              </div>

              {/* Status checklist */}
              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2.5">
                <span className="text-xs font-bold text-slate-200 block">
                  門禁解鎖必備要件：
                </span>

                {/* Requirement 1: Key Fragments */}
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900 border border-slate-800 text-xs">
                  <div className="flex items-center gap-2">
                    <Key className={`w-4 h-4 ${isKeyComplete ? 'text-amber-400' : 'text-slate-500'}`} />
                    <span className={isKeyComplete ? 'text-slate-200' : 'text-slate-400'}>
                      黃金鑰匙碎片 ({keyFragmentsCount}/4)
                    </span>
                  </div>
                  {isKeyComplete ? (
                    <button
                      onClick={handleInsertKey}
                      disabled={isKeyInserted}
                      className={`px-2.5 py-1 rounded text-xs font-bold transition-all ${
                        isKeyInserted
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 cursor-default'
                          : 'bg-amber-500 hover:bg-amber-400 text-slate-950 cursor-pointer shadow-sm'
                      }`}
                    >
                      {isKeyInserted ? '✓ 已插入鑰匙孔' : '組裝並插入鑰匙'}
                    </button>
                  ) : (
                    <span className="text-[11px] text-slate-500">尚欠缺 {4 - keyFragmentsCount} 枚碎片</span>
                  )}
                </div>

                {/* Requirement 2: Keycard */}
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900 border border-slate-800 text-xs">
                  <div className="flex items-center gap-2">
                    <CreditCard className={`w-4 h-4 ${hasKeycard ? 'text-emerald-400' : 'text-slate-500'}`} />
                    <span className={hasKeycard ? 'text-slate-200' : 'text-slate-400'}>
                      大門 RFID 磁卡
                    </span>
                  </div>
                  {hasKeycard ? (
                    <button
                      onClick={handleSwipeCard}
                      disabled={isCardSwiped}
                      className={`px-2.5 py-1 rounded text-xs font-bold transition-all ${
                        isCardSwiped
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 cursor-default'
                          : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 cursor-pointer shadow-sm'
                      }`}
                    >
                      {isCardSwiped ? '✓ 感應成功' : '感應磁卡'}
                    </button>
                  ) : (
                    <span className="text-[11px] text-slate-500">請至圖書角文具櫃取得</span>
                  )}
                </div>
              </div>
            </div>

            {/* Right: English Security Check */}
            <div className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-col justify-between space-y-3.5">
              <div>
                <h4 className="font-bold text-base text-slate-100 flex items-center justify-between">
                  <span>嶺東國二英文與邏輯門禁考核</span>
                  <button
                    onClick={() => soundManager.speak('Final Ling Tung English security and logic questions.')}
                    className="text-slate-400 hover:text-sky-300 cursor-pointer"
                    title="朗讀英文題目"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  完成三道國二英文與邏輯思考題，方可啟動大門電磁鎖！
                </p>
              </div>

              {/* Question 1: School Motto */}
              <div className="space-y-1.5 text-xs">
                <p className="font-semibold text-amber-300">
                  Q1 [校訓英語]: 嶺東校訓「學以致用、誠以待人」的正確英文表述是？
                </p>
                <div className="space-y-1">
                  {[
                    { key: 'A', text: 'Apply what you learn, and treat others with sincerity.' },
                    { key: 'B', text: 'Play video games until late night without doing homework.' },
                    { key: 'C', text: 'Eat lunch in class and throw trash on the floor.' },
                  ].map((opt) => (
                    <button
                      key={opt.key}
                      onClick={() => {
                        soundManager.playClick();
                        setQ1Answer(opt.key);
                      }}
                      className={`w-full p-2 rounded-lg text-left text-xs transition-colors cursor-pointer flex items-center gap-2 border ${
                        q1Answer === opt.key
                          ? 'bg-amber-500/20 border-amber-500 text-amber-200 font-medium'
                          : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <span className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center font-bold text-[10px] shrink-0">
                        {opt.key}
                      </span>
                      <span>{opt.text}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Question 2: Friday Greeting */}
              <div className="space-y-1.5 text-xs">
                <p className="font-semibold text-amber-300">
                  Q2 [情境用語]: 週五下午 5:00 放學離校時，最得體的社交英文是？
                </p>
                <div className="space-y-1">
                  {[
                    { key: 'A', text: 'Trick or treat, give me something good to eat!' },
                    { key: 'B', text: 'Have a great weekend, see you next Monday!' },
                    { key: 'C', text: 'Good morning! Please open your book to page 1.' },
                  ].map((opt) => (
                    <button
                      key={opt.key}
                      onClick={() => {
                        soundManager.playClick();
                        setQ2Answer(opt.key);
                      }}
                      className={`w-full p-2 rounded-lg text-left text-xs transition-colors cursor-pointer flex items-center gap-2 border ${
                        q2Answer === opt.key
                          ? 'bg-amber-500/20 border-amber-500 text-amber-200 font-medium'
                          : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <span className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center font-bold text-[10px] shrink-0">
                        {opt.key}
                      </span>
                      <span>{opt.text}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Question 3: Logical Deduction */}
              <div className="space-y-1.5 text-xs">
                <p className="font-semibold text-amber-300">
                  Q3 [邏輯推理]: "Teacher is in Classroom, Chef is in Kitchen, Doctor is in Hospital. Who uses a key to escape from 802?"
                </p>
                <div className="space-y-1">
                  {[
                    { key: 'A', text: 'The Pilot flying in the sky.' },
                    { key: 'B', text: 'The Fish swimming in the sea.' },
                    { key: 'C', text: 'The Student (you) going home for Friday afternoon!' },
                  ].map((opt) => (
                    <button
                      key={opt.key}
                      onClick={() => {
                        soundManager.playClick();
                        setQ3Answer(opt.key);
                      }}
                      className={`w-full p-2 rounded-lg text-left text-xs transition-colors cursor-pointer flex items-center gap-2 border ${
                        q3Answer === opt.key
                          ? 'bg-amber-500/20 border-amber-500 text-amber-200 font-medium'
                          : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <span className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center font-bold text-[10px] shrink-0">
                        {opt.key}
                      </span>
                      <span>{opt.text}</span>
                    </button>
                  ))}
                </div>
              </div>

              {quizError && (
                <div className="p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">
                  {quizError}
                </div>
              )}

              {/* Final Release Action Button */}
              <button
                onClick={handleFinalOpen}
                disabled={!isKeyComplete || !hasKeycard}
                className={`w-full py-3 rounded-lg font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-lg ${
                  isKeyComplete && hasKeycard
                    ? 'bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 cursor-pointer animate-pulse'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                }`}
              >
                <Unlock className="w-5 h-5" />
                <span>開啟教室大門 · 放學回家！(Escape & Go Home)</span>
              </button>

              <div className="text-[11px] text-slate-400 border-t border-slate-850 pt-2 flex items-center justify-between">
                <span>嶺東中學國中部 802 班</span>
                <span>終點：放學鐘聲與通關證書</span>
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
