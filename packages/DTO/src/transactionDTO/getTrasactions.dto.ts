import { IsDate, IsObject, IsOptional, IsString } from "class-validator";
import { GetOrderDTO } from "../orderDTO";

export class GetTransactionDTO {
	@IsString()
	userId: string;

	@IsOptional()
	readonly startDate: string | Date;

	@IsOptional()
	readonly endDate: string | Date;
}
