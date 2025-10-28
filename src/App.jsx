import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import Categories from "./components/Categories";
import Advantages from "./components/Advantages";
import Footer from "./components/Footer";
import { Link, useNavigate } from 'react-router-dom'; // 👈 import corrigido
import { useEffect } from "react";

export default function App() {
  const navegar = useNavigate();

  useEffect(() => {
    const usuarioLogado = localStorage.getItem('usuarioLogado'); // 👈 nome da chave ajustado
    if (!usuarioLogado) {
      navegar('/login');
    }
  }, [navegar]);

  return (
    <div>
      <Header />
      <main>
        <section className="hero">
          <div className="hero-inner">
            <h1>Futuro em Tecnologia</h1>
            <p>Aprenda técnicas de programação, banco de dados e muito mais.</p>
            <nav></nav>
            <SearchBar />
          </div>
        </section>

        <Categories />
        <Advantages />
      </main>
      <Footer />
    </div>
  );
}
