import React, { useState } from 'react';
import { X, Backpack, Key, Search, Zap, CreditCard, Sparkles } from 'lucide-react';
import { InventoryItem } from '../types/game';
import { soundManager } from '../utils/audio';

interface InventoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  inventory: InventoryItem[];
}

export const InventoryModal: React.FC<InventoryModalProps> = ({
  isOpen,
  onClose,
  inventory,
}) => {
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(
    inventory[0] || null
  );

  if (!isOpen) return null;

  const getItemIcon = (iconName: string) => {
    switch (iconName) {
      case 'key':
        return <Key className="w-6 h-6 text-amber-400" />;
      case 'magnifier':
        return <Search className="w-6 h-6 text-sky-400" />;
      case 'uv':
        return <Zap className="w-6 h-6 text-purple-400" />;
      case 'card':
        return <CreditCard className="w-6 h-6 text-emerald-400" />;
      default:
        return <Sparkles className="w-6 h-6 text-amber-300" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800 bg-slate-900/90">
          <div className="flex items-center gap-2 text-amber-400">
            <Backpack className="w-5 h-5" />
            <h3 className="font-bold text-base text-slate-100 font-['Outfit']">
              學生書包道具欄 (Schoolbag Inventory)
            </h3>
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

        {/* Content */}
        <div className="p-5 space-y-4">
          {inventory.length === 0 ? (
            <div className="py-12 text-center text-slate-400">
              <Backpack className="w-12 h-12 mx-auto mb-3 opacity-30 text-slate-500" />
              <p className="text-sm">書包裡目前空空的。</p>
              <p className="text-xs text-slate-500 mt-1">
                去調查教室各個角落（課桌、黑板、窗台、圖書角）來尋找解謎道具吧！
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Item Slots */}
              <div className="space-y-2">
                <p className="text-xs font-semibold text-slate-400">已收集道具 ({inventory.length}/5)</p>
                <div className="grid grid-cols-2 gap-2">
                  {inventory.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        soundManager.playClick();
                        setSelectedItem(item);
                      }}
                      className={`p-3 rounded-lg border text-left flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                        selectedItem?.id === item.id
                          ? 'bg-amber-500/15 border-amber-500 text-amber-300 shadow-sm'
                          : 'bg-slate-800/60 border-slate-700/60 text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      {getItemIcon(item.icon)}
                      <span className="text-xs font-medium text-center truncate max-w-full">
                        {item.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Item Detail Inspector */}
              <div className="p-4 rounded-lg bg-slate-950/70 border border-slate-800 flex flex-col justify-between">
                {selectedItem ? (
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      {getItemIcon(selectedItem.icon)}
                      <div>
                        <h4 className="font-bold text-sm text-slate-100">
                          {selectedItem.name}
                        </h4>
                        <p className="text-[11px] text-amber-400 font-mono">
                          {selectedItem.nameEn}
                        </p>
                      </div>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed mt-2">
                      {selectedItem.description}
                    </p>
                    <p className="text-[11px] text-slate-400 italic mt-1">
                      {selectedItem.descriptionEn}
                    </p>
                  </div>
                ) : (
                  <p className="text-xs text-slate-500 text-center my-auto">
                    點擊左側道具檢視詳細資訊
                  </p>
                )}

                <div className="mt-4 pt-3 border-t border-slate-850 text-[11px] text-slate-400">
                  <span>嶺東中學國中部 802 班專用</span>
                </div>
              </div>
            </div>
          )}
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
            關閉書包
          </button>
        </div>
      </div>
    </div>
  );
};
