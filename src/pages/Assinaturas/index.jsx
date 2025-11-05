import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "./index.css";

const Pagamento = () => {
  return (
    <div >
      {/* NAVBAR */}
      <Header />

      {/* SEÇÃO PRINCIPAL */}
      <main className="heromain">
        <h2 className="titulo">Assinatura</h2>
        <p className="subtitulo">
          Escolha o plano que melhor se adapta às suas necessidades.
        </p>

        <div className="planos">
          {/* PLANO MENSAL */}
          <div className="card">
            <h3>ASSINATURA MENSAL</h3>
            <p className="preco">R$ 28,90</p>
            <p className="detalhe">1 crédito mensal para certificados</p>
            <ul>
              <li>Suporte ao aluno</li>
              <li>Navegação sem anúncios</li>
              <li>Aulas exclusivas</li>
            </ul>
            <button className="btn">Assinar</button>
          </div>

          {/* PLANO ANUAL */}
          <div className="card anual ">
            <h3>ASSINATURA ANUAL</h3>
            <p className="preco">R$ 29,90</p>
            <p className="detalhe">ou R$ 289,90 à vista</p>
            <ul>
              <li>12 créditos ativados imediatamente</li>
              <li>Suporte ao aluno</li>
              <li>Navegação sem anúncios</li>
              <li>Acesso vitalício</li>
            </ul>
            <button className="btn">Assinar</button>
          </div>

          {/* PLANO PREMIUM */}
          <div className="card premium">
            <h3>ASSINATURA PREMIUM</h3>
            <p className="preco">R$ 49,90</p>
            <p className="detalhe">ou R$ 588 à vista</p>
            <ul>
              <li>Certificados ilimitados</li>
              <li>Suporte ao aluno</li>
              <li>Navegação sem anúncios</li>
              <li>Acesso vitalício</li>
              <li>Materiais extras exclusivos</li>
            </ul>
            <button className="btn">Assinar</button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Pagamento;
