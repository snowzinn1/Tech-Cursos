import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "../../components/Header";
import api from '../../api';
import toast from 'react-hot-toast';
import menina from '../../assets/menina.png';
import Footer from '../../components/Footer';
import "./index.css";

export default function Login() {

  const [credentials, setCredentials] = useState({ email: '', senha: '' });
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  const { email, senha } = credentials;

  if (!email || !senha) {
    toast.error('Preencha todos os campos!');
    return;
  }

  const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailValido.test(email)) {
    toast.error('Digite um e-mail válido!');
    return;
  }

  setSubmitting(true);

  try {
    // Filtra direto no JSON Server
    const res = await api.get('/users', { params: { email, senha } });
    const usuarioEncontrado = res.data[0];

    if (usuarioEncontrado) {
      toast.success('Login bem-sucedido!');
      localStorage.setItem('usuarioLogado', JSON.stringify(usuarioEncontrado));

      // 🚀 Redirecionamento inteligente
      if (usuarioEncontrado.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/');
      }
    } else {
      toast.error('E-mail ou senha incorretos!');
    }
  } catch (err) {
    console.error(err);
    toast.error('Erro ao conectar com o servidor.');
  } finally {
    setSubmitting(false);
  }
};



  
  return (
    <div>
      <Header />
      <div className="login-container">
        <div className="left-image">
          <img src={menina} alt="Pessoa apontando" />
        </div>

        <div className="form-container">
          <h2>Entrar na sua conta</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="E-mail"
              value={credentials.email}
              onChange={handleChange}
            />
            <input
              type="password"
              name="senha"
              placeholder="Senha"
              value={credentials.senha}
              onChange={handleChange}
            />
            <button type="submit" disabled={submitting}>
              {submitting ? 'Entrando...' : 'Entrar'}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}