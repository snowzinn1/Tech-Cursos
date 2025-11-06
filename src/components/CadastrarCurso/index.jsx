import React, { useState, useEffect } from "react";
import api from "../../api";
import toast from "react-hot-toast";
import "./index.css";
import HeaderAdmin from "../HeaderAdmin";
import Footer from "../Footer";

export default function CadastrarCurso() {
  const [curso, setCurso] = useState({
    title: "",
    description: "",
    level: "",
    price: "",
  });

  const [enviando, setEnviando] = useState(false);
  const [cursos, setCursos] = useState([]);

  // 🔁 Carrega todos os cursos ao abrir o painel
  const carregarCursos = async () => {
    try {
      const res = await api.get("/courses");
      setCursos(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Erro ao carregar cursos!");
    }
  };

  useEffect(() => {
    carregarCursos();
  }, []);

  // ✏️ Captura os campos do formulário
  const handleChange = (e) => {
    setCurso({ ...curso, [e.target.name]: e.target.value });
  };

  // 💾 Cadastrar novo curso
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!curso.title || !curso.description || !curso.level || !curso.price) {
      toast.error("Preencha todos os campos!");
      return;
    }

    setEnviando(true);

    try {
      await api.post("/courses", curso);
      toast.success("Curso cadastrado com sucesso!");
      setCurso({ title: "", description: "", level: "", price: "" });
      carregarCursos();
    } catch (err) {
      console.error(err);
      toast.error("Erro ao cadastrar curso!");
    } finally {
      setEnviando(false);
    }
  };

  // 🗑️ Remover curso
  const handleDelete = async (id) => {
    if (!window.confirm("Tem certeza que deseja excluir este curso?")) return;

    try {
      await api.delete(`/courses/${id}`);
      toast.success("Curso removido!");
      carregarCursos();
    } catch (err) {
      console.error(err);
      toast.error("Erro ao excluir curso!");
    }
  };

  return (
    <div id="body">
    <div className="cadastrar-curso-container">
      <HeaderAdmin />
      <h2>Cadastrar Novo Curso</h2>

      <form className="cadastrar-curso-form" onSubmit={handleSubmit}>
        <label htmlFor="title">Título</label>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Ex: Fundamentos de React"
          value={curso.title}
          onChange={handleChange}
        />

        <label htmlFor="description">Descrição</label>
        <textarea
          id="description"
          name="description"
          placeholder="Descreva o conteúdo do curso..."
          value={curso.description}
          onChange={handleChange}
        ></textarea>

        <label htmlFor="level">Nível</label>
        <select
          id="level"
          name="level"
          value={curso.level}
          onChange={handleChange}
        >
          <option value="">Selecione o nível</option>
          <option value="Iniciante">Iniciante</option>
          <option value="Intermediário">Intermediário</option>
          <option value="Avançado">Avançado</option>
        </select>

        <label htmlFor="price">Preço (R$)</label>
        <input
          type="number"
          id="price"
          name="price"
          placeholder="Ex: 49.90"
          value={curso.price}
          onChange={handleChange}
        />

        <button type="submit" disabled={enviando}>
          {enviando ? "Cadastrando..." : "Cadastrar Curso"}
        </button>
      </form>

     <br />
     <hr style={{ borderTop: "1px solid #e0e0e0" }} />

      <h2>Cursos Cadastrados</h2>
      <div className="lista-cursos">
        {cursos.length > 0 ? (
          cursos.map((c) => (
            <div key={c.id} className="curso-item">
              <div>
                <h3>{c.title}</h3>
                <p>{c.description}</p>
                <span>
                  <strong>Nível:</strong> {c.level} | <strong>R$</strong>{" "}
                  {Number(c.price).toFixed(2)}
                </span>
              </div>
              <button
                className="btn-excluir"
                onClick={() => handleDelete(c.id)}
              >
                Excluir
              </button>
            </div>
          ))
        ) : (
          <p>Nenhum curso cadastrado ainda.</p>
        )}
      </div>
    </div>
    </div>
  );
}
