import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./index.css";
import Header from "../../components/Header";
import api from '../../api';
import toast from 'react-hot-toast';
import menina from '../../assets/menina.png';

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
    const res = await api.get('/users');
    const users = res.data;

    const usuarioEncontrado = users.find(
      (u) => u.email === email && u.senha === senha
    );

    if (usuarioEncontrado) {
      toast.success('Login bem-sucedido!');
      console.log('Usuário logado:', usuarioEncontrado);

      // ✅ Salva corretamente no localStorage
      localStorage.setItem('usuarioLogado', JSON.stringify(usuarioEncontrado));

      // Redireciona
      navigate('/');
    } else {
      toast.error('E-mail ou senha incorretos!');
    }
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
    </div>
  );
}