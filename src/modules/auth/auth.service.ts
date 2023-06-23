import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService
  ) {}

  async login(id: string, email: string) {
    const payload = { id, email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}