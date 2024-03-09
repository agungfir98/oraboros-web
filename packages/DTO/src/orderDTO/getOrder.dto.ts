import { IsDate, IsNumber, IsString } from "class-validator";

export class GetOrderDTO {
	@IsString()
	orderId: string;

	@IsString()
	name: string;

	@IsNumber()
	amount: number;

	@IsString()
	budgetId: string;

	@IsString()
	useId: string;

	@IsDate()
	createdAt: Date;

	@IsNumber()
	sumOrder?: number;

	@IsNumber()
	_count: number;
}
