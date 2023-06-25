import { Body, ConflictException, Controller, Get, HttpStatus, NotFoundException, Post, Res, UnauthorizedException } from "@nestjs/common";
import { Response } from "express";

import * as bcrypt from "bcrypt";

import { AuthRegisterDto } from "./dtos/auth-register.dto";
import { AuthLoginDto } from "./dtos/auth-login-dto";
import { UserService } from "../user/user.service";
import { AuthService } from "./auth.service";
import { Public } from "./auth.guard";
import { ReauthenticateUserDto } from "./dtos/reauthenticate-user-dto";

@Controller("auth")
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService
  ) {};

  @Public()
  @Post("register")
  async register(@Res() res: Response, @Body() {username, email, password}: AuthRegisterDto) {
    const saltRounds = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    
    const usernameExists = await this.userService.findByUsername(username);
    if(usernameExists) {
      throw new ConflictException("Este usuário já existe");
    }

    const emailExists = await this.userService.findByEmail(email);
    if(emailExists) {
      throw new ConflictException("O e-mail fornecido já está em uso. Por favor, tente com outro e-mail");
    }

    await this.userService.create(username, email, hashedPassword);
    
    return res.status(HttpStatus.CREATED).send("Usuário criado com sucesso.");
  }

  @Public()
  @Post("login")
  async login(@Res() res: Response, @Body() {username, password}: AuthLoginDto) {
    const user = await this.userService.findByUsername(username);
    if(!user) {
      throw new NotFoundException("Usuário não encontrado");
    };

    const passwordDoesMatch = await bcrypt.compare(password, user.password);
    if(!passwordDoesMatch) {
      throw new UnauthorizedException('A senha fornecida está incorreta.');
    }

    const tokens = await this.authService.generateToken(user.id, user.email);
    return res.status(HttpStatus.OK).json(tokens);
  }

  @Post("refresh")
  async reauthenticate(@Body() body: ReauthenticateUserDto) {
    return this.authService.reauthenticate(body);
  }
}