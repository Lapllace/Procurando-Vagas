import { describe, expect, it, vi } from 'vitest';
import { DatabaseService } from '../database/database.service.js';
import { HealthController } from './health.controller.js';

describe('HealthController', () => {
  it('returns the process health status', () => {
    const database = { check: vi.fn() } as unknown as DatabaseService;
    const controller = new HealthController(database);

    expect(controller.getHealth()).toMatchObject({
      status: 'ok',
      service: 'api',
    });
  });

  it('reports readiness after a successful database check', async () => {
    const database = {
      check: vi.fn().mockResolvedValue(undefined),
    } as unknown as DatabaseService;
    const controller = new HealthController(database);

    await expect(controller.getReadiness()).resolves.toEqual({
      status: 'ready',
      database: 'connected',
    });
    expect(database.check).toHaveBeenCalledOnce();
  });

  it('does not report readiness when the database is unavailable', async () => {
    const database = {
      check: vi.fn().mockRejectedValue(new Error('database unavailable')),
    } as unknown as DatabaseService;
    const controller = new HealthController(database);

    await expect(controller.getReadiness()).rejects.toMatchObject({
      status: 503,
    });
  });
});