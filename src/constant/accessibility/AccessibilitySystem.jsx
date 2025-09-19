// =============================================================================
// SYSTÈME D'ACCESSIBILITÉ GLOBALE SUNU LOI
// =============================================================================

// 1. CONTEXT PROVIDER GLOBAL POUR L'ACCESSIBILITÉ
// =============================================================================

import React, { createContext, useContext, useReducer, useEffect } from 'react';

// État initial de l'accessibilité
const initialAccessibilityState = {
  // Paramètres visuels
  fontSize: 16,
  isDyslexiaMode: false,
  isHighContrast: false,
  colorBlindMode: 'none',
  motionSensitivity: 50,
  
  // Paramètres audio
  voiceEnabled: false,
  readingSpeed: 150,
  selectedLanguage: 'fr',
  voiceVolume: 80,
  
  // Paramètres moteur
  handedness: 'right',
  gestureControl: false,
  eyeTracking: false,
  keyboardNavigation: true,
  
  // Paramètres cognitifs
  cognitiveLoad: 'normal',
  comprehensionMode: false,
  emotionalSupport: true,
  focusMode: false,
  
  // IA et adaptatif
  aiAssistantActive: false,
  adaptiveUI: true,
  learningMode: false,
  
  // Profil utilisateur
  userProfile: 'general',
  isInitialized: false
};

// Actions pour le reducer
const ACCESSIBILITY_ACTIONS = {
  SET_FONT_SIZE: 'SET_FONT_SIZE',
  TOGGLE_DYSLEXIA: 'TOGGLE_DYSLEXIA',
  TOGGLE_HIGH_CONTRAST: 'TOGGLE_HIGH_CONTRAST',
  SET_COLOR_BLIND_MODE: 'SET_COLOR_BLIND_MODE',
  SET_MOTION_SENSITIVITY: 'SET_MOTION_SENSITIVITY',
  SET_LANGUAGE: 'SET_LANGUAGE',
  SET_READING_SPEED: 'SET_READING_SPEED',
  TOGGLE_VOICE: 'TOGGLE_VOICE',
  SET_COGNITIVE_LOAD: 'SET_COGNITIVE_LOAD',
  TOGGLE_COMPREHENSION_MODE: 'TOGGLE_COMPREHENSION_MODE',
  TOGGLE_AI_ASSISTANT: 'TOGGLE_AI_ASSISTANT',
  APPLY_PROFILE: 'APPLY_PROFILE',
  RESTORE_SETTINGS: 'RESTORE_SETTINGS',
  RESET_TO_DEFAULT: 'RESET_TO_DEFAULT'
};

// Reducer pour gérer les états d'accessibilité
const accessibilityReducer = (state, action) => {
  switch (action.type) {
    case ACCESSIBILITY_ACTIONS.SET_FONT_SIZE:
      return { ...state, fontSize: action.payload };
    
    case ACCESSIBILITY_ACTIONS.TOGGLE_DYSLEXIA:
      return { ...state, isDyslexiaMode: !state.isDyslexiaMode };
    
    case ACCESSIBILITY_ACTIONS.TOGGLE_HIGH_CONTRAST:
      return { ...state, isHighContrast: !state.isHighContrast };
    
    case ACCESSIBILITY_ACTIONS.SET_COLOR_BLIND_MODE:
      return { ...state, colorBlindMode: action.payload };
    
    case ACCESSIBILITY_ACTIONS.SET_MOTION_SENSITIVITY:
      return { ...state, motionSensitivity: action.payload };
    
    case ACCESSIBILITY_ACTIONS.SET_LANGUAGE:
      return { ...state, selectedLanguage: action.payload };
    
    case ACCESSIBILITY_ACTIONS.SET_READING_SPEED:
      return { ...state, readingSpeed: action.payload };
    
    case ACCESSIBILITY_ACTIONS.TOGGLE_VOICE:
      return { ...state, voiceEnabled: !state.voiceEnabled };
    
    case ACCESSIBILITY_ACTIONS.SET_COGNITIVE_LOAD:
      return { ...state, cognitiveLoad: action.payload };
    
    case ACCESSIBILITY_ACTIONS.TOGGLE_COMPREHENSION_MODE:
      return { ...state, comprehensionMode: !state.comprehensionMode };
    
    case ACCESSIBILITY_ACTIONS.TOGGLE_AI_ASSISTANT:
      return { ...state, aiAssistantActive: !state.aiAssistantActive };
    
    case ACCESSIBILITY_ACTIONS.APPLY_PROFILE:
      return { ...state, ...action.payload, userProfile: action.profileId };
    
    case ACCESSIBILITY_ACTIONS.RESTORE_SETTINGS:
      return { ...state, ...action.payload, isInitialized: true };
    
    case ACCESSIBILITY_ACTIONS.RESET_TO_DEFAULT:
      return { ...initialAccessibilityState, isInitialized: true };
    
    default:
      return state;
  }
};

// Context d'accessibilité
const AccessibilityContext = createContext();

// Provider d'accessibilité
export const AccessibilityProvider = ({ children }) => {
  const [state, dispatch] = useReducer(accessibilityReducer, initialAccessibilityState);

  // Charger les paramètres depuis le stockage local au démarrage
  useEffect(() => {
    const loadSettings = () => {
      try {
        const savedSettings = localStorage.getItem('sunu-loi-accessibility');
        if (savedSettings) {
          const parsedSettings = JSON.parse(savedSettings);
          dispatch({
            type: ACCESSIBILITY_ACTIONS.RESTORE_SETTINGS,
            payload: parsedSettings
          });
        } else {
          dispatch({
            type: ACCESSIBILITY_ACTIONS.RESTORE_SETTINGS,
            payload: { isInitialized: true }
          });
        }
      } catch (error) {
        console.error('Erreur lors du chargement des paramètres d\'accessibilité:', error);
        dispatch({
          type: ACCESSIBILITY_ACTIONS.RESTORE_SETTINGS,
          payload: { isInitialized: true }
        });
      }
    };

    loadSettings();
  }, []);

  // Sauvegarder les paramètres à chaque changement
  useEffect(() => {
    if (state.isInitialized) {
      try {
        const { isInitialized, ...settingsToSave } = state;
        localStorage.setItem('sunu-loi-accessibility', JSON.stringify(settingsToSave));
      } catch (error) {
        console.error('Erreur lors de la sauvegarde des paramètres d\'accessibilité:', error);
      }
    }
  }, [state]);

  // Actions pour manipuler l'état
  const actions = {
    setFontSize: (size) => dispatch({ type: ACCESSIBILITY_ACTIONS.SET_FONT_SIZE, payload: size }),
    toggleDyslexia: () => dispatch({ type: ACCESSIBILITY_ACTIONS.TOGGLE_DYSLEXIA }),
    toggleHighContrast: () => dispatch({ type: ACCESSIBILITY_ACTIONS.TOGGLE_HIGH_CONTRAST }),
    setColorBlindMode: (mode) => dispatch({ type: ACCESSIBILITY_ACTIONS.SET_COLOR_BLIND_MODE, payload: mode }),
    setMotionSensitivity: (level) => dispatch({ type: ACCESSIBILITY_ACTIONS.SET_MOTION_SENSITIVITY, payload: level }),
    setLanguage: (lang) => dispatch({ type: ACCESSIBILITY_ACTIONS.SET_LANGUAGE, payload: lang }),
    setReadingSpeed: (speed) => dispatch({ type: ACCESSIBILITY_ACTIONS.SET_READING_SPEED, payload: speed }),
    toggleVoice: () => dispatch({ type: ACCESSIBILITY_ACTIONS.TOGGLE_VOICE }),
    setCognitiveLoad: (load) => dispatch({ type: ACCESSIBILITY_ACTIONS.SET_COGNITIVE_LOAD, payload: load }),
    toggleComprehensionMode: () => dispatch({ type: ACCESSIBILITY_ACTIONS.TOGGLE_COMPREHENSION_MODE }),
    toggleAiAssistant: () => dispatch({ type: ACCESSIBILITY_ACTIONS.TOGGLE_AI_ASSISTANT }),
    applyProfile: (profileId, settings) => dispatch({ 
      type: ACCESSIBILITY_ACTIONS.APPLY_PROFILE, 
      payload: settings, 
      profileId 
    }),
    resetToDefault: () => dispatch({ type: ACCESSIBILITY_ACTIONS.RESET_TO_DEFAULT })
  };

  return (
    <AccessibilityContext.Provider value={{ ...state, actions }}>
      {children}
    </AccessibilityContext.Provider>
  );
};

// Hook pour utiliser l'accessibilité
export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility doit être utilisé dans un AccessibilityProvider');
  }
  return context;
};

// =============================================================================
// 2. COMPOSANT WRAPPER GLOBAL POUR APPLIQUER LES STYLES
// =============================================================================

export const AccessibilityWrapper = ({ children }) => {
  const accessibility = useAccessibility();

  // Génération des classes CSS dynamiques
  const getGlobalClasses = () => {
    const classes = [];
    
    // Mode dyslexie
    if (accessibility.isDyslexiaMode) {
      classes.push('accessibility-dyslexia');
    }
    
    // Contraste élevé
    if (accessibility.isHighContrast) {
      classes.push('accessibility-high-contrast');
    }
    
    // Daltonisme
    if (accessibility.colorBlindMode !== 'none') {
      classes.push(`accessibility-colorblind-${accessibility.colorBlindMode}`);
    }
    
    // Charge cognitive
    classes.push(`accessibility-cognitive-${accessibility.cognitiveLoad}`);
    
    // Mode compréhension
    if (accessibility.comprehensionMode) {
      classes.push('accessibility-comprehension');
    }
    
    // Sensibilité au mouvement
    if (accessibility.motionSensitivity < 30) {
      classes.push('accessibility-reduced-motion');
    }
    
    // Mode focus
    if (accessibility.focusMode) {
      classes.push('accessibility-focus-mode');
    }
    
    return classes.join(' ');
  };

  // Application des styles CSS globaux
  useEffect(() => {
    const root = document.documentElement;
    
    // Taille de police globale
    root.style.setProperty('--sunu-font-size', `${accessibility.fontSize}px`);
    
    // Variables CSS pour les couleurs
    if (accessibility.isHighContrast) {
      root.style.setProperty('--sunu-bg-primary', '#000000');
      root.style.setProperty('--sunu-text-primary', '#FFFF00');
      root.style.setProperty('--sunu-bg-secondary', '#1a1a1a');
      root.style.setProperty('--sunu-text-secondary', '#FFD700');
      root.style.setProperty('--sunu-accent', '#FFFF00');
    } else {
      // Couleurs normales Sunu Loi (vert/jaune)
      root.style.setProperty('--sunu-bg-primary', '#f0fdf4');
      root.style.setProperty('--sunu-text-primary', '#1f2937');
      root.style.setProperty('--sunu-bg-secondary', '#ffffff');
      root.style.setProperty('--sunu-text-secondary', '#6b7280');
      root.style.setProperty('--sunu-accent', '#10b981');
    }
    
    // Police pour dyslexie
    if (accessibility.isDyslexiaMode) {
      root.style.setProperty('--sunu-font-family', 'Monaco, "Courier New", monospace');
      root.style.setProperty('--sunu-letter-spacing', '0.1em');
    } else {
      root.style.setProperty('--sunu-font-family', 'Inter, system-ui, sans-serif');
      root.style.setProperty('--sunu-letter-spacing', 'normal');
    }
    
    // Vitesse d'animation
    const animationSpeed = accessibility.motionSensitivity < 30 ? '0.1s' : '0.3s';
    root.style.setProperty('--sunu-animation-duration', animationSpeed);
    
  }, [accessibility]);

  return (
    <div className={`sunu-accessibility-wrapper ${getGlobalClasses()}`}>
      {children}
    </div>
  );
};

// =============================================================================
// 3. CSS GLOBAL POUR L'ACCESSIBILITÉ
// =============================================================================

export const AccessibilityCSS = `
/* Variables CSS globales Sunu Loi */
:root {
  --sunu-font-size: 16px;
  --sunu-font-family: Inter, system-ui, sans-serif;
  --sunu-letter-spacing: normal;
  --sunu-animation-duration: 0.3s;
  --sunu-bg-primary: #f0fdf4;
  --sunu-text-primary: #1f2937;
  --sunu-bg-secondary: #ffffff;
  --sunu-text-secondary: #6b7280;
  --sunu-accent: #10b981;
}

/* Application globale des styles d'accessibilité */
.sunu-accessibility-wrapper * {
  font-size: var(--sunu-font-size) !important;
  font-family: var(--sunu-font-family) !important;
  letter-spacing: var(--sunu-letter-spacing) !important;
  transition-duration: var(--sunu-animation-duration) !important;
}

/* Mode dyslexie */
.accessibility-dyslexia {
  --sunu-font-family: Monaco, "Courier New", monospace;
  --sunu-letter-spacing: 0.1em;
}

.accessibility-dyslexia * {
  line-height: 1.8 !important;
  word-spacing: 0.2em !important;
}

/* Contraste élevé */
.accessibility-high-contrast {
  --sunu-bg-primary: #000000;
  --sunu-text-primary: #FFFF00;
  --sunu-bg-secondary: #1a1a1a;
  --sunu-text-secondary: #FFD700;
  --sunu-accent: #FFFF00;
}

.accessibility-high-contrast * {
  background-color: var(--sunu-bg-primary) !important;
  color: var(--sunu-text-primary) !important;
  border-color: var(--sunu-accent) !important;
}

/* Daltonisme - Protanopie (déficience rouge) */
.accessibility-colorblind-protanopia {
  filter: url('#protanopia-filter');
}

/* Daltonisme - Deutéranopie (déficience verte) */
.accessibility-colorblind-deuteranopia {
  filter: url('#deuteranopia-filter');
}

/* Daltonisme - Tritanopie (déficience bleue) */
.accessibility-colorblind-tritanopia {
  filter: url('#tritanopia-filter');
}

/* Charge cognitive simple */
.accessibility-cognitive-simple * {
  font-size: calc(var(--sunu-font-size) * 1.2) !important;
  line-height: 1.8 !important;
  padding: 0.5rem !important;
}

.accessibility-cognitive-simple .complex-element {
  display: none !important;
}

/* Mode compréhension */
.accessibility-comprehension strong,
.accessibility-comprehension .legal-term {
  background-color: rgba(34, 197, 94, 0.2) !important;
  padding: 2px 4px !important;
  border-radius: 4px !important;
}

/* Mouvement réduit */
.accessibility-reduced-motion * {
  animation: none !important;
  transition: none !important;
}

/* Mode focus */
.accessibility-focus-mode * {
  outline: 2px solid var(--sunu-accent) !important;
  outline-offset: 2px !important;
}

.accessibility-focus-mode *:not(:focus) {
  opacity: 0.7 !important;
}

/* Navigation clavier améliorée */
.sunu-accessibility-wrapper :focus {
  outline: 3px solid #10b981 !important;
  outline-offset: 2px !important;
  box-shadow: 0 0 0 6px rgba(16, 185, 129, 0.2) !important;
}

/* Support pour les lecteurs d'écran */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* Animations respectueuses */
@media (prefers-reduced-motion: reduce) {
  .sunu-accessibility-wrapper * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* Filtres SVG pour le daltonisme */
.accessibility-filters {
  position: absolute;
  width: 0;
  height: 0;
}
`;

// =============================================================================
// 4. HOOK POUR L'ACCESSIBILITÉ DANS LES COMPOSANTS
// =============================================================================

export const useAccessibleComponent = () => {
  const accessibility = useAccessibility();

  // Génération des classes CSS pour un composant
  const getAccessibleClasses = (baseClasses = '') => {
    let classes = baseClasses;
    
    if (accessibility.isHighContrast) {
      classes += ' high-contrast';
    }
    
    if (accessibility.isDyslexiaMode) {
      classes += ' dyslexia-mode';
    }
    
    if (accessibility.comprehensionMode) {
      classes += ' comprehension-mode';
    }
    
    return classes;
  };

  // Génération des styles inline
  const getAccessibleStyles = (baseStyles = {}) => {
    return {
      ...baseStyles,
      fontSize: `${accessibility.fontSize}px`,
      fontFamily: accessibility.isDyslexiaMode ? 'Monaco, monospace' : 'Inter, sans-serif',
      letterSpacing: accessibility.isDyslexiaMode ? '0.1em' : 'normal',
      lineHeight: accessibility.comprehensionMode ? '1.8' : '1.6'
    };
  };

  // Fonction pour lire du texte (Text-to-Speech)
  const speakText = (text) => {
    if (accessibility.voiceEnabled && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = accessibility.readingSpeed / 150; // Normalisation
      utterance.lang = accessibility.selectedLanguage;
      speechSynthesis.speak(utterance);
    }
  };

  // Fonction pour arrêter la lecture
  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
    }
  };

  return {
    accessibility,
    getAccessibleClasses,
    getAccessibleStyles,
    speakText,
    stopSpeaking
  };
};

// =============================================================================
// 5. COMPOSANT D'ACCESSIBILITÉ POUR LA NAVIGATION
// =============================================================================

export const AccessibilityNav = () => {
  const { actions, ...accessibility } = useAccessibility();

  return (
    <div className="accessibility-nav" role="region" aria-label="Contrôles d'accessibilité">
      <button
        onClick={actions.toggleHighContrast}
        aria-pressed={accessibility.isHighContrast}
        title="Basculer le contraste élevé"
        className="accessibility-toggle"
      >
        🎨 Contraste
      </button>
      
      <button
        onClick={actions.toggleDyslexia}
        aria-pressed={accessibility.isDyslexiaMode}
        title="Mode dyslexie"
        className="accessibility-toggle"
      >
        📖 Dyslexie
      </button>
      
      <button
        onClick={actions.toggleVoice}
        aria-pressed={accessibility.voiceEnabled}
        title="Lecture vocale"
        className="accessibility-toggle"
      >
        🔊 Voix
      </button>
    </div>
  );
};

// =============================================================================
// 6. INTÉGRATION DANS APP.JS PRINCIPAL
// =============================================================================

/*
// App.js principal de Sunu Loi
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AccessibilityProvider, AccessibilityWrapper, AccessibilityCSS } from './accessibility/AccessibilitySystem';

function App() {
  return (
    <AccessibilityProvider>
      <AccessibilityWrapper>
        <div className="App">
          <style>{AccessibilityCSS}</style>
          
          <Router>
            {/* Votre application normale *\/}
            <Header />
            <Navigation />
            <main>
              <Routes>
                {/* Toutes vos routes *\/}
              </Routes>
            </main>
            <Footer />
          </Router>
        </div>
      </AccessibilityWrapper>
    </AccessibilityProvider>
  );
}

export default App;
*/

// =============================================================================
// 7. EXEMPLE D'UTILISATION DANS UN COMPOSANT
// =============================================================================

/*
import React from 'react';
import { useAccessibleComponent } from './accessibility/AccessibilitySystem';

const ArticlePage = ({ article }) => {
  const { accessibility, getAccessibleClasses, speakText } = useAccessibleComponent();

  const handleReadArticle = () => {
    speakText(article.content);
  };

  return (
    <article className={getAccessibleClasses('article-container')}>
      <header>
        <h1 style={{ fontSize: `${accessibility.fontSize * 1.5}px` }}>
          {article.title}
        </h1>
        
        {accessibility.voiceEnabled && (
          <button onClick={handleReadArticle} className="read-button">
            🔊 Lire l'article
          </button>
        )}
      </header>
      
      <div 
        className={accessibility.comprehensionMode ? 'comprehension-mode' : ''}
        style={{
          lineHeight: accessibility.comprehensionMode ? '1.8' : '1.6',
          fontSize: `${accessibility.fontSize}px`
        }}
      >
        {article.content}
      </div>
    </article>
  );
};
*/

export default {
  AccessibilityProvider,
  AccessibilityWrapper,
  useAccessibility,
  useAccessibleComponent,
  AccessibilityNav,
  AccessibilityCSS,
  ACCESSIBILITY_ACTIONS
};