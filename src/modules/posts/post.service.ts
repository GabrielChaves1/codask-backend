import { Injectable } from "@nestjs/common";
import { PostRepository } from "./repositories/post-repository";
import { Post, User } from "@prisma/client";
import { CreatePostDto } from "./dtos/create-post-dto";

@Injectable()
export class PostService {
  constructor(
    private readonly postRepository: PostRepository
  ) {}

  async create(userId: string, createPostDto: CreatePostDto): Promise<Post> {
    return await this.postRepository.create(userId, createPostDto);
  }

  async findById(postId: string): Promise<Post> {
    return await this.postRepository.findById(postId);
  }

  async findAll(): Promise<Post[]> {
    return await this.postRepository.findAll();
  }
  
  async delete(postId: string): Promise<boolean> {
    return await this.postRepository.delete(postId);
  }
}