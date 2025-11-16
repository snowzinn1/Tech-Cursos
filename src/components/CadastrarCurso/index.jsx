import React, { useState, useEffect } from "react";
import api from "../../api";
import toast from "react-hot-toast";
import "./index.css";
import HeaderAdmin from "../HeaderAdmin";
import Footer from "../Footer";

export default function CadastrarCurso() {
  const [curso, setCurso] = useState({
    img: "",
    title: "",
    description: "",
    level: "",
    duration: "",
    category: "",
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

    if (
      !curso.title ||
      !curso.level ||
      !curso.img ||
      !curso.category
    ) {
      toast.error("Preencha todos os campos!");
      return;
    }

    setEnviando(true);

    try {
      await api.post("/courses", curso);
      toast.success("Curso cadastrado com sucesso!");
      setCurso({
        img: "",
        title: "",
        level: "",
        duration: "",
        category: "",
      });
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


          <label htmlFor="img">Imagem (URL)</label>
          <input
            type="text"
            id="img"
            name="img"
            placeholder="https://exemplo.com/img-react.png"
            value={curso.img}
            onChange={handleChange}
          />

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

          <label htmlFor="duration">Duração (Horas)</label>
          <input
            type="number"
            id="duration"
            name="duration"
            placeholder="Ex: 40"
            value={curso.duration}
            onChange={handleChange}
          />

          <label htmlFor="category">Categoria</label>
          <select
            id="category"
            name="category"
            value={curso.category}
            onChange={handleChange}
          >
            <option value="">Selecione a categoria</option>
            <option value="lp">Linguagens de Programação</option>
            <option value="bd">Banco de Dados</option>
            <option value="pw">Programação Web</option>
            <option value="info">Informática</option>
          </select>

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
          
                  <span>
                    <strong>Nível:</strong> {c.level} |{" "}
                    <strong>Duração:</strong> {c.duration} |{" "}
                    <strong>Categoria:</strong> {c.category?.toUpperCase()}
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
