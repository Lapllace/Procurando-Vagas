# Decisões técnicas

## ADR-001 — Monorepositório npm

API, frontend e pacote de banco ficam no mesmo repositório para facilitar instalação, CI e evolução coordenada. Workspaces npm reduzem ferramentas extras.

## ADR-002 — Compatibilidade determinística

A IA extrai requisitos e relaciona evidências. Pontuação e regras eliminatórias são código determinístico, testável e auditável no backend.

## ADR-003 — Revisão humana no MVP

Documentos podem ser preparados, mas nenhuma candidatura é enviada automaticamente. O app encaminha ao portal oficial para o usuário concluir.

## ADR-004 — Prisma ORM 7

Usar Prisma 7.10.1 com driver adapter PostgreSQL. Configuração do datasource fica em prisma.config.ts e a URL não é versionada.

## ADR-005 — Privacidade por padrão

Perfil real, grade individual, documentos, e-mails e credenciais ficam fora do Git. O repositório contém somente templates vazios.

## ADR-006 — Fontes permitidas

Começar com APIs documentadas de consulta, feeds oficiais, alertas de e-mail autorizados e importação manual. Não automatizar portais que proíbem bots.

## ADR-007 — Desenvolvimento local

Docker Compose fornece PostgreSQL. API e web escutam em 127.0.0.1 por padrão, não em todas as interfaces.