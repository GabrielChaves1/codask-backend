import { Body, Controller, Get, HttpStatus, Post, Res } from "@nestjs/common";
import { Response } from "express";

import * as bcrypt from "bcrypt";

import { AuthDTO } from "./dtos/auth-dto";
import { UserService } from "../user/user.service";
import { AuthService } from "./auth.service";
import { Public } from "./auth.guard";

@Controller("auth")
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService
  ) {};

  @Public()
  @Post("register")
  async register(@Res() res: Response, @Body() {email, password}: AuthDTO) {
    const saltRounds = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    
    const emailExists = await this.userService.findByEmail(email);
    if(emailExists) {
      return res.status(HttpStatus.BAD_REQUEST)
        .send("O e-mail fornecido já está em uso. Por favor, tente com outro e-mail");
    }

    await this.userService.create(email, hashedPassword);
    
    return res.status(HttpStatus.CREATED).send("Usuário criado com sucesso.");
  }

  @Public()
  @Post("login")
  async login(@Res() res: Response, @Body() {email, password}: AuthDTO) {
    const user = await this.userService.findByEmail(email);
    if(!user) return res.status(HttpStatus.NOT_FOUND).send("Usuário não encontrado.");

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid) return res.status(HttpStatus.BAD_REQUEST).send("Erro ao efetuar login.");

    const tokens = await this.authService.login(user.id, user.email);
    return res.status(HttpStatus.OK).json(tokens);
  }

  @Public()
  @Post("profile")
  async userProfile(@Res() res: Response) {
    return res.status(HttpStatus.OK).json("Gabriel Droyen");
  }
}