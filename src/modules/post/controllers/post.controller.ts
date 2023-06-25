import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Req, Res } from "@nestjs/common";
import { CreatePostDto } from "../dtos/create-post-dto";
import { PostService } from "../services/post.service";
import { Request, Response } from "express";

@Controller("posts")
export class PostController {
  constructor(
    private readonly postService: PostService
  ) {}

  @Post()
  async create(@Req() req: Request, @Body() createPostDto: CreatePostDto) {
    return await this.postService.create(req.user.id, createPostDto);
  }

  @Get(':owner/:slug')
  async findOne(@Param('owner') owner: string, @Param('slug') slug: string, @Res() res: Response) {
    const post = await this.postService.findBySlug(owner, slug);
    return res.status(HttpStatus.OK).json(post);
  }

  @Get()
  async findAll(@Res() res: Response) {
    const posts = await this.postService.findAll();
    return res.status(HttpStatus.OK).json(posts);
  }

  @Delete(':slug')
  async delete(@Param('slug') slug: string) {
    await this.postService.deleteBySlug(slug);
  }
}