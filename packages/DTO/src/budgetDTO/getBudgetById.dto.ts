import { IsString } from "class-validator";

export class GetBudgetByIdDTO {
	@IsString()
	budgetId: string;
}
