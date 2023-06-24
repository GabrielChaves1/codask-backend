import { randomUUID } from "node:crypto";
import { UserRepository } from "../user-repository";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/config/prisma.service";
import { User } from "@prisma/client";

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(
    private readonly prismaService: PrismaService
  ) {}

  async create(email: string, password: string): Promise<User> {
    return await this.prismaService.user.create({
      data: {
        id: randomUUID(),
        email,
        password
      }
    });
  }

  async findById(id: string): Promise<User> {
    const user = await this.prismaService.user.findFirst({
      where: {
        id: id,
      }
    })
    
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.prismaService.user.findFirst({
      where: {
        email: email
      }
    })

    return user;
  }

  async findAll(): Promise<User[]> {
    const users = await this.prismaService.user.findMany();
    return users;
  }
}