import React from "react";

const categoriesData = [
  {
    title: "Droit national en vigueur",
    items: [
      "Codes",
      "Jurisprudence",
      "Constitutions",
      "Textes consolidés",  
      "Circulaires et institutions",
      "Accords collectifs",
    ],
  },
  {
    title: "Publications officielles",
    items: [
      "Bulletin officiel",
      "Journal officiel",
      "Bulletins des conventions collectives",
      "Débats parlementaires",
      "Questions parlementaires écrites",
      "Documents administratifs",
    ],
  },
  {
    title: "Autour de la loi",
    items: [
      "Codification",
      "Législatif et réglementaire",
      "Autorités indépendantes",
      "Entreprise",
      "Guide de légistique SVA",
    ],
  },
  {
    title: "Droit et jurisprudence du Sénégal",
    items: [
      "Journal officiel",
      "Jurisprudence",
      "Directives",
      "Mesures de transposition",
    ],
  },
  {
    title: "Droit international",
    items: [
      "Jurisprudence CEDH",
      "Accords et traités internationaux",
      "Juridictions internationales",
    ],
  },
];

const Categories = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-green-700">Catégories juridiques</h1>

      {categoriesData.map((cat, index) => (
        <div key={index} className="mb-8">
          <h2 className="text-xl font-semibold mb-2 text-green-800">{cat.title}</h2>
          <div className="flex flex-wrap gap-3">
            {cat.items.map((item, i) => (
              <button
                key={i}
                className="bg-green-100 hover:bg-green-200 text-green-900 px-4 py-2 rounded-lg border border-green-400 shadow-sm transition"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Categories;
