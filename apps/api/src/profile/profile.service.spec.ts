import { BadRequestException } from '@nestjs/common';
import { describe, expect, it } from 'vitest';
import { DatabaseService } from '../database/database.service.js';
import { ProfileService } from './profile.service.js';

describe('ProfileService validation', () => {
  const service = new ProfileService({} as DatabaseService);

  it('rejects schedule blocks where the end is not after the start', async () => {
    await expect(
      service.updateProfile({
        availability: {
          classBlocks: [
            { label: 'Invalid', dayOfWeek: 1, startTime: '10:00', endTime: '08:00' },
          ],
        },
      }),
    ).rejects.toBeInstanceOf(BadRequestException);
  });

  it('rejects a work window that overlaps a class', async () => {
    await expect(
      service.updateProfile({
        availability: {
          classBlocks: [
            { label: 'Class', dayOfWeek: 1, startTime: '08:00', endTime: '10:00' },
          ],
          workWindows: [
            { label: 'Work', dayOfWeek: 1, startTime: '09:00', endTime: '12:00' },
          ],
        },
      }),
    ).rejects.toThrow('conflita');
  });

  it('rejects overlapping fixed class blocks', async () => {
    await expect(
      service.updateProfile({
        availability: {
          classBlocks: [
            { label: 'Class A', dayOfWeek: 2, startTime: '08:00', endTime: '10:00' },
            { label: 'Class B', dayOfWeek: 2, startTime: '09:00', endTime: '11:00' },
          ],
        },
      }),
    ).rejects.toThrow('sobrepostos');
  });

  it('rejects a requested weekly-hours minimum greater than its maximum', async () => {
    await expect(
      service.updateProfile({
        preferences: { weeklyHoursMin: 30, weeklyHoursMax: 20 },
      }),
    ).rejects.toBeInstanceOf(BadRequestException);
  });
});