import React from "react";
import CadastrarCurso from "../../components/CadastrarCurso";
import HeaderAdmin from "../../components/HeaderAdmin";
import Footer from "../../components/Footer";

export default function DashboardAdmin() {
  return (
    <div>
      <HeaderAdmin />
      <main className="admin-dashboard">
        <CadastrarCurso />
      </main>
      <Footer />
    </div>
  );
}
