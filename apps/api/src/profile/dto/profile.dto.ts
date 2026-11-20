import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  IsArray,
  IsBoolean,
  IsEmail,
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
  Max,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';

const FACT_STATUSES = ['CANDIDATE_PROVIDED', 'NEEDS_REVIEW', 'CONFIRMED'] as const;
type FactStatusInput = (typeof FACT_STATUSES)[number];

class FactDto {
  @IsOptional()
  @IsIn(FACT_STATUSES)
  factStatus?: FactStatusInput;

  @IsOptional()
  @IsString()
  @MaxLength(2048)
  sourceReference?: string | null;
}

export class EducationInputDto extends FactDto {
  @IsString()
  @MaxLength(180)
  institution!: string;

  @IsString()
  @MaxLength(180)
  course!: string;

  @IsOptional()
  @IsString()
  @MaxLength(180)
  fieldOfStudy?: string | null;

  @IsOptional()
  @IsString()
  @MaxLength(40)
  status?: string;

  @IsOptional()
  @IsString()
  @MaxLength(30)
  startPeriod?: string | null;

  @IsOptional()
  @IsString()
  @MaxLength(30)
  expectedEndPeriod?: string | null;

  @IsOptional()
  @IsString()
  @MaxLength(5000)
  details?: string | null;
}

export class ExperienceInputDto extends FactDto {
  @IsString()
  @MaxLength(180)
  title!: string;

  @IsOptional()
  @IsString()
  @MaxLength(180)
  organization?: string | null;

  @IsOptional()
  @IsString()
  @MaxLength(60)
  employmentType?: string | null;

  @IsOptional()
  @IsString()
  @MaxLength(30)
  startPeriod?: string | null;

  @IsOptional()
  @IsString()
  @MaxLength(30)
  endPeriod?: string | null;

  @IsOptional()
  @IsBoolean()
  isCurrent?: boolean;

  @IsOptional()
  @IsString()
  @MaxLength(5000)
  description?: string | null;

  @IsOptional()
  @IsArray()
  @ArrayMaxSize(40)
  @IsString({ each: true })
  @MaxLength(300, { each: true })
  responsibilities?: string[];

  @IsOptional()
  @IsArray()
  @ArrayMaxSize(60)
  @IsString({ each: true })
  @MaxLength(120, { each: true })
  technologies?: string[];
}

export class ProjectInputDto extends FactDto {
  @IsString()
  @MaxLength(180)
  name!: string;

  @IsOptional()
  @IsString()
  @MaxLength(5000)
  description?: string | null;

  @IsOptional()
  @IsString()
  @MaxLength(120)
  role?: string | null;

  @IsOptional()
  @IsUrl({ require_protocol: true })
  @MaxLength(2048)
  url?: string | null;

  @IsOptional()
  @IsString()
  @MaxLength(30)
  startPeriod?: string | null;

  @IsOptional()
  @IsString()
  @MaxLength(30)
  endPeriod?: string | null;

  @IsOptional()
  @IsArray()
  @ArrayMaxSize(60)
  @IsString({ each: true })
  @MaxLength(120, { each: true })
  technologies?: string[];
}

export class SkillInputDto extends FactDto {
  @IsString()
  @MaxLength(120)
  name!: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  category?: string | null;

  @IsOptional()
  @IsString()
  @MaxLength(60)
  level?: string | null;

  @IsOptional()
  @IsString()
  @MaxLength(30)
  lastUsedPeriod?: string | null;

  @IsOptional()
  @IsString()
  @MaxLength(2000)
  evidence?: string | null;
}

export class LanguageInputDto extends FactDto {
  @IsString()
  @MaxLength(100)
  name!: string;

  @IsOptional()
  @IsString()
  @MaxLength(80)
  proficiency?: string | null;
}

export class CertificationInputDto extends FactDto {
  @IsString()
  @MaxLength(180)
  name!: string;

  @IsOptional()
  @IsString()
  @MaxLength(180)
  issuer?: string | null;

  @IsOptional()
  @IsString()
  @MaxLength(30)
  issuedPeriod?: string | null;

  @IsOptional()
  @IsUrl({ require_protocol: true })
  @MaxLength(2048)
  url?: string | null;
}

export class JobPreferencesInputDto {
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(40)
  @IsString({ each: true })
  @MaxLength(140, { each: true })
  targetTitles?: string[];

  @IsOptional()
  @IsArray()
  @ArrayMaxSize(40)
  @IsString({ each: true })
  @MaxLength(140, { each: true })
  targetAreas?: string[];

  @IsOptional()
  @IsArray()
  @ArrayMaxSize(40)
  @IsString({ each: true })
  @MaxLength(140, { each: true })
  excludedAreas?: string[];

  @IsOptional()
  @IsArray()
  @ArrayMaxSize(20)
  @IsString({ each: true })
  @MaxLength(60, { each: true })
  seniority?: string[];

  @IsOptional()
  @IsArray()
  @ArrayMaxSize(20)
  @IsString({ each: true })
  @MaxLength(60, { each: true })
  employmentTypes?: string[];

  @IsOptional()
  @IsArray()
  @ArrayMaxSize(10)
  @IsString({ each: true })
  @IsIn(['REMOTE', 'HYBRID', 'ON_SITE', 'FREELANCE'], { each: true })
  workModes?: string[];

  @IsOptional()
  @IsArray()
  @ArrayMaxSize(30)
  @IsString({ each: true })
  @MaxLength(140, { each: true })
  locations?: string[];

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(60)
  weeklyHoursMin?: number | null;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(60)
  weeklyHoursMax?: number | null;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(600)
  commuteLimitMinutes?: number | null;
}

const TIME_PATTERN = /^(?:[01]\d|2[0-3]):[0-5]\d$/;

export class ScheduleBlockInputDto {
  @IsString()
  @MaxLength(140)
  label!: string;

  @IsOptional()
  @IsString()
  @MaxLength(40)
  blockType?: string;

  @IsInt()
  @Min(0)
  @Max(6)
  dayOfWeek!: number;

  @IsString()
  @Matches(TIME_PATTERN)
  startTime!: string;

  @IsString()
  @Matches(TIME_PATTERN)
  endTime!: string;

  @IsOptional()
  @IsIn(FACT_STATUSES)
  factStatus?: FactStatusInput;

  @IsOptional()
  @IsString()
  @MaxLength(2048)
  sourceReference?: string | null;
}

export class WorkWindowInputDto {
  @IsOptional()
  @IsString()
  @MaxLength(140)
  label?: string | null;

  @IsInt()
  @Min(0)
  @Max(6)
  dayOfWeek!: number;

  @IsString()
  @Matches(TIME_PATTERN)
  startTime!: string;

  @IsString()
  @Matches(TIME_PATTERN)
  endTime!: string;

  @IsOptional()
  @IsIn(['FIXED', 'FLEXIBLE'])
  availabilityType?: string;

  @IsOptional()
  @IsIn(FACT_STATUSES)
  factStatus?: FactStatusInput;

  @IsOptional()
  @IsString()
  @MaxLength(2048)
  sourceReference?: string | null;
}

export class AvailabilityInputDto {
  @IsOptional()
  @IsString()
  @MaxLength(80)
  termLabel?: string | null;

  @IsOptional()
  @IsString()
  @MaxLength(80)
  timezone?: string;

  @IsOptional()
  @IsString()
  @MaxLength(30)
  validFrom?: string | null;

  @IsOptional()
  @IsString()
  @MaxLength(30)
  validUntil?: string | null;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(60)
  weeklyHoursTarget?: number | null;

  @IsOptional()
  @IsString()
  @MaxLength(2000)
  notes?: string | null;

  @IsOptional()
  @IsArray()
  @ArrayMaxSize(100)
  @ValidateNested({ each: true })
  @Type(() => ScheduleBlockInputDto)
  classBlocks?: ScheduleBlockInputDto[];

  @IsOptional()
  @IsArray()
  @ArrayMaxSize(100)
  @ValidateNested({ each: true })
  @Type(() => WorkWindowInputDto)
  workWindows?: WorkWindowInputDto[];
}

export class ProfileUpsertDto {
  @IsOptional()
  @IsString()
  @MaxLength(160)
  displayName?: string | null;

  @IsOptional()
  @IsString()
  @MaxLength(240)
  headline?: string | null;

  @IsOptional()
  @IsEmail()
  @MaxLength(320)
  email?: string | null;

  @IsOptional()
  @IsString()
  @MaxLength(60)
  phone?: string | null;

  @IsOptional()
  @IsString()
  @MaxLength(180)
  location?: string | null;

  @IsOptional()
  @IsUrl({ require_protocol: true })
  @MaxLength(2048)
  portfolioUrl?: string | null;

  @IsOptional()
  @IsUrl({ require_protocol: true })
  @MaxLength(2048)
  githubUrl?: string | null;

  @IsOptional()
  @IsUrl({ require_protocol: true })
  @MaxLength(2048)
  linkedinUrl?: string | null;

  @IsOptional()
  @IsString()
  @MaxLength(5000)
  summary?: string | null;

  @IsOptional()
  @IsArray()
  @ArrayMaxSize(30)
  @ValidateNested({ each: true })
  @Type(() => EducationInputDto)
  education?: EducationInputDto[];

  @IsOptional()
  @IsArray()
  @ArrayMaxSize(60)
  @ValidateNested({ each: true })
  @Type(() => ExperienceInputDto)
  experiences?: ExperienceInputDto[];

  @IsOptional()
  @IsArray()
  @ArrayMaxSize(60)
  @ValidateNested({ each: true })
  @Type(() => ProjectInputDto)
  projects?: ProjectInputDto[];

  @IsOptional()
  @IsArray()
  @ArrayMaxSize(100)
  @ValidateNested({ each: true })
  @Type(() => SkillInputDto)
  skills?: SkillInputDto[];

  @IsOptional()
  @IsArray()
  @ArrayMaxSize(30)
  @ValidateNested({ each: true })
  @Type(() => LanguageInputDto)
  languages?: LanguageInputDto[];

  @IsOptional()
  @IsArray()
  @ArrayMaxSize(40)
  @ValidateNested({ each: true })
  @Type(() => CertificationInputDto)
  certifications?: CertificationInputDto[];

  @IsOptional()
  @ValidateNested()
  @Type(() => JobPreferencesInputDto)
  preferences?: JobPreferencesInputDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => AvailabilityInputDto)
  availability?: AvailabilityInputDto;
}