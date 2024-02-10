import { IsString } from "class-validator";

export class EditProfileDTO {
  @IsString()
  displayName: string;
}
