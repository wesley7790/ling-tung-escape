/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ClassroomView } from './components/ClassroomView';
import { DeskModal } from './components/DeskModal';
import { BlackboardModal } from './components/BlackboardModal';
import { PodiumModal } from './components/PodiumModal';
import { WindowModal } from './components/WindowModal';
import { BookshelfModal } from './components/BookshelfModal';
import { BulletinModal } from './components/BulletinModal';
import { LockersModal } from './components/LockersModal';
import { CleaningModal } from './components/CleaningModal';
import { ScienceModal } from './components/ScienceModal';
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
    podium_tablet: false,
    window_view: false,
    bookshelf_stationery: false,
    bulletin_board: false,
    lockers_mystery: false,
    cleaning_corner: false,
    science_corner: false,
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
        podium: 'podium_tablet',
        window: 'window_view',
        bookshelf: 'bookshelf_stationery',
        bulletin: 'bulletin_board',
        lockers: 'lockers_mystery',
        cleaning: 'cleaning_corner',
        science: 'science_corner',
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

  // Puzzle Solve Handlers (10 Stations)
  const handleSolveDesk = () => {
    if (solvedPuzzles.desk_box) return;
    setSolvedPuzzles((prev) => ({ ...prev, desk_box: true }));
    addInventoryItem({
      id: 'key_fragment_1',
      name: '黃金鑰匙碎片 (1/8)',
      nameEn: 'Golden Key Fragment (1/8)',
      description: '從課桌橘色箱子中獲得的鑰匙前端齒片，刻有「L」。',
      descriptionEn: 'The first key fragment engraved with L.',
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
      name: '黃金鑰匙碎片 (2/8)',
      nameEn: 'Golden Key Fragment (2/8)',
      description: '從暗格保險箱獲得的齒片，刻有「I」。',
      descriptionEn: 'The second key fragment engraved with I.',
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

  const handleSolvePodium = () => {
    if (solvedPuzzles.podium_tablet) return;
    setSolvedPuzzles((prev) => ({ ...prev, podium_tablet: true }));
    addInventoryItem({
      id: 'key_fragment_3',
      name: '黃金鑰匙碎片 (3/8)',
      nameEn: 'Golden Key Fragment (3/8)',
      description: '從講台智慧平板暗槽獲得的鑰匙中軸，刻有「N」。',
      descriptionEn: 'The third key fragment engraved with N.',
      icon: 'key',
      puzzleSource: 'podium',
    });
    setLearnedWordIds((prev) => Array.from(new Set([...prev, 'tablet', 'pattern'])));
  };

  const handleSolveWindow = () => {
    if (solvedPuzzles.window_view) return;
    setSolvedPuzzles((prev) => ({ ...prev, window_view: true }));
    addInventoryItem({
      id: 'key_fragment_4',
      name: '黃金鑰匙碎片 (4/8)',
      nameEn: 'Golden Key Fragment (4/8)',
      description: '從窗台收納盒獲得的鑰匙部件，刻有「G」。',
      descriptionEn: 'The fourth key fragment engraved with G.',
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
      id: 'key_fragment_5',
      name: '黃金鑰匙碎片 (5/8)',
      nameEn: 'Golden Key Fragment (5/8)',
      description: '從圖書角文具櫃抽屜獲得的鑰匙桿，刻有「T」。',
      descriptionEn: 'The fifth key fragment engraved with T.',
      icon: 'key',
      puzzleSource: 'bookshelf',
    });
    setLearnedWordIds((prev) => Array.from(new Set([...prev, 'stationery', 'marker'])));
  };

  const handleSolveBulletin = () => {
    if (solvedPuzzles.bulletin_board) return;
    setSolvedPuzzles((prev) => ({ ...prev, bulletin_board: true }));
    addInventoryItem({
      id: 'key_fragment_6',
      name: '黃金鑰匙碎片 (6/8)',
      nameEn: 'Golden Key Fragment (6/8)',
      description: '從後方公佈欄值日盒獲得的鑰匙部件，刻有「U」。',
      descriptionEn: 'The sixth key fragment engraved with U.',
      icon: 'key',
      puzzleSource: 'bulletin',
    });
    setLearnedWordIds((prev) => Array.from(new Set([...prev, 'bulletin', 'duty'])));
  };

  const handleSolveLockers = () => {
    if (solvedPuzzles.lockers_mystery) return;
    setSolvedPuzzles((prev) => ({ ...prev, lockers_mystery: true }));
    addInventoryItem({
      id: 'key_fragment_7',
      name: '黃金鑰匙碎片 (7/8)',
      nameEn: 'Golden Key Fragment (7/8)',
      description: '從個人置物櫃暗格獲得的鑰匙部件，刻有「N」。',
      descriptionEn: 'The seventh key fragment engraved with N.',
      icon: 'key',
      puzzleSource: 'lockers',
    });
    setLearnedWordIds((prev) => Array.from(new Set([...prev, 'direction', 'locker'])));
  };

  const handleSolveCleaning = () => {
    if (solvedPuzzles.cleaning_corner) return;
    setSolvedPuzzles((prev) => ({ ...prev, cleaning_corner: true }));
    addInventoryItem({
      id: 'key_fragment_8',
      name: '黃金鑰匙碎片 (8/8) [鑰匙已成形]',
      nameEn: 'Golden Master Key Fragment (8/8)',
      description: '從清潔角工具箱獲得最後一枚鑰匙圓環（刻有「G」）。8 枚碎片拼合為「LING TUNG」大門黃金總鑰匙！',
      descriptionEn: 'The eighth fragment completes the Master Golden Key engraved with LING TUNG!',
      icon: 'key',
      puzzleSource: 'cleaning',
    });
    setLearnedWordIds((prev) => Array.from(new Set([...prev, 'balance'])));
  };

  const handleSolveScience = () => {
    if (solvedPuzzles.science_corner) return;
    setSolvedPuzzles((prev) => ({ ...prev, science_corner: true }));
    addInventoryItem({
      id: 'rfid_keycard',
      name: '教室大門 RFID 感應磁卡',
      nameEn: 'Classroom Exit RFID Keycard',
      description: '從自然生態箱取出的高階校園感應晶片卡，可解開 802 班大門門禁。',
      descriptionEn: 'An authorized RFID card for the classroom exit electronic door.',
      icon: 'card',
      puzzleSource: 'science',
    });
    setLearnedWordIds((prev) => Array.from(new Set([...prev, 'insect', 'keycard', 'motto'])));
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
        podium_tablet: false,
        window_view: false,
        bookshelf_stationery: false,
        bulletin_board: false,
        lockers_mystery: false,
        cleaning_corner: false,
        science_corner: false,
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

  // Count fragments across all 8 key-yielding puzzles
  const keyFragmentsCount = [
    solvedPuzzles.desk_box,
    solvedPuzzles.blackboard_safe,
    solvedPuzzles.podium_tablet,
    solvedPuzzles.window_view,
    solvedPuzzles.bookshelf_stationery,
    solvedPuzzles.bulletin_board,
    solvedPuzzles.lockers_mystery,
    solvedPuzzles.cleaning_corner,
  ].filter(Boolean).length;

  const hasKeycard = !!solvedPuzzles.science_corner;
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
        totalPuzzles={10}
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

      {/* 10 Puzzle Modals */}
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

      <PodiumModal
        isOpen={activeModal === 'podium'}
        onClose={handleCloseModal}
        isSolved={solvedPuzzles.podium_tablet}
        onSolve={handleSolvePodium}
        onOpenHint={() => handleOpenHintWithContext('podium_tablet')}
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

      <BulletinModal
        isOpen={activeModal === 'bulletin'}
        onClose={handleCloseModal}
        isSolved={solvedPuzzles.bulletin_board}
        onSolve={handleSolveBulletin}
        onOpenHint={() => handleOpenHintWithContext('bulletin_board')}
        showBilingual={showBilingual}
      />

      <LockersModal
        isOpen={activeModal === 'lockers'}
        onClose={handleCloseModal}
        isSolved={solvedPuzzles.lockers_mystery}
        onSolve={handleSolveLockers}
        onOpenHint={() => handleOpenHintWithContext('lockers_mystery')}
        showBilingual={showBilingual}
      />

      <CleaningModal
        isOpen={activeModal === 'cleaning'}
        onClose={handleCloseModal}
        isSolved={solvedPuzzles.cleaning_corner}
        onSolve={handleSolveCleaning}
        onOpenHint={() => handleOpenHintWithContext('cleaning_corner')}
        showBilingual={showBilingual}
      />

      <ScienceModal
        isOpen={activeModal === 'science'}
        onClose={handleCloseModal}
        isSolved={solvedPuzzles.science_corner}
        onSolve={handleSolveScience}
        onOpenHint={() => handleOpenHintWithContext('science_corner')}
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
          <span>嶺東高級中學 附設國中部 · 國二英文實境解謎系列 (十題推理挑戰版)</span>
          <span>校訓：學以致用、誠以待人 · CEFR A1~A2 英語生活情境與邏輯思維</span>
        </div>
      </footer>
    </div>
  );
}
