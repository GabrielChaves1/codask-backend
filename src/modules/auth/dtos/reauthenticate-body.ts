import { IsString, IsNotEmpty } from "class-validator";

export class ReauthenticateBody {
  @IsString()
  @IsNotEmpty()
  refreshToken: string;
}