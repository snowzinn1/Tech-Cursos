import { Link } from "react-router-dom";
import "../../index.css";

export default function ErrorPage() {
  return (
    <div className="error-container">
      <h1>404</h1>
      <p>Oops! Página não encontrada 😢</p>
      <Link to="/" className="error-btn">
        Voltar para a página inicial
      </Link>
    </div>
  );
}