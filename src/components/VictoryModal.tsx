import React, { useState } from 'react';
import { Award, Trophy, Clock, HelpCircle, Share2, RotateCcw, Volume2, Sparkles, Check, Download } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface VictoryModalProps {
  isOpen: boolean;
  elapsedSeconds: number;
  hintsUsedCount: number;
  playerName: string;
  onPlayerNameChange: (name: string) => void;
  onPlayAgain: () => void;
}

export const VictoryModal: React.FC<VictoryModalProps> = ({
  isOpen,
  elapsedSeconds,
  hintsUsedCount,
  playerName,
  onPlayerNameChange,
  onPlayAgain,
}) => {
  const [copied, setCopied] = useState<boolean>(false);

  if (!isOpen) return null;

  const minutes = Math.floor(elapsedSeconds / 60);
  const seconds = elapsedSeconds % 60;
  const timeFormatted = `${minutes} 分 ${seconds} 秒`;

  const handleShare = () => {
    soundManager.playClick();
    const shareText = `🎉 我花了 ${timeFormatted} 成功逃出《嶺東中學國中部 802 班英文密室》！\n解開了課桌 6928、保險箱 3742、鐘樓窗台 705、文具櫃 4765，學會了國二必考校園英文單字！\n歡迎嶺東國中同學一起來挑戰！`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const handlePrint = () => {
    soundManager.playClick();
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-300">
      <div className="relative w-full max-w-2xl bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border-2 border-amber-500/60 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[95vh]">
        {/* Certificate Banner */}
        <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 px-6 py-5 text-slate-950 text-center relative">
          <div className="flex items-center justify-center gap-2 mb-1">
            <Trophy className="w-6 h-6 text-slate-950" />
            <span className="font-extrabold text-xs tracking-widest uppercase font-mono">
              LING TUNG HIGH SCHOOL · JUNIOR HIGH DIVISION
            </span>
            <Trophy className="w-6 h-6 text-slate-950" />
          </div>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight font-['Outfit']">
            🎉 恭喜成功逃出教室 · 放學回家！
          </h2>
          <p className="text-xs font-semibold text-slate-900 mt-1">
            嶺東中學國中部 802 班 · 國二英文實境解謎通關證書
          </p>
        </div>

        {/* Certificate Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-center">
          {/* Certificate Inner Card */}
          <div className="p-6 rounded-xl bg-slate-950/80 border border-amber-500/40 space-y-4 relative">
            <div className="absolute top-3 right-4 opacity-15">
              <Award className="w-24 h-24 text-amber-400" />
            </div>

            <div className="space-y-1">
              <span className="text-xs text-amber-400 font-mono tracking-wider">
                CERTIFICATE OF ESCAPE MASTERY
              </span>
              <h3 className="text-lg font-bold text-slate-100">
                嶺東中學 英文實境解謎大師
              </h3>
            </div>

            {/* Student Name */}
            <div className="max-w-xs mx-auto text-left">
              <label className="text-[11px] font-medium text-slate-400 block mb-1">
                通關學生姓名 / 學號：
              </label>
              <input
                type="text"
                value={playerName}
                onChange={(e) => onPlayerNameChange(e.target.value)}
                placeholder="輸入你的名字 (如: 國二 802 班 陳同學)"
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-amber-300 font-bold text-sm focus:outline-none focus:border-amber-400 text-center"
              />
            </div>

            {/* Achievement Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800 flex flex-col items-center justify-center">
                <Clock className="w-5 h-5 text-amber-400 mb-1" />
                <span className="text-[11px] text-slate-400">通關時間</span>
                <span className="font-mono font-bold text-base text-amber-300 tabular-nums">
                  {timeFormatted}
                </span>
              </div>

              <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800 flex flex-col items-center justify-center">
                <HelpCircle className="w-5 h-5 text-sky-400 mb-1" />
                <span className="text-[11px] text-slate-400">求助提示次數</span>
                <span className="font-mono font-bold text-base text-sky-300 tabular-nums">
                  {hintsUsedCount} 次
                </span>
              </div>

              <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800 flex flex-col items-center justify-center col-span-2 sm:col-span-1">
                <Sparkles className="w-5 h-5 text-emerald-400 mb-1" />
                <span className="text-[11px] text-slate-400">英文評級</span>
                <span className="font-bold text-sm text-emerald-300">
                  嶺東之光 ⭐⭐⭐
                </span>
              </div>
            </div>

            {/* Educational takeaway */}
            <div className="p-3 bg-amber-500/10 rounded-lg border border-amber-500/20 text-xs text-slate-300 text-left space-y-1">
              <div className="flex items-center justify-between">
                <strong className="text-amber-400">今日學習成果：</strong>
                <button
                  onClick={() => soundManager.speak('Congratulations! You solved all school puzzles and learned Grade 8 English.')}
                  className="text-amber-400 hover:text-white cursor-pointer"
                  title="朗讀"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              </div>
              <p>
                ✓ 掌握 14 個國二必考校園文具、時間與日程英文單字 (CEFR A1-A2)。
              </p>
              <p>
                ✓ 實踐嶺東校訓：<strong>「學以致用、誠以待人」</strong> (Apply what you learn, treat others with sincerity)。
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={handleShare}
              className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
              <span>{copied ? '成績文字已複製到剪貼簿！' : '複製通關戰績分享'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="w-full sm:w-auto px-4 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer border border-slate-700"
            >
              <Download className="w-4 h-4" />
              <span>列印 / 存為證書</span>
            </button>

            <button
              onClick={() => {
                soundManager.playClick();
                onPlayAgain();
              }}
              className="w-full sm:w-auto px-4 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer border border-slate-700"
            >
              <RotateCcw className="w-4 h-4" />
              <span>再玩一次</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-800 bg-slate-950 text-center text-xs text-slate-400">
          嶺東高級中學 附設國中部 · 台中市南屯區嶺東路 2 號
        </div>
      </div>
    </div>
  );
};
