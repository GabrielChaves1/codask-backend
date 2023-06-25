import { Injectable } from "@nestjs/common";
import { PostRepository } from "../post-repository";
import { CreatePostDto } from "../../dtos/create-post-dto";
import { PrismaService } from "src/config/prisma.service";

import { UUID, randomUUID } from "node:crypto";
import { Post } from "@prisma/client";

@Injectable()
export class PrismaPostRepository implements PostRepository {
  constructor(
    private readonly prismaService: PrismaService,
  ) {}
  
  async create(userId: UUID, createPostDto: CreatePostDto): Promise<Post> {
    return await this.prismaService.post.create({
      data: {
        id: randomUUID(),
        ...createPostDto,
        author: {
          connect: {
            id: userId
          }
        },
      }
    })
  }

  async findById(postId: UUID): Promise<Post> {
    return await this.prismaService.post.findFirst({
      where: {
        id: postId
      }
    })
  }

  async findAll(): Promise<Post[]> {
    return await this.prismaService.post.findMany({
      include: {
        comments: {}
      }
    })
  }

  async findBySlug(postOwner: string, slug: string): Promise<Post> {
    return await this.prismaService.post.findFirst({
      include: {
        author: {
          select: {
            createdAt: true,
            username: true,
          }
        }
      },
      where: {
        author: {
          username: postOwner
        },
        slug: slug
      },
    })
  }

  async deleteBySlug(slug: string): Promise<boolean> {
    const post = await this.prismaService.post.delete({
      where: {
        id: slug
      },
    })

    if(post) return true;
    return false;
  }
}