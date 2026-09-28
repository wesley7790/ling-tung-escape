import React from 'react';
import { X, Volume2, BookMarked, Sparkles } from 'lucide-react';
import { VOCABULARY_LIST } from '../data/puzzles';
import { soundManager } from '../utils/audio';

interface VocabularyModalProps {
  isOpen: boolean;
  onClose: () => void;
  learnedWordIds: string[];
}

export const VocabularyModal: React.FC<VocabularyModalProps> = ({
  isOpen,
  onClose,
  learnedWordIds,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800 bg-slate-900/90">
          <div className="flex items-center gap-2 text-sky-400">
            <BookMarked className="w-5 h-5" />
            <div>
              <h3 className="font-bold text-base text-slate-100 font-['Outfit']">
                國二英文單字筆記本 (Vocabulary Notebook)
              </h3>
              <p className="text-xs text-slate-400">
                CEFR A1~A2 基礎校園英文 · 點擊喇叭圖示可聆聽發音
              </p>
            </div>
          </div>
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

        {/* Word Grid */}
        <div className="p-5 overflow-y-auto space-y-3 flex-1">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>已收錄 {VOCABULARY_LIST.length} 個必考校園生活單字</span>
            <span className="text-emerald-400 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> 已在密室發現 {learnedWordIds.length} 個單字線索
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {VOCABULARY_LIST.map((item) => {
              const isDiscovered = learnedWordIds.includes(item.id);
              return (
                <div
                  key={item.id}
                  className={`p-3.5 rounded-lg border transition-all ${
                    isDiscovered
                      ? 'bg-slate-800/80 border-sky-500/40 shadow-sm'
                      : 'bg-slate-900/40 border-slate-800 text-slate-400'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-base font-bold text-slate-100 tracking-wide">
                          {item.word}
                        </span>
                        <span className="text-xs font-mono text-slate-400">
                          {item.phonetic}
                        </span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-sky-400 font-medium">
                          {item.level}
                        </span>
                      </div>
                      <p className="text-xs font-medium text-amber-300/90 mt-0.5">
                        {item.definitionZh}
                        <span className="text-slate-400 text-[11px] ml-1">({item.partOfSpeech})</span>
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        soundManager.playClick();
                        soundManager.speak(item.word);
                      }}
                      className="p-1.5 rounded-md bg-slate-800 hover:bg-sky-500/20 text-slate-300 hover:text-sky-300 transition-colors cursor-pointer"
                      title="發音"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="mt-2.5 pt-2 border-t border-slate-800/60 text-xs">
                    <p className="text-slate-300 flex items-center justify-between">
                      <span>{item.exampleSentence}</span>
                      <button
                        onClick={() => {
                          soundManager.playClick();
                          soundManager.speak(item.exampleSentence);
                        }}
                        className="ml-1 text-slate-500 hover:text-sky-300 cursor-pointer"
                        title="朗讀例句"
                      >
                        <Volume2 className="w-3 h-3" />
                      </button>
                    </p>
                    <p className="text-slate-400 text-[11px] mt-0.5">
                      {item.exampleSentenceZh}
                    </p>
                  </div>
                </div>
              );
            })}
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
            關閉筆記
          </button>
        </div>
      </div>
    </div>
  );
};
