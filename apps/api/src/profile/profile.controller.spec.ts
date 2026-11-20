import { describe, expect, it, vi } from 'vitest';
import { ProfileController } from './profile.controller.js';
import { ProfileService } from './profile.service.js';

describe('ProfileController', () => {
  it('returns the profile from the profile service', async () => {
    const expected = { id: 'local-candidate', education: [], experiences: [] };
    const service = { getProfile: vi.fn().mockResolvedValue(expected) } as unknown as ProfileService;
    const controller = new ProfileController(service);

    await expect(controller.getProfile()).resolves.toEqual(expected);
    expect(service.getProfile).toHaveBeenCalledOnce();
  });

  it('forwards profile updates to the profile service', async () => {
    const payload = { displayName: 'Candidate', skills: [{ name: 'TypeScript' }] };
    const expected = { id: 'local-candidate', displayName: 'Candidate' };
    const service = {
      updateProfile: vi.fn().mockResolvedValue(expected),
    } as unknown as ProfileService;
    const controller = new ProfileController(service);

    await expect(controller.updateProfile(payload)).resolves.toEqual(expected);
    expect(service.updateProfile).toHaveBeenCalledWith(payload);
  });
});