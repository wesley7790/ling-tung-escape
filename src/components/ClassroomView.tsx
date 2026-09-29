import React from 'react';
import { CheckCircle2, Lock, Sparkles, Volume2, Search, ArrowRight } from 'lucide-react';
import { RoomArea } from '../types/game';
import classroomImg from '../assets/images/ling_tung_classroom_escape_1790153208229.jpg';
import { soundManager } from '../utils/audio';

interface ClassroomViewProps {
  onSelectArea: (area: RoomArea) => void;
  solvedPuzzles: Record<string, boolean>;
  keyFragmentsCount: number;
  hasKeycard: boolean;
  showBilingual: boolean;
}

export const ClassroomView: React.FC<ClassroomViewProps> = ({
  onSelectArea,
  solvedPuzzles,
  keyFragmentsCount,
  hasKeycard,
  showBilingual,
}) => {
  const areas = [
    {
      id: 'desk' as RoomArea,
      key: 'desk_box',
      num: 1,
      name: '1. 學生課桌椅',
      nameEn: 'Student Desk',
      description: '桌上有殘留作業與英文單字字母數運算謎題。',
      descriptionEn: 'An open quiz sheet with letter length and vowel subtraction.',
      icon: 'desk',
      badge: '橘色密碼盒 (Orange Box)',
      solved: !!solvedPuzzles.desk_box,
      pos: 'top-[72%] left-[30%]',
    },
    {
      id: 'blackboard' as RoomArea,
      key: 'blackboard_safe',
      num: 2,
      name: '2. 黑板與行事曆',
      nameEn: 'Blackboard & Safe',
      description: '寫著嶺東校訓，便利貼隱藏自然科學與日曆推理。',
      descriptionEn: 'Science, weekday, and anatomy logic near the blackboard.',
      icon: 'blackboard',
      badge: '暗格保險箱 (Wall Safe)',
      solved: !!solvedPuzzles.blackboard_safe,
      pos: 'top-[16%] left-[46%]',
    },
    {
      id: 'podium' as RoomArea,
      key: 'podium_tablet',
      num: 3,
      name: '3. 講台智慧平板',
      nameEn: 'Podium Tablet',
      description: '老師上課用的觸控平板，鎖定畫面有等差數列與常識題。',
      descriptionEn: 'Math sequence and unit vocabulary on the smart tablet.',
      icon: 'podium',
      badge: '智慧平板 (Smart Tablet)',
      solved: !!solvedPuzzles.podium_tablet,
      pos: 'top-[46%] left-[46%]',
    },
    {
      id: 'window' as RoomArea,
      key: 'window_view',
      num: 4,
      name: '4. 教室鐘樓窗台',
      nameEn: 'Campus Window',
      description: '遠眺嶺東鐘樓，結合早自習時針、幾何圓與放學鐘。',
      descriptionEn: 'Morning assembly hour, circle symbol, and dismissal bell.',
      icon: 'window',
      badge: '窗台收納盒 (Window Box)',
      solved: !!solvedPuzzles.window_view,
      pos: 'top-[18%] left-[88%]',
    },
    {
      id: 'bookshelf' as RoomArea,
      key: 'bookshelf_stationery',
      num: 5,
      name: '5. 班級圖書角',
      nameEn: 'Stationery Cabinet',
      description: '四色文具櫃，需推理桌邊、週二字母、半打與手指數。',
      descriptionEn: 'Colored stationery cabinet: square sides, spelling, dozen.',
      icon: 'bookshelf',
      badge: '色彩文具櫃 (Cabinet)',
      solved: !!solvedPuzzles.bookshelf_stationery,
      pos: 'top-[78%] left-[88%]',
    },
    {
      id: 'bulletin' as RoomArea,
      key: 'bulletin_board',
      num: 6,
      name: '6. 後方公佈欄',
      nameEn: 'Bulletin Board',
      description: '每週值日生排班表，需拼出代表責任的四字母單字。',
      descriptionEn: 'Weekly duty roster and 4-letter alphabet rotary lock.',
      icon: 'bulletin',
      badge: '值日生謎題 (Duty Box)',
      solved: !!solvedPuzzles.bulletin_board,
      pos: 'top-[22%] left-[68%]',
    },
    {
      id: 'lockers' as RoomArea,
      key: 'lockers_mystery',
      num: 7,
      name: '7. 學生置物櫃',
      nameEn: 'Student Locker',
      description: '四方十字方向感應鎖，依據教室東西南北方位地圖導引。',
      descriptionEn: 'Compass navigation directions: North, East, South, West.',
      icon: 'lockers',
      badge: '方位方向鎖 (D-Pad Lock)',
      solved: !!solvedPuzzles.lockers_mystery,
      pos: 'top-[78%] left-[10%]',
    },
    {
      id: 'cleaning' as RoomArea,
      key: 'cleaning_corner',
      num: 8,
      name: '8. 衛生清潔角',
      nameEn: 'Cleaning Corner',
      description: '打掃工具車旁的天平，推算水杯、水桶與水箱容積等式。',
      descriptionEn: 'Mass & volume balance puzzle: cup, bucket, water tank.',
      icon: 'cleaning',
      badge: '天平容積秤 (Balance Scale)',
      solved: !!solvedPuzzles.cleaning_corner,
      pos: 'top-[76%] left-[58%]',
    },
    {
      id: 'science' as RoomArea,
      key: 'science_corner',
      num: 9,
      name: '9. 自然生態角',
      nameEn: 'Science Vivarium',
      description: '窗邊昆蟲與標本箱，推算昆蟲、蜘蛛、蛇與四足動物腳數。',
      descriptionEn: 'Creature anatomy: counting legs of ant, spider, snake, dog.',
      icon: 'science',
      badge: '生態觀察箱 (Vivarium Lock)',
      solved: !!solvedPuzzles.science_corner,
      pos: 'top-[48%] left-[88%]',
    },
    {
      id: 'door' as RoomArea,
      key: 'exit_door',
      num: 10,
      name: '10. 教室大門門禁',
      nameEn: 'Exit Gate',
      description: '終極通關大門！需組裝黃金鑰匙、感應磁卡與考核邏輯題。',
      descriptionEn: 'The locked gate to freedom with 3-question English logic quiz.',
      icon: 'door',
      badge: '終極門禁 (Exit Gate)',
      solved: false,
      pos: 'top-[24%] left-[10%]',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Story Banner */}
      <div className="bg-gradient-to-r from-amber-950/40 via-slate-900 to-amber-950/40 border border-amber-500/20 rounded-xl p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-amber-400 font-bold text-xs uppercase font-mono tracking-wider">
              MISSION BRIEFING · 十大邏輯解謎任務
            </span>
            <span className="text-slate-500 text-xs">·</span>
            <span className="text-xs text-slate-400">星期五下午 5:00 放學鐘響</span>
          </div>
          <h2 className="text-base sm:text-lg font-bold text-slate-100 flex items-center gap-2">
            <span>「我想放學回家！」嶺東中學國中部 802 班大脫逃 (十題邏輯挑戰版)</span>
            <button
              onClick={() => soundManager.speak('Welcome to Ling Tung High School Classroom 802. Friday five o\'clock! Solve all ten English logic puzzles to open the door and go home!')}
              className="text-slate-400 hover:text-amber-400 transition-colors cursor-pointer"
              title="聆聽英文任務語音"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
            放學鐘聲已經響起，教室門被電子門禁鎖上了！請調查教室內全部 <strong className="text-amber-400">10 個調查站點</strong>，運用國二英文單字、生活常識、數列規律、方位與自然科學進行純邏輯推理。蒐集
            <strong className="text-amber-400"> 8 枚黃金鑰匙碎片</strong> 與
            <strong className="text-emerald-400"> RFID 大門磁卡</strong>，回答門禁邏輯題逃脫回家！
          </p>
        </div>

        {/* Quick status progress */}
        <div className="flex items-center gap-2 shrink-0 bg-slate-950/80 p-3 rounded-lg border border-slate-800">
          <div className="text-right">
            <span className="text-[11px] text-slate-400 block">黃金鑰匙碎片</span>
            <span className="font-mono font-bold text-amber-400 text-sm">
              {keyFragmentsCount}/8 碎片
            </span>
          </div>
          <div className="w-px h-8 bg-slate-800 mx-1" />
          <div className="text-right">
            <span className="text-[11px] text-slate-400 block">大門磁卡</span>
            <span className={`text-xs font-bold ${hasKeycard ? 'text-emerald-400' : 'text-slate-500'}`}>
              {hasKeycard ? '✓ 已取得' : '未尋獲'}
            </span>
          </div>
        </div>
      </div>

      {/* Main Interactive Classroom Panoramic Stage */}
      <div className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-950 aspect-[16/9] w-full select-none group">
        <img
          src={classroomImg}
          alt="嶺東中學國中部 802 班教室"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.01]"
        />

        {/* Ambient Dark Gradient Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-black/30 pointer-events-none" />

        {/* School Class Plate Overlay */}
        <div className="absolute top-4 left-4 z-10 bg-slate-950/80 backdrop-blur-md px-3.5 py-1.5 rounded-lg border border-slate-700/80 text-xs flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="font-bold text-amber-300">嶺東中學 國二 802 班教室</span>
          <span className="text-slate-400 hidden sm:inline">| 校訓：學以致用、誠以待人</span>
        </div>

        {/* Hotspot Markers on the Scene */}
        {areas.map((area) => {
          // Smart positioning classes to prevent border clipping and overlap
          const isLeftEdge = area.num === 10 || area.num === 7;
          const isRightEdge = area.num === 4 || area.num === 5 || area.num === 9;
          const transformClass = isLeftEdge
            ? 'transform translate-x-0 -translate-y-1/2'
            : isRightEdge
            ? 'transform -translate-x-full -translate-y-1/2'
            : 'transform -translate-x-1/2 -translate-y-1/2';

          return (
            <div
              key={area.id}
              className={`absolute ${area.pos} z-20 ${transformClass}`}
            >
              <button
                onClick={() => {
                  soundManager.playClick();
                  onSelectArea(area.id);
                }}
                className={`group/btn flex items-center gap-1.5 sm:gap-2 px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-xl backdrop-blur-md transition-all duration-200 cursor-pointer shadow-xl whitespace-nowrap active:scale-95 ${
                  area.solved
                    ? 'bg-emerald-950/90 border border-emerald-500/80 text-emerald-200 hover:bg-emerald-900 ring-1 ring-emerald-500/30'
                    : area.id === 'door'
                    ? 'bg-amber-950/95 border border-amber-400 text-amber-200 hover:bg-amber-900 ring-2 ring-amber-400/50 animate-pulse'
                    : 'bg-slate-900/90 border border-slate-600 hover:border-amber-400 text-slate-100 hover:bg-slate-800'
                }`}
                title={`調查 ${area.name}`}
              >
                {/* Number circle badge */}
                <span
                  className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center font-mono font-bold text-[10px] sm:text-xs shrink-0 ${
                    area.solved
                      ? 'bg-emerald-500 text-slate-950'
                      : area.id === 'door'
                      ? 'bg-amber-400 text-slate-950'
                      : 'bg-slate-700 text-slate-200 group-hover/btn:bg-amber-400 group-hover/btn:text-slate-950'
                  }`}
                >
                  {area.num}
                </span>

                {area.solved ? (
                  <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 shrink-0" />
                ) : area.id === 'door' ? (
                  <Lock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 shrink-0" />
                ) : (
                  <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-sky-400 shrink-0" />
                )}

                <div className="text-left">
                  <span className="font-bold text-[11px] sm:text-xs block leading-tight">
                    {area.name.replace(/^\d+\.\s*/, '')}
                  </span>
                  <span className="text-[9px] sm:text-[10px] text-slate-400 hidden md:block leading-tight">
                    {area.badge.split(' ')[0]}
                  </span>
                </div>

                <ArrowRight className="w-3 h-3 opacity-60 group-hover/btn:translate-x-0.5 transition-transform hidden sm:inline" />
              </button>
            </div>
          );
        })}

        {/* Bottom Bar Info */}
        <div className="absolute bottom-2.5 left-4 right-4 z-10 flex items-center justify-between text-[11px] sm:text-xs text-slate-400 pointer-events-none">
          <span className="bg-slate-950/80 px-2 py-0.5 rounded backdrop-blur-sm">點選教室全景上的 10 個站點標籤即可進入解謎調查</span>
          <span className="hidden sm:inline bg-slate-950/80 px-2 py-0.5 rounded backdrop-blur-sm">國二英文程度 (CEFR A1~A2)</span>
        </div>
      </div>

      {/* Investigation Hotspot Cards Grid (Accessible alternative for clicking) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-sm text-slate-200 flex items-center gap-2">
            <Search className="w-4 h-4 text-amber-400" />
            <span>十大調查站點清單 (10 Investigation Stations)</span>
          </h3>
          <span className="text-xs text-slate-400">
            可點擊卡片直接進入站點
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
          {areas.map((area) => (
            <button
              key={area.id}
              onClick={() => {
                soundManager.playClick();
                onSelectArea(area.id);
              }}
              className={`p-3 sm:p-3.5 rounded-xl border text-left transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                area.solved
                  ? 'bg-slate-900/60 border-emerald-500/40 hover:border-emerald-400'
                  : area.id === 'door'
                  ? 'bg-slate-900/90 border-amber-500/60 hover:border-amber-400 ring-1 ring-amber-400/20'
                  : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-bold text-xs sm:text-sm text-slate-100 flex items-center gap-1.5">
                    <span className="w-4 h-4 rounded-full bg-slate-800 text-[10px] flex items-center justify-center font-mono text-slate-300">
                      {area.num}
                    </span>
                    <span className="truncate">{area.name.replace(/^\d+\.\s*/, '')}</span>
                  </span>
                  {area.solved ? (
                    <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-0.5 shrink-0">
                      <CheckCircle2 className="w-3 h-3" /> 已破
                    </span>
                  ) : area.id === 'door' ? (
                    <span className="text-[10px] font-bold text-amber-400 flex items-center gap-0.5 shrink-0">
                      <Lock className="w-3 h-3" /> 大門
                    </span>
                  ) : (
                    <span className="text-[10px] text-slate-400 shrink-0">待查</span>
                  )}
                </div>

                <p className="text-[11px] text-slate-300 leading-relaxed mb-2.5 line-clamp-2">
                  {showBilingual ? area.description : area.descriptionEn}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                <span className="text-amber-400/90 font-medium truncate max-w-[120px]">
                  {area.badge.split(' ')[0]}
                </span>
                <span className="text-slate-400 text-[10px] flex items-center gap-0.5 hover:text-white shrink-0">
                  調查 <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
