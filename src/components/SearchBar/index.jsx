export default function SearchBar() {
  return (
    <div className="search-bar" role="search">
      <input type="text" placeholder="Buscar cursos" aria-label="Buscar cursos" />
      <button aria-label="Pesquisar">🔍</button>
    </div>
  );
}