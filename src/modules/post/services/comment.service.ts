import { Injectable } from "@nestjs/common";
import { CreateCommentDto } from "../dtos/create-comment.dto";
import { PostComment } from "@prisma/client";
import { UUID } from "node:crypto";
import { CommentRepository } from "../repositories/comment-repository";

@Injectable()
export class CommentService {
  constructor(
    private readonly commentRepository: CommentRepository
  ) {}

  async create(userId: UUID, createCommentDto: CreateCommentDto): Promise<PostComment> {
    return this.commentRepository.create(userId, createCommentDto);
  }

  async delete(commentId: UUID) {
    return this.commentRepository.delete(commentId);
  }
}