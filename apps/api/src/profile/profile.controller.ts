import { Body, Controller, Get, Patch } from '@nestjs/common';
import { ProfileUpsertDto } from './dto/profile.dto.js';
import { ProfileService } from './profile.service.js';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  getProfile(): Promise<unknown> {
    return this.profileService.getProfile();
  }

  @Patch()
  updateProfile(@Body() payload: ProfileUpsertDto): Promise<unknown> {
    return this.profileService.updateProfile(payload);
  }
}