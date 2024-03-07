import { IsDecimal, IsString } from "class-validator";

export class CreateOrderDTO {
	@IsString()
	name: string;

	@IsDecimal()
	amount: number;

	@IsString()
	budgetId?: string;
}
