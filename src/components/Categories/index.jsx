import { Link } from 'react-router-dom';

export default function Categories() {
  const categorias = [
    { nome: "Linguagens de programação", icon: "💻", to: "/linguagens-de-programacao" },
    { nome: "Banco de dados", icon: "🗄️", to: "/banco-de-dados" },
    { nome: "Desenvolvimento web", icon: "⚙️", to: "/programacao-web" },
    { nome: "Informática", icon: "ℹ️", to: "/informatica" },
  ];

  return (
    <section className="categories">
      <h2>Categorias de Cursos</h2>
      <div className="category-list">
        {categorias.map((c, i) => (
          c.to ? (
            <Link key={i} to={c.to} className="category-card">
              <span className="icon">{c.icon}</span>
              <p>{c.nome}</p>
            </Link>
          ) : (
            <div key={i} className="category-card">
              <span className="icon">{c.icon}</span>
              <p>{c.nome}</p>
            </div>
          )
        ))}
      </div>
    </section>
  );
}