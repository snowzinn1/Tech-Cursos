import React from "react";
import CadastrarCurso from "../../components/CadastrarCurso";
import HeaderAdmin from "../../components/HeaderAdmin";
import Footer from "../../components/Footer";

export default function DashboardAdmin() {
  return (
    <div>
      <HeaderAdmin />
      <main className="admin-dashboard">
        <h1 style={{ textAlign: "center", margin: "2rem 0" }}>
          Painel do Administrador
        </h1>
        <CadastrarCurso />
      </main>
      <Footer />
    </div>
  );
}
