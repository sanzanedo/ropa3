import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { ClothingItem } from '../../types/clothing';
import { CLOTHING_ITEMS } from '../../data/clothingData';
import { ClothingIcon } from '../ClothingIcon';
import { useAccessibility } from '../../context/AccessibilityContext';
import { 
  Volume2, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Award, 
  HelpCircle,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface QuizQuestion {
  id: string;
  type: 'image' | 'riddle';
  correctItem: ClothingItem;
  options: ClothingItem[];
  promptText: string;
}

export const QuizView: React.FC = () => {
  const { speakText, playFeedbackSound, playSuccessSound, settings } = useAccessibility();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredCount, setAnsweredCount] = useState(0);

  // Generate a set of 8 questions
  const questions: QuizQuestion[] = useMemo(() => {
    const shuffledItems = [...CLOTHING_ITEMS].sort(() => Math.random() - 0.5);
    const selected = shuffledItems.slice(0, 10);

    return selected.map((item, idx) => {
      // Pick 3 distractors
      const distractors = CLOTHING_ITEMS.filter((i) => i.id !== item.id)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);
      const options = [item, ...distractors].sort(() => Math.random() - 0.5);

      const isRiddle = idx % 2 === 1;
      const promptText = isRiddle
        ? `Adivina la prenda: ${item.easyDefinition}`
        : `¿Cómo se llama la prenda de la imagen? Se viste en ${item.bodyPartLabel}.`;

      return {
        id: `q-${idx}`,
        type: isRiddle ? 'riddle' : 'image',
        correctItem: item,
        options,
        promptText,
      };
    });
  }, []);

  const currentQ = questions[currentQuestionIndex];

  // Auto read on question change
  useEffect(() => {
    if (settings.autoRead && currentQ && !isAnswered) {
      speakText(currentQ.promptText);
    }
  }, [currentQuestionIndex, currentQ, settings.autoRead, speakText, isAnswered]);

  const handleSelectOption = useCallback((option: ClothingItem) => {
    if (isAnswered) return;
    setSelectedOptionId(option.id);
    setIsAnswered(true);
    setAnsweredCount((prev) => prev + 1);

    const isCorrect = option.id === currentQ.correctItem.id;
    if (isCorrect) {
      setScore((prev) => prev + 1);
      playSuccessSound();
      speakText(`¡Correcto! Es ${option.name}. ${option.easyDefinition}`);
    } else {
      playFeedbackSound(false);
      speakText(`Casi. Has elegido ${option.name}, pero la respuesta correcta es ${currentQ.correctItem.name}.`);
    }
  }, [isAnswered, currentQ, playSuccessSound, playFeedbackSound, speakText]);

  const handleNextQuestion = () => {
    setSelectedOptionId(null);
    setIsAnswered(false);
    setCurrentQuestionIndex((prev) => (prev < questions.length - 1 ? prev + 1 : 0));
  };

  const handleRestart = () => {
    setSelectedOptionId(null);
    setIsAnswered(false);
    setCurrentQuestionIndex(0);
    setScore(0);
    setAnsweredCount(0);
  };

  // Keyboard shortcut 1, 2, 3, 4 to choose options
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (!isAnswered && currentQ) {
        if (e.key === '1' && currentQ.options[0]) handleSelectOption(currentQ.options[0]);
        if (e.key === '2' && currentQ.options[1]) handleSelectOption(currentQ.options[1]);
        if (e.key === '3' && currentQ.options[2]) handleSelectOption(currentQ.options[2]);
        if (e.key === '4' && currentQ.options[3]) handleSelectOption(currentQ.options[3]);
      } else if (isAnswered && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        handleNextQuestion();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAnswered, currentQ, handleSelectOption]);

  if (!currentQ) return null;

  const isCorrectChoice = selectedOptionId === currentQ.correctItem.id;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Quiz Header */}
      <div 
        className="p-5 rounded-2xl border-2 flex flex-wrap items-center justify-between gap-4"
        style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-main)' }}
      >
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight flex items-center gap-2">
            <Award className="w-6 h-6 text-amber-500" />
            Juego de Adivinanzas
          </h2>
          <p className="text-xs sm:text-sm opacity-80">
            Pregunta {currentQuestionIndex + 1} de {questions.length} · Aciertos: {score} de {answeredCount}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => speakText(currentQ.promptText)}
            className="px-3.5 py-2 rounded-xl border-2 font-bold text-xs flex items-center gap-1.5 hover:opacity-85 cursor-pointer"
            style={{
              backgroundColor: 'var(--accent-badge)',
              color: 'var(--accent-badge-text)',
              borderColor: 'var(--focus-ring)'
            }}
            title="Escuchar la pregunta en voz alta"
            aria-label="Escuchar la pregunta en voz alta"
          >
            <Volume2 className="w-4 h-4" />
            <span>Escuchar pregunta</span>
          </button>

          <button
            onClick={handleRestart}
            className="p-2 rounded-xl border hover:opacity-80 cursor-pointer"
            style={{ borderColor: 'var(--border-main)' }}
            title="Reiniciar cuestionario"
            aria-label="Reiniciar cuestionario"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Question Card */}
      <div 
        className="p-6 sm:p-8 rounded-3xl border-3 space-y-6"
        style={{
          backgroundColor: 'var(--bg-card)',
          borderColor: 'var(--border-main)',
          boxShadow: 'var(--card-shadow)'
        }}
      >
        {/* Visual prompt if image mode */}
        {currentQ.type === 'image' && (
          <div className="flex flex-col items-center text-center">
            <div 
              className="w-36 h-36 sm:w-44 sm:h-44 rounded-3xl border-2 flex items-center justify-center p-4 mb-4"
              style={{
                backgroundColor: 'var(--bg-subtle)',
                borderColor: 'var(--border-main)',
                color: 'var(--primary-main)'
              }}
            >
              <ClothingIcon name={currentQ.correctItem.icon} size={110} />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
              ¿Qué prenda de vestir es esta?
            </h3>
            <p className="text-sm opacity-80 mt-1">
              Pista: Se coloca en <span className="font-bold underline">{currentQ.correctItem.bodyPartLabel}</span>
            </p>
          </div>
        )}

        {/* Riddle prompt if riddle mode */}
        {currentQ.type === 'riddle' && (
          <div 
            className="p-6 rounded-2xl border-2 text-center space-y-3"
            style={{
              backgroundColor: 'var(--accent-badge)',
              color: 'var(--accent-badge-text)',
              borderColor: 'var(--focus-ring)'
            }}
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-black/10 dark:bg-white/10">
              <Sparkles className="w-3.5 h-3.5" /> Adivinanza
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold leading-snug">
              «{currentQ.correctItem.easyDefinition}»
            </h3>
            <p className="text-sm opacity-90 font-medium">
              ¿De qué prenda estamos hablando?
            </p>
          </div>
        )}

        {/* 4 Interactive Big Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
          {currentQ.options.map((opt, idx) => {
            const isSelected = selectedOptionId === opt.id;
            const isCorrect = opt.id === currentQ.correctItem.id;

            let buttonStyle: React.CSSProperties = {
              backgroundColor: 'var(--bg-subtle)',
              borderColor: 'var(--border-main)',
              color: 'var(--text-main)'
            };

            if (isAnswered) {
              if (isCorrect) {
                buttonStyle = {
                  backgroundColor: '#dcfce7',
                  color: '#14532d',
                  borderColor: '#22c55e'
                };
              } else if (isSelected) {
                buttonStyle = {
                  backgroundColor: '#fee2e2',
                  color: '#7f1d1d',
                  borderColor: '#ef4444'
                };
              } else {
                buttonStyle.opacity = 0.55;
              }
            }

            return (
              <button
                key={opt.id}
                onClick={() => handleSelectOption(opt)}
                disabled={isAnswered}
                className={`p-4 sm:p-5 rounded-2xl border-2 font-bold text-left flex items-center justify-between gap-3 transition-all cursor-pointer ${
                  !isAnswered ? 'hover:scale-[1.01] hover:border-sky-500' : ''
                } ${isSelected ? 'ring-3' : ''}`}
                style={buttonStyle}
                aria-label={`Opción ${idx + 1}: ${opt.name}`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg border flex items-center justify-center text-sm font-bold opacity-80">
                    {idx + 1}
                  </span>
                  <div>
                    <span className="text-lg sm:text-xl block">{opt.name}</span>
                    <span className="text-xs opacity-75 font-normal">
                      {opt.syllables.join(' - ')}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      speakText(opt.name);
                    }}
                    className="p-2 rounded-lg border border-current hover:opacity-85 cursor-pointer"
                    title={`Escuchar opción "${opt.name}"`}
                    aria-label={`Escuchar opción ${opt.name}`}
                  >
                    <Volume2 className="w-4 h-4 text-sky-500" />
                  </button>

                  {isAnswered && isCorrect && <CheckCircle2 className="w-6 h-6 text-green-600" />}
                  {isAnswered && isSelected && !isCorrect && <XCircle className="w-6 h-6 text-red-600" />}
                </div>
              </button>
            );
          })}
        </div>

        {/* Feedback explanation after answering */}
        {isAnswered && (
          <div 
            className="p-5 rounded-2xl border-2 space-y-3 animate-fade-in"
            style={{
              backgroundColor: isCorrectChoice ? '#f0fdf4' : '#fffbeb',
              borderColor: isCorrectChoice ? '#86efac' : '#fde68a',
              color: isCorrectChoice ? '#14532d' : '#78350f'
            }}
          >
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-base sm:text-lg flex items-center gap-2">
                {isCorrectChoice ? '🎉 ¡Fantástico, muy bien hecho!' : '💡 Repasemos juntos:'}
              </span>
              <button
                onClick={() => speakText(`${currentQ.correctItem.name}. ${currentQ.correctItem.easyDefinition}`)}
                className="p-1.5 rounded-lg border border-current hover:opacity-80 cursor-pointer"
                title="Escuchar explicación"
                aria-label="Escuchar explicación"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>

            <p className="text-sm sm:text-base leading-relaxed">
              <span className="font-bold">{currentQ.correctItem.name}:</span> {currentQ.correctItem.easyDefinition}
            </p>

            <div className="pt-2 flex justify-end">
              <button
                onClick={handleNextQuestion}
                className="px-6 py-2.5 rounded-xl font-bold text-sm shadow-md flex items-center gap-2 hover:opacity-90 cursor-pointer text-white bg-sky-600"
                aria-label="Pasar a la siguiente pregunta"
              >
                <span>Siguiente pregunta</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
