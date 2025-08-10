import React, { useState, useEffect } from "react";
import { Search, ChevronRight, FileText, Calendar, Users, Globe } from "lucide-react";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchType, setSearchType] = useState("tous");
  const [searchField, setSearchField] = useState("tous");
  const itemsPerPage = 4;

  // Données de démonstration
  const journals = [
    {
      id: 1,
      title: "Journal officiel n° 2025-001",
      date: "2025-01-15",
      summary: "Lois, décrets et arrêtés de janvier 2025",
      content: "Contenu du journal officiel..."
    },
    {
      id: 2,
      title: "Journal officiel n° 2025-002", 
      date: "2025-01-22",
      summary: "Publications officielles du gouvernement",
      content: "Nouveau contenu juridique..."
    }
  ];

  const legalNews = [
    {
      id: 1,
      title: "Réforme du Code civil sénégalais",
      summary: "Une nouvelle réforme majeure du droit civil est en cours d'examen au Parlement",
      date: "2025-08-10",
      imageUrl: null,
      videoUrl: null
    },
    {
      id: 2,
      title: "Nouvelle loi sur la protection des données",
      summary: "Adoption d'une loi conforme aux standards internationaux de protection des données personnelles",
      date: "2025-08-08",
      imageUrl: null,
      videoUrl: null
    }
  ];

  // Filtrer les journaux selon terme et date
  const filteredJournals = journals.filter((j) => {
    const matchText = (j.title + j.summary).toLowerCase().includes(searchTerm.toLowerCase());
    const matchDate = dateFilter ? j.date === dateFilter : true;
    return matchText && matchDate;
  });

  const totalPages = Math.ceil(filteredJournals.length / itemsPerPage);
  const currentItems = filteredJournals.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, dateFilter]);

  const handleSearch = (e) => {
    e.preventDefault();
    // Logic de recherche
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Header avec breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-200 py-2">
        <div className="max-w-6xl mx-auto px-4">
          <nav className="text-sm text-gray-600">
            <a href="/" className="hover:text-blue-600">Accueil</a>
          </nav>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* En-tête principal */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 bg-green-600 rounded flex items-center justify-center mr-3">
              <span className="text-white text-sm font-bold">SN</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">SunuLoi</h1>
          </div>
          <p className="text-gray-600">Le service public de la diffusion du droit sénégalais</p>
        </div>

        {/* Section de recherche principale */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm mb-8">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Rechercher dans le droit sénégalais
            </h2>
            
            <form onSubmit={handleSearch} className="space-y-4">
              {/* Première ligne - Critères de recherche */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Rechercher dans
                  </label>
                  <select
                    value={searchType}
                    onChange={(e) => setSearchType(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  >
                    <option value="tous">Tous les contenus</option>
                    <option value="codes">Les codes</option>
                    <option value="lois">Les lois</option>
                    <option value="decrets">Les décrets</option>
                    <option value="arretes">Les arrêtés</option>
                    <option value="circulaires">Les circulaires</option>
                    <option value="jurisprudence">La jurisprudence</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Champ de recherche
                  </label>
                  <select
                    value={searchField}
                    onChange={(e) => setSearchField(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  >
                    <option value="tous">Dans tous les champs</option>
                    <option value="titre">Dans le titre</option>
                    <option value="contenu">Dans le contenu</option>
                    <option value="numero">Par numéro</option>
                  </select>
                </div>
              </div>

              {/* Deuxième ligne - Champ de recherche */}
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Saisissez vos mots-clés ou références (ex: L. 121-1, code civil, etc.)"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 flex items-center gap-2"
                >
                  <Search size={20} />
                  Rechercher
                </button>
              </div>

              {/* Lien recherche avancée */}
              <div className="text-right">
                <a href="/recherche-avancee" className="text-green-600 hover:text-green-800 text-sm">
                  Recherche avancée
                </a>
              </div>
            </form>
          </div>
        </div>

        {/* Grille des accès rapides */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <a
            href="/codes"
            className="group block bg-white border border-gray-200 rounded-lg p-6 hover:border-green-300 hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <FileText className="w-8 h-8 text-green-600" />
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Les codes</h3>
            <p className="text-sm text-gray-600">
              Code civil, code pénal, code de commerce...
            </p>
          </a>

          <a
            href="/constitution"
            className="group block bg-white border border-gray-200 rounded-lg p-6 hover:border-green-300 hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <FileText className="w-8 h-8 text-red-600" />
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">La Constitution</h3>
            <p className="text-sm text-gray-600">
              Texte fondamental de la République du Sénégal
            </p>
          </a>

          <a
            href="/jurisprudence"
            className="group block bg-white border border-gray-200 rounded-lg p-6 hover:border-green-300 hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <Users className="w-8 h-8 text-green-600" />
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">La jurisprudence</h3>
            <p className="text-sm text-gray-600">
              Décisions des cours et tribunaux
            </p>
          </a>

          <a
            href="/traites"
            className="group block bg-white border border-gray-200 rounded-lg p-6 hover:border-blue-300 hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <Globe className="w-8 h-8 text-green-600" />
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Traités et accords</h3>
            <p className="text-sm text-gray-600">
              Conventions internationales
            </p>
          </a>
        </div>

        {/* Contenu principal en deux colonnes */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Colonne principale */}
          <div className="lg:col-span-2 space-y-8">
            {/* Journal officiel */}
            <section className="bg-white border border-gray-200 rounded-lg">
              <div className="border-b border-gray-200 px-6 py-4">
                <h2 className="text-xl font-semibold text-gray-900">Journal officiel</h2>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-4">
                  Consulter les dernières publications du Journal officiel de la République du Sénégal
                </p>
                
                {/* Filtres journaux */}
                <div className="flex flex-col sm:flex-row gap-3 mb-6">
                  <input
                    type="text"
                    placeholder="Rechercher dans les journaux..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                  <input
                    type="date"
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                  <button
                    onClick={() => {
                      setSearchTerm("");
                      setDateFilter("");
                    }}
                    className="px-4 py-2 text-gray-600 border border-gray-300 rounded hover:bg-gray-50"
                  >
                    Réinitialiser
                  </button>
                </div>

                {/* Liste des journaux */}
                <div className="space-y-3">
                  {currentItems.length ? (
                    currentItems.map((journal) => (
                      <div key={journal.id} className="border-l-4 border-green-500 pl-4 py-2">
                        <a
                          href={`/journal/${journal.id}`}
                          className="block hover:text-green-600"
                        >
                          <h3 className="font-medium text-gray-900">{journal.title}</h3>
                          <p className="text-sm text-gray-500">du {journal.date}</p>
                          <p className="text-sm text-gray-600 mt-1">{journal.summary}</p>
                        </a>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-gray-500 py-8">Aucun journal trouvé.</p>
                  )}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-4 mt-6">
                    <button
                      onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                      disabled={currentPage === 1}
                      className="px-3 py-1 border border-gray-300 rounded disabled:opacity-50 hover:bg-gray-50"
                    >
                      Précédent
                    </button>
                    <span className="text-gray-600">
                      Page {currentPage} sur {totalPages}
                    </span>
                    <button
                      onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="px-3 py-1 border border-gray-300 rounded disabled:opacity-50 hover:bg-gray-50"
                    >
                      Suivant
                    </button>
                  </div>
                )}

                <div className="mt-6 text-center">
                  <a
                    href="/journal-officiel"
                    className="inline-flex items-center text-green-600 hover:text-green-800"
                  >
                    Accéder à tous les journaux officiels
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </a>
                </div>
              </div>
            </section>

            {/* Actualités juridiques */}
            <section className="bg-white border border-gray-200 rounded-lg">
              <div className="border-b border-gray-200 px-6 py-4">
                <h2 className="text-xl font-semibold text-gray-900">Actualités juridiques</h2>
              </div>
              <div className="p-6">
                <div className="space-y-6">
                  {legalNews.map((news) => (
                    <article key={news.id} className="border-b border-gray-100 last:border-0 pb-6 last:pb-0">
                      <div className="flex items-start gap-4">
                        <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900 mb-2">
                            <a href={`/actualites/${news.id}`} className="hover:text-green-600">
                              {news.title}
                            </a>
                          </h3>
                          <p className="text-gray-600 text-sm mb-2">{news.summary}</p>
                          <p className="text-xs text-gray-500">{news.date}</p>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
                <div className="mt-6 text-center">
                  <a
                    href="/actualites"
                    className="inline-flex items-center text-green-600 hover:text-green-800"
                  >
                    Toutes les actualités
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </a>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Accès rapides */}
            <section className="bg-white border border-gray-200 rounded-lg">
              <div className="border-b border-gray-200 px-4 py-3">
                <h3 className="font-semibold text-gray-900">Accès rapides</h3>
              </div>
              <div className="p-4">
                <ul className="space-y-3 text-sm">
                  <li>
                    <a href="/code-civil" className="text-green-600 hover:text-green-800 flex items-center justify-between">
                      Code civil
                      <ChevronRight className="w-4 h-4" />
                    </a>
                  </li>
                  <li>
                    <a href="/code-penal" className="text-green-600 hover:text-green-800 flex items-center justify-between">
                      Code pénal
                      <ChevronRight className="w-4 h-4" />
                    </a>
                  </li>
                  <li>
                    <a href="/code-travail" className="text-green-600 hover:text-green-800 flex items-center justify-between">
                      Code du travail
                      <ChevronRight className="w-4 h-4" />
                    </a>
                  </li>
                  <li>
                    <a href="/code-famille" className="text-green-600 hover:text-green-800 flex items-center justify-between">
                      Code de la famille
                      <ChevronRight className="w-4 h-4" />
                    </a>
                  </li>
                  <li>
                    <a href="/constitution" className="text-green-600 hover:text-green-800 flex items-center justify-between">
                      Constitution
                      <ChevronRight className="w-4 h-4" />
                    </a>
                  </li>
                </ul>
              </div>
            </section>

            {/* Services */}
            <section className="bg-white border border-gray-200 rounded-lg">
              <div className="border-b border-gray-200 px-4 py-3">
                <h3 className="font-semibold text-gray-900">Services</h3>
              </div>
              <div className="p-4">
                <ul className="space-y-3 text-sm">
                  <li>
                    <a href="/veille-juridique" className="text-green-600 hover:text-green-800 flex items-center justify-between">
                      Veille juridique
                      <ChevronRight className="w-4 h-4" />
                    </a>
                  </li>
                  <li>
                    <a href="/alertes" className="text-green-600 hover:text-green-800 flex items-center justify-between">
                      Alertes par email
                      <ChevronRight className="w-4 h-4" />
                    </a>
                  </li>
                  <li>
                    <a href="/api" className="text-green-600 hover:text-green-800 flex items-center justify-between">
                      API données juridiques
                      <ChevronRight className="w-4 h-4" />
                    </a>
                  </li>
                  <li>
                    <a href="/export" className="text-green-600 hover:text-green-800 flex items-center justify-between">
                      Export de données
                      <ChevronRight className="w-4 h-4" />
                    </a>
                  </li>
                </ul>
              </div>
            </section>

            {/* Calendrier */}
            <section className="bg-white border border-gray-200 rounded-lg">
              <div className="border-b border-gray-200 px-4 py-3">
                <h3 className="font-semibold text-gray-900">Recherche par date</h3>
              </div>
              <div className="p-4">
                <p className="text-sm text-gray-600 mb-3">
                  Rechercher les publications par date
                </p>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Du</label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Au</label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                  <button className="w-full px-3 py-2 text-sm bg-green-600 text-white rounded hover:bg-green-700">
                    Rechercher
                  </button>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 mt-16">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">SunuLoi</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="/a-propos" className="hover:text-green-600">À propos</a></li>
                <li><a href="/mission" className="hover:text-green-600">Notre mission</a></li>
                <li><a href="/contact" className="hover:text-green-600">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Services</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="/recherche" className="hover:text-green-600">Recherche avancée</a></li>
                <li><a href="/api" className="hover:text-green-600">API juridique</a></li>
                <li><a href="/export" className="hover:text-green-600">Export de données</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Aide</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="/guide" className="hover:text-green-600">Guide d'utilisation</a></li>
                <li><a href="/faq" className="hover:text-green-600">Questions fréquentes</a></li>
                <li><a href="/formation" className="hover:text-green-600">Formations</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Informations légales</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="/mentions-legales" className="hover:text-green-600">Mentions légales</a></li>
                <li><a href="/confidentialite" className="hover:text-green-600">Confidentialité</a></li>
                <li><a href="/accessibilite" className="hover:text-green-600">Accessibilité</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-200 pt-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center gap-3 mb-4 md:mb-0">
                <div className="w-6 h-6 bg-green-600 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">SN</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">SunuLoi</p>
                  <p className="text-xs text-gray-500">Service public de la diffusion du droit</p>
                </div>
              </div>
              
              <div className="text-center md:text-right">
                <p className="text-sm text-gray-500">
                  © {new Date().getFullYear()} République du Sénégal – Tous droits réservés.
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Développé pour faciliter l'accès au droit sénégalais
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}