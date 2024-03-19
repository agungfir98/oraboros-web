import { IsNumber, IsOptional, IsString } from "class-validator";

export class GetTransactionDTO {
	@IsString()
	userId: string;

	@IsOptional()
	readonly startDate: string | Date;

	@IsOptional()
	readonly endDate: string | Date;

	@IsOptional()
	@IsNumber()
	readonly take?: number;
}
