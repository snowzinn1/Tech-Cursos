import React, { useEffect, useState } from "react";
import { FaUser, FaGraduationCap, FaKey, FaClipboardList, FaShoppingCart } from "react-icons/fa";
import api from "../../api";
import "./index.css";
import Header from "../../components/Header";
import HeaderAdmin from "../../components/HeaderAdmin";
import Footer from "../../components/Footer";

export default function Perfil() {
  const [user, setUser] = useState(null);
  const [activeSection, setActiveSection] = useState("visaoGeral");
  const [isLoading, setIsLoading] = useState(true);
  const userId = localStorage.getItem("userId");

 useEffect(() => {
  const fetchUser = async () => {
    if (!userId) {
      console.warn("Nenhum userId encontrado no localStorage");
      setIsLoading(false);
      return;
    }

    try {
      const response = await api.get(`/users?id=${userId}`);
      if (response.data && response.data.length > 0) {
        setUser(response.data[0]);
      } else {
        console.warn("Usuário não encontrado.");
      }
    } catch (error) {
      console.error("Erro ao carregar usuário:", error);
    } finally {
      setIsLoading(false);
    }
  };

  fetchUser();
}, [userId]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSave = async () => {
    try {
      await api.put(`/users/${user.id}`, user);
      alert("✅ Dados atualizados com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar dados:", error);
      alert("❌ Erro ao atualizar. Tente novamente.");
    }
  };

  if (isLoading) {
    return <div className="perfil-loading">Carregando...</div>;
  }

  if (!user) {
    return <div className="perfil-error">Usuário não encontrado.</div>;
  }

  return (
    <div>
    <div className="perfil-container">
        {user.role === "admin" ? <HeaderAdmin /> : <Header />}
      <aside className="perfil-sidebar">
        <h2>Meu Perfil</h2>
        <nav>
          <button onClick={() => setActiveSection("visaoGeral")} className={activeSection === "visaoGeral" ? "active" : ""}>
            <FaUser /> Visão Geral
          </button>
          <button onClick={() => setActiveSection("assinaturas")} className={activeSection === "assinaturas" ? "active" : ""}>
            <FaShoppingCart /> Assinaturas e Compras
          </button>
          <button onClick={() => setActiveSection("certificados")} className={activeSection === "certificados" ? "active" : ""}>
            <FaGraduationCap /> Certificados
          </button>
          <button onClick={() => setActiveSection("acesso")} className={activeSection === "acesso" ? "active" : ""}>
            <FaKey /> Dados de Acesso
          </button>
          <button onClick={() => setActiveSection("pessoais")} className={activeSection === "pessoais" ? "active" : ""}>
            <FaClipboardList /> Dados Pessoais
          </button>
        </nav>
      </aside>

      <main className="perfil-content">
        {activeSection === "visaoGeral" && (
          <section>
            <h1>Bem-vindo, {user.nome}!</h1>
            <p>Aqui você pode gerenciar seus dados, acessar certificados e visualizar suas compras.</p>
          </section>
        )}

        {activeSection === "assinaturas" && (
          <section>
            <h1>Assinaturas e Compras</h1>
            <p>Nenhuma compra registrada no momento.</p>
          </section>
        )}

        {activeSection === "certificados" && (
          <section>
            <h1>Certificados</h1>
            <p>Você ainda não possui certificados disponíveis.</p>
          </section>
        )}

        {activeSection === "acesso" && (
          <section className="perfil-form">
            <h1>Dados de Acesso</h1>
            <label>Email</label>
            <input type="email" name="email" value={user.email} onChange={handleChange} />
            <label>Senha</label>
            <input type="password" name="senha" value={user.senha} onChange={handleChange} />
            <button onClick={handleSave}>Salvar Alterações</button>
          </section>
        )}

        {activeSection === "pessoais" && (
          <section className="perfil-form">
            <h1>Dados Pessoais</h1>
            <label>Nome</label>
            <input type="text" name="nome" value={user.nome} onChange={handleChange} />
            <label>Sobrenome</label>
            <input type="text" name="sobrenome" value={user.sobrenome} onChange={handleChange} />
            <button onClick={handleSave}>Salvar Alterações</button>
          </section>
        )}
      </main>
    </div>
    <Footer />
       </div>
  );
}
