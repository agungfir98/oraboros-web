import { IsNotEmpty, IsObject, IsString } from "class-validator";

export class ProfileDTO {
  @IsString()
  userId: string;

  @IsNotEmpty()
  displayName: string;

  @IsString()
  email: string;

  @IsObject()
  _count: { Budget: number; Order: number; transactions: number };
}
