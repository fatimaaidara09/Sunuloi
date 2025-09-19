// contexts/AccessibilityContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const AccessibilityContext = createContext();

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};

export const AccessibilityProvider = ({ children }) => {
  const [settings, setSettings] = useState({
    fontSize: 'normal',
    highContrast: false,
    darkMode: false,
    soundEnabled: true,
    voiceSearch: false,
    readAloud: false,
    language: 'fr',
    reducedMotion: false
  });

  useEffect(() => {
    // Charger les préférences d'accessibilité depuis le localStorage
    const savedSettings = localStorage.getItem('sunuloi_accessibility');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const updateSetting = (key, value) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    
    // Sauvegarder dans localStorage
    localStorage.setItem('sunuloi_accessibility', JSON.stringify(newSettings));
    
    // Appliquer immédiatement les changements
    applyAccessibilitySettings(key, value);
  };

  const applyAccessibilitySettings = (key, value) => {
    switch(key) {
      case 'fontSize':
        document.documentElement.style.fontSize = 
          value === 'large' ? '120%' : 
          value === 'xlarge' ? '140%' : '100%';
        break;
      case 'highContrast':
        document.documentElement.classList.toggle('high-contrast', value);
        break;
      case 'darkMode':
        document.documentElement.classList.toggle('dark', value);
        break;
      case 'reducedMotion':
        document.documentElement.classList.toggle('reduce-motion', value);
        break;
    }
  };

  const speakText = (text) => {
    if (settings.soundEnabled && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = settings.language;
      window.speechSynthesis.speak(utterance);
    }
  };

  const value = {
    settings,
    updateSetting,
    speakText
  };

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  );
};