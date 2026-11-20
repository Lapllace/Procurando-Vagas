const focusAreas = [
  'Back-end e APIs',
  'Estágios em tecnologia',
  'Automação e integrações',
];

const nextSteps = [
  {
    number: '01',
    title: 'Configure seu perfil',
    description:
      'Revise formação, experiências, projetos e habilidades antes de usar essas informações em documentos.',
  },
  {
    number: '02',
    title: 'Encontre vagas compatíveis',
    description:
      'Compare requisitos técnicos, modalidade, localização e horários com evidências da publicação.',
  },
  {
    number: '03',
    title: 'Revise antes de candidatar',
    description:
      'Prepare documentos direcionados e mantenha a decisão final de candidatura com você.',
  },
];

export default function HomePage() {
  return (
    <main className="shell">
      <header className="topbar">
        <a className="brand" href="/" aria-label="VagaMatch início">
          <span className="brand-mark">V</span>
          <span>VagaMatch</span>
        </a>
        <span className="environment">AMBIENTE LOCAL · MVP</span>
      </header>

      <section className="hero">
        <p className="eyebrow">SUA PRÓXIMA OPORTUNIDADE, COM CRITÉRIO</p>
        <h1>
          Menos candidaturas aleatórias.
          <span> Mais oportunidades que fazem sentido.</span>
        </h1>
        <p className="hero-copy">
          Um assistente pessoal para encontrar vagas de tecnologia, entender sua
          compatibilidade e preparar candidaturas sem inventar nada sobre você.
        </p>
        <div className="tags" aria-label="Áreas de foco">
          {focusAreas.map((area) => (
            <span className="tag" key={area}>
              {area}
            </span>
          ))}
        </div>
      </section>

      <section className="status-panel" aria-labelledby="status-title">
        <div>
          <p className="eyebrow">PRIMEIRO ACESSO</p>
          <h2 id="status-title">Sua central de oportunidades está sendo preparada.</h2>
          <p>
            Nesta fundação, o painel ainda não coleta vagas nem armazena seu
            currículo. O próximo passo é implementar o perfil mestre com revisão
            de cada informação.
          </p>
        </div>
        <div className="status-indicator">
          <span className="status-dot" />
          Fundação inicial
        </div>
      </section>

      <section className="steps" aria-labelledby="steps-title">
        <div className="section-heading">
          <p className="eyebrow">COMO VAI FUNCIONAR</p>
          <h2 id="steps-title">Você no controle em cada etapa.</h2>
        </div>
        <div className="step-grid">
          {nextSteps.map((step) => (
            <article className="step-card" key={step.number}>
              <span className="step-number">{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </article>
          ))}
        </div>
      </section>

      <footer className="footer">
        VagaMatch · Privacidade por padrão · Nenhuma candidatura é enviada pelo MVP
      </footer>
    </main>
  );
}