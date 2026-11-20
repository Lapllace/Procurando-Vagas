# Especificação do MVP — VagaMatch

## 1. Objetivo

Construir um agente pessoal que encontre vagas adequadas ao perfil e à disponibilidade do candidato, explique por que cada oportunidade combina (ou não), prepare documentos fiéis ao histórico real e mantenha registro dos processos seletivos.

O produto deve priorizar relevância, veracidade e compatibilidade com a rotina — não o volume bruto de candidaturas.

## 2. Perfil mestre

Armazenar formação, instituição, curso, status e período; experiências profissionais e freelancer; projetos, responsabilidades e tecnologias; habilidades com nível informado/validado; idiomas e preferências. Cada fato terá status candidate_provided, needs_review ou confirmed.

Documentos finais só podem usar fatos confirmados ou explicitamente aprovados pelo candidato. Tempo geral freelancer não pode ser convertido automaticamente em experiência numa tecnologia.

## 3. Preferências de oportunidade

O sistema permitirá configurar cargos, áreas, senioridade, estágio/trainee/júnior/freelancer, modalidade, localização, deslocamento, carga horária, disponibilidade semanal e remuneração pretendida.

Vagas presenciais podem ser consideradas, mas a cidade/região e a jornada devem estar claramente exibidas. Híbridas devem informar frequência presencial quando publicada. Dados ausentes aparecem como não informado, nunca como compatíveis por presunção.

## 4. Grade acadêmica e disponibilidade

A grade deve ser cadastrável por semestre, com blocos recorrentes de compromisso. Ela não representa disponibilidade total para trabalho.

O candidato também configura carga horária semanal pretendida, janelas reais de trabalho, intervalos de deslocamento, flexibilidade e validade da grade.

Jornada fixa que conflite com aula ou indisponibilidade confirmada recebe sinalização de incompatibilidade. Horário não informado permanece desconhecido.

## 5. Compatibilidade explicável

Pesos iniciais configuráveis:
- Compatibilidade técnica: 35 pontos.
- Compatibilidade de horário: 30 pontos.
- Adequação a estágio/júnior: 15 pontos.
- Modalidade e localização: 10 pontos.
- Formação e demais requisitos: 10 pontos.

Faixas: 80–100 alta; 65–79 intermediária; 0–64 baixa. A nota ordena oportunidades, não representa probabilidade de contratação.

Regras eliminatórias prevalecem sobre nota: vaga expirada, duplicada, sem origem verificável ou incompatível com critérios eliminatórios do candidato.

A IA extrai requisitos e aponta evidências, ambiguidades e confiança. O backend valida a resposta e calcula a nota. Cada item é atendido, não atendido ou desconhecido, com trecho e URL de suporte.

## 6. Descoberta e fontes

Começar por APIs públicas/documentadas de job boards corporativos, feeds/RSS oficiais, alertas de vagas recebidos por e-mail com OAuth de leitura e importação manual por URL/texto/arquivo.

Restrições:
- LinkedIn e Indeed: não usar scraping, bots de navegação, preenchimento nem envio automático; aceitar links e alertas.
- Gupy: começar com links, alertas e importação manual; não copiar ou agregar conteúdo sem autorização e revisão dos termos.
- Workday e outros ATS: abrir o portal oficial por padrão; integração somente com autorização e documentação adequadas.

Uma API para consultar anúncios não concede, por si só, permissão para submeter candidaturas.

Cada vaga preserva URL original, fonte, identificador externo, data/hora de coleta, texto bruto permitido, validade e histórico. Deduplicar por identificador, URL canônica e critérios conservadores.

## 7. Fluxo funcional

1. Candidato registra ou importa o perfil.
2. Arquivos importados são convertidos em rascunhos.
3. Candidato revisa e confirma fatos.
4. Fontes permitidas coletam vagas e preservam proveniência.
5. Normalizador extrai cargo, empresa, nível, local, modalidade, horário, carga horária, remuneração, requisitos e prazo.
6. Deduplicador identifica publicações repetidas.
7. Motor calcula compatibilidade e justificativas.
8. Dashboard apresenta oportunidades ordenadas e filtros.
9. Gerador prepara currículo direcionado e carta usando fatos aprovados.
10. Candidato revisa e exporta documentos.
11. Aplicativo abre link oficial; candidato conclui a candidatura no portal.
12. Candidato registra envio, data e observações.
13. Alertas de e-mail podem atualizar histórico em modo de leitura, sem responder recrutadores.

## 8. Telas

Visão geral; vagas recomendadas; detalhes/evidências; perfil mestre; formação e disponibilidade; documentos/revisão; candidaturas/acompanhamento; fontes/permissões/configurações.

## 9. Segurança

Desenvolvimento local-first, serviços vinculados a loopback por padrão, OAuth com escopos mínimos, segredos em variáveis de ambiente/secret store, logs redigidos, minimização de PII enviada a IA, auditoria e botão de pausa. Respeitar termos e não contornar CAPTCHA, OTP, autenticação ou controles anti-bot.

## 10. Critérios de aceite

- Arquivo importado nunca vira fato confirmado sem revisão.
- Tempo freelancer geral não vira experiência específica sem evidência.
- Requisitos atendidos, não atendidos e desconhecidos são mostrados separadamente.
- Horário/modalidade não informados não viram compatibilidade positiva.
- Conflito explícito com aula/indisponibilidade é detectado.
- O candidato edita grade por semestre e disponibilidade real.
- Localização e modelo presencial/híbrido aparecem claramente.
- Vagas expiradas não aparecem como ativas.
- Duplicatas não geram múltiplas candidaturas.
- Avaliações são rastreáveis até origem e evidência.
- Documentos não inventam fatos ou métricas.
- Nenhuma candidatura é enviada automaticamente no MVP.
- Integrações respeitam termos, permissões e limites de cada fonte.