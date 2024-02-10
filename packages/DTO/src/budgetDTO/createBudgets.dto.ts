import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateBudgetsDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  shortName: string;

  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsNotEmpty()
  @IsString()
  userId: string;
}
