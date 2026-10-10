import React, { useEffect } from 'react';
import { ClothingItem } from '../types/clothing';
import { ClothingIcon } from './ClothingIcon';
import { useAccessibility } from '../context/AccessibilityContext';
import { 
  X, 
  Volume2, 
  ChevronLeft, 
  ChevronRight, 
  Lightbulb, 
  MapPin, 
  Calendar,
  Sparkles
} from 'lucide-react';

interface ItemDetailModalProps {
  item: ClothingItem;
  items: ClothingItem[];
  onClose: () => void;
  onNavigate: (newItem: ClothingItem) => void;
}

export const ItemDetailModal: React.FC<ItemDetailModalProps> = ({
  item,
  items,
  onClose,
  onNavigate
}) => {
  const { speakText, isSpeaking, speakingText, stopSpeaking, settings } = useAccessibility();

  const currentIndex = items.findIndex((i) => i.id === item.id);
  const prevItem = currentIndex > 0 ? items[currentIndex - 1] : null;
  const nextItem = currentIndex < items.length - 1 ? items[currentIndex + 1] : null;

  // Auto read on open if autoRead is true
  useEffect(() => {
    if (settings.autoRead) {
      const textToRead = `${item.name}. ${item.easyDefinition}. Ejemplo: ${item.exampleSentence}.`;
      speakText(textToRead);
    }
  }, [item.id, settings.autoRead, speakText, item.name, item.easyDefinition, item.exampleSentence]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft' && prevItem) {
        onNavigate(prevItem);
      } else if (e.key === 'ArrowRight' && nextItem) {
        onNavigate(nextItem);
      } else if (e.key === 'v' || e.key === 'V') {
        speakText(`${item.name}. ${item.easyDefinition}`);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onNavigate, prevItem, nextItem, item, speakText]);

  const handleSpeakAll = () => {
    const textToRead = `${item.name}. ${item.syllables.join(' - ')}. ${item.easyDefinition}. Ejemplo: ${item.exampleSentence}. Consejo: ${item.curiosityOrTip}`;
    speakText(textToRead);
  };

  const handleSpeakSyllable = (syl: string) => {
    speakText(syl);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/65 backdrop-blur-xs overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-item-title"
    >
      <div 
        className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-3xl p-6 sm:p-8 transition-all border-3"
        style={{
          backgroundColor: 'var(--bg-card)',
          color: 'var(--text-main)',
          borderColor: 'var(--focus-ring)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4)'
        }}
      >
        {/* Top Controls: Nav + Close */}
        <div className="flex items-center justify-between pb-4 border-b mb-6" style={{ borderColor: 'var(--border-main)' }}>
          <div className="flex items-center gap-2">
            <button
              onClick={() => prevItem && onNavigate(prevItem)}
              disabled={!prevItem}
              className="p-2.5 rounded-xl border-2 font-bold flex items-center gap-1 text-sm disabled:opacity-30 hover:opacity-85 cursor-pointer"
              style={{ borderColor: 'var(--border-main)' }}
              aria-label={prevItem ? `Prenda anterior: ${prevItem.name}` : 'No hay prenda anterior'}
            >
              <ChevronLeft className="w-5 h-5" />
              <span className="hidden sm:inline">Anterior</span>
            </button>
            <span className="text-xs font-bold opacity-75 px-2">
              {currentIndex + 1} de {items.length}
            </span>
            <button
              onClick={() => nextItem && onNavigate(nextItem)}
              disabled={!nextItem}
              className="p-2.5 rounded-xl border-2 font-bold flex items-center gap-1 text-sm disabled:opacity-30 hover:opacity-85 cursor-pointer"
              style={{ borderColor: 'var(--border-main)' }}
              aria-label={nextItem ? `Siguiente prenda: ${nextItem.name}` : 'No hay siguiente prenda'}
            >
              <span className="hidden sm:inline">Siguiente</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSpeakAll}
              className="px-4 py-2.5 rounded-xl border-2 font-bold flex items-center gap-2 text-sm shadow-xs hover:opacity-90 cursor-pointer"
              style={{
                backgroundColor: 'var(--primary-main)',
                color: 'var(--primary-text)',
                borderColor: 'var(--focus-ring)'
              }}
              title="Escuchar toda la información (Tecla V)"
              aria-label="Escuchar toda la información de esta prenda"
            >
              <Volume2 className="w-5 h-5" />
              <span>Escuchar todo</span>
            </button>

            <button
              onClick={onClose}
              className="p-2.5 rounded-xl border-2 hover:opacity-80 transition cursor-pointer"
              style={{ borderColor: 'var(--border-main)' }}
              aria-label="Cerrar ventana de detalle (Escape)"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Hero Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center mb-6">
          {/* Big Illustration */}
          <div 
            className="md:col-span-5 w-full py-8 flex items-center justify-center rounded-2xl border-2"
            style={{
              backgroundColor: 'var(--bg-subtle)',
              borderColor: 'var(--border-main)',
              color: 'var(--primary-main)'
            }}
          >
            <ClothingIcon name={item.icon} size={140} />
          </div>

          {/* Title & Phonetics */}
          <div className="md:col-span-7 space-y-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold px-3 py-1 rounded-lg border border-current">
                {item.categoryLabel}
              </span>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded opacity-80 border border-current">
                Género {item.gender} · {item.number}
              </span>
            </div>

            <div className="flex items-baseline gap-3 flex-wrap">
              <h2 id="modal-item-title" className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                {item.name}
              </h2>
              <button
                onClick={() => speakText(item.name)}
                className="p-2 rounded-lg border border-current hover:opacity-80 cursor-pointer"
                title={`Pronunciar ${item.name}`}
                aria-label={`Pronunciar ${item.name}`}
              >
                <Volume2 className="w-5 h-5 text-sky-500" />
              </button>
            </div>

            {/* Syllables exploration */}
            <div>
              <div className="text-xs font-bold opacity-75 mb-1.5 flex items-center gap-1">
                <span>Separación silábica (pulsa una sílaba para escucharla):</span>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                {item.syllables.map((syl, i) => {
                  const isStressed = i === item.stressedIndex;
                  return (
                    <button
                      key={i}
                      onClick={() => handleSpeakSyllable(syl)}
                      className={`px-3.5 py-1.5 rounded-xl border-2 font-bold text-base sm:text-lg transition-transform hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-1.5 ${
                        isStressed ? 'ring-2 ring-amber-400' : ''
                      }`}
                      style={{
                        backgroundColor: isStressed ? 'var(--accent-badge)' : 'var(--bg-subtle)',
                        color: isStressed ? 'var(--accent-badge-text)' : 'inherit',
                        borderColor: isStressed ? 'var(--focus-ring)' : 'var(--border-main)'
                      }}
                      title={`Escuchar sílaba "${syl}" ${isStressed ? '(Sílaba tónica con acento)' : ''}`}
                      aria-label={`Sílaba ${syl} ${isStressed ? 'tónica con acento fuerte' : ''}`}
                    >
                      <span>{syl}</span>
                      {isStressed && <span className="text-xs font-normal">★</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Information Blocks */}
        <div className="space-y-4">
          {/* Lectura Fácil Definition */}
          <div 
            className="p-4 sm:p-5 rounded-2xl border-2"
            style={{
              backgroundColor: 'var(--bg-subtle)',
              borderColor: 'var(--border-main)'
            }}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 font-bold text-base">
                <Sparkles className="w-5 h-5 text-sky-500" />
                <span>¿Qué es? (Lectura Fácil)</span>
              </div>
              <button
                onClick={() => speakText(item.easyDefinition)}
                className="p-1.5 rounded-lg border border-current hover:opacity-80 cursor-pointer"
                title="Escuchar definición"
                aria-label="Escuchar definición"
              >
                <Volume2 className="w-4 h-4 text-sky-500" />
              </button>
            </div>
            <p className="text-base sm:text-lg font-medium leading-relaxed">
              {item.easyDefinition}
            </p>
          </div>

          {/* Example Sentence */}
          <div 
            className="p-4 sm:p-5 rounded-2xl border-2"
            style={{
              backgroundColor: 'var(--bg-subtle)',
              borderColor: 'var(--border-main)'
            }}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 font-bold text-base">
                <span>💬 Frase de ejemplo:</span>
              </div>
              <button
                onClick={() => speakText(item.exampleSentence)}
                className="p-1.5 rounded-lg border border-current hover:opacity-80 cursor-pointer"
                title="Escuchar frase de ejemplo"
                aria-label="Escuchar frase de ejemplo"
              >
                <Volume2 className="w-4 h-4 text-sky-500" />
              </button>
            </div>
            <p className="text-base sm:text-lg italic leading-relaxed">
              «{item.exampleSentence}»
            </p>
          </div>

          {/* Quick Context badges: Body part & Season */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div 
              className="p-4 rounded-xl border-2 flex items-start gap-3"
              style={{ backgroundColor: 'var(--bg-subtle)', borderColor: 'var(--border-main)' }}
            >
              <div className="p-2 rounded-lg bg-sky-100 dark:bg-sky-950 text-sky-600 dark:text-sky-300">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-xs font-bold opacity-75">¿Dónde se pone?</span>
                <span className="font-bold text-sm sm:text-base">{item.bodyPartLabel}</span>
              </div>
            </div>

            <div 
              className="p-4 rounded-xl border-2 flex items-start gap-3"
              style={{ backgroundColor: 'var(--bg-subtle)', borderColor: 'var(--border-main)' }}
            >
              <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-300">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-xs font-bold opacity-75">¿Cuándo se usa?</span>
                <span className="font-bold text-sm sm:text-base">{item.seasonLabel}</span>
              </div>
            </div>
          </div>

          {/* Autonomy Tip */}
          <div 
            className="p-4 sm:p-5 rounded-2xl border-2 flex items-start gap-3"
            style={{
              backgroundColor: 'var(--accent-badge)',
              borderColor: 'var(--focus-ring)',
              color: 'var(--accent-badge-text)'
            }}
          >
            <Lightbulb className="w-6 h-6 shrink-0 mt-0.5 text-amber-400" />
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-extrabold text-sm sm:text-base">Consejo de autonomía para vestirse:</span>
                <button
                  onClick={() => speakText(item.curiosityOrTip)}
                  className="p-1 rounded border border-current hover:opacity-80 cursor-pointer"
                  title="Escuchar consejo"
                  aria-label="Escuchar consejo de autonomía"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-sm sm:text-base leading-relaxed opacity-95">
                {item.curiosityOrTip}
              </p>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-6 pt-4 border-t flex items-center justify-between text-xs opacity-75" style={{ borderColor: 'var(--border-main)' }}>
          <span>Atajos: Flechas Izq/Der para cambiar · V para escuchar · Esc para salir</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg font-bold border hover:opacity-85 cursor-pointer"
            style={{ borderColor: 'var(--border-main)' }}
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
