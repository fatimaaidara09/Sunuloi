import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { textes } from "../data/textes";

export default function DetailTexte() {
  const { id } = useParams();
  const [texte, setTexte] = useState(null);

  useEffect(() => {
    const found = textes.find((t) => String(t.id) === id);
    setTexte(found || null);
  }, [id]);

  if (!texte) {
    return <p className="p-6 text-center text-red-600">Texte non trouvé.</p>;
  }

  return (
    <div className="pt-[var(--navbar-total-offset)] px-6 max-w-screen-md mx-auto space-y-10">
      <h1 className="text-4xl font-extrabold text-green-700 mb-2">{texte.title}</h1>
      <p className="text-sm text-gray-500 mb-6">
        Publié le {new Date(texte.date).toLocaleDateString()} — Type :{" "}
        <span className="capitalize font-semibold">{texte.type}</span> — Ministère :{" "}
        <span className="font-medium">{texte.ministry}</span>
      </p>

      <article
        className="prose prose-green max-w-none leading-relaxed text-justify"
        style={{ fontFamily: "'Merriweather', serif" }}
      >
        <p>{texte.content}</p>
      </article>

      <Link
        to="/"
        className="inline-block mt-6 text-green-700 hover:underline"
      >
        &larr; Retour à l'accueil
      </Link>
    </div>
  );
}

