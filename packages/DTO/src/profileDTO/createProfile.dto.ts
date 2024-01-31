import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateProfileDTO {
	@IsEmail()
	email: string;

	@IsNotEmpty()
	displayName: string;
}
