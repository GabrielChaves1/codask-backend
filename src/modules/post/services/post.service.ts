import { Injectable } from "@nestjs/common";
import { PostRepository } from "../repositories/post-repository";
import { Post, User } from "@prisma/client";
import { CreatePostDto } from "../dtos/create-post-dto";
import { UUID } from "node:crypto";

@Injectable()
export class PostService {
  constructor(
    private readonly postRepository: PostRepository
  ) {}

  async create(userId: UUID, createPostDto: CreatePostDto): Promise<Post> {
    return await this.postRepository.create(userId, createPostDto);
  }

  async findById(postId: UUID): Promise<Post> {
    return await this.postRepository.findById(postId);
  }

  async findBySlug(postOwner: string, slug: string): Promise<Post> {
    return await this.postRepository.findBySlug(postOwner, slug);
  }

  async findAll(): Promise<Post[]> {
    return await this.postRepository.findAll();
  }
  
  async deleteBySlug(slug: string): Promise<boolean> {
    return await this.postRepository.deleteBySlug(slug);
  }
}