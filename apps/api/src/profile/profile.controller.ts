import { Body, Controller, Get, Patch } from '@nestjs/common';
import { ProfileUpsertDto } from './dto/profile.dto.js';
import { ProfileService } from './profile.service.js';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  getProfile() {
    return this.profileService.getProfile();
  }

  @Patch()
  updateProfile(@Body() payload: ProfileUpsertDto) {
    return this.profileService.updateProfile(payload);
  }
}