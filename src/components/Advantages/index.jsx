export default function Advantages() {
  const vantagens = [
    "Certificado de conclusão",
    "Suporte ao aluno",
    "Acesso vitalício",
  ];

  return (
    <section className="advantages">
      <h2>Vantagens</h2>
      <div className="advantage-list">
        {vantagens.map((v, i) => (
          <div key={i} className="advantage-item">✅ {v}</div>
        ))}
      </div>
    </section>
  );
}