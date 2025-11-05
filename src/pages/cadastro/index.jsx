import api from "../../api";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import "./index.css";
import menina from '../../assets/menina.png';
import Footer from "../../components/Footer";


const Cadastro = () => {
  const [formData, setFormData] = useState({
    id: "",
    nome: "",
    sobrenome: "",
    email: "",
    emailConfirm: "",
    senha: "",
    senhaConfirm: ""
  });

  const [submitting, setSubmitting] = useState(false);

  // Atualiza os campos conforme o usuário digita
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Função que envia os dados (POST ou PUT)
  const cadastrarUsuario = async () => {
  const { id, nome, sobrenome, email, emailConfirm, senha, senhaConfirm } = formData;

  // 🔍 Verifica se os campos obrigatórios foram preenchidos
  if (!nome || !sobrenome || !email || !emailConfirm || !senha || !senhaConfirm) {
    toast.error("Preencha todos os campos obrigatórios!");
    return;
  }

  // 🔍 Valida formato de e-mail
  const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailValido.test(email)) {
    toast.error("Digite um e-mail válido!");
    return;
  }

  // 🔍 Verifica se os e-mails coincidem
  if (email !== emailConfirm) {
    toast.error("Os e-mails não coincidem!");
    return;
  }

  // 🔍 Verifica se as senhas coincidem
  if (senha !== senhaConfirm) {
    toast.error("As senhas não coincidem!");
    return;
  }

  // 🔍 Verifica se a senha tem o mínimo de caracteres (por exemplo, 6)
  if (senha.length < 6) {
    toast.error("A senha deve ter pelo menos 6 caracteres!");
    return;
  }

  // ✅ Cria o objeto que será enviado
  const novoUsuario = {
    nome,
    sobrenome,
    email,
    senha
  };

  setSubmitting(true);

  try {
    if (!id) {
      // Cadastra novo usuário
      const resp = await api.post('/users', novoUsuario);
      toast.success(`Usuário criado com sucesso! Novo ID: ${resp.data.id}`);
    } else {
      // Atualiza usuário existente
      await api.put(`/users/${id}`, novoUsuario);
      toast.success(`Usuário ${id} atualizado com sucesso!`);
    }

    limparCampos();
  } catch (erro) {
    console.error("Erro ao cadastrar/atualizar:", erro);
    toast.error("Erro ao realizar operação. Tente novamente.");
  } finally {
    setSubmitting(false);
  }
};


  // Limpa o formulário
  const limparCampos = () => {
    setFormData({
      id: "",
      nome: "",
      sobrenome: "",
      email: "",
      emailConfirm: "",
      senha: "",
      senhaConfirm: ""
    });
  };


  // Manipula o envio do formulário
  const handleSubmit = (e) => {
    e.preventDefault();
    cadastrarUsuario();
  };

  return (
    <div>
      <Header />
      <div className="cadastro-container">
        <div className="left-image">
          <img src={menina} alt="Pessoa apontando" />
        </div>

        <div className="form-container">
          <h2>Crie sua conta</h2>
          <p>
            ou <Link to="/login">faça login na sua conta</Link>
          </p>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="nome"
              placeholder="Digite seu nome"
              value={formData.nome}
              onChange={handleChange}
            />
            <input
              type="text"
              name="sobrenome"
              placeholder="Digite seu sobrenome"
              value={formData.sobrenome}
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              placeholder="E-mail"
              value={formData.email}
              onChange={handleChange}
            />
            <input
              type="email"
              name="emailConfirm"
              placeholder="Confirme seu e-mail"
              value={formData.emailConfirm}
              onChange={handleChange}
            />
            <input
              type="password"
              name="senha"
              placeholder="Digite sua senha"
              value={formData.senha}
              onChange={handleChange}
            />
            <input
              type="password"
              name="senhaConfirm"
              placeholder="Confirme sua senha"
              value={formData.senhaConfirm}
              onChange={handleChange}
            />

            <button type="submit" disabled={submitting}>
              {submitting ? "Enviando..." : "Cadastrar"}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
    
  );
};

export default Cadastro;