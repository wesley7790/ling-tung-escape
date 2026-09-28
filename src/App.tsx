/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ClassroomView } from './components/ClassroomView';
import { DeskModal } from './components/DeskModal';
import { BlackboardModal } from './components/BlackboardModal';
import { WindowModal } from './components/WindowModal';
import { BookshelfModal } from './components/BookshelfModal';
import { DoorModal } from './components/DoorModal';
import { HintModal } from './components/HintModal';
import { InventoryModal } from './components/InventoryModal';
import { VocabularyModal } from './components/VocabularyModal';
import { VictoryModal } from './components/VictoryModal';
import { RoomArea, InventoryItem } from './types/game';
import { soundManager } from './utils/audio';

export default function App() {
  const [currentArea, setCurrentArea] = useState<RoomArea>('classroom');
  const [activeModal, setActiveModal] = useState<RoomArea | null>(null);

  const [solvedPuzzles, setSolvedPuzzles] = useState<Record<string, boolean>>({
    desk_box: false,
    blackboard_safe: false,
    window_view: false,
    bookshelf_stationery: false,
    exit_door: false,
  });

  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [learnedWordIds, setLearnedWordIds] = useState<string[]>([
    'classroom',
    'desk',
    'pencil',
  ]);

  const [hintsUsedCount, setHintsUsedCount] = useState<number>(0);
  const [startTime] = useState<number>(Date.now());
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [isEscaped, setIsEscaped] = useState<boolean>(false);
  const [isVictoryOpen, setIsVictoryOpen] = useState<boolean>(false);
  const [playerName, setPlayerName] = useState<string>('嶺東國二 802 班同學');
  const [showBilingual, setShowBilingual] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  // Aux modals
  const [isHintOpen, setIsHintOpen] = useState<boolean>(false);
  const [hintContextPuzzle, setHintContextPuzzle] = useState<string>('desk_box');
  const [isInventoryOpen, setIsInventoryOpen] = useState<boolean>(false);
  const [isVocabularyOpen, setIsVocabularyOpen] = useState<boolean>(false);

  // Timer loop
  useEffect(() => {
    if (isEscaped) return;
    const timer = setInterval(() => {
      setElapsedSeconds(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
    return () => clearInterval(timer);
  }, [startTime, isEscaped]);

  const handleToggleMute = () => {
    soundManager.isMuted = !soundManager.isMuted;
    setIsMuted(soundManager.isMuted);
    if (!soundManager.isMuted) {
      soundManager.playClick();
    }
  };

  const handleToggleBilingual = () => {
    setShowBilingual((prev) => !prev);
  };

  const handleSelectArea = (area: RoomArea) => {
    setCurrentArea(area);
    if (area !== 'classroom') {
      setActiveModal(area);
      // Map area to puzzle ID for hints
      const puzzleMap: Record<RoomArea, string> = {
        desk: 'desk_box',
        blackboard: 'blackboard_safe',
        window: 'window_view',
        bookshelf: 'bookshelf_stationery',
        door: 'exit_door',
        classroom: 'desk_box',
      };
      setHintContextPuzzle(puzzleMap[area]);
    }
  };

  const handleCloseModal = () => {
    setActiveModal(null);
    setCurrentArea('classroom');
  };

  // Open hint modal with context
  const handleOpenHintWithContext = (puzzleId?: string) => {
    if (puzzleId) {
      setHintContextPuzzle(puzzleId);
    }
    setIsHintOpen(true);
  };

  // Add item helper
  const addInventoryItem = (item: InventoryItem) => {
    setInventory((prev) => {
      if (prev.some((i) => i.id === item.id)) return prev;
      return [...prev, item];
    });
  };

  // Puzzle Solve Handlers
  const handleSolveDesk = () => {
    if (solvedPuzzles.desk_box) return;
    setSolvedPuzzles((prev) => ({ ...prev, desk_box: true }));
    addInventoryItem({
      id: 'key_fragment_1',
      name: '黃金鑰匙碎片 (1/4)',
      nameEn: 'Golden Key Fragment (1/4)',
      description: '從課桌橘色箱子中獲得的鑰匙齒片，上面刻有字樣「LING」。',
      descriptionEn: 'The first key fragment engraved with LING.',
      icon: 'key',
      puzzleSource: 'desk',
    });
    addInventoryItem({
      id: 'uv_pen',
      name: '紫外線手電筒',
      nameEn: 'UV Blacklight Pen',
      description: '可以照射出隱藏墨水痕跡的特殊探測筆。',
      descriptionEn: 'A UV blacklight used for revealing hidden marks.',
      icon: 'uv',
      puzzleSource: 'desk',
    });
    setLearnedWordIds((prev) => Array.from(new Set([...prev, 'pencil', 'classroom', 'desk', 'notebook'])));
  };

  const handleSolveBlackboard = () => {
    if (solvedPuzzles.blackboard_safe) return;
    setSolvedPuzzles((prev) => ({ ...prev, blackboard_safe: true }));
    addInventoryItem({
      id: 'key_fragment_2',
      name: '黃金鑰匙碎片 (2/4)',
      nameEn: 'Golden Key Fragment (2/4)',
      description: '從暗格保險箱獲得的鑰匙把柄，上面刻有「TUNG」。',
      descriptionEn: 'The second key fragment engraved with TUNG.',
      icon: 'key',
      puzzleSource: 'blackboard',
    });
    addInventoryItem({
      id: 'magnifier',
      name: '高倍率放大鏡',
      nameEn: 'Magnifying Glass',
      description: '能清晰閱讀細小字體與觀察暗號的工具。',
      descriptionEn: 'A clean magnifying glass for inspecting small clues.',
      icon: 'magnifier',
      puzzleSource: 'blackboard',
    });
    setLearnedWordIds((prev) => Array.from(new Set([...prev, 'schedule', 'calendar', 'safe', 'season'])));
  };

  const handleSolveWindow = () => {
    if (solvedPuzzles.window_view) return;
    setSolvedPuzzles((prev) => ({ ...prev, window_view: true }));
    addInventoryItem({
      id: 'key_fragment_3',
      name: '黃金鑰匙碎片 (3/4)',
      nameEn: 'Golden Key Fragment (3/4)',
      description: '從窗台收納盒獲得的鑰匙中軸，刻有「802」。',
      descriptionEn: 'The third key fragment engraved with 802.',
      icon: 'key',
      puzzleSource: 'window',
    });
    addInventoryItem({
      id: 'student_id',
      name: '嶺東中學學生證',
      nameEn: 'Ling Tung Student ID',
      description: '寫著「學以致用、誠以待人」的嶺東中學國中部學生證。',
      descriptionEn: 'Official Ling Tung Junior High Student ID card.',
      icon: 'card',
      puzzleSource: 'window',
    });
    setLearnedWordIds((prev) => Array.from(new Set([...prev, 'clock', 'window'])));
  };

  const handleSolveBookshelf = () => {
    if (solvedPuzzles.bookshelf_stationery) return;
    setSolvedPuzzles((prev) => ({ ...prev, bookshelf_stationery: true }));
    addInventoryItem({
      id: 'key_fragment_4',
      name: '黃金鑰匙碎片 (4/4)',
      nameEn: 'Golden Key Fragment (4/4)',
      description: '從文具櫃獲得的頂部圓環，四片碎片現在已能組成完整的黃金鑰匙！',
      descriptionEn: 'The fourth key fragment. All 4 pieces are now complete!',
      icon: 'key',
      puzzleSource: 'bookshelf',
    });
    addInventoryItem({
      id: 'rfid_keycard',
      name: '教室大門 RFID 磁卡',
      nameEn: 'Master RFID Keycard',
      description: '能感應解鎖 802 班級門禁系統的授權晶片卡。',
      descriptionEn: 'An authorized RFID card for the classroom exit door.',
      icon: 'card',
      puzzleSource: 'bookshelf',
    });
    setLearnedWordIds((prev) => Array.from(new Set([...prev, 'stationery', 'marker', 'keycard', 'motto'])));
  };

  const handleEscapeSuccess = () => {
    setSolvedPuzzles((prev) => ({ ...prev, exit_door: true }));
    setIsEscaped(true);
    setActiveModal(null);
    setIsVictoryOpen(true);
  };

  const handleResetGame = () => {
    if (confirm('確定要重新開始密室逃脫嗎？進度將會重置。')) {
      soundManager.playClick();
      setSolvedPuzzles({
        desk_box: false,
        blackboard_safe: false,
        window_view: false,
        bookshelf_stationery: false,
        exit_door: false,
      });
      setInventory([]);
      setLearnedWordIds(['classroom', 'desk', 'pencil']);
      setHintsUsedCount(0);
      setElapsedSeconds(0);
      setIsEscaped(false);
      setIsVictoryOpen(false);
      setActiveModal(null);
      setCurrentArea('classroom');
    }
  };

  // Count fragments
  const keyFragmentsCount = [
    solvedPuzzles.desk_box,
    solvedPuzzles.blackboard_safe,
    solvedPuzzles.window_view,
    solvedPuzzles.bookshelf_stationery,
  ].filter(Boolean).length;

  const hasKeycard = !!solvedPuzzles.bookshelf_stationery;
  const solvedCount = Object.values(solvedPuzzles).filter(Boolean).length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Bar adheres to Top Bar Contract */}
      <Header
        onOpenVocabulary={() => setIsVocabularyOpen(true)}
        onOpenInventory={() => setIsInventoryOpen(true)}
        onOpenHint={() => handleOpenHintWithContext()}
        onResetGame={handleResetGame}
        inventoryCount={inventory.length}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        elapsedSeconds={elapsedSeconds}
        solvedCount={solvedCount}
        totalPuzzles={5}
        showBilingual={showBilingual}
        onToggleBilingual={handleToggleBilingual}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 space-y-6">
        <ClassroomView
          onSelectArea={handleSelectArea}
          solvedPuzzles={solvedPuzzles}
          keyFragmentsCount={keyFragmentsCount}
          hasKeycard={hasKeycard}
          showBilingual={showBilingual}
        />
      </main>

      {/* Modals */}
      <DeskModal
        isOpen={activeModal === 'desk'}
        onClose={handleCloseModal}
        isSolved={solvedPuzzles.desk_box}
        onSolve={handleSolveDesk}
        onOpenHint={() => handleOpenHintWithContext('desk_box')}
        showBilingual={showBilingual}
      />

      <BlackboardModal
        isOpen={activeModal === 'blackboard'}
        onClose={handleCloseModal}
        isSolved={solvedPuzzles.blackboard_safe}
        onSolve={handleSolveBlackboard}
        onOpenHint={() => handleOpenHintWithContext('blackboard_safe')}
        showBilingual={showBilingual}
      />

      <WindowModal
        isOpen={activeModal === 'window'}
        onClose={handleCloseModal}
        isSolved={solvedPuzzles.window_view}
        onSolve={handleSolveWindow}
        onOpenHint={() => handleOpenHintWithContext('window_view')}
        showBilingual={showBilingual}
      />

      <BookshelfModal
        isOpen={activeModal === 'bookshelf'}
        onClose={handleCloseModal}
        isSolved={solvedPuzzles.bookshelf_stationery}
        onSolve={handleSolveBookshelf}
        onOpenHint={() => handleOpenHintWithContext('bookshelf_stationery')}
        showBilingual={showBilingual}
      />

      <DoorModal
        isOpen={activeModal === 'door'}
        onClose={handleCloseModal}
        keyFragmentsCount={keyFragmentsCount}
        hasKeycard={hasKeycard}
        onEscapeSuccess={handleEscapeSuccess}
        onOpenHint={() => handleOpenHintWithContext('exit_door')}
        showBilingual={showBilingual}
      />

      {/* Utilities Modals */}
      <HintModal
        isOpen={isHintOpen}
        onClose={() => setIsHintOpen(false)}
        activePuzzleId={hintContextPuzzle}
        onHintUsed={() => setHintsUsedCount((prev) => prev + 1)}
        showBilingual={showBilingual}
      />

      <InventoryModal
        isOpen={isInventoryOpen}
        onClose={() => setIsInventoryOpen(false)}
        inventory={inventory}
      />

      <VocabularyModal
        isOpen={isVocabularyOpen}
        onClose={() => setIsVocabularyOpen(false)}
        learnedWordIds={learnedWordIds}
      />

      <VictoryModal
        isOpen={isVictoryOpen}
        elapsedSeconds={elapsedSeconds}
        hintsUsedCount={hintsUsedCount}
        playerName={playerName}
        onPlayerNameChange={setPlayerName}
        onPlayAgain={handleResetGame}
      />

      {/* Quiet Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>嶺東高級中學 附設國中部 · 國二英文實境解謎系列</span>
          <span>校訓：學以致用、誠以待人 · CEFR A1~A2 英語生活情境學習</span>
        </div>
      </footer>
    </div>
  );
}
