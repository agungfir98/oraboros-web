import { IsNotEmptyObject } from "class-validator";
import { CreateOrderDTO } from "../orderDTO";

export class CreateTransactionDTO {
	@IsNotEmptyObject()
	orders: CreateOrderDTO[];
}
