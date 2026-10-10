import React from 'react';
import { useAccessibility } from '../context/AccessibilityContext';
import { X, Keyboard, Volume2 } from 'lucide-react';

export const ShortcutsHelpModal: React.FC = () => {
  const { isShortcutsOpen, setIsShortcutsOpen, speakText } = useAccessibility();

  if (!isShortcutsOpen) return null;

  const shortcuts = [
    { key: 'Alt + A', desc: 'Abrir o cerrar el Panel de Accesibilidad (fuente, tamaño, contraste, voz)' },
    { key: 'Alt + R', desc: 'Activar o desactivar la Guía de lectura (Regla visual para dislexia)' },
    { key: 'Alt + S o Esc', desc: 'Detener de inmediato cualquier lectura por voz que esté sonando' },
    { key: 'Tecla V', desc: 'Escuchar el nombre y la definición de la prenda activa' },
    { key: 'Espacio / Enter', desc: 'Voltear tarjeta de estudio o abrir detalle de la prenda' },
    { key: 'Flechas ← y →', desc: 'Ir a la prenda anterior o siguiente' },
    { key: 'Teclas 1, 2, 3, 4', desc: 'Elegir opciones directamente en el cuestionario de adivinanzas' },
    { key: 'Tecla ?', desc: 'Abrir esta ventana de ayuda y atajos' },
  ];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="shortcuts-title"
    >
      <div 
        className="relative w-full max-w-xl rounded-2xl p-6 sm:p-8 border-2"
        style={{
          backgroundColor: 'var(--bg-card)',
          color: 'var(--text-main)',
          borderColor: 'var(--border-main)',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)'
        }}
      >
        <div className="flex items-center justify-between pb-4 border-b mb-6" style={{ borderColor: 'var(--border-main)' }}>
          <div className="flex items-center gap-3">
            <div 
              className="p-2.5 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: 'var(--accent-badge)', color: 'var(--accent-badge-text)' }}
            >
              <Keyboard className="w-6 h-6" />
            </div>
            <div>
              <h2 id="shortcuts-title" className="text-xl font-bold">
                Atajos de Teclado y Ayuda
              </h2>
              <p className="text-xs sm:text-sm opacity-80">
                Controla la aplicación fácilmente sin necesidad de ratón.
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsShortcutsOpen(false)}
            className="p-2 rounded-lg border hover:opacity-80 transition cursor-pointer"
            style={{ borderColor: 'var(--border-main)' }}
            aria-label="Cerrar ayuda"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3 mb-6">
          {shortcuts.map((sc, i) => (
            <div 
              key={i}
              className="flex items-center justify-between p-3 rounded-xl border"
              style={{ backgroundColor: 'var(--bg-subtle)', borderColor: 'var(--border-main)' }}
            >
              <span className="text-sm font-medium">{sc.desc}</span>
              <kbd className="px-2.5 py-1 rounded-md border font-mono text-xs font-bold shrink-0 ml-3 bg-white/10 shadow-xs">
                {sc.key}
              </kbd>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: 'var(--border-main)' }}>
          <button
            onClick={() => speakText('Ventana de atajos. Alt más A para panel de accesibilidad. Alt más R para regla de lectura. V para escuchar texto.')}
            className="px-3.5 py-2 rounded-lg border flex items-center gap-2 text-xs font-bold hover:opacity-80 cursor-pointer"
            style={{ borderColor: 'var(--border-main)' }}
          >
            <Volume2 className="w-4 h-4" />
            <span>Escuchar atajos</span>
          </button>

          <button
            onClick={() => setIsShortcutsOpen(false)}
            className="px-5 py-2 rounded-lg font-bold text-sm cursor-pointer"
            style={{
              backgroundColor: 'var(--primary-main)',
              color: 'var(--primary-text)'
            }}
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};
