import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "../user/user.service";

import { ReauthenticateBody } from "./dtos/reauthenticate-body";

import { User } from "../user/entities/user";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly configService: ConfigService
  ) {}

  async generateToken(userId: string, email: string) {
    const payload = { id: userId, email };

    const access_token = await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>("JWT_SECRET_KEY"),
      expiresIn: '30s'
    })

    const refresh_token = await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>("JWT_REFRESH_SECRET_KEY"),
      expiresIn: '60s'
    })

    return {
      access_token,
      refresh_token
    };
  }

  async reauthenticate({ refreshToken }: ReauthenticateBody) {
    const user: User = await this.verifyRefreshToken(refreshToken);
    return this.generateToken(user.id, user.email);
  }

  private async verifyRefreshToken(refreshToken: string): Promise<User> {
    if (!refreshToken) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const email = this.jwtService.decode(refreshToken)['email'];
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    try {
      this.jwtService.verify(refreshToken, {
        secret: this.configService.get<string>("JWT_REFRESH_SECRET_KEY"),
      });
      return user;
    } catch (err) {
      if (err.name === 'JsonWebTokenError') {
        throw new UnauthorizedException('Assinatura Inválida');
      }
      if (err.name === 'TokenExpiredError') {
        throw new UnauthorizedException('Token Expirado');
      }
      throw new UnauthorizedException(err.name);
    }
  }
}