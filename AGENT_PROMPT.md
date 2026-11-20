# Prompt para Cursor / Codex / agente de programação

Você é responsável por implementar o VagaMatch neste repositório.

Antes de alterar arquivos, leia README.md, docs/MVP_SPEC.md, docs/IMPLEMENTATION_PLAN.md, docs/PRIVACY.md e docs/DECISIONS.md. Inspecione git status, branch, estrutura e testes.

## Regras obrigatórias

1. Preserve todo trabalho existente. Não execute git reset --hard, git clean -fd, checkout destrutivo ou rebase/force push sem autorização explícita.
2. Trabalhe em branches pequenas e commits claros. Não faça alterações diretamente em main.
3. Não invente requisitos, fatos do candidato, APIs ou permissões de plataformas. Campos desconhecidos permanecem desconhecidos.
4. Nunca publique currículo, dados pessoais, documentos acadêmicos, .env, tokens OAuth, cookies, credenciais, estado de navegador, exportações ou banco local.
5. A IA pode extrair requisitos e mapear evidências, mas o backend valida o schema e calcula a pontuação deterministicamente.
6. Não invente experiência, senioridade, certificações, métricas, domínio tecnológico, formação concluída ou datas. Experiência geral freelancer não equivale automaticamente a experiência profissional em Back-end.
7. O objetivo de carreira e o filtro de oportunidades podem ser configurados pelo candidato. Não recomendar Engenharia Mecânica para o perfil inicial.
8. Não declare como concluída uma transferência, matrícula ou terminalidade acadêmica que não tenha sido formalizada. Use formação oficial confirmada e permita registrar componentes curriculares em andamento após revisão.
9. Grade acadêmica representa compromissos de aula, não disponibilidade total. Não presuma que todo horário sem aula é tempo disponível para trabalho.
10. Não implementar scraping, bots de navegação, preenchimento ou envio automatizado no LinkedIn ou Indeed. Para Gupy, iniciar com links, alertas ou entrada manual; validar autorização antes de qualquer integração.
11. Não contornar CAPTCHA, OTP, login, paywall, rate limits, termos ou controles anti-bot.
12. No MVP, nunca enviar candidatura. Gerar documentos para revisão e abrir o link oficial para o candidato concluir.
13. Adicione testes para regras de negócio, conflitos de horário, dados ausentes, deduplicação, vagas expiradas e tentativas de saída inventada pela IA.
14. Rode lint, typecheck, testes, validação/migrations Prisma e build. Relate comandos e resultados reais; não diga que algo passou sem executar.

## Próximo incremento depois da fundação

Implemente a Fase 1: perfil mestre, habilidades, experiências, projetos, educação, preferências e grade editável. Extração de PDF/DOCX deve criar rascunhos que exigem revisão; nenhum campo extraído pode ser confirmado automaticamente.

## Entrega de cada incremento

- Resumo de arquivos criados/alterados.
- Decisões técnicas e dependências novas.
- Testes executados e resultados.
- Riscos, limitações e pendências.
- Comandos PowerShell para reproduzir localmente.
- Nenhuma alteração destrutiva ou envio real de candidatura.