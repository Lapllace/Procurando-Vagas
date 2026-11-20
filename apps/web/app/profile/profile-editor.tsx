'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

type EditableRow = Record<string, unknown>;
type CollectionKey =
  | 'education'
  | 'experiences'
  | 'projects'
  | 'skills'
  | 'languages'
  | 'certifications';

type ProfileForm = {
  displayName: string;
  headline: string;
  email: string;
  phone: string;
  location: string;
  portfolioUrl: string;
  githubUrl: string;
  linkedinUrl: string;
  summary: string;
  education: EditableRow[];
  experiences: EditableRow[];
  projects: EditableRow[];
  skills: EditableRow[];
  languages: EditableRow[];
  certifications: EditableRow[];
  preferences: {
    targetTitles: string[];
    targetAreas: string[];
    excludedAreas: string[];
    seniority: string[];
    employmentTypes: string[];
    workModes: string[];
    locations: string[];
    weeklyHoursMin: number | null;
    weeklyHoursMax: number | null;
    commuteLimitMinutes: number | null;
  };
  availability: {
    termLabel: string;
    timezone: string;
    validFrom: string;
    validUntil: string;
    weeklyHoursTarget: number | null;
    notes: string;
    classBlocks: EditableRow[];
    workWindows: EditableRow[];
  };
};

type FieldConfig = {
  key: string;
  label: string;
  kind?: 'textarea' | 'select' | 'csv';
  options?: Array<{ value: string; label: string }>;
  wide?: boolean;
};

const factStatusOptions = [
  { value: 'NEEDS_REVIEW', label: 'Precisa revisar' },
  { value: 'CANDIDATE_PROVIDED', label: 'Informado por mim' },
  { value: 'CONFIRMED', label: 'Confirmado' },
];

const emptyProfile = (): ProfileForm => ({
  displayName: '',
  headline: '',
  email: '',
  phone: '',
  location: '',
  portfolioUrl: '',
  githubUrl: '',
  linkedinUrl: '',
  summary: '',
  education: [],
  experiences: [],
  projects: [],
  skills: [],
  languages: [],
  certifications: [],
  preferences: {
    targetTitles: ['Estágio em Desenvolvimento', 'Desenvolvedor Back-end Júnior'],
    targetAreas: ['Back-end', 'Full-stack', 'Engenharia de Software', 'Automação', 'IA aplicada'],
    excludedAreas: ['Engenharia Mecânica'],
    seniority: ['Estágio', 'Júnior'],
    employmentTypes: ['Estágio', 'CLT', 'Freelancer'],
    workModes: ['REMOTE', 'HYBRID', 'ON_SITE', 'FREELANCE'],
    locations: ['Remoto - Brasil', 'Cruz das Almas - BA', 'Feira de Santana - BA', 'Salvador - BA'],
    weeklyHoursMin: null,
    weeklyHoursMax: null,
    commuteLimitMinutes: null,
  },
  availability: {
    termLabel: '2026.2',
    timezone: 'America/Bahia',
    validFrom: '',
    validUntil: '',
    weeklyHoursTarget: null,
    notes: 'Horários sem aula não significam disponibilidade automática. Configure suas janelas reais de trabalho.',
    classBlocks: [],
    workWindows: [],
  },
});

const collectionFields: Record<CollectionKey, FieldConfig[]> = {
  education: [
    { key: 'institution', label: 'Instituição' },
    { key: 'course', label: 'Curso' },
    { key: 'fieldOfStudy', label: 'Área / ênfase' },
    {
      key: 'status',
      label: 'Situação',
      kind: 'select',
      options: [
        { value: 'IN_PROGRESS', label: 'Em andamento' },
        { value: 'COMPLETED', label: 'Concluído' },
        { value: 'PAUSED', label: 'Trancado / pausado' },
      ],
    },
    { key: 'startPeriod', label: 'Início (ex.: 2022.1)' },
    { key: 'expectedEndPeriod', label: 'Previsão de conclusão' },
    { key: 'details', label: 'Detalhes / disciplinas relevantes', kind: 'textarea', wide: true },
    { key: 'factStatus', label: 'Validação', kind: 'select', options: factStatusOptions },
  ],
  experiences: [
    { key: 'title', label: 'Cargo / atividade' },
    { key: 'organization', label: 'Empresa / cliente' },
    {
      key: 'employmentType',
      label: 'Tipo',
      kind: 'select',
      options: [
        { value: 'FREELANCE', label: 'Freelancer' },
        { value: 'CLT', label: 'CLT' },
        { value: 'INTERNSHIP', label: 'Estágio' },
        { value: 'OTHER', label: 'Outro' },
      ],
    },
    { key: 'startPeriod', label: 'Início' },
    { key: 'endPeriod', label: 'Fim' },
    { key: 'description', label: 'Descrição e entregas', kind: 'textarea', wide: true },
    { key: 'responsibilities', label: 'Responsabilidades (separadas por vírgula)', kind: 'csv', wide: true },
    { key: 'technologies', label: 'Tecnologias efetivamente utilizadas', kind: 'csv', wide: true },
    { key: 'factStatus', label: 'Validação', kind: 'select', options: factStatusOptions },
  ],
  projects: [
    { key: 'name', label: 'Nome do projeto' },
    { key: 'role', label: 'Papel no projeto' },
    { key: 'url', label: 'URL pública' },
    { key: 'startPeriod', label: 'Início' },
    { key: 'endPeriod', label: 'Fim' },
    { key: 'description', label: 'Descrição e funcionalidades', kind: 'textarea', wide: true },
    { key: 'technologies', label: 'Tecnologias', kind: 'csv', wide: true },
    { key: 'factStatus', label: 'Validação', kind: 'select', options: factStatusOptions },
  ],
  skills: [
    { key: 'name', label: 'Competência / tecnologia' },
    { key: 'category', label: 'Categoria' },
    {
      key: 'level',
      label: 'Nível autodeclarado',
      kind: 'select',
      options: [
        { value: 'BASIC', label: 'Básico' },
        { value: 'INTERMEDIATE', label: 'Intermediário' },
        { value: 'ADVANCED', label: 'Avançado' },
        { value: 'PRACTICAL_EXPERIENCE', label: 'Experiência prática' },
      ],
    },
    { key: 'lastUsedPeriod', label: 'Última utilização' },
    { key: 'evidence', label: 'Onde / como utilizou', kind: 'textarea', wide: true },
    { key: 'factStatus', label: 'Validação', kind: 'select', options: factStatusOptions },
  ],
  languages: [
    { key: 'name', label: 'Idioma' },
    {
      key: 'proficiency',
      label: 'Nível',
      kind: 'select',
      options: [
        { value: 'BASIC', label: 'Básico' },
        { value: 'INTERMEDIATE', label: 'Intermediário' },
        { value: 'ADVANCED', label: 'Avançado' },
        { value: 'NATIVE', label: 'Nativo' },
      ],
    },
    { key: 'factStatus', label: 'Validação', kind: 'select', options: factStatusOptions },
  ],
  certifications: [
    { key: 'name', label: 'Certificação / capacitação' },
    { key: 'issuer', label: 'Instituição emissora' },
    { key: 'issuedPeriod', label: 'Data / período' },
    { key: 'url', label: 'URL de comprovação' },
    { key: 'factStatus', label: 'Validação', kind: 'select', options: factStatusOptions },
  ],
};

const collectionTitles: Record<CollectionKey, string> = {
  education: 'Formação acadêmica',
  experiences: 'Experiências profissionais e freelancer',
  projects: 'Projetos',
  skills: 'Competências técnicas',
  languages: 'Idiomas',
  certifications: 'Certificações e capacitações',
};

const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://127.0.0.1:3001/api';

function splitCsv(value: string): string[] {
  return value.split(',').map((item) => item.trim()).filter(Boolean);
}

function asText(value: unknown): string {
  if (Array.isArray(value)) return value.join(', ');
  return value === null || value === undefined ? '' : String(value);
}

function onlyKeys(row: EditableRow, keys: string[]): EditableRow {
  return Object.fromEntries(keys.filter((key) => row[key] !== undefined).map((key) => [key, row[key]]));
}

function normalizeProfile(value: Record<string, unknown>): ProfileForm {
  const base = emptyProfile();
  const availability =
    value.availability && typeof value.availability === 'object'
      ? (value.availability as Record<string, unknown>)
      : {};
  const preferences =
    value.preferences && typeof value.preferences === 'object'
      ? (value.preferences as Record<string, unknown>)
      : {};

  const collections: CollectionKey[] = [
    'education', 'experiences', 'projects', 'skills', 'languages', 'certifications',
  ];
  const normalized = { ...base };
  for (const key of collections) {
    const entries = value[key];
    normalized[key] = Array.isArray(entries) ? (entries as EditableRow[]) : [];
  }

  return {
    ...normalized,
    displayName: asText(value.displayName),
    headline: asText(value.headline),
    email: asText(value.email),
    phone: asText(value.phone),
    location: asText(value.location),
    portfolioUrl: asText(value.portfolioUrl),
    githubUrl: asText(value.githubUrl),
    linkedinUrl: asText(value.linkedinUrl),
    summary: asText(value.summary),
    preferences: {
      ...base.preferences,
      ...preferences,
      targetTitles: Array.isArray(preferences.targetTitles) ? (preferences.targetTitles as string[]) : [],
      targetAreas: Array.isArray(preferences.targetAreas) ? (preferences.targetAreas as string[]) : [],
      excludedAreas: Array.isArray(preferences.excludedAreas) ? (preferences.excludedAreas as string[]) : [],
      seniority: Array.isArray(preferences.seniority) ? (preferences.seniority as string[]) : [],
      employmentTypes: Array.isArray(preferences.employmentTypes) ? (preferences.employmentTypes as string[]) : [],
      workModes: Array.isArray(preferences.workModes) ? (preferences.workModes as string[]) : [],
      locations: Array.isArray(preferences.locations) ? (preferences.locations as string[]) : [],
      weeklyHoursMin: typeof preferences.weeklyHoursMin === 'number' ? preferences.weeklyHoursMin : null,
      weeklyHoursMax: typeof preferences.weeklyHoursMax === 'number' ? preferences.weeklyHoursMax : null,
      commuteLimitMinutes: typeof preferences.commuteLimitMinutes === 'number' ? preferences.commuteLimitMinutes : null,
    },
    availability: {
      ...base.availability,
      ...availability,
      termLabel: asText(availability.termLabel),
      timezone: asText(availability.timezone) || 'America/Bahia',
      validFrom: asText(availability.validFrom),
      validUntil: asText(availability.validUntil),
      weeklyHoursTarget: typeof availability.weeklyHoursTarget === 'number' ? availability.weeklyHoursTarget : null,
      notes: asText(availability.notes),
      classBlocks: Array.isArray(availability.classBlocks) ? (availability.classBlocks as EditableRow[]) : [],
      workWindows: Array.isArray(availability.workWindows) ? (availability.workWindows as EditableRow[]) : [],
    },
  };
}

function buildPayload(form: ProfileForm): Record<string, unknown> {
  const mapCollection = (key: CollectionKey, fields: string[]) =>
    form[key].map((row) => onlyKeys(row, fields));

  return {
    displayName: form.displayName || null,
    headline: form.headline || null,
    email: form.email || null,
    phone: form.phone || null,
    location: form.location || null,
    portfolioUrl: form.portfolioUrl || null,
    githubUrl: form.githubUrl || null,
    linkedinUrl: form.linkedinUrl || null,
    summary: form.summary || null,
    education: mapCollection('education', [
      'institution', 'course', 'fieldOfStudy', 'status', 'startPeriod',
      'expectedEndPeriod', 'details', 'factStatus', 'sourceReference',
    ]),
    experiences: mapCollection('experiences', [
      'title', 'organization', 'employmentType', 'startPeriod', 'endPeriod',
      'isCurrent', 'description', 'responsibilities', 'technologies', 'factStatus', 'sourceReference',
    ]),
    projects: mapCollection('projects', [
      'name', 'description', 'role', 'url', 'startPeriod', 'endPeriod',
      'technologies', 'factStatus', 'sourceReference',
    ]),
    skills: mapCollection('skills', [
      'name', 'category', 'level', 'lastUsedPeriod', 'evidence', 'factStatus', 'sourceReference',
    ]),
    languages: mapCollection('languages', ['name', 'proficiency', 'factStatus', 'sourceReference']),
    certifications: mapCollection('certifications', [
      'name', 'issuer', 'issuedPeriod', 'url', 'factStatus', 'sourceReference',
    ]),
    preferences: form.preferences,
    availability: {
      termLabel: form.availability.termLabel || null,
      timezone: form.availability.timezone,
      validFrom: form.availability.validFrom || null,
      validUntil: form.availability.validUntil || null,
      weeklyHoursTarget: form.availability.weeklyHoursTarget,
      notes: form.availability.notes || null,
      classBlocks: form.availability.classBlocks.map((row) =>
        onlyKeys(row, ['label', 'blockType', 'dayOfWeek', 'startTime', 'endTime', 'factStatus', 'sourceReference']),
      ),
      workWindows: form.availability.workWindows.map((row) =>
        onlyKeys(row, ['label', 'dayOfWeek', 'startTime', 'endTime', 'availabilityType', 'factStatus', 'sourceReference']),
      ),
    },
  };
}

function Repeater({
  title,
  description,
  rows,
  fields,
  onAdd,
  onRemove,
  onChange,
}: {
  title: string;
  description?: string;
  rows: EditableRow[];
  fields: FieldConfig[];
  onAdd: () => void;
  onRemove: (index: number) => void;
  onChange: (index: number, key: string, value: string) => void;
}) {
  return (
    <section className="profile-section">
      <div className="profile-section-heading">
        <div>
          <h2>{title}</h2>
          {description && <p>{description}</p>}
        </div>
        <button className="button button-secondary" type="button" onClick={onAdd}>+ Adicionar</button>
      </div>
      {rows.length === 0 ? (
        <p className="empty-hint">Nenhum registro adicionado.</p>
      ) : (
        <div className="repeater-list">
          {rows.map((row, index) => (
            <div className="repeater-card" key={String(row.id ?? index)}>
              <div className="repeater-card-top">
                <span>Registro {index + 1}</span>
                <button className="remove-button" type="button" onClick={() => onRemove(index)}>Remover</button>
              </div>
              <div className="profile-fields">
                {fields.map((field) => (
                  <label className={field.wide ? 'field field-wide' : 'field'} key={field.key}>
                    <span>{field.label}</span>
                    {field.kind === 'select' ? (
                      <select value={asText(row[field.key])} onChange={(event) => onChange(index, field.key, event.target.value)}>
                        <option value="">Selecione</option>
                        {field.options?.map((option) => (
                          <option value={option.value} key={option.value}>{option.label}</option>
                        ))}
                      </select>
                    ) : field.kind === 'textarea' ? (
                      <textarea rows={3} value={asText(row[field.key])} onChange={(event) => onChange(index, field.key, event.target.value)} />
                    ) : (
                      <input
                        value={asText(row[field.key])}
                        placeholder={field.kind === 'csv' ? 'Separe os itens por vírgula' : ''}
                        onChange={(event) => onChange(index, field.key, event.target.value)}
                      />
                    )}
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

const dayNames = [
  { value: '0', label: 'Domingo' },
  { value: '1', label: 'Segunda-feira' },
  { value: '2', label: 'Terça-feira' },
  { value: '3', label: 'Quarta-feira' },
  { value: '4', label: 'Quinta-feira' },
  { value: '5', label: 'Sexta-feira' },
  { value: '6', label: 'Sábado' },
];

export function ProfileEditor() {
  const [form, setForm] = useState<ProfileForm>(emptyProfile);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const loadProfile = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${apiBase}/profile`, { cache: 'no-store' });
      if (!response.ok) throw new Error(`Falha ao carregar perfil (HTTP ${response.status}).`);
      setForm(normalizeProfile((await response.json()) as Record<string, unknown>));
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Não foi possível carregar o perfil.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { void loadProfile(); }, [loadProfile]);

  const updateBasic = (
    key: keyof Pick<ProfileForm, 'displayName' | 'headline' | 'email' | 'phone' | 'location' | 'portfolioUrl' | 'githubUrl' | 'linkedinUrl' | 'summary'>,
    value: string,
  ) => setForm((current) => ({ ...current, [key]: value }));

  const updateCollection = (section: CollectionKey, index: number, key: string, value: string) => {
    const normalized: unknown = key === 'technologies' || key === 'responsibilities' ? splitCsv(value) : value;
    setForm((current) => ({
      ...current,
      [section]: current[section].map((row, rowIndex) =>
        rowIndex === index ? { ...row, [key]: normalized } : row,
      ),
    }));
  };

  const addCollection = (section: CollectionKey) => {
    const defaults: Record<CollectionKey, EditableRow> = {
      education: { institution: '', course: '', status: 'IN_PROGRESS', factStatus: 'NEEDS_REVIEW' },
      experiences: { title: '', employmentType: 'FREELANCE', responsibilities: [], technologies: [], factStatus: 'NEEDS_REVIEW' },
      projects: { name: '', technologies: [], factStatus: 'NEEDS_REVIEW' },
      skills: { name: '', factStatus: 'NEEDS_REVIEW' },
      languages: { name: '', factStatus: 'NEEDS_REVIEW' },
      certifications: { name: '', factStatus: 'NEEDS_REVIEW' },
    };
    setForm((current) => ({ ...current, [section]: [...current[section], defaults[section]] }));
  };

  const removeCollection = (section: CollectionKey, index: number) =>
    setForm((current) => ({
      ...current,
      [section]: current[section].filter((_, rowIndex) => rowIndex !== index),
    }));

  const updatePreference = (key: string, value: string) => {
    const arrayKeys = ['targetTitles', 'targetAreas', 'excludedAreas', 'seniority', 'employmentTypes', 'workModes', 'locations'];
    const numberKeys = ['weeklyHoursMin', 'weeklyHoursMax', 'commuteLimitMinutes'];
    const normalized = arrayKeys.includes(key)
      ? splitCsv(value)
      : numberKeys.includes(key)
        ? value.trim() === '' ? null : Number(value)
        : value;
    setForm((current) => ({ ...current, preferences: { ...current.preferences, [key]: normalized } }));
  };

  const updateAvailability = (key: string, value: string) => {
    const normalized = key === 'weeklyHoursTarget' ? (value.trim() === '' ? null : Number(value)) : value;
    setForm((current) => ({ ...current, availability: { ...current.availability, [key]: normalized } }));
  };

  const updateSchedule = (collection: 'classBlocks' | 'workWindows', index: number, key: string, value: string) => {
    const normalized = key === 'dayOfWeek' ? Number(value) : value;
    setForm((current) => ({
      ...current,
      availability: {
        ...current.availability,
        [collection]: current.availability[collection].map((row, rowIndex) =>
          rowIndex === index ? { ...row, [key]: normalized } : row,
        ),
      },
    }));
  };

  const addSchedule = (collection: 'classBlocks' | 'workWindows') => {
    const row =
      collection === 'classBlocks'
        ? { label: '', blockType: 'CLASS', dayOfWeek: 1, startTime: '08:00', endTime: '10:00', factStatus: 'NEEDS_REVIEW' }
        : { label: '', dayOfWeek: 1, startTime: '10:00', endTime: '12:00', availabilityType: 'FIXED', factStatus: 'NEEDS_REVIEW' };
    setForm((current) => ({
      ...current,
      availability: { ...current.availability, [collection]: [...current.availability[collection], row] },
    }));
  };

  const removeSchedule = (collection: 'classBlocks' | 'workWindows', index: number) =>
    setForm((current) => ({
      ...current,
      availability: {
        ...current.availability,
        [collection]: current.availability[collection].filter((_, rowIndex) => rowIndex !== index),
      },
    }));

  const saveProfile = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    setError('');
    setMessage('');
    try {
      const response = await fetch(`${apiBase}/profile`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(buildPayload(form)),
      });
      if (!response.ok) {
        const body = (await response.json().catch(() => ({}))) as { message?: string | string[] };
        const detail = Array.isArray(body.message) ? body.message.join(' ') : body.message;
        throw new Error(detail || `Falha ao salvar perfil (HTTP ${response.status}).`);
      }
      setForm(normalizeProfile((await response.json()) as Record<string, unknown>));
      setMessage('Perfil salvo. Revise os registros marcados como “Precisa revisar”.');
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Não foi possível salvar o perfil.');
    } finally {
      setSaving(false);
    }
  };

  const basicFields = useMemo(
    () => [
      { key: 'displayName', label: 'Nome completo' },
      { key: 'headline', label: 'Título profissional' },
      { key: 'email', label: 'E-mail', type: 'email' },
      { key: 'phone', label: 'Telefone' },
      { key: 'location', label: 'Cidade / estado' },
      { key: 'portfolioUrl', label: 'Portfólio', type: 'url' },
      { key: 'githubUrl', label: 'GitHub', type: 'url' },
      { key: 'linkedinUrl', label: 'LinkedIn', type: 'url' },
    ],
    [],
  );

  const getDayLabel = (value: unknown) =>
    dayNames.find((day) => day.value === String(value))?.label ?? 'Dia não definido';

  if (loading) return <main className="profile-shell"><p className="empty-hint">Carregando perfil local…</p></main>;

  return (
    <main className="profile-shell">
      <header className="profile-topbar">
        <a className="brand" href="/"><span className="brand-mark">V</span><span>VagaMatch</span></a>
        <a className="back-link" href="/">← Visão geral</a>
      </header>

      <div className="profile-title">
        <p className="eyebrow">FASE 1 · PERFIL MESTRE</p>
        <h1>Seu histórico profissional, organizado.</h1>
        <p>Cadastre informações verificáveis. O perfil fica no banco local; nenhum dado pessoal é enviado ao GitHub por esta tela.</p>
      </div>

      {error && <div className="notice notice-error" role="alert">{error}</div>}
      {message && <div className="notice notice-success" role="status">{message}</div>}

      <form onSubmit={saveProfile}>
        <section className="profile-section">
          <div className="profile-section-heading">
            <div><h2>Dados básicos</h2><p>Informações usadas para identificar você nos documentos.</p></div>
          </div>
          <div className="profile-fields">
            {basicFields.map((field) => (
              <label className="field" key={field.key}>
                <span>{field.label}</span>
                <input
                  type={field.type ?? 'text'}
                  value={form[field.key as keyof ProfileForm] as string}
                  onChange={(event) => updateBasic(field.key as keyof Pick<
                    ProfileForm,
                    'displayName' | 'headline' | 'email' | 'phone' | 'location' | 'portfolioUrl' | 'githubUrl' | 'linkedinUrl' | 'summary'
                  >, event.target.value)}
                />
              </label>
            ))}
            <label className="field field-wide">
              <span>Resumo profissional</span>
              <textarea rows={4} value={form.summary} onChange={(event) => updateBasic('summary', event.target.value)} />
            </label>
          </div>
        </section>

        {(Object.keys(collectionFields) as CollectionKey[]).map((key) => (
          <Repeater
            key={key}
            title={collectionTitles[key]}
            description={
              key === 'experiences'
                ? 'Separe trabalhos freelancer, vínculos formais e outras atividades. Não converta tempo geral em experiência numa tecnologia sem evidência.'
                : key === 'education'
                  ? 'Registre a formação em andamento e as disciplinas relevantes. Não indique uma terminalidade ou transferência ainda não formalizada como concluída.'
                  : undefined
            }
            rows={form[key]}
            fields={collectionFields[key]}
            onAdd={() => addCollection(key)}
            onRemove={(index) => removeCollection(key, index)}
            onChange={(index, field, value) => updateCollection(key, index, field, value)}
          />
        ))}

        <section className="profile-section">
          <div className="profile-section-heading">
            <div><h2>Preferências de vagas</h2><p>Use vírgulas para separar cargos, áreas, modalidades e localidades.</p></div>
          </div>
          <div className="profile-fields">
            {[
              ['targetTitles', 'Cargos desejados'],
              ['targetAreas', 'Áreas de interesse'],
              ['excludedAreas', 'Áreas a excluir'],
              ['seniority', 'Senioridade / regime'],
              ['employmentTypes', 'Tipos de contratação'],
              ['workModes', 'Modalidades (REMOTE, HYBRID, ON_SITE, FREELANCE)'],
              ['locations', 'Localidades aceitas'],
            ].map(([key, label]) => (
              <label className="field field-wide" key={key}>
                <span>{label}</span>
                <input value={asText(form.preferences[key as keyof ProfileForm['preferences']])} onChange={(event) => updatePreference(key, event.target.value)} />
              </label>
            ))}
            {[
              ['weeklyHoursMin', 'Carga horária mínima (h/semana)'],
              ['weeklyHoursMax', 'Carga horária máxima (h/semana)'],
              ['commuteLimitMinutes', 'Limite de deslocamento (minutos)'],
            ].map(([key, label]) => (
              <label className="field" key={key}>
                <span>{label}</span>
                <input type="number" min="0" value={asText(form.preferences[key as keyof ProfileForm['preferences']])} onChange={(event) => updatePreference(key, event.target.value)} />
              </label>
            ))}
          </div>
        </section>

        <section className="profile-section">
          <div className="profile-section-heading">
            <div><h2>Disponibilidade acadêmica e profissional</h2><p>Blocos de aula e janelas reais de trabalho são registros diferentes.</p></div>
          </div>
          <div className="profile-fields">
            <label className="field"><span>Semestre / período</span><input value={form.availability.termLabel} onChange={(event) => updateAvailability('termLabel', event.target.value)} /></label>
            <label className="field"><span>Fuso horário</span><input value={form.availability.timezone} onChange={(event) => updateAvailability('timezone', event.target.value)} /></label>
            <label className="field"><span>Válido a partir de</span><input type="date" value={form.availability.validFrom} onChange={(event) => updateAvailability('validFrom', event.target.value)} /></label>
            <label className="field"><span>Válido até</span><input type="date" value={form.availability.validUntil} onChange={(event) => updateAvailability('validUntil', event.target.value)} /></label>
            <label className="field"><span>Meta de horas semanais</span><input type="number" min="1" max="60" value={asText(form.availability.weeklyHoursTarget)} onChange={(event) => updateAvailability('weeklyHoursTarget', event.target.value)} /></label>
            <label className="field field-wide"><span>Observações sobre disponibilidade</span><textarea rows={3} value={form.availability.notes} onChange={(event) => updateAvailability('notes', event.target.value)} /></label>
          </div>

          <div className="schedule-group">
            <div className="profile-section-heading compact">
              <div><h3>Compromissos fixos (ex.: aulas)</h3><p>Esses blocos indicam horários indisponíveis.</p></div>
              <button className="button button-secondary" type="button" onClick={() => addSchedule('classBlocks')}>+ Aula</button>
            </div>
            {form.availability.classBlocks.map((row, index) => (
              <div className="schedule-row" key={String(row.id ?? index)}>
                <input aria-label="Descrição da aula" placeholder="Disciplina / compromisso" value={asText(row.label)} onChange={(event) => updateSchedule('classBlocks', index, 'label', event.target.value)} />
                <select aria-label="Dia da aula" value={asText(row.dayOfWeek)} onChange={(event) => updateSchedule('classBlocks', index, 'dayOfWeek', event.target.value)}>
                  {dayNames.map((day) => <option key={day.value} value={day.value}>{day.label}</option>)}
                </select>
                <input aria-label="Início da aula" type="time" value={asText(row.startTime)} onChange={(event) => updateSchedule('classBlocks', index, 'startTime', event.target.value)} />
                <input aria-label="Fim da aula" type="time" value={asText(row.endTime)} onChange={(event) => updateSchedule('classBlocks', index, 'endTime', event.target.value)} />
                <button className="remove-button" type="button" onClick={() => removeSchedule('classBlocks', index)}>Remover</button>
                <small>{getDayLabel(row.dayOfWeek)}</small>
              </div>
            ))}
            {form.availability.classBlocks.length === 0 && <p className="empty-hint">Nenhuma aula cadastrada.</p>}
          </div>

          <div className="schedule-group">
            <div className="profile-section-heading compact">
              <div><h3>Janelas em que você pode trabalhar</h3><p>Cadastre apenas períodos realmente disponíveis, considerando estudo, deslocamento e outras obrigações.</p></div>
              <button className="button button-secondary" type="button" onClick={() => addSchedule('workWindows')}>+ Janela</button>
            </div>
            {form.availability.workWindows.map((row, index) => (
              <div className="schedule-row" key={String(row.id ?? index)}>
                <input aria-label="Descrição da janela" placeholder="Ex.: trabalho remoto" value={asText(row.label)} onChange={(event) => updateSchedule('workWindows', index, 'label', event.target.value)} />
                <select aria-label="Dia disponível" value={asText(row.dayOfWeek)} onChange={(event) => updateSchedule('workWindows', index, 'dayOfWeek', event.target.value)}>
                  {dayNames.map((day) => <option key={day.value} value={day.value}>{day.label}</option>)}
                </select>
                <input aria-label="Início disponível" type="time" value={asText(row.startTime)} onChange={(event) => updateSchedule('workWindows', index, 'startTime', event.target.value)} />
                <input aria-label="Fim disponível" type="time" value={asText(row.endTime)} onChange={(event) => updateSchedule('workWindows', index, 'endTime', event.target.value)} />
                <button className="remove-button" type="button" onClick={() => removeSchedule('workWindows', index)}>Remover</button>
                <small>{getDayLabel(row.dayOfWeek)}</small>
              </div>
            ))}
            {form.availability.workWindows.length === 0 && <p className="empty-hint">Nenhuma janela real de trabalho cadastrada.</p>}
          </div>
        </section>

        <div className="profile-savebar">
          <p>Novos registros começam como “Precisa revisar”. Confirme somente informações que você já verificou.</p>
          <button className="button button-primary" type="submit" disabled={saving}>{saving ? 'Salvando…' : 'Salvar perfil'}</button>
        </div>
      </form>
    </main>
  );
}