// src/pages/Favorites.jsx
import { useContext } from "react";
import { FavoriteContext } from "../context/FavoriteContext";
import { textes } from "../data/textes";

export default function Favorites() {
  const { favorites } = useContext(FavoriteContext);
  const favTextes = textes.filter((t) => favorites.includes(t.id));

  if (favTextes.length === 0) return <p>Aucun favori pour l’instant.</p>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Mes Favoris</h2>
      <ul>
        {favTextes.map((texte) => (
          <li key={texte.id} className="mb-4 p-4 border rounded bg-white">
            <h3 className="text-lg font-semibold">{texte.title}</h3>
            <p className="text-sm text-gray-600">{texte.date} — {texte.ministry}</p>
            <p>{texte.content.slice(0, 150)}...</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
