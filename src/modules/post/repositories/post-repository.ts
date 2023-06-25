import { Post } from "@prisma/client";
import { CreatePostDto } from "../dtos/create-post-dto";
import { UUID } from "crypto";

export abstract class PostRepository {
  abstract create(userId: UUID, post: CreatePostDto): Promise<Post>;
  abstract findById(postId: UUID): Promise<Post>;
  abstract findAll(): Promise<Post[]>;
  abstract findBySlug(postOwner: string, slug: string): Promise<Post>;
  abstract deleteBySlug(slug: string): Promise<boolean>;
}