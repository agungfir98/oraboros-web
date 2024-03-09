import { Controller, Delete, Get, Param, Res, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDTO } from '@ob/dto';
import { SupabaseGuard } from '../auth/supabase/supabase.guard';
import type { Response } from 'express';
import { User } from '../auth/user.decorator';
import type { AuthUser } from '@supabase/supabase-js';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @UseGuards(SupabaseGuard)
  @Get('boarding')
  async createNewUser(@Res() res: Response, @User() user: AuthUser) {
    const createProfileDTO: CreateProfileDTO = {
      email: user.email,
      displayName: user.user_metadata.full_name,
    };

    const profile = await this.profileService.getUserByEmail(
      createProfileDTO.email,
    );

    try {
      if (!profile) {
        const newProfile = await this.profileService.createUser({
          displayName: createProfileDTO.displayName,
          email: createProfileDTO.email,
        });

        return res.status(201).json({
          shouldRedirect: true,
          newProfile,
        });
      }

      if (profile._count.Budget === 0) {
        return res.json({ shouldRedirect: true, profile });
      }

      return res.json({ shouldRedirect: false, profile });
    } catch (error) {
      return res.status(500).json({
        message: 'failed to write data',
        error,
      });
    }
  }

  @UseGuards(SupabaseGuard)
  @Get(':id')
  async getProfile(@Param() params: { id: string }) {
    try {
      const user = await this.profileService.getUserById(params.id);
      return user;
    } catch (error) {
      return {
        msg: 'something wong with the server',
        error,
      };
    }
  }

  @UseGuards(SupabaseGuard)
  @Delete(':id')
  async deleteProfile(@Param() params: { id: string }) {
    const res = await this.profileService.deleteProfile(params.id);

    return {
      message: 'deleted',
      res,
    };
  }
}
