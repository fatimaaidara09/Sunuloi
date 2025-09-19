// src/components/QuickAccessSection.jsx
import React from "react";
import { Link } from "react-router-dom";
import { BookOpen, Scale, Gavel, FileText, Users, TrendingUp, Shield, Globe, ChevronRight, ArrowUpRight } from "lucide-react";

const QuickAccessSection = () => {
  const mainCategories = [
    { 
      href: "/codes", 
      icon: BookOpen, 
      title: "Codes", 
      desc: "2,847 textes législatifs",
      color: "from-blue-500 to-blue-600",
      hoverColor: "hover:from-blue-600 hover:to-blue-700",
      bgPattern: "bg-blue-50",
      count: "2,847",
      updated: "Mis à jour il y a 3h"
    },
    { 
      href: "/jurisprudence", 
      icon: Scale, 
      title: "Jurisprudence", 
      desc: "1,523 décisions de justice",
      color: "from-green-500 to-green-600",
      hoverColor: "hover:from-green-600 hover:to-green-700", 
      bgPattern: "bg-green-50",
      count: "1,523",
      updated: "Nouvelle décision il y a 1h"
    },
    { 
      href: "/lois", 
      icon: Gavel, 
      title: "Lois", 
      desc: "856 lois en vigueur",
      color: "from-purple-500 to-purple-600",
      hoverColor: "hover:from-purple-600 hover:to-purple-700",
      bgPattern: "bg-purple-50",
      count: "856",
      updated: "3 nouvelles lois cette semaine"
    },
    { 
      href: "/constitution", 
      icon: FileText, 
      title: "Constitution", 
      desc: "Texte fondamental du Sénégal",
      color: "from-red-500 to-red-600",
      hoverColor: "hover:from-red-600 hover:to-red-700",
      bgPattern: "bg-red-50",
      count: "1",
      updated: "Version consolidée 2024"
    }
  ];

  const secondaryCategories = [
    {
      href: "/decrets",
      icon: Shield,
      title: "Décrets",
      desc: "Textes réglementaires",
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
      count: "432"
    },
    {
      href: "/circulaires", 
      icon: Globe,
      title: "Circulaires",
      desc: "Instructions ministérielles",
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
      count: "287"
    },
    {
      href: "/traites",
      icon: Users,
      title: "Traités",
      desc: "Accords internationaux", 
      color: "text-teal-600",
      bgColor: "bg-teal-50",
      count: "156"
    },
    {
      href: "/statistiques",
      icon: TrendingUp,
      title: "Statistiques",
      desc: "Données et analyses",
      color: "text-orange-600", 
      bgColor: "bg-orange-50",
      count: "Live"
    }
  ];

  const formatNumber = (num) => {
    if (typeof num === 'string' && num !== 'Live') {
      return new Intl.NumberFormat('fr-FR').format(parseInt(num));
    }
    return num;
  };

  return (
    <section className="bg-gradient-to-br from-gray-50 to-green-50 py-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Accès Rapide aux Textes Juridiques
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explorez rapidement les différentes catégories de textes législatifs et réglementaires du Sénégal
          </p>
        </div>

        {/* Catégories principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {mainCategories.map((item, idx) => (
            <Link 
              key={idx}
              to={item.href} 
              className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 overflow-hidden"
            >
              {/* Background pattern */}
              <div className={`absolute inset-0 ${item.bgPattern} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
              
              <div className="relative p-8">
                {/* Icon avec gradient */}
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${item.color} ${item.hoverColor} mb-6 group-hover:scale-110 transition-all duration-300 shadow-lg`}>
                  <item.icon className="h-8 w-8 text-white" />
                </div>

                {/* Contenu */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-gray-800 group-hover:text-green-700 transition-colors">
                      {item.title}
                    </h3>
                    <ArrowUpRight className="h-5 w-5 text-gray-400 group-hover:text-green-600 group-hover:scale-110 transition-all duration-200" />
                  </div>
                  
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {item.desc}
                  </p>

                  {/* Statistiques */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${item.color} mr-2 animate-pulse`}></div>
                      <span className="text-2xl font-bold text-gray-800">
                        {formatNumber(item.count)}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 text-right">
                      {item.updated}
                    </div>
                  </div>
                </div>

                {/* Call-to-action */}
                <div className="mt-6 flex items-center text-green-600 font-semibold group-hover:text-green-700 transition-colors">
                  <span>Accéder</span>
                  <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Catégories secondaires */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              Autres Ressources Juridiques
            </h3>
            <p className="text-gray-600">
              Accédez à d'autres types de documents et ressources
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {secondaryCategories.map((item, idx) => (
              <Link
                key={idx}
                to={item.href}
                className={`group p-6 rounded-xl transition-all duration-200 hover:shadow-lg transform hover:-translate-y-1 ${item.bgColor} border-2 border-transparent hover:border-green-200`}
              >
                <div className="text-center">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-white shadow-md mb-4 group-hover:scale-110 transition-transform`}>
                    <item.icon className={`h-6 w-6 ${item.color}`} />
                  </div>
                  
                  <h4 className="font-semibold text-gray-800 mb-2 group-hover:text-green-700 transition-colors">
                    {item.title}
                  </h4>
                  
                  <p className="text-sm text-gray-600 mb-3">
                    {item.desc}
                  </p>
                  
                  <div className="flex items-center justify-center">
                    <span className={`text-lg font-bold ${item.color}`}>
                      {formatNumber(item.count)}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Section recherche personnalisée */}
        <div className="mt-12 bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">
            Vous ne trouvez pas ce que vous cherchez ?
          </h3>
          <p className="text-green-100 mb-6 text-lg">
            Utilisez notre recherche avancée pour des résultats plus précis
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/recherche-avancee"
              className="inline-flex items-center px-6 py-3 bg-white text-green-700 font-semibold rounded-lg hover:bg-green-50 transition-all duration-200 transform hover:scale-105 hover:shadow-lg group"
            >
              🔍 Recherche avancée
              <ChevronRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link
              to="/aide"
              className="inline-flex items-center px-6 py-3 border-2 border-white border-opacity-30 hover:border-opacity-50 text-white rounded-lg font-medium transition-all duration-200 backdrop-blur-sm hover:bg-white hover:bg-opacity-10"
            >
              📘 Centre d'aide
            </Link>
          </div>
        </div>

        {/* Statistiques globales */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: "Documents totaux", value: "5,264", icon: "📄", color: "text-blue-600" },
            { label: "Recherches/mois", value: "95,000", icon: "🔍", color: "text-green-600" },
            { label: "Utilisateurs actifs", value: "12,500", icon: "👥", color: "text-purple-600" },
            { label: "Mises à jour/semaine", value: "25", icon: "🔄", color: "text-yellow-600" }
          ].map((stat, idx) => (
            <div key={idx} className="bg-white rounded-xl p-6 text-center shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className={`text-2xl font-bold ${stat.color} mb-1`}>
                {stat.value}
              </div>
              <div className="text-sm text-gray-600 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Footer call-to-action */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            Restez informé des dernières mises à jour juridiques
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/newsletter"
              className="inline-flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-lg group"
            >
              📧 S'abonner à la newsletter
              <ChevronRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/rss"
              className="inline-flex items-center px-6 py-3 border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white font-semibold rounded-lg transition-all duration-200"
            >
              📡 Flux RSS
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuickAccessSection;