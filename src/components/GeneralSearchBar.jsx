// src/components/GeneralSearchBar.jsx
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { FaSearch } from "react-icons/fa";
import { FilterContext } from "../context/FilterContext";

const GeneralSearchBar = () => {
  const navigate = useNavigate();
  const {
    searchTerm,
    setSearchTerm,
    dateFrom,
    setDateFrom,
    dateTo,
    setDateTo,
    docType,
    setDocType,
    ministry,
    setMinistry,
  } = useContext(FilterContext);

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchTerm.trim()) params.append("q", searchTerm.trim());
    if (dateFrom) params.append("dateFrom", dateFrom);
    if (dateTo) params.append("dateTo", dateTo);
    if (docType) params.append("docType", docType);
    if (ministry) params.append("ministry", ministry);

    navigate(`/search?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSearch} className="bg-white p-4 rounded shadow-md space-y-3">
      <div className="flex items-center space-x-3">
        <input
          type="text"
          placeholder="Rechercher un texte, une loi, un décret..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow border rounded px-2 py-1"
        />
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          aria-label="Rechercher"
        >
          <FaSearch />
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
        <div>
          <label>Date début :</label>
          <input
            type="date"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            className="border rounded px-2 py-1 w-full"
          />
        </div>
        <div>
          <label>Date fin :</label>
          <input
            type="date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            className="border rounded px-2 py-1 w-full"
          />
        </div>
        <div>
          <label>Type :</label>
          <select
            value={docType}
            onChange={(e) => setDocType(e.target.value)}
            className="border rounded px-2 py-1 w-full"
          >
            <option value="">Tous</option>
            <option value="loi">Loi</option>
            <option value="decret">Décret</option>
            <option value="arret">Arrêté</option>
            <option value="circulaire">Circulaire</option>
          </select>
        </div>
        <div>
          <label>Ministère :</label>
          <select
            value={ministry}
            onChange={(e) => setMinistry(e.target.value)}
            className="border rounded px-2 py-1 w-full"
          >
            <option value="">Tous</option>
            <option value="sante">Ministère de la Santé</option>
            <option value="education">Ministère de l'Éducation</option>
            <option value="interieur">Ministère de l'Intérieur</option>
            <option value="justice">Ministère de la Justice</option>
          </select>
        </div>
      </div>
    </form> 
  );
};

export default GeneralSearchBar;

