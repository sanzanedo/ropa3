import React, { useState } from 'react';
import { ClothingItem } from '../../types/clothing';
import { CLOTHING_ITEMS } from '../../data/clothingData';
import { ClothingIcon } from '../ClothingIcon';
import { useAccessibility } from '../../context/AccessibilityContext';
import { 
  CloudSun, 
  CloudSnow, 
  CloudRain, 
  Sun, 
  Moon, 
  Activity, 
  Volume2, 
  CheckCircle2, 
  RotateCcw,
  Sparkles
} from 'lucide-react';

interface WeatherScenario {
  id: string;
  title: string;
  description: string;
  weatherPrompt: string;
  icon: React.ReactNode;
  recommendedIds: string[];
}

const SCENARIOS: WeatherScenario[] = [
  {
    id: 'frio',
    title: 'Día de nieve y frío polar',
    description: 'La temperatura está bajo cero y caen copos de nieve.',
    weatherPrompt: 'Hoy hace mucho frío y está nevando. ¿Qué prendas necesitas ponerte para abrigarte bien?',
    icon: <CloudSnow className="w-6 h-6 text-sky-400" />,
    recommendedIds: ['abrigo', 'gorro', 'bufanda', 'guantes', 'botas', 'jersey']
  },
  {
    id: 'lluvia',
    title: 'Día de tormenta y lluvia',
    description: 'El cielo está gris y caen gotas de agua fuertes.',
    weatherPrompt: 'Está lloviendo a cántaros. ¿Qué ropa y accesorios te pones para no mojarte?',
    icon: <CloudRain className="w-6 h-6 text-blue-500" />,
    recommendedIds: ['chubasquero', 'paraguas', 'botas']
  },
  {
    id: 'calor',
    title: 'Verano soleado en la playa',
    description: 'El sol brilla con fuerza y hace mucho calor.',
    weatherPrompt: 'Hace mucho calor y vamos a la playa. ¿Qué ropa fresca y de baño eliges?',
    icon: <Sun className="w-6 h-6 text-amber-500" />,
    recommendedIds: ['banador', 'gafas-sol', 'gorra', 'sandalias', 'camiseta', 'pantalon-corto']
  },
  {
    id: 'dormir',
    title: 'Hora de acostarse y descansar',
    description: 'Ya es de noche, cenamos y nos vamos a la cama.',
    weatherPrompt: 'Es la hora de ir a dormir. ¿Qué te pones para estar cómodo y abrigado en casa?',
    icon: <Moon className="w-6 h-6 text-purple-400" />,
    recommendedIds: ['pijama', 'bata', 'zapatillas-casa']
  },
  {
    id: 'deporte',
    title: 'Hacer ejercicio o deporte',
    description: 'Vamos a correr, saltar y jugar al parque.',
    weatherPrompt: 'Hoy tenemos clase de gimnasia y deporte. ¿Qué prendas te ayudan a moverte con comodidad?',
    icon: <Activity className="w-6 h-6 text-emerald-500" />,
    recommendedIds: ['chandal', 'zapatillas', 'camiseta', 'sudadera']
  }
];

export const WeatherWardrobeView: React.FC = () => {
  const { speakText, playSuccessSound, playFeedbackSound } = useAccessibility();
  const [selectedScenarioIndex, setSelectedScenarioIndex] = useState(0);
  const [selectedGarmentIds, setSelectedGarmentIds] = useState<Set<string>>(new Set());

  const currentScenario = SCENARIOS[selectedScenarioIndex];

  const handleSelectScenario = (index: number) => {
    setSelectedScenarioIndex(index);
    setSelectedGarmentIds(new Set());
    const sc = SCENARIOS[index];
    speakText(`${sc.title}. ${sc.weatherPrompt}`);
  };

  const handleToggleGarment = (item: ClothingItem) => {
    const isRecommended = currentScenario.recommendedIds.includes(item.id);
    const newSet = new Set(selectedGarmentIds);

    if (newSet.has(item.id)) {
      newSet.delete(item.id);
      setSelectedGarmentIds(newSet);
    } else {
      newSet.add(item.id);
      setSelectedGarmentIds(newSet);

      if (isRecommended) {
        playSuccessSound();
        speakText(`¡Muy bien! ${item.name} es ideal para este tiempo. ${item.easyDefinition}`);
      } else {
        playFeedbackSound(false);
        speakText(`Has elegido ${item.name}. Esta prenda no suele usarse para este clima, pero pruébalo con otra.`);
      }
    }
  };

  const handleResetWardrobe = () => {
    setSelectedGarmentIds(new Set());
  };

  // Count correct chosen
  const correctChosen = [...selectedGarmentIds].filter((id) =>
    currentScenario.recommendedIds.includes(id)
  ).length;

  const totalRecommended = currentScenario.recommendedIds.length;
  const isGoalReached = correctChosen >= Math.min(3, totalRecommended);

  return (
    <div className="space-y-6">
      {/* Intro */}
      <div 
        className="p-5 sm:p-6 rounded-2xl border-2 flex flex-col md:flex-row md:items-center justify-between gap-4"
        style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-main)' }}
      >
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight flex items-center gap-2">
            <CloudSun className="w-7 h-7 text-sky-500" />
            El Armario del Clima (Autonomía)
          </h2>
          <p className="text-sm sm:text-base opacity-85 leading-relaxed">
            Mira el tiempo meteorológico y escoge la ropa adecuada para no pasar frío ni calor.
          </p>
        </div>

        <button
          onClick={() => speakText(`${currentScenario.title}. ${currentScenario.weatherPrompt}`)}
          className="self-start md:self-auto px-4 py-2.5 rounded-xl border-2 font-bold text-sm flex items-center gap-2 hover:opacity-90 cursor-pointer"
          style={{
            backgroundColor: 'var(--primary-main)',
            color: 'var(--primary-text)',
            borderColor: 'var(--focus-ring)'
          }}
          title="Escuchar situación meteorológica"
          aria-label="Escuchar situación meteorológica"
        >
          <Volume2 className="w-5 h-5" />
          <span>Escuchar situación</span>
        </button>
      </div>

      {/* Scenario selector tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
        {SCENARIOS.map((sc, idx) => {
          const isSelected = selectedScenarioIndex === idx;
          return (
            <button
              key={sc.id}
              onClick={() => handleSelectScenario(idx)}
              className={`p-3.5 rounded-xl border-2 text-left font-bold flex flex-col justify-between transition cursor-pointer ${
                isSelected ? 'ring-3' : 'hover:opacity-85'
              }`}
              style={{
                backgroundColor: isSelected ? 'var(--accent-badge)' : 'var(--bg-card)',
                color: isSelected ? 'var(--accent-badge-text)' : 'inherit',
                borderColor: isSelected ? 'var(--focus-ring)' : 'var(--border-main)'
              }}
              aria-pressed={isSelected}
            >
              <div className="mb-2">{sc.icon}</div>
              <span className="text-xs sm:text-sm leading-snug">{sc.title}</span>
            </button>
          );
        })}
      </div>

      {/* Active Situation Banner */}
      <div 
        className="p-5 sm:p-6 rounded-2xl border-3 flex flex-col sm:flex-row items-center justify-between gap-4"
        style={{
          backgroundColor: 'var(--bg-card)',
          borderColor: isGoalReached ? '#22c55e' : 'var(--border-main)',
          boxShadow: 'var(--card-shadow)'
        }}
      >
        <div className="space-y-1 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 mb-1">
            Situación actual
          </div>
          <h3 className="text-xl sm:text-2xl font-black">{currentScenario.weatherPrompt}</h3>
          <p className="text-sm opacity-80">{currentScenario.description}</p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="text-center px-4 py-2 rounded-xl border" style={{ borderColor: 'var(--border-main)' }}>
            <span className="block text-2xl font-black text-sky-600 dark:text-sky-400">
              {correctChosen}/{totalRecommended}
            </span>
            <span className="text-xs font-semibold opacity-75">prendas adecuadas</span>
          </div>

          <button
            onClick={handleResetWardrobe}
            className="p-2.5 rounded-xl border hover:opacity-80 cursor-pointer"
            style={{ borderColor: 'var(--border-main)' }}
            title="Vaciar selección de prendas"
            aria-label="Vaciar selección de prendas"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Success banner if achieved */}
      {isGoalReached && (
        <div 
          className="p-4 sm:p-5 rounded-2xl border-2 flex items-center gap-3 animate-fade-in"
          style={{ backgroundColor: '#f0fdf4', borderColor: '#86efac', color: '#166534' }}
        >
          <Sparkles className="w-6 h-6 text-green-600 shrink-0" />
          <div>
            <span className="font-extrabold text-base block">¡Excelente elección de ropa!</span>
            <span className="text-sm">
              Has vestido tu armario a la perfección para este clima. ¡Estás preparado para salir!
            </span>
          </div>
        </div>
      )}

      {/* Grid of Garments to choose from */}
      <div>
        <h4 className="text-lg font-bold mb-3">Toca las prendas para añadirlas al conjunto del día:</h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {CLOTHING_ITEMS.map((item) => {
            const isSelected = selectedGarmentIds.has(item.id);
            const isRecommended = currentScenario.recommendedIds.includes(item.id);

            return (
              <button
                key={item.id}
                onClick={() => handleToggleGarment(item)}
                className={`p-3.5 rounded-2xl border-2 flex flex-col items-center text-center justify-between transition-all cursor-pointer relative ${
                  isSelected ? 'ring-3 ring-sky-500 scale-[1.02]' : 'hover:scale-102 hover:opacity-90'
                }`}
                style={{
                  backgroundColor: isSelected 
                    ? (isRecommended ? '#dcfce7' : '#fee2e2') 
                    : 'var(--bg-card)',
                  color: isSelected 
                    ? (isRecommended ? '#14532d' : '#7f1d1d') 
                    : 'var(--text-main)',
                  borderColor: isSelected 
                    ? (isRecommended ? '#22c55e' : '#ef4444') 
                    : 'var(--border-main)'
                }}
                aria-pressed={isSelected}
                aria-label={`${item.name}. ${isSelected ? 'Seleccionada' : 'No seleccionada'}`}
              >
                {isSelected && (
                  <span className="absolute top-2 right-2 text-xs">
                    {isRecommended ? '✓' : '✗'}
                  </span>
                )}

                <div className="my-2">
                  <ClothingIcon name={item.icon} size={54} />
                </div>

                <div className="w-full">
                  <span className="block text-sm font-bold leading-tight line-clamp-1">
                    {item.name}
                  </span>
                  <span className="text-[11px] opacity-75 block mt-0.5">
                    {item.bodyPartLabel}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
