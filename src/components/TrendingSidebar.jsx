// src/components/TrendingSidebar.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { TrendingUp, Calendar, Clock, AlertTriangle, BookOpen, Users, ChevronRight, Bell } from "lucide-react";

const TrendingSidebar = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [notifications, setNotifications] = useState(true);

  const trendingTopics = [
    { 
      topic: "Transformation numérique", 
      searches: 450, 
      trend: "+15%", 
      category: "Technologie",
      color: "text-green-600" 
    },
    { 
      topic: "Droit du travail", 
      searches: 320, 
      trend: "+8%", 
      category: "Social",
      color: "text-blue-600" 
    },
    { 
      topic: "Protection environnement", 
      searches: 280, 
      trend: "+22%", 
      category: "Environnement",
      color: "text-emerald-600" 
    },
    { 
      topic: "Code civil", 
      searches: 260, 
      trend: "+5%", 
      category: "Civil",
      color: "text-purple-600" 
    },
    { 
      topic: "Fiscalité", 
      searches: 240, 
      trend: "+12%", 
      category: "Économie",
      color: "text-yellow-600" 
    }
  ];

  const upcomingEvents = [
    {
      date: "15 Sept",
      title: "Session parlementaire",
      time: "09:00",
      type: "parliamentary",
      urgent: false
    },
    {
      date: "20 Sept", 
      title: "Publication JO",
      time: "14:00",
      type: "publication",
      urgent: false
    },
    {
      date: "22 Sept",
      title: "Débat Code du travail",
      time: "10:30",
      type: "debate",
      urgent: true
    },
    {
      date: "25 Sept",
      title: "Promulgation loi",
      time: "16:00", 
      type: "law",
      urgent: false
    }
  ];

  const quickStats = [
    { label: "Recherches aujourd'hui", value: "3,247", icon: "🔍" },
    { label: "Nouveaux utilisateurs", value: "+127", icon: "👥" },
    { label: "Documents ajoutés", value: "12", icon: "📄" },
    { label: "Mise à jour système", value: "2h", icon: "⚡" }
  ];

  const getEventIcon = (type) => {
    const icons = {
      parliamentary: "🏛️",
      publication: "📋", 
      debate: "💬",
      law: "⚖️"
    };
    return icons[type] || "📅";
  };

  const getEventColor = (type, urgent) => {
    if (urgent) return "bg-red-50 border-red-200 text-red-800";
    
    const colors = {
      parliamentary: "bg-blue-50 border-blue-200 text-blue-800",
      publication: "bg-green-50 border-green-200 text-green-800", 
      debate: "bg-yellow-50 border-yellow-200 text-yellow-800",
      law: "bg-purple-50 border-purple-200 text-purple-800"
    };
    return colors[type] || "bg-gray-50 border-gray-200 text-gray-800";
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat('fr-FR').format(num);
  };

  return (
    <div className="space-y-6">
      {/* Section Tendances */}
      <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
        <div className="flex items-center mb-6">
          <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-lg mr-3">
            <TrendingUp className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Tendances</h3>
            <p className="text-sm text-gray-600">Recherches populaires</p>
          </div>
        </div>

        <div className="space-y-3">
          {trendingTopics.map((item, idx) => (
            <Link
              key={idx}
              to={`/recherche?q=${encodeURIComponent(item.topic)}`}
              className="block p-4 bg-gray-50 rounded-lg hover:bg-gradient-to-r hover:from-green-50 hover:to-yellow-50 transition-all duration-200 group border border-transparent hover:border-green-200"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <div className={`w-2 h-2 rounded-full ${item.color.replace('text-', 'bg-')}`}></div>
                    <span className="font-medium text-gray-800 group-hover:text-green-700 transition-colors">
                      {item.topic}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {formatNumber(item.searches)} recherches
                    </span>
                    <span className={`text-sm font-semibold ${item.color}`}>
                      {item.trend}
                    </span>
                  </div>
                  <span className="text-xs text-gray-400 bg-gray-200 px-2 py-1 rounded-full mt-2 inline-block">
                    {item.category}
                  </span>
                </div>
                <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-green-600 group-hover:translate-x-1 transition-all ml-2" />
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200 text-center">
          <Link 
            to="/tendances" 
            className="text-green-600 hover:text-green-700 text-sm font-medium inline-flex items-center group"
          >
            Voir toutes les tendances
            <ChevronRight className="h-3 w-3 ml-1 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Section Calendrier */}
      <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
        <div className="flex items-center mb-6">
          <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-green-600 to-green-700 rounded-lg mr-3">
            <Calendar className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Calendrier Juridique</h3>
            <p className="text-sm text-gray-600">Événements à venir</p>
          </div>
        </div>

        <div className="mb-4">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
          />
        </div>

        <div className="space-y-3">
          {upcomingEvents.map((event, idx) => (
            <div 
              key={idx} 
              className={`p-3 rounded-lg border transition-all hover:shadow-md cursor-pointer ${getEventColor(event.type, event.urgent)}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <span className="text-lg">{getEventIcon(event.type)}</span>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-sm">{event.date}</span>
                      {event.urgent && (
                        <AlertTriangle className="h-3 w-3 text-red-500" />
                      )}
                    </div>
                    <p className="font-medium text-sm">{event.title}</p>
                    <div className="flex items-center mt-1">
                      <Clock className="h-3 w-3 mr-1 opacity-60" />
                      <span className="text-xs opacity-80">{event.time}</span>
                    </div>
                  </div>
                </div>
                <button className="opacity-60 hover:opacity-100 transition-opacity">
                  <Bell className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-gray-700">Notifications</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={notifications}
                onChange={(e) => setNotifications(e.target.checked)}
                className="sr-only peer" 
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
            </label>
          </div>
          <Link 
            to="/calendrier" 
            className="text-green-600 hover:text-green-700 text-sm font-medium inline-flex items-center group"
          >
            Voir le calendrier complet
            <ChevronRight className="h-3 w-3 ml-1 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Section Statistiques rapides */}
      <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
        <div className="flex items-center mb-6">
          <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg mr-3">
            <Users className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Activité</h3>
            <p className="text-sm text-gray-600">Statistiques en temps réel</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {quickStats.map((stat, idx) => (
            <div key={idx} className="text-center p-3 bg-gray-50 rounded-lg hover:bg-green-50 transition-colors">
              <div className="text-xl mb-1">{stat.icon}</div>
              <div className="font-bold text-lg text-gray-800">{stat.value}</div>
              <div className="text-xs text-gray-600 leading-tight">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200 text-center">
          <Link 
            to="/statistiques" 
            className="text-green-600 hover:text-green-700 text-sm font-medium inline-flex items-center group"
          >
            <BookOpen className="h-4 w-4 mr-1" />
            Tableau de bord complet
            <ChevronRight className="h-3 w-3 ml-1 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TrendingSidebar;