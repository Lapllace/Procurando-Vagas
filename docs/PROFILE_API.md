# API do perfil local

Base: `/api/profile`

## GET /api/profile

Cria um perfil local vazio caso não exista e devolve os dados do perfil, incluindo formação, experiências, projetos, competências, idiomas, certificações, preferências e disponibilidade.

## PATCH /api/profile

Atualiza somente os campos enviados. Para cada coleção enviada (por exemplo, `education` ou `skills`), a coleção inteira é substituída dentro de uma transação. Omitir uma coleção mantém os registros já salvos; enviar uma lista vazia limpa aquela coleção.

O body aceita:
- Campos básicos: displayName, headline, email, phone, location, portfolioUrl, githubUrl, linkedinUrl e summary.
- Coleções: education, experiences, projects, skills, languages e certifications.
- Objeto preferences com cargos, áreas, senioridade, tipos de contratação, modalidades, localidades e carga horária.
- Objeto availability com semestre, fuso horário, validade, meta semanal, classBlocks e workWindows.

Cada fato admite factStatus: CANDIDATE_PROVIDED, NEEDS_REVIEW ou CONFIRMED. Quando omitido, registros novos recebem NEEDS_REVIEW. A API não confirma fatos automaticamente.

## Validação

- DTOs aninhados são validados com class-validator e class-transformer.
- Campos desconhecidos são rejeitados pela ValidationPipe.
- Limite do corpo JSON: 256 KB.
- Horários devem estar no formato HH:mm e fim precisa ser posterior ao início.
- Aulas não podem se sobrepor no mesmo dia.
- Janelas de trabalho não podem se sobrepor nem conflitar com aulas.
- weeklyHoursMin não pode exceder weeklyHoursMax.
- Cada atualização é executada em transação e registra evento sem dados pessoais.

## Ambiente

API local em loopback. A implementação atual é single-user e não deve ser exposta à rede nem implantada publicamente sem autenticação, autorização e revisão de segurança.