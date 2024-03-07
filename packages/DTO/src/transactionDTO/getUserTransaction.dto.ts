import { IsString } from "class-validator";

export class GetUserTransactionDTO {
	@IsString()
	userId: string;
}
