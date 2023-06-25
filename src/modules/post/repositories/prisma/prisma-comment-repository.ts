import { Injectable, NotFoundException } from "@nestjs/common";
import { CommentRepository } from "../comment-repository";
import { UUID, randomUUID } from "node:crypto";
import { CreateCommentDto } from "../../dtos/create-comment.dto";
import { PostComment } from "@prisma/client";
import { PrismaService } from "src/config/prisma.service";
import { PostService } from "../../services/post.service";
import { UserService } from "src/modules/user/user.service";

@Injectable()
export class PrismaCommentRepository implements CommentRepository {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly postService: PostService,
    private readonly userService: UserService  
  ) {}
  
  async create(userId: UUID, { postId, content }: CreateCommentDto): Promise<any> {
    const user = await this.userService.findById(userId);

    if(!user) {
      throw new NotFoundException("Usuario não encontrado");
    }

    const post = await this.postService.findById(postId);

    if(!post){
      throw new NotFoundException("Post não encontrado");
    }

    const comment = await this.prismaService.postComment.create({
      data: {
        id: randomUUID(),
        content,
        post: {
          connect: {
            id: post.id
          }
        },
      }
    });

    return comment;
  }

  async delete(commentId: UUID): Promise<boolean> {
    const commentDeleted = await this.prismaService.postComment.delete({
      where: {
        id: commentId
      }
    })
    
    if(commentDeleted) return true;
    return false;
  }
}