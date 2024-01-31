import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDTO } from '@ob/dto';
import { SupabaseGuard } from '../auth/supabase/supabase.guard';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @UseGuards(SupabaseGuard)
  @Get(':id')
  async getProfile(@Param() params: { id: string }) {
    const user = await this.profileService.getUserById(params.id);
    return user;
  }

  @Post('boarding')
  async createNewUser(@Body() createProfileDTO: CreateProfileDTO) {
    const user = await this.profileService.getUserByEmail(
      createProfileDTO.email,
    );

    if (!user) {
      const newUser = await this.profileService.createUser({
        displayName: createProfileDTO.displayName,
        email: createProfileDTO.email,
      });
      return newUser;
    }
    return { ada: 'ud ada' };
  }
}
