// src/pages/Login.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Scale, Mail, Lock, ArrowRight, Shield, User, BookOpen, Star, AlertTriangle, CheckCircle } from "lucide-react";

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  
  // États du formulaire
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

  // Données utilisateur fictives pour la démonstration
  const demoUsers = {
    "admin@sunuloi.sn": {
      password: "admin123",
      user: {
        id: 1,
        name: "Administrateur SunuLoi",
        email: "admin@sunuloi.sn",
        role: "administrator",
        avatar: null,
        preferences: {
          theme: "light",
          notifications: true,
          language: "fr"
        },
        stats: {
          searchCount: 247,
          favoriteCount: 23,
          downloadCount: 45
        }
      }
    },
    "utilisateur@example.com": {
      password: "user123",
      user: {
        id: 2,
        name: "Utilisateur Test",
        email: "utilisateur@example.com",
        role: "user",
        avatar: null,
        preferences: {
          theme: "light",
          notifications: true,
          language: "fr"
        },
        stats: {
          searchCount: 15,
          favoriteCount: 5,
          downloadCount: 8
        }
      }
    }
  };

  // Fonctionnalités disponibles selon le rôle
  const features = [
    { icon: BookOpen, title: "Accès complet aux textes", desc: "Codes, lois, jurisprudences" },
    { icon: Star, title: "Système de favoris", desc: "Sauvegardez vos documents importants" },
    { icon: Shield, title: "Glossaire juridique", desc: "Définitions et termes spécialisés" },
    { icon: User, title: "Espace personnel", desc: "Historique et préférences" }
  ];

  // Validation du formulaire
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = "L'email est requis";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Format d'email invalide";
    }
    
    if (!formData.password) {
      newErrors.password = "Le mot de passe est requis";
    } else if (formData.password.length < 6) {
      newErrors.password = "Le mot de passe doit contenir au moins 6 caractères";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Gestion de la soumission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    setErrors({});
    
    try {
      // Simulation d'une requête d'authentification
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Vérification des identifiants
      const userCredentials = demoUsers[formData.email];
      
      if (!userCredentials || userCredentials.password !== formData.password) {
        setErrors({ 
          general: "Email ou mot de passe incorrect" 
        });
        setIsLoading(false);
        return;
      }
      
      // Connexion réussie
      const userData = userCredentials.user;
      
      // Sauvegarde dans localStorage si "Se souvenir de moi"
      if (formData.rememberMe) {
        localStorage.setItem('sunuloi_user', JSON.stringify(userData));
        localStorage.setItem('sunuloi_remember', 'true');
      } else {
        sessionStorage.setItem('sunuloi_user', JSON.stringify(userData));
      }
      
      setShowSuccess(true);
      
      // Notification du parent component
      if (onLogin) {
        onLogin(userData);
      }
      
      // Redirection après succès
      setTimeout(() => {
        if (userData.role === 'administrator') {
          navigate('/admin/dashboard');
        } else {
          navigate('/user-dashboard');
        }
      }, 1500);
      
    } catch (error) {
      setErrors({ 
        general: "Erreur de connexion. Veuillez réessayer." 
      });
    }
    
    setIsLoading(false);
  };

  // Gestion des changements de champs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Effacer les erreurs lors de la modification
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  // Connexion rapide demo
  const quickLogin = (email, password) => {
    setFormData({ email, password, rememberMe: false });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Conteneur principal */}
      <div className="max-w-4xl w-full space-y-8">
        
        {/* Header */}
        <div className="text-center">
          <Link to="/" className="inline-flex items-center mb-6 group">
            <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-600 to-green-700 rounded-2xl mr-4 group-hover:scale-110 transition-transform">
              <Scale className="h-8 w-8 text-white" />
            </div>
            <div className="text-left">
              <h1 className="text-3xl font-bold text-green-800">SunuLoi</h1>
              <p className="text-green-600">Service Public du Droit</p>
            </div>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Formulaire de connexion */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Connexion à votre espace
              </h2>
              <p className="text-gray-600">
                Accédez à toutes les fonctionnalités avancées de la plateforme
              </p>
            </div>

            {/* Message de succès */}
            {showSuccess && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center">
                <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                <div>
                  <p className="text-green-800 font-medium">Connexion réussie !</p>
                  <p className="text-green-600 text-sm">Redirection en cours...</p>
                </div>
              </div>
            )}

            {/* Erreur générale */}
            {errors.general && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
                <AlertTriangle className="h-5 w-5 text-red-600 mr-3" />
                <p className="text-red-800">{errors.general}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Champ Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Adresse email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-green-500 transition-all ${
                      errors.email 
                        ? 'border-red-300 focus:border-red-500' 
                        : 'border-gray-200 focus:border-green-500'
                    }`}
                    placeholder="votre@email.com"
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              {/* Champ Mot de passe */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Mot de passe
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-12 py-3 border-2 rounded-lg focus:ring-2 focus:ring-green-500 transition-all ${
                      errors.password 
                        ? 'border-red-300 focus:border-red-500' 
                        : 'border-gray-200 focus:border-green-500'
                    }`}
                    placeholder="Votre mot de passe"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                )}
              </div>

              {/* Options */}
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                  />
                  <span className="ml-2 text-sm text-gray-600">Se souvenir de moi</span>
                </label>
                <Link 
                  to="/mot-de-passe-oublie" 
                  className="text-sm text-green-600 hover:text-green-700 hover:underline font-medium"
                >
                  Mot de passe oublié ?
                </Link>
              </div>

              {/* Bouton de connexion */}
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex items-center justify-center px-6 py-3 rounded-lg font-semibold transition-all transform ${
                  isLoading 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 hover:scale-105 hover:shadow-lg'
                } text-white`}
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Connexion en cours...
                  </>
                ) : (
                  <>
                    Se connecter
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </button>
            </form>

            {/* Comptes de démonstration */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-600 mb-4 text-center">Comptes de démonstration :</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={() => quickLogin("admin@sunuloi.sn", "admin123")}
                  className="p-3 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors text-left"
                >
                  <p className="text-sm font-medium text-green-800">👨‍💼 Administrateur</p>
                  <p className="text-xs text-green-600">admin@sunuloi.sn</p>
                </button>
                <button
                  onClick={() => quickLogin("utilisateur@example.com", "user123")}
                  className="p-3 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors text-left"
                >
                  <p className="text-sm font-medium text-blue-800">👤 Utilisateur</p>
                  <p className="text-xs text-blue-600">utilisateur@example.com</p>
                </button>
              </div>
            </div>

            {/* Lien d'inscription */}
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Pas encore de compte ?{" "}
                <Link 
                  to="/inscription" 
                  className="text-green-600 hover:text-green-700 font-semibold hover:underline"
                >
                  Créer un compte gratuit
                </Link>
              </p>
            </div>
          </div>

          {/* Panneau des fonctionnalités */}
          <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-2xl p-8 text-white">
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-4">
                🔐 Espace Personnel SunuLoi
              </h3>
              <p className="text-green-100 leading-relaxed">
                Connectez-vous pour accéder à toutes les fonctionnalités avancées 
                et personnaliser votre expérience juridique.
              </p>
            </div>

            {/* Liste des fonctionnalités */}
            <div className="space-y-6">
              {features.map((feature, idx) => (
                <div key={idx} className="flex items-start">
                  <div className="flex items-center justify-center w-12 h-12 bg-white bg-opacity-20 rounded-lg mr-4 flex-shrink-0">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">{feature.title}</h4>
                    <p className="text-green-100 text-sm">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Statistiques */}
            <div className="mt-8 pt-6 border-t border-green-500 border-opacity-30">
              <h4 className="font-semibold mb-4">📊 Plateforme en chiffres</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">5,264</div>
                  <div className="text-green-200 text-sm">Documents</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">15,420</div>
                  <div className="text-green-200 text-sm">Utilisateurs</div>
                </div>
              </div>
            </div>

            {/* Call-to-action */}
            <div className="mt-8 p-4 bg-white bg-opacity-10 rounded-lg backdrop-blur-sm">
              <p className="text-sm text-green-100 mb-3">
                ✨ <strong>Nouveau :</strong> Glossaire juridique interactif disponible !
              </p>
              <Link 
                to="/inscription"
                className="inline-flex items-center text-white hover:text-yellow-300 font-medium transition-colors"
              >
                Créer un compte maintenant
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-gray-600">
          <p className="text-sm">
            En vous connectant, vous acceptez nos{" "}
            <Link to="/conditions" className="text-green-600 hover:underline">
              conditions d'utilisation
            </Link>
            {" "}et notre{" "}
            <Link to="/confidentialite" className="text-green-600 hover:underline">
              politique de confidentialité
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;