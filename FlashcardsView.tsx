import React, { useState, useEffect } from 'react';
import { CLOTHING_ITEMS } from '../../data/clothingData';
import { ClothingIcon } from '../ClothingIcon';
import { useAccessibility } from '../../context/AccessibilityContext';
import { 
  RotateCw, 
  ChevronLeft, 
  ChevronRight, 
  Volume2, 
  Check, 
  HelpCircle, 
  Sparkles,
  Shuffle
} from 'lucide-react';

export const FlashcardsView: React.FC = () => {
  const { speakText, settings, playSuccessSound, playFeedbackSound } = useAccessibility();
  const [items, setItems] = useState(CLOTHING_ITEMS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [masteredIds, setMasteredIds] = useState<Set<string>>(new Set());
  const [reviewIds, setReviewIds] = useState<Set<string>>(new Set());

  const currentItem = items[currentIndex];

  // Auto-read on card change
  useEffect(() => {
    if (settings.autoRead && currentItem) {
      if (!isFlipped) {
        speakText(`Tarjeta ${currentIndex + 1}. ¿Cómo se llama esta prenda?`);
      } else {
        speakText(`${currentItem.name}. ${currentItem.easyDefinition}`);
      }
    }
  }, [currentIndex, isFlipped, settings.autoRead, speakText, currentItem]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        setIsFlipped((prev) => !prev);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'v' || e.key === 'V') {
        e.preventDefault();
        if (!isFlipped) {
          speakText(`¿Cómo se llama esta prenda de vestir?`);
        } else {
          speakText(`${currentItem.name}. ${currentItem.easyDefinition}`);
        }
      } else if (e.key === '1') {
        handleMarkReview();
      } else if (e.key === '2') {
        handleMarkMastered();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, isFlipped, currentItem]);

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev < items.length - 1 ? prev + 1 : 0));
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : items.length - 1));
  };

  const handleShuffle = () => {
    setIsFlipped(false);
    const shuffled = [...items].sort(() => Math.random() - 0.5);
    setItems(shuffled);
    setCurrentIndex(0);
  };

  const handleMarkMastered = () => {
    playSuccessSound();
    setMasteredIds((prev) => new Set(prev).add(currentItem.id));
    setReviewIds((prev) => {
      const copy = new Set(prev);
      copy.delete(currentItem.id);
      return copy;
    });
    handleNext();
  };

  const handleMarkReview = () => {
    playFeedbackSound(false);
    setReviewIds((prev) => new Set(prev).add(currentItem.id));
    setMasteredIds((prev) => {
      const copy = new Set(prev);
      copy.delete(currentItem.id);
      return copy;
    });
    handleNext();
  };

  if (!currentItem) return null;

  const isMastered = masteredIds.has(currentItem.id);
  const isNeedsReview = reviewIds.has(currentItem.id);

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header controls & stats */}
      <div 
        className="p-5 rounded-2xl border-2 flex flex-wrap items-center justify-between gap-4"
        style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-main)' }}
      >
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
            Tarjetas de Estudio y Memoria
          </h2>
          <p className="text-xs sm:text-sm opacity-80">
            Tarjeta {currentIndex + 1} de {items.length} · Espacio para girar · Flechas para moverte
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShuffle}
            className="px-3 py-2 rounded-xl border-2 font-bold text-xs flex items-center gap-1.5 hover:opacity-85 cursor-pointer"
            style={{ borderColor: 'var(--border-main)' }}
            title="Mezclar orden de las tarjetas"
            aria-label="Mezclar orden de las tarjetas"
          >
            <Shuffle className="w-4 h-4" />
            <span>Barajar</span>
          </button>

          <button
            onClick={() => {
              if (!isFlipped) {
                speakText(`¿Cómo se llama esta prenda de vestir? Es de ${currentItem.categoryLabel} y se coloca en ${currentItem.bodyPartLabel}.`);
              } else {
                speakText(`${currentItem.name}. ${currentItem.syllables.join(' - ')}. ${currentItem.easyDefinition}`);
              }
            }}
            className="p-2 rounded-xl border-2 hover:opacity-85 cursor-pointer"
            style={{
              backgroundColor: 'var(--accent-badge)',
              color: 'var(--accent-badge-text)',
              borderColor: 'var(--focus-ring)'
            }}
            title="Escuchar audio de la tarjeta actual (Tecla V)"
            aria-label="Escuchar audio de la tarjeta"
          >
            <Volume2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Progress pill indicator */}
      <div className="w-full bg-slate-200 dark:bg-slate-800 h-3 rounded-full overflow-hidden border" style={{ borderColor: 'var(--border-main)' }}>
        <div 
          className="h-full bg-sky-500 transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / items.length) * 100}%` }}
        />
      </div>

      {/* Flashcard container */}
      <div
        onClick={() => setIsFlipped((prev) => !prev)}
        className="relative min-h-[380px] sm:min-h-[440px] rounded-3xl border-3 p-6 sm:p-10 flex flex-col justify-between items-center text-center cursor-pointer transition-all duration-200 select-none hover:shadow-xl focus:outline-none focus:ring-4"
        style={{
          backgroundColor: 'var(--bg-card)',
          borderColor: isFlipped ? 'var(--primary-main)' : 'var(--border-main)',
          boxShadow: 'var(--card-shadow)'
        }}
        tabIndex={0}
        role="button"
        aria-pressed={isFlipped}
        aria-label={
          !isFlipped 
            ? `Anverso de la tarjeta: ¿Cómo se llama esta prenda? Pulsa espacio o haz clic para voltear.`
            : `Reverso de la tarjeta: ${currentItem.name}. ${currentItem.easyDefinition}`
        }
      >
        {/* Top bar inside card */}
        <div className="w-full flex items-center justify-between text-xs font-bold opacity-80">
          <span className="px-2.5 py-1 rounded-md border border-current">
            {currentItem.categoryLabel}
          </span>
          <span className="flex items-center gap-1">
            <RotateCw className="w-3.5 h-3.5" />
            {isFlipped ? 'Respuesta revelada' : 'Haz clic o pulsa Espacio para voltear'}
          </span>
        </div>

        {/* Center content */}
        {!isFlipped ? (
          /* FRONT: Visual recognition challenge */
          <div className="my-auto space-y-5">
            <div 
              className="w-36 h-36 sm:w-44 sm:h-44 mx-auto rounded-3xl border-2 flex items-center justify-center p-4 transition-transform hover:scale-105"
              style={{
                backgroundColor: 'var(--bg-subtle)',
                borderColor: 'var(--border-main)',
                color: 'var(--primary-main)'
              }}
            >
              <ClothingIcon name={currentItem.icon} size={110} />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                ¿Cómo se llama esta prenda?
              </h3>
              <p className="text-sm opacity-80">
                Pista: se viste en <span className="font-bold underline">{currentItem.bodyPartLabel}</span>
              </p>
            </div>
          </div>
        ) : (
          /* BACK: Full answer, phonetic syllables and easy read definition */
          <div className="my-auto space-y-4 max-w-xl animate-fade-in">
            <div style={{ color: 'var(--primary-main)' }} className="flex justify-center">
              <ClothingIcon name={currentItem.icon} size={70} />
            </div>

            <h3 className="text-3xl sm:text-4xl font-black tracking-tight" style={{ color: 'var(--primary-main)' }}>
              {currentItem.name}
            </h3>

            {/* Syllables breakdown */}
            <div className="flex items-center justify-center gap-1.5 flex-wrap">
              {currentItem.syllables.map((syl, i) => (
                <span
                  key={i}
                  className={`px-3 py-1 rounded-lg border-2 text-base font-bold ${
                    i === currentItem.stressedIndex
                      ? 'border-amber-500 bg-amber-100 dark:bg-amber-950/60 font-black'
                      : 'border-current opacity-80'
                  }`}
                >
                  {syl}
                </span>
              ))}
            </div>

            <p className="text-base sm:text-xl font-medium leading-relaxed">
              {currentItem.easyDefinition}
            </p>

            <div 
              className="p-3 rounded-xl border text-sm sm:text-base italic"
              style={{ backgroundColor: 'var(--bg-subtle)', borderColor: 'var(--border-main)' }}
            >
              «{currentItem.exampleSentence}»
            </div>
          </div>
        )}

        {/* Bottom card hint */}
        <div className="w-full flex items-center justify-between text-xs font-semibold opacity-70 border-t pt-3" style={{ borderColor: 'var(--border-main)' }}>
          <span>Ubicación: {currentItem.bodyPartLabel}</span>
          <span>{isFlipped ? '✓ Respuesta' : '❓ Adivina el nombre'}</span>
        </div>
      </div>

      {/* Navigation & Self-Assessment Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Prev / Next controls */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-start">
          <button
            onClick={handlePrev}
            className="px-4 py-3 rounded-xl border-2 font-bold flex items-center gap-1.5 text-sm hover:opacity-85 cursor-pointer"
            style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-main)' }}
            aria-label="Tarjeta anterior (Flecha Izquierda)"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Anterior</span>
          </button>

          <button
            onClick={() => setIsFlipped((prev) => !prev)}
            className="px-4 py-3 rounded-xl border-2 font-bold flex items-center gap-1.5 text-sm hover:opacity-85 cursor-pointer"
            style={{ backgroundColor: 'var(--bg-subtle)', borderColor: 'var(--focus-ring)' }}
            aria-label="Voltear tarjeta"
          >
            <RotateCw className="w-4 h-4" />
            <span>Voltear</span>
          </button>

          <button
            onClick={handleNext}
            className="px-4 py-3 rounded-xl border-2 font-bold flex items-center gap-1.5 text-sm hover:opacity-85 cursor-pointer"
            style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-main)' }}
            aria-label="Siguiente tarjeta (Flecha Derecha)"
          >
            <span>Siguiente</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Self-assessment buttons */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={handleMarkReview}
            className={`flex-1 sm:flex-none px-4 py-3 rounded-xl border-2 font-bold text-sm flex items-center justify-center gap-1.5 transition cursor-pointer ${
              isNeedsReview ? 'ring-2 ring-amber-500' : ''
            }`}
            style={{
              backgroundColor: '#fef3c7',
              color: '#92400e',
              borderColor: '#f59e0b'
            }}
            title="Marcar para repasar más tarde (Tecla 1)"
            aria-label="Quiero repasar esta prenda más tarde"
          >
            <HelpCircle className="w-4 h-4" />
            <span>Repasar luego</span>
          </button>

          <button
            onClick={handleMarkMastered}
            className={`flex-1 sm:flex-none px-4 py-3 rounded-xl border-2 font-bold text-sm flex items-center justify-center gap-1.5 transition cursor-pointer ${
              isMastered ? 'ring-2 ring-emerald-500' : ''
            }`}
            style={{
              backgroundColor: '#dcfce7',
              color: '#166534',
              borderColor: '#22c55e'
            }}
            title="Marcar como aprendida (Tecla 2)"
            aria-label="Ya me sé esta prenda"
          >
            <Check className="w-4 h-4" />
            <span>¡Me la sé!</span>
          </button>
        </div>
      </div>

      {/* Summary counters */}
      <div 
        className="p-4 rounded-xl border-2 flex items-center justify-around text-xs sm:text-sm font-bold"
        style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-main)' }}
      >
        <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
          <Check className="w-4 h-4" />
          <span>Sabidas: {masteredIds.size}</span>
        </div>
        <div className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400">
          <HelpCircle className="w-4 h-4" />
          <span>Por repasar: {reviewIds.size}</span>
        </div>
        <div className="opacity-75">
          <span>Total en el mazo: {items.length}</span>
        </div>
      </div>
    </div>
  );
};
