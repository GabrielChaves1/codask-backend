import { Injectable } from "@nestjs/common";
import { PostRepository } from "../post-repository";
import { CreatePostDto } from "../../dtos/create-post-dto";
import { PrismaService } from "src/config/prisma.service";

import { randomUUID } from "node:crypto";
import { Post } from "@prisma/client";
import { GetResult } from "@prisma/client/runtime";

@Injectable()
export class PrismaPostRepository implements PostRepository {
  constructor(
    private readonly prismaService: PrismaService,
  ) {}
  
  async create(userId: string, {title, content}: CreatePostDto): Promise<Post> {
    return await this.prismaService.post.create({
      data: {
        id: randomUUID(),
        title,
        content,
        author: {
          connect: {
            id: userId
          }
        },
      }
    })
  }

  async findById(postId: string): Promise<Post> {
    return await this.prismaService.post.findFirst({
      where: {
        id: postId
      }
    })
  }

  async findAll(): Promise<Post[]> {
    return await this.prismaService.post.findMany()
  }

  async delete(postId: string): Promise<boolean> {
    const post = await this.prismaService.post.delete({
      where: {
        id: postId
      },
    })

    if(post) return true;
    return false;
  }
}