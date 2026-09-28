export type RoomArea = 'classroom' | 'desk' | 'blackboard' | 'window' | 'bookshelf' | 'door';

export interface InventoryItem {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  icon: string;
  puzzleSource: string;
}

export interface VocabularyItem {
  id: string;
  word: string;
  phonetic: string;
  partOfSpeech: string;
  definitionZh: string;
  definitionEn: string;
  exampleSentence: string;
  exampleSentenceZh: string;
  level: 'A1' | 'A2';
}

export interface PuzzleHint {
  level: 1 | 2 | 3;
  titleZh: string;
  titleEn: string;
  contentZh: string;
  contentEn: string;
}

export interface PuzzleData {
  id: string;
  title: string;
  titleEn: string;
  area: RoomArea;
  solved: boolean;
  hints: PuzzleHint[];
  associatedWords: string[];
}

export interface GameState {
  currentArea: RoomArea;
  inventory: InventoryItem[];
  solvedPuzzles: Record<string, boolean>;
  hintsUsedCount: number;
  startTime: number;
  endTime: number | null;
  isEscaped: boolean;
  playerName: string;
  showBilingual: boolean;
}
