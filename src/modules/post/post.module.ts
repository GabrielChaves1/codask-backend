import { Module } from "@nestjs/common";
import { PostController } from "./controllers/post.controller";
import { PostService } from "./services/post.service";
import { PostRepository } from "./repositories/post-repository";
import { PrismaPostRepository } from "./repositories/prisma/prisma-post-repository";
import { PrismaService } from "src/config/prisma.service";
import { CommentController } from "./controllers/comment.controller";
import { CommentService } from "./services/comment.service";
import { CommentRepository } from "./repositories/comment-repository";
import { PrismaCommentRepository } from "./repositories/prisma/prisma-comment-repository";
import { UserModule } from "../user/user.module";

@Module({
  imports: [UserModule],
  controllers: [PostController, CommentController],
  providers: [
    PrismaService,
    PostService,
    CommentService,
    {
      provide: PostRepository,
      useClass: PrismaPostRepository
    },
    {
      provide: CommentRepository,
      useClass: PrismaCommentRepository
    }
  ],
})
export class PostModule {}