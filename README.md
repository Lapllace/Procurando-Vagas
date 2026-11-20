# VagaMatch

Agente pessoal para descobrir oportunidades de tecnologia, avaliar compatibilidade técnica e de horário, preparar documentos fiéis ao histórico do candidato e acompanhar candidaturas.

## Estado do projeto

- Fundação: monorepositório npm, API NestJS, frontend Next.js, PostgreSQL/Prisma, Docker Compose e CI.
- Fase 1: perfil mestre, preferências e disponibilidade editáveis.
- MVP local-first; nenhuma candidatura é enviada automaticamente.

## Stack

- Node.js 22 e TypeScript 5.9
- API: NestJS 12 + class-validator
- Web: Next.js 16.4 + React 19
- Banco: PostgreSQL 16 + Prisma ORM 7.10
- Testes: Vitest
- Qualidade: ESLint 10 + Prettier
- Ambiente local: Docker Compose

## Configuração local (Windows / PowerShell)

1. Copie o arquivo de ambiente: `Copy-Item .env.example .env`
2. Suba o PostgreSQL: `docker compose up -d db`
3. Instale dependências: `npm install`
4. Gere o Prisma Client: `npm run db:generate`
5. Aplique as migrations: `npm run db:migrate`
6. Inicie a API e a web em terminais separados: `npm run dev:api` e `npm run dev:web`

API: http://127.0.0.1:3001/api/health
Perfil: http://127.0.0.1:3000/profile
Web: http://127.0.0.1:3000

A API escuta em loopback e o banco é local. Não publique essas portas na rede sem implementar autenticação e revisar a segurança.

## Endpoints iniciais

| Método | Caminho | Uso |
|---|---|---|
| GET | /api/health | Estado do processo |
| GET | /api/health/ready | Estado do banco |
| GET | /api/profile | Lê perfil local |
| PATCH | /api/profile | Atualiza os campos enviados; coleções incluídas são substituídas integralmente |

## Scripts

| Script | Ação |
|---|---|
| npm run dev:api | API em modo watch |
| npm run dev:web | Next.js |
| npm run db:generate | Gera Prisma Client |
| npm run db:migrate | Aplica migrations locais |
| npm run db:validate | Valida schema Prisma |
| npm run lint | ESLint |
| npm run typecheck | Verifica tipos |
| npm test | Testes unitários |
| npm run build | Compila API e web |

## Dados pessoais

O repositório não deve conter currículo, telefone, e-mail, documentos acadêmicos, disponibilidade individual, tokens, cookies ou credenciais. O perfil real fica no banco local; os arquivos em config são modelos vazios. Os serviços são vinculados a 127.0.0.1 por padrão.

## Princípios

- Não inventar experiências, habilidades, certificações, datas, resultados ou informações acadêmicas.
- Não transformar tempo geral de freelancer em experiência numa tecnologia específica.
- Dados extraídos por IA são rascunhos até revisão humana.
- Novos registros do perfil começam como “Precisa revisar”.
- Preservar URL, fonte, data de coleta e evidências de cada vaga.
- Não automatizar portais que proíbam bots nem contornar CAPTCHA, OTP, autenticação ou limites.
- Exigir aprovação humana. No MVP, abrir o portal oficial para o candidato concluir a candidatura.
- O motor determinístico do backend calcula pontuações; IA apenas extrai e explica evidências.

## Documentação

- docs/MVP_SPEC.md — requisitos funcionais e critérios de aceite.
- docs/IMPLEMENTATION_PLAN.md — fases de desenvolvimento.
- docs/PRIVACY.md — tratamento de dados e segurança.
- docs/DECISIONS.md — decisões técnicas.
- AGENT_PROMPT.md — instruções para agentes de programação.