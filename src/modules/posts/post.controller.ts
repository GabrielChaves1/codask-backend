import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Req, Res } from "@nestjs/common";
import { CreatePostDto } from "./dtos/create-post-dto";
import { PostService } from "./post.service";
import { Request, Response } from "express";

@Controller("posts")
export class PostController {
  constructor(
    private readonly postService: PostService
  ) {}

  @Post()
  create(@Req() req: Request, @Body() createPostDto: CreatePostDto) {
    return this.postService.create(req.user.id, createPostDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Res() res: Response) {
    const post = this.postService.findById(id);
    return res.status(HttpStatus.OK).json(post);
  }

  @Get()
  findAll(@Res() res: Response) {
    const posts = this.postService.findAll();
    return res.status(HttpStatus.OK).json(posts);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    this.postService.delete(id);
  }
}