# Plano de implementação

## Fase 0 — Fundação e proteção de dados

- Monorepositório npm com API, web e pacote de banco.
- TypeScript, lint, formatação, testes e CI.
- PostgreSQL local via Docker Compose.
- Prisma ORM com migrations.
- Health check da API e página inicial web.
- .gitignore abrangente e política de logs sem dados pessoais.

Status: concluída e validada em CI, incluindo aplicação das migrations em PostgreSQL 16, lint, typecheck, testes e build.

## Fase 1 — Perfil mestre e preferências

- Cadastro de formação, experiências, projetos, habilidades, idiomas e certificações.
- Importação PDF/DOCX planejada, sempre como rascunho.
- Revisão e confirmação de fatos.
- Preferências de cargo, senioridade, modalidade, localidade e carga horária.
- Grade acadêmica editável por semestre e janelas reais de trabalho.
- Histórico e proveniência das informações.
- API GET/PATCH e tela local para editar perfil.

Status: API, persistência e primeira tela implementadas; testes e CI em validação.

Aceite: nenhum fato extraído é utilizado como confirmado sem revisão; grade e filtros podem ser editados; conflitos e dados inválidos são rejeitados.

## Fase 2 — Descoberta de vagas

Interface JobSourceProvider; conectores de leitura Greenhouse Job Board e Lever Postings; importação manual; RSS/feed oficial; alertas por e-mail em OAuth de leitura após consentimento; normalização, deduplicação, expiração e histórico.

Aceite: vaga é importada, atualizada, deduplicada e rastreada até sua fonte.

## Fase 3 — Compatibilidade explicável

Regras eliminatórias/pesos configuráveis; extração com IA em schema estrito; cálculo determinístico; detecção de conflito de horário, senioridade, formação, modalidade e localização; evidências e incertezas na interface.

Aceite: testes cobrem conflitos, ausência de dados, vagas expiradas, diploma concluído e respostas inventadas pela IA.

## Fase 4 — Documentos e aprovação

Currículo mestre; versões por vaga usando fatos aprovados; DOCX/PDF; carta revisável; comparação de versões.

Aceite: cada documento exportado referencia vaga e fatos utilizados; candidato revisa antes de exportar.

## Fase 5 — Acompanhamento e automação

Dashboard de candidaturas; status/histórico; alertas; e-mail somente leitura; integração n8n opcional por webhook autenticado; pausa global e tratamento de falhas.

Aceite: rotinas podem ser pausadas; alertas trazem links da origem; nenhum envio é automático.