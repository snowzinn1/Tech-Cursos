import { Navigate } from "react-router-dom";

export default function RotaProtegidaAdmin({ children }) {
  const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));

  if (!usuario || usuario.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
}

