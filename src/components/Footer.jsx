// src/components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Scale, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Youtube, ExternalLink, ChevronUp } from "lucide-react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigationLinks = [
    { name: "Accueil", path: "/" },
    { name: "Codes", path: "/codes" },
    { name: "Jurisprudence", path: "/jurisprudence" },
    { name: "Journal Officiel", path: "/journal-officiel" },
    { name: "Constitution", path: "/constitution" },
    { name: "Recherche avancée", path: "/recherche-avancee" }
  ];

  const resourcesLinks = [
    { name: "Centre d'aide", path: "/aide" },
    { name: "Guide d'utilisation", path: "/guide" },
    { name: "FAQ", path: "/faq" },
    { name: "Tutoriels vidéo", path: "/tutoriels" },
    { name: "API Documentation", path: "/api-docs" },
    { name: "Webinaires", path: "/webinaires" }
  ];

  const legalLinks = [
    { name: "Mentions légales", path: "/mentions-legales" },
    { name: "Politique de confidentialité", path: "/confidentialite" },
    { name: "Conditions d'utilisation", path: "/conditions" },
    { name: "Accessibilité", path: "/accessibilite" },
    { name: "Plan du site", path: "/sitemap" },
    { name: "Cookies", path: "/cookies" }
  ];

  const institutionalLinks = [
    { name: "Assemblée nationale", url: "http://www.assemblee-nationale.sn", external: true },
    { name: "Conseil constitutionnel", url: "#", external: true },
    { name: "Cour suprême", url: "#", external: true },
    { name: "Ministère de la Justice", url: "#", external: true },
    { name: "Journal officiel", url: "#", external: true }
  ];

  const socialLinks = [
    { name: "Facebook", icon: Facebook, url: "#", color: "hover:bg-blue-600" },
    { name: "Twitter", icon: Twitter, url: "#", color: "hover:bg-blue-400" },
    { name: "LinkedIn", icon: Linkedin, url: "#", color: "hover:bg-blue-700" },
    { name: "YouTube", icon: Youtube, url: "#", color: "hover:bg-red-600" }
  ];

  const contactInfo = [
    { icon: MapPin, text: "Avenue Léopold Sédar Senghor, Dakar, Sénégal" },
    { icon: Phone, text: "+221 33 XXX XX XX" },
    { icon: Mail, text: "contact@sunuloi.sn" }
  ];

  const stats = [
    { label: "Documents", value: "5,264" },
    { label: "Utilisateurs", value: "15,420" },
    { label: "Recherches/jour", value: "3,250" },
    { label: "Mise à jour", value: "Temps réel" }
  ];

  return (
    <footer className="bg-gray-900 text-gray-300 relative">
      {/* Bouton retour en haut */}
      <button
        onClick={scrollToTop}
        className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-green-600 hover:bg-green-700 text-white p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
        aria-label="Retour en haut"
      >
        <ChevronUp className="h-5 w-5" />
      </button>

      {/* Section principale */}
      <div className="max-w-7xl mx-auto px-4 pt-16 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Colonne principale - Logo et description */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-6">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-green-600 to-green-700 rounded-xl mr-4">
                <Scale className="h-6 w-6 text-white" />
              </div>
              <div>
                <h4 className="text-2xl font-bold text-white">SunuLoi</h4>
                <p className="text-sm text-green-400">Service Public Numérique</p>
              </div>
            </div>
            
            <p className="text-gray-400 mb-6 leading-relaxed">
              La plateforme officielle pour accéder à l'ensemble des textes juridiques 
              du Sénégal. Moderne, rapide et toujours à jour.
            </p>

            {/* Statistiques */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {stats.map((stat, idx) => (
                <div key={idx} className="text-center p-3 bg-gray-800 rounded-lg">
                  <div className="text-lg font-bold text-green-400">{stat.value}</div>
                  <div className="text-xs text-gray-500">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Réseaux sociaux */}
            <div className="flex space-x-3">
              {socialLinks.map((social, idx) => (
                <a
                  key={idx}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 bg-gray-800 ${social.color} rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110 hover:shadow-lg`}
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5 text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-bold mb-6 text-white flex items-center">
              <span className="w-1 h-6 bg-green-500 mr-3"></span>
              Navigation
            </h4>
            <ul className="space-y-3">
              {navigationLinks.map((link, idx) => (
                <li key={idx}>
                  <Link
                    to={link.path}
                    className="hover:text-green-400 transition-colors duration-200 flex items-center group"
                  >
                    <ChevronUp className="h-3 w-3 mr-2 rotate-90 group-hover:translate-x-1 transition-transform" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Ressources */}
          <div>
            <h4 className="font-bold mb-6 text-white flex items-center">
              <span className="w-1 h-6 bg-yellow-500 mr-3"></span>
              Ressources
            </h4>
            <ul className="space-y-3">
              {resourcesLinks.map((link, idx) => (
                <li key={idx}>
                  <Link
                    to={link.path}
                    className="hover:text-green-400 transition-colors duration-200 flex items-center group"
                  >
                    <ChevronUp className="h-3 w-3 mr-2 rotate-90 group-hover:translate-x-1 transition-transform" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact et liens institutionnels */}
          <div>
            <h4 className="font-bold mb-6 text-white flex items-center">
              <span className="w-1 h-6 bg-blue-500 mr-3"></span>
              Contact & Institutions
            </h4>
            
            {/* Informations de contact */}
            <div className="space-y-3 mb-6">
              {contactInfo.map((contact, idx) => (
                <div key={idx} className="flex items-start">
                  <contact.icon className="h-4 w-4 mt-1 mr-3 text-green-400 flex-shrink-0" />
                  <span className="text-sm text-gray-400">{contact.text}</span>
                </div>
              ))}
            </div>

            {/* Liens institutionnels */}
            <div>
              <h5 className="font-medium text-white mb-3 text-sm">Partenaires institutionnels</h5>
              <ul className="space-y-2">
                {institutionalLinks.map((link, idx) => (
                  <li key={idx}>
                    {link.external ? (
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm hover:text-green-400 transition-colors duration-200 flex items-center group"
                      >
                        {link.name}
                        <ExternalLink className="h-3 w-3 ml-1 opacity-60 group-hover:opacity-100" />
                      </a>
                    ) : (
                      <Link
                        to={link.url}
                        className="text-sm hover:text-green-400 transition-colors duration-200"
                      >
                        {link.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Section newsletter */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-6">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-4 md:mb-0">
                <h4 className="text-xl font-bold text-white mb-2">
                  🔔 Restez informé des mises à jour
                </h4>
                <p className="text-green-100">
                  Recevez les dernières publications juridiques directement dans votre boîte mail
                </p>
              </div>
              <div className="flex w-full md:w-auto">
                <input
                  type="email"
                  placeholder="votre@email.com"
                  className="flex-1 md:w-64 px-4 py-2 rounded-l-lg border-0 focus:ring-2 focus:ring-green-300 text-gray-800"
                />
                <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-r-lg font-medium transition-colors">
                  S'abonner
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Section légale */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <div className="flex flex-wrap gap-6 mb-4 md:mb-0">
              {legalLinks.map((link, idx) => (
                <Link
                  key={idx}
                  to={link.path}
                  className="text-sm hover:text-green-400 transition-colors duration-200"
                >
                  {link.name}
                </Link>
              ))}
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
              Système opérationnel
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center pt-6 border-t border-gray-800">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} SunuLoi - Service Public du Droit Sénégalais. 
              Tous droits réservés. République du Sénégal.
            </p>
            <p className="text-gray-600 text-xs mt-2">
              Développé avec ❤️ pour la transparence juridique • Version 2.1.0
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;