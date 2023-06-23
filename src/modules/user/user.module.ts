import { Module } from "@nestjs/common";
import { UserRepository } from "./repositories/user-repository";
import { PrismaService } from "src/config/prisma.service";
import { UserService } from "./user.service";
import { PrismaUserRepository } from "./repositories/prisma/prisma-user-repository";

@Module({
  providers: [
    PrismaService,
    UserService,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository
    }
  ],
  exports: [UserService]
})
export class UserModule {}