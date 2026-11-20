# Privacidade e segurança

## Dados que não entram no Git

Currículo, documentos acadêmicos, dados de contato, perfil real, histórico de candidaturas, disponibilidade individual, arquivos importados/exportados, conteúdo de e-mails, .env, tokens OAuth, chaves, senhas, cookies, estado autenticado de navegador e banco local.

## Regras de armazenamento

- Desenvolvimento local-first, com serviços vinculados a loopback (127.0.0.1) por padrão.
- Segredos em variáveis de ambiente ou secret manager.
- OAuth com escopo mínimo e leitura apenas para integração inicial de e-mail.
- Não enviar PII a modelos de IA sem necessidade e consentimento.
- Logs sem texto de currículo, token, e-mail, telefone ou conteúdo integral de formulário.
- Eventos de auditoria guardam tipo e resultado da ação, sem texto livre com dados pessoais.
- Backups locais protegidos pelo usuário.
- O perfil atual usa um identificador local único e ainda não oferece autenticação multiusuário.

## Automação de plataformas

Não contornar login, MFA, CAPTCHA, rate limits ou proteções anti-bot. Não automatizar LinkedIn ou Indeed. Usar APIs oficiais, alertas, feeds e links conforme permitido pela fonte. Consulta pública de vaga não autoriza submissão de candidatura.

## Aprovação humana

No MVP, o app não submete formulários nem envia mensagens a recrutadores. O usuário revisa documentos e conclui a candidatura no site oficial.

## Resposta a incidentes

Se segredo ou dado pessoal for versionado: revogar/rotacionar o segredo, remover o arquivo da árvore atual, avaliar limpeza do histórico sem force-push não autorizado e registrar o incidente.