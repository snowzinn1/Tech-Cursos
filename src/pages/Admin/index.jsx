import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function DashboardAdmin() {
  return (
    <div>
      <Header />
      <main style={{ padding: "2rem" }}>
        <h1>Painel do Administrador</h1>
        <p>Aqui você poderá adicionar e remover cursos.</p>
      </main>
      <Footer />
    </div>
  );
}
