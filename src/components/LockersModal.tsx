import React, { useState } from 'react';
import { X, Volume2, CheckCircle2, AlertCircle, HelpCircle, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Sparkles, Compass, Archive } from 'lucide-react';
import lockersImg from '../assets/images/student_lockers_pad_1790651001818.jpg';
import { soundManager } from '../utils/audio';

interface LockersModalProps {
  isOpen: boolean;
  onClose: () => void;
  isSolved: boolean;
  onSolve: () => void;
  onOpenHint: () => void;
  showBilingual: boolean;
}

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

export const LockersModal: React.FC<LockersModalProps> = ({
  isOpen,
  onClose,
  isSolved,
  onSolve,
  onOpenHint,
  showBilingual,
}) => {
  const [sequence, setSequence] = useState<Direction[]>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleAddDirection = (dir: Direction) => {
    soundManager.playClick();
    setErrorMsg(null);
    if (sequence.length < 4) {
      setSequence((prev) => [...prev, dir]);
    }
  };

  const handleClear = () => {
    soundManager.playClick();
    setErrorMsg(null);
    setSequence([]);
  };

  const handleUnlock = () => {
    const code = sequence.join('-');
    if (code === 'UP-RIGHT-DOWN-LEFT') {
      soundManager.playUnlock();
      soundManager.playSuccess();
      onSolve();
    } else {
      soundManager.playError();
      setErrorMsg('方向密碼不正確！請依據教室方位地圖指示（北、東、南、西）重新輸入。');
      setSequence([]);
    }
  };

  const getDirIcon = (dir: Direction) => {
    switch (dir) {
      case 'UP':
        return <ArrowUp className="w-5 h-5 text-teal-400" />;
      case 'DOWN':
        return <ArrowDown className="w-5 h-5 text-teal-400" />;
      case 'LEFT':
        return <ArrowLeft className="w-5 h-5 text-teal-400" />;
      case 'RIGHT':
        return <ArrowRight className="w-5 h-5 text-teal-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[95vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-800 bg-slate-900/90">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-teal-400" />
            <h3 className="font-bold text-base text-slate-100 font-['Outfit'] flex items-center gap-2">
              <Archive className="w-4 h-4 text-teal-400" />
              <span>調查班級置物櫃：四方方位鎖 (The Directional Locker)</span>
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
            {/* Left: Direction Map Clue */}
            <div className="space-y-3">
              {/* Lockers Photo */}
              <div className="relative rounded-xl overflow-hidden border border-slate-700/80 shadow-md bg-slate-950 aspect-[4/3]">
                <img
                  src={lockersImg}
                  alt="嶺東中學學生個人置物櫃"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-2 left-3 right-3 text-xs text-slate-300 font-medium">
                  嶺東 802 班學生置物櫃 · 十字方向感應密碼盤
                </div>
              </div>

              <div className="p-4 rounded-xl bg-teal-950/40 border-2 border-teal-800/60 shadow-inner text-teal-100 space-y-3">
                <div className="flex items-center justify-between border-b border-teal-800/60 pb-2">
                  <div className="flex items-center gap-2">
                    <Compass className="w-4 h-4 text-teal-300" />
                    <span className="text-xs font-bold text-teal-300">
                      教室方位地圖 (Classroom Orientation Map)
                    </span>
                  </div>
                  <button
                    onClick={() =>
                      soundManager.speak(
                        'Classroom compass directions: Step 1, Face North to the blackboard. Step 2, Turn East to the window. Step 3, Walk South to the desk. Step 4, Turn West to the exit door.'
                      )
                    }
                    className="text-teal-400 hover:text-white cursor-pointer"
                    title="朗讀英文方向"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  「置物櫃上裝著特殊的方向感應鎖。請依循尋寶地圖上的 4 個方位指引依序按下方向鍵：」
                </p>

                <div className="space-y-2 text-xs">
                  <div className="p-2.5 rounded bg-slate-900/80 border border-teal-700/40 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-teal-400 font-bold block">Step 1:</span>
                      <p className="text-slate-200">
                        "Face <strong className="text-teal-300">NORTH</strong> towards the Blackboard" (朝向黑板的正北方)
                      </p>
                    </div>
                    <span className="text-xs font-mono font-bold text-teal-400">▲ UP</span>
                  </div>

                  <div className="p-2.5 rounded bg-slate-900/80 border border-teal-700/40 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-teal-400 font-bold block">Step 2:</span>
                      <p className="text-slate-200">
                        "Turn <strong className="text-teal-300">EAST</strong> towards the morning Window" (轉向窗台的正東方)
                      </p>
                    </div>
                    <span className="text-xs font-mono font-bold text-teal-400">► RIGHT</span>
                  </div>

                  <div className="p-2.5 rounded bg-slate-900/80 border border-teal-700/40 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-teal-400 font-bold block">Step 3:</span>
                      <p className="text-slate-200">
                        "Walk <strong className="text-teal-300">SOUTH</strong> back to your Student Desk" (走回課桌的正南方)
                      </p>
                    </div>
                    <span className="text-xs font-mono font-bold text-teal-400">▼ DOWN</span>
                  </div>

                  <div className="p-2.5 rounded bg-slate-900/80 border border-teal-700/40 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-teal-400 font-bold block">Step 4:</span>
                      <p className="text-slate-200">
                        "Turn <strong className="text-teal-300">WEST</strong> towards the Exit Gate" (轉向大門的正西方)
                      </p>
                    </div>
                    <span className="text-xs font-mono font-bold text-teal-400">◄ LEFT</span>
                  </div>
                </div>

                <p className="text-[10px] text-teal-400/80 italic text-right">
                  * 依序點擊四個方向解鎖置物櫃
                </p>
              </div>

              {/* Note */}
              <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700 text-xs text-slate-300 space-y-1">
                <span className="font-semibold text-teal-300">國中生活英文補充：</span>
                <p>
                  <strong>North (北)</strong>、<strong>South (南)</strong>、<strong>East (東)</strong>、<strong>West (西)</strong> 為國中必考四大地理方位單字。
                </p>
              </div>
            </div>

            {/* Right: Directional Keypad */}
            <div className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-col justify-between space-y-5">
              <div>
                <h4 className="font-bold text-base text-slate-100">
                  十字方向密碼盤 (Directional Pad)
                </h4>
                <p className="text-xs text-slate-400 mt-1">
                  請點擊方向箭頭輸入 4 步方位密碼。
                </p>
              </div>

              {isSolved ? (
                <div className="p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                  <h4 className="text-base font-bold text-emerald-300">
                    置物櫃開啟！(Sequence: ▲ ► ▼ ◄)
                  </h4>
                  <p className="text-xs text-slate-300">
                    鎖扣彈開了，櫃子內部存放著：
                  </p>
                  <div className="flex items-center justify-center gap-2 text-xs font-semibold text-amber-300 bg-slate-900/80 py-2 px-3 rounded-lg border border-amber-500/30">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>黃金鑰匙碎片 (7/8) + 校園方位微型羅盤</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    單字「direction, locker」已收錄至單字筆記本中！
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Sequence Slot Display */}
                  <div className="p-3 bg-slate-900 border-2 border-slate-700 rounded-lg flex items-center justify-center gap-3">
                    {[0, 1, 2, 3].map((idx) => {
                      const dir = sequence[idx];
                      return (
                        <div
                          key={idx}
                          className="w-12 h-12 rounded bg-slate-950 border border-slate-800 flex items-center justify-center"
                        >
                          {dir ? getDirIcon(dir) : <span className="text-slate-600 font-mono text-sm">·</span>}
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

                  {/* 4-Way D-Pad Layout */}
                  <div className="flex flex-col items-center gap-2 py-2">
                    <button
                      onClick={() => handleAddDirection('UP')}
                      className="w-14 h-12 rounded-lg bg-slate-800 hover:bg-slate-700 active:bg-slate-600 text-teal-300 flex items-center justify-center border border-slate-700 transition-colors shadow-sm cursor-pointer"
                      title="上 (UP / NORTH)"
                    >
                      <ArrowUp className="w-6 h-6" />
                    </button>

                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => handleAddDirection('LEFT')}
                        className="w-14 h-12 rounded-lg bg-slate-800 hover:bg-slate-700 active:bg-slate-600 text-teal-300 flex items-center justify-center border border-slate-700 transition-colors shadow-sm cursor-pointer"
                        title="左 (LEFT / WEST)"
                      >
                        <ArrowLeft className="w-6 h-6" />
                      </button>

                      <button
                        onClick={handleClear}
                        className="w-14 h-12 rounded-lg bg-slate-850 hover:bg-slate-800 text-slate-400 text-xs font-bold border border-slate-800 transition-colors cursor-pointer"
                        title="清除"
                      >
                        RESET
                      </button>

                      <button
                        onClick={() => handleAddDirection('RIGHT')}
                        className="w-14 h-12 rounded-lg bg-slate-800 hover:bg-slate-700 active:bg-slate-600 text-teal-300 flex items-center justify-center border border-slate-700 transition-colors shadow-sm cursor-pointer"
                        title="右 (RIGHT / EAST)"
                      >
                        <ArrowRight className="w-6 h-6" />
                      </button>
                    </div>

                    <button
                      onClick={() => handleAddDirection('DOWN')}
                      className="w-14 h-12 rounded-lg bg-slate-800 hover:bg-slate-700 active:bg-slate-600 text-teal-300 flex items-center justify-center border border-slate-700 transition-colors shadow-sm cursor-pointer"
                      title="下 (DOWN / SOUTH)"
                    >
                      <ArrowDown className="w-6 h-6" />
                    </button>
                  </div>

                  <button
                    onClick={handleUnlock}
                    disabled={sequence.length !== 4}
                    className={`w-full py-2.5 rounded-lg font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                      sequence.length === 4
                        ? 'bg-teal-500 hover:bg-teal-400 text-slate-950 shadow-md cursor-pointer'
                        : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                    }`}
                  >
                    <span>確認送出方位密碼</span>
                  </button>
                </div>
              )}

              <div className="text-[11px] text-slate-400 border-t border-slate-850 pt-3 flex items-center justify-between">
                <span>嶺東中學國中部 802 班置物區</span>
                <span>CEFR A2 地理方位與路徑引導</span>
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
