import { PostComment } from "@prisma/client";
import { CreateCommentDto } from "../dtos/create-comment.dto";
import { UUID } from "crypto";

export abstract class CommentRepository {
  abstract create(userId: UUID, createCommentDto: CreateCommentDto): Promise<PostComment>;
  abstract delete(userId: UUID): Promise<boolean>;
}