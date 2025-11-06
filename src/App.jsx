import Header from "./components/Header";
import HeaderAdmin from "./components/HeaderAdmin";
import SearchBar from "./components/SearchBar";
import Categories from "./components/Categories";
import Advantages from "./components/Advantages";
import Footer from "./components/Footer";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function App() {
  const navegar = useNavigate();
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const usuarioLogado = localStorage.getItem("usuarioLogado");
    if (!usuarioLogado) {
      navegar("/login");
    } else {
      setUsuario(JSON.parse(usuarioLogado));
    }
  }, [navegar]);

  return (
    <div>
      {/* 👇 Alterna dinamicamente */}
      {usuario?.role === "admin" ? <HeaderAdmin /> : <Header />}

      <main>
        <section className="hero">
          <div className="hero-inner">
            <h1>Futuro em Tecnologia</h1>
            <p>Aprenda técnicas de programação, banco de dados e muito mais.</p>
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
