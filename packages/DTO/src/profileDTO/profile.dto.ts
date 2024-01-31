import { IsNotEmpty, IsString } from "class-validator";

export class ProfileDTO {
	@IsString()
	userId: string;

	@IsNotEmpty()
	full_name: string;
}
