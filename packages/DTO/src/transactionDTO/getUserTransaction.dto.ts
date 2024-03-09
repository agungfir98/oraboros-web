import { IsDate, IsObject, IsString } from "class-validator";
import { GetOrderDTO } from "../orderDTO";

export class GetUserTransactionDTO {
	@IsString()
	userId: string;

	@IsString()
	transactionId: string;

	@IsObject()
	order: GetOrderDTO[];

	@IsDate()
	createdAt: string;
}
