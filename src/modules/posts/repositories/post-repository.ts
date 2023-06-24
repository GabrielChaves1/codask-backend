import { Post } from "@prisma/client";
import { CreatePostDto } from "../dtos/create-post-dto";

export abstract class PostRepository {
  abstract create(userId: string, post: CreatePostDto): Promise<Post>;
  abstract findById(postId: string): Promise<Post>;
  abstract findAll(): Promise<Post[]>;
  abstract delete(postId: string): Promise<boolean>;
}