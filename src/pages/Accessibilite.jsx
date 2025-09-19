import React, { useState, useEffect, useRef } from 'react';
import { 
  Volume2, Eye, Languages, Book, Settings, Palette, Type, Play, Pause, SkipForward, 
  SkipBack, Mic, MicOff, Zap, Brain, Accessibility, MousePointer, Smartphone,
  Moon, Sun, Focus, Maximize2, Minimize2, RotateCcw, Save, Download, Upload,
  Heart, Shield, Users, Globe, Sparkles, Target, Wand2, RefreshCw, Star,
  ArrowUp, ArrowDown, ChevronRight, Menu, X, Check, AlertTriangle
} from 'lucide-react';
import Footer from '../components/Footer';

const AccessibilityPage = () => {
  // États de base
  const [isDyslexiaMode, setIsDyslexiaMode] = useState(false);
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [selectedLanguage, setSelectedLanguage] = useState('fr');
  const [readingLevel, setReadingLevel] = useState('intermediaire');
  const [isReading, setIsReading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  
  // Nouveaux états révolutionnaires
  const [aiAssistantActive, setAiAssistantActive] = useState(false);
  const [eyeTracking, setEyeTracking] = useState(false);
  const [gestureControl, setGestureControl] = useState(false);
  const [voiceNavigation, setVoiceNavigation] = useState(false);
  const [adaptiveUI, setAdaptiveUI] = useState(true);
  const [cognitiveLoad, setCognitiveLoad] = useState('normal');
  const [motionSensitivity, setMotionSensitivity] = useState(50);
  const [focusMode, setFocusMode] = useState(false);
  const [colorBlindMode, setColorBlindMode] = useState('none');
  const [handedness, setHandedness] = useState('right');
  const [readingSpeed, setReadingSpeed] = useState(150);
  const [comprehensionMode, setComprehensionMode] = useState(false);
  const [emotionalSupport, setEmotionalSupport] = useState(true);
  const [activePanel, setActivePanel] = useState('quick');
  const [isExpanded, setIsExpanded] = useState(false);
  const [userProfile, setUserProfile] = useState('general');
  const [quickActions, setQuickActions] = useState([]);
  const [learningMode, setLearningMode] = useState(false);

  const canvasRef = useRef(null);

  // Profils utilisateur prédéfinis
  const userProfiles = [
    { 
      id: 'visual', 
      name: 'Malvoyant', 
      icon: '👁️', 
      settings: { fontSize: 22, isHighContrast: true, voiceNavigation: true }
    },
    { 
      id: 'motor', 
      name: 'Mobilité réduite', 
      icon: '♿', 
      settings: { gestureControl: true, voiceNavigation: true, adaptiveUI: true }
    },
    { 
      id: 'cognitive', 
      name: 'Difficultés cognitives', 
      icon: '🧠', 
      settings: { cognitiveLoad: 'simple', comprehensionMode: true, emotionalSupport: true }
    },
    { 
      id: 'dyslexia', 
      name: 'Dyslexie', 
      icon: '📖', 
      settings: { isDyslexiaMode: true, readingSpeed: 100, comprehensionMode: true }
    },
    { 
      id: 'elderly', 
      name: 'Seniors', 
      icon: '👴', 
      settings: { fontSize: 20, motionSensitivity: 20, cognitiveLoad: 'simple' }
    },
    { 
      id: 'general', 
      name: 'Général', 
      icon: '👤', 
      settings: {}
    }
  ];

  // Langues avec support vocal
  const languages = [
    { code: 'fr', name: 'Français', native: 'Français', voice: 'Marie', flag: '🇫🇷' },
    { code: 'wo', name: 'Wolof', native: 'Wolof', voice: 'Awa', flag: '🇸🇳' },
    { code: 'ff', name: 'Pulaar', native: 'Pulaar', voice: 'Fatou', flag: '🇸🇳' },
    { code: 'sr', name: 'Serer', native: 'Seereer', voice: 'Ndèye', flag: '🇸🇳' },
    { code: 'en', name: 'English', native: 'English', voice: 'Sarah', flag: '🇺🇸' },
    { code: 'ar', name: 'Arabic', native: 'العربية', voice: 'Aicha', flag: '🇸🇦' }
  ];

  const readingLevels = [
    { value: 'simple', label: 'Simple', desc: 'Langage très accessible', icon: '🟢' },
    { value: 'intermediaire', label: 'Intermédiaire', desc: 'Langage juridique simplifié', icon: '🟡' },
    { value: 'expert', label: 'Expert', desc: 'Langage juridique technique', icon: '🔴' }
  ];

  // Effets visuels révolutionnaires
  useEffect(() => {
    if (adaptiveUI) {
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        // Animation de particules pour l'arrière-plan
        const particles = [];
        for (let i = 0; i < 30; i++) {
          particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            size: Math.random() * 3 + 1
          });
        }

        const animate = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.fillStyle = isHighContrast ? 'rgba(255, 255, 0, 0.1)' : 'rgba(34, 197, 94, 0.1)';
          
          particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
            
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fill();
          });
          
          if (adaptiveUI) requestAnimationFrame(animate);
        };
        
        animate();
      }
    }
  }, [adaptiveUI, isHighContrast]);

  // Simulation IA pour adaptation automatique
  useEffect(() => {
    if (aiAssistantActive && learningMode) {
      const interval = setInterval(() => {
        // Simulation d'adaptation basée sur le comportement utilisateur
        const adaptations = [
          () => setFontSize(prev => Math.min(24, prev + 1)),
          () => setReadingSpeed(prev => Math.max(100, prev - 10)),
          () => setCognitiveLoad('simple'),
        ];
        
        const randomAdaptation = adaptations[Math.floor(Math.random() * adaptations.length)];
        if (Math.random() > 0.8) randomAdaptation();
      }, 5000);
      
      return () => clearInterval(interval);
    }
  }, [aiAssistantActive, learningMode]);

  // Commandes vocales simulées
  useEffect(() => {
    if (voiceNavigation) {
      const handleKeyDown = (e) => {
        if (e.ctrlKey) {
          switch (e.key) {
            case 'v':
              e.preventDefault();
              setVoiceNavigation(!voiceNavigation);
              break;
            case 'f':
              e.preventDefault();
              setFocusMode(!focusMode);
              break;
            case 'a':
              e.preventDefault();
              setAiAssistantActive(!aiAssistantActive);
              break;
          }
        }
      };
      
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [voiceNavigation, focusMode, aiAssistantActive]);

  const applyProfile = (profile) => {
    setUserProfile(profile.id);
    Object.entries(profile.settings).forEach(([key, value]) => {
      switch (key) {
        case 'fontSize': setFontSize(value); break;
        case 'isHighContrast': setIsHighContrast(value); break;
        case 'isDyslexiaMode': setIsDyslexiaMode(value); break;
        case 'voiceNavigation': setVoiceNavigation(value); break;
        case 'gestureControl': setGestureControl(value); break;
        case 'adaptiveUI': setAdaptiveUI(value); break;
        case 'cognitiveLoad': setCognitiveLoad(value); break;
        case 'readingSpeed': setReadingSpeed(value); break;
        case 'comprehensionMode': setComprehensionMode(value); break;
        case 'emotionalSupport': setEmotionalSupport(value); break;
        case 'motionSensitivity': setMotionSensitivity(value); break;
      }
    });
  };

  const exportSettings = () => {
    const settings = {
      isDyslexiaMode, isHighContrast, fontSize, selectedLanguage, readingLevel,
      aiAssistantActive, eyeTracking, gestureControl, voiceNavigation, adaptiveUI,
      cognitiveLoad, motionSensitivity, focusMode, colorBlindMode, handedness,
      readingSpeed, comprehensionMode, emotionalSupport, userProfile, learningMode
    };
    
    const blob = new Blob([JSON.stringify(settings, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sunu-loi-accessibility-settings.json';
    a.click();
  };

  const getThemeClasses = () => {
    if (isHighContrast) {
      return {
        bg: 'bg-black',
        text: 'text-yellow-300',
        card: 'bg-gray-900 border-yellow-300',
        button: 'bg-yellow-300 text-black hover:bg-yellow-400',
        accent: 'text-yellow-400'
      };
    }
    
    return {
      bg: 'bg-gradient-to-br from-green-50 via-yellow-50 to-green-100',
      text: 'text-gray-900',
      card: 'bg-white/90 border-green-200',
      button: 'bg-gradient-to-r from-green-500 to-yellow-500 text-white hover:from-green-600 hover:to-yellow-600',
      accent: 'text-green-600'
    };
  };

  const theme = getThemeClasses();

  return (
    <div className={`min-h-screen transition-all duration-500 ${theme.bg} ${theme.text} ${isDyslexiaMode ? 'font-mono' : 'font-sans'}`}
         style={{ fontSize: `${fontSize}px` }}>
      
      {/* Canvas d'arrière-plan animé */}
      {adaptiveUI && (
        <canvas 
          ref={canvasRef} 
          className="fixed inset-0 pointer-events-none z-0 opacity-30"
          style={{ filter: motionSensitivity < 30 ? 'blur(2px)' : 'none' }}
        />
      )}

      {/* Assistant IA flottant */}
      {aiAssistantActive && (
        <div className="fixed bottom-6 right-6 z-50">
          <div className={`${theme.card} backdrop-blur-xl rounded-2xl shadow-2xl p-4 border-2 animate-pulse`}>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Brain className="w-8 h-8 text-green-500 animate-spin" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-ping" />
              </div>
              <div>
                <div className={`text-sm font-bold ${theme.accent}`}>Assistant IA Sunu</div>
                <div className={`text-xs ${theme.text} opacity-70`}>
                  {learningMode ? 'Apprentissage actif...' : 'Assistance intelligente'}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header révolutionnaire */}
      <div className={`${theme.card} backdrop-blur-xl shadow-2xl sticky top-0 z-40 border-b-4`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className={`p-3 rounded-2xl ${theme.button} shadow-lg transform hover:scale-110 transition-all`}>
                <Accessibility className="w-8 h-8" />
              </div>
              <div>
                <h1 className={`text-3xl font-black ${theme.text} tracking-tight`}>
                  🇸🇳 Sunu Loi Accessible
                </h1>
                <p className={`text-base ${theme.accent} font-medium`}>
                  Justice inclusive pour tous les Sénégalais
                </p>
              </div>
            </div>
            
            {/* Actions rapides révolutionnaires */}
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setLearningMode(!learningMode)}
                className={`p-3 rounded-xl transition-all transform hover:scale-110 ${
                  learningMode ? theme.button : `${theme.card} border-2 hover:border-green-400`
                }`}
                title="Mode apprentissage IA"
              >
                <Sparkles className="w-6 h-6" />
              </button>
              
              <button
                onClick={() => setAiAssistantActive(!aiAssistantActive)}
                className={`p-3 rounded-xl transition-all transform hover:scale-110 ${
                  aiAssistantActive ? theme.button : `${theme.card} border-2 hover:border-yellow-400`
                }`}
                title="Assistant IA"
              >
                <Brain className="w-6 h-6" />
              </button>
              
              <button
                onClick={() => setFocusMode(!focusMode)}
                className={`p-3 rounded-xl transition-all transform hover:scale-110 ${
                  focusMode ? theme.button : `${theme.card} border-2 hover:border-purple-400`
                }`}
                title="Mode concentration"
              >
                <Focus className="w-6 h-6" />
              </button>
              
              <div className="h-8 w-px bg-gray-300" />
              
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className={`p-3 rounded-xl ${theme.button} transform hover:scale-110 transition-all`}
                title="Panneau étendu"
              >
                {isExpanded ? <Minimize2 className="w-6 h-6" /> : <Maximize2 className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <div className={`grid ${isExpanded ? 'grid-cols-1 lg:grid-cols-4' : 'grid-cols-1 lg:grid-cols-3'} gap-8`}>
          
          {/* Sélection de profil utilisateur */}
          <div className={`${isExpanded ? 'lg:col-span-1' : 'lg:col-span-3'} mb-8`}>
            <div className={`${theme.card} backdrop-blur-xl rounded-3xl shadow-2xl border-2 p-6`}>
              <h2 className={`text-xl font-bold mb-6 flex items-center ${theme.text}`}>
                <Users className="w-6 h-6 mr-3 text-green-500" />
                Profils d'accessibilité
              </h2>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {userProfiles.map((profile) => (
                  <button
                    key={profile.id}
                    onClick={() => applyProfile(profile)}
                    className={`p-4 rounded-2xl transition-all transform hover:scale-105 ${
                      userProfile === profile.id 
                        ? theme.button
                        : `${theme.card} border-2 hover:border-green-400`
                    } text-center group`}
                  >
                    <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">
                      {profile.icon}
                    </div>
                    <div className="text-sm font-bold">{profile.name}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Panel de contrôles révolutionnaire */}
          <div className={`${isExpanded ? 'lg:col-span-2' : 'lg:col-span-1'}`}>
            <div className={`${theme.card} backdrop-blur-xl rounded-3xl shadow-2xl border-2 p-6 sticky top-24`}>
              <div className="flex items-center justify-between mb-6">
                <h2 className={`text-xl font-bold flex items-center ${theme.text}`}>
                  <Wand2 className="w-6 h-6 mr-3 text-yellow-500" />
                  Contrôles Intelligents
                </h2>
                <div className="flex space-x-2">
                  <button onClick={exportSettings} className={`p-2 rounded-lg ${theme.button}`}>
                    <Download className="w-4 h-4" />
                  </button>
                  <button className={`p-2 rounded-lg ${theme.card} border`}>
                    <Upload className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Navigation par onglets */}
              <div className="flex space-x-1 mb-6 bg-gray-100 rounded-2xl p-1">
                {[
                  { id: 'quick', label: 'Rapide', icon: Zap },
                  { id: 'vision', label: 'Vision', icon: Eye },
                  { id: 'audio', label: 'Audio', icon: Volume2 },
                  { id: 'motor', label: 'Moteur', icon: MousePointer },
                  { id: 'cognitive', label: 'Cognitif', icon: Brain }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActivePanel(tab.id)}
                    className={`flex-1 py-2 px-3 rounded-xl text-sm font-medium transition-all ${
                      activePanel === tab.id ? theme.button : 'hover:bg-white/50'
                    }`}
                  >
                    <tab.icon className="w-4 h-4 mx-auto mb-1" />
                    <div className="hidden sm:block">{tab.label}</div>
                  </button>
                ))}
              </div>

              {/* Contenu des panneaux */}
              <div className="space-y-6 max-h-96 overflow-y-auto">
                
                {/* Panneau Rapide */}
                {activePanel === 'quick' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => setIsHighContrast(!isHighContrast)}
                        className={`p-4 rounded-2xl transition-all flex flex-col items-center ${
                          isHighContrast ? theme.button : `${theme.card} border-2 hover:border-yellow-400`
                        }`}
                      >
                        <Palette className="w-6 h-6 mb-2" />
                        <span className="text-sm font-medium">Contraste</span>
                      </button>
                      
                      <button
                        onClick={() => setIsDyslexiaMode(!isDyslexiaMode)}
                        className={`p-4 rounded-2xl transition-all flex flex-col items-center ${
                          isDyslexiaMode ? theme.button : `${theme.card} border-2 hover:border-blue-400`
                        }`}
                      >
                        <Type className="w-6 h-6 mb-2" />
                        <span className="text-sm font-medium">Dyslexie</span>
                      </button>
                      
                      <button
                        onClick={() => setVoiceNavigation(!voiceNavigation)}
                        className={`p-4 rounded-2xl transition-all flex flex-col items-center ${
                          voiceNavigation ? theme.button : `${theme.card} border-2 hover:border-green-400`
                        }`}
                      >
                        <Mic className="w-6 h-6 mb-2" />
                        <span className="text-sm font-medium">Vocal</span>
                      </button>
                      
                      <button
                        onClick={() => setGestureControl(!gestureControl)}
                        className={`p-4 rounded-2xl transition-all flex flex-col items-center ${
                          gestureControl ? theme.button : `${theme.card} border-2 hover:border-purple-400`
                        }`}
                      >
                        <MousePointer className="w-6 h-6 mb-2" />
                        <span className="text-sm font-medium">Gestes</span>
                      </button>
                    </div>
                    
                    {/* Taille du texte avec slider révolutionnaire */}
                    <div>
                      <label className={`block text-sm font-medium mb-3 ${theme.text}`}>
                        Taille du texte: {fontSize}px
                      </label>
                      <div className="relative">
                        <input
                          type="range"
                          min="12"
                          max="28"
                          value={fontSize}
                          onChange={(e) => setFontSize(parseInt(e.target.value))}
                          className="w-full h-3 bg-gradient-to-r from-green-200 to-yellow-200 rounded-full appearance-none cursor-pointer slider"
                        />
                        <div className="flex justify-between text-xs mt-1">
                          <span>Petit</span>
                          <span>Moyen</span>
                          <span>Grand</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Panneau Vision */}
                {activePanel === 'vision' && (
                  <div className="space-y-4">
                    <div>
                      <label className={`block text-sm font-medium mb-3 ${theme.text}`}>
                        Type de daltonisme
                      </label>
                      <select
                        value={colorBlindMode}
                        onChange={(e) => setColorBlindMode(e.target.value)}
                        className={`w-full p-3 rounded-xl border-2 ${theme.card} focus:border-green-500`}
                      >
                        <option value="none">Aucun</option>
                        <option value="protanopia">Protanopie (rouge)</option>
                        <option value="deuteranopia">Deutéranopie (vert)</option>
                        <option value="tritanopia">Tritanopie (bleu)</option>
                      </select>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl">
                      <div className="flex items-center">
                        <Eye className="w-6 h-6 mr-3 text-blue-500" />
                        <span className="font-medium">Suivi oculaire</span>
                      </div>
                      <button
                        onClick={() => setEyeTracking(!eyeTracking)}
                        className={`w-12 h-6 rounded-full transition-all ${
                          eyeTracking ? 'bg-green-500' : 'bg-gray-300'
                        } relative`}
                      >
                        <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                          eyeTracking ? 'translate-x-6' : 'translate-x-0.5'
                        }`} />
                      </button>
                    </div>
                  </div>
                )}

                {/* Panneau Audio */}
                {activePanel === 'audio' && (
                  <div className="space-y-4">
                    <div>
                      <label className={`block text-sm font-medium mb-3 ${theme.text}`}>
                        Vitesse de lecture: {readingSpeed} mots/min
                      </label>
                      <input
                        type="range"
                        min="80"
                        max="300"
                        value={readingSpeed}
                        onChange={(e) => setReadingSpeed(parseInt(e.target.value))}
                        className="w-full h-3 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full appearance-none cursor-pointer"
                      />
                    </div>
                    
                    <div>
                      <label className={`block text-sm font-medium mb-3 ${theme.text}`}>
                        Assistant vocal
                      </label>
                      <select
                        value={selectedLanguage}
                        onChange={(e) => setSelectedLanguage(e.target.value)}
                        className={`w-full p-3 rounded-xl border-2 ${theme.card} focus:border-green-500`}
                      >
                        {languages.map((lang) => (
                          <option key={lang.code} value={lang.code}>
                            {lang.flag} {lang.native} - {lang.voice}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    {/* Contrôles de lecture avancés */}
                    <div className="grid grid-cols-3 gap-2">
                      <button className={`p-3 rounded-xl ${theme.card} border-2 hover:border-green-400`}>
                        <SkipBack className="w-5 h-5 mx-auto" />
                      </button>
                      <button
                        onClick={toggleReading}
                        className={`p-3 rounded-xl ${isReading ? 'bg-red-500 text-white' : theme.button}`}
                      >
                        {isReading ? <Pause className="w-5 h-5 mx-auto" /> : <Play className="w-5 h-5 mx-auto" />}
                      </button>
                      <button className={`p-3 rounded-xl ${theme.card} border-2 hover:border-green-400`}>
                        <SkipForward className="w-5 h-5 mx-auto" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Panneau Moteur */}
                {activePanel === 'motor' && (
                  <div className="space-y-4">
                    <div>
                      <label className={`block text-sm font-medium mb-3 ${theme.text}`}>
                        Main dominante
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => setHandedness('left')}
                          className={`p-3 rounded-xl ${handedness === 'left' ? theme.button : `${theme.card} border`}`}
                        >
                          👈 Gauche
                        </button>
                        <button
                          onClick={() => setHandedness('right')}
                          className={`p-3 rounded-xl ${handedness === 'right' ? theme.button : `${theme.card} border`}`}
                        >
                          👉 Droite
                        </button>
                      </div>
                    </div>
                    
                    <div>
                      <label className={`block text-sm font-medium mb-3 ${theme.text}`}>
                        Sensibilité au mouvement: {motionSensitivity}%
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={motionSensitivity}
                        onChange={(e) => setMotionSensitivity(parseInt(e.target.value))}
                        className="w-full h-3 bg-gradient-to-r from-red-200 to-green-200 rounded-full appearance-none cursor-pointer"
                      />
                    </div>
                  </div>
                )}

                {/* Panneau Cognitif */}
                {activePanel === 'cognitive' && (
                  <div className="space-y-4">
                    <div>
                      <label className={`block text-sm font-medium mb-3 ${theme.text}`}>
                        Charge cognitive
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {['simple', 'normal', 'complexe'].map((level) => (
                          <button
                            key={level}
                            onClick={() => setCognitiveLoad(level)}
                            className={`p-3 rounded-xl text-sm font-medium ${
                              cognitiveLoad === level ? theme.button : `${theme.card} border`
                            }`}
                          >
                            {level === 'simple' && '🟢'}
                            {level === 'normal' && '🟡'}
                            {level === 'complexe' && '🔴'}
                            <div className="mt-1 capitalize">{level}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
                        <span className="font-medium">Mode compréhension</span>
                        <button
                          onClick={() => setComprehensionMode(!comprehensionMode)}
                          className={`w-12 h-6 rounded-full transition-all ${
                            comprehensionMode ? 'bg-purple-500' : 'bg-gray-300'
                          } relative`}
                        >
                          <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                            comprehensionMode ? 'translate-x-6' : 'translate-x-0.5'
                          }`} />
                        </button>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
                        <span className="font-medium">Support émotionnel</span>
                        <button
                          onClick={() => setEmotionalSupport(!emotionalSupport)}
                          className={`w-12 h-6 rounded-full transition-all ${
                            emotionalSupport ? 'bg-green-500' : 'bg-gray-300'
                          } relative`}
                        >
                          <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                            emotionalSupport ? 'translate-x-6' : 'translate-x-0.5'
                          }`} />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Contenu principal révolutionnaire */}
          <div className={`${isExpanded ? 'lg:col-span-1' : 'lg:col-span-2'} space-y-6`}>
            
            {/* Démonstration en temps réel */}
            <div className={`${theme.card} backdrop-blur-xl rounded-3xl shadow-2xl border-2 p-6 relative overflow-hidden`}>
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-400/20 to-yellow-400/20 rounded-full transform translate-x-16 -translate-y-16" />
              
              <h3 className={`text-xl font-bold mb-6 flex items-center ${theme.text} relative z-10`}>
                <Target className="w-6 h-6 mr-3 text-green-500" />
                Aperçu en temps réel
              </h3>
              
              <div className={`p-6 rounded-2xl ${isHighContrast ? 'bg-gray-800 border-yellow-300' : 'bg-gradient-to-r from-green-50 to-yellow-50'} border-2 relative z-10`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                    <span className={`text-sm font-medium ${theme.text}`}>
                      Niveau {readingLevels.find(l => l.value === readingLevel)?.label}
                    </span>
                  </div>
                  <div className="flex space-x-1">
                    {languages.find(l => l.code === selectedLanguage)?.flag}
                    <span className="text-sm">{languages.find(l => l.code === selectedLanguage)?.native}</span>
                  </div>
                </div>
                
                <p className={`leading-relaxed ${theme.text} ${comprehensionMode ? 'text-lg leading-loose' : ''}`}>
                  {readingLevel === 'simple' && "🇸🇳 Sunu Loi yi, dañu nekk ngir défar jàmm ak équité ci réew mi. Dañu wax ne ndax war naa xam sa yax yi, war naa def li neexul ak seeni loi yi."}
                  {readingLevel === 'intermediaire' && "La Constitution de la République du Sénégal 🇸🇳 établit les principes fondamentaux qui garantissent la justice et l'égalité pour tous les citoyens. Elle définit vos droits essentiels et les recours légaux disponibles."}
                  {readingLevel === 'expert' && "La Constitution de la République du Sénégal constitue la norme juridique suprême qui détermine l'architecture institutionnelle de l'État et consacre les droits fondamentaux des citoyens, en établissant les mécanismes juridictionnels de protection et de recours."}
                </p>
                
                {/* Indicateurs de compréhension */}
                {comprehensionMode && (
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full" />
                      <span className="text-sm">Concepts clés mis en évidence</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full" />
                      <span className="text-sm">Définitions simplifiées disponibles</span>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Barre de progression de lecture */}
              {isReading && (
                <div className="mt-4 relative z-10">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Lecture en cours...</span>
                    <span className="text-sm">{Math.round(readingProgress)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="h-3 rounded-full bg-gradient-to-r from-green-400 to-yellow-400 transition-all duration-300"
                      style={{ width: `${readingProgress}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Statistiques d'utilisation */}
            <div className={`${theme.card} backdrop-blur-xl rounded-3xl shadow-2xl border-2 p-6`}>
              <h3 className={`text-lg font-bold mb-4 flex items-center ${theme.text}`}>
                <Star className="w-6 h-6 mr-3 text-yellow-500" />
                Tableau de bord personnel
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl">
                  <div className="text-2xl font-bold text-green-600">89%</div>
                  <div className="text-sm text-green-700">Accessibilité</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-2xl">
                  <div className="text-2xl font-bold text-yellow-600">156</div>
                  <div className="text-sm text-yellow-700">Articles lus</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl">
                  <div className="text-2xl font-bold text-blue-600">12h</div>
                  <div className="text-sm text-blue-700">Temps d'écoute</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl">
                  <div className="text-2xl font-bold text-purple-600">94%</div>
                  <div className="text-sm text-purple-700">Satisfaction</div>
                </div>
              </div>
            </div>

            {/* Raccourcis intelligents */}
            <div className={`${theme.card} backdrop-blur-xl rounded-3xl shadow-2xl border-2 p-6`}>
              <h3 className={`text-lg font-bold mb-4 flex items-center ${theme.text}`}>
                <Zap className="w-6 h-6 mr-3 text-yellow-500" />
                Actions rapides intelligentes
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button className={`${theme.button} p-4 rounded-2xl text-left hover:scale-105 transform transition-all shadow-lg group`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-bold">🎯 Recherche vocale</div>
                      <div className="text-sm opacity-75">Parlez pour chercher</div>
                    </div>
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
                
                <button className={`${theme.button} p-4 rounded-2xl text-left hover:scale-105 transform transition-all shadow-lg group`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-bold">📖 Lecture guidée</div>
                      <div className="text-sm opacity-75">Assistance IA</div>
                    </div>
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
                
                <button className={`${theme.button} p-4 rounded-2xl text-left hover:scale-105 transform transition-all shadow-lg group`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-bold">🤝 Aide juridique</div>
                      <div className="text-sm opacity-75">Chat en temps réel</div>
                    </div>
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
                
                <button className={`${theme.button} p-4 rounded-2xl text-left hover:scale-105 transform transition-all shadow-lg group`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-bold">🎓 Formation</div>
                      <div className="text-sm opacity-75">Modules interactifs</div>
                    </div>
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
              </div>
            </div>

            {/* Centre de notifications intelligentes */}
            <div className={`${theme.card} backdrop-blur-xl rounded-3xl shadow-2xl border-2 p-6`}>
              <h3 className={`text-lg font-bold mb-4 flex items-center ${theme.text}`}>
                <Heart className="w-6 h-6 mr-3 text-red-500" />
                Notifications adaptives
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-start space-x-3 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border-l-4 border-green-400">
                  <Check className="w-5 h-5 text-green-500 mt-0.5" />
                  <div>
                    <div className="font-medium text-green-800">Profil optimisé</div>
                    <div className="text-sm text-green-600">Vos paramètres ont été ajustés automatiquement pour une meilleure expérience</div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl border-l-4 border-yellow-400">
                  <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5" />
                  <div>
                    <div className="font-medium text-yellow-800">Pause recommandée</div>
                    <div className="text-sm text-yellow-600">Vous lisez depuis 45 minutes. Une pause de 10 minutes est conseillée.</div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border-l-4 border-blue-400">
                  <Sparkles className="w-5 h-5 text-blue-500 mt-0.5" />
                  <div>
                    <div className="font-medium text-blue-800">Nouvelle fonctionnalité</div>
                    <div className="text-sm text-blue-600">Le mode "Explication simple" est maintenant disponible en wolof!</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Barre d'outils flottante */}
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
          <div className={`${theme.card} backdrop-blur-xl rounded-full shadow-2xl border-2 px-6 py-3 flex items-center space-x-4`}>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              title="Retour en haut"
            >
              <ArrowUp className="w-5 h-5" />
            </button>
            
            <div className="h-6 w-px bg-gray-300" />
            
            <div className="flex items-center space-x-2">
              <Globe className="w-4 h-4 text-green-500" />
              <span className="text-sm font-medium">{languages.find(l => l.code === selectedLanguage)?.native}</span>
            </div>
            
            <div className="h-6 w-px bg-gray-300" />
            
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${aiAssistantActive ? 'bg-green-400 animate-pulse' : 'bg-gray-300'}`} />
              <span className="text-sm">IA {aiAssistantActive ? 'Active' : 'Inactive'}</span>
            </div>
            
            <button
              onClick={() => setAdaptiveUI(!adaptiveUI)}
              className={`p-2 rounded-full transition-colors ${adaptiveUI ? 'text-green-500' : 'text-gray-400'}`}
              title="Interface adaptive"
            >
              <RefreshCw className={`w-5 h-5 ${adaptiveUI ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Styles CSS personnalisés */}
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: linear-gradient(45deg, #10b981, #eab308);
          cursor: pointer;
          box-shadow: 0 0 10px rgba(16, 185, 129, 0.5);
        }
        
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: linear-gradient(45deg, #10b981, #eab308);
          cursor: pointer;
          border: none;
          box-shadow: 0 0 10px rgba(16, 185, 129, 0.5);
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .floating {
          animation: float 3s ease-in-out infinite;
        }
        
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
      <Footer/>
    </div>
  );
};

// Fonction utilitaire pour simulation de la synthèse vocale
const toggleReading = () => {
  if (!isReading) {
    setIsReading(true);
    let progress = 0;
    const interval = setInterval(() => {
      progress += 2;
      setReadingProgress(progress);
      if (progress >= 100) {
        setIsReading(false);
        setReadingProgress(0);
        clearInterval(interval);
      }
    }, 100);
  } else {
    setIsReading(false);
    setReadingProgress(0);

    
  }
};

export default AccessibilityPage;