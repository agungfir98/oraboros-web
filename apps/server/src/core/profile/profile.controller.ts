import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDTO, EditProfileDTO } from '@ob/dto';
import { SupabaseGuard } from '../auth/supabase/supabase.guard';
import { Response } from 'express';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @UseGuards(SupabaseGuard)
  @Get('boarding')
  async createNewUser(
    @Query() createProfileDTO: CreateProfileDTO,
    @Res() res: Response,
  ) {
    const user = await this.profileService.getUserByEmail(
      createProfileDTO.email,
    );

    try {
      if (!user) {
        const newUser = await this.profileService.createUser({
          displayName: createProfileDTO.displayName,
          email: createProfileDTO.email,
        });

        return res.status(201).json({
          messsage: 'new user created',
          newUser,
        });
      }

      if (user._count.Budget === 0) {
        return res.status(404).send();
      }

      return res.send();
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
      console.log(error);
      return {
        msg: 'something wong with the server',
        error,
      };
    }
  }

  @UseGuards(SupabaseGuard)
  @Put(':id')
  async editProfile(
    @Param() params: { id: string },
    @Body() editProfile: EditProfileDTO,
  ) {
    const editedUser = await this.profileService.editProfile(
      params.id,
      editProfile,
    );

    return editedUser;
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
