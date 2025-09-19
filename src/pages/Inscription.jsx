// src/pages/Register.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Eye, EyeOff, Scale, Mail, Lock, ArrowRight, Shield, User, BookOpen, Star, 
  AlertTriangle, CheckCircle, UserCheck, Building, Phone, MapPin
} from "lucide-react";

const Inscription = ({ onInscription }) => {
  const navigate = useNavigate();
  
  // États du formulaire
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    profession: "",
    organization: "",
    city: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
    receiveUpdates: true
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  // Liste des professions
  const professions = [
    "Avocat",
    "Magistrat",
    "Notaire",
    "Huissier de justice",
    "Juriste d'entreprise",
    "Conseiller juridique",
    "Étudiant en droit",
    "Enseignant-chercheur",
    "Fonctionnaire",
    "Entrepreneur",
    "Particulier",
    "Autre"
  ];

  // Villes principales du Sénégal
  const cities = [
    "Dakar",
    "Thiès",
    "Kaolack",
    "Ziguinchor",
    "Saint-Louis",
    "Louga",
    "Matam",
    "Kolda",
    "Tambacounda",
    "Fatick",
    "Kaffrine",
    "Kédougou",
    "Sédhiou",
    "Diourbel",
    "Autre"
  ];

  // Fonctionnalités disponibles
  const benefits = [
    { 
      icon: BookOpen, 
      title: "Bibliothèque complète", 
      desc: "Accès à tous les codes, lois et jurisprudences du Sénégal" 
    },
    { 
      icon: Star, 
      title: "Espace personnalisé", 
      desc: "Favoris, historique et recommandations personnalisées" 
    },
    { 
      icon: Shield, 
      title: "Mises à jour automatiques", 
      desc: "Restez informé des dernières modifications légales" 
    },
    { 
      icon: User, 
      title: "Support professionnel", 
      desc: "Assistance dédiée pour vos recherches juridiques" 
    }
  ];

  // Validation du formulaire
  const validateStep = (step) => {
    const newErrors = {};
    
    if (step === 1) {
      if (!formData.firstName.trim()) {
        newErrors.firstName = "Le prénom est requis";
      } else if (formData.firstName.length < 2) {
        newErrors.firstName = "Le prénom doit contenir au moins 2 caractères";
      }
      
      if (!formData.lastName.trim()) {
        newErrors.lastName = "Le nom est requis";
      } else if (formData.lastName.length < 2) {
        newErrors.lastName = "Le nom doit contenir au moins 2 caractères";
      }
      
      if (!formData.email) {
        newErrors.email = "L'email est requis";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Format d'email invalide";
      }
      
      if (!formData.phone.trim()) {
        newErrors.phone = "Le numéro de téléphone est requis";
      } else if (!/^(\+221|00221)?[0-9]{9}$/.test(formData.phone.replace(/\s/g, ''))) {
        newErrors.phone = "Format de téléphone invalide (ex: +221 77 123 45 67)";
      }
    }
    
    if (step === 2) {
      if (!formData.profession) {
        newErrors.profession = "La profession est requise";
      }
      
      if (!formData.city) {
        newErrors.city = "La ville est requise";
      }
    }
    
    if (step === 3) {
      if (!formData.password) {
        newErrors.password = "Le mot de passe est requis";
      } else if (formData.password.length < 8) {
        newErrors.password = "Le mot de passe doit contenir au moins 8 caractères";
      } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
        newErrors.password = "Le mot de passe doit contenir au moins une minuscule, une majuscule et un chiffre";
      }
      
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = "Confirmez votre mot de passe";
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Les mots de passe ne correspondent pas";
      }
      
      if (!formData.acceptTerms) {
        newErrors.acceptTerms = "Vous devez accepter les conditions d'utilisation";
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Navigation entre les étapes
  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
    setErrors({});
  };

  // Gestion de la soumission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateStep(3)) return;
    
    setIsLoading(true);
    setErrors({});
    
    try {
      // Simulation d'une requête d'inscription
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Vérification si l'email existe déjà
      const existingUsers = ["admin@sunuloi.sn", "utilisateur@example.com"];
      if (existingUsers.includes(formData.email)) {
        setErrors({ 
          general: "Un compte avec cette adresse email existe déjà" 
        });
        setIsLoading(false);
        return;
      }
      
      // Création du nouvel utilisateur
      const newUser = {
        id: Date.now(),
        fullName: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        profession: formData.profession,
        organization: formData.organization,
        city: formData.city,
        role: "user",
        avatar: null,
        registrationDate: new Date().toISOString(),
        preferences: {
          theme: "light",
          notifications: formData.receiveUpdates,
          language: "fr"
        },
        stats: {
          searchCount: 0,
          favoriteCount: 0,
          downloadCount: 0
        }
      };
      
      // Sauvegarde dans localStorage
      localStorage.setItem('sunuloi_user', JSON.stringify(newUser));
      
      setShowSuccess(true);
      
      // Notification du parent component
      if (onInscription) {
        onInscription(newUser);
      }
      
      // Redirection après succès
      setTimeout(() => {
        navigate('/user-dashboard');
      }, 2000);
      
    } catch (error) {
      setErrors({ 
        general: "Erreur lors de l'inscription. Veuillez réessayer." 
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

  // Rendu de l'étape 1 : Informations personnelles
  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Prénom */}
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
            Prénom *
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            value={formData.firstName}
            onChange={handleChange}
            className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-green-500 transition-all ${
              errors.firstName 
                ? 'border-red-300 focus:border-red-500' 
                : 'border-gray-200 focus:border-green-500'
            }`}
            placeholder="Votre prénom"
          />
          {errors.firstName && (
            <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
          )}
        </div>

        {/* Nom */}
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
            Nom de famille *
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            value={formData.lastName}
            onChange={handleChange}
            className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-green-500 transition-all ${
              errors.lastName 
                ? 'border-red-300 focus:border-red-500' 
                : 'border-gray-200 focus:border-green-500'
            }`}
            placeholder="Votre nom"
          />
          {errors.lastName && (
            <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
          )}
        </div>
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          Adresse email *
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

      {/* Téléphone */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
          Numéro de téléphone *
        </label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            className={`w-full pl-10 pr-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-green-500 transition-all ${
              errors.phone 
                ? 'border-red-300 focus:border-red-500' 
                : 'border-gray-200 focus:border-green-500'
            }`}
            placeholder="+221 77 123 45 67"
          />
        </div>
        {errors.phone && (
          <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
        )}
      </div>
    </div>
  );

  // Rendu de l'étape 2 : Informations professionnelles
  const renderStep2 = () => (
    <div className="space-y-6">
      {/* Profession */}
      <div>
        <label htmlFor="profession" className="block text-sm font-medium text-gray-700 mb-2">
          Profession *
        </label>
        <div className="relative">
          <UserCheck className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <select
            id="profession"
            name="profession"
            value={formData.profession}
            onChange={handleChange}
            className={`w-full pl-10 pr-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-green-500 transition-all ${
              errors.profession 
                ? 'border-red-300 focus:border-red-500' 
                : 'border-gray-200 focus:border-green-500'
            }`}
          >
            <option value="">Sélectionnez votre profession</option>
            {professions.map((prof) => (
              <option key={prof} value={prof}>{prof}</option>
            ))}
          </select>
        </div>
        {errors.profession && (
          <p className="mt-1 text-sm text-red-600">{errors.profession}</p>
        )}
      </div>

      {/* Organisation */}
      <div>
        <label htmlFor="organization" className="block text-sm font-medium text-gray-700 mb-2">
          Organisation / Entreprise
        </label>
        <div className="relative">
          <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            id="organization"
            name="organization"
            type="text"
            value={formData.organization}
            onChange={handleChange}
            className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
            placeholder="Nom de votre organisation (optionnel)"
          />
        </div>
      </div>

      {/* Ville */}
      <div>
        <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
          Ville *
        </label>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <select
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className={`w-full pl-10 pr-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-green-500 transition-all ${
              errors.city 
                ? 'border-red-300 focus:border-red-500' 
                : 'border-gray-200 focus:border-green-500'
            }`}
          >
            <option value="">Sélectionnez votre ville</option>
            {cities.map((city) => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>
        {errors.city && (
          <p className="mt-1 text-sm text-red-600">{errors.city}</p>
        )}
      </div>
    </div>
  );

  // Rendu de l'étape 3 : Sécurité et conditions
  const renderStep3 = () => (
    <div className="space-y-6">
      {/* Mot de passe */}
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
          Mot de passe *
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
            placeholder="Minimum 8 caractères"
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
        <div className="mt-2">
          <p className="text-xs text-gray-500">
            Le mot de passe doit contenir au moins 8 caractères avec une majuscule, une minuscule et un chiffre
          </p>
        </div>
      </div>

      {/* Confirmation mot de passe */}
      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
          Confirmez le mot de passe *
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            id="confirmPassword"
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            value={formData.confirmPassword}
            onChange={handleChange}
            className={`w-full pl-10 pr-12 py-3 border-2 rounded-lg focus:ring-2 focus:ring-green-500 transition-all ${
              errors.confirmPassword 
                ? 'border-red-300 focus:border-red-500' 
                : 'border-gray-200 focus:border-green-500'
            }`}
            placeholder="Répétez votre mot de passe"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
        )}
      </div>

      {/* Conditions d'utilisation */}
      <div className="space-y-4">
        <label className={`flex items-start space-x-3 cursor-pointer ${errors.acceptTerms ? 'text-red-600' : ''}`}>
          <input
            type="checkbox"
            name="acceptTerms"
            checked={formData.acceptTerms}
            onChange={handleChange}
            className="mt-1 h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
          />
          <span className="text-sm">
            J'accepte les{" "}
            <Link to="/conditions" className="text-green-600 hover:underline font-medium">
              conditions d'utilisation
            </Link>
            {" "}et la{" "}
            <Link to="/confidentialite" className="text-green-600 hover:underline font-medium">
              politique de confidentialité
            </Link>
            {" "}de SunuLoi *
          </span>
        </label>
        {errors.acceptTerms && (
          <p className="text-sm text-red-600 ml-7">{errors.acceptTerms}</p>
        )}

        <label className="flex items-start space-x-3 cursor-pointer">
          <input
            type="checkbox"
            name="receiveUpdates"
            checked={formData.receiveUpdates}
            onChange={handleChange}
            className="mt-1 h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
          />
          <span className="text-sm text-gray-600">
            Je souhaite recevoir les mises à jour et actualités juridiques par email
          </span>
        </label>
      </div>
    </div>
  );

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
          
          {/* Formulaire d'inscription */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Créer votre compte SunuLoi
              </h2>
              <p className="text-gray-600">
                Rejoignez notre communauté juridique et accédez à tous nos services
              </p>
            </div>

            {/* Indicateur de progression */}
            <div className="mb-8">
              <div className="flex items-center justify-between text-sm">
                <span className={`${currentStep >= 1 ? 'text-green-600 font-medium' : 'text-gray-400'}`}>
                  1. Informations personnelles
                </span>
                <span className={`${currentStep >= 2 ? 'text-green-600 font-medium' : 'text-gray-400'}`}>
                  2. Profil professionnel
                </span>
                <span className={`${currentStep >= 3 ? 'text-green-600 font-medium' : 'text-gray-400'}`}>
                  3. Sécurité
                </span>
              </div>
              <div className="mt-2 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(currentStep / 3) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Message de succès */}
            {showSuccess && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center">
                <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                <div>
                  <p className="text-green-800 font-medium">Inscription réussie !</p>
                  <p className="text-green-600 text-sm">Bienvenue dans la communauté SunuLoi</p>
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

            <form onSubmit={handleSubmit}>
              {/* Rendu conditionnel des étapes */}
              {currentStep === 1 && renderStep1()}
              {currentStep === 2 && renderStep2()}
              {currentStep === 3 && renderStep3()}

              {/* Boutons de navigation */}
              <div className="mt-8 flex items-center justify-between">
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-6 py-3 border-2 border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-all"
                  >
                    Précédent
                  </button>
                )}
                
                {currentStep < 3 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="ml-auto px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-all flex items-center"
                  >
                    Suivant
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`ml-auto flex items-center justify-center px-6 py-3 rounded-lg font-semibold transition-all transform ${
                      isLoading 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 hover:scale-105 hover:shadow-lg'
                    } text-white`}
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Création du compte...
                      </>
                    ) : (
                      <>
                        Créer mon compte
                        <UserCheck className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </button>
                )}
              </div>
            </form>

            {/* Lien de connexion */}
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Déjà un compte ?{" "}
                <Link 
                  to="/connexion" 
                  className="text-green-600 hover:text-green-700 font-semibold hover:underline"
                >
                  Se connecter
                </Link>
              </p>
            </div>
          </div>

          {/* Panneau des avantages */}
          <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-2xl p-8 text-white">
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-4">
                🚀 Rejoignez SunuLoi gratuitement
              </h3>
              <p className="text-green-100 leading-relaxed">
                Créez votre compte pour bénéficier de tous nos services 
                et rejoindre une communauté de professionnels du droit.
              </p>
            </div>

            {/* Liste des avantages */}
            <div className="space-y-6">
              {benefits.map((benefit, idx) => (
                <div key={idx} className="flex items-start">
                  <div className="flex items-center justify-center w-12 h-12 bg-white bg-opacity-20 rounded-lg mr-4 flex-shrink-0">
                    <benefit.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">{benefit.title}</h4>
                    <p className="text-green-100 text-sm">{benefit.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Témoignages */}
            <div className="mt-8 p-4 bg-white bg-opacity-10 rounded-lg backdrop-blur-sm">
              <p className="text-sm text-green-100 mb-2 italic">
                "SunuLoi m'a permis de gagner un temps précieux dans mes recherches juridiques. 
                Interface intuitive et contenu de qualité !"
              </p>
              <p className="text-xs text-green-200">
                - Maître Aminata Diop, Avocate au Barreau de Dakar
              </p>
            </div>

            {/* Statistiques */}
            <div className="mt-8 pt-6 border-t border-green-500 border-opacity-30">
              <h4 className="font-semibold mb-4">📈 Rejoignez notre communauté</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">15,420</div>
                  <div className="text-green-200 text-sm">Professionnels inscrits</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">98%</div>
                  <div className="text-green-200 text-sm">Taux de satisfaction</div>
                </div>
              </div>
            </div>

            {/* Sécurité */}
            <div className="mt-6 p-4 bg-white bg-opacity-10 rounded-lg backdrop-blur-sm">
              <div className="flex items-center mb-2">
                <Shield className="h-5 w-5 text-white mr-2" />
                <span className="font-medium">Sécurité garantie</span>
              </div>
              <p className="text-sm text-green-100">
                Vos données personnelles sont protégées et chiffrées selon les 
                standards internationaux. Nous ne partageons jamais vos informations.
              </p>
            </div>

            {/* Support */}
            <div className="mt-4 p-4 bg-white bg-opacity-10 rounded-lg backdrop-blur-sm">
              <p className="text-sm text-green-100 mb-3">
                ❓ <strong>Besoin d'aide ?</strong> Notre équipe support est disponible
              </p>
              <div className="flex items-center space-x-4 text-sm text-green-200">
                <span>📧 support@sunuloi.sn</span>
                <span>📞 +221 33 123 45 67</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer avec informations légales */}
        <div className="text-center text-gray-600 space-y-4">
          <div className="flex items-center justify-center space-x-6 text-sm">
            <Link to="/conditions" className="text-green-600 hover:underline">
              Conditions d'utilisation
            </Link>
            <Link to="/confidentialite" className="text-green-600 hover:underline">
              Politique de confidentialité
            </Link>
            <Link to="/contact" className="text-green-600 hover:underline">
              Contact
            </Link>
            <Link to="/aide" className="text-green-600 hover:underline">
              Centre d'aide
            </Link>
          </div>
          
          <p className="text-sm text-gray-500">
            En créant un compte, vous rejoignez une plateforme sécurisée conforme aux 
            réglementations sénégalaises sur la protection des données personnelles.
          </p>
          
          <div className="flex items-center justify-center space-x-4 text-xs text-gray-400">
            <span>🇸🇳 Service Public du Sénégal</span>
            <span>•</span>
            <span>🔒 Données sécurisées</span>
            <span>•</span>
            <span>✅ Conforme RGPD</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inscription;