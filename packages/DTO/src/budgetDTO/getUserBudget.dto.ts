import { IsDate, IsNumber, IsOptional, IsString } from "class-validator";

export class GetUserBudgetDTO {
	@IsString()
	userId: string;

	@IsOptional()
	sum?: boolean;
}
