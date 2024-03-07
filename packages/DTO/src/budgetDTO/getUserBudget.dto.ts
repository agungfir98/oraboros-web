import { IsDate, IsNumber, IsString } from "class-validator";

export class UserBudgetDTO {
	@IsString()
	budgetId: string;

	@IsString()
	name: string;

	@IsString()
	shortName: string;

	@IsNumber()
	amount: number;

	@IsDate()
	createdAt: Date;

	@IsDate()
	updatedAt: Date;

	@IsString()
	userId: string;
}
