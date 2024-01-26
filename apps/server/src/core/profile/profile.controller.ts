import { Controller, Get, Post } from '@nestjs/common';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post()
  async newProfile() {
    const data = await this.profileService.createUser();
    console.log(data);

    return 'new profile';
  }

  @Get()
  getProfile() {
    return 'profileeee';
  }
}
