// src/components/Header/Header.jsx
import React, { useState } from 'react';
import { Scale, Menu, X, UserCheck, Sun, Moon, Bell, Search, Home, BookOpen, HelpCircle } from 'lucide-react';
import LoginModal from './LoginModal';

const Header = ({ darkMode, toggleDarkMode, language, setLanguage, user, setUser, onSearch }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const notifications = [
    { id: 1, title: "Nouveau Code de l'environnement publié", time: "Il y a 2h", unread: true },
    { id: 2, title: "Mise à jour du Code du travail", time: "Il y a 1 jour", unread: true },
    { id: 3, title: "Nouvelle jurisprudence disponible", time: "Il y a 3 jours", unread: false }
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() && onSearch) {
      onSearch(searchQuery.trim());
    }
  };

  const navLinks = [
    { href: "#home", icon: Home, label: "Accueil" },
    { href: "#texts", icon: BookOpen, label: "Textes" },
    { href: "#search", icon: Search, label: "Recherche avancée" },
    { href: "#help", icon: HelpCircle, label: "Aide" }
  ];

  return (
    <>
      <header className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b shadow-lg sticky top-0 z-40`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo et titre */}
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-green-600 to-green-700 rounded-lg shadow-lg">
                <Scale className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
                  JuriSénégal
                </h1>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Plateforme Juridique Officielle
                </p>
              </div>
            </div>
            
            {/* Barre de recherche rapide (desktop) */}
            <div className="hidden lg:flex flex-1 max-w-lg mx-8">
              <form onSubmit={handleSearch} className="w-full">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Recherche rapide..."
                    className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                      darkMode 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                  />
                </div>
              </form>
            </div>

            {/* Navigation principale (desktop) */}
            <nav className="hidden md:flex space-x-1">
              {navLinks.map(({ href, icon: Icon, label }) => (
                <a
                  key={href}
                  href={href}
                  className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    darkMode 
                      ? 'hover:bg-gray-700 hover:text-green-400' 
                      : 'hover:bg-green-50 hover:text-green-700'
                  }`}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {label}
                </a>
              ))}
            </nav>

            {/* Actions utilisateur */}
            <div className="flex items-center space-x-3">
              {/* Sélecteur de langue */}
              <div className="relative">
                <select 
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className={`px-3 py-2 rounded-lg border text-sm font-medium cursor-pointer ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-700'
                  }`}
                  aria-label="Choisir la langue"
                >
                  <option value="fr">🇫🇷 Français</option>
                  <option value="wo">🇸🇳 Wolof</option>
                  <option value="en">🇺🇸 English</option>
                </select>
              </div>

              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className={`p-2 rounded-lg transition-colors relative ${
                    darkMode 
                      ? 'hover:bg-gray-700' 
                      : 'hover:bg-gray-100'
                  }`}
                  aria-label="Notifications"
                >
                  <Bell className="h-5 w-5" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {/* Dropdown des notifications */}
                {showNotifications && (
                  <div className={`absolute right-0 mt-2 w-80 ${
                    darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                  } border rounded-lg shadow-xl z-50`}>
                    <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                      <h3 className="font-semibold">Notifications</h3>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {unreadCount} nouvelle{unreadCount > 1 ? 's' : ''}
                      </p>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {notifications.map((notif) => (
                        <div
                          key={notif.id}
                          className={`p-4 border-b border-gray-100 dark:border-gray-700 last:border-b-0 ${
                            notif.unread 
                              ? darkMode ? 'bg-gray-700' : 'bg-blue-50' 
                              : ''
                          }`}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="text-sm font-medium">{notif.title}</p>
                              <p className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                {notif.time}
                              </p>
                            </div>
                            {notif.unread && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full mt-1"></div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-4 text-center">
                      <button className="text-green-600 hover:text-green-700 text-sm font-medium">
                        Voir toutes les notifications
                      </button>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Toggle mode sombre */}
              <button 
                onClick={toggleDarkMode} 
                className={`p-2 rounded-lg transition-colors ${
                  darkMode 
                    ? 'hover:bg-gray-700 text-yellow-400' 
                    : 'hover:bg-gray-100 text-gray-600'
                }`}
                aria-label={darkMode ? "Activer le mode clair" : "Activer le mode sombre"}
              >
                {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
              
              {/* Utilisateur connecté ou bouton de connexion */}
              {user ? (
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-green-50 dark:bg-green-900/20">
                    <UserCheck className="h-4 w-4 text-green-600" />
                    <div className="text-left">
                      <p className="text-sm font-medium text-green-800 dark:text-green-300">
                        {user.name}
                      </p>
                      <p className="text-xs text-green-600 dark:text-green-400">
                        {user.role === 'administrator' ? 'Administrateur' : 'Utilisateur'}
                      </p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setUser(null)} 
                    className="text-sm text-red-600 hover:text-red-700 hover:underline font-medium"
                  >
                    Déconnexion
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => setShowLogin(true)} 
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Connexion
                </button>
              )}
              
              {/* Menu mobile */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                aria-label="Menu mobile"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Barre de recherche mobile */}
          <div className="lg:hidden pb-4">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Rechercher dans les textes juridiques..."
                  className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                />
              </div>
            </form>
          </div>

          {/* Menu mobile */}
          {isMenuOpen && (
            <div className="md:hidden border-t border-gray-200 dark:border-gray-700 py-4 mb-4">
              <nav className="flex flex-col space-y-1">
                {navLinks.map(({ href, icon: Icon, label }) => (
                  <a
                    key={href}
                    href={href}
                    className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                      darkMode 
                        ? 'hover:bg-gray-700 text-gray-300' 
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Icon className="h-5 w-5 mr-3" />
                    {label}
                  </a>
                ))}
              </nav>
            </div>
          )}
        </div>

        {/* Fermer les dropdowns en cliquant ailleurs */}
        {showNotifications && (
          <div 
            className="fixed inset-0 z-30" 
            onClick={() => setShowNotifications(false)}
          ></div>
        )}
      </header>
      
      <LoginModal 
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
        onLogin={setUser}
        darkMode={darkMode}
      />
    </>
  );
};

export default Header;