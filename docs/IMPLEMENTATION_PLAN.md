# Plano de implementação

## Fase 0 — Fundação e proteção de dados

- Monorepositório npm com API, web e pacote de banco.
- TypeScript, lint, formatação, testes e CI.
- PostgreSQL local via Docker Compose.
- Prisma ORM com migration inicial mínima.
- Health check da API e página inicial web.
- .gitignore abrangente e política de logs sem dados pessoais.

Aceite: dependências instalam; API/web compilam; migration valida e aplica; testes passam; dados pessoais permanecem fora do Git.

## Fase 1 — Perfil mestre e preferências

Cadastro de formação, experiências, projetos, habilidades e idiomas; importação PDF/DOCX como rascunho; revisão/confirmacão de fatos; preferências de vagas; grade editável por semestre; histórico e proveniência.

Aceite: nenhum fato extraído é usado como confirmado sem revisão; grade e filtros podem ser editados.

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

## Cenários de teste essenciais

1. Estágio remoto de 20 horas com horário flexível e tecnologias compatíveis.
2. Vaga presencial cuja jornada fixa conflita com uma aula.
3. Vaga híbrida sem frequência presencial informada.
4. Vaga júnior com experiência exigida acima da experiência validada.
5. Vaga em área explicitamente excluída pelo candidato.
6. Vaga que exige diploma concluído enquanto formação está em andamento.
7. Vaga que aceita estudante de área correlata.
8. Duas fontes publicando a mesma vaga.
9. Vaga expirada.
10. Resposta da IA que inventa experiência ou certificação.