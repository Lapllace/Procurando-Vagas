import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { describe, expect, it } from 'vitest';
import { ProfileUpsertDto } from './profile.dto.js';

function flattenConstraints(
  errors: Awaited<ReturnType<typeof validate>>,
): string[] {
  return errors.flatMap((error) => [
    ...Object.values(error.constraints ?? {}),
    ...flattenConstraints(error.children ?? []),
  ]);
}

describe('ProfileUpsertDto', () => {
  it('accepts a valid education record and weekly schedule block', async () => {
    const dto = plainToInstance(ProfileUpsertDto, {
      education: [{ institution: 'University', course: 'Computing', status: 'IN_PROGRESS' }],
      availability: {
        timezone: 'America/Bahia',
        classBlocks: [
          {
            label: 'Class',
            dayOfWeek: 1,
            startTime: '08:00',
            endTime: '10:00',
          },
        ],
      },
    });

    await expect(validate(dto)).resolves.toHaveLength(0);
  });

  it('rejects invalid weekdays and malformed times', async () => {
    const dto = plainToInstance(ProfileUpsertDto, {
      availability: {
        classBlocks: [
          {
            label: 'Invalid class',
            dayOfWeek: 8,
            startTime: '8h',
            endTime: '10:00',
          },
        ],
      },
    });

    const messages = flattenConstraints(await validate(dto));
    expect(messages.join(' ')).toContain('dayOfWeek');
    expect(messages.join(' ')).toContain('startTime');
  });

  it('rejects unsupported work modes', async () => {
    const dto = plainToInstance(ProfileUpsertDto, {
      preferences: { workModes: ['ANYWHERE'] },
    });

    expect(flattenConstraints(await validate(dto)).join(' ')).toContain('workModes');
  });

  it('rejects unknown properties instead of silently accepting them', async () => {
    const dto = plainToInstance(ProfileUpsertDto, {
      displayName: 'Candidate',
      secretToken: 'not-allowed',
    });

    const messages = flattenConstraints(await validate(dto, {
      whitelist: true,
      forbidNonWhitelisted: true,
    }));
    expect(messages.join(' ')).toContain('secretToken');
  });
});