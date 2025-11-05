import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  // 🔗 Lista de cursos e suas rotas
  const courses = [
    { name: "Programação Web", path: "/programacao-web" },
    { name: "Linguagens de Programação", path: "/linguagens-de-programacao" },
    { name: "Banco de Dados", path: "/banco-de-dados" },
    { name: "Informática", path: "/informatica" },
    { name: "Assinaturas", path: "/assinaturas" },
    { name: "Sobre", path: "/sobre" },
  ];

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim() === "") {
      setSuggestions([]);
      return;
    }

    // 🔍 Filtra cursos que contenham o texto digitado
    const filtered = courses.filter((c) =>
      c.name.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(filtered);
  };

  const handleSelect = (path) => {
    navigate(path);
    setQuery("");
    setSuggestions([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const found = courses.find((c) =>
      c.name.toLowerCase().includes(query.toLowerCase())
    );
    if (found) {
      handleSelect(found.path);
    } else {
      alert("Curso não encontrado 😕");
    }
  };

  return (
    <div className="search-bar-container" role="search">
      <form onSubmit={handleSubmit} className="search-bar">
        <input
          type="text"
          placeholder="Buscar cursos..."
          value={query}
          onChange={handleChange}
          aria-label="Buscar cursos"
        />
        <button type="submit" aria-label="Pesquisar">🔍</button>
      </form>

      {/* 🔽 Sugestões dinâmicas */}
      {suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((s, i) => (
            <li
              key={i}
              onClick={() => handleSelect(s.path)}
              className="suggestion-item"
            >
              {s.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
