import { Module } from "@nestjs/common";
import { PostController } from "./post.controller";
import { PostService } from "./post.service";
import { PostRepository } from "./repositories/post-repository";
import { PrismaPostRepository } from "./repositories/prisma/prisma-post-repository";
import { PrismaService } from "src/config/prisma.service";

@Module({
  controllers: [PostController],
  providers: [
    PrismaService,
    PostService,
    {
      provide: PostRepository,
      useClass: PrismaPostRepository
    }
  ],
})
export class PostModule {}