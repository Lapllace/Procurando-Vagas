import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@vagamatch/database';
import { DatabaseService } from '../database/database.service.js';
import { ProfileUpsertDto } from './dto/profile.dto.js';

const PROFILE_ID = 'local-candidate';

const profileInclude = {
  education: { orderBy: { createdAt: 'asc' as const } },
  experiences: { orderBy: { createdAt: 'asc' as const } },
  projects: { orderBy: { createdAt: 'asc' as const } },
  skills: { orderBy: { createdAt: 'asc' as const } },
  languages: { orderBy: { createdAt: 'asc' as const } },
  certifications: { orderBy: { createdAt: 'asc' as const } },
  preferences: true,
  availability: {
    include: {
      classBlocks: { orderBy: [{ dayOfWeek: 'asc' as const }, { startTime: 'asc' as const }] },
      workWindows: { orderBy: [{ dayOfWeek: 'asc' as const }, { startTime: 'asc' as const }] },
    },
  },
} satisfies Prisma.CandidateProfileInclude;

type TimeRange = { dayOfWeek: number; startTime: string; endTime: string; label?: string | null };

function minutes(value: string): number {
  const [hours, mins] = value.split(':').map(Number);
  return hours * 60 + mins;
}

function hasOverlap(first: TimeRange, second: TimeRange): boolean {
  return first.dayOfWeek === second.dayOfWeek &&
    minutes(first.startTime) < minutes(second.endTime) &&
    minutes(second.startTime) < minutes(first.endTime);
}

function assertNoOverlap(ranges: TimeRange[], kind: string): void {
  for (let index = 0; index < ranges.length; index += 1) {
    for (let otherIndex = index + 1; otherIndex < ranges.length; otherIndex += 1) {
      if (hasOverlap(ranges[index], ranges[otherIndex])) {
        throw new BadRequestException(
          `Há blocos de ${kind} sobrepostos no mesmo dia: "${ranges[index].label ?? index + 1}" e "${ranges[otherIndex].label ?? otherIndex + 1}".`,
        );
      }
    }
  }
}

function validateTimeRanges(payload: ProfileUpsertDto): void {
  const classBlocks = payload.availability?.classBlocks ?? [];
  const workWindows = payload.availability?.workWindows ?? [];
  const ranges = [...classBlocks, ...workWindows];

  for (const range of ranges) {
    if (range.startTime >= range.endTime) {
      throw new BadRequestException(
        `O horário final deve ser posterior ao inicial em "${range.label ?? 'bloco de disponibilidade'}".`,
      );
    }
  }

  assertNoOverlap(classBlocks, 'aula');
  assertNoOverlap(workWindows, 'janela de trabalho');

  for (const classBlock of classBlocks) {
    for (const workWindow of workWindows) {
      if (hasOverlap(classBlock, workWindow)) {
        throw new BadRequestException(
          `A janela de trabalho "${workWindow.label ?? 'sem nome'}" conflita com o compromisso "${classBlock.label}".`,
        );
      }
    }
  }

  const min = payload.preferences?.weeklyHoursMin;
  const max = payload.preferences?.weeklyHoursMax;
  if (min !== undefined && min !== null && max !== undefined && max !== null && min > max) {
    throw new BadRequestException('A carga horária mínima não pode superar a máxima.');
  }
}

@Injectable()
export class ProfileService {
  constructor(private readonly database: DatabaseService) {}

  async getProfile(): Promise<unknown> {
    await this.ensureProfile();
    return this.database.prisma.candidateProfile.findUniqueOrThrow({
      where: { id: PROFILE_ID },
      include: profileInclude,
    });
  }

  async updateProfile(payload: ProfileUpsertDto): Promise<unknown> {
    validateTimeRanges(payload);

    const {
      education,
      experiences,
      projects,
      skills,
      languages,
      certifications,
      preferences,
      availability,
      ...candidate
    } = payload;

    await this.database.prisma.$transaction(async (tx) => {
      await tx.candidateProfile.upsert({
        where: { id: PROFILE_ID },
        create: { id: PROFILE_ID, ...candidate },
        update: candidate,
      });

      if (education !== undefined) {
        await tx.educationRecord.deleteMany({ where: { profileId: PROFILE_ID } });
        if (education.length > 0) {
          await tx.educationRecord.createMany({
            data: education.map((item) => ({
              ...item,
              profileId: PROFILE_ID,
              factStatus: item.factStatus ?? 'NEEDS_REVIEW',
            })),
          });
        }
      }

      if (experiences !== undefined) {
        await tx.experienceRecord.deleteMany({ where: { profileId: PROFILE_ID } });
        if (experiences.length > 0) {
          await tx.experienceRecord.createMany({
            data: experiences.map((item) => ({
              ...item,
              profileId: PROFILE_ID,
              factStatus: item.factStatus ?? 'NEEDS_REVIEW',
              responsibilities: item.responsibilities ?? [],
              technologies: item.technologies ?? [],
              isCurrent: item.isCurrent ?? false,
            })),
          });
        }
      }

      if (projects !== undefined) {
        await tx.projectRecord.deleteMany({ where: { profileId: PROFILE_ID } });
        if (projects.length > 0) {
          await tx.projectRecord.createMany({
            data: projects.map((item) => ({
              ...item,
              profileId: PROFILE_ID,
              factStatus: item.factStatus ?? 'NEEDS_REVIEW',
              technologies: item.technologies ?? [],
            })),
          });
        }
      }

      if (skills !== undefined) {
        await tx.skillRecord.deleteMany({ where: { profileId: PROFILE_ID } });
        if (skills.length > 0) {
          await tx.skillRecord.createMany({
            data: skills.map((item) => ({
              ...item,
              profileId: PROFILE_ID,
              factStatus: item.factStatus ?? 'NEEDS_REVIEW',
            })),
          });
        }
      }

      if (languages !== undefined) {
        await tx.languageRecord.deleteMany({ where: { profileId: PROFILE_ID } });
        if (languages.length > 0) {
          await tx.languageRecord.createMany({
            data: languages.map((item) => ({
              ...item,
              profileId: PROFILE_ID,
              factStatus: item.factStatus ?? 'NEEDS_REVIEW',
            })),
          });
        }
      }

      if (certifications !== undefined) {
        await tx.certificationRecord.deleteMany({ where: { profileId: PROFILE_ID } });
        if (certifications.length > 0) {
          await tx.certificationRecord.createMany({
            data: certifications.map((item) => ({
              ...item,
              profileId: PROFILE_ID,
              factStatus: item.factStatus ?? 'NEEDS_REVIEW',
            })),
          });
        }
      }

      if (preferences !== undefined) {
        await tx.jobPreferences.upsert({
          where: { profileId: PROFILE_ID },
          create: { profileId: PROFILE_ID, ...preferences },
          update: preferences,
        });
      }

      if (availability !== undefined) {
        const { classBlocks, workWindows, ...availabilityData } = availability;

        const savedAvailability = await tx.availabilityTerm.upsert({
          where: { profileId: PROFILE_ID },
          create: {
            profileId: PROFILE_ID,
            timezone: availabilityData.timezone ?? 'America/Bahia',
            ...availabilityData,
          },
          update: availabilityData,
        });

        if (classBlocks !== undefined) {
          await tx.scheduleBlock.deleteMany({
            where: { availabilityId: savedAvailability.id },
          });
          if (classBlocks.length > 0) {
            await tx.scheduleBlock.createMany({
              data: classBlocks.map((block) => ({
                ...block,
                availabilityId: savedAvailability.id,
                blockType: block.blockType ?? 'CLASS',
                factStatus: block.factStatus ?? 'NEEDS_REVIEW',
              })),
            });
          }
        }

        if (workWindows !== undefined) {
          await tx.workWindow.deleteMany({
            where: { availabilityId: savedAvailability.id },
          });
          if (workWindows.length > 0) {
            await tx.workWindow.createMany({
              data: workWindows.map((window) => ({
                ...window,
                availabilityId: savedAvailability.id,
                availabilityType: window.availabilityType ?? 'FIXED',
                factStatus: window.factStatus ?? 'NEEDS_REVIEW',
              })),
            });
          }
        }
      }

      await tx.auditEvent.create({
        data: { eventType: 'PROFILE_UPDATED', outcome: 'SUCCESS' },
      });
    });

    return this.getProfile();
  }

  private async ensureProfile(): Promise<void> {
    await this.database.prisma.candidateProfile.upsert({
      where: { id: PROFILE_ID },
      create: { id: PROFILE_ID },
      update: {},
    });
  }
}