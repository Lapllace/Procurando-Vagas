# VagaMatch

Agente pessoal para descobrir oportunidades de tecnologia, avaliar compatibilidade técnica e de horário, preparar documentos fiéis ao histórico do candidato e acompanhar candidaturas.

## Estado do projeto

A branch feat/foundation contém a fundação técnica do monorepositório: API NestJS, interface Next.js, PostgreSQL com Prisma ORM, ambiente Docker e CI. O MVP começa em modo local-first; nenhuma candidatura é enviada automaticamente.

## Stack

- Node.js 22.16+ e TypeScript 5.9
- API: NestJS 12
- Web: Next.js 16.4 + React 19
- Banco: PostgreSQL 16 + Prisma ORM 7.10
- Testes: Vitest
- Qualidade: ESLint + Prettier
- Ambiente local: Docker Compose

## Configuração local (Windows / PowerShell)

1. Copie o arquivo de ambiente: Copy-Item .env.example .env
2. Suba o PostgreSQL: docker compose up -d db
3. Instale dependências: npm install
4. Gere o Prisma Client: npm run db:generate
5. Aplique a migração: npm run db:migrate
6. Inicie em terminais separados: npm run dev:api e npm run dev:web

API: http://127.0.0.1:3001/api/health
Web: http://127.0.0.1:3000

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

O repositório não deve conter currículo, telefone, e-mail, documentos acadêmicos, disponibilidade individual, tokens, cookies ou credenciais. O perfil real deve ficar em arquivos locais ignorados pelo Git ou no banco local. Os arquivos em config são modelos vazios, sem dados de uma pessoa real.

## Princípios

- Não inventar experiências, habilidades, certificações, datas, resultados ou informações acadêmicas.
- Não transformar tempo geral de freelancer em experiência numa tecnologia específica.
- Dados extraídos por IA são rascunhos até revisão humana.
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

## Fontes

Priorizar APIs documentadas de quadros de vagas, feeds oficiais, alertas de e-mail autorizados e importação manual. Uma API de leitura não implica autorização para enviar candidaturas. LinkedIn e Indeed ficam restritos a alertas e links, sem scraping ou automação de navegador.