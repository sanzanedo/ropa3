import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { AccessibilitySettings, FontFamilyType, FontSizeType, ThemeType, SpacingType } from '../types/accessibility';

interface AccessibilityContextType {
  settings: AccessibilitySettings;
  updateSetting: <K extends keyof AccessibilitySettings>(key: K, value: AccessibilitySettings[K]) => void;
  resetSettings: () => void;
  // Speech controls
  isSpeaking: boolean;
  speakingText: string | null;
  speakText: (text: string, onEnd?: () => void) => void;
  stopSpeaking: () => void;
  voices: SpeechSynthesisVoice[];
  // Audio chimes
  playSuccessSound: () => void;
  playFeedbackSound: (correct: boolean) => void;
  // Modals & rulers
  isA11yModalOpen: boolean;
  setIsA11yModalOpen: (open: boolean) => void;
  isShortcutsOpen: boolean;
  setIsShortcutsOpen: (open: boolean) => void;
}

const DEFAULT_SETTINGS: AccessibilitySettings = {
  fontFamily: 'lexend',
  fontSize: 'grande',
  theme: 'claro',
  spacing: 'normal',
  speechRate: 0.9,
  speechPitch: 1.0,
  autoRead: false,
  easyReadMode: false,
  readingRuler: false,
  soundEffects: true,
  selectedVoiceURI: ''
};

const STORAGE_KEY = 'vestiteca_a11y_settings_v1';

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<AccessibilitySettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...DEFAULT_SETTINGS, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.warn('Could not read saved accessibility settings:', e);
    }
    return DEFAULT_SETTINGS;
  });

  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speakingText, setSpeakingText] = useState<string | null>(null);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [isA11yModalOpen, setIsA11yModalOpen] = useState(false);
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false);

  const audioCtxRef = useRef<AudioContext | null>(null);

  // Save settings
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch (e) {
      console.warn('Could not persist accessibility settings:', e);
    }
  }, [settings]);

  // Load voices
  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    const loadVoices = () => {
      const allVoices = window.speechSynthesis.getVoices();
      // Filter or sort for Spanish voices first
      const spanishVoices = allVoices.filter(v => v.lang.startsWith('es'));
      const otherVoices = allVoices.filter(v => !v.lang.startsWith('es'));
      const combined = [...spanishVoices, ...otherVoices];
      setVoices(combined);

      // Auto-select first Spanish voice if none selected
      if (!settings.selectedVoiceURI && spanishVoices.length > 0) {
        setSettings(prev => ({ ...prev, selectedVoiceURI: spanishVoices[0].voiceURI }));
      }
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.onvoiceschanged = null;
      }
    };
  }, [settings.selectedVoiceURI]);

  // Speak text
  const speakText = useCallback((text: string, onEnd?: () => void) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      return;
    }

    window.speechSynthesis.cancel();

    if (!text || !text.trim()) {
      setIsSpeaking(false);
      setSpeakingText(null);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = settings.speechRate;
    utterance.pitch = settings.speechPitch;
    utterance.lang = 'es-ES';

    // Find requested voice or Spanish voice
    if (voices.length > 0) {
      const chosenVoice = voices.find(v => v.voiceURI === settings.selectedVoiceURI) 
        || voices.find(v => v.lang.startsWith('es')) 
        || voices[0];
      if (chosenVoice) {
        utterance.voice = chosenVoice;
      }
    }

    utterance.onstart = () => {
      setIsSpeaking(true);
      setSpeakingText(text);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      setSpeakingText(null);
      if (onEnd) onEnd();
    };

    utterance.onerror = (e) => {
      console.warn('TTS error:', e);
      setIsSpeaking(false);
      setSpeakingText(null);
    };

    window.speechSynthesis.speak(utterance);
  }, [settings.speechRate, settings.speechPitch, settings.selectedVoiceURI, voices]);

  // Stop speaking
  const stopSpeaking = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
    setSpeakingText(null);
  }, []);

  // Soft Web Audio synthesis
  const getAudioContext = useCallback(() => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        audioCtxRef.current = new AudioCtx();
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  }, []);

  const playSuccessSound = useCallback(() => {
    if (!settings.soundEffects) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(523.25, now); // C5
      osc1.frequency.exponentialRampToValueAtTime(659.25, now + 0.15); // E5
      gain1.gain.setValueAtTime(0.08, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.35);
    } catch (e) {
      console.warn('Audio play error:', e);
    }
  }, [settings.soundEffects, getAudioContext]);

  const playFeedbackSound = useCallback((correct: boolean) => {
    if (!settings.soundEffects) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';

      if (correct) {
        osc.frequency.setValueAtTime(587.33, now); // D5
        osc.frequency.setValueAtTime(880, now + 0.12); // A5
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.3);
      } else {
        osc.frequency.setValueAtTime(329.63, now); // E4
        osc.frequency.setValueAtTime(261.63, now + 0.15); // C4
        gain.gain.setValueAtTime(0.07, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.3);
      }
    } catch (e) {
      console.warn('Feedback sound error:', e);
    }
  }, [settings.soundEffects, getAudioContext]);

  const updateSetting = useCallback(<K extends keyof AccessibilitySettings>(
    key: K,
    value: AccessibilitySettings[K]
  ) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  }, []);

  const resetSettings = useCallback(() => {
    setSettings(DEFAULT_SETTINGS);
  }, []);

  // Global Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger when user is in input or textarea
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return;

      if (e.key === 'Escape') {
        stopSpeaking();
        setIsA11yModalOpen(false);
        setIsShortcutsOpen(false);
      } else if (e.altKey && (e.key === 'a' || e.key === 'A')) {
        e.preventDefault();
        setIsA11yModalOpen(prev => !prev);
      } else if (e.altKey && (e.key === 'r' || e.key === 'R')) {
        e.preventDefault();
        updateSetting('readingRuler', !settings.readingRuler);
      } else if (e.altKey && (e.key === 's' || e.key === 'S')) {
        e.preventDefault();
        stopSpeaking();
      } else if (e.key === '?') {
        e.preventDefault();
        setIsShortcutsOpen(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [stopSpeaking, updateSetting, settings.readingRuler]);

  return (
    <AccessibilityContext.Provider
      value={{
        settings,
        updateSetting,
        resetSettings,
        isSpeaking,
        speakingText,
        speakText,
        stopSpeaking,
        voices,
        playSuccessSound,
        playFeedbackSound,
        isA11yModalOpen,
        setIsA11yModalOpen,
        isShortcutsOpen,
        setIsShortcutsOpen
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};
