import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo/logo.png";
import "./index.css";


export default function HeaderAdmin() {
  const [usuario, setUsuario] = useState(null);
  const [mostrarLogout, setMostrarLogout] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const usuarioLogado = localStorage.getItem("usuarioLogado");
    if (usuarioLogado) {
      setUsuario(JSON.parse(usuarioLogado));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("usuarioLogado");
    setUsuario(null);
    navigate("/login");
  };

  // 👇 Fecha o menu se o usuário clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Se o clique NÃO for dentro do .usuario-menu, fecha o menu
      if (!event.target.closest(".usuario-menu")) {
        setMostrarLogout(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <header className="header">
      <div>
        <a href="/">
          <img src={logo} alt="Logo" />
        </a>
      </div>

      <nav>
        <Link to="/sobre">Sobre</Link>
        <Link to="/assinaturas">Assine</Link>

        {usuario ? (
          <div className="usuario-menu">
            <span
              className="usuario-nome"
              onClick={() => setMostrarLogout((prev) => !prev)}
            >
              Olá, {usuario.nome}
            </span>

            {mostrarLogout && (
              <div className="menu-usuario">
                <button onClick={() => navigate("/perfil")}>Meu perfil</button>
                <button onClick={() => navigate("/cadastrar-curso")}>
                  Cursos
                </button>
                <button onClick={handleLogout}>Desconectar</button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link to="/login">
              <button className="login-btn">Entrar</button>
            </Link>
            <Link to="/cadastro">
              <button className="login-btn">Criar conta</button>
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
