import { IsString, IsNotEmpty } from "class-validator";

export class ReauthenticateUserDto {
  @IsString()
  @IsNotEmpty()
  refreshToken: string;
}