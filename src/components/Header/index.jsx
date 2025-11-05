import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo/logo.png";
import "./index.css";

export default function Header() {
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

  return (
    <header className="header">

      <div>
        <a href="/">
          <img src={logo} alt="" />
        </a>
      </div>

      <nav>
        <Link to="/sobre">Sobre</Link>
        <Link to="/assinaturas">Assine</Link>

        {usuario ? (
          <div
            className="usuario-menu"
            onMouseEnter={() => setMostrarLogout(true)}
            onMouseLeave={() => setMostrarLogout(false)}
          >
            <span className="usuario-nome">Olá, {usuario.nome}</span>
            {mostrarLogout && (
              <button className="logout-btn" onClick={handleLogout}>
                Sair
              </button>
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